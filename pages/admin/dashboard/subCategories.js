import React, { useState } from 'react'
import AdminLayout from '../../../components/admin/layout'
import db from '../../../utils/db';
import Category from '../../../models/CategoryModel';
import SubCategory from '../../../models/SubCategoryModel';
import CreateSubCategories from '../../../components/admin/subCategories/CreateSubCategories';
import ListsSubCat from '../../../components/admin/subCategories/ListsSubCat';

const SubCategories = ({ categories, subCategories }) => {
  const [data, setData] = useState(subCategories);
  console.log("Data =", data);
  console.log("SubCategories => ", subCategories);
  console.log("categories => ", categories);

  return (
    <AdminLayout>
      <div>
        <CreateSubCategories
          setSubCategories={setData}
          categories={categories}
        />

        <ListsSubCat
          categories={categories}
          subCategories={data}
          setSubCategories={setData}
        />
      </div>
    </AdminLayout>
  )
}

export default SubCategories;

export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    }
  }
}