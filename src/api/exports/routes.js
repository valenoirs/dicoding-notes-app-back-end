const routes = ({ postExportNotesHandler }) => [
  {
    method: 'POST',
    path: '/export/notes',
    handler: postExportNotesHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
]

module.exports = routes
