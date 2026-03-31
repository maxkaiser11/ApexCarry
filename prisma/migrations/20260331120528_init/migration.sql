-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "game" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
