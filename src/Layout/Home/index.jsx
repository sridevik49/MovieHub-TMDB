import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardImage, CardReview, CardDate} from "../../Components/Card";
import "./index.scss";

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
             <p style={{padding: '15px', paddingBottom: '5px 0 !important' , paddingTop: '5px'}}>Rating:⭐ {item.vote_average}</p> 

           
          </Card>
        );
      })}
    </div>
  );
};

export default Home;