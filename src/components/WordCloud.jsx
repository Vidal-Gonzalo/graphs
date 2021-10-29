import React, { useState, useEffect } from "react";
import Axios from "axios";
import WordCloud from "react-d3-cloud";

const fontSize = (word) => word.value / 10;
const rotate = (word) => 0;

function WordsCloud(props) {
  const [chartData, setChartData] = useState([]);

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
              fontFamiliy="Lato"
              fontSize={fontSize}
              spiral="archimedean"
              rotate={rotate}
              padding={15}
              fill="#2F4F4F"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WordsCloud;
