import React, { useEffect, useState } from 'react';
import { fetchMovieTrailer } from '../../../api/index';
import YouTube from 'react-youtube';
import "./index.scss";

const index = ({ id }) => {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    fetchMovieTrailer(id)
      .then(data => setTrailer(data.results[0]));
  }, [id])

  return (
    <div style={{ width: '100%' }} className='movie-trailer'>
      {
        trailer && (
          <YouTube width="100%" videoId={trailer.key} />
        )
      }
    </div>
  )
}

export default index