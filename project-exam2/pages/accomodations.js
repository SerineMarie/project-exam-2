import styles from "../styles/Home.module.scss";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from "../components/head/Head";



export default function Accomodations(props) {
  console.log(props)
  return (
    <Layout>
      <Head title="Accomodations"/>
      <div className={styles.container}>
        <Heading title="Accomodations"/>
        <div>
        {props.accomodations.data.map((hotels) => {
          return <div key={hotels.slug} href={`hotels/${hotels.slug}`} className={styles.accomodationsCard}>
                      <div>IMAGES</div>
                      <div className={styles.card}>
                        <h2 key={hotels.attributes.id}>{hotels.attributes.name}</h2>
                        <p key={hotels.attributes.id}>{hotels.attributes.location}</p>
                        <p key={hotels.attributes.id}>{hotels.attributes.excerpt}</p>
                      </div>
                      <button className={styles.bookBtn}>BOOK NOW</button>
                  </div>
        })}</div>
      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const accomodationsApi = BASE_URL + "hotels?populate=*";
  let accomodations = [];

  try {
    const response = await axios.get(accomodationsApi)
    console.log(response.data);
    accomodations = response.data
  } catch(error){
    console.log(error)
  }
  return {
    props: {
        accomodations: accomodations,
    }
  }
}