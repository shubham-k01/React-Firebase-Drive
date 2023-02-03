import React from 'react'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderBlank} from '@fortawesome/free-regular-svg-icons'
import {Link} from 'react-router-dom'

export default function Folder({folder}) {
  return (
    <Button variant='outline-dark' className='text-truncate w-100' as={Link} to={`/folder/${folder.id}`}>
      <FontAwesomeIcon icon={faFolderBlank} style={{marginRight:'5px'}}/>
      {folder.name}
    </Button>
  )
}
