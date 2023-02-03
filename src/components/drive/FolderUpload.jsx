import React,{useState} from 'react'
import { Button,Form,FormGroup,Modal } from 'react-bootstrap'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faL} from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { addDoc } from 'firebase/firestore'
import {useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function FolderUpload({currentFolder}) {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const {user} = useAuth();

    function openM(){
        setOpen(true)
    }

    function closeM(){
        setOpen(false)
    }

    function handleSubmit(e){
        e.preventDefault()

        // can't create a folder unless we are inside some folder
        if(currentFolder==null) return

        const path=[...currentFolder.path]
        
        // only for non-root folders because root folder is a made up thing and we do not want to save it to the database
        if(currentFolder!==ROOT_FOLDER){
            path.push({name:currentFolder.name,id:currentFolder.id})
        }

        addDoc(database.folders,{
            name:name,
            createdAt:database.getCurrentTimeStamp(),
            userId:user.uid,
            parent:currentFolder.id,
            path:path
        })
        setName('')
        closeM()

    }
  return (
    <>
    
    <Button variant='outline-success'  onClick={openM}>
        <FontAwesomeIcon icon={faFolderPlus}/>
    </Button>
    <Modal show={open} onHide={closeM}>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
            <FormGroup>
                <Form.Label>
                    Folder Name:
                </Form.Label>
                <Form.Control
                type='text'
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </FormGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={closeM}>Close</Button>
            <Button type='submit' variant='success'>Add Folder</Button>
        </Modal.Footer>


        </Form>
    </Modal>
    
    
    </>
  )
}
