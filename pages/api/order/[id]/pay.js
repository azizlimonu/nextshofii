import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import Order from '../../../../models/OrderModel';
import db from '../../../../utils/db';

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const order = await Order.findById(req.qurey.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };

      const newOrder = await order.save();

      await db.disconnectDb();
      
      res.json({ message: "Order is paid.", order: newOrder });

    } else {
      await db.disconnectDb();
      res.status(404).json({ message: "Order is not found." });
    }
    
  } catch (error) {
    console.log(error);
    db.disconnectDb();
    res.statusCode(500).json({ message: error.message });
  }
});

export default handler;