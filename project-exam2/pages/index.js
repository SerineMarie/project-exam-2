import { BASE_URL } from "../constans/api";
import axios from "axios";
import Navigation from "../components/navigation/Navigation"
import Heading from "../components/heading/Heading";


export default function Home(props) {
  console.log(props)
  return (
    <Navigation>
      <Heading title="Home"/>
      <div className="wrapper">
        <h2>HELLO</h2>
        <h3>{props.content.data.attributes.title}</h3>
      </div>
    </Navigation>
  )
}

export async function getStaticProps(){
  const homeApi = BASE_URL + "homepage?populate=*";
  let content = [];

  try {
    const response = await axios.get(homeApi);
    console.log(response.data);
    content = response.data;
  } catch (error){
    console.log(error)
  }
  return {
    props: {
      content: content,
    },
  };
}