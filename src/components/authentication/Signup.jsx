import React ,{useRef,useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import ContainerComp from '../ContainerComp';

const Signup = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const passConfRef = useRef(null);
    const {signup,user} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(passRef.current.value!==passConfRef.current.value){
            return setError('Passwords do not match')
        }
        try {
            setLoading(true)
            setError('')
            await signup(emailRef.current.value,passRef.current.value);
            navigate('/')
        } catch (error) {
            console.log(error);
            setError('Failed to create an account')
        }
        setLoading(false)
    }
  return (
    <ContainerComp>
    <Card className='w-100'>
        {error && <Alert variant='danger'>{error}</Alert>}
        {/* {user && user.email} */}
        {/* when we set loading state in the auth context we can remove the check for user because there will be a user otherwise the children won't be rendered */}
        {/* { user.email} */}
        <Card.Body>
            <h2 className='text-center mt-10 mb-4'>
                SignUp
            </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passConfRef} required/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Sign Up</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='text-center mt-2'>Already have an account <Link to='/login'>Log In</Link></div>
    
    </ContainerComp>
  )
}

export default Signup