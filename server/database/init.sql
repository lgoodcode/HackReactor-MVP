-- Enable pgcrypto extension for encrypting passwords
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Enable uuid-ossp extension for generating uuids
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cascade drop tables and referenced tables and indexes
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS library CASCADE;

-- Re-create the progress enum type (requires single quotes for values)
DROP TYPE IF EXISTS progress;
CREATE TYPE progress AS ENUM ('pending', 'in progress', 'completed');

CREATE TABLE users (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  -- Will need to use crypt("PASSWORD", gen_salt("bf")) to encrypt password when inserting
  -- and use crypt("SUBMITTED_PASSWORD", password) to compare.
  "password" TEXT NOT NULL
);

-- Creates a table the contains the users added games and their progress
CREATE TABLE library (
  -- Primary key, serial to increment for each record
  "id" SERIAL NOT NULL PRIMARY KEY,
  -- The id of the user that added the game
  "user_id" uuid NOT NULL REFERENCES users("id"),
  -- The id of the game
  "game_id" INT NOT NULL,
  -- The progress of the game
  "progress" progress NOT NULL DEFAULT 'pending', -- requires single quote for value
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Reset indexes (the cascade table drop will have removed them)
-- DROP INDEX IF EXISTS idx_library_id;
-- Indexes used for faster queries
CREATE INDEX idx_library_id ON library("id");
