import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import NewsItem2 from './NewsItem2';
import './NewsList.css';
import DownloadPage from './Downloadpage';
const NewsList = () => {
    const [articles, setArticles] = useState([]);
    const [articles2, setArticles2] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=32c33fd4552f42f4ba91b6f2af82185c`)
            setArticles(response.data.articles)
            console.log(response)
            const response2 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=401d5f2b3147428098515e9781afb3cb`)
            setArticles2(response2.data.articles)
        }

        getArticles()
    }, [])
    return (

        <div id='pagetodownload'>

            <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
            <link rel="stylesheet" href="styles/newspaper.css" />
            <title>Newspaper Style Design Experiment</title>
            <meta name="viewport" content="width=device-width" />
            <div className="head">
                <div className="headerobjectswrapper">
                    <header>Newsh</header>
                </div>
                <div className="subhead">
                <DownloadPage 
                    rootElementId="pagetodownload"
                    downloadFileName="testpage"/>
                </div>
            </div>
            <div className="content">
                <div className="col1 collumns">
                    <div>
                        {articles.slice(0, 10).map(article => {
                            return(
                                <NewsItem 
                                    title={article.title}
                                    description={article.description}
                                    url={article.url}
                                    urlToImage={article.urlToImage} 
                                    author = {article.author}
                                />


                                )
                            })}
                    </div>
                </div>
                <div className='gaps'></div>
                <div className="col2 collumns">
                    <div>
                        {articles2.slice(0, 10).map(article => {
                            return(
                                <NewsItem2 
                                    title={article.title}
                                    description={article.description}
                                    url={article.url}
                                    urlToImage={article.urlToImage} 
                                    author = {article.author}
                                />


                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
  
        
    )
}

export default NewsList;

