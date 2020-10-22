import React from 'react';
import Layout from '../../layout';
import Page from './Projects';

const ProjectsWithLayout = Layout(Page);

function Projects() {
  return <ProjectsWithLayout title="Projects" />;
}

export default Projects;
