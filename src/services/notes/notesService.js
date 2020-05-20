const xss = require('xss');
const Treeize = require('treeize');

const notesService = {
  getAllThings(db) {
    return db
      .from('notes')
      .select(
        'notes.id',
        'notes.title',
        'notes.content',
        'notes.date_created',
        'notes.mood_id',
        'notes.user_id'
      )
    // .groupBy('notes.id', 'notes.id');
  },

  getById(db, id) {
    // console.log(id);
    return notesService.getAllThings(db)
      .where('notes.id', id)
      // .then(console.log('notesService: notes.id:', id))
      .first();
  },
  deleteNote(db, id) {
    return notesService.getAllThings(db)
      .where('notes.id', id)
      // .then(console.log('notesService: notes.id:', id))
      .first()
      .delete();
  },
  addNote(db, newNote) {
    return db('notes')
      .insert(newNote)
      .returning('*')
      .then(rows => rows[0]);
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
      date_created: thingData.date_created,
      mood_id: thingData.mood_id,
      user_id: thingData.user_id
    };
  },
};

module.exports = notesService;
