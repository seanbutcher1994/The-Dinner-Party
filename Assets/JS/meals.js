(function() {
    var burger = document.querySelector('.navbar-burger');
    var nav = document.querySelector('#'+burger.dataset.target);

    burger.addEventListener('click', function(){
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });
  })();
  
const searchBar = document.querySelector('#get-hashtag')
const searchBtn = document.querySelector('#search-button')

var searchResultEl = $('#searchResult');
var searchCard = document.createElement ('div');
var ingredientList = document.querySelector('#ingredients-list');
var savedRecipes = document.querySelector('#saved-recipe');
var savedRecipeCard = document.createElement ('div');
var savedBtn = document.querySelector('#save-button')
// When the user gets to meals page
    // They can click into an input and type in an ingredient
        // An event listener listening for the submit button
// When the user types in an ingredient and presses submit
    // A random meal card pops up on the screen
        // for loop to create the elements for each part of recipe
        // DOM manipulation to pull data from API
    // the user can choose to save that recipe to local storage or
        // function attached to submit button to save recipe to local storage
    // Bonus: generate a different recipe
        // button to generate new random recipe with same ingredient

var pastSearchFoodEl = $('#past-search');
let recipeList = [];


function getMealRecipe (){
    // console.log(searchBar);
    var mealRecipeURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+searchBar.value;

    return fetch(mealRecipeURL)
        .then(function(response){
            return response.json()
        })
        .then (function(result){
            console.log(result);
            const mealID = result.meals[Math.floor(Math.random() * (result.meals.length))].idMeal
            console.log(mealID);

            var mealIDURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+mealID;
            return fetch(mealIDURL)
            .then(function(response){
                return response.json();
            })

            
            

            // .then(function(result){
            //     console.log(result);
            // })

        })


        .then(function(result){
        
            console.log(result);
            // Name of Dish
            var nameValue = result.meals[0].strMeal;
            console.log(nameValue);
            // Image of Dish
            var imageValue = result.meals[0].strMealThumb
            console.log(imageValue);
            // List of Ingredients and measurements
            var food = [];
            var strMeasure = [];
            var strIngredient = [];

    
            for (var property in result.meals[0]) {
                if (property.includes("strMeasure")) {
                    
                    
                   strMeasure.push(result.meals[0][property]);
                        
                    
                } else if (property.includes("strIngredient")) {
                    
                         
                    strIngredient.push(result.meals[0][property]);
                        
                    
                }
            }
            console.log(strMeasure);
    
            for(var i = 0; i < strMeasure.length; i++ ){
                food[i] = strMeasure[i] + " " + strIngredient[i];
            }
           
          
            // Method
            var method = result.meals[0].strInstructions;
            console.log(method);

//create local storage to save search history.

function storePreviousSearches(){
    var storedRecipes = [];
    
    if(localStorage.getItem('recipeList')){
       
       storedRecipes = JSON.parse(localStorage.getItem('recipeList'))
        storedRecipes.push({name: nameValue})
        console.log(storedRecipes);
        
        recipeList = storedRecipes;
        
        localStorage.setItem('recipeList', JSON.stringify(recipeList));
     } 
    console.log(storedRecipes);
    console.log(recipeList);
}
storePreviousSearches();

// function displayPreviousSearches(){
//     savedRecipes.textContent = "";

//     for (let i = recipeList.length - 1; i >= 0; i--){
//         var btn = document.createElement("button");
//         btn.setAttribute("type", "button");
//         btn.classList.add("row", "history-btn");
//         btn.setAttribute("id", "previousRecipeBtn");
//         btn.setAttribute("data-search", recipeList[i]);
//         btn.textContent = recipeList[i].name;

//         savedRecipes.append(btn);
//     }
//     console.log(btn.textContent);


// }
// displayPreviousSearches();

$(function(){
    $(".history-btn").click(function(){
        var previouSearch = $(this).html();
        var previousSearchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+previouSearch;
        console.log(previouSearch);
        return fetch(previousSearchURL)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log(result);
            console.log(result);
            // Name of Dish
            var nameValue = result.meals[0].strMeal;
            console.log(nameValue);
            // Image of Dish
            var imageValue = result.meals[0].strMealThumb
            console.log(imageValue);
            // List of Ingredients and measurements
            var food = [];
            var strMeasure = [];
            var strIngredient = [];

    
            for (var property in result.meals[0]) {
                if (property.includes("strMeasure")) {
                    
                    
                   strMeasure.push(result.meals[0][property]);
                        
                    
                } else if (property.includes("strIngredient")) {
                    
                         
                    strIngredient.push(result.meals[0][property]);
                        
                    
                }
            }
            console.log(strMeasure);
    
            for(var i = 0; i < strMeasure.length; i++ ){
                food[i] = strMeasure[i] + " " + strIngredient[i];
            }
           
          
            // Method
            var method = result.meals[0].strInstructions;
            console.log(method);

            searchCard.innerHTML = `
            <div class="box">
            <h2 class="border:3px solid black;">${nameValue}
            <div class="columns">
            <div class= "column is-4">
            <h2><img class="image is-300x300" src = "${imageValue}">
            </div>
            <div class= "column is-2">
            <ul id="ingredients-list">
            </ul>
            </div>
            <div class= "column is-6">
            <p>${method}
            </div>
            </div>
            `;
        
        
         searchResultEl.append(searchCard);
        
        })
    })
})



    searchCard.innerHTML = `
    <div class="box">
    <h2>${nameValue}
    <div class="columns">
    <div class= "column is-4">
    <h2><img class="image is-300x300" src = "${imageValue}">
    </div>
    <div class= "column is-2">
    <ul id="ingredients-list">
    </ul>
    </div>
    <div class= "column is-6">
    <p>${method}
    </div>
    </div>
    `;


 searchResultEl.append(searchCard);

 for (let i = 0; i < food.length; i ++){
    var ingredientList = document.querySelector('#ingredients-list')
    var foodItem = document.createElement('li');
    foodItem.innerHTML = `
    ${food[i]}
    `
    console.log(foodItem);
    ingredientList.append(foodItem);
 }

        })
    
}


// easier way to link button to localstorage removal function
// function removeSaved(){
// localStorage.removeItem()

// }




searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    getMealRecipe();


})



