import { useNavigate } from "react-router";
import Tag from "./Tag";

const RecipeCard = ({ title, imgURL, area, category }) => {

    const navigate = useNavigate();


    const articleStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,1.5)), url(${imgURL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        aspectRatio: 1 / 1.5
    }

    const goToLinkedPage = (e) => {
        console.log(title.toLowerCase().split(" ").join("-"));
        navigate(`/${title.toLowerCase().split(" ").join("-")}`)
    }

    return (
        <article className="recipe__card" style={articleStyle} onClick={goToLinkedPage}>
            <div className="recipe__card--main-info">
                <h2>{title}</h2>
                <div className={`recipe__card--main-info-flag ${area}`}></div>
            </div>
                <Tag name={category} inMenu={false} />
        </article>)
}

export default RecipeCard;