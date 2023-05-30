import React, { useState } from 'react';
import Coupon from '../../../models/CouponModel';
import AdminLayout from '../../../components/admin/layout';
import ListCoupons from '../../../components/admin/coupons/ListCoupons';
import CreateCoupon from '../../../components/admin/coupons/CreateCoupon';
import db from '../../../utils/db';

const CouponsAdmin = ({ coupons }) => {
  const [data, setData] = useState(coupons);

  return (
    <AdminLayout>
      <CreateCoupon setCoupons={setData} />
      <ListCoupons coupons={data} setCoupons={setData} />
    </AdminLayout>
  )
}

export default CouponsAdmin;

export async function getServerSideProps(context) {
  db.connectDb();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  db.disconnectDb();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
