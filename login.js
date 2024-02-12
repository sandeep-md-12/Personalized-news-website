import React, { useState } from 'react'
import * as Components from './Components';
import { useEffect } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import img1 from './Images/img1-removebg-preview.png'
import img2 from './Images/img2-removebg-preview.png'
import img3 from './Images/img3-removebg-preview.png' 
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useNavigate, Link } from "react-router-dom"
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chatbot from './Chatbot';
import { auto } from '@popperjs/core';
import logo from '../Components/Images/newsile_logo.png'

export default function Login({setData}) {
    const [signIn, toggle] = React.useState(true);
    const[email,setEmail] = useState('');
    const[name,setName]=useState('')
    const[password,setPassword] = useState('');
    const[mobile,setMobile] = useState('');
    const[gender,setGender] = useState('');
    const [show, setShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
  const history = useNavigate();

  const BRANDS = [
    {
      name: 'Business',
      slug: 'business',
    },
    {
      name: 'Science',
      slug: 'Science',
    },
    {
      name: 'Sports',
      slug: 'Sports',
    },
    {
      name: 'Health',
      slug: 'Health',
    },
    {
      name: 'Techno',
      slug: 'Techno',
    },
    {
      name: 'Articles',
      slug: 'Articles',
    },
    {
      name: 'Entertainment',
      slug: 'Entertainment',
    },
   
  ];
  const [brands, setBrands] = useState(BRANDS);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const renderBrands = ({ name, slug }) => {
    const isSelected = selectedBrands.includes(slug);

    return (
      <div
        onClick={() => {
          if (isSelected) {
            setSelectedBrands((prev) => prev.filter((i) => i !== slug));
          } else {
            setSelectedBrands((prev) => [...prev, slug]);
          }
        }}
        style={{
          display: 'inline-block',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'10px !important',
          cursor:'pointer',
          border: '1px solid lightgrey',
          margin: '5px',
          width: auto,
          borderRadius: '19px',
          height: '30px',
          padding: '10px', 
          paddingBottom:'30px',
          transition: 'background-color 0.3s',
          
          backgroundColor: isSelected ? '#d2fae9' : 'transparent',
          color: isSelected ? 'black' : 'black',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {name}
      </div>
    );
  };

  const containerStyles = {
    backgroundColor: '#fff',
    padding: '8px',
    display: 'flex',
    flexWrap: 'wrap', 
    justifyContent: 'center'
  };

  const brandRows = [];
  for (let i = 0; i < brands.length; i += 4) {
    brandRows.push(
      <div key={i} style={{ display: 'flex' }}>
        {brands.slice(i, i + 4).map((brand, index) => (
          <div key={index}>{renderBrands(brand)}</div>
        ))}
      </div>
    );
  }

    
  
  const submit = async (event) => {
    event.preventDefault();
    if (isMobileValid) {
      toast("Submitting...", { autoClose: 1500 });
      try {
        await axios.post("http://localhost:8000/", {
          name,
          email,
          password,
          mobile,
          gender,
          age,
          selectedBrands,
        },
        { timeout: 3000 }
        );
      }
        finally{
          toast("Account created, Please login to continue", { autoClose: 3000 });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
        
      }
    else {
      toast.error("Invalid number");
    }
  };
  
 
  
    
      async function fetchDataFromBackend() {
        try {
          const response = await fetch('/api/user-data');
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    
      const handleLogin = async () => {
        
        const data = await fetchDataFromBackend();
        
        setData(data);
      };
      
      const [step, setStep] = useState(1);
      const [date, setDate] = useState("");
      const[age,setAge] = useState(0);

      const submit1 = async (event) => {
        event.preventDefault();
        setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
      
          }, 5000);
        
        fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Store user data in parent component
              setData(data.user);
              history('/home', { state: { id: data.user.email, name: data.user.name,mobile:data.user.mobile,gender:data.user.gender,age:data.user.age,password:data.user.password,
                title:data.user.title,
                selectedBrands:data.user.selectedBrands,
              } })

              // Display success toast
              toast.success('Logged in successfully!', { autoClose: 3000 });
              // Wait for 3 seconds before redirecting to new page
              setTimeout(() => {
                window.location.href = '/home';
              }, 3000);
            } else {
              // Display danger toast
              toast.error('Wrong email or password!', { autoClose: 3000 });
            }
          })
          .catch((err) => console.error(err));
      };
      const [isMobileValid, setIsMobileValid] = useState(false);

     const handleMobileChange = (event) => {
    const mobile = event.target.value;
    setMobile(mobile);
    setIsMobileValid(mobile.length === 10);
  };
        
      
      
    //   useEffect(() => {
    //     if (localStorage.getItem("showToast") === "true") {
    //       toast("Account created! Please login to continue.");
    //       localStorage.removeItem("showToast");
    //     }
    //   }, []);
    const [showlogo, setShowlogo] = useState(true);

    useEffect(() => {
      setShowlogo(true);
      setTimeout(() => {
        setShowlogo(false);
        setShow(true);
      }, 2500); 
    }, []);
    

    return(
      <>
      {/* <div className='container1' style={{overflow:'hidden',position:'absolute',left:'750px',width:'500px',overflowX:'hidden',overflowY:'hidden'}}>

      <div id="carouselExampleInterval" class="carousel slide" data-mdb-ride="carousel" data-mdb-interval="false">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" class="d-block w-100" alt="Wild Landscape" />
        </div>
        <div class="carousel-item" data-mdb-interval="2000">
            <img src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp" class="d-block w-100" alt="Camera" />
        </div>
        <div class="carousel-item">
            <img src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" class="d-block w-100" alt="Exotic Fruits" />
        </div>
    </div>
    <button class="carousel-control-prev" data-mdb-target="#carouselExampleInterval" type="button" data-mdb-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" data-mdb-target="#carouselExampleInterval" type="button" data-mdb-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
      </div> */}

     {/* <div className='image_slideshow' style={{position:'absolute',right:'0px',filter: 'saturate(200%)',top:'0px', width:'600px'}}>
  
     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel"   data-bs-interval="2500"
>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={img2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={img3} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div> */}

{showlogo  &&<div className='front_page'>
<div className='rotate_logo1'>
  <img src={logo} alt='image_logo1'/>
</div>
<div>
    <div className="logo-wrap1">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 -60 1000 450"
      style={{ enableBackground: 'new 0 0 855 150' }}
      xmlSpace="preserve"
    >
      <style type="text/css">
        
      </style>
      <text transform="matrix(1 0 0 1 0 125.5508)" className="st10 st11 st12">
        NEWSILE
      </text>
    </svg>
  </div>
  </div>

</div>
}


{/* <div className='rotate_logo'>
  <img src={logo} alt='image_logo'/>
</div>
<div>
    <div className='logo_box'>
    <div className="logo-wrap">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 -60 1000 450"
      style={{ enableBackground: 'new 0 0 855 150' }}
      xmlSpace="preserve"
    >
      <style type="text/css">
        
      </style>
      <text transform="matrix(1 0 0 1 0 125.5508)" className="st0 st1 st2">
        NEWSILE
      </text>
    </svg>
  </div>
  </div>
    </div> */}
<div className={`login_page`}>

<Components.Container className={`${show ? 'final show':'final'}`}>
          
          <ToastContainer />
          <Components.SignUpContainer signinIn={signIn}>
          <Components.Form action='POST'>
    {step === 1 && (
      <div>
        <Components.Title>Create Account</Components.Title>
        <Components.Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

              
        <Components.Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Components.Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
                <Components.Button onClick={() => setStep(2)}>Next</Components.Button>
      </div>
    )}
    {step === 2 && (
      <div>
        <Components.Input
          type="text"
          placeholder="Mobile Number"
          onChange={handleMobileChange}
        />
        <Components.Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <Components.Option value="">Select Gender</Components.Option>
          <Components.Option value="Male">Male</Components.Option>
          <Components.Option value="Female">Female</Components.Option>
          <Components.Option value="Other">Other</Components.Option>
        </Components.Select>


       

        <Components.Input type="number" placeholder='Age' onChange={(e)=>{
          setAge(e.target.value)
        }}/>



        
        <Components.Button onClick={()=>{
          setStep(3)
        }} >next</Components.Button>
        <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton aria-label="delete" size="large">
        <ArrowBackIcon onClick={()=>
          setStep(1)
        }/>
      </IconButton>
    </Stack>
      </div>
    )}



{step === 3 && (

      <div>
        <h4>Pick your favourite</h4>
        <div style={containerStyles}>
      {brands.map((brand, index) => (
        <div key={index}>{renderBrands(brand)}</div>
      ))}
    </div>
    <br></br>
    <br></br>

        <Components.Button onClick={submit} value="Submit" >Sign Up</Components.Button>
        <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton aria-label="delete" size="large">
        <ArrowBackIcon onClick={()=>
          setStep(2)
        }/>
      </IconButton>
    </Stack>
      </div>
    )}
  </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
               <Components.Form>
                   <Components.Title>Sign in</Components.Title>
                   <Components.Input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                  <Components.Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />

                   <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                   <Components.Button onClick={submit1}>Sign In</Components.Button>
               </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
              <Components.Overlay signinIn={signIn}>

              <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.Title>Welcome!</Components.Title>
                  <Components.Paragraph>
                      To keep connected with us please login with your personal info
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(true)} >
                      Sign In
                  </Components.GhostButton>
                  </Components.LeftOverlayPanel>

                  <Components.RightOverlayPanel signinIn={signIn}>
                    <Components.Title>Hello, Friend!</Components.Title>
                    <Components.Paragraph>
                        Enter Your personal details and start journey with us
                    </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton> 
                  </Components.RightOverlayPanel>

              </Components.Overlay>
          </Components.OverlayContainer>

      </Components.Container>
     
      {showSpinner && (
  <div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(3,3,44)",
    display: "flex",
    zIndex: 9999,
    transform: "translate(-50%, -50%)"
  }}
  >
    <div>
      <div className="spinner-border" role="status"></div>
      <div id="loading">Loading...</div>
    </div>
  </div>
)}
        </div>
    </>
        
        // <form action='POST'>
        //     <textarea name="text" onChange={(e)=>{setName(e.target.value)}}></textarea>
        //     <input type='submit' onClick={submit} value="Submit"/>
        // </form>
    )
}
