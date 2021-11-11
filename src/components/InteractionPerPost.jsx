import React, { useState, useEffect } from 'react'
import moment from "moment";
import Axios from "axios";
import {
    ScatterChart,
    Scatter,
    XAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    Cell,
} from 'recharts';

function InteractionPerPost(props) {
    const { since_str, until_str, interval } = props;
    const current = moment(since_str);
    const until = moment(until_str);

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        //Helpers - 1
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
                        : { date: current.clone(), likes: 0, shares: 0, comments: 0 }
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

        //Helpers - 2
        function TotalInteractions(data) {
            data = data.map((item) => ({
                date: item.date,
                likes: item.likes,
                shares: item.shares,
                comments: item.comments,
                total: (item.likes + item.shares + item.comments)
              }));
            return data
        }

        //Fetching data
        Axios.get("assets/interaction-per-post.json").then((response) => {
            setChartData(TotalInteractions(adapterFunction(response.data)));
        });


    }, [current, interval, until]);

    //Customize content
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

    //Customize Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="intro">{payload[0].value}</p>
                    <p className="desc">
                        Ha habido un total de {payload[0].payload.total} interacciones
                    </p>
                </div>
            );
        }

        return null;
    };

    //Custom color
    const colors = ["#60D394","#EE6055"]

    return (
        <>
            <div className="row">
                <div className="description">
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="wrap-chart">
                    <ResponsiveContainer width="99%" aspect={3}>
                        <ScatterChart>
                            <CartesianGrid />
                            <YAxis />
                            <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                            <ZAxis dataKey="total" range={[60, 600]} />
                            <Tooltip cursor={true} content={<CustomTooltip />} />
                            <Scatter fill="red" dataKey="total" data={chartData} shape="circle">
                                {
                                    chartData.map((entry, index) => {
                                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                                    })
                                }
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default InteractionPerPost


