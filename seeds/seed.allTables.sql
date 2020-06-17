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
  ('Mindfulness Meditation', 'Mindfulness meditation is the process of being fully present with your thoughts. Being mindful means being aware of where we are and what we’re doing, and not being overly reactive to what’s going on around us.

Mindful meditation can be done anywhere. Some people prefer to sit in a quiet place, close their eyes, and focus on their breathing. But you can choose to be mindful at any point of the day, including while you’re commuting to work or doing chores.

When practicing mindfulness meditation, you observe your thoughts and emotions but let them pass without judgement.', 'https://www.ecopetit.cat/wpic/mpic/140-1407897_silicon-wafer-close-up.jpg' ),
  ('Transcendental Meditation', 'Transcendental meditation is a simple technique in which a personally assigned mantra, such as a word, sound, or small phrase, is repeated in a specific way. It’s practiced 20 minutes twice each day while sitting comfortably with the eyes closed.

The idea is that this technique will allow you to settle inward to a profound state of relaxation and rest, with the goal of achieving inner peace without concentration or effort.', 'some image URL' ),
  ('Guided Meditation', 'Guided meditation, which is sometimes also called guided imagery or visualization, is a method of meditation in which you form mental pictures or situations that you find relaxing.

This process is typically led by a guide or teacher, hence “guided.” It’s often suggested to use as many senses as possible, such as smell, sounds, and textures, to evoke calmness in your relaxing space.', 'some image URL' ),
  ('Vipassana Meditation', 'Vipassana meditation is an ancient Indian form of meditation that means to see things as they really are. It was taught in India more than 2,500 years ago. The mindfulness meditation movement in the United States has roots in this tradition.

The goal of vipassana meditation is self-transformation through self-observation. This is accomplished through disciplined attention to physical sensations in the body, to establish a deep connection between the mind and body. The continuous interconnectedness results in a balanced mind full of love and compassion, teachers of the practice claim.

Vipassana, in this tradition, is typically taught during a 10-day course, and students are expected to follow a set of rules throughout the entirety of the time, including abstaining from all intoxicants, telling lies, stealing, sexual activity, and killing any species.', 'some image URL' ),
  ('Metta Meditation', 'Metta meditation, also called Loving Kindness Meditation, is the practice of directing well wishes toward others. Those who practice recite specific words and phrases meant to evoke warm-hearted feelings. This is also commonly found in mindfulness and vipassana meditation.

It’s typically practiced while sitting in a comfortable, relaxed position. After a few deep breaths, you repeat the following words slowly and steadily. “May I be happy. May I be well. May I be safe. May I be peaceful and at ease.”

After a period of directing this loving kindness toward yourself, you may begin to picture a family member or friend who has helped you and repeat the mantra again, this time replacing “I” with “you.”

As you continue the meditation, you can bring other members of your family, friends, neighbors, or people in your life to mind. Practitioners are also encouraged to visualize people they have difficulty with.

Finally, you end the meditation with the universal mantra: “May all being everywhere be happy.”', 'some image URL' ),
  ('Chakra Meditation', 'Chakra is an ancient Sanskrit word that translates to “wheel,” and can be traced back to India. Chakras refer to the centers of energy and spiritual power in the body. There are thought to be seven chakras. Each chakra is located at a different part of the body and each has a corresponding color.

Chakra meditation is made up of relaxation techniques focused on bringing balance and well-being to the chakras. Some of these techniques include visually picturing each chakra in the body and its corresponding color. Some people may choose to light incense or use crystals, color coded for each chakra to help them concentrate during the meditation.', 'some image URL' ),
  ('Yoga Meditation', 'The practice of yoga dates back to ancient India. There are a wide variety of classes and styles of yoga, but they all involve performing a series of postures and controlled breathing exercises meant to promote flexibility and calm the mind.

The poses require balance and concentration and practitioners are encouraged to focus less on distractions and stay more in the moment. (2)

Which style of meditation you decide to try depends on a number of factors. If you have a health condition and are new to yoga, speak to your doctor about which style may be right for you.', 'some image URL' );

    INSERT INTO notes (title, content, mood_id, user_id)
VALUES
  ('note title 1', 'lorem ipsum', 1, 1 ),
  ('note title 2', 'lorem ipsum', 2, 1 ),
  ('note title 3', 'lorem ipsum', 3, 1 ),
  ('note title 4', 'lorem ipsum', 4, 1 ),
  ('note title 5', 'lorem ipsum', 5, 1 ),
  ('note title 6', 'lorem ipsum', 6, 1 ),
  ('note title 7', 'lorem ipsum', 7, 3 );
  COMMIT;