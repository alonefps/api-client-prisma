/*
  Warnings:

  - You are about to alter the column `number` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "address" TEXT NOT NULL
);
INSERT INTO "new_Client" ("address", "id", "name", "number") SELECT "address", "id", "name", "number" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
