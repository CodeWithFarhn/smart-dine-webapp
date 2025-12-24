import { Row, Col, Card, Table, Button, Dropdown } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import StatCard from '../../components/owner-dashboard/StatCard';
import ReservationTable from '../../components/owner-dashboard/ReservationTable';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/general/StyledChart';




const DashboardHome = () => {
    // Mock Data
    const stats = [
        { label: "Today's Reservations", value: "28", change: "+12% from yesterday", icon: "bi-calendar-event", bg: "bg-white", text: "text-dark" },
        { label: "Upcoming", value: "145", change: "Next 7 days", icon: "bi-people", bg: "bg-white", text: "text-dark" },
        { label: "Capacity", value: "72%", change: "For this week", icon: "bi-graph-up-arrow", bg: "bg-white", text: "text-dark" },
        { label: "Revenue", value: "$4,250", change: "+8% from last month", icon: "bi-currency-dollar", bg: "bg-white", text: "text-dark" }
    ];

    const reservations = [
        { id: 1, customer: "John Smith", date: "Nov 15, 2025", time: "7:00 PM", party: 4, status: "Confirmed" },
        { id: 2, customer: "Sarah Johnson", date: "Nov 15, 2025", time: "7:30 PM", party: 2, status: "Pending" },
        { id: 3, customer: "Mike Davis", date: "Nov 16, 2025", time: "8:00 PM", party: 6, status: "Confirmed" },
        { id: 4, customer: "Emily Wilson", date: "Nov 16, 2025", time: "6:30 PM", party: 3, status: "Confirmed" },
        { id: 5, customer: "David Brown", date: "Nov 17, 2025", time: "7:00 PM", party: 2, status: "Cancelled" },
    ];



    return (
        <DashboardLayout title="Dashboard">
            {/* Stats Grid */}
            <Row className="g-4 mb-5">
                {stats.map((stat, idx) => (
                    <Col md={3} sm={6} key={idx}>
                        <StatCard
                            label={stat.label}
                            value={stat.value}
                            change={stat.change}
                            icon={stat.icon}
                        />
                    </Col>
                ))}
            </Row>


            {/* Revenue Chart */}
            <h5 className="font-serif fw-bold mb-3 ms-1 text-dark">Revenue Overview</h5>
            <div className="bg-white p-4 rounded-4 shadow-sm mb-5 border overflow-hidden">
                <div style={{ height: '300px', overflowX: 'auto', overflowY: 'hidden' }}>
                    <div style={{ minWidth: '600px', height: '100%' }}>
                        <ChartContainer config={{
                            revenue: {
                                label: "Revenue",
                                color: "#0f172a", // Dark blue/black
                            },
                            bookings: {
                                label: "Bookings",
                                color: "#d94e1e", // Brand Orange
                            },
                        }}>
                            <AreaChart
                                data={[
                                    { month: "Jan", revenue: 1500, bookings: 120 },
                                    { month: "Feb", revenue: 2300, bookings: 180 },
                                    { month: "Mar", revenue: 3200, bookings: 240 },
                                    { month: "Apr", revenue: 2900, bookings: 210 },
                                    { month: "May", revenue: 4500, bookings: 320 },
                                    { month: "Jun", revenue: 5100, bookings: 380 },
                                ]}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tick={{ fill: '#6c757d', fontSize: 12 }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tick={{ fill: '#6c757d', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area
                                    dataKey="revenue"
                                    type="natural"
                                    fill="var(--color-revenue)"
                                    fillOpacity={0.1}
                                    stroke="var(--color-revenue)"
                                    strokeWidth={2}
                                />
                                <Area
                                    dataKey="bookings"
                                    type="natural"
                                    fill="var(--color-bookings)"
                                    fillOpacity={0.1}
                                    stroke="var(--color-bookings)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </div>
            </div>


            {/* Recent Reservations */}
            <h5 className="font-serif fw-bold mb-3 ms-1 text-dark">Today's Reservations</h5>

            <ReservationTable reservations={reservations} />

        </DashboardLayout>
    );
};
import React from 'react'; // Added import for CustomToggle
export default DashboardHome;
