const xss = require('xss');
const Treeize = require('treeize');
const notesService = {
  getAllThings(db, user_id) {
    return db('notes')
      .select(
        'id',
        'title',
        'content',
        'date_created',
        'mood_id',
        'user_id'
      )
      .where({ 'user_id': user_id });
  },
  addNote(db, newNote) {
    return db('notes')
      .insert(newNote)
      .returning('*')
      .then(rows => rows[0]);
  },
  getById(db, id, user_id) {
    return db('notes')
      .where({ 'notes.id': id, 'user_id': user_id })
      .first();
  },
  deleteNote(db, id, user_id) {
    return db('notes')
      .where({ 'notes.id': id, 'user_id': user_id })
      .delete();
  },
  updateNote(db, id, user_id, noteToUpdate) {
    return db('notes')
      .where({ 'notes.id': id, 'user_id': user_id })
      .update(noteToUpdate);
  },
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
