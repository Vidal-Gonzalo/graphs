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
  ResponsiveContainer,
} from "recharts";

function TimeLine(props) {
  const { since_str, until_str, interval } = props;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get("assets/comments-count-by-interval.json").then((response) => {
      setChartData(adapterFunction(response.data));
    });
  }, []);

  function adapterFunction(data) {
    const step = interval === "hour" ? "hours" : "days";
    const current = moment(since_str);
    const until = moment(until_str);
    const result = [];

    while (current <= until) {
      let item = { date: current, count: null };
      let dataItem = data.filter((i) => i.date === current); //Acá está comparando un string con un objeto moment
      result.push(dataItem ? dataItem : item);
      current.add(1, step);
    }
    return result; //Devuelve los valores de diferencia que hay entre los parámetros pero los devuelve vacíos
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
              <XAxis dataKey="date" interval="preserveStartEnd" />
              <YAxis interval="preserveStartEnd" />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default TimeLine;
