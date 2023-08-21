const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
  username,
}) => {
  return {
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
    username,
  }
}

module.exports = { mapDBToModel }
