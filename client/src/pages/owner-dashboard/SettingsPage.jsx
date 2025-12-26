import { useState } from 'react';
import { Card, Button, Form, Row, Col, Tab, Tabs, InputGroup } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    // Pakistani phone number regex: +92 followed by 10 digits
    const validatePakistaniPhone = (phone) => {
        const regex = /^\+92[0-9]{10}$/;
        return regex.test(phone);
    };

    // Email validation regex
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const [settings, setSettings] = useState({
        restaurantName: "La Bella Italia",
        email: "info@labellaitalia.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, Downtown",
        autoConfirm: true,
        emailNotifications: true,
        smsNotifications: false,
    });

    const bookingUrl = `https://reservetable.app/restaurant/${settings.restaurantName.toLowerCase().replace(/\s+/g, '-')}`;

    const handleSave = () => {
        console.log("Settings saved:", settings);
        alert("Settings saved successfully!");
    };

    const copyBookingUrl = () => {
        navigator.clipboard.writeText(bookingUrl);
        alert("Booking URL copied to clipboard.");
    };

    return (
        <DashboardLayout title="Settings">
            <div className="d-flex flex-column gap-4" style={{ maxWidth: '900px' }}>

                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3 border-bottom-0"
                    variant="pills"
                >
                    <Tab eventKey="profile" title="Profile">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-bottom py-3 px-4">
                                <h5 className="font-serif fw-bold mb-1">Restaurant Information</h5>
                                <p className="text-secondary small mb-0">Update your restaurant details</p>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Row className="g-4">
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold">Restaurant Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={settings.restaurantName}
                                                onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold">Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="restaurant@example.com"
                                                className={emailError ? 'is-invalid' : ''}
                                                value={settings.email}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSettings({ ...settings, email: value });
                                                    if (value && !validateEmail(value)) {
                                                        setEmailError('Please enter a valid email address');
                                                    } else {
                                                        setEmailError('');
                                                    }
                                                }}
                                            />
                                            {emailError && (
                                                <Form.Text className="text-danger small d-block mt-1">
                                                    {emailError}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold">Phone</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="+923XXXXXXXXX"
                                                className={phoneError ? 'is-invalid' : ''}
                                                value={settings.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSettings({ ...settings, phone: value });
                                                    if (value && !validatePakistaniPhone(value)) {
                                                        setPhoneError('Phone must be in format: +923XXXXXXXXX');
                                                    } else {
                                                        setPhoneError('');
                                                    }
                                                }}
                                            />
                                            {phoneError && (
                                                <Form.Text className="text-danger small d-block mt-1">
                                                    {phoneError}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold">Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={settings.address}
                                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Button
                                            variant="dark"
                                            style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                                            onClick={handleSave}
                                        >
                                            <i className="bi bi-save me-2"></i> Save Changes
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab eventKey="notifications" title="Notifications">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-bottom py-3 px-4">
                                <h5 className="font-serif fw-bold mb-1">Notification Preferences</h5>
                                <p className="text-secondary small mb-0">Manage how you receive reservation updates</p>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div className="d-flex flex-column gap-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-bold mb-0">Auto-confirm Reservations</h6>
                                            <small className="text-secondary">Automatically confirm new reservations without manual approval</small>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="auto-confirm"
                                            checked={settings.autoConfirm}
                                            onChange={(e) => setSettings({ ...settings, autoConfirm: e.target.checked })}
                                        />
                                    </div>
                                    <hr className="my-0 text-muted opacity-25" />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-bold mb-0">Email Notifications</h6>
                                            <small className="text-secondary">Receive email alerts for new reservations and cancellations</small>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="email-notifications"
                                            checked={settings.emailNotifications}
                                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                        />
                                    </div>
                                    <hr className="my-0 text-muted opacity-25" />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-bold mb-0">SMS Notifications</h6>
                                            <small className="text-secondary">Get text message alerts for urgent updates</small>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="sms-notifications"
                                            checked={settings.smsNotifications}
                                            onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <Button
                                            variant="dark"
                                            style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                                            onClick={handleSave}
                                        >
                                            <i className="bi bi-save me-2"></i> Save Preferences
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab eventKey="integration" title="Integration">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-bottom py-3 px-4">
                                <h5 className="font-serif fw-bold mb-1">Booking Integration</h5>
                                <p className="text-secondary small mb-0">Embed this booking link on your website</p>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold">Your Booking URL</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            readOnly
                                            value={bookingUrl}
                                        />
                                        <Button variant="outline-secondary" onClick={copyBookingUrl}>
                                            <i className="bi bi-clipboard"></i>
                                        </Button>
                                    </InputGroup>
                                    <Form.Text className="text-muted">
                                        Share this link with customers or add it to your website
                                    </Form.Text>
                                </Form.Group>

                                <div className="bg-light p-4 rounded-3">
                                    <h6 className="fw-bold mb-3"><i className="bi bi-link-45deg me-2"></i>Integration Options</h6>
                                    <ul className="text-secondary small mb-0 ps-3">
                                        <li className="mb-1">Add a "Book Now" button on your website</li>
                                        <li className="mb-1">Include the link in your email signature</li>
                                        <li className="mb-1">Share on social media profiles</li>
                                        <li>Embed as an iframe (contact support)</li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>

            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;
