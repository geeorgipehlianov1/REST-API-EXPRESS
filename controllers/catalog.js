const router = require('express').Router();
const api = require('../services/furniture');
const errorMapper = require('../utils/errorMapper');
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
  const data = await api.getAll();
  res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
  const item = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    material: req.body.material,
    owner: req.user._id,
  };

  try {
    const result = await api.create(item);
    res.status(201).send(result);
  } catch (err) {
    const error = errorMapper(err);
    res.status(401).json({ message: error });
  }
});

router.get('/:id', preload(), async (req, res) => {
  const result = await api.getById(req.params.id);
  res.json(result);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  const item = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    material: req.body.material,
  };
  try {
    const result = await api.update(id, item);
    res.send(result);
  } catch (err) {
    const error = errorMapper(err);
    res.status(401).json({ message: error });
  }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
  try {
    await api.deleteById(req.params.id);
    res.status(204).end();
  } catch (err) {
    const error = errorMapper(err);
    res.status(401).json({ message: error });
  }
});

module.exports = router;
