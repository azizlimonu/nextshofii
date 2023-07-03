import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import Category from '../../../../models/CategoryModel';
import db from '../../../../utils/db';
import slugify from 'slugify';

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDb();

    const exist = await Category.findOne({ name });
    if (exist) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }

    await new Category({ name, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log("Updated => ", id);
    console.log("Updated => ", name);
    
    db.connectDb();
    const exist = await Category.findById(id);
    if (exist) {
      await Category.findByIdAndUpdate(id, { name });
      db.disconnectDb();
      return res
        .status(200)
        .json({ 
          message: "Category updated now" ,
          categories: await Category.find({}).sort({ createdAt: -1 }),
        });
    }

    db.disconnectDb();
    return res.status(404).json({ message: "Category not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    db.disconnectDb();
  }
});

export default handler;
