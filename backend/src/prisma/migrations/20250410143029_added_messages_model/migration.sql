-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "usersId" TEXT,
    "contactMessage" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
