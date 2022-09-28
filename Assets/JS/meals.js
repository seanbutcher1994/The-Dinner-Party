
const searchBar = document.querySelector('#get-hashtag')
const searchBtn = document.querySelector('#search-button')

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




function getMealRecipe (){
    // console.log(searchBar);
    var mealRecipeURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+searchBar.value;

    return fetch(mealRecipeURL)
        .then(function(response){
            return response.json()
        })
        .then (function(result){
            console.log(result);
            const mealID = result.meals[Math.floor(Math.random() * 10)].idMeal
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
                    if(!result.meals[0][property].includes("null")) {
                        if (result.meals[0][property].length > 4) {
                            strMeasure.push(result.meals[0][property]);
                        }
                    }
                } else if (property.includes("strIngredient")) {
                    if(!result.meals[0][property].includes("null")) {
                        if (result.meals[0][property].length > 4) {
                            strIngredient.push(result.meals[0][property]);
                        }
                    } 
                }
            }
            console.log(strMeasure);
    
            for(var i = 0; i < strMeasure.length; i++ ){
                food[i] = strMeasure[i] + " " + strIngredient[i];
            }
            console.log(food);
            // var ingValue1 = (result.meals[0].strMeasure1) + " " + (result.meals[0].strIngredient1)
            // var ingValue2 = (result.meals[0].strMeasure2) + " " + (result.meals[0].strIngredient2)
            // var ingValue3 = (result.meals[0].strMeasure3) + " " + (result.meals[0].strIngredient3)
            // var ingValue4 = (result.meals[0].strMeasure4) + " " + (result.meals[0].strIngredient4)
            // var ingValue5 = (result.meals[0].strMeasure5) + " " + (result.meals[0].strIngredient5)
            // var ingValue6 = (result.meals[0].strMeasure6) + " " + (result.meals[0].strIngredient6)
            // var ingValue7 = (result.meals[0].strMeasure7) + " " + (result.meals[0].strIngredient7)
            // var ingValue8 = (result.meals[0].strMeasure8) + " " + (result.meals[0].strIngredient8)
            // var ingValue9 = (result.meals[0].strMeasure9) + " " + (result.meals[0].strIngredient9)
            // var ingValue10 = (result.meals[0].strMeasure10) + " " + (result.meals[0].strIngredient10)
            // var ingValue11 = (result.meals[0].strMeasure11) + " " + (result.meals[0].strIngredient11)
            // var ingValue12 = (result.meals[0].strMeasure12) + " " + (result.meals[0].strIngredient12)
            // var ingValue13 = (result.meals[0].strMeasure13) + " " + (result.meals[0].strIngredient13)
            // var ingValue14 = (result.meals[0].strMeasure14) + " " + (result.meals[0].strIngredient14)
            // var ingValue15 = (result.meals[0].strMeasure15) + " " + (result.meals[0].strIngredient15)
            // var ingValue16 = (result.meals[0].strMeasure16) + " " + (result.meals[0].strIngredient16)
            // var ingValue17 = (result.meals[0].strMeasure17) + " " + (result.meals[0].strIngredient17)
            // var ingValue18 = (result.meals[0].strMeasure18) + " " + (result.meals[0].strIngredient18)
            // var ingValue19 = (result.meals[0].strMeasure19) + " " + (result.meals[0].strIngredient19)
            // var ingValue20 = (result.meals[0].strMeasure20) + " " + (result.meals[0].strIngredient20)
            // console.log(ingValue1);
            // console.log(ingValue2);
            // console.log(ingValue3);
            // console.log(ingValue4);
            // console.log(ingValue5);
            // console.log(ingValue6);
            // console.log(ingValue7);
            // console.log(ingValue8);
            // console.log(ingValue9);
            // console.log(ingValue10);
            // console.log(ingValue11);
            // console.log(ingValue12);
            // console.log(ingValue13);
            // console.log(ingValue14);
            // console.log(ingValue15);
            // console.log(ingValue16);
            // console.log(ingValue17);
            // console.log(ingValue18);
            // console.log(ingValue19);
             console.log(food);
          
            // Method
            var method = result.meals[0].strInstructions;
            console.log(method);

//create search result header and card body
var searchResultHeaderEl = $('#searchResultHeader');
var searchHeaderEl = $('<h1>');
searchHeaderEl.text ('Your Dinner Party');
searchResultHeaderEl.append(searchHeaderEl);

var searchResultEl = $('#searchResult');
var searchCard = document.createElement ('div');
searchCard.innerHTML = `
<div class="box">
$box-color black
<h2>${nameValue}
<div class="columns">
<div class= "column is-4">
<h2><img class="image is-300x300" src = "${imageValue}">
</div>
<div class= "column is-2">
<ul>
<li>${ingValue1}
<li>${ingValue2}
<li>${ingValue3}
<li>${ingValue4}
<li>${ingValue5}
<li>${ingValue6}
<li>${ingValue7}
<li>${ingValue8}
<li>${ingValue9}
<li>${ingValue10}
<li>${ingValue11}
<li>${ingValue12}
<li>${ingValue13}
<li>${ingValue14}
<li>${ingValue15}
<li>${ingValue16}
<li>${ingValue17}
<li>${ingValue18}
<li>${ingValue19}
<li>${ingValue20}
</ul>
</div>
<div class= "column is-6">
<p>${method}
</div>
</div>
`;

searchResultEl.append(searchCard);

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

