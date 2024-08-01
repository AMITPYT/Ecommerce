const Product = require('../../models/products');

const addProduct = async (req, res) => {
  const { image, title, description, price } = req.body;
  const imageURL = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  const product = new Product({
    image:imageURL,
    title,
    description,
    price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
};
