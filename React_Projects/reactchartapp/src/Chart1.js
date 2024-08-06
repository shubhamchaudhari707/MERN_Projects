import React from "react";

import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Line } from "react-chartjs-2";

const Chart1 = () => {
  return (
    <>
      <Line
        data={{
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "REVENUE",
              data: [200, 300, 400],
            },
            {
              label: "LOSS",
              data: [90, 80, 70],
            },
            {
              label: "MARGIN",
              data: [77, 56, 45],
            },
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
          ],
          borderRadius: 5,
        }}
        options= {{
            plugins: {
              title: {
                display: true,
                text: "Monthely Revenue and cost",
              },
            },
          }}
      />
    </>
  );
};

export default Chart1;
