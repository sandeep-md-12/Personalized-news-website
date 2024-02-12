import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import './NewsList.css'
import { Link } from "react-router-dom";
import Business from './Business';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import { FaUser,FaAddressBook,FaAtom,FaFutbol,FaHeartbeat,FaDesktop, FaBook, FaPlayCircle,FaSearch,FaArrowUp } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import 'bootstrap';
import "bootstrap/js/src/collapse.js";
import { Container, Navbar, NavDropdown,Nav,Modal} from "react-bootstrap";
import { Newspaper } from 'react-bootstrap-icons';
import Navbar1 from './Navbar';
import {useLocation, useNavigate} from 'react-router-dom';  
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Form,FormControl,Button } from 'react-bootstrap';
import UserDropdown from './UserDropdown';
import { useRef } from "react";
import { UserContext } from './Usercontext';
import { FaWhatsapp, FaInstagram, FaFacebook,FaMoon,FaSun} from 'react-icons/fa';
import Bookmark1 from './Bookmark';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Bookmark,Share } from 'react-bootstrap-icons';
import { FaBookmark, FaRegBookmark,FaVolumeUp } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useSpeechSynthesis } from 'react-speech-kit';
import logo from './Images/logo_updated.jpg'
import { BrowserRouter,Route,NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
function NewsList({data}) {


  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const location=useLocation()
  const [isOpen, setIsOpen] = useState(false);
    const [articles,setArticles] = useState([]);
    const [input,setInput] = useState("")
    const [search,setSearch] = useState("")
    const [expanded, setExpanded] = useState(false);
    const[value,setValue]=useState("")
    const [showOptions, setShowOptions] = useState(false);

    const [filteredResults, setFilteredResults] = useState([]);
    const [result, setResult] = useState({ articles: [] });
    const [user, setUser] = useState(null);
    const[showpop,setshowpop] = useState(false)
    const [clicked, setClicked] = useState(false);
    const[bookmark, setBookmark] = useState(location.state.title) 

    const[booked, setBooked] = useState(false);
    const { speak, voices } = useSpeechSynthesis();
    const femaleVoice = voices.find(
      (voice) => voice.name.includes("Google UK English Female")
    );
    

    const [bookmarkedTitles, setBookmarkedTitles] = useState([]);

    const { name } = location.state;

    useEffect(() => {
      const fetchBookmarkedTitles = async () => {
        // Replace this URL with the URL of your backend endpoint
        // Make sure to include the username of the currently logged-in user
        const response = await fetch(`api/bookmarked-titles/${name}`);
        const data = await response.json();
        setBookmarkedTitles(data);
      };
      fetchBookmarkedTitles();
    }, [name]);
  
    //
    const handleClick = async(title,description) => {
      setCount(count+2)
      console.log("Bookmark icon clicked");
      console.log(title);
      console.log(description);
      toast.info('Book marked');

      setClicked((prevState) => ({ ...prevState, [title]: !prevState[title] }));


//       const article = articles.find((a) => a.title === title);
// console.log(article);
  

      try {
        await axios.post("http://localhost:8000/bookmarks", {
          name :location.state.name,
          email:location.state.id,
          password:location.state.password,
          mobile:location.state.mobile,
          gender:location.state.gender,
          role:location.state.role,
          age:location.state.age,
          title:title,
        });
        console.log("Bookmark saved successfully");
      } catch (error) {
        console.error(error);
      }
    };
    
    const [currentApiLink, setCurrentApiLink] = useState("https://newsapi.org/v2/top-headlines?country=in&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d");

    const [iconClicked, setIconClicked] = useState([])

    const [heading, setHeading] = useState("General News");

    const[count,setCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const[ourtext,setOurtext] = useState("");
    const [click, setClick] = React.useState(false);
    const [showBlogDropdown, setShowBlogDropdown] = useState(false);
    const[showrecommand,setShowrecommand] = useState(false);
    const [showContactDropdown, setShowContactDropdown] = useState(false);
    const[showBlogmobile, setShowBlogmobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event) => {
  setCount(count+6)

  setSearchTerm(event.target.value);
  console.log(searchTerm)
};


    
  const handleClick1 = () => setClick(!click);
  const Close = () => setClick(false);

  useEffect(() => {
    if (currentApiLink.includes("category=business")) {
      setHeading("Business News");
    } else if (currentApiLink.includes("category=science")) {
      setHeading("Science News");
    } else if (currentApiLink.includes("category=sports")) {
      setHeading("Sports News");
    } 
    else if(currentApiLink.includes("category=entertainment")){
      setHeading("Entertainment News")
    }
    else if (currentApiLink.includes("category=health")) {
      setHeading("Health News");
    } else if (currentApiLink.includes("category=technology")) {
      setHeading("Technology News");
    } else if(currentApiLink.includes("q =tesla")) {
      setHeading("Tesla News");
    }else if(currentApiLink.includes("q= apple")){
      setHeading("Apple News")

    }
    else if(currentApiLink.includes("country=us")){
      setHeading("US News")
    }
    else if(currentApiLink.includes("country=in")){
      setHeading("Top Headlines")
    }
    else{
      setHeading("Articles")
    }
  }, [currentApiLink]);
  
  const [showSharePopup, setShowSharePopup] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    console.log("Bookmark state updated:", bookmark);
  }, [bookmark]);



  
  const sharehandle =(index)=>{
    setCount(count+5);
    setShowSharePopup((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }
  const handleNavbarClick = async (event, apiLink) => {
      setCount(count+1);
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
      event.preventDefault();
      setCurrentApiLink(apiLink);
      try {
        const response = await Axios.get(apiLink);
        const result = response.data;
        console.log(result)
        articles = result.articles.filter(article => article.source === apiLink.split('?')[1]);
        setValue(articles);

      } catch (error) {
        console.error('Error fetching news:', error);
      }
      finally{
        
      }

      
    };
    useEffect(() => { 
      if (showpop) {
        document.body.classList.add('pop_active');
      } else {
        document.body.classList.remove('pop_active');
      }
    }, [showpop]);
    const ref = useRef(null);

    
    async function News () {
      useEffect(() => {
        const fetchData = async () => {
          let response = await fetch(currentApiLink);
          let result = await response.json();
          console.log(result);
          console.log(result.articles);
          setArticles(result.article);
          const filteredArticles = searchTerm
  ? articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  : articles;

console.log('Filtered articles:', filteredArticles);


          let p = result.articles.map((a,index) => {
            
            
            
            if (a.urlToImage) {
              return (
                <div className="container">
                 
                  <div className="max-w-sm rounded overflow-hidden shadow-lg card_content">
                  <button
                  className={`absolute top-0 right-10 bg-white rounded-full p-2 ${
                    iconClicked[index] ? 'text-red-500 scale-125' : 'text-black-500'
                  }`}
                  onClick={() => {
                    setIconClicked((prevIconClicked) => {
                      const newIconClicked = [...prevIconClicked];
                      newIconClicked[index] = !newIconClicked[index];
                      return newIconClicked;
                    });
                    console.log("Before speak:", a.title);
                    speak({ text: a.title, voice: femaleVoice }, setCount(count + 1));
                    console.log("After speak:", a.title);
                  }}
                  
          >
            <FaVolumeUp id= "volume"/>
          </button>
                 
                    <img className="w-full" src={a.urlToImage} alt="Image1" />
                    
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{a.title}
                    
                                     
                      </div>
                      <p className="text-gray-700 text-base desc">{a.description}</p>
                      <div className="popup1"></div>
                      <Popup trigger=
                      {<button className="font-bold text-xl"> 
                      Read more
                    </button>}
                      position="right center">
                        <div     className={`content_popup ${isDarkTheme ? 'bg-black text-white' : ''}`}
>
                      <div>{a.title}</div>
                      <a href={a.url}>read more</a>
                      </div>
                  </Popup>
                 
                  <div class="icon-container">
            <div className="container_bookmark_icon">
              {clicked[a.title] ? (
                <FaBookmark id="filled_bookmark" onClick={() => {

                  setBookmarkedTitles([...bookmarkedTitles, a.title]);

                  console.log("Bookmark icon clicked");

                  handleClick(a.title, a.description);
                  setBookmark(a.title);
                }}  /> 
              ) : (
                <FaRegBookmark id="unfilled_bookmark" onClick={() => handleClick(a.title,a.description)} />
              )}
            </div>
            <button onClick={()=>sharehandle(index)} className='container_share_icon'>
              <Share id="share" />
            </button>
          </div>

                    {showSharePopup[index] && (
                      <div className="share-popup">
                      <a href={`https://wa.me/?text=${encodeURIComponent(a.urlToImage + '\n'+a.title + '\n' + a.description + '\n' + a.url)}`}>
                      <FaWhatsapp id="social_media1" />
      </a>

      <a href={`https://www.instagram.com/?url=${encodeURIComponent(a.url)}`}>
  <FaInstagram id="social_media2" />
</a>

            <a href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(a.title)}`}>
              <FaFacebook id="social_media3"/>
            </a>

        </div>
      )}

                     </div>
                    
                     <div   style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}
            className={`px-6 pt-4 pb-2 `}>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
              isDarkTheme ? 'text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            #{heading}
          </span>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
              isDarkTheme ? 'text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            #Newsile
          </span>

          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
              isDarkTheme ? 'text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {a.source.name}
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
        setShowrecommand(false);
        setShowBlogDropdown(false);
        setShowContactDropdown(false);
        
        fetchData();
        
      }, [count,refresh]);
    }
    
    News()
    const typingRef = useRef();

useEffect(() => {
  const text = "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss";
  let index = 0;

  function type() {
    if (index < text.length) {
      const nextCharacter = String.fromCharCode(text.codePointAt(index));
      if (typingRef.current) {
        const currentText = typingRef.current.textContent;
        typingRef.current.textContent = currentText.slice(0, index) + nextCharacter + currentText.slice(index + 1);
      }
      index++;
      setTimeout(type, 50);
    }
  }

  type();
}, []);
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState(null);
const handleChange = (event) => {
  setSearchQuery(event.target.value);
}
const handleButtonClick = () => {
  ref.current?.scrollIntoView({behavior: 'smooth'});
};



useEffect(() => {
  console.log(isDarkTheme);
  setCount(count+3)
  if (isDarkTheme) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [isDarkTheme]);

useEffect(() => {
  if (booked) {
    document.getElementById('booked').scrollIntoView();
  }

  ref.current?.scrollIntoView({behavior: 'smooth'});
}, [booked]);

const handle_bookmared=() =>{
      setBooked(true)
}

const handleMany_news =()=>{
  navigate('/many')
}
const handleSubmit = (event) => {
  event.preventDefault();
  // perform search term
  let results = result.articles.filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
  setSearchResults(results);
}

return (<>
<div class='wallpaper_container' id="home">
        <div className="quote">
                    
          <h1 >Hi <span id ="dynamic_heading">{location.state.name}</span></h1>
          {/* <ul>
        {location.title.map((bookmark) => (
          <li key={bookmark}>{bookmark}</li>
        ))}
      </ul> */}
          <span ref={typingRef} className="typing">
          
          </span>
            <button className="get-started" onClick={handleButtonClick}>Get started
        </button>

        </div>
        
        <div className="animation"></div>
        
      </div>
      

      <Navbar1 username={location.state.id} name={location.state.name} mobile={location.state.mobile} gender={location.state.gender} role = {location.state.role} age={location.state.age} title={location.state.title} selectedBrands = {location.state.selectedBrands}
      showBlogDropdown ={setShowBlogDropdown} showrecommand ={setShowrecommand} showContactDropdown ={setShowContactDropdown} onSetShowOptions={setShowOptions}/>

      <ToastContainer />

<div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 body">


<div className='card1'>
{/* <Navbar bg="primary" expand="md">  
    <Container>  
      <Navbar.Brand href="#home">Navbar Brand</Navbar.Brand>  
      <Navbar.Toggle aria-controls="basic-navbar-nav" />  
      <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="me-auto">  
          <Nav.Link href="#home">Home</Nav.Link>  
          <Nav.Link href="#link">Link</Nav.Link>  
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">  
            <NavDropdown.Item href="#action/3.1">Dropdown Item 1</NavDropdown.Item>  
            <NavDropdown.Item href="#action/3.2">Dropdown Item 2</NavDropdown.Item>  
            <NavDropdown.Item href="#action/3.3">Dropdown Item 3</NavDropdown.Item>  
            <NavDropdown.Divider />  
            <NavDropdown.Item href="#action/3.4">Another Item</NavDropdown.Item>  
          </NavDropdown>  
        </Nav>  
      </Navbar.Collapse>  
    </Container>  
  </Navbar>   */}
  <div class="nav" id="mobile-navbar">
  <a id="a_tag_home" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
            Home
        </a>
  <a href="/home">
  <NavLink id ="mob_nav"
        exact
        to="/home"
        activeClassName="active"
        className="nav-links"
        onClick={(event) => {
          event.preventDefault();
          setShowBlogmobile(!showBlogmobile);
          console.log(showBlogmobile)
        }}
      >
        Topics
      </NavLink>

      {showBlogmobile && (
            <ul id="blog1">

          <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
                      <FaAddressBook  id="business_card"/>
                  </a></li>

                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
                      <FaAtom  id="business_card"/>
                  </a></li>

                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
                      <FaFutbol  id="business_card"/>
                  </a></li>


                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
                      <FaHeartbeat  id="business_card"/>
                  </a></li>

                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
                      <FaDesktop  id="business_card"/>
                  </a></li>

                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
                      <FaBook  id="business_card"/>
                  </a></li>

                  <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
                      <FaPlayCircle  id="business_card"/>
                  </a></li>






                  </ul>
      )}
      
  </a>
</div>

<div>
  {/* ///////////////////////////////////// */}

  

  <div className={clicked ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <a href="/home" className="nav-logo">
            <img src={logo} alt="logo"/>
            <i className="fa fa-code"></i>

         
          </a>

          <button
          className={`theme-toggle ${isDarkTheme ? 'dark' : ''}`}
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >


          {isDarkTheme ? <span title="dark theme"><FaMoon id="icon_theme"/></span> : <span title="Light theme"><FaSun id="icon_theme" /></span>}
        </button>



          <ul  className={clicked ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
            <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.reload();

                }}
              >
                Home
      </NavLink>
             
            </li>
            <li className="nav-item">
            <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={(event) => {
                  event.preventDefault();
                  setShowrecommand(!showrecommand);
                  setShowOptions(false);
                  setShowBlogDropdown(false);
                  setShowContactDropdown(false);
                }}
              >
                History
      </NavLink>
      {showrecommand && (
        <ul id="blog" >

          <li><a id="a_tag_drop" href="http://localhost:5173/">Calender</a></li>

          <li><a id="a_tag_drop" onClick={handleMany_news}>Country</a></li>

                  {/* <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop"  style={{color:'white'}}href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Health
        </a></li> */}
          </ul>
        
      )}
            </li>
        <li className="nav-item">
          <NavLink
        exact
        to="/blog"
        activeClassName="active"
        className="nav-links"
        onClick={(event) => {
          event.preventDefault();
          setShowBlogDropdown(!showBlogDropdown);
          setShowOptions(false)
          setShowrecommand(false);
          setShowContactDropdown(false);
        }}
      >
        Topics
      </NavLink>
          {showBlogDropdown && (
            <ul id="blog">

          <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
                      Business
                  </a></li>

              <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Science
        </a></li>
        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Sports
        </a></li>
        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Health
        </a></li>


        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Tech
        </a></li>

        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=32c33fd4552f42f4ba91b6f2af82185c")}>
            Articles
        </a></li>

       

        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
            Entertainment
        </a></li>

        <li onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=us&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}> <a id="a_tag_drop" href="/home" onClick={(event) => handleNavbarClick(event, "https://newsapi.org/v2/top-headlines?country=us&apiKey=e0871c37702a45e8a0f5a2f8c1d71e6d")}>
            US
        </a></li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/contact"
            activeClassName="active"
            className="nav-links"
            onClick={(event) => {
              event.preventDefault();
              setShowContactDropdown(!showContactDropdown);
              setShowOptions(false);
              setShowrecommand(false);
              setShowBlogDropdown(false);
            }}
          >
            Solve
          </NavLink>
          {showContactDropdown && (
            <ul className='nav-item_extra'>
              <li><a id="cross_word" href="http://localhost:3001/">Cross word</a></li>
              <Link to ="/board"><li id="game_2048">2048 Game</li></Link>
              <Link to ="/riddle"><li id="riddle">Riddle</li></Link>

              <li><a id="suduko" href="http://localhost:3002/">Suduko</a></li>
              
            </ul>
          )}
        </li>

          </ul>
          <div className="nav-icon" onClick={handleClick1}>
            <i className={clicked ? <FaBars />: "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
  {/* //////////////////////////////////////// */}

</div>

    </div>
<h1 id="h1" ref={ref}>{heading}</h1>  
<button onClick={handle_bookmared} id ="booked">Bookmarks</button>






        {showSpinner && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(211,211,211,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )}
 <Link to="newspaper" id="newspaper"><button><Newspaper className='newspaper_icon'/></button></Link>

  {/* <IconContext.Provider value={{ color: 'grey' }}>
        <FaUser className="logo"onClick={() => setShowMenu(!showMenu)} />
        {showMenu && (
          <ul className="dropdown-menu">
            <li>Info</li>
            <li>Logout</li>
          </ul>
        )}
      </IconContext.Provider> */}


  

    {value} </div>

    <Modal  style={{border:'none'}}
  show={booked}
  onHide={() => setBooked(false)}
  dialogClassName="custom-modal" id="model"
>
  <Modal.Header closeButton id= "title">
    <Modal.Title >Bookmarked</Modal.Title>
  </Modal.Header>
  <Modal.Body id = "body">
    <Bookmark1 title={location.state.title} id="booked" />
  </Modal.Body>
</Modal>
<div  style={{padding:'20px',backgroundColor:'#5de1aa',width:'30px',height:'30px'}}>
<a href="home"><FaArrowUp style={{color:'black',position:'relative',left:'-7px',top:'-7px'}}/></a></div>
  <Footer id="foot"/>
    </>
)}

export default  NewsList