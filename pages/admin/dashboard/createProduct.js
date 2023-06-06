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
import ColorsForm from '../../../components/admin/createProduct/colorsForm';
import StyleForm from '../../../components/admin/createProduct/styleForm';
import SingularSelect from '../../../components/select/SingularSelect';
import MultipleSelect from '../../../components/select/MultipleSelect';
import AdminInput from '../../../components/input/adminInput';
import DialogModal from '../../../components/dialogmodal';
import { hideDialog, showDialog } from '../../../store/dialogSlice';
import ImagesForm from '../../../components/admin/createProduct/imagesForm';
import { useSelector } from 'react-redux';
import SizesForm from '../../../components/admin/createProduct/optionalForm/SizesForm';
import DetailsForm from '../../../components/admin/createProduct/optionalForm/DetailsForm';
import QuestionsForm from '../../../components/admin/createProduct/optionalForm/QuestionsForm';
import { validateCreateProduct } from '../../../utils/validation';
import { uploadImages } from '../../../libs/upload';
import dataURItoBlob from '../../../utils/dataURItoBlob';
import { toast } from 'react-toastify';
import DotLoaders from '../../../components/loaders/DotLoaders';

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
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(loading);
  // const { dialog } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    const getParentData = async () => {
      // Only fetch data if a value has been selected
      if (product.parent !== "") {
        const { data } = await axios.get(`/api/product/${product.parent}`);
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
        const { data } = await axios.get(`/api/admin/subcategory/${product.category}`);
        setSubs(data);
      };
      getSubProduct();
    }
  }, [product?.category]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });

  // validate product handler before actually create product
  const createProduct = async () => {
    let isValid = validateCreateProduct(product, images);
    if (isValid == "valid") {
      createProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Please follow our instructions.",
          messages: isValid,
        })
      );
    }
  };

  // create product handler
  let uploaded_images = [];
  let style_img = "";
  const createProductHandler = async () => {
    try {
      setLoading(true);
      // check if theres image convert to blob and upload in cloudinary
      if (images) {
        const imagePromises = images.map(async (img) => {
          let blob = dataURItoBlob(img);
          let formData = new FormData();
          formData.append("path", "product images");
          formData.append("file", blob);

          const data = await uploadImages(formData);
          return data;
        });
        uploaded_images = (await Promise.all(imagePromises)).flat(Infinity);
        // console.log(imagePromises);
        // console.log("uploaded_images", uploaded_images);
      }

      // check if theres colors image, conver, upload in cloudinary
      if (product.color.image) {
        const blob = dataURItoBlob(product.color.image);
        const formData = new FormData();
        formData.append("path", "product style images");
        formData.append("file", blob);

        const cloudinary_style_img = await uploadImages(formData);
        style_img = cloudinary_style_img[0].url;
      }

      // post the product and save to Db
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        images: uploaded_images,
        color: {
          image: style_img,
          color: product.color.color,
        },
      });
      // console.log("Upload images=>", uploaded_images);
      // console.log("PRODUCT THAT SENT =>", product);
      setLoading(false);
      toast.success(data.message);
      setProduct(initialState);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <AdminLayout>
      {loading && <DotLoaders loading={loading} />}
      <div className={styles.header} onClick={() => createProduct()}>Create Product</div>
      <DialogModal />
      <Formik
        enableReinitialize
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
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <ImagesForm
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />

            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>

            <ColorsForm
              name="color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />

            <StyleForm
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />

            <SingularSelect
              name="parent"
              value={product.parent}
              placeholder="Parent product"
              data={parents}
              header="Add to an existing product"
              handleChange={handleChange}
            />

            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              handleChange={handleChange}
              disabled={product.parent}
            />

            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Select SubCategories"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}

            <div className={styles.header}>Basic Infos</div>

            <AdminInput
              type="text"
              label="Name"
              name="name"
              placholder="Product name"
              onChange={handleChange}
            />

            <AdminInput
              type="text"
              label="Description"
              name="description"
              placholder="Product description"
              onChange={handleChange}
            />

            <AdminInput
              type="text"
              label="Brand"
              name="brand"
              placholder="Product brand"
              onChange={handleChange}
            />

            <AdminInput
              type="text"
              label="Discount"
              name="discount"
              placholder="Product discount"
              onChange={handleChange}
            />

            <SizesForm
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />

            <DetailsForm
              details={product.details}
              product={product}
              setProduct={setProduct}
            />

            <QuestionsForm
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />
            {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
              */}

            <button
              type="submit"
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  );
}

export default CreateProduct;

export async function getServerSideProps(context) {
  db.connectDb();
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();
  db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
