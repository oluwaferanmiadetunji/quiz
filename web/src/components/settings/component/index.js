import React from 'react';
import Layout from '../../layout';
import Page from './Settings';

const SettingsWithLayout = Layout(Page);

function Settings() {
  return <SettingsWithLayout title="Settings" />;
}

export default Settings;
