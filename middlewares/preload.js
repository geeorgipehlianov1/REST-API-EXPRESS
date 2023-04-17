const { getById } = require('../services/furniture');

module.exports = () => async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await getById(id).lean();
    item._ownerId = item.owner;
    res.locals.item = item;
    next();
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Not found!' });
  }
};
