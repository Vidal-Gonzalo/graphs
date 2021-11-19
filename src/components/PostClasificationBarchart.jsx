import React, { useState, useEffect } from 'react'
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


function PostClasificationBarchart(props) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      Axios.get("assets/post-clasification-barchart.json").then((response) => {
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
            <BarChart layout="vertical" data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#BDB2FF" />
                ))}
              </Bar>
              <YAxis type="category" datakey="tag"/>
              <XAxis  type="number" />
              <Tooltip cursor={false} />
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
}


export default PostClasificationBarchart
