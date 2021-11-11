import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'

const run = async () => {
  try {
    await connect('mongodb://localhost:27017/api-test')
    const item = await Item.create({
      name: 'Clean',
      createdBy: mongoose.Types.ObjectId(),
      list: mongoose.Types.ObjectId()
    })

    const updated = await await Item.findByIdAndUpdate(
      item._id,
      { name: 'Eat' },
      { new: true }
    ).exec()

    console.log(updated)
  } catch (error) {
    console.log(error)
  }
}
run()

export default crudControllers(Item)
