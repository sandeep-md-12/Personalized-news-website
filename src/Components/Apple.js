import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import './NewsList.css'
import { Link } from "react-router-dom";

import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap';
import "bootstrap/js/src/collapse.js";
import { Container, Navbar, Nav } from "react-bootstrap";
import { json } from 'react-router-dom';
function Apple() {
    const [articles,setArticles] = useState([]);
    const [input,setInput] = useState("")
    const [search,setSearch] = useState("")
    const [expanded, setExpanded] = useState(false);
    const[value,setValue]=useState("")

    async function News() {
      useEffect(() => {
        const fetchData = async () => {
          let response = await fetch(
            "https://newsapi.org/v2/everything?q=apple&from=2023-05-19&to=2023-05-19&sortBy=popularity&apiKey=32c33fd4552f42f4ba91b6f2af82185c"
          );
          let result = await response.json();
          console.log(result);
          console.log(result.articles);
          let p = result.articles.map((a) => {
            if (a.urlToImage) {
              return (
                <div className="container">
                  <div className="max-w-sm rounded overflow-hidden shadow-lg card_content">
                    <img className="w-full" src={a.urlToImage} alt="Image_" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{a.title}</div>
                      <p className="text-gray-700 text-base">{a.description}</p>
                      <a className="font-bold text-xl" href={a.url}>
                        Read more
                      </a>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #Apple
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #News
                      </span>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          });
          
    
      console.log(p)
      setValue(p)
    
    
        };
        fetchData();
        
      }, []);
    }
    News()
      
    return  <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <div className='card1'><Navbar expanded={expanded}  expand="lg">
      <Container fluid id='expenses'>
        
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 brand" navbarScroll>
            <Link id='color'
              to="/home"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link to="/business"id="color"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Business
            </Link>
            

            <Link to='/sports' id="color"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Sports
            </Link>
            <Link to="/technology" id='color'
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Technology
            </Link>
            <Link id='color' to="/health"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Health
            </Link>
            <Link to="/science" id='color' 
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Science
            </Link>
            <Link to="/articles"id='color'
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Articles
            </Link>
            <Link to="/tesla" id='color'
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Tesla 
            </Link>
            <Link
              className="nav-link" id='color'
              onClick={() => setExpanded(false)}
            >
              Apple
            </Link>
            <Link
              to="/usBusiness"
              className="nav-link" id='color'
              onClick={() => setExpanded(false)}
            >
              US Business
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
<h1 id="h1">Apple Company News</h1> {value}</div>

    
  
  
}

export default  Apple