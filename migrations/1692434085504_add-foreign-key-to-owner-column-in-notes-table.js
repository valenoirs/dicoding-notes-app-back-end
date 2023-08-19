/* eslint-disable camelcase */

exports.up = (pgm) => {
  // create new user to fill empty owner on notes table
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')"
  )

  // change owner value to note that don't have owner
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL")

  // add foreign key constraint to owner based on users table id
  pgm.addConstraint(
    'notes',
    'fk_notes.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  )
}

exports.down = (pgm) => {
  // delete constraint fk_notes.owner_users.id on notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id')

  // change old_notes owner value on note to NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'")

  // delete new user that fill empty owner on notes table
  pgm.sql("DELETE FROM users WHERE id = 'old_notes")
}
