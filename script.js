const mealDetailsContainer = document.querySelector("#meal-details-container");

const loadAllMeal = () => {
  const searchBtn = document.querySelector("#search-btn");
  searchBtn.addEventListener("click", () => {
    mealDetailsContainer.style.display = "none";
    const mealName = document.querySelector("#meal-name").value;
    // console.log(mealName);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.meals);
        displayMeal(data.meals);
      });
    document.querySelector("#meal-name").value = "";
  });
};

const displayMeal = (meals) => {
  const mealContainer = document.querySelector("#meals");
  mealContainer.innerHTML = " ";

  if (meals == null) {
    console.log("Meal Not Found");
    mealContainer.innerHTML = `
      <h4 class="text-muted">Meal Not Found, try again!</h4>
    `;
  } else {
    meals.forEach((meal) => {
      console.log(meal);
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.innerHTML = `
        <a href="#" onclick="mealDetails(${meal.idMeal})">
          <div class="card card-custom mb-5">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-primary"> ${meal.strMeal}</h5>
              <p class="card-text ">${meal.strInstructions.slice(0, 100)}</p>
            </div>
          </div>
        </a>
      `;
      mealContainer.appendChild(div);
    });
  }
};

const mealDetails = (mealId) => {
  // console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.meals[0]);
      displayMealDetails(data.meals[0]);
    });
};

const displayMealDetails = (meal) => {
  // console.log(meal.strMeal);

  mealDetailsContainer.style.display = "block";
  mealDetailsContainer.innerHTML = " ";
  const div = document.createElement("div");
  div.classList.add("meal-details");

  div.innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid"/>
    <h3 class="text-primary">${meal.strMeal}</h3>
    <h5>Ingredients</h5>
    <ul>
      <li>${meal.strIngredient1}</li>
      <li>${meal.strIngredient2}</li>
      <li>${meal.strIngredient3}</li>
      <li>${meal.strIngredient4}</li>
      <li>${meal.strIngredient5}</li>
    </ul>
  `;
  mealDetailsContainer.appendChild(div);
  mealDetailsContainer.scrollIntoView();
};

loadAllMeal();
