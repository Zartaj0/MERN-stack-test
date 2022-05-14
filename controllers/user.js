const User = require('../models/user');
const Order = require('../models/order');




exports.getUserById = (req, res, next, id) => {
  
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "NO user was found in DB"
      })
    }
    req.profile = user;
    next();
  })
}

exports.getuser = (req, res) => {
  req.profile.salt = undefined
  req.profile.encry_password = undefined
  console.log(req.profile);

  return res.json(req.profile);
}


exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "not authorized"
        })
      }
      user.salt = undefined
      user.encry_password = undefined

      res.json(user)
    }
  )
}

exports.userPurchaseList = (req, res) => {
  User.find({ user: req.profile._id })
    .populate("user", "_id name ")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "no order in list"
        })
      }
      res.json(order)
    })

}

exports.pushOrderInUserPurchaseList = (req, res, next) => {
  let purchases = []

  req.body.order.products.forEach(product => {
    purchases.push({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id

    })
  });

  User.findOneAndUpdate(
    { id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        res.status(400).json({
          error: "list can't be updated"
        })
      }
      next()

    }
  )

}