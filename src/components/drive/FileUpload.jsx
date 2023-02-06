import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import {ref,uploadBytes} from 'firebase/storage'
import { storage } from '../../firebase';
import {useAuth} from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function FileUpload({currentFolder}) {
    const { user } = useAuth()
    function handleChange(e){
        const file = e.target.files[0];

        if(currentFolder == null || file == null) return

        const filePath = currentFolder == ROOT_FOLDER ?
            `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`
            :`${currentFolder.path.join('/')}/${file.name}`

        const storageRef = ref(storage,`/files/${user.uid}/${filePath}`)
        uploadBytes(ref,file).then(()=>{
            console.log('file uploaded');
        })
        .catch(err=>{
            console.log(err);
        })


    }
  return (
    <label className='btn btn-outline-success m-0 mr-2'>
        <FontAwesomeIcon icon={faFileUpload}/>
        <input type="file" style={{opacity:0,position:'absolute'}} onChange={handleChange} />
    </label>
  )
}
