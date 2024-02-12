
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import './Navbar.css'
import './NewsList.css'
import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './UserDropdown.css'
import { UserCard } from 'react-ui-cards';
import { FaEdit } from 'react-icons/fa';
import { FaInfoCircle,FaSignOutAlt } from 'react-icons/fa';
import { FaCheck,FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useClickAway } from "@uidotdev/usehooks";


export default function Navbar1({ username, name, mobile, gender,age,title,showBlogDropdown, showrecommand,showContactDropdown, onSetShowOptions,selectedBrands}) {

  const [showOptions, setShowOptions] = useState(false);
  
  
  const [showPopup, setShowPopup] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [mobileInput, setMobileInput] = useState(mobile);
  const [genderInput, setGenderInput] = useState(gender);
  const[ageInput,setAgeInput] = useState(age);
  const [showSpinner, setShowSpinner] = useState(false);

  const ref = useClickAway(() => {
    setShowOptions(false);
  });

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput,
        email: username,
        mobile: mobileInput,
        gender: genderInput,
        age: ageInput
      })
    });
    const data = await response.json();
    if (data.success) {
      // Update the user information in the component state
      setNameInput(data.user.name);
      setMobileInput(data.user.mobile);
      setGenderInput(data.user.gender);
      setAgeInput(data.user.age);
      setIsEditing(false);
    } else {
      // Handle error
    }
  };

  const history = useNavigate();
  const handlelogout =()=>{

    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      history('/')

    }, 1000);
  }
  
    useEffect(() => {
        if (showOptions) {
          document.body.classList.add('popup_active');
        } else {
          document.body.classList.remove('popup_active');
        }
      }, [showOptions]);
    
      const handleMenuClick = () => {
        setShowOptions(!showOptions);
        onSetShowOptions(true);
        showBlogDropdown(false);
        showContactDropdown(false);
        showrecommand(false);
      };
      
    
      const handleProfileClick = () => {
        setShowPopup(true);
      };
    
      const handlePopupClose = () => {
        setShowOptions(false);
      };
    const [expanded, setExpanded] = useState(false);


  return (

    <div className="full_container">
    <div>
    
    </div>
    <div>
        
    <>
    
      <div className='icon_container'>
        <button onClick={handleMenuClick}>
          <FaUser id="UserIcon" style={{ position: 'relative', padding: '10px', fontSize: '50px', borderRadius: '50px' ,top:'15px',backgroundColor:'#5de1aa'}} />
        </button>
      </div>
      {showOptions && (
          <div className='popup' ref={ref}>
        
        <MDBContainer className="py-5 h-100 w-100 profile1" >
        <MDBRow className="justify-content-center align-items-center h-100 pro">
          <MDBCol lg="6" className="mb-5 mb-lg-0 colpro">
            <MDBCard className="mb-3 profile_card" style={{ borderRadius: '.5rem',border: 'none'  }} >
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white profile"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://cdn-icons-png.flaticon.com/128/4140/4140061.png"
                    alt="Avatar" className="my-5 image_avatar" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">
                    
                  {isEditing ? (
                <input type="text"  className="update_input" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
              ) : (
                <span className="backend_data" style={{ flex: 1,color:'rgb(3,3,44'}} id="txt">Hey! {nameInput}</span>)}
                  </MDBTypography>


                  <MDBCardText></MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                 
                </MDBCol>
                <MDBCol md="8">
                  <div className="vr"></div>
                  <MDBCardBody className="p-4">

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">

                        {isEditing ? (
            <>
              <span className="backend_data">{username}</span>
              <span style={{ color: 'red', fontSize: '12px',
              position:'absolute',top:'50px',left:'10px'}} >Cannot change email</span>
            </>
          ) : (
            <span className="backend_data person_info" style={{fontWeight:'100',fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:'14px'}}>{username}</span>
          )}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                        {isEditing ? (
                <input type="text" className="update_input" value={mobileInput} onChange={(e) => setMobileInput(e.target.value)} />
              ) : (
                <span className="backend_data person_info"style={{fontWeight:'100',fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:'14px'}}>{mobileInput}</span>
              )}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">
                        {isEditing ? (
                <input type="text" className="update_input" value={genderInput} onChange={(e) => setGenderInput(e.target.value)} />
              ) : (
                <span  id="gender"className="backend_data person_info" style={{flex:1,fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontWeight:'50px !important',fontSize:'14px'}}>{genderInput}</span>
              )}
                        </MDBCardText>
                          </MDBCol>
                          

                          <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">
                        {isEditing ? (
                <input type="number"  className="update_input" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} />
              ) : (
                <span id="gender"className="backend_data person_info" style={{flex:1,fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontWeight:'100px',fontSize:'14px'}}>{ageInput}</span>
                
              )}
                        </MDBCardText>
                          </MDBCol>
                          </MDBRow>
                    <MDBTypography tag="h6"></MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">
                        Favourites 


                        </MDBTypography>
                        <MDBCardText className="text-muted">
                        {selectedBrands.reduce((rows, brand, index) => {
  if (index % 3 === 0) rows.push([]);
  rows[rows.length - 1].push(brand);
  return rows;
}, []).map((row) => (
  <div key={row.join()} style={{ display: 'flex' }} className="fav">
    {row.map((brand) => (
      <span
        key={brand}
        className="inline-block bg rounded-full px-3 py-1 text-sm font-semibold text-700 mr-2 mb-2" id="external_text"
      >
        {brand}
      </span>
    ))}
  </div>
))}

                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                       
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                    
                    </div>
                    <div className='close-button' onClick={handlePopupClose}>X</div>
                    {!isEditing && (
                      <>
              <button onClick={() => setIsEditing(true)} id="Edit_button" title="edit">
               <FaEdit/>  
              </button>
              <button onClick={handlelogout}   id='Logout' title="Logout"><FaSignOutAlt /></button>

              </>
              
            )}
            
              {isEditing && (
              <>
                <button onClick={() => setIsEditing(false)} id="cancel_update">
                cancel
                </button>{" "}
                <button onClick={handleSubmit} id="Success_update" >
              Update
            </button>
              </>
            )}

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
       

      </MDBContainer>
      </div>
      )}
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
    </>
    
</div>
</div>
  )
}
