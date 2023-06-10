import Header from '../../../components/header';
import Footer from '../../../components/footer';
import DotLoaders from '../../../components/loaders/DotLoaders';
import styles from "../../../styles/forgot.module.scss";
import CircledIconBtn from '../../../components/button/CircledIconBtn';
import LoginInput from '../../../components/input/loginInput';


import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";
import Layout from '../../../components/layout/Layout';

export default function Reset({ user_id }) {
  // console.log("user_id", user_id);

  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password.")
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error);
    }
  };

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
                Reset your password ? <Link href="/">Login instead</Link>
              </span>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                password,
                conf_password,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConf_password(e.target.value)}
                  />

                  <CircledIconBtn type="submit" text="Submit" />
                  <div style={{ marginTop: "10px" }}>
                    {error && <span className={styles.error}>{error}</span>}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const token = query.token.split(' ')
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const user = jwt.verify(token[0], process.env.RESET_TOKEN_SECRET)
  if (user == null) {
    console.log("Theres No Match User");
  }

  return {
    props: {
      user_id: user.id
    },
  };
};
