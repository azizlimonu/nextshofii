import nc from 'next-connect';
import Coupon from '../../../models/CouponModel';
import User from '../../../models/UserModel';
import Cart from '../../../models/CartModel';
import auth from '../../../middleware/auth';
import db from '../../../utils/db';

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();

    const { coupon } = req.body;
    const user = User.findById(req.user);
    const checkCoupon = await Coupon.findOne({ coupon });

    if (checkCoupon == null) {
      return res.json({ message: "Invalid coupon" });
    }

    const { cartTotal } = await Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    res.json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });

    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
