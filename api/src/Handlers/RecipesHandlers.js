const {  getRecipesById, getAllRecipes, getRecipesByName} = require("../controllers/RecipesControllers")
const { Recipe, TypeDiets, recipeTypeDiets } = require("../db")


const validate = (req, res, next) => {
    const { title, summary, healthScore, analyzedInstructions, TypeDiets, image} = req.body;
    if(!title || !summary || !healthScore || !analyzedInstructions || !TypeDiets || !image)
    res.status(400).json({error: "Required data"});
next();
}  

const postRecipesHandler = async (req, res) => {
  try {
    const { title, summary, healthScore, analyzedInstructions, typeDiets, image } = req.body;
    const exists = await Recipe.findAll({ where: { title: title } });
    if (exists.length) {
      throw new Error("There is already a recipe with this name");
    }

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      analyzedInstructions,
      image,
      created: true
    });

    const typeDietIds = typeDiets.split(",").map(id => Number(id.trim()));
    newRecipe.addTypeDiets(typeDietIds);

    res.status(200).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

 const getRecipesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await getRecipesById(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: "That recipe doesent exist"})
    }
 };

 const getRecipesHandler = async (req, res) => {
 try {
    const { name } = req.query;
    const result = name ? await getRecipesByName(name) : await getAllRecipes();
    res.status(200).json(result)
    } 
 catch (error) {
    res.status(404).json({error: error.message})
    }
};


 module.exports = {
    validate,
    postRecipesHandler,
    getRecipesByIdHandler,
    getRecipesHandler
 }