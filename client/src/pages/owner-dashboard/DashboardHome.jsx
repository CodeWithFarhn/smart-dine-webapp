import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Dropdown } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import StatCard from '../../components/owner-dashboard/StatCard';
import ReservationTable from '../../components/owner-dashboard/ReservationTable';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/general/StyledChart';
import { API_ENDPOINTS } from '../../config/api';




const DashboardHome = () => {
    const [stats, setStats] = useState([
        { label: "Today's Reservations", value: "0", change: "+0% from yesterday", icon: "bi-calendar-event", bg: "bg-white", text: "text-dark" },
        { label: "Upcoming", value: "0", change: "Next 7 days", icon: "bi-people", bg: "bg-white", text: "text-dark" },
        { label: "Capacity", value: "0%", change: "For this week", icon: "bi-graph-up-arrow", bg: "bg-white", text: "text-dark" },
        { label: "Revenue", value: "$0", change: "+0% from last month", icon: "bi-currency-dollar", bg: "bg-white", text: "text-dark" }
    ]);

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) return;

                // 1. Get Restaurant ID
                const restRes = await fetch(API_ENDPOINTS.GET_RESTAURANTS, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                const restaurants = await restRes.json();
                const myRestaurant = restaurants.find(r => r.owner === userInfo._id) || restaurants[0];

                if (myRestaurant) {
                    // 2. Get Reservations
                    const res = await fetch(`/api/reservations/restaurant/${myRestaurant._id}`, {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    });
                    const data = await res.json();

                    // Map for Table
                    const mappedData = data.slice(0, 5).map(r => ({
                        id: r._id,
                        customer: r.customerName,
                        date: r.date,
                        time: r.time,
                        party: r.partySize,
                        status: r.status || 'Pending'
                    }));
                    setReservations(mappedData);

                    // Calculate Stats (Basic logic for MVP)
                    const todayStr = new Date().toISOString().split('T')[0];
                    const todayCount = data.filter(r => r.date === todayStr).length;
                    const upcomingCount = data.filter(r => r.date > todayStr).length;

                    setStats([
                        { label: "Today's Reservations", value: todayCount.toString(), change: "Today", icon: "bi-calendar-event", bg: "bg-white", text: "text-dark" },
                        { label: "Upcoming", value: upcomingCount.toString(), change: "Next 7 days", icon: "bi-people", bg: "bg-white", text: "text-dark" },
                        { label: "Capacity", value: "N/A", change: "For this week", icon: "bi-graph-up-arrow", bg: "bg-white", text: "text-dark" }, // Complex calc needed
                        { label: "Revenue", value: "N/A", change: "From bookings", icon: "bi-currency-dollar", bg: "bg-white", text: "text-dark" }
                    ]);
                }

            } catch (err) {
                console.error("Dashboard fetch error", err);
            }
        };

        fetchData();
    }, []);

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
                                width={600}
                                height={280}
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
