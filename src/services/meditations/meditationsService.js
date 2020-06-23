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
      );
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
};


module.exports = meditationsService;
