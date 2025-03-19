/*
  Warnings:

  - Added the required column `productCategory` to the `CartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productThumbnail` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "productCategory" TEXT NOT NULL,
ADD COLUMN     "productThumbnail" TEXT NOT NULL;
