/*
  Warnings:

  - The values [UNKNOWN] on the enum `State` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `role` on the `Legislator` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LegislatorRole" AS ENUM ('Sen', 'Rep');

-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');
ALTER TABLE "Legislator" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TABLE "LegislativeSession" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
COMMIT;

-- AlterTable
ALTER TABLE "Legislator" DROP COLUMN "role",
ADD COLUMN     "role" "LegislatorRole" NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Legislator_role_state_district_organizationId_key" ON "Legislator"("role", "state", "district", "organizationId");
