SET TIME ZONE 'UTC';

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE users
  ADD COLUMN
    user_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;