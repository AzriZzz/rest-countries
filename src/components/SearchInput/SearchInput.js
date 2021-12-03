import styles from "./SearchInput.module.css";
import { ClearRounded, SearchRounded } from "@material-ui/icons";

const SearchInput = ({ keyword, emitChild, ...rest }) => {
  // Reset Input Field handler
  const resetInputField = () => {
    emitChild("");
  };

  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} value={keyword} {...rest} />
      {keyword.length > 0 && (
        <ClearRounded
          className={styles.clear_field}
          onClick={resetInputField}
          color="inherit"
        />
      )}
    </div>
  );
};

export default SearchInput;
