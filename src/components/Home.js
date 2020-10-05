import React, { useEffect, useState } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios';

function Home() {
  const [shows, setShows] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
      axios.get('https://www.episodate.com/api/most-popular')
      .then(res => {
        setShows(res.data.tv_shows);
      })
    }, [])

 const onSearch = (searchInput) => {
    if(searchInput){ 
      axios.get(`https://www.episodate.com/api/search?q=${searchInput}`)
      .then(res => {
        setShows(res.data.tv_shows);
      })
    } else {
      axios.get(`https://www.episodate.com/api/most-popular`)
      .then(res => {
        setShows(res.data.tv_shows);
      })
    }
  }

  return (
    shows ?
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>
      <form>
        <input id="search-bar" name="searchInput" onChange={(e)=>{setSearchInput(e.target.value)}}></input>
        <input id="submit-btn" type='submit' onClick={(e)=>{e.preventDefault(); onSearch(searchInput)}} ></input>
      </form>
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
    : 'loading'
  );
}

export default Home;
