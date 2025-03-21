import { useEffect } from "react";
import Header from "./Header"

const Homepage = () => {

    useEffect(()=>{
        test();
    },[])

    const test = async () => {
        const v = await fetch("http://localhost:3001/api/recipe");
        console.log(v.json())
    }

    return (
    <>
        <Header canSearch={true} />
    </>)
}


export default Homepage;