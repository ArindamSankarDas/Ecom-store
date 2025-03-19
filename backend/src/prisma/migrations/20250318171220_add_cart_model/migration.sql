-- CreateTable
CREATE TABLE "CartItems" (
    "id" TEXT NOT NULL,
    "usersId" TEXT,
    "productName" TEXT NOT NULL,
    "productQty" INTEGER NOT NULL,
    "productPrice" INTEGER NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
