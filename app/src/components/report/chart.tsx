import { makeStyles } from "@material-ui/core";
import React from "react";
import { Pie } from "react-chartjs-2";

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
    labels: ["Collaborateurs actifs", "Collaborateurs non actifs"],
    datasets: [
      {
        label: "# de collaborateurs",
        borderColor: ["#2F45C5", "#FB2B76"],
        backgroundColor: ["#2F45C5", "#FB2B76"],
        data: [90, 10],
      },
    ],
  };
};

export const ChartCollaborators = () => {
  const classes = useStyles();

  return (
    <div className={classes.chartExpenses}>
      <Pie
        type="pie"
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
        }}
        height={85}
      />
    </div>
  );
};
