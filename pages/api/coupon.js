import nc from 'next-connect';
import Coupon from '../../models/CouponModel';
import db from '../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon, startDate, endDate, discount } = req.body;
    const exist = await Coupon.findOne({ coupon });
    if (exist) {
      return res.status(400).json({
        message: "This Coupon name already exists, try with a different name.",
      });
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    db.disconnectDb();

    return res.json({
      message: "Coupon created successfully !",
      coupons: await Coupon.find({}),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
