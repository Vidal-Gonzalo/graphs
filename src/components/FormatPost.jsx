import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  RadialBar,
  RadialBarChart,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FormatPost(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get("assets/format-post.json").then((response) => {
      setChartData(fillColorFunction(response.data));
    });
  }, []);

  function fillColorFunction(data) {
    const colors = ["#8884d8", "#83a6ed", "#8dd1e1"];
    data = data.map((item, index) => ({
      type: item.type,
      count: item.count,
      fill: colors[index],
    }));
    return data;
  }

  function getPercentage(data, value) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      let count = data[i].count;
      total += count;
    }
    let percentage = Math.round((value * 100) / total);
    return percentage + "%";
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="desc">
            Porcentaje: {getPercentage(chartData, payload[0].value)}
            <br />
            Publicaciones: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  return (
    <div className="row">
      <div className="description">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="wrap-chart">
        <ResponsiveContainer width="99%" aspect={3}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            barSize={25}
            data={chartData}
          >
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              clockWise
              dataKey="count"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FormatPost;
