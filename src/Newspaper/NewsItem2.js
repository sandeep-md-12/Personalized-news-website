import React from 'react'

const NewsItem2 = ({ title, description, url, urlToImage,author }) => {
    return (  
        author ? (
        <div className="collumn">
            <div className="head">
                <span className="headline hl3">{title}</span>
                <p><span className="headline hl4">by {author}</span></p>
            </div>
                <figure className="figure">
                    <img className="media" src={urlToImage} alt={urlToImage} />
                </figure>
            <p>{description}</p>
        </div>):""
    )
}

export default NewsItem2;