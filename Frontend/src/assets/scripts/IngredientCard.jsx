import { useEffect, useState } from "react";
import APIManager from "./APIManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const IngredientCard = ({portion, name}) => {
    const [img, setImg] = useState([]);
    const loadingIcon = <FontAwesomeIcon icon={faSpinner} />;
    const apiName = name.toLowerCase().split(" ").join("-");

    useEffect(() => {
        fetchImage();
    }, [])

     const fetchImage = async () => {
        const response  = await APIManager.fetchIngredientByName(apiName);
        setImg(response);
    }
    
    if (img)
    {

     return (
        <div className="ingredient__card">
            <div className="ingredient__card--img">
                <h3 className="ingredient__card--portion">{portion}</h3>
            </div>
            <div className="ingredient__card--portion-div">
            <h3 className="ingredient__card--name">{name}</h3>
            </div>
        </div>
     )
    }
    else{
        <h1>aze</h1>
    }

}


export default IngredientCard;