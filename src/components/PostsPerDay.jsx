import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barColors = [
  "#FFD6A5",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#FFADAD",
];

const barLabels = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const getIntroOfPage = (label) => {
  if (label === 0) {
    return "Lunes";
  }
  if (label === 1) {
    return "Martes";
  }
  if (label === 2) {
    return "Miércoles";
  }
  if (label === 3) {
    return "Jueves";
  }
  if (label === 4) {
    return "Viernes";
  }
  if (label === 5) {
    return "Sábado";
  }
  if (label === 6) {
    return "Domingo";
  }
  return "";
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        className="labels"
        fill="#666"
      >
        {barLabels[payload.index]}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">
          Han habido <strong>{payload[0].value}</strong> posteos.
        </p>
      </div>
    );
  }

  return null;
};

function PostsPerDay(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get("assets/posts-p-day.json").then((response) => {
      setChartData(response.data);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="description">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <BarChart width={150} height={40} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" barSize={70} fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                ))}
              </Bar>
              <YAxis />
              <XAxis datakey="comment_weekday" tick={<CustomizedAxisTick />} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default PostsPerDay;
