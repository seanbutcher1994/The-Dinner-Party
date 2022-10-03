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

var pastSearchCocktailEl = $('#past-search');


function getCocktailRecipe (){
    // console.log(searchBar);
    var cocktailRecipeURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+searchBar.value;

    return fetch(cocktailRecipeURL)
        .then(function(response){
            return response.json()
        })
        .then (function(result){
            console.log(result);
            const cocktailID = result.drinks[Math.floor(Math.random() * (result.drinks.length))].idDrink
            console.log(cocktailID);

            var cocktailIDURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+cocktailID;
            return fetch(cocktailIDURL)
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
            var nameValue = result.drinks[0].strDrink;
            console.log(nameValue);
            // Image of Dish
            var imageValue = result.drinks[0].strDrinkThumb
            console.log(imageValue);
            // List of Ingredients and measurements
            var cocktail = [];
            var strMeasure = [];
            var strIngredient = [];

    
            for (var property in result.drinks[0]) {
                if (property.includes("strMeasure")) {
                    
                    
                   strMeasure.push(result.drinks[0][property]);
                        
                    
                } else if (property.includes("strIngredient")) {
                    
                         
                    strIngredient.push(result.drinks[0][property]);
                        
                    
                }
            }
            console.log(strMeasure);
    
            for(var i = 0; i < strMeasure.length; i++ ){
                cocktail[i] = strMeasure[i] + " " + strIngredient[i];
            }
           
          
            // Method
            var method = result.drinks[0].strInstructions;
            console.log(method);

//create local storage to save search history.


    localStorage.setItem("nameValue", JSON.stringify(nameValue));
    localStorage.setItem("imageValue", JSON.stringify(imageValue));
    localStorage.setItem("cocktail", JSON.stringify(cocktail));
    localStorage.setItem("method", JSON.stringify(method));

   function displaySearchHistory () {
    var savedName = JSON.parse(localStorage.getItem("nameValue"));
    console.log(savedName);
    var savedImage = JSON.parse(localStorage.getItem("imageValue"));
    var savedMethod = JSON.parse(localStorage.getItem("method"));
    var savedIngredients = JSON.parse(localStorage.getItem("cocktail"));
    console.log(savedIngredients);
    savedRecipeCard.innerHTML = `
    <div class="box">
    <h2>${savedName}
    <div class="columns">
    <div class= "column is-4">
    <h2><img class="image is-300x300" src = "${savedImage}">
    </div>
    <div class= "column is-2">
    <ul id="saved-ingredients-list">
    </ul>
    </div>
    <div class= "column is-6">
    <p>${savedMethod}
    </div>
    </div>
    `
    savedRecipes.append(savedRecipeCard);

    for (let i = 0; i < savedIngredients.length; i ++){
        var savedIngredientList = document.querySelector('#saved-ingredients-list')
        var SavedCocktailItem = document.createElement('li');
        SavedCocktailItem.innerHTML = `
        ${savedIngredients[i]}
        `
        savedIngredientList.append(SavedCocktailItem);
    }

}
savedBtn.addEventListener('click', function(){
    displaySearchHistory();

})



//display search history


//create search result header and card body
// var searchResultHeaderEl = $('#searchResultHeader');
// var searchHeaderEl = $('<h1>');
// searchHeaderEl.text ('Your Dinner Party');
// searchResultHeaderEl.append(searchHeaderEl);


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

 for (let i = 0; i < cocktail.length; i ++){
    var ingredientList = document.querySelector('#ingredients-list')
    var cocktailItem = document.createElement('li');
    cocktailItem.innerHTML = `
    ${cocktail[i]}
    `
    console.log(cocktailItem);
    ingredientList.append(cocktailItem);
}

        })
    
}

// easier way to link button to localstorage removal function
// function removeSaved(){
// localStorage.removeItem()

// }




searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    getCocktailRecipe();

})



