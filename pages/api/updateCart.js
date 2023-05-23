import nc from "next-connect";
// auth
import Product from '../../models/ProductModel';
import User from '../../models/UserModel';
import Cart from '../../models/CartModel';
import db from '../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();

    const promises = req.body.products.map(async (product) => {
      let dbProduct = await Product.findById(product._id).lean();

      let originalPrice = dbProduct.subProducts[product.style]
        .sizes
        .find((x) => x.size == product.size)
        .price;

      let quantity = dbProduct.subProducts[product.style]
        .sizes
        .find((x) => x.size == product.size)
        .qty;

      let discount = dbProduct.subProducts[product.style].discount;

      return {
        ...product,
        priceBefore: originalPrice,
        price: discount > 0
          ? originalPrice - originalPrice / discount
          : originalPrice,
        discount,
        quantity,
        shippingFee: dbProduct.shipping
      };
    });

    const data = await Promise.all(promises);

    db.disconnectDb();
    return res.json(data);

  } catch (error) {
    return res.statusCode(500).json({ message: error.message });
  }
});

export default handler;