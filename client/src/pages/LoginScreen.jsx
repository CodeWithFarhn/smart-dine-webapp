import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormContainer from '../components/general/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
                // Refresh to update header state usually, but valid for now
                window.location.reload();
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h1 className="font-serif">Sign In</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={loading} type='submit' variant='primary' className='mt-3'>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
