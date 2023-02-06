import React from 'react'
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function FolderBreadcrumbs({currentFolder}) {
    // if current folder is root then add nothing else add root
    let path = currentFolder===ROOT_FOLDER ? []:[ROOT_FOLDER]
    // add the current folder's path
    if(currentFolder){
        path=[...path,...currentFolder.path]
    }
    console.log('Path:',path);
  return (
    <Breadcrumb className='flex-grow-1' listProps={{className:' pl-1 m-0'}}>
    {path.map((folder,index)=>{
      return (<BreadcrumbItem 
      key={folder.id}
      linkAs={Link}
      linkProps=
      {{
        to:folder.id?`/folder/${folder.id}`:'/',
        // setting path  so that it matches the path of the folder that we are redirecting to
        state:{...folder,path:path.slice(1,index)}
      }}
      className='text-truncate d-inline-block'
      style={{maxWidth:'150px'}}>
        {folder.name}
      </BreadcrumbItem>)
    })}
    {currentFolder && 
    <BreadcrumbItem
    className='text-truncate d-inline-block'
    style={{maxWidth:'150px'}}
    active>
        {currentFolder.name}
    </BreadcrumbItem>}
    </Breadcrumb>
  )
}
