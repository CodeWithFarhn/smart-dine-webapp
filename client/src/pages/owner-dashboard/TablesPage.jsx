import { useState } from 'react';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import TableManagement from '../../components/owner-dashboard/TableManagement';

const TablesPage = () => {
    const [tables, setTables] = useState([
        { id: "1", number: 1, capacity: 4 },
        { id: "2", number: 2, capacity: 2 },
        { id: "3", number: 3, capacity: 6 },
        { id: "4", number: 4, capacity: 4 },
    ]);

    const handleAddTable = (table) => {
        setTables([...tables, { ...table, id: String(tables.length + 1) }]);
    };

    const handleUpdateTable = (id, updates) => {
        setTables(tables.map(t => (t.id === id ? { ...t, ...updates } : t)));
    };

    const handleDeleteTable = (id) => {
        setTables(tables.filter(t => t.id !== id));
    };

    return (
        <DashboardLayout title="Tables">
            <TableManagement
                tables={tables}
                onAddTable={handleAddTable}
                onUpdateTable={handleUpdateTable}
                onDeleteTable={handleDeleteTable}
            />
        </DashboardLayout>
    );
};

export default TablesPage;
