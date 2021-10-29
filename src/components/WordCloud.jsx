import React, { useState, useEffect } from "react";
import Axios from "axios";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const fontSize = (word) => word.value / 10;
const rotate = (word) => 0;
const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

function WordsCloud(props) {
  const [chartData, setChartData] = useState([]);
  // const [wordData, setWordData] = useState("");

  useEffect(() => {
    Axios.get("assets/word-cloud.json").then((response) => {
      setChartData(renameData(response.data));
    });
  }, []);

  function renameData(data) {
    data = data.map((item) => ({
      text: item.word,
      value: item.value,
    }));
    return data;
  }

  return (
    <>
      <div className="description">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="word-cloud-wrap">
        <div className="row">
          <div className="col-12">
            <WordCloud
              data={chartData}
              width={900}
              height={300}
              fontStyle="italic"
              fontWeight="bold"
              fontSize={fontSize}
              spiral="archimedean"
              rotate={rotate}
              // onWordClick={(event, d) => {
              //   setWordData({ name: d.text, value: d.value });
              // }}
              padding={15}
              fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
            />
          </div>
        </div>
      </div>
      {/* <div className="word-data-wrap">
        <div className="word-data">
          {wordData ? (
            <p className="word-values">
              {wordData.name.replace(/^\w/, (c) => c.toUpperCase())}:{" "}
              {wordData.value}
            </p>
          ) : (
            <p className="text-white">Elige una palabra</p>
          )}
        </div>
      </div> */}
    </>
  );
}

export default WordsCloud;
