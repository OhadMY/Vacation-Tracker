import React, { useEffect, useState } from "react";
import { BarChartData, VacationSatatistic } from "../types";
import { axios } from "../utils";
import { Bar } from "react-chartjs-2";
import { Container } from "@material-ui/core";

export const Statistics = () => {
  const [data, setData] = useState<BarChartData | null>(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get<VacationSatatistic[]>(
        "followed/vacationfollows"
      );
      const vacationStatistics = response.data;
      const barChartData = transformChartData(vacationStatistics);
      setData(barChartData);
    } catch (error) {
      console.log(error);
    }
  };

  const transformChartData = (
    vacationStatistics: VacationSatatistic[]
  ): BarChartData => {
    const labels = [] as string[];
    const data = [] as number[];
    const backgroundColor = [] as string[];
    const borderColor = [] as string[];
    const borderWidth = 1;

    vacationStatistics.forEach((vacationStatistic) => {
      labels.push(vacationStatistic.vacDest);
      data.push(vacationStatistic.followers);
      backgroundColor.push("#3f51b5");
      borderColor.push("#000000");
    });

    return {
      labels,
      datasets: [
        {
          label: "# of Followers",
          data,
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <Container>
      <Bar type="vertical" data={data} options={options} />
    </Container>
  );
};
