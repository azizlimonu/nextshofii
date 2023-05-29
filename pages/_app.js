import '../styles/globals.scss';
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import store from '../store';
import { SessionProvider } from "next-auth/react";
import Layout from '../components/layout/Layout';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Shofii Store</title>

        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <PayPalScriptProvider
                deferLoading={true}
                options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}
              >
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
                <Component {...pageProps} />
              </PayPalScriptProvider>
            </Layout>
          </PersistGate>
        </Provider>
      </SessionProvider>

    </>
  )
}

export default MyApp
