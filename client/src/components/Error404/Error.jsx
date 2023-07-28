import { NavLink } from "react-router-dom";
import styles from './Error.module.css'
import gif from '../../assets/404.gif'


const Error = () => {
    return (
        <div>
        <img className={styles.gif} src={gif} alt="GIF" />
    <div className={styles.container}>
        <h2 className={styles.tittle}>Error <span className={styles.tittle404}>404</span> - Page not found</h2>
        <h3 className={styles.text}>Sorry, the page you are looking for doesn't exist.</h3>
        <NavLink className={styles.linkToHome} to="/Home"> 
        <button className= {styles.errorbtn}>
        <span>
            Go back to the Homepage
        </span>
        </button>
        </NavLink>
    </div>
    </div>
    );
};

export default Error;