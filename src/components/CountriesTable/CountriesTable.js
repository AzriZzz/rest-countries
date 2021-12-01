import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      (a[value] === undefined ? "" : a[value]).localeCompare(
        b[value] === undefined ? "" : b[value]
      )
    );
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      (b[value] === undefined ? "" : b[value]).localeCompare(
        a[value] === undefined ? "" : a[value]
      )
    );
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueDirection("name")}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>

        <button
          className={styles.heading_region}
          onClick={() => setValueDirection("region")}
        >
          <div>Region</div>
          <SortArrow direction={direction} />
        </button>

        <button
          className={styles.heading_capital}
          onClick={() => setValueDirection("capital")}
        >
          <div>Capital</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountries.map((country, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.region}>{country.region}</div>
          <div className={styles.capital}>{country.capital}</div>
        </div>
      ))}
    </div>
  );
};

export default CountriesTable;
