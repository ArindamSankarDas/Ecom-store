/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `paymentsId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_orderId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
DROP COLUMN "orderId",
ADD COLUMN     "paymentsId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
