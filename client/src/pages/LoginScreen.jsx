import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthLayout from '../components/auth/AuthLayout';

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            // Allow mock login if backend not ready or for demo
            if (res.ok || (email === 'demo@user.com')) {
                const userInfo = res.ok ? data : { name: 'Demo User', email: 'demo@user.com' };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                navigate('/');
                window.location.reload();
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch {
            // Fallback for demo if API fails
            if (email === 'demo@user.com') {
                localStorage.setItem('userInfo', JSON.stringify({ name: 'Demo User', email: 'demo@user.com' }));
                navigate('/');
                window.location.reload();
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue to your account"
            imageSrc="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
        >
            {error && <Alert variant='danger' className="mb-4">{error}</Alert>}

            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-4' controlId='email'>
                    <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-light border-0"
                    />
                </Form.Group>

                <Form.Group className='mb-4' controlId='password'>
                    <div className="d-flex justify-content-between">
                        <Form.Label className="small fw-bold text-uppercase text-secondary">Password</Form.Label>
                        <Link to="#" className="small text-decoration-none text-muted">Forgot?</Link>
                    </div>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
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
                    style={{ backgroundColor: '#2c3e50' }}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </Form>

            <div className='py-4 text-center'>
                <span className="text-secondary">New to ReserveTable? </span>
                <Link to='/register' className="fw-bold text-decoration-none text-dark">
                    Create an account
                </Link>
            </div>

            <div className='text-center border-top pt-4'>
                <span className="text-secondary small d-block mb-2">Are you a restaurant owner?</span>
                <Link to='/owner/login' className="fw-bold text-decoration-none text-primary">
                    Login to Dashboard
                </Link>
            </div>
        </AuthLayout>
    );
};

export default LoginScreen;
