import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/layout';
import styles from '../../../styles/createproduct.module.scss';
import { Form, Formik } from 'formik';
import db from '../../../utils/db';
import Product from '../../../models/ProductModel';
import Category from '../../../models/CategoryModel';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as Yup from "yup";
import ImagesForm from '../../../components/admin/createProduct/imagesForm';
import ColorsForm from '../../../components/admin/createProduct/colorsForm';
import StyleForm from '../../../components/admin/createProduct/styleForm';
import SingularSelect from '../../../components/select/SingularSelect';
import MultipleSelect from '../../../components/select/MultipleSelect';

const initialState = {
  name: "",
  description: "",
  brand: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

const CreateProduct = ({ parents, categories }) => {
  console.log("parents", parents);
  console.log("categories", categories);

  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getParentData = async () => {
      // Only fetch data if a value has been selected
      if (product.parent !== "") {
        console.log("product parent id to api =", product.parent);
        const { data } = await axios.get(`/api/product/${product.parent}`);
        console.log("Parent Data", data);
        if (data) {
          setProduct({
            ...product,
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subCategories: data.subCategories,
            questions: [],
            details: [],
          });
        }
      }
    };
    getParentData();
  }, [product?.parent]);

  useEffect(() => {
    if (product.category !== "") {
      const getSubProduct = async () => {
        const { data } = await axios.get(`/api/admin/subCategory`, {
          params: {
            category: product.category,
          },
        });
        console.log("SubCat DATA", data);
        setSubs(data);
      };
      getSubProduct();
    }
  }, [product?.category]);

  const validate = {
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  };

  const createProduct = () => {
    console.log("OK");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <AdminLayout>
      <div className={styles.header}>Create Product</div>

      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            {/* Images Input File */}
            <ImagesForm
              name=""
              header=""
              text=""
              images={""}
              setImages={""}
              setColorImage={""}
            />

            <div className={styles.flex}>
              {product?.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}

              {product?.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>

            <ColorsForm
              name=""
              product={""}
              setProduct={""}
              colorImage={""}
            />

            <StyleForm
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />

            {/* Singular select parent */}
            <SingularSelect
              name="parent"
              value={product?.parent}
              placeholder="Parent product"
              data={parents}
              header="Add to an existing product"
              handleChange={handleChange}
            />

            {/* Singular select category */}
            <SingularSelect
              name="category"
              value={product?.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              handleChange={handleChange}
              disabled={product?.parent}
            />

            {/* multiple select of sub categories */}
            {product?.category && (
              <MultipleSelect

              />
            )}

            <div className={styles.header}>Basic Infos</div>

            {/* Admin Input Name */}
            {/* Admin Input Description */}
            {/* Admin Input Brand */}
            {/* Admin Input Discount */}

            {/* Sizes component */}
            {/* Details component */}
            {/* Question component */}

            <button
              type='submit'
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  )
}

export default CreateProduct;

export async function getServerSideProps(context) {
  db.connectDb();
  const results = await Product
    .find()
    .select("name subProducts")
    .lean();
  const categories = await Category.find().lean();
  db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}