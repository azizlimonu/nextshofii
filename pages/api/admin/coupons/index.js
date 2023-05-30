import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import Coupon from '../../../../models/CouponModel';
import db from '../../../../utils/db';
import slugify from 'slugify';

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;
    db.connectDb();
    const exist = await Coupon.findOne({ coupon });
    if (exist) {
      db.disconnectDb();
      return res
        .status(400)
        .json({ message: "Coupon already exist, Try a different coupon" });
    }
    await new Coupon({ coupon, discount, startDate, endDate }).save();
    db.disconnectDb();

    return res.json({
      message: `Coupon ${coupon} has been created successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;