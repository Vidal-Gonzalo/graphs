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
                since_str="2021-05-20T00:00:00Z"
                until_str="2021-05-27T00:00:00Z"
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
