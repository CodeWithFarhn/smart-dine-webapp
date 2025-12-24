import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthLayout from '../components/auth/AuthLayout';

const OwnerLogin = () => {
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
            // Mock Login for Owners
            // In a real app, this would hit a separate endpoint or send a role flag
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            // Allow mock login for demo purposes
            if (res.ok || (email === 'owner@restaurant.com')) {
                const userInfo = res.ok ? data : { name: 'Restaurant Owner', email: 'owner@restaurant.com', role: 'owner' };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                navigate('/manage/dashboard');
                window.location.reload();
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            // Fallback for demo
            if (email === 'owner@restaurant.com') {
                localStorage.setItem('userInfo', JSON.stringify({ name: 'Restaurant Owner', email: 'owner@restaurant.com', role: 'owner' }));
                navigate('/manage/dashboard');
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
