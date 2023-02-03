import React from 'react'
import { Container } from 'react-bootstrap'
import NavbarComp from '../NavbarComp'
import FolderUpload from './FolderUpload'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder'
import { useParams,useLocation} from 'react-router-dom'
import FolderBreadcrumbs from './FolderBreadcrumbs'

export default function Dashboard() {
  const {folderId} = useParams()
  // getting the state from the breadcrumbs and setting it by default to empty object
  const location = useLocation()
  // here we pass folderId from the params so that we can render out the new folder that we have been redirected to
  // here we are also passing the state.folder becayuse we want the breadcrumbs to stay as they are and not load every time
  // bu this only applies when we are in a 
  console.log(location.state);
  const {folder,childFolders} = useFolder(folderId,location.state.folder)
  console.log(folder);
  console.log(childFolders);
  return (
    <>
        <NavbarComp/>
        <div className='d-flex align-items-center'>
          <FolderBreadcrumbs currentFolder={folder}/>
          <FolderUpload currentFolder={folder}/>
        </div>
        <Container fluid >
          {childFolders.length>0 && 
          <div className="d-flex flex-wrap mt-2">
            {childFolders.map((childFolder)=>{
             return (
             <div key={childFolder.id} className='p-2' style={{maxWidth:'270px'}}>
              <Folder folder={childFolder}/>
            </div>)
            })}
          </div>
          }
        </Container>
    </>
  )
}
