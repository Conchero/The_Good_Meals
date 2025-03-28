
class APIManager {

    static apiCategoriesURL = "http://localhost:3000/categories";
    static apiAreasURL = "http://localhost:3000/areas";
    static apiRecipesURL = "http://localhost:3000/recipes";
    static apiIngredientsURL = "http://localhost:3000/ingredients";

    static fetchDaySelectionRecipes = async () => {
        const returnArray = [];

        const response = await fetch(`${this.apiRecipesURL}/day-selection`);
        const data = await response.json();
        data.forEach(el => {
            returnArray.push(el);
        });
        return returnArray;
    }

    static fetchRecipe = async (name) => {
        const response = await fetch(`${this.apiRecipesURL}/${name}`);
        const data = await response.json();
        return data;
    }

    static fetchRecipeWithFilter = async (category, area) =>{
        let queryUrl = "";
        if (category !== "")
        {
            queryUrl += `?category=${category}`
        }
        
        if (area !== "")
        {
            queryUrl += queryUrl === "" ? `?area=${area}` : `&area=${area}`
        }
        if (queryUrl !== "")
        {
            console.log(this.apiRecipesURL+queryUrl);
            const response = await fetch(`${this.apiRecipesURL+queryUrl}`);
            const data = await response.json();
            return data;
        }
        else{
            return undefined;
        }

    }

    static fetchIngredientByName = async (name) => {
        const returnArray = [];
        const response = await fetch(`${this.apiIngredientsURL}/${name}`);
        const data = await response.json();

        return data;
    }

    static fetchIngredientList = async () => {
        const returnArray = [];
        const response = await fetch(`${this.apiIngredientsURL}`);
        const data = await response.json();
        data.forEach((el) => returnArray.push(el));
        return data;
    }


    static fetchCategoryList = async () => {
        const returnArray = [];
        const response = await fetch(`${this.apiCategoriesURL}`);
        const data = await response.json();
        data.forEach((el) => returnArray.push(el));
        return data;
    }

    static fetchAreaList = async () => {
        const returnArray = [];
        const response = await fetch(`${this.apiAreasURL}`);
        const data = await response.json();
        data.forEach((el) => returnArray.push(el));
        return data;
    }
}


export default APIManager;