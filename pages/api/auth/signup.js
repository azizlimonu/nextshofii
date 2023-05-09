import nc from "next-connect";
import bcrypt from 'bcrypt';

import db from '../../../utils/db';
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/UserModel";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmail";
import { activateEmailTemplate } from "../../../utils/activateEmailTemplate";

const handler = nc();


handler.post(async (req, res) => {
  try {
    // connect db
    await db.connectDb();

    // get data from the body
    const { name, email, password } = req.body;

    // validate data from the body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });
    }

    // check user if they already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exsits." });
    }

    // encrypted the password
    const encryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: encryptedPassword });

    // save user to db
    const addedUser = await newUser.save();

    // create activate token and send to email user address
    const activate_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    console.log(activate_token);

    const url = `${process.env.BASE_URL}/activate/${activate_token}`;
    sendEmail(email,url,"","Activate Your Account.", activateEmailTemplate);

    await db.disconnectDb();
    res.status(200).json({ message: "User Created, activate your email to start" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
