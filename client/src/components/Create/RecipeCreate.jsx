import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getTypeDiets } from '../../Redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { validateRecipeInput } from './Validations';
import styles from './RecipeCreate.module.css';


function controlForm(input) {
  return validateRecipeInput(input);
}

export default function CreateRecipe() {
  const dispatch = useDispatch();

  let listDiets = useSelector((state) => state.typeDiets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: '',
    analyzedInstructions: '',
    typeDiets: [],
    image: ''
  });

  useEffect(() => {
    dispatch(getTypeDiets());
  }, [dispatch]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    setErrors(controlForm(input));
  }, [input]);

  function handleSelect(event) {
    setInput({
      ...input,
      typeDiets: [...input.typeDiets, event.target.value]
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { title, summary, healthScore, analyzedInstructions, typeDiets, image } = input;
  
  
    const typeDietsAsString = typeDiets.join(',');
  
    try {
      await dispatch(postRecipe({
        title,
        summary,
        healthScore,
        analyzedInstructions,
        typeDiets: typeDietsAsString, 
        image
      }));
      alert('Congratulations! You have created a new recipe!');
      setInput({
        title: '',
        summary: '',
        healthScore: '',
        analyzedInstructions: '',
        typeDiets: [],
        image: ''
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  }

  function handleDelete(event) {
    setInput({
      ...input,
      typeDiets: input.typeDiets.filter((diet) => diet !== event)
    });
  }

  return (
    <div className={styles.bkg}>
      <div >
        <Link to="/home">
          <button className={styles.btnBack}>
            <span>BACK TO HOME</span>
            </button>
        </Link>
            {/* <span className={styles.logoCreate}></span> */}
        <h1 className={styles.titleCreate}>Create your own recipe</h1>
        <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input className={styles.inputCreate}
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>
        <br />
          <div>
            <label>Summary: </label>
            <input className={styles.inputCreate}
              type="text"
              name="summary"
              value={input.summary}
              onChange={handleChange}
            />
            {errors.summary && <p className={styles.error}>{errors.summary}</p>}
          </div>
        <br />
          <div>
            <label>Health Score: </label>
            <input className={styles.inputCreate}
              type="text"
              name="healthScore"
              value={input.healthScore}
              onChange={handleChange}
            />
            {errors.healthScore && <p className={styles.error}>{errors.healthScore}</p>}
          </div>
          <br />
          <div>
            <label>Image URL: </label>
            <input className={styles.inputCreate}
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>
        <br />
          <div>
            <label>Step by step: </label>
            <input className={styles.inputCreate}
              type="text"
              name="analyzedInstructions"
              value={input.analyzedInstructions}
              onChange={handleChange}
            />
          </div>
        <br />
          <select onChange={handleSelect} className={styles.select}>
            {listDiets?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        <br />
          {input.typeDiets.map((event) => {
            return (
              <div key={event}>
                <h5 className={styles.types}>{event}</h5>
                <button className={styles.btnx} onClick={() => handleDelete(event)}>
                  Close
                </button>
              </div>
            );
          })}
          {errors.title || errors.summary || errors.healthScore || errors.image || errors.typeDiets ? (
            <p className={styles.adv}>Please complete all the inputs to create your recipe</p>
          ) : (
            <button type="submit" className={styles.CreateRecipe}><span>Create Recipe</span></button>
          )}
        </form>
      <br />
      </div>
    </div>
  </div>
  );
}