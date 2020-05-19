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
//get review for thing by id
// thingsRouter.route('/:thing_id/meditation/')
//   //.all deals with middleware which MUST be a function
//   .all(requireAuth)
//   .all(checkThingExists)
//   .get((req, res, next) => {
//     ThingsService.getReviewsForThing(
//       req.app.get('db'),
//       req.params.thing_id
//     )
//       .then(reviews => {
//         res.json(ThingsService.serializeThingReviews(reviews))
//       })
//       .catch(next)
//   })

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