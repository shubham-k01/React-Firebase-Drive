import React ,{useRef,useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import ContainerComp from '../ContainerComp';

const UpdateProfile = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const passConfRef = useRef(null);
    const {user,update_Email,update_Pass} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(passRef.current.value!==passConfRef.current.value){
            return setError('Passwords do not match')
        }

        const pr =[]
        if(emailRef.current.value!==user.email){
            pr.push(update_Email(emailRef.current.value))
        }
        if(passRef.current.value){
            pr.push(update_Pass(passRef.current.value))
        }
        setError('')
        setLoading(true)
        Promise.all(pr).then(()=>{
            navigate('/user')
        })
        .catch((error)=>{
            console.log(error);
            setError('Failed to update profile')
        })
        .finally(()=>{setLoading(false)})
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
               Update Profile
            </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required defaultValue={user.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passRef}  placeholder='Leave empty to keep it same'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passConfRef}  placeholder='Leave empty to keep it same'/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Update</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='text-center mt-2'><Link to='/user'>Cancel</Link></div>
    
    </ContainerComp>
  )
}

export default UpdateProfile