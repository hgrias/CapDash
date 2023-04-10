-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "noteId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "interactionId" TEXT;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
