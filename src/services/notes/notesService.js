const xss = require('xss');
const Treeize = require('treeize');
const notesService = {
  getAllThings(db, user_id) {
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
      .join(
        'users',
        'notes.user_id',
        'users.id'
      )
      .groupBy('users.id', 'notes.id')
      .where('users.id', user_id);
  },
  addNote(db, newNote) {
    return db('notes')
      .insert(newNote)
      .returning('*')
      .then(rows => rows[0]);
  },
  getById(db, id, user_id) {
    return notesService.getAllThings(db, user_id)
      .where('notes.id', id)
      .first();
  },
  deleteNote(db, id, user_id) {
    return notesService.getAllThings(db, id, user_id)
      .where('notes.id', id)
      .first()
      .delete();
  },
  // updateNote(db,id,user_id) {


  //   return notesService.getAllThings(db,id,user_id,noteToUpdate)
  //   .where('notes.id', id)
  //   .first()
  //   .update();
  // }


  serializeThings(things) {
    return things.map(this.serializeThing);
  },
  serializeThing(thing) {
    const thingTree = new Treeize();
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
