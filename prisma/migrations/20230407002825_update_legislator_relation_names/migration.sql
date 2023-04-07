/*
  Warnings:

  - You are about to drop the `StafferInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StafferInfo" DROP CONSTRAINT "StafferInfo_legislatorId_fkey";

-- DropTable
DROP TABLE "StafferInfo";

-- CreateTable
CREATE TABLE "Staffer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'Staffer',
    "legislatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staffer" ADD CONSTRAINT "Staffer_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
