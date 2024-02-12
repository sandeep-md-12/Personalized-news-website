import React, { useState } from 'react'
function Searchbar() {

    const [input,setInput] = useState("")
  return (
    <div>
      <input placeholder='typehere..' value={input} onChange={(e)=>setInput(e.target.value)}/>
    </div>
  )
}


export default  Searchbar