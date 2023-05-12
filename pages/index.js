import  Header  from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Home({ country }) {
  const { data: session } = useSession();
  // console.log(country);
  // console.log(session);
  // console.log(session?.user?.image);
  return (
    <>
      <Header country={country} />
      {session ? "Logged id" : "Not logged in"}
      <Footer country={country} />
    </>
  )
}

export async function getServerSideProps() {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.COUNTRY_API_KEY}`)
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      country: { name: data.name, flag: data.flag.emojitwo },
    },
  };
}