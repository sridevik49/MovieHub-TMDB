import React from "react";
import "./index.scss";

function About() {
  return (
    <div className="about-page">

      <h1 className="about-title">About Movie Hub 🎬</h1>

      <div className="about-container">

        <p>
          Welcome to <strong>Movie Hub</strong>, your ultimate destination for
          discovering the latest movies, trending films, and timeless classics.
          Our platform is designed for movie lovers who want quick access to
          movie details, ratings, and recommendations.
        </p>

        <p>
          At Movie Hub, we provide information about thousands of movies across
          different genres including action, comedy, drama, thriller, and more.
          Whether you're looking for the newest releases or searching for your
          favorite classic film, we make it easy to explore.
        </p>

        <p>
          Our mission is to create a simple and enjoyable movie browsing
          experience for everyone. We continuously update our platform to bring
          you the best movie content and features.
        </p>

        <h2>Why Choose Movie Hub?</h2>

        <ul>
          <li>🎬 Latest Movie Updates</li>
          <li>⭐ Movie Ratings & Reviews</li>
          <li>🔍 Easy Movie Search</li>
          <li>📱 Simple and User-Friendly Interface</li>
        </ul>

      </div>

    </div>
  );
}

export default About;