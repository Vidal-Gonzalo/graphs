import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CommentsAndShares(props) {

  //LineChart

  const { since_str, until_str, interval } = props;
  const current = moment(since_str);
  const until = moment(until_str);

  const [chartData, setChartData] = useState([]);
  const [groupedByDate, setGroupedByDate] = useState([]);
  const [pieData, setPieData] = useState([{ "date": 2, "comments": 3, "likes": 3 }])

  useEffect(() => {
    //Fetching data
    Axios.get("assets/comments-and-shares.json").then((response) => {
      setChartData(adapterFunction(response.data));
    })
    // loadData()
    console.log(pieData)
  }, []);

  // async function loadData() {
  //   const response = await fetch("assets/comments-and-shares.json").then(response => response.json())
  //   setGroupedByDate(groupDataByDate(adapterFunction(response)));
  // }

  // function groupDataByDate(rawList) {
  //   const dataByDate = {}
  //   for (const i in rawList) {
  //     const item = rawList[i];
  //     const currentValues = dataByDate[item.date];
  //     if (currentValues === undefined) {
  //       dataByDate[item.date] = {};
  //       dataByDate[item.date].total = item.comments + item.shares;
  //       dataByDate[item.date].shares = item.shares;
  //       dataByDate[item.date].comments = item.comments;
  //     } else {
  //       dataByDate[item.date].total = currentValues.total + (item.comments + item.shares);
  //       dataByDate[item.date].shares = currentValues.shares + item.shares;
  //       dataByDate[item.date].comments = currentValues.comments + item.comments;
  //     }
  //   }
  //   return dataByDate
  // }

  //Helper
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
      if (step === "days") {
        i.date = i.date.format("YYYY-MM-DD");
      } else {
        i.date = i.date.format("DD-hh:mm");
      }
      return i;
    });
  }

  // PieChart //


  // LineChart //
  //Customized tooltip
  function CustomMouseHover(payload) {
    setPieData(payload.activePayload[0].payload);
    console.log(pieData);
  }


  //Customized content
  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          className="timeLineLabels"
          textAnchor="middle"
          fill="#666"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <>
      <div className="row">
        <div className="description">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="comments"
              >
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart width="100%" height={200}
              onMouseEnter={CustomMouseHover} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval="preserveStartEnd"
                tick={<CustomizedAxisTick />}
              />
              <YAxis interval="preserveStartEnd" />
              <Legend
                wrapperStyle={{ position: "relative" }}
                iconType="plainlane"
              />
              <Tooltip />
              <Line
                name="Me gusta"
                type="monotone"
                dataKey="shares"
                stroke="#F40000"
                strokeWidth={2}
              />
              <Line
                name="Comentarios"
                type="monotone"
                dataKey="comments"
                stroke="#0A2463"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default CommentsAndShares;
