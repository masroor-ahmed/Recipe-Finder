const searchButton = document.getElementById('searchButton');
const ingredientInput = document.getElementById('ingredientInput');
const resultsDiv = document.getElementById('results');

const appId = '0bf62e91';
const appKey = '7fd7e97dd7e9c63ff025fb210a004e80';

searchButton.addEventListener('click', () => {
    const query = ingredientInput.value.trim();
    if (query !== '') {
        fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data.hits);
            })
            .catch(error => console.log('Error fetching recipes:', error));
    }
});

function displayResults(recipes) {
    resultsDiv.innerHTML = '';
    recipes.forEach(recipe => {
        const { label, image, url } = recipe.recipe;
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${label}</h2>
            <img src="${image}" alt="${label}">
            <a href="${url}" target="_blank">View Recipe</a>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
}
