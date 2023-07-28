import { useDispatch } from "react-redux";
import { nextPage, prevPage, handleNumber } from "../../Redux/actions";
import styles from "./Paginate.module.css";

const Paginate = ({ cantPages, numPage }) => {
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }

  function prev() {
    dispatch(prevPage());
  }

  function goToPage(pageNumber) {
    dispatch(handleNumber(pageNumber));
  }

  if (!Number.isInteger(cantPages) || cantPages < 0) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      {numPage > 1 && (
        <button className={styles.pageButton} onClick={prev}>
          PREV
        </button>
      )}

      {[...Array(cantPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === numPage;

        return (
          <button
            key={pageNumber}
            className={`${styles.pageNumber} ${
              isActive ? styles.currentPageNumber : ""
            }`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {numPage < cantPages && (
        <button className={styles.pageButton} onClick={next}>
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginate;
