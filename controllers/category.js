const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: 'no category found'
            })
        }
         req.category = cate
    next()

    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}


exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if (err) {
            res.status(400).json({
                error: 'not able to save category in DB'
            })
        }
        res.json(category)

    })
}



exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({

                error: "Can't find any category"
            })
        }
        res.json(categories)
    })
}


exports.updateCategory = (req,res) => {

    Category.findById(req.params.categoryId).exec((err, cate) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                error: 'no category found'
            })
        }
        //res.json(cate)
         req.category = cate
        //  console.log(req.category)

    })
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "couldn't update category"
            })
        }
        res.json(data)
    })
}


exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't delete this category"
            })
        }
        res.json({
            message: `succesfully deleted ${data}`
        })
    })
}






