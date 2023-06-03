import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import Product from '../../../../models/ProductModel';
import db from '../../../../utils/db';
import slugify from 'slugify';

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      parent,
      color,
      images,
      sizes,
      discount,
      name,
      description,
      brand,
      details,
      questions,
      category,
      subCategories,
    } = req.body;

    // check if have parent product from req body
    if (parent) {
      const existParent = await Product.findById(parent);
      // if theres no parent product
      if (!existParent) {
        db.disconnectDb();
        return res.status(400).json({
          message: "Parent product not found !",
        });
      } else {
        // if theres parent product update to the subProduct array
        await parent.updateOne({
          $push: {
            subProducts: {
              color,
              images,
              sizes,
              discount,
            },
          },
        },
          { new: true }
        );

        db.disconnectDb();
        return res.status(200).json({ message: "product added to subProduct successfully." });
      };
    }

    // if dont have parent Product
    const existingProduct = await Product.findOne({ name });
    // check if the product already exists else create the product
    if (existingProduct) {
      db.disconnectDb();

      return res.status(400).json({
        message: "Product already exists!",
      });
    }

    const slug = slugify(name);
    const newProduct = new Product({
      name,
      description,
      brand,
      details,
      questions,
      slug,
      category,
      subCategories,
      subProducts: [
        {
          color,
          images,
          sizes,
          discount,
        },
      ],
    });

    await newProduct.save();
    db.disconnectDb();
    res.status(200).json({ message: "Product created successfully." });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;