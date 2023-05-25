import nc from "next-connect";
import User from '../../../models/UserModel';
import db from '../../../utils/db';
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    // get user info from body
    const { address } = req.body;
    // get user information
    const user = User.findById(req.user);
    // push the address from body to the user info

    await user.updateOne({
      $push: {
        address: address,
      },
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.statusCode(500).json({ message: error.message });
  }
});

export default handler;