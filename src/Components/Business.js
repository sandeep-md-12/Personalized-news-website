import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import './NewsList.css'
import { Link } from "react-router-dom";
import { Newspaper } from 'react-bootstrap-icons';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar1 from './Navbar';
import 'bootstrap';
import "bootstrap/js/src/collapse.js";
import { Container, Navbar, Nav } from "react-bootstrap";
import { json } from 'react-router-dom';
import { Button } from 'bootstrap';
import { useLocation } from 'react-router-dom';
function Business({data}) {
    const [articles,setArticles] = useState([]);
    const [input,setInput] = useState("")
    const [search,setSearch] = useState("")
    const [expanded, setExpanded] = useState(false);
    const[value,setValue]=useState("")
    const location=useLocation()
   
    async function News() {
      useEffect(() => {
        const fetchData = async () => {
          let response = await fetch(
            "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=32c33fd4552f42f4ba91b6f2af82185c"
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
                        #Business
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
    const username = location.state ? location.state.id : "";
    const name = location.state ? location.state.name : "";
    const mobile = location.state ? location.state.mobile : "";
    const gender = location.state ? location.state.gender : "";
    const role = location.state ? location.state.role : "";
    const age = location.state ? location.state.age : "";
    if (location.state) {
      return (
        <Navbar1
          username={location.state.id}
          name={location.state.name}
          mobile={location.state.mobile}
          gender={location.state.gender}
          role={location.state.role}
          age={location.state.age}
        />
      );
    } else {
        
    }
    return <> <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
<h1 id="h1">Business News in India</h1>
{/* <Link to="/business/newspaper1"><button><Newspaper id='newspaper_icon1'/></button></Link> */}

{value}</div>
</>
  
  
}

export default  Business