-- CreateTable
CREATE TABLE "TruckCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdDT" DATETIME,
    "modifiedDT" DATETIME,
    "entity" TEXT,
    "operatingStatus" TEXT,
    "legalName" TEXT NOT NULL,
    "dbaName" TEXT,
    "physicalAddress" TEXT,
    "phone" TEXT,
    "dot" INTEGER NOT NULL,
    "mcmxff" TEXT,
    "powerUnits" INTEGER,
    "outOfServiceDate" DATETIME
);
