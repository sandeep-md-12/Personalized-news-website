import React from 'react'
import  { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

const  NewsItem = ({ title, description, url, urlToImage}) =>{

    return (
        <div className='main'>
            {/* <div className='news_item'> */}
           
            
        <div className='index_content'>
          <img className='news_img' src={urlToImage} alt={urlToImage} />
            <h3><a href={url}>{title}</a>
            </h3>
            <p>{description}</p>

            <Link to={'about'}><button>Submit</button></Link>
            {/* </div> */}
        </div>
        </div>
      );
  
};
export default NewsItem;