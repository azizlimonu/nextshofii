import React from 'react';
import AdminLayout from '../../../components/admin/layout';
import OrdersTable from '../../../components/admin/orders/OrdersTable';
import db from '../../../utils/db';
import Order from '../../../models/OrderModel';
import User from '../../../models/UserModel';

const OrdersPage = ({ orders }) => {
  console.log("ORDERSSS =", orders);

  return (
    <AdminLayout>
      <OrdersTable rows={orders} />
    </AdminLayout>
  )
}

export default OrdersPage;

export async function getServerSideProps(context) {
  await db.connectDb();

  const orders = await Order.find({})
    .populate({
      path: "user",
      model: User,
      select: "name email image",
      // match: { $ne: null },
    })
    .sort({ createdAt: -1 })
    .lean();

  const filteredOrders = orders.filter(order => order.user !== null);

  return {
    props: {
      orders: JSON.parse(JSON.stringify(filteredOrders)),
    },
  };
}