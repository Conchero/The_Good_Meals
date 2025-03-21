const migrateCategory = async () => {
  const categoriesArray = [];

  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  const data = await response.json();
  data.meals.forEach(el => categoriesArray.push({ name: el.strCategory }));

  fetch('http://localhost:3000/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoriesArray)
  });

}


const migrateIngredientsWithPicture = async () => {
  const ingredientArray = [];

  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  const data = await response.json();
  data.meals.forEach(el => ingredientArray.push({ name: el.strIngredient }));

  ingredientArray.forEach(el => el.image = `www.themealdb.com/images/ingredients/${el.name.toLowerCase().split(" ").join("_")}.png`);


  //ingredientArray.forEach(el =>  );
  fetch('http://localhost:3000/ingredients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredientArray)
  })
}

const migrateArea = async () => {
  const areaArray = [];

  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  const data = await response.json();
  data.meals.forEach(el => areaArray.push({ name: el.strArea }));

  fetch('http://localhost:3000/areas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(areaArray)
  })
}


const migrateRandomRecipe = async () => {

  const recipe = {
    title: "",
    category: "",
    image: "",
    area: "",
    ingredients: {
      name: [],
      portion: [],
    },
    instructions: []
  };

  const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await response.json();

  data.meals.forEach(el => {
    recipe.title = el.strMeal;
    recipe.category = el.strCategory;
    recipe.image = el.strMealThumb;
    recipe.area = el.strArea,
      recipe.instructions = (el.strInstructions.split("\n"));

    for (let i = 1; i < 20; i++) {
      let ingredientString = el[`strIngredient${i}`]
      let portionString = el[`strMeasure${i}`]
      if (typeof (ingredientString) === typeof ("") && ingredientString != '' && ingredientString != ' ') {
        recipe.ingredients.name.push(ingredientString);
      }
      if (typeof (portionString) === typeof ("") && portionString != '' && portionString != ' ') {
        recipe.ingredients.portion.push(portionString);
      }
    }
  })

  //console.log(recipe);
  fetch('http://localhost:3000/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  })
}

module.exports = { migrateCategory, migrateIngredientsWithPicture, migrateArea, migrateRandomRecipe };
