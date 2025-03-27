/*
  Warnings:

  - You are about to drop the column `roomid` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `roomName` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomid_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "roomid",
ADD COLUMN     "roomName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
