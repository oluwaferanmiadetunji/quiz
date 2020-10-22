import React from 'react';
import Layout from '../layout';
import Page from './Home';

const HomeWithLayout = Layout(Page);

function Home() {
  return <HomeWithLayout title="Home" />;
}

export default Home;
