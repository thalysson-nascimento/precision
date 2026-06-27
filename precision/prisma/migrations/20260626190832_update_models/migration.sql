/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TimeRecord` table. All the data in the column will be lost.
  - Added the required column `date` to the `TimeRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `TimeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "workStart" TEXT NOT NULL DEFAULT '08:00',
    "lunchStart" TEXT NOT NULL DEFAULT '12:00',
    "lunchEnd" TEXT NOT NULL DEFAULT '13:00',
    "workEnd" TEXT NOT NULL DEFAULT '18:00',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Employee" ("createdAt", "email", "id", "name", "role") SELECT "createdAt", "email", "id", "name", "role" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE TABLE "new_TimeRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "TimeRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TimeRecord" ("employeeId", "id", "type") SELECT "employeeId", "id", "type" FROM "TimeRecord";
DROP TABLE "TimeRecord";
ALTER TABLE "new_TimeRecord" RENAME TO "TimeRecord";
CREATE UNIQUE INDEX "TimeRecord_employeeId_date_type_key" ON "TimeRecord"("employeeId", "date", "type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
