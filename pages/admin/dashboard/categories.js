import AdminLayout from '../../../components/admin/layout';
import CreateCategories from '../../../components/admin/categories/CreateCategories';
import ListCategories from '../../../components/admin/categories/ListCategories';
import db from '../../../utils/db';
import Category from '../../../models/CategoryModel';

import { useState } from 'react';

const Categories = ({ categories }) => {
  const [data, setData] = useState(categories);
  console.log(data);

  return (
    <AdminLayout>
      <div>
        <CreateCategories setCategories={setData} />
        <ListCategories categories={data} setCategories={setData} />
      </div>
    </AdminLayout>
  )
}

export default Categories;

export async function getServerSideProps(context) {
  db.connectDb();

  const categories = await Category
    .find({})
    .sort({ updatedAt: -1 })
    .lean();

  db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}