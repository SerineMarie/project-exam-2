import axios from "axios";
import { BASE_URL } from "../../constans/api";
import styles from "../../styles/Home.module.scss"
import Head from "../../components/head/Head";
import Heading from "../../components/heading/Heading";
import Layout from "../../components/layout/Layout";

export default function Accomodation({accomodation}){
    return (
        <Layout>
            {/* <Head title={accomodation.attributes.name}/> */}
            <Heading title={accomodation.attributes.name}/>
            <div className={styles.container}></div>
        </Layout>
    );
}

export async function getStaticPaths(){
    const hotelUrl= BASE_URL + "/hotels?populate=*";
    try{
        const response = await axios.get(hotelUrl);
        console.log(response)
        const accomodations = response.data.data;
        const paths = accomodations.map((accomodations)=>({
            params: {slug: accomodations.attributes.slug}
        }));
        console.log(paths);
        return {
            paths: paths, 
            fallback: false,
        };
    } catch(error){
        console.log(error)
    }
}

export async function getStaticProps({params}){
    const hotelApi = BASE_URL + "/hotels"; 
    const url = `${hotelApi}?hotels=${params.slug}&populate=*`;
    let accomodation = null;
    try {
        const res = await axios.get(url);
        console.log(res.data);
        accomodation = res.data;
    } catch(error){
        console.log(error)
    }
    return {
        props: {accomodation: accomodation},
    }
}