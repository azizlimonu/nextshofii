import nc from "next-connect";
// auth
import Product from '../../../models/ProductModel';
import User from '../../../models/UserModel';
import Cart from '../../../models/CartModel';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    // get user info from body
    const { address, userId } = req.body;
    // get user information
    const user = User.findById(userId);
    // push the address from body to the user info
    await user.updateOne({
      $push: {
        address: address,
      },
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });

  } catch (error) {
    return res.statusCode(500).json({ message: error.message });
  }
});

export default handler;