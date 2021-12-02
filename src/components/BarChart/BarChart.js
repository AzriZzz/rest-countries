import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import styles from "./BarChart.module.css";


function orderChart(barChart, prop) {
  let name = [];
  if (Array.isArray(barChart) && barChart.length) {
    for (let country of barChart) {
      name.push(country[prop]);
    }
  }
  return name;
}

const BarChart = ({ barChart }) => {
  const countryName = orderChart(barChart, "name");
  const countryPopulation = orderChart(barChart, "population");

  const state = {
    series: [
      {
        name: "Population",
        data: countryPopulation,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          rangeBarOverlap: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: countryName,
      },
    },
  };

  return (
    <div>
      <h2 className={styles.chart_heading}>Chart</h2>

      {countryName.length ? (
        <div className={styles.renderChart}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
            height={350}
          />
        </div>
      ) : (
        <div className={styles.empty_container}>
          Please select one of the favourite to see the chart
        </div>
      )}
    </div>
  );
};

export default BarChart;
