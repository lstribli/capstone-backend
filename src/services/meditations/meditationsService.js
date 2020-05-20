const xss = require('xss');
const Treeize = require('treeize');

const meditationsService = {
  getAllThings(db) {
    return db
      .from('meditations')
      .select(
        'meditations.id',
        'meditations.title',
        'meditations.content',
        'meditations.image'
      )
  },

  getById(db, id) {
    return meditationsService.getAllThings(db)
      // .then(console.log(id))
      .where('meditations.id', id)
      .first();
  },

  serializeThings(things) {
    // console.log(things);
    return things.map(this.serializeThing);
  },

  serializeThing(thing) {
    const thingTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const thingData = thingTree.grow([thing]).getData()[0];

    return {
      id: thingData.id,
      title: xss(thingData.title),
      content: xss(thingData.content),
      image: xss(thingData.image),
    };
  },


  // serializeThingReviews(reviews) {
  //   return reviews.map(this.serializeThingReview);
  // },

  // serializeThingReview(review) {
  //   const reviewTree = new Treeize();

  // Some light hackiness to allow for the fact that `treeize`
  // only accepts arrays of objects, and we want to use a single
  // object.
  // const reviewData = reviewTree.grow([review]).getData()[0];

  //   return {
  //     id: reviewData.id,
  //     rating: reviewData.rating,
  //     thing_id: reviewData.thing_id,
  //     text: xss(reviewData.text),
  //     user: reviewData.user || {},
  //     date_created: reviewData.date_created,
  //   }
  // },
};


// const userFields = [
//   'usr.id AS user:id',
//   'usr.user_name AS user:user_name',
//   'usr.full_name AS user:full_name',
//   'usr.nickname AS user:nickname',
//   'usr.date_created AS user:date_created',
//   'usr.date_modified AS user:date_modified',
// ]

module.exports = meditationsService;
