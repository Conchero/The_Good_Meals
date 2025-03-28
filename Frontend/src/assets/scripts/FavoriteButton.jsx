import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


const FavoriteButton = ({ cardTitle , recipePageDynamicRenderHandler = undefined}) => {
    const [favorite, setFavorite] = useState(false);

    const [refresh, setRefresh] = useState(false);
    useEffect(() => {

        checkFavorite();

        if (refresh)
        {
            setRefresh(false);
        }
    }, [, refresh]);


    const addToFavorite = (e) => {
        let favoriteArray = [];
        const saveName = cardTitle.toLowerCase().split(" ").join("-");
        if (JSON.parse(localStorage.getItem("favoriteRecipes"))) {
            favoriteArray = JSON.parse(localStorage.getItem("favoriteRecipes"));

            const newFavoriteArray = [];
            let removeFavorite = false;
            favoriteArray.forEach((favorite) => {
                if (favorite !== saveName) {
                    newFavoriteArray.push(favorite);
                }
                else {
                    removeFavorite = true;
                }
            })

            if (!removeFavorite) {
                newFavoriteArray.push(saveName);
            }

            if (newFavoriteArray.length > 0) {
                localStorage.setItem("favoriteRecipes", JSON.stringify(newFavoriteArray));
            }
            else {
                localStorage.removeItem("favoriteRecipes")
            }

        }
        else {
            favoriteArray.push(saveName);
            localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteArray));
        }


        if (recipePageDynamicRenderHandler)
        {
            recipePageDynamicRenderHandler();
        }


        setRefresh(true);

    }


    const checkFavorite = () => {
        if (JSON.parse(localStorage.getItem("favoriteRecipes"))) {
            setFavorite(false);
            const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
            favoriteRecipes.forEach(recipeTitle => {
                if (cardTitle.toLowerCase().split(" ").join("-") === recipeTitle) {
                    setFavorite(true);
                    return;
                }
              
            })
        }
        else
        {
            setFavorite(false);
        }
    }

    return (<div className={`fake-button recipe__card--fav ${favorite ? "favorite" : ""} `} onClick={ addToFavorite}>
        <FontAwesomeIcon icon={faHeart} className="no-mouse-event" />
    </div>)
}



export default FavoriteButton;