import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import Category from '../../../../models/CategoryModel';
import db from '../../../../utils/db';
import slugify from 'slugify';

const handler = nc().use(auth).use(admin);

handler.delete(async (req, res) => {
  try {
    const id = req.query.id;
    console.log("DELETE =>", id);
    db.connectDb();
    const exist = await Category.findById(id);

    if (exist) {
      await Category.findByIdAndRemove(id);
      db.disconnectDb();

      return res.status(200).json({
        message: "Category has been deleted successfuly",
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      });
    }
    
    db.disconnectDb();
    return res.status(404).json({
      message: "Category has not found in database",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    db.disconnectDb();
  }
});

export default handler;
