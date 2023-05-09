import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/signin.module.scss';
import CircledIconBtn from "../components/button/CircledIconBtn";
import LoginInput from "../components/input/loginInput";

import Link from "next/link";
import Image from 'next/image';
import { BiLeftArrowAlt } from "react-icons/bi";
import { Form, Formik } from 'formik';
import { Router } from "next/router";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import * as Yup from "yup";
import { useState } from 'react';


const Signin = ({ providers, callbackUrl, csrfToken }) => {


  const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
  };

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  // destructure user object
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  console.log(user);

  const country = {
    name: "Indonesia",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/id.svg"
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Login Validation ==========================================
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email Address Is Required")
      .email("Please Enter A Valid Email Address"),
    login_password: Yup.string().required("Please enter a password")
  });
  // Login End ================================================>

  // Register Validation =======================================
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Whats your name ?")
      .min(2, "First Name must be between 2-16 Characters")
      .max(16, "Maximum 16 Character")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Max 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  })
  // Register End =============================================>


  // S-In handler ============================================
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  }
  // S-In End ===============================================>


  // S-Up handler ============================================
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/signup', {
        name, email, password
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");

      }, [2000]);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  }
  // S-Up End ===============================================>

  return (
    <>
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Theres fantastic product with fantastic price <Link href='/' Go Shopping></Link>
            </span>
          </div>

          {/* Sign In Form */}
          <div className={styles.login__form}>
            <h1>Sign In</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                // signInHandler();
                console.log("Sign In", user);
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or Continue With</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <Image
                          src={`/icons/${provider.name}.png`}
                          alt='provider'
                          width={100}
                          height={100}
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SignUp Form */}
        <div className={`${styles.login__container} ${styles.login__containeractive}`}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                // signUpHandler();
                console.log("Sign Up", user);
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country="Indonesia" />
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  // const { callbackUrl } = query;

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: callbackUrl,
  //     },
  //   };
  // }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      // callbackUrl,
    },
  };
}

export default Signin;