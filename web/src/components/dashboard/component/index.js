import React from 'react';
import Layout from '../../layout';
import Page from './Dashboard';

const DashboardWithLayout = Layout(Page);

function Dashboard() {
  return <DashboardWithLayout title="Dashboard" />;
}

export default Dashboard;
