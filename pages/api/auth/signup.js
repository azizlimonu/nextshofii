import nc from "next-connect";
const handler = nc();

handler.post(async (req, res) => {
  try {
    // connect db
    // get data from the body
    // validate data from the body
    // check user if they already exists
    // validate and encrypted the password
    // save user to db
    // create activate token and send to email user address
    res.send("Test API Okay");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
