import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./listarticles.css";


   function displayMedia(type, url) {
     return <img src={"http://localhost:8000/media/" +url} />
   }



export default function ListArticles(props) {

  const [data, setData] = useState( [] );

  const origin = useRef();
  const player = useRef();
  const type = useRef();

function updateData(e) {
	
	let myOrigin = origin.current.value
	let myNbPlayer = player.current.value
	let myType = type.current.value

	let myData = props.data

	if (myOrigin.toUpperCase() != "ALL") {
		myData = myData.filter( (article) =>  article.origin == myOrigin.toUpperCase())
	} 

	console.log(myData)
	if (myNbPlayer.toUpperCase() != "ALL") {
		myData = myData.filter( (article) =>  article.nbplayer == myNbPlayer)
	} 
		
	if (myType.toUpperCase() != "ALL") {
		myData = myData.filter( (article) =>  article.type == myType.toUpperCase())
	} 

	console.log(myData)
	setData(myData)		
	
}

 useEffect(() => {
    setData(props.data);
  }, [props.data]);


return (
 <>
        <h1>
            Articles !!
        </h1>

      <select ref={origin} onChange={updateData}>
      	<option>All</option>
        <option>France</option>
        <option>Ireland</option>
        <option>Portugal</option>
        <option>Spain</option>
        <option>United State</option>
        <option>Italy</option>
      </select>

      <select ref={player} onChange={updateData}>
      	<option>All</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>


      <select ref={type} onChange={updateData}>
      	<option>All</option>
        <option>CardGame</option>
        <option>BoardGame</option>
      </select>


          {data.map( x =>  <article  key={x.id}>
                              <Link to={"/article/"+ x.id}> <h1 className="Article_title">{x.title}</h1></Link>
                              <section dangerouslySetInnerHTML={{__html: x.content}}></section>
                              <h1>{x.origin}</h1>
                              <h2>{x.nbplayer}</h2>
                              <h3>{x.type}</h3>
                              {displayMedia(x.mediaType,x.mediaURL)}
                           </article>
           )}
      </>
    );
}