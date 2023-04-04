// prisma/seed.ts

import { Legislator, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name: "Texas Appleseed",
      slug: "texas-appleseed",
      websiteUrl: "https://www.texasappleseed.org/",
    },
  });

  // Create user associated with organization
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      organizationId: organization.id,
    },
  });

  // Create Legislative Session
  const legislativeSession = await prisma.legislativeSession.create({
    data: {
      id: 2112,
      yearStart: 2023,
      yearEnd: 2024,
      active: true,
      state: "TX",
      sessionTag: "Regular Session",
      sessionTitle: "2023 Regular Session",
      sessionName: "88th Legislature Regular Session",
    },
  });

  // Create 6 legislators associated with organization
  await prisma.legislator.createMany({
    data: [
      {
        firstName: "Quatro",
        lastName: "Quatro",
        state: "TX",
        party: "D",
        role: "Rep",
        district: "SD-005",
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "J'Dinkalage",
        lastName: "Morgoone",
        state: "TX",
        party: "R",
        role: "Sen",
        district: "SD-005",
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Sequester",
        lastName: "Grundelplith",
        state: "TX",
        party: "D",
        role: "Rep",
        district: "SD-006",
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Bismo",
        lastName: "Funyuns",
        state: "TX",
        party: "R",
        role: "Sen",
        district: "SD-006",
        imageUri: "",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Benedict",
        lastName: "Cumberbatch",
        state: "TX",
        party: "D",
        role: "Rep",
        district: "SD-007",
        imageUri: "",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "AARon",
        lastName: "Balakay",
        state: "TX",
        party: "D",
        role: "Sen",
        district: "SD-007",
        imageUri: "",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
    ],
  });

  // Get created legislators
  const legislators = await prisma.legislator.findMany();

  legislators.map(async (legislator: Legislator) => {
    // Create 1 interaction per legislator
    await prisma.interaction.create({
      data: {
        createdBy: user.id,
        legislatorId: legislator.id,
        content: "Sample interaction content",
        sessionId: legislativeSession.id,
        organizationId: organization.id,
        type: "BILL",
      },
    }),
      // Create 1 legislatorInfo record per legislator
      await prisma.legislatorInfo.create({
        data: {
          phone: "123-154-1257",
          email: "heytherethistest@test.com",
          capitolOfficeNumber: "E2.407",
          chamberWebsiteUrl: "https://www.example.com/chamber",
          capitolWebsiteUrl: "https://www.example.com/capitol",
          capitolAddress: "P.O. Box 12068 Capitol Station Austin, TX 78711",
          districtAddress: "3000 Briarcrest Drive Suite 202 Bryan, TX 77802",
          legislator: {
            connect: {
              id: legislator.id,
            },
          },
        },
      }),
      // Create 1 staffer contact per legislator
      await prisma.stafferInfo.create({
        data: {
          email: "stafferemail@example.com",
          phone: "123-456-7890",
          name: "Harrison Grias",
          position: "Chief of Staff",
          legislator: {
            connect: {
              id: legislator.id,
            },
          },
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
      });
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
