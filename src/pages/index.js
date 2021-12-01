import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  console.log(countries.filter( country => country.name === 'Antarctica'))
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

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput
        placeholder="Filter by Name or Capital"
        onChange={onInputChange}
      />

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  for (let country of countries) {
    if (!country.hasOwnProperty('capital')) {
      country.capital = ''
    }
  }

  return {
    props: {
      countries,
    },
  };
};
