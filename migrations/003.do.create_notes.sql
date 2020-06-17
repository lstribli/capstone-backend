SET TIME ZONE 'UTC';

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    mood_id INTEGER,
        -- REFERENCES meditations(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        -- REFERENCES users(id) ON DELETE CASCADE NOT NULL
);
