import React from 'react';
import AdminLayout from '../../../components/admin/layout';
import styles from '../../../styles/createproduct.module.scss';
import { Form, Formik } from 'formik';

const CreateProduct = () => {
  return (
    <AdminLayout>
      <div className={styles.header}>Create Product</div>

      <Formik>
        {(formik) => (
          <Form>
            {/* Images Input File */}

            <div className={styles.flex}>
              {/* Image Color */}
              {/* product span color */}
            </div>

            {/* Colors input */}

            {/* Style Input */}

            {/* Singular select parent */}
            {/* Singular select category */}

            {/* multiple secet of sub categories */}

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