import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardImage, CardDescription, CardDate} from "../../Components/Card";
import "./index.css";

const Home = ({ movie }) => {

  const image_url = "https://image.tmdb.org/t/p/original";

  return (
    <div className="Home">
      {movie.map((item, index) => {
        return (
          <Card key={item.id}>
            <Link to={`/movie/${item.id}`}>
              <CardImage src={`${image_url}/${item.poster_path}`} />
            </Link>

            <CardTitle title={item.title} />
            <CardDate date={item.release_date} />
            <CardDescription description={item.overview} />
          </Card>
        );
      })}
    </div>
  );
};

export default Home;