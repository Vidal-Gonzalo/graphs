import React, { useState, useEffect } from "react";
import moment from "moment";
import Axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TimeLine(props) {
  const { since_str, until_str, interval } = props;

  const current = moment(since_str);
  const until = moment(until_str);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get("assets/comments-count-by-interval.json").then((response) => {
      setChartData(adapterFunction(response.data));
    });
  }, []);

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
      </g>
    );
  };

  function adapterFunction(data) {
    const step = interval === "hour" ? "hours" : "days";
    const result = [];
    data = data.map((d) => {
      d.date = moment(d.date);
      return d;
    });
    while (current <= until) {
      let dataItem = data.filter((i) => current.isSame(i.date));
      result.push(
        dataItem.length > 0
          ? dataItem[0]
          : { date: current.clone(), count: null }
      );
      current.add(1, step);
    }
    return result.map((i) => {
      i.date = i.date.format("MM-Do-YY");
      return i;
    });
  }

  return (
    <>
      <div className="row">
        <div className="description">
          <h3>Línea de tiempo de comentarios por intervalo</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus cumque in illo quo labore laborum voluptate, dicta
            expedita nesciunt magni consectetur dolor nemo corrupti sunt
            doloremque, est quaerat?
          </p>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart width="100%" height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval="preserveStartEnd"
                tick={<CustomizedAxisTick />}
              />
              <YAxis interval="preserveStartEnd" />
              <Legend />
              <Tooltip />
              <Line
                name="Comentarios"
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default TimeLine;
