import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import Coupon from '../../../../models/CouponModel';
import db from '../../../../utils/db';
import slugify from 'slugify';

const handler = nc().use(auth).use(admin);

handler.delete(async (req, res) => {
  try {
    const { id } = req.query;
    db.connectDb();

    const exist = await Coupon.findById(id);
    if (exist) {
      await Coupon.findByIdAndRemove(id);
      db.disconnectDb();
      return res
        .status(200)
        .json({
          message: "Coupon deleted Successfully",
          coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
        });
    }

    db.disconnectDb();
    return res.json({
      message: `Coupon ${id} Not Found.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;
    const { id } = req.query;
    db.connectDb();

    const exist = await Coupon.findById(id);
    if (exist) {
      await Coupon.findByIdAndUpdate(id, {
        coupon,
        discount,
        startDate,
        endDate,
      });
      db.disconnectDb();
      return res
        .status(200)
        .json({
          message: "Coupon Updated Succesfully",
          coupons: await Coupon.find({}).sort({ createdAt: -1 }),
        });
    }

    db.disconnectDb();
    return res.status(404).json({
      message: `Coupon Cannont be found and updated`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;