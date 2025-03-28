import { useNavigate } from "react-router";
import Tag from "./Tag";
import FavoriteButton from "./FavoriteButton";
import { createContext, useEffect, useState } from "react";



const RecipeCard = ({ title, imgURL, area, category, recipePageDynamicRenderHandler = undefined }) => {

    const navigate = useNavigate();

    const articleStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,1.5)), url(${imgURL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        aspectRatio: 1 / 1.5
    }

    const goToLinkedPage = (e) => {
        navigate(`/${title.toLowerCase().split(" ").join("-")}`)
    }

    return (
        <>
            <div className="recipe__card--holder">
                    <FavoriteButton cardTitle={title} recipePageDynamicRenderHandler={recipePageDynamicRenderHandler} />
                <article className="recipe__card recipe__img" style={articleStyle} onClick={goToLinkedPage} >
                    <div className="recipe__card--main-info no-mouse-event">
                        <h2 className="no-mouse-event">{title}</h2>
                        <div className={`recipe__card--main-info-flag ${area} no-mouse-event`}></div>
                    </div>
                    <Tag name={category} inMenu={false} />
                </article>
            </div>
        </>
    )
}

export default RecipeCard;