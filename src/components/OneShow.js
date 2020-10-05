import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios';


function OneShow() {
  const { id } = useParams(); //this is the selected show id
  const [show, setShow] = useState("");
  const [isLiked, setIsLiked] = useState(false)
  const [ratingClass, setRatingClass] = useState('')

  useEffect(() => {
    setIsLiked(localStorage.getItem(id));
    axios.get(`https://www.episodate.com/api/show-details?q=${id}`)
    .then(res => {
      const showObject = res.data.tvShow
      setShow(showObject);
    });

  }, [])

  const likeFunction = () => {
    if(isLiked === 'true') {
      setIsLiked('false')
      localStorage.setItem(id, 'false');
    } else {
      setIsLiked('true')
      localStorage.setItem(id, 'true');
    }
  }

  const getRatingClass = (rating) => {
    if (rating >= 8) {
      return 'green'
    } else if (rating >= 6 && rating < 8) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  return (
    show ?
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      <div className="like-div" onClick={()=>{likeFunction()}}>
        <img 
        src={isLiked === 'true' ? likedImg : notLikedImg}
        className="interaction-img"
        alt={isLiked === 'true' ? 'liked' : 'not liked'}
        />
      </div>
      <div className="one-show-img-and-title">
        <h2>{show.name}</h2>
        <img className="one-show-img" src={show.image_path}/>
        <div className="one-show-description">
          <h2>description:</h2>
          {show.description}
        </div>
        <div className="one-show-footer">
          <div className="seasons">{show.episodes[show.episodes.length - 1].season} seasons</div>
          <div className="genres">
            {show.genres.map(genre => (
              <span className="genre">{genre}</span>
            ))}
          </div>
          <div className="rating">
            <span
            className={getRatingClass(Number(show.rating))}
            >{show.rating.length > 3 ? show.rating.substring(0,3) : show.rating}</span>
          </div>
          <div className="show-status">
            <span className="status">{show.status}</span>
          </div>
        </div>
      </div>
    </div>
    : 'loading'
  );
}

export default OneShow;
