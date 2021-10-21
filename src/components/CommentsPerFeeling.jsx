import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barColors = ["#008000", "#FFFF00", "#FF0000"];

const barLabels = ["Positivo", "Neutro", "Negativo"];

const getIntroOfPage = (label) => {
  if (label === 0) {
    return "Positivo";
  }
  if (label === 1) {
    return "Neutral";
  }
  if (label === 2) {
    return "Negativo";
  }

  return "";
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
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
          Han habido <strong>{payload[0].value}</strong> posteos
        </p>
      </div>
    );
  }

  return null;
};

function SentimentPerComment(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get("assets/sentiment-p-comments.json").then((response) => {
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
              <ReferenceLine y={0} stroke="#000" />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                ))}
              </Bar>
              <YAxis />
              <XAxis datakey="sentiment" tick={<CustomizedAxisTick />} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default SentimentPerComment;
