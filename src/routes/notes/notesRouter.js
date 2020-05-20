const express = require('express');
const notesService = require('../../services/notes/notesService');
const { requireAuth } = require('../../middleware/jwt-auth');
const notesRouter = express.Router();
const dataParser = express.json();
notesRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    notesService.getAllThings(req.app.get('db'))
      .then(things => {
        res.json(notesService.serializeThings(things))
      })
      .catch(next)
  })
  .post(dataParser, (req, res, next) => {
    const { title } = req.body;
    const { content } = req.body;
    const { user_id } = req.body;
    const { mood_id } = req.body;

    console.log('post: user_id', req.user);

    const newNote = {
      title,
      content,
      user_id,
      mood_id
    };

    console.log(newNote);
    if (!title) {
      return res.status(400).json({ error: 'note title is required' });
    }
    notesService.addNote(req.app.get('db'), newNote)
      .then(note => res.status(201).json(note))
      .catch(error => next(error));
  });
//get by id

notesRouter
  .route('/:notes_id')
  .all(requireAuth)
  .all(checkThingExists)
  .get((req, res) => {
    res.json(notesService.serializeThing(res.thing))
  })
  .delete((req, res, next) => {
    notesService.deleteNote(req.app.get('db'), req.params.notes_id)
      .then(thing => res.status(204).json((thing)).end())
      .catch(error => next(error));
  })


async function checkThingExists(req, res, next) {
  try {
    const thing = await notesService.getById(
      req.app.get('db'),
      req.params.notes_id
    )

    if (!thing)
      return res.status(404).json({
        error: `Thing doesn't exist`
      })

    res.thing = thing
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = notesRouter;