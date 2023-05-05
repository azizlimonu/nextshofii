import React, { useState } from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div className={styles.footer__newsletter}>
      <h3>Sign Up For Our NewsLetter</h3>

      <div className={styles.footer__flex}>
        <input
          type='text'
          placeholder='YourEmail@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className={styles.btn_primary}
          disabled={loading === true}
          style={{ cursor: `${loading ? "not-allowed" : ""}` }}
          onClick={() => console.log("Subscribed")}
        >
          Subscribe
        </button>
      </div>

      {loading && <div>loading...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{" "}
        <Link href="/">our Privacy & Cookie Policy</Link>
      </p>
    </div>
  )
}

export default NewsLetter