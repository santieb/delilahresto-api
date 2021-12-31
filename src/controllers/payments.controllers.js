const payments = require('../models/payments.models')

const listPayments = async () => await payments.find()

const createPayment = async (req) => {
  const newPayment = { method: req.body.method }

  const payment = new payments(newPayment)
  const response = await payment.save()
  return response
}

const modifyPayment = async (req) => {
  const { method } = req.body
  const { idPayment } = req.params

  const filter = { _id: idPayment }
  const update = { method: method }
  await payments.findOneAndUpdate(filter, update)
}

const deletePayment = async (req) => await payments.findByIdAndDelete(req.params.idPayment)

module.exports = {
  listPayments,
  createPayment,
  modifyPayment,
  deletePayment
}
