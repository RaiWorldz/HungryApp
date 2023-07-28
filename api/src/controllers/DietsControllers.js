const axios = require("axios");
const { TypeDiets } = require("../db");
const { API_KEY } = process.env;

const getApiDiets = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const results = response.data.results;
    const dietsData = results.flatMap((recipe) => recipe.diets);

    const uniqueDiets = [...new Set(dietsData)];

    const transformedData = uniqueDiets.map((diet) => ({
      name: diet,
    }));

    TypeDiets.bulkCreate(transformedData);
  } catch (error) {
    console.error("Error obtaining the Diets from the API:", error);
    throw new error;
  }
};

module.exports = {
  getApiDiets,
};


// const fetch = require("node-fetch");
// const { TypeDiets } = require("../db");
// const { API_KEY } = process.env;

// const getApiDiets = async () => {
//   try {
//     const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    
//     if (!response.ok) {
//       throw new Error("API request failed");
//     }

//     const data = await response.json();
//     const results = data.results;
//     const dietsData = results.flatMap((recipe) => recipe.diets);

//     const uniqueDiets = [...new Set(dietsData)];

//     const transformedData = uniqueDiets.map((diet) => ({
//       name: diet,
//     }));

//     await TypeDiets.bulkCreate(transformedData);
//   } catch (error) {
//     console.error("Error obtaining the Diets from the API:", error);
//     throw error;
//   }
// };

// module.exports = {
//   getApiDiets,
// };



