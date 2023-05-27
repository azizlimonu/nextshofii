import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import styles from './style.module.scss';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cartSlice";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      fontSmoothing: "antialiased",
    },
    invalid: {
      iconColor: "#fd010169",
      color: "#fd010169",
    },
  },
};

const FormStripe = ({ total, order_id }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
          amount: total,
          id,
        });
        if (res.data.success) {
          dispatch(emptyCart());
          window.location.reload(false);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">PAY</button>
        {error && <span className={styles}>{error}</span>}
      </form>
    </div>
  );
}

export default FormStripe;