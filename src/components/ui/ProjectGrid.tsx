import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../../data/projectsData';

export function ProjectGrid() {
  return (
    <div className="box-border gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 w-full md:grid-cols-[repeat(4,minmax(0px,1fr))]">
      {projectsData.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
