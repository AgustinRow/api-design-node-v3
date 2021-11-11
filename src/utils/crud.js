export const getOne = model => async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user
  const doc = await model.find({ createdBy: userId })
  res.status(200).json({ data: doc })
}

export const createOne = model => async (req, res) => {
  const userId = req.user
  const { name } = req.body

  const doc = await model.create({ name: name, createdBy: userId })
  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const userId = req.user._id
  const listId = req.params.id
  const { body } = req

  const doc = await model
    .findOneAndUpdate({ _id: listId, createdBy: userId }, body, { new: true })
    .exec()
  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndRemove({ _id: req.params.id, createdBy: req.user._id })
    .exec()
  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
