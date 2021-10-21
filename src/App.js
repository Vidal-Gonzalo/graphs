import "./App.css";
import CommentsPerDay from "./components/CommentsPerDay";
import PostsPerDay from "./components/PostsPerDay";
import SentimentPerComment from "./components/CommentsPerFeeling";
import TimeLine from "./components/TimeLine";

function App() {
  return (
    <section className="home">
      <div className="container">
        <div className="home-wrap">
          <div className="graph-wrap">
            <h1 className="title">Gráficos</h1>
            <div className="single-graph">
              <CommentsPerDay
                title="Comentarios por día"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus "
              />
            </div>
            <div className="single-graph">
              <PostsPerDay
                title="Posteos por día"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus "
              />
            </div>
            <div className="single-graph">
              <SentimentPerComment
                title="Comentarios por sentimiento"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            quam voluptatibus "
              />
            </div>
            <div className="single-graph">
              <TimeLine
                since_str="2021-05-21T00:00:00Z"
                until_str="2021-05-26T00:00:00Z"
                interval="days"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
