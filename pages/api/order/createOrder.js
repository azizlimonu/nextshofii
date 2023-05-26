import nc from 'next-connect';
import User from '../../../models/UserModel';
import Order from '../../../models/OrderModel';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;

    const user = await User.findById(req.user);

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    db.disconnectDb();
    
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;