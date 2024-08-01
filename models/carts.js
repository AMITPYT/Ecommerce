const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
},
  products: [{ 
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products' 
    },
    quantity: { 
        type: Number, 
        default: 1 
    }
  }],
  shippingAddress: { 
    type: String 
}
});

module.exports = mongoose.model('Cart', CartSchema);
