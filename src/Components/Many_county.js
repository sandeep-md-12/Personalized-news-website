import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Many_country.css'
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';


const countries = [
  { name: 'Argentina', code: 'ar' },
  { name: 'Australia', code: 'au' },
  { name: 'Austria', code: 'at' },
  { name: 'Belgium', code: 'be' },
  { name: 'Brazil', code: 'br' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Canada', code: 'ca' },
  { name: 'China', code: 'cn' },
  { name: 'Colombia', code: 'co' },
  { name: 'Cuba', code: 'cu' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Egypt', code: 'eg' },
  { name: 'France', code: 'fr' },
  { name: 'Germany', code: 'de' },
  { name: 'Greece', code: 'gr' },
  { name: 'Hong Kong', code: 'hk' },
  { name: 'Hungary', code: 'hu' },
  { name: 'India', code: 'in' },
];

export default function Many_county() {
  const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
    const [newsData, setNewsData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=32c33fd4552f42f4ba91b6f2af82185c`
        );
        setNewsData(result.data.articles);
      };
      fetchData();
    }, [selectedCountry]);
  
    const handleback = ()=>{
      navigate('/home')
    }
    return (
      <>
      {/* <button onClick={handleback}><FaAngleLeft id="back"/></button> */}
      <article id="country_title">Choose your Country</article>
      <div className='Drop_down_country'>
        <select
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 total">
        {newsData.map(article => (
          <div key={article.url} className="max-w-sm rounded overflow-hidden shadow-lg many_country_card">
          {article.urlToImage && <img className="w-full" src={article.urlToImage} alt="Image1" />}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{article.title}</div>
              <p className="text-gray-700 text-base">{article.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a href={article.url} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Read more</a>
            </div>
          </div>
        ))}
      </div>
      </>
    );
  }
  