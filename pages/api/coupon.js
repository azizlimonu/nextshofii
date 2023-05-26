import nc from 'next-connect';
import Coupon from '../../models/CouponModel';
import db from '../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon, startDate, endDate, discount } = req.body;
    console.log(coupon);
    console.log(startDate);
    console.log(endDate);
    console.log(discount);
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
