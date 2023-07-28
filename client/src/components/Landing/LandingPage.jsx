import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  // const githubLink = 'https://github.com/RaiWorldz/HenryFoods.git';

  return (
    <div className={styles.landingContainer}>
      <span className={styles.logo}></span>

      <div className={styles.content}>
        <h2 className={styles.tittleLading}>
          Welcome to Hungry <br />
          The Number
          <span className={styles.TittleOne}> #One </span>
          Recipes Hunter App
        </h2>

        <NavLink to="/home">
          <button className={styles.btn}>
            <span>CONTINUE</span>
          </button>
        </NavLink>

        {/* <NavLink to={githubLink} target="_blank" rel="noopener noreferrer">
                    <button className={styles.GitHub}>
                    </button>
            </NavLink> */}
      </div>
    </div>
  );
}
