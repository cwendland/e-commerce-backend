const router = require('express').Router();
const { model } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async  (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll().catch((err) => {
    res.json(err)
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {model: Product},
    });
    if (!category) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 try{
  const category = await Category.update({ category_name: req.body.name}, {
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(category);
 } catch (err) {
  res.status(400).json(err);
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(category);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
