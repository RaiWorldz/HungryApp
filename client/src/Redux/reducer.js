import {
  ORDER_BY_SOURCE,
  CLEAN_DETAIL,
  GET_BY_ID,
  GET_BY_NAME,
  GET_RECIPES,
  GET_TYPE_DIETS,
  FILTER_BY_TYPEDIET,
  ORDER_BY_NAME,
  ORDER_BY_PUNTUATION,
  POST_RECIPE,
  RESET_RECIPES,
  RESET_RECIPES_SEARCHED,
  HANDLE_NUMBER,
  PREV_PAGE,
  NEXT_PAGE,
  // ADD_FAV,
  // REMOVE_FAV
} from "./actions";

const ASCENDING = "asc";
const DESCENDING = "desc";

const initialState = {
  allRecipes: [],
  recipes: [],
  typeDiets: [],
  details: {},
  searchedRecipes: [],
  recipesFiltered: [],
  // myFavorites: [],
  // allRecipesFav: [],
  numPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

      case CLEAN_DETAIL:
        return {
          ...state,
          details: {},
        };

    case GET_TYPE_DIETS:
      return {
        ...state,
        typeDiets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };

      case FILTER_BY_TYPEDIET:
        const { allRecipes } = state;
        const typeDietFilter = action.payload === "All"
          ? allRecipes
          : allRecipes.filter((t) => t.TypeDiets.find((event) => event.name === action.payload));

          return {
            ...state,
            recipes: typeDietFilter,
            allRecipes: state.allRecipes,
          }

    case ORDER_BY_SOURCE:
      const stateCopy = [...state.allRecipes];
      const fromApi = stateCopy.filter((recipe) => !isNaN(+recipe.id));
      const fromBDD = stateCopy.filter((recipe) => isNaN(+recipe.id));
      const orderSource = action.payload === "API" ? fromApi : action.payload === "BDD" ? fromBDD : stateCopy;

      return {
        ...state,
        recipes: orderSource,
      };

    case ORDER_BY_NAME:
      const order = action.payload;
      const sortedRecipes = sortRecipes(state.recipes, order === ASCENDING ? ASCENDING : DESCENDING, 'title');
      return {
        ...state,
        recipes: sortedRecipes,
        recipesFiltered: sortedRecipes,
      };

    case ORDER_BY_PUNTUATION:
      const orderPunt = action.payload === "menormayor"
        ? [...state.recipes].sort((a, b) => a.healthScore - b.healthScore)
        : [...state.recipes].sort((a, b) => b.healthScore - a.healthScore);

      return {
        ...state,
        recipes: orderPunt,
      };

    case RESET_RECIPES:
      return {
        ...state,
        recipes: [...state.allRecipes],
        searchedRecipes: [],
      };

    case RESET_RECIPES_SEARCHED:
      return {
        ...state,
        recipes: [...state.searchedRecipes],
      };

    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };

    case PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };

    case HANDLE_NUMBER:
      return {
        ...state,
        numPage: action.payload,
      };
    
    //   case ADD_FAV:
    //     return {
    //         ...state,
    //         myFavorites: [...state.allRecipesFav, action.payLoad],
    //         allRecipes: [...state.allRecipesFav, action.payLoad]
    //     }

    // case REMOVE_FAV:
    //     return {
    //         ...state,
    //         myFavorites: state.myFavorites.filter(fav => fav.id !== action.payLoad )
    //     }

    default:
      return state;
  }
};

const sortRecipes = (recipes, order, field) => {
  const sortedRecipes = [...recipes];
  sortedRecipes.sort((a, b) => {
    const valueA = a[field].toString();
    const valueB = b[field].toString();
    if (order === ASCENDING) {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
  return sortedRecipes;
};


export default rootReducer;
