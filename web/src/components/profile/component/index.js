import React from 'react';
import Layout from '../../layout';
import Page from './Profile';

const ProfileWithLayout = Layout(Page);

function Profile() {
  return <ProfileWithLayout title="Profile" />;
}

export default Profile;
