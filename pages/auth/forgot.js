import styles from '../../styles/forgot.module.scss';
import DotLoaders from '../../components/loaders/DotLoaders';
import CircledIconBtn from '../../components/button/CircledIconBtn';
import LoginInput from '../../components/input/loginInput';

import React, { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getSession } from "next-auth/react";
import Layout from '../../components/layout/Layout';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  }

  return (
    <>
      {loading && <DotLoaders loading={loading} />}
      <Layout>
        <div className={styles.forgot}>
          <div>
            <div className={styles.forgot__header}>
              <div className={styles.back__svg}>
                <BiLeftArrowAlt />
              </div>
              <span>
                Forgot your password ? <Link href="/">Login instead</Link>
              </span>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <CircledIconBtn type="submit" text="Send link" />
                  <div style={{ marginTop: "10px" }}>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && <span className={styles.success}>{success}</span>}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Forgot;