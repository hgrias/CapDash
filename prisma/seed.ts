import { mutationQueueMiddleware } from "./middleware";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const STATE = "TX";
const TEST_ORG_CUID = "clgn330dm000008jvcg5x05k4";
const twentyFourDaysAgo = new Date(Date.now() - 24 * 24 * 60 * 60 * 1000);
const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const aCoupleOfHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

const prisma = new PrismaClient();

// Middleware to upsert new data to typesense search collections/indexes
mutationQueueMiddleware(prisma);

async function main() {
  // Prisma middleware for adding mutations to Typesense Reindex Queue
  // mutationQueueMiddleware(prisma);

  console.log("Start seeding...");

  console.log("Loading data from JSON file");
  const jsonData = JSON.parse(fs.readFileSync("prisma/seedData.json", "utf8"));
  const sessionData = jsonData.sessionpeople.session;
  const sessionPeople = jsonData.sessionpeople.people;

  console.log("Creating test organization");
  const organization = await prisma.organization.create({
    data: {
      id: TEST_ORG_CUID,
      name: "Test Appleseed",
      slug: "test-appleseed",
    },
  });

  console.log("Creating test tags for organization");
  const tag1 = await prisma.tag.create({
    data: {
      name: "Criminal Justice",
      organization: {
        connect: {
          id: organization.id,
        },
      },
    },
  });
  const tag2 = await prisma.tag.create({
    data: {
      name: "Cite and Release",
      organization: {
        connect: {
          id: organization.id,
        },
      },
    },
  });
  const tag3 = await prisma.tag.create({
    data: {
      name: "General",
      organization: {
        connect: {
          id: organization.id,
        },
      },
    },
  });

  console.log("Creating test user");
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      organizationId: organization.id,
    },
  });

  console.log("Creating active legislative session");
  const activeSession = await prisma.legislativeSession.create({
    data: {
      id: sessionData.session_id,
      state: STATE,
      active: true,
      yearStart: sessionData.year_start,
      yearEnd: sessionData.year_end,
      sessionName: sessionData.session_name,
      sessionTitle: sessionData.session_title,
      sessionTag: sessionData.session_tag,
      Organization: {
        connect: {
          id: organization.id,
        },
      },
    },
  });

  console.log("Creating legislators with notes and interactions");
  let errors = [];
  sessionPeople.map(async (person: any) => {
    try {
      const legislator = await prisma.legislator.create({
        data: {
          firstName: person.first_name,
          lastName: person.last_name,
          state: STATE,
          party: person.party,
          role: person.role,
          district: person.district,
          legiscanId: person.people_id,
          currentSessionId: activeSession.id,
          email: `${person.first_name}.${person.last_name}@${STATE}.gov`,
          phone: "123-154-6523",
          chamberWebsiteUrl: "https://www.example.com/chamber",
          capitolWebsiteUrl: "https://www.example.com/capitol",
          districtAddress: "3000 Briarcrest Drive Suite 202 Bryan, TX 77802",
          capitolAddress: "P.O. Box 12068 Capitol Station Austin, TX 78711",
          staffers: {
            create: [
              {
                email: "harrisongrias@staffer.com",
                phone: "143-154-1254",
                name: "Harrison Grias",
                position: "Staffer",
              },
              {
                email: "akankshabaleikai@staffer.com",
                phone: "535-165-2523",
                name: "Akanksha Balekai",
                position: "Chief of Staff",
              },
            ],
          },
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
      });

      const note1 = await prisma.note.create({
        data: {
          legislatorId: legislator.id,
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          createdBy: user.id,
          createdAt: twentyFourDaysAgo,
          tags: {
            connect: {
              id: tag1.id,
            },
          },
          interaction: {
            create: {
              legislator: {
                connect: {
                  id: legislator.id,
                },
              },
              createdAt: twentyFourDaysAgo,
              content: "Test interaction description 1",
              method: "email",
              tags: {
                connect: {
                  id: tag1.id,
                },
              },
              organization: {
                connect: {
                  id: organization.id,
                },
              },
              user: {
                connect: {
                  id: user.id,
                },
              },
              sessionId: activeSession.id,
            },
          },
        },
      });
      const note2 = await prisma.note.create({
        data: {
          legislatorId: legislator.id,
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          createdBy: user.id,
          createdAt: oneWeekAgo,
          tags: {
            connect: [
              {
                id: tag1.id,
              },
              {
                id: tag2.id,
              },
            ],
          },
          interaction: {
            create: {
              legislator: {
                connect: {
                  id: legislator.id,
                },
              },
              createdAt: oneWeekAgo,
              content: "Test interaction description 2",
              method: "meeting",
              tags: {
                connect: [
                  {
                    id: tag1.id,
                  },
                  {
                    id: tag2.id,
                  },
                ],
              },
              organization: {
                connect: {
                  id: organization.id,
                },
              },
              user: {
                connect: {
                  id: user.id,
                },
              },
              sessionId: activeSession.id,
            },
          },
        },
      });
      const note3 = await prisma.note.create({
        data: {
          legislatorId: legislator.id,
          content:
            "Note 3 content. We'll keep this one short and sweet. No interaction attached.",
          createdBy: user.id,
          createdAt: aCoupleOfHoursAgo,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
