import React from 'react'
import { useEffect,useState } from 'react';
import "react-datepicker/dist/react-datepicker.css"
export default function Bookmark({title}) {


  return(
    
<div style={{ display: 'flex', flexWrap: 'wrap'}}>
  {title.map((title, index) => (
    <div key={index} style={{ width: '25%', padding: '10px' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px',boxShadow:'2px 2px 9px grey'}}>
        {title}
      </div>
    </div>
  ))}
</div>
  )
}
