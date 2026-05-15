CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

INSERT INTO "User" ("id", "email", "name") VALUES
(1, 'leo@example.com', 'Leo Tobing'),
(2, 'john@example.com', 'John Doe'),
(3, 'jane@example.com', 'Jane Smith');
