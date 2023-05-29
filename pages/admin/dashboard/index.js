import Head from 'next/head';
import React from 'react';
import AdminLayout from '../../../components/admin/layout';
import styles from '../../../styles/admindashboard.module.scss';
import Link from "next/link";

const AdminDashboard = () => {
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
           
          </div>

        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>

            </div>

            <div className={styles.card__infos}>
              <h4>Aziz User</h4>
              <span>Users</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
         
            </div>

            <div className={styles.card__infos}>
              <h4>+89</h4>
              <span>Orders</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
       
            </div>

            <div className={styles.card__infos}>
              <h4>blablbla</h4>
              <span>Products</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
            
            </div>
            <div className={styles.card__infos}>
              <h4>+$</h4>
              <h5>
                -
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

              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </div>
  )
}

export default AdminDashboard;