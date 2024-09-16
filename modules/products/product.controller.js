const Product = require('../../models/products');

// Add a new product
const addProduct = async (req, res) => {
  const { name, brand, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  const product = new Product({
    image,
    name,
    brand,
    description,
    price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Get all products
const getProducts = async (req, res) => {
  const { brand, minPrice, maxPrice } = req.query;

  // Create a filter object
  let filter = {};

  // If brand is provided, filter by brand
  if (brand) {
    filter.brand = brand;
  }

  // If price range is provided, filter by price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice); // Price greater than or equal to minPrice
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice); // Price less than or equal to maxPrice
    }
  }

  // Fetch products based on the filter
  const products = await Product.find(filter);
  res.json(products);
};
// Delete a product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { name, brand, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  // Find the product by ID
  const product = await Product.findById(req.params.id);

  if (product) {
    // Update the product fields
    product.image = image || product.image;
    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
