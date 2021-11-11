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

function FollowersTimeLine(props) {
  const { since_str, until_str, interval } = props;

  const current = moment(since_str);
  const until = moment(until_str);

  const [chartData, setChartData] = useState([]);

  //Helpers

  useEffect(() => {
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
          i.date = i.date.format("MMM-DD-YY");
        } else {
          i.date = i.date.format("DD-hh:mm");
        }
        return i;
      });
    }

    Axios.get("assets/followers-timeline.json").then((response) => {
      setChartData(adapterFunction(response.data));
    });
  }, [current, interval, until]);

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
            <LineChart width="100%" height={200} data={chartData}>
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
                name="Twitter"
                type="monotone"
                dataKey="followers_tw"
                stroke="#00acee"
                strokeWidth={3}
              />
              <Line
                name="Facebook"
                type="monotone"
                dataKey="followers_fb"
                stroke="#3b5998"
                strokeWidth={3}
              />
              <Line
                name="Youtube"
                type="monotone"
                dataKey="followers_yt"
                stroke="#c4302b"
                strokeWidth={3}
              />
              <Line
                name="Instagram"
                type="monotone"
                dataKey="followers_in"
                stroke="#E1306C"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default FollowersTimeLine;
