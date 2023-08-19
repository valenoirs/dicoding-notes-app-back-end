const ClientError = require('../../exceptions/ClientError')

class NotesHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    this.postNoteHandler = this.postNoteHandler.bind(this)
    this.getNotesHandler = this.getNotesHandler.bind(this)
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this)
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this)
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this)
  }

  async postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload)

      const { title = 'undefined', body, tags } = request.payload
      const { id: credentialId } = request.auth.credentials

      const noteId = await this._service.addNote({
        title,
        body,
        tags,
        owner: credentialId,
      })

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: { noteId },
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

  async getNotesHandler(request) {
    const { id: credentialId } = request.auth.credentials

    const notes = await this._service.getNotes(credentialId)

    return {
      status: 'success',
      data: { notes },
    }
  }

  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params
      const { id: credentialId } = request.auth.credentials

      await this._service.verifyNoteOwner(id, credentialId)
      const note = await this._service.getNoteById(id)

      return {
        status: 'success',
        data: { note },
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

  async putNoteByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload)

      const { id } = request.params
      const { id: credentialId } = request.auth.credentials

      await this._service.verifyNoteOwner(id, credentialId)
      await this._service.editNoteById(id, request.payload)

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
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

  async deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params
      const { id: credentialId } = request.auth.credentials

      await this._service.verifyNoteOwner(id, credentialId)
      await this._service.deleteNoteById(id)

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
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

module.exports = NotesHandler
