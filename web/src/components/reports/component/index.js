import React from 'react';
import Layout from '../../layout';
import Page from './Reports';

const ReportsWithLayout = Layout(Page);

function Reports() {
  return <ReportsWithLayout title="Reports" />;
}

export default Reports;
