import { useState } from 'react'

import './Form.css'

const Form = ({ handleClick }) => {
  const[text, setText] = useState('')

  return (
    <div className='form-container'>
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={() => handleClick(text)}>Search</button>
    </div>
  )
}

export default Form
