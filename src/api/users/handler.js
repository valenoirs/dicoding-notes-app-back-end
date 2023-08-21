const ClientError = require('../../exceptions/ClientError')

class UsersHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    this.postUserHandler = this.postUserHandler.bind(this)
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this)
    this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this)
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload)

      const { username, password, fullname } = request.payload

      const userId = await this._service.addUser({
        username,
        password,
        fullname,
      })

      return h
        .response({
          status: 'success',
          message: 'User berhasil ditambahkan',
          data: {
            userId,
          },
        })
        .code(201)
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode)
      }

      // Server Error
      console.error(error)
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500)
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.params

      const user = await this._service.getUserById(id)

      return {
        status: 'success',
        data: { user },
      }
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode)
      }

      // Server Error
      console.error(error)
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500)
    }
  }

  async getUsersByUsernameHandler(request, h) {
    try {
      const { username = '' } = request.query

      const users = await this._service.getUsersByUsername(username)

      return {
        status: 'success',
        data: {
          users,
        },
      }
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode)
      }

      // Server Error
      console.error(error)
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500)
    }
  }
}

module.exports = UsersHandler
