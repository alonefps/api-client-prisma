-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL
);
INSERT INTO "new_Client" ("address", "id", "name", "number") SELECT "address", "id", "name", "number" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
