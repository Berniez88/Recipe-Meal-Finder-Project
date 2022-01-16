const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//Event Listeners
searchBtn.addEventListener("click", getMealList);

//Getting meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  // Instead of https://www.themealdb.com/api/json/v1/1/filter.php?i=egg we can do ${} to search what the user inputs
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // data will display an array of meals the user searches
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                <div class="meal-item" data-id = "${meal.idMeal}>
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food" />
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>            
            `;
        });
      } else {
        html = "No results found";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}
