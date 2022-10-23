const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: {
          model: ProductTag
        }
      }
    });
    res.json(tags);
  }
  catch(err) {
    res.json(err);
  }
});

// router.get('/product-tag', async (req, res) => {
//   try{
//     const tags = await ProductTag.findAll();
//     res.json(tags);
//   }
//   catch(err) {
//     res.json(err);
//   }
// });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: {
          model: ProductTag
        }
      }
    });
    res.json(tag);
  }
  catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch(err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update( {tag_name: req.body.tag_name}, {
      where: {
        id: req.params.id
      }
    });
    res.json(tag);
  } catch(err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const product_tag = await ProductTag.destroy({
      where: {
        tag_id: req.params.id
      }
    });
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(tag);
  } catch(err) {
    res.json(err);
  }
});

module.exports = router;
