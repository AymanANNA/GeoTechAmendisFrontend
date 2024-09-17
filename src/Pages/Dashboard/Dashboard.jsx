import { BarChart } from '@mui/x-charts/BarChart'; // This is a placeholder, assuming you have a similar component
import { DataGrid } from '@mui/x-data-grid';
import 'chart.js/auto'; // Auto detection for chart.js
import { formatDistanceToNow, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./Dashboard.scss";

// Settings common to all charts
const chartSetting = {
    xAxis: [{
        label: 'distance (km)',
    }],
    width: 500,
    height: 300,
};

const chartSetting1 = {
    xAxis: [{
        label: 'heures travaillés (hr)',
    }],
    width: 500,
    height: 300,
};

function Dashboard() {
    const [monthlyDataset, setMonthlyDataset] = useState([]);
    const [dailyDataset, setDailyDataset] = useState([]);
    const [technicianData, setTechnicianData] = useState([]);

    // Fetch data for both monthly and daily kilometerage on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    fetch("http://127.0.0.1:8001/technicians/monthly-kilometerage/"),
                    fetch("http://127.0.0.1:8001/api/technician-daily"),
                    fetch("http://127.0.0.1:8001/api/technicien/detail/") // Adding the new endpoint
                ]);

                const data = await Promise.all(responses.map(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                }));

                setMonthlyDataset(data[0]);
                setDailyDataset(data[1]);
                setTechnicianData(data[2]); // Setting the state with the data from the new endpoint
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const valueFormatter = (value) => `${value} km`;
    const valueFormatter2 = (value) => `${value} hrs`;

    const columns = [
        {   field: 'username',
            headerName: 'Nom d’utilisateur',
            width: 150,
            valueGetter: (params) => params.row.technicien.username  },
        {   field: 'first_name',
            headerName: 'Nom',
            width: 150,
            valueGetter: (params) => params.row.technicien.first_name  },
        {   field: 'last_name',
            headerName: 'Prénom',
            width: 150,
            valueGetter: (params) => params.row.technicien.last_name  },
        { field: 'device_name', headerName: 'Nom de l’appareil', width: 180 },
        { field: 'ip_address', headerName: 'IP Address', width: 130 },
        { field: 'battery_level', headerName: 'Niveau de Batterie', width: 130 },
        { field: 'os_version', headerName: 'Version OS', width: 130 },
        { field: 'model', headerName: 'Modèle', width: 130 },
        { field: 'manufacturer', headerName: 'Fabricant', width: 130 },
        {   field: 'last_sent_location_time',
            headerName: 'Dernière mise à jour',
            width: 180,
            valueGetter: (params) => {
                if (!params.row.last_sent_location_time) return "No data";
                const date = parseISO(params.row.last_sent_location_time);
                return formatDistanceToNow(date) + ' ago';
            }
        }
    ];
    const chartData = Object.entries(dailyDataset).map(([username, yesterdays_kilometers]) => ({
        username,
        yesterdays_kilometers
    }));
    console.log(chartData);

    return (
        <div className="list_page">
            <Sidebar />
            <div className="suivi_main">
                <Navbar />
                <div className="dashboard-content">
                    <div className="charts-container">
                        <div className="chart">
                            <h2>Kilomèterage mensuel</h2>
                            { monthlyDataset.length > 0 ? 
                                <BarChart
                                    sx={{ padding: '10px' }}
                                    dataset={monthlyDataset}
                                    yAxis={[{ scaleType: 'band', dataKey: 'username' }]}
                                    series={[{ dataKey: 'monthly_kilometers', valueFormatter }]}
                                    layout="horizontal"
                                    {...chartSetting}
                                />
                                : "Loading..."
                            }
                        </div>
                        <div className="chart">
                            <h2>Heures travaillées quotidiennes</h2>
                            { chartData.length > 0 ? 
                                <BarChart
                                    sx={{ padding: '10px' }}
                                    dataset={chartData}
                                    yAxis={[{ scaleType: 'band', dataKey: 'username' }]}
                                    series={[{ dataKey: 'yesterdays_kilometers', valueFormatter: valueFormatter2 }]}
                                    layout="horizontal"
                                    {...chartSetting1}
                                />
                                : "Loading..."
                            }
                        </div>
                    </div>
                    <div className="table-container">
                        <h2 style={{ padding : "20px" }} >Informations sur les appareils des techniciens</h2>
                        <DataGrid
                            rows={technicianData}
                            columns={columns}
                            pageSize={20}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            disableSelectionOnClick
                            autoHeight
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
