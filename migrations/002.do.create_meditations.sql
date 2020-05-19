SET TIME ZONE 'UTC';

CREATE TABLE meditations (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT
);