import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthLayout from '../components/auth/AuthLayout';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            // Check if response has content before parsing JSON
            const text = await res.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                data = { message: 'Server error occurred' };
            }

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError('Network error. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join us to discover and book the best tables"
            imageSrc="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
        >
            {error && <Alert variant='danger' className="mb-4">{error}</Alert>}

            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Full Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 bg-light border-0"
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='name@example.com'
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

                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Create a password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-light border-0"
                    />
                </Form.Group>

                <Form.Group className='mb-4' controlId='confirmPassword'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Repeat password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 bg-light border-0"
                    />
                </Form.Group>

                <Button
                    disabled={loading}
                    type='submit'
                    variant='dark'
                    className='w-100 py-3 fw-bold mt-2'
                    style={{ backgroundColor: '#2c3e50' }}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Form>

            <div className='py-4 text-center'>
                <span className="text-secondary">Already have an account? </span>
                <Link to='/login' className="fw-bold text-decoration-none text-dark">
                    Log in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default RegisterScreen;
