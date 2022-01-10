import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState, useEffect } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.capital.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  useEffect(() => {
    // Perform localStorage retrieval
    const storageFavourites = JSON.parse(localStorage.getItem("favourite"));

    // check is array is empty or undefined
    if (Array.isArray(storageFavourites) && storageFavourites.length) {
      for (let storage of storageFavourites) {
        let country = filteredCountries.filter(
          (el) => el.name === storage.name
        );
        country[0].favourite = storage.favourite;
      }
    }
  }, []);

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          Found {filteredCountries.length} countries
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name or Capital"
            onChange={onInputChange}
            keyword={keyword}
            emitChild={setKeyword}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} keyword={keyword} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  for (let country of countries) {
    if (!country.hasOwnProperty("capital")) {
      country.capital = "";
    }
    country.favourite = false;
  }

  const newCountry = countries.map((country) => ({
    name: country.name,
    capital: country.capital,
    region: country.region,
    flag: country.flag,
    population: country.population,
  }));

  return {
    props: {
      countries: newCountry,
    },
  };
};
