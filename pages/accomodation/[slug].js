import axios from "axios";
import { BASE_URL } from "../../constans/api";
import styles from "../../styles/Home.module.scss"
import Head from "../../components/common/head/Head";
import Heading from "../../components/common/heading/Heading";
import Layout from "../../components/common/layout/Layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Router from "next/router";
import Image from 'next/image'

export default function Accomodation({accomodation}){
    const router = Router
    return (
        <Layout>
            <Head title={accomodation.attributes.name}/>
            <div className={styles.container}>
                <Heading title={accomodation.attributes.name}/>
                <h3 className={styles.h3}>Address: {accomodation.attributes.location}</h3>
                <div className={styles.accomodationsContainer}>
                    <div className={styles.carouselContainer}>
                        <Carousel
                            autoPlay={false}
                            emulateTouch={true}
                            infiniteLoop={true}
                            showThumbs={false}
                            width="100%">
                            {accomodation.attributes.images.data.map((image) => {
                                return(
                                    <div className={styles.carouselImage} key={image.id}>
                                        <Image className={styles.images} src={image.attributes.url} alt="Hotel room" width={1200} height={800}/>
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className={styles.textContainer}>
                        <h2 className={styles.subTitle}>{accomodation.attributes.name}</h2>
                        <p>{accomodation.attributes.description}</p>
                        <button type="button" onClick={() => router.push('/booking')} className={styles.bookBtn}>BOOK NOW</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths(){
    const hotelUrl= BASE_URL + "/hotels?populate=*";
    try{
        const response = await axios.get(hotelUrl);
        const accomodations = response.data.data;
        const paths = accomodations.map((accomodations)=>({
            params: {slug: accomodations.attributes.slug}
        }));
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
        accomodation = res.data;
    } catch(error){
        console.log(error)
    }
    return {
        props: {
            // Strapi returns filtered responses as an array.
            // Since we know our filtered response will always only be a single item (no duplicate slugs) we can return this item.
            accomodation: accomodation.data[0]
        },
    }
}