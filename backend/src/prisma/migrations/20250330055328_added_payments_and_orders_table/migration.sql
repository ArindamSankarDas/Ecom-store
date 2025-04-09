-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productQuantity" INTEGER NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
