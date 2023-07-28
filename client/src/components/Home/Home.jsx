import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import {
  getRecipes,
  filterRecipesByTypeDiet,
  orderByName,
  orderBySource,
  orderByPuntuation,
  getRecipesByName,
  handleNumber,
  getTypeDiets,
} from "../../Redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { recipes, typeDiets, numPage } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [typeDietFilter, setTypeDietFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const start = (numPage - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  let viewRecipes = [];

  if (Array.isArray(recipes) && recipes.length > 0) {
    viewRecipes = recipes.slice(start, end);
  } else {
    viewRecipes = [];
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getTypeDiets()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleFilterTypeDiet = (event) => {
    setTypeDietFilter(event.target.value);
    dispatch(filterRecipesByTypeDiet(event.target.value));
    dispatch(handleNumber(1));
  };

  const handleOrderByName = (event) => {
    const selectedOrder = event.target.value;
    dispatch(orderByName(selectedOrder));
    setOrder(selectedOrder);
  };

  const handlePuntuation = (event) => {
    setOrder(event.target.value);
    dispatch(orderByPuntuation(event.target.value));
    dispatch(handleNumber(1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getRecipesByName(search));
    setSearch("");
  };

  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  const handleFromApi = (event) => {
    dispatch(orderBySource(event.target.value));
    dispatch(handleNumber(1));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.homeContainer}>
      {loading ? (
        <div><h1>Loading...</h1></div>
      ) : (
        <>
          <div className={styles.newRecipe}>
            <NavLink to="/recipe">
              <button className={styles.create}> <span>New Recipe</span> </button>
            </NavLink>
            <div className={styles.filt}>
              <select
                value={order}
                onChange={handleOrderByName}
                className={styles.select}
              >
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
            </div>
            
            <div>
              <select className={styles.select} onChange={handleFromApi}>
                <option value="ALL">All recipes</option>
                <option value="API">From api</option>
                <option value="BDD">From database</option>
              </select>
            </div>
            <div>
              <select
                onChange={handlePuntuation}
                value={order}
                className={styles.select}
              >
                <option value="mayormenor">Hight health score</option>
                <option value="menormayor">Lower health score</option>
              </select>
            </div>
            <div>
              <select
                onChange={handleFilterTypeDiet}
                value={typeDietFilter}
                className={styles.select}
              >
                <option value="All">Diet Types</option>
                {typeDiets.map((typeDiet) => (
                  <option key={typeDiet.name} value={typeDiet.name}>
                    {typeDiet.name}
                  </option>
                ))}
              </select>
            </div>
            <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="Search for cools recipes..."
                value={search}
                onChange={handleInputName}
                className={styles.inputSearchBar}
              />
              <button type="submit" className={styles.btnsearch}>
                <span>Search</span>
              </button>
            </form>
            <span
              id="refresh"
              className={styles.logotoHome}
              onClick={handleRefresh}
            ></span>
          </div>

          <Paginate cantPages={totalPages} numPage={numPage} />

          {viewRecipes.length > 0 ? (
            <div className={styles.cards}>
              {viewRecipes.map((recipe) => (
                <NavLink to={"/recipes/" + recipe.id} key={recipe.id}>
                  <Card
                    title={recipe.title}
                    image={recipe.image}
                    TypeDiets={recipe.TypeDiets}
                  />
                </NavLink>
              ))}
            </div>
          ) : (
            <div className={styles.noRecipes}>
              <h1>No hay recetas disponibles.</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
