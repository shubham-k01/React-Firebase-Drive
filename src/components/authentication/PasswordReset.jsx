import React ,{useRef,useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import ContainerComp from '../ContainerComp';

const PasswordReset = () => {
    const emailRef = useRef(null);
    const {user,passwordReset} = useAuth();
    const [error, setError] = useState('')
    const [msg, setMsg] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            setLoading(true)
            setError('')
            await passwordReset(emailRef.current.value)
            setMsg('Check your email for further instructions')
        } catch (error) {
            console.log(error);
            setError('Failed to reset password')
        }
        setLoading(false)
    }
  return (
    <ContainerComp>
    <Card className='w-100'>
        {error && <Alert variant='danger'>{error}</Alert>}
        {msg && <Alert variant='success'>{msg}</Alert>}
        {/* {user && user.email} */}
        {/* when we set loading state in the auth context we can remove the check for user because there will be a user otherwise the children won't be rendered */}
        {/* { user.email} */}
        <Card.Body>
            <h2 className='text-center mt-10 mb-4'>
                Password Reset
            </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Submit</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='text-center mt-2'><Link to='/login'>Log In</Link></div>
    
    </ContainerComp>
  )
}

export default PasswordReset