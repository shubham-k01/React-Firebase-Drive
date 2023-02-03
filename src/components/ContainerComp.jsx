import React from 'react'
import { Container } from 'react-bootstrap'

export default function ContainerComp({children}) {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight:'100vh',width:'500px'}}>
        <div>
        {children}
        </div>
    </Container>
  )
}
