import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import db from '../../../../utils/db';
import slugify from 'slugify';
import SubCategory from '../../../../models/SubCategoryModel';

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();

    const exist = await SubCategory.findOne({ name });
    if (exist) {
      db.disconnectDb();
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }

    await new SubCategory({
      name,
      parent,
      slug: slugify(name)
    }).save();

    db.disconnectDb();
    res.status(200).json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    console.log("Updated => ", id);
    console.log("Updated => ", name);

    db.connectDb();
    const exist = await SubCategory.findById(id);
    if (exist) {
      await SubCategory.findByIdAndUpdate(id, {
        name,
        parent,
        slug: slugify(name),
      });
      db.disconnectDb();
      return res.status(200).json({
        message: "SubCategory has been updated successfuly",
        subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
      });
    };

    db.disconnectDb();
    return res.status(404).json({ message: "SubCategory not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    db.disconnectDb();
  }
});

export default handler;
