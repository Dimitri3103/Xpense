import { makeStyles } from "@material-ui/core";
import React from "react";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  chartExpenses: {
    width: "100%",
  },
}));

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient1.addColorStop(0, "rgba(47, 69, 197, 0.52)");
  gradient1.addColorStop(1, "rgba(47, 69, 197, 0)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient2.addColorStop(0, "rgba(251, 43, 118, 0.49)");
  gradient2.addColorStop(1, "rgba(251, 43, 118, 0)");

  return {
    labels: ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
    datasets: [
      {
        label: "Notes de frais validées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#2F45C5",
        backgroundColor: gradient1,
        pointBorderColor: "#2F45C5",
        pointBackgroundColor: "#2F45C5",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.5, 2.8, 2.5, 1.7, 2.5, 4, 1.8, 2.7, 4.2, 3.5, 2.8, 3.3],
      },
      {
        label: "Notes de frais rejetées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#FB2B76",
        backgroundColor: gradient2,
        pointBorderColor: "#FB2B76",
        pointBackgroundColor: "#FB2B76",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.2, 2, 3.4, 3.3, 1.7, 2.3, 2.5, 1.2, 1.8, 1.1, 2, 2.3],
      },
    ],
  };
};

export const ChartExpenses = () => {
  const classes = useStyles();
  var yLabels = {
    0: "Lun",
    1: "Mar",
    2: "Mer",
    3: "Jeu",
    4: "Ven",
    5: "Sam",
  };
  return (
    <div className={classes.chartExpenses}>
      <Line
        type="line"
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              align: "start",
              labels: {
                color: "#333B6A",
                font: {
                  size: "10vw",
                },
                usePointStyle: true,
                boxWidth: 4,
              },
            },
          },
          scales: {
            y: {
              position: "right",
              beginAtZero: true,
              grid: { drawTicks: false },
              ticks: {
                color: "#AFAFAF",
                maxTicksLimit: 6,
                callback: function (value, index, values) {
                  return yLabels[value];
                },
              },
            },
            x: {
              grid: { drawTicks: false, drawOnChartArea: false },
              ticks: { color: "#AFAFAF" },
            },
          },
        }}
        height={85}
      />
    </div>
  );
};
const data2 = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient1.addColorStop(0, "rgba(47, 69, 197, 0.52)");
  gradient1.addColorStop(1, "rgba(47, 69, 197, 0)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient2.addColorStop(0, "rgba(251, 43, 118, 0.49)");
  gradient2.addColorStop(1, "rgba(251, 43, 118, 0)");

  return {
    labels: ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
    datasets: [
      {
        label: "Notes de frais validées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#2F45C5",
        backgroundColor: gradient1,
        pointBorderColor: "#2F45C5",
        pointBackgroundColor: "#2F45C5",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.5, 2.8, 2.5, 1.7, 2.5, 4, 1.8, 2.7, 4.2, 3.5, 2.8, 3.3],
      },
      {
        label: "Notes de frais rejetées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#FB2B76",
        backgroundColor: gradient2,
        pointBorderColor: "#FB2B76",
        pointBackgroundColor: "#FB2B76",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.2, 2, 3.4, 3.3, 1.7, 2.3, 2.5, 1.2, 1.8, 1.1, 2, 2.3],
      },
    ],
  };
};

export const ChartExpensesMonth = () => {
  const classes = useStyles();
  var yLabels = {
    0: "0",
    1: "Semaine 1",
    2: "Semaine 2",
    3: "Semaine 3",
    4: "Semaine 4",
    5: "Semaine 5",
  };
  return (
    <div className={classes.chartExpenses}>
      <Line
        type="line"
        data={data2}
        options={{
          responsive: true,
          plugins: {
            legend: {
              align: "start",
              labels: {
                color: "#333B6A",
                font: {
                  size: "10vw",
                },
                usePointStyle: true,
                boxWidth: 4,
              },
            },
          },
          scales: {
            y: {
              position: "right",
              beginAtZero: true,
              grid: { drawTicks: false },
              ticks: {
                color: "#AFAFAF",
                maxTicksLimit: 6,
                callback: function (value, index, values) {
                  return yLabels[value];
                },
              },
            },
            x: {
              grid: { drawTicks: false, drawOnChartArea: false },
              ticks: { color: "#AFAFAF" },
            },
          },
        }}
        height={85}
      />
    </div>
  );
};

const data3 = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient1.addColorStop(0, "rgba(47, 69, 197, 0.52)");
  gradient1.addColorStop(1, "rgba(47, 69, 197, 0)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
  gradient2.addColorStop(0, "rgba(251, 43, 118, 0.49)");
  gradient2.addColorStop(1, "rgba(251, 43, 118, 0)");

  return {
    labels: [
      "Déc",
      "Nov",
      "Oct",
      "Sep",
      "Août",
      "Juil",
      "Juin",
      "Mai",
      "Avril",
      "Mars",
      "Fev",
      "Jan",
    ],
    datasets: [
      {
        label: "Notes de frais validées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#2F45C5",
        backgroundColor: gradient1,
        pointBorderColor: "#2F45C5",
        pointBackgroundColor: "#2F45C5",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.5, 2.8, 2.5, 1.7, 2.5, 4, 1.8, 2.7, 4.2, 3.5, 2.8, 3.3],
      },
      {
        label: "Notes de frais rejetées",
        fill: true,
        lineTension: 0.4,
        borderColor: "#FB2B76",
        backgroundColor: gradient2,
        pointBorderColor: "#FB2B76",
        pointBackgroundColor: "#FB2B76",
        pointBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.2, 2, 3.4, 3.3, 1.7, 2.3, 2.5, 1.2, 1.8, 1.1, 2, 2.3],
      },
    ],
  };
};

export const ChartExpensesYear = () => {
  const classes = useStyles();
  var yLabels = {
    0: "10",
    1: "20",
    2: "30",
    3: "40",
    4: "50",
    5: "60",
  };
  return (
    <div className={classes.chartExpenses}>
      <Line
        type="line"
        data={data3}
        options={{
          responsive: true,
          plugins: {
            legend: {
              align: "start",
              labels: {
                color: "#333B6A",
                font: {
                  size: "10vw",
                },
                usePointStyle: true,
                boxWidth: 4,
              },
            },
          },
          scales: {
            y: {
              position: "right",
              beginAtZero: true,
              grid: { drawTicks: false },
              ticks: {
                color: "#AFAFAF",
                maxTicksLimit: 6,
                callback: function (value, index, values) {
                  return yLabels[value];
                },
              },
            },
            x: {
              grid: { drawTicks: false, drawOnChartArea: false },
              ticks: { color: "#AFAFAF" },
            },
          },
        }}
        height={85}
      />
    </div>
  );
};
