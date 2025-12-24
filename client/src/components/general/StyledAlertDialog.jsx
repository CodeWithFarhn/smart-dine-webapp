import { Modal, Button } from 'react-bootstrap';

const StyledAlertDialog = ({
    show,
    onHide,
    title,
    description,
    cancelText = "Cancel",
    confirmText = "Continue",
    onConfirm,
    variant = "primary" // 'primary' or 'danger'
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdropClassName="bg-dark bg-opacity-75" // Darker overlay
            contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
            animation={true}
        >
            <Modal.Body className="p-4 pt-5">
                <div className="d-flex flex-column gap-2 mb-4">
                    <h5 className="fw-bold mb-1 font-serif text-dark">{title}</h5>
                    <p className="text-secondary small mb-0">{description}</p>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={onHide}
                        className="fw-medium px-4 border-secondary-subtle"
                        style={{ minWidth: '80px' }}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'dark'}
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onHide();
                        }}
                        className="fw-medium px-4"
                        style={{
                            backgroundColor: variant === 'danger' ? '#dc3545' : '#0f172a',
                            borderColor: variant === 'danger' ? '#dc3545' : '#0f172a',
                            minWidth: '80px'
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default StyledAlertDialog;
