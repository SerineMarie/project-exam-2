import styles from "../styles/Home.module.scss";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import {useRouter} from "next/router";
import Layout from '../components/layout/Layout';
import Head from '../components/head/Head';
import Heading from "../components/heading/Heading";


export default function Home(props) {
  console.log(props)
  const router = useRouter();
  return (
    <Layout>
      <Head title={props.content.data.attributes.title}/>
      <div className={styles.container}>
        <Heading title={props.content.data.attributes.title}/>
        <p className={styles.infocard}>{props.content.data.attributes.description}</p>
        <button type="button" onClick={() => router.push('/accomodations')} className={styles.bookBtn}>BOOK NOW</button>
      </div>
      <div className={styles.cardContainer}>
          {props.content.data.attributes.hotels.data.map((shortcut) =>{
            return <a key={shortcut.id} className={styles.card}>
                      {/* {props.content.data.attributes.images.data.map((shortcutImages) =>{
                        // return <img src={shortcutImages.url}></img> 
                        // <div style={{backgroundImage: shortcutImages.url}}></div>
                      })} */}
                      <h2 key={shortcut.attributes.id} className={styles.subTitle}>{shortcut.attributes.name}</h2>
                      <p>{shortcut.attributes.excerpt}</p>
                      <button className={styles.infoBtn}>Read more...</button>
                  </a>
          })}
      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const homeApi = BASE_URL + "homepage?populate=*";
  let content = [];

  try {
    const response = await axios.get(homeApi);
    console.log(response.data);
    content = response.data;
    
  } catch(error){
    console.log(error)
  }

  return {
    props: {
      content: content,
    },
  };
}
