const mapDBToModel = ({ id, title, body, tags, created_at, updated_at }) => {
  return {
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
  }
}

module.exports = { mapDBToModel }
