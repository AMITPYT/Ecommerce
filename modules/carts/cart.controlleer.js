const Cart = require('../../models/carts');
const sendEmail = require('../../utils/sendEmail');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (cart) {
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
  } else {
    cart = new Cart({
      user: req.user.id,
      products: [{ product: productId, quantity }],
    });
  }

  await cart.save();
  res.status(201).json(cart);
};

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
  res.json(cart);
};

const checkoutCart = async (req, res) => {
  const { shippingAddress } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  cart.shippingAddress = shippingAddress;
  await cart.save();

  await sendEmail(
    req.user.email,
    'Order Confirmation',
    `Your order has been placed successfully. Shipping to: ${shippingAddress}`
  );

  await Cart.deleteOne({ _id: cart._id });
  res.status(200).json({ message: 'Order placed successfully and cart cleared' });
};

module.exports = {
  addToCart,
  getCart,
  checkoutCart,
};
