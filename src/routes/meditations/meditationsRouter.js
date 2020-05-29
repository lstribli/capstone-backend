const express = require('express');
const meditationsService = require('../../services/meditations/meditationsService');
const { requireAuth } = require('../../middleware/jwt-auth');
const meditationsRouter = express.Router();

//get all
meditationsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    meditationsService.getAllThings(req.app.get('db'))
      .then(things => {
        res.json(meditationsService.serializeThings(things))
      })
      .catch(next)
  })
// get by id
meditationsRouter
  .route('/:meditations_id')
  .all(requireAuth)
  .all(checkThingExists)
  .get((req, res) => {
    res.json(meditationsService.serializeThing(res.thing))
  })


/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
  try {
    const thing = await meditationsService.getById(
      req.app.get('db'),
      req.params.meditations_id
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

module.exports = meditationsRouter