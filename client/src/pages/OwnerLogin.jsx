import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthLayout from '../components/auth/AuthLayout';

const OwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    // Email validation regex
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate email format
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.role === 'owner' || data.role === 'admin') {
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    navigate('/manage/dashboard');
                    window.location.reload();
                } else {
                    setError('Access denied. This portal is for restaurant owners only.');
                }
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
        <AuthLayout
            title="Partner Login"
            subtitle="Manage your restaurant, reservations, and more"
            imageSrc="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
        >
            {error && <Alert variant='danger' className="mb-4">{error}</Alert>}

            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-4' controlId='email'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='owner@restaurant.com'
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`p-3 bg-light border-0 ${emailError ? 'is-invalid' : ''}`}
                    />
                    {emailError && (
                        <Form.Text className="text-danger small d-block mt-1">
                            {emailError}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className='mb-4' controlId='password'>
                    <div className="d-flex justify-content-between">
                        <Form.Label className="small fw-bold text-uppercase text-secondary">Password</Form.Label>
                        <Link to="#" className="small text-decoration-none text-muted">Forgot?</Link>
                    </div>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-light border-0"
                    />
                </Form.Group>

                <Button
                    disabled={loading}
                    type='submit'
                    variant='dark'
                    className='w-100 py-3 fw-bold mt-2'
                    style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                >
                    {loading ? 'Access Dashboard' : 'Login to Dashboard'}
                </Button>
            </Form>

            <div className='py-4 text-center'>
                <span className="text-secondary">Not a partner yet? </span>
                <Link to='/restaurant/register' className="fw-bold text-decoration-none text-dark">
                    Register your restaurant
                </Link>
            </div>

            <div className='text-center border-top pt-4'>
                <span className="text-secondary small d-block mb-2">Looking for a table?</span>
                <Link to='/login' className="fw-bold text-decoration-none text-primary">
                    Customer Login
                </Link>
            </div>
        </AuthLayout>
    );
};

export default OwnerLogin;
