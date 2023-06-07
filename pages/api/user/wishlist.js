import nc from 'next-connect';
import User from '../../../models/UserModel';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { product_id, style, size } = req.body;

    const user = await User.findById(req.user);

    const existingWishlist = user.wishList.find(
      (x) => x.product === product_id && x.style === style
    );

    if (existingWishlist) {
      await db.disconnectDb();
      return res
        .status(400)
        .json({ message: 'Product already exists in your wishlist.' });
    } else {
      await user.updateOne({
        $push: {
          wishList: {
            product: product_id,
            style,
            size,
          },
        },
      });
      await user.save(); 
      console.log(user);
      await db.disconnectDb();
      return res
        .status(200)
        .json({ message: 'Product successfully added to your wishlist.' });
    }

  } catch (error) {
    await db.disconnectDb();
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
