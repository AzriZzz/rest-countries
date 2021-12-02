import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import styles from "./CountriesTable.module.css";
import Highlighter from "react-highlight-words";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import BarChart from "../BarChart/BarChart";

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

const CountriesTable = ({ countries, keyword }) => {
  // state to highlight keyword
  const [filterKeyword, setFilterKeyword] = useState([]);

  // order ascending and descending
  const [direction, setDirection] = useState();
  const [directionName, setDirectionName] = useState();
  const [directionRegion, setDirectionRegion] = useState();
  const [directionCapital, setDirectionCapital] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = (value) => {
    if (value === 'name') {
      if (!directionName) {
        setDirectionName("desc");
      } else if (directionName === "desc") {
        setDirectionName("asc");
      } else {
        setDirectionName(null);
      }
    }

    if (value === 'region') {
      if (!directionRegion) {
        setDirectionRegion("desc");
      } else if (directionRegion === "desc") {
        setDirectionRegion("asc");
      } else {
        setDirectionRegion(null);
      }
    }

    if (value === 'capital') {
      if (!directionCapital) {
        setDirectionCapital("desc");
      } else if (directionCapital === "desc") {
        setDirectionCapital("asc");
      } else {
        setDirectionCapital(null);
      }
    }
    
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueDirection = (value) => {
    switchDirection(value);
    setValue(value);
  };

  // pagination react-paginate
  const [pageNumber, setPageNumber] = useState(0);
  const countryPerPage = 5;
  const pagesVisited = pageNumber * countryPerPage;
  const pageCount = Math.ceil(orderedCountries.length / countryPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayCountries = orderedCountries
    .slice(pagesVisited, pagesVisited + countryPerPage)
    .map((country, index) => {
      return (
        <div key={index} className={styles.row}>
          <div className={styles.flag}>
            <Image
              src={country.flag}
              alt={country.flag}
              className="relative"
              width={40}
              height={40}
              objectFit="contain"
            />
          </div>
          <div className={styles.name}>
            <Highlighter
              highlightClassName={styles.highlight}
              searchWords={filterKeyword}
              autoEscape={true}
              textToHighlight={country.name}
            />
          </div>
          <div className={styles.region}>
            <Highlighter
              highlightClassName={styles.highlight}
              searchWords={filterKeyword}
              autoEscape={true}
              textToHighlight={country.region}
            />
          </div>
          <div className={styles.capital}>
            <Highlighter
              highlightClassName={styles.highlight}
              searchWords={filterKeyword}
              autoEscape={true}
              textToHighlight={country.capital}
            />
          </div>
          <div className={styles.favourite}>
            {/* adding key to re-rendered the value of the checkbox when update? */}
            <input
              key={Math.random()}
              type="checkbox"
              defaultChecked={country.favourite}
              onChange={() => handleChange(country)}
            />
          </div>
        </div>
      );
    });

  // barChart mapping
  const [barChart, setBarChart] = useState();

  const handleChange = (country) => {
    let storageFavourites = [];

    // retrieve data from if exist in localStorage
    if (localStorage.getItem("favourite")) {
      storageFavourites = JSON.parse(localStorage.getItem("favourite"));
    }

    // create a new favourite object
    const newFavourite = {
      ...country,
      favourite: (country.favourite = country.favourite ? false : true),
    };

    // check whether if exist or not in the storage
    let found = storageFavourites.filter((el) => el.name === newFavourite.name);

    // push into array if not exist in storage and if favourite is true
    if (found.length === 0 && newFavourite.favourite) {
      storageFavourites.push(newFavourite);
    } else {
      storageFavourites = storageFavourites.filter(
        (el) => el.name !== newFavourite.name
      );
    }

    setBarChart(storageFavourites);
    // save into local storage
    localStorage.setItem("favourite", JSON.stringify(storageFavourites));
  };

  useEffect(() => {
    const setKeyword = [keyword];
    setFilterKeyword(setKeyword);
  }, [keyword]);

  useEffect(() => {
    let storageFavourites = [];
    if (localStorage.getItem("favourite")) {
      storageFavourites = JSON.parse(localStorage.getItem("favourite"));
    }
    setBarChart(storageFavourites);
  }, []);

  return (
    <div className={styles.table_container}>
      <div className={styles.table}>
        <div className={styles.heading}>
          <div className={styles.heading_flag}></div>
          <button
            className={styles.heading_name}
            onClick={() => setValueDirection("name")}
          >
            <div>Name</div>
            <SortArrow direction={directionName} />
          </button>

          <button
            className={styles.heading_region}
            onClick={() => setValueDirection("region")}
          >
            <div>Region</div>
            <SortArrow direction={directionRegion} />
          </button>

          <button
            className={styles.heading_capital}
            onClick={() => setValueDirection("capital")}
          >
            <div>Capital</div>
            <SortArrow direction={directionCapital} />
          </button>

          <div className={styles.heading_favourite}>Favourite</div>
        </div>

        {orderedCountries.length === 0 ? (
          <div className={styles.not_found}>No country found</div>
        ) : (
          <div>
            {displayCountries}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={styles.paginationBttns}
              activeClassName={styles.paginationActive}
            />
          </div>
        )}
      </div>
      <div className={styles.chart}>
        <BarChart barChart={barChart} />
      </div>
    </div>
  );
};

export default CountriesTable;
