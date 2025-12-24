import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar';


// Mocking ThemeToggle if it doesn't exist yet to prevent crashes based on the user request.
// However, the user request showed importing ThemeToggle from "@/components/ThemeToggle". 
// Since I don't see that component in the file list, I'll omit it for now or check if it exists.
// Actually, I'll verify if ThemeToggle exists. If not, I'll just skip it for now.

const DashboardLayout = ({ children, title }) => {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="d-flex bg-light min-vh-100 overflow-hidden w-100">
            {/* Sidebar Container */}
            <aside
                className="bg-white border-end position-fixed top-0 start-0 h-100 transition-all shadow-sm"
                style={{
                    width: '260px', // Standard Sidebar width
                    zIndex: 1040,
                    transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                <Sidebar />
            </aside>

            {/* Main Content Wrapper */}
            <div
                className="flex-grow-1 d-flex flex-column min-vh-100 transition-all"
                style={{
                    marginLeft: showSidebar ? '260px' : '0',
                    width: '100%',
                    transition: 'margin-left 0.3s ease-in-out'
                }}
            >
                {/* Header */}
                <header className="bg-white border-bottom sticky-top px-4 py-3 d-flex justify-content-between align-items-center" style={{ height: '70px' }}>
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="link"
                            className="p-1 text-dark border-0 d-flex align-items-center justify-content-center rounded-circle hover-bg-light"
                            onClick={() => setShowSidebar(!showSidebar)}
                            style={{ width: '38px', height: '38px' }}
                        >
                            <i className="bi bi-list fs-4"></i>
                        </Button>
                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="font-serif fw-bold mb-0 text-dark fs-4" style={{ lineHeight: '1' }}>{title}</h1>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {/* Theme Toggle Placeholder if needed */}
                        {/* <ThemeToggle /> */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 overflow-auto flex-grow-1">
                    <div className="container-fluid p-0">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {showSidebar && (
                <div
                    className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1035 }}
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
