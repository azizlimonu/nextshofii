import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from '../../../styles/admindashboard.module.scss'
import AdminLayout from '../../../components/admin/layout';
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notification from "../../../components/admin/dashboard/Notification";

import User from "../../../models/UserModel";
import Order from "../../../models/OrderModel";
import Product from "../../../models/ProductModel";
import db from '../../../utils/db';

import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";

const AdminDashboard = ({ users, orders, products }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Shoppay - Admin Dashboard</title>
      </Head>

      <AdminLayout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>

          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notification />
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>

            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>

            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>

            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>

            <div className={styles.card__infos}>
              <h4>+{orders.reduce((a, val) => a + val.total, 0).toFixed(2)}$</h4>
              <h5>
                -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)}
                $ Unpaid yet.
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>

        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{order.total} $</td>
                    <td>
                      {order.isPaid ? (
                        <img src="/images/verified.png" alt="" />
                        ) : (
                        <img src="/images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} 
                        ${order.status == "Packaging"
                            ? styles.not_processed
                            : order.status == "Processing"
                              ? styles.processing
                              : order.status == "Dispatched"
                                ? styles.dispatched
                                : order.status == "Cancelled"
                                  ? styles.cancelled
                                  : order.status == "Completed"
                                    ? styles.completed
                                    : ""
                          }`}
                      >
                        {order.status}
                      </div>
                    </td>

                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>

            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default AdminDashboard;

export async function getServerSideProps({ req }) {
  await db.connectDb();

  const users = await User.find().lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .lean();
  const products = await Product.find().lean();

  const filteredOrders = orders.filter(order => order.user !== null);
  await db.disconnectDb();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(filteredOrders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
