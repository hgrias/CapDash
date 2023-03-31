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
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "J'Dinkalage",
        lastName: "Morgoone",
        state: "TX",
        party: "Republican",
        chamber: "House",
        district: 2,
        imageUri: "image1.jpg",
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Sequester",
        lastName: "Grundelplith",
        state: "TX",
        party: "Democrat",
        chamber: "Senate",
        district: 1,
        imageUri: "image1.jpg",
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
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
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "Benedict",
        lastName: "Cumberbatch",
        state: "TX",
        party: "Democrat",
        chamber: "House",
        district: 1,
        imageUri: "",
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
      {
        firstName: "AARon",
        lastName: "Balakay",
        state: "TX",
        party: "Democrat",
        chamber: "House",
        district: 1,
        imageUri: "",
        chamberWebsiteUrl: "https://www.example.com/chamber",
        capitolWebsiteUrl: "https://www.example.com/capitol",
        organizationId: organization.id,
        currentSessionId: legislativeSession.id,
      },
    ],
  });

  // Get created legislators
  const legislators = await prisma.legislator.findMany();

  // Create 1 interaction per legislator
  legislators.map(
    async (legislator: Legislator) =>
      await prisma.interaction.create({
        data: {
          createdBy: user.id,
          legislatorId: legislator.id,
          content: "Sample interaction content",
          sessionId: legislativeSession.id,
          organizationId: organization.id,
          type: "BILL",
        },
      })
  );

  console.log("Seeding finished.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
