BEGIN;

TRUNCATE
  users,
  meditations,
  notes
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password)
VALUES
  ('dunder', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' ),
  ('b.deboop', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' ),
  ('c.bloggs', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' ),
  ('s.smith', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' ),
  ('lexlor', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' ),
  ('wippy', '$2a$10$dcxMQSkwiZxTxuNaGW9NYeQhzXEXQkSXK4xsC0OYn/pL9MPuVs7dW' );

  INSERT INTO meditations (title, content, image)
VALUES
  ('title 1', 'lorem ipsum', 'some image URL' ),
  ('title 2', 'lorem ipsum', 'some image URL' ),
  ('title 3', 'lorem ipsum', 'some image URL' ),
  ('title 4', 'lorem ipsum', 'some image URL' ),
  ('title 5', 'lorem ipsum', 'some image URL' ),
  ('title 6', 'lorem ipsum', 'some image URL' ),
  ('title 7', 'lorem ipsum', 'some image URL' );

    INSERT INTO notes (title, content, mood_id, user_id)
VALUES
  ('title 1', 'lorem ipsum', 1, 1 ),
  ('title 2', 'lorem ipsum', 2, 1 ),
  ('title 3', 'lorem ipsum', 3, 1 ),
  ('title 4', 'lorem ipsum', 4, 1 ),
  ('title 5', 'lorem ipsum', 5, 1 ),
  ('title 6', 'lorem ipsum', 6, 1 ),
  ('title 7', 'lorem ipsum', 7, 3 );
  COMMIT;