const path = require('path')

const routes = ({ postUploadImageHandler }) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
]

module.exports = routes
