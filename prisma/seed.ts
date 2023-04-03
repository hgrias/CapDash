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
      sessionNumber: 41,
      startDate: new Date("2021-01-12"),
      endDate: new Date("2021-05-31"),
      days: 140,
      active: true,
      type: "REGULAR",
      state: "TX",
    },
  });

  // Create 6 legislators associated with organization
  await prisma.legislator.createMany({
    data: [
      {
        firstName: "Quatro",
        lastName: "Quatro",
        state: "TX",
        party: "Democrat",
        chamber: "House",
        district: 1,
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "J'Dinkalage",
        lastName: "Morgoone",
        state: "TX",
        party: "Republican",
        chamber: "Senate",
        district: 1,
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Sequester",
        lastName: "Grundelplith",
        state: "TX",
        party: "Democrat",
        chamber: "House",
        district: 2,
        imageUri: "image1.jpg",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Bismo",
        lastName: "Funyuns",
        state: "TX",
        party: "Republican",
        chamber: "Senate",
        district: 2,
        imageUri: "",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Benedict",
        lastName: "Cumberbatch",
        state: "TX",
        party: "Democrat",
        chamber: "House",
        district: 3,
        imageUri: "",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "AARon",
        lastName: "Balakay",
        state: "TX",
        party: "Democrat",
        chamber: "Senate",
        district: 3,
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
          capitolRoomNumber: "1205",
          chamberWebsiteUrl: "https://www.example.com/chamber",
          capitolWebsiteUrl: "https://www.example.com/capitol",
          capitolAddress: "P.O. Box 12068 Capitol Station Austin, TX 78711",
          districtAddress: "3000 Briarcrest Drive Suite 202 Bryan, TX 77802",
          organization: {
            connect: {
              id: organization.id,
            },
          },
          legislator: {
            connect: {
              id: legislator.id,
            },
          },
        },
      }),
      // Create 1 staffer contact per legislator
      await prisma.stafferContact.create({
        data: {
          email: "stafferemail@example.com",
          phone: "123-456-7890",
          name: "Harrison Grias",
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
