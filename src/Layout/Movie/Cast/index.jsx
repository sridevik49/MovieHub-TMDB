import React, { useEffect } from 'react'
import { fetchMovieCast } from '../../../api'
import "./index.css"

const index = ({id}) => {

    const[cast, setCast] = React.useState([])
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"

    useEffect(()=>{
        fetchMovieCast(id)
        .then((d)=>setCast(d.cast))
    }, [id])

  return (
    <div className='cast'>
        {
            cast.slice(0,6).map((item, index)=>{
                return(
                    <img key={item.id} className='cast-image' src={`${imageBaseUrl}/${item.profile_path}`}/>
                )
            })
        }
    </div>
  )
}

export default index