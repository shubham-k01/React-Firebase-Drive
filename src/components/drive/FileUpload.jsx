import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

export default function FileUpload({currentFolder}) {
    function handleChange(e){
        const file = e.target.files[0];

        if(currentFolder == null || file == null) return
    }
  return (
    <label className='btn btn-outline-success m-0 mr-2'>
        <FontAwesomeIcon icon={faFileUpload}/>
        <input type="file" style={{opacity:0,position:'absolute'}} onChange={handleChange} />
    </label>
  )
}
