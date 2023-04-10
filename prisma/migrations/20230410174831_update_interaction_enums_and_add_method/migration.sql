/*
  Warnings:

  - The values [BILL,TESTIMONY,GENERAL,UNKNOWN] on the enum `InteractionType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `method` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InteractionMethod" AS ENUM ('meeting', 'email', 'phone', 'text', 'hearing', 'testify');

-- AlterEnum
BEGIN;
CREATE TYPE "InteractionType_new" AS ENUM ('general', 'bill', 'issue', 'lobby');
ALTER TABLE "Interaction" ALTER COLUMN "type" TYPE "InteractionType_new" USING ("type"::text::"InteractionType_new");
ALTER TYPE "InteractionType" RENAME TO "InteractionType_old";
ALTER TYPE "InteractionType_new" RENAME TO "InteractionType";
DROP TYPE "InteractionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "method" "InteractionMethod" NOT NULL;
