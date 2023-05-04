/*
  Warnings:

  - A unique constraint covering the columns `[searchApiKey]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `searchApiKey` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "searchApiKey" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UpdateQueue" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpdateQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_searchApiKey_key" ON "Organization"("searchApiKey");
