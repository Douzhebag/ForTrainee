/*
  Warnings:

  - The primary key for the `UserLH` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `UserLH` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_ownerId_fkey";

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "ownerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserLH" DROP CONSTRAINT "UserLH_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "UserLH_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserLH"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
