import nc from "next-connect";
import User from "../../../../models/UserModel";
import db from "../../../../utils/db";
import auth from "../../../../middleware/auth";

const handler = nc().use(auth);

handler.delete(async (req, res) => {
  try {
    db.connectDb();
    const id = req.query.id;
    console.log("ID => ", id);
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        $pull: { address: { _id: id } },
      },
      { new: true }
    );
    db.disconnectDb();
    res.json({ addresses: user.address.filter((a) => a._id != id) });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default handler;