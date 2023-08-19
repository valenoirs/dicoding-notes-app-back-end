/* eslint-disable camelcase */

exports.up = (pgm) => {
  // create collaborations table
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  })

  // add UNIQUE constraint, by combining note_id and user_id column.
  // to avoid data redundancy by both value.
  pgm.addConstraint(
    'collaborations',
    'unique_note_id_and_user_id',
    'UNIQUE(note_id, user_id)'
  )

  // give FOREIGN KEY constraint to note_id and user_id column based on notes.id and users.id
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.note_id_notes.id',
    'FOREIGN KEY(note_id) REFERENCES notes(id) ON DELETE CASCADE'
  )
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  )
}

exports.down = (pgm) => {
  // drop collaborations table
  pgm.dropTable('collaborations')
}
