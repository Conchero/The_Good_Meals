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

        setRefresh(true);

        let favoriteArray = [];
        const saveName = cardTitle.toLowerCase().split(" ").join("-");
        if (JSON.parse(localStorage.getItem("favoriteRecipes"))) {
            favoriteArray = JSON.parse(localStorage.getItem("favoriteRecipes"));

            console.log(`1 - Favorite array from local storage ${favoriteArray}`)

            const newFavoriteArray = [];
            let removeFavorite = false;
            favoriteArray.forEach((favorite) => {
                console.log(favorite);
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
                console.log(`2 - push ${newFavoriteArray}`);
            }
            else {
                localStorage.removeItem("favoriteRecipes")
                console.log(`delete local storage`);
            }

        }
        else {
            console.log(`create and push ${saveName}`);
            favoriteArray.push(saveName);
            localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteArray));
        }


        if (recipePageDynamicRenderHandler)
        {
            recipePageDynamicRenderHandler();
        }
    }


    const checkFavorite = () => {
        if (JSON.parse(localStorage.getItem("favoriteRecipes"))) {
            const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
            setFavorite(false);
            favoriteRecipes.forEach(recipeTitle => {
                if (cardTitle.toLowerCase().split(" ").join("-") === recipeTitle) {
                    console.log(cardTitle, recipeTitle);
                    setFavorite(true);
                    return;
                }
              
            })
        }
    }

    return (<div className={`fake-button recipe__card--fav ${favorite ? "favorite" : ""}`} onClick={ addToFavorite}>
        <FontAwesomeIcon icon={faHeart} className="no-mouse-event" />
    </div>)
}



export default FavoriteButton;