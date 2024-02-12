import './App.css';
import NewsList from './Components/NewsList';
import { browserHistory, Router, Route,Routes} 
from 'react-router';
import  { useEffect, useState } from 'react'
import Home from './Components/Home';
import About from './Components/About';
import "bootstrap/dist/css/bootstrap.min.css";
import Business from './Components/Business';
import Sports from './Components/Sports';
import Tech from './Components/Tech';
import Health from './Components/Health';
import Science from './Components/Science';
import NewsList1 from './Newspaper/NewsList';
import NewsList2 from './Newspaper1/NewsList';
import Articles from './Components/Articles';
import Tesla from './Components/Tesla';
import Apple from './Components/Apple';
import US from './Components/US';
import Login from './Components/Login';
import Logout from './Components/Logout';
import UserDropdown from './Components/UserDropdown';
import App1 from './src1/index'
import Riddle from './Components/Riddle'
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
import Chatbot from './Components/Chatbot';
import Bookmark from './Components/Bookmark';
import Bookmark1 from './Components/Bookmark';
import {useLocation, useNavigate} from 'react-router-dom'; 
import AdminPage from  './Admin';
import Manycounty from './Components/Many_county';
function App() {
  const [input,setInput] = useState("")
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
  const location=useLocation()

  
  return (
    <div className="App">




    
    <Routes>
        <Route path="/" element={<Login setData={setData}/>} />
        <Route path="/many" element={<Manycounty />} />
      
        <Route path="/home" element={<NewsList data={data} />} />
        <Route path="/business" element={<Business data={data} />} />
        <Route path="/sports" element={<Sports data={data} />} />
        <Route path="/technology" element={<Tech data={data} />} />
        <Route path="/health" element={<Health data={data} />} />
        <Route path="/science" element={<Science data={data} />} />
        <Route path="/tesla" element={<Tesla data={data} />} />
        <Route path="/apple" element={<Apple data={data} />} />
        <Route path="/home/newspaper" element={<NewsList1 data={data} />} />
        <Route path="/articles" element={<Articles data={data} />} />

        <Route path="/usBusiness" element={<US />} />
        <Route path="/business/newspaper1" element={<NewsList2 />} />
        <Route path="/board" element={<App1 />}>
        </Route>

        <Route path="/riddle" element={<Riddle />}>
        </Route>
        <Route path="/admin" element={<AdminPage />}>
        </Route>

     

        
        
        
        
      </Routes>

      
    <Chatbot />
     
    </div>
  );
}

export default App;




