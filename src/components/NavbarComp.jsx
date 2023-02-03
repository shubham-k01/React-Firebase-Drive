import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComp() {
  return (
    <Navbar bg='light' expand='sm'>
        <Navbar.Brand as={Link} to='/'>
            Clouddy
        </Navbar.Brand>
        <Nav>
            <Nav.Link as={Link} to='/user'>
                Profile
            </Nav.Link>
        </Nav>
    </Navbar>
  )
}
