const express = require('express');
const notesService = require('../../services/notes/notesService');
const { requireAuth } = require('../../middleware/jwt-auth');
const notesRouter = express.Router();
const dataParser = express.json();

notesRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    notesService.getAllThings(req.app.get('db'), req.user.id)
      .then(things => {
        res.json(notesService.serializeThings(things));
      })
      .catch(next);
  })
  .post(dataParser, (req, res, next) => {
    const {
      title,
      content,
      user_id,
      mood_id, } = req.body;
    if (!title || !content || !user_id || !mood_id) {
      return res.status(400).json({ error: 'all fields are required' });
    }
    return notesService.addNote(req.app.get('db'), req.body)
      .then(note => res.status(201).json(note))
      .catch(error => next(console.log(error)));
  });


//get by id
notesRouter
  .route('/:notes_id')
  .all(requireAuth)
  // .all(checkThingExists)
  .get((req, res, next) => {
    notesService.getById(req.app.get('db'), req.params.notes_id, req.user.id)
      .then(thing => {
        res.json(thing);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    notesService.deleteNote(
      req.app.get('db'),
      req.params.notes_id,
      req.user.id
    )
      .then(() => res.status(204).end())
      .catch(error => next(error));
  })
  .patch(dataParser, (req, res, next) => {
    let {
      title,
      content,
      user_id,
      mood_id
    } = req.body;

    const noteToUpdate = {
      title,
      content,
      user_id,
      mood_id
    };

    notesService.updateNote(
      req.app.get('db'),
      req.params.notes_id,
      req.user.id,
      noteToUpdate)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;