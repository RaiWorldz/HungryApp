import styles from './Card.module.css';
// import { addFav, removeFav } from '../../Redux/actions';
// import { useState, useEffect } from 'react';
// import { connect } from 'react-redux'

export default function Card ({ title, image, TypeDiets, id, addFav, removeFav, myFavorites })  {
  
  // const [isFav, setIsFav] = useState (false);


  // const handleFavorite = () => {
  //    if (isFav) {
  //       setIsFav(false);
  //       removeFav(id);

  //       } else {
           
  //          setIsFav(true);
  //          addFav({id, title, TypeDiets, image});
  //          }
  // }
  // useEffect(() => {
  //    myFavorites.forEach((fav) => {
  //       if (fav.id === id) {
  //          setIsFav(true);
  //       }
  //    });
  // }, [myFavorites]);


  return (
    <div key={id} className={styles.cardContainer}>
      <div>
        <img className={styles.cardImg} src={image} alt='name' />
        <h3 key={id} className={styles.titlesRecipes}>{title}</h3>

        <div className={styles.tipes}>
          {/* <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button> */}
          {TypeDiets?.map((type, index) => (
            <h5 key={index} className={styles.tipe}>{type.name}</h5>
          ))}
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//      myFavorites: state.myFavorites
// }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//      addFav: (character) => { dispatch(addFav(character)) },
//      removeFav: (id) => { dispatch(removeFav(id)) }
//   }
// }

// export default connect (
//   mapStateToProps,
//   mapDispatchToProps
// )(Card);