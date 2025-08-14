import React from 'react';
import { Project } from '../../types/projectTypes';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative box-border flex flex-col">
      <div className="relative box-border flex flex-col mb-3">
        <a href={project.href} className="relative aspect-video bg-stone-100 box-border block w-full overflow-hidden rounded-xl">
          <div className="relative box-border h-full w-full">
            <img 
              alt={project.imageAlt} 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              src={project.imageSrc} 
              className="absolute text-transparent box-border h-full max-w-full object-cover object-[50%_0%] w-full border border-stone-200 rounded-xl border-solid inset-0" 
            />
          </div>
        </a>
      </div>
      <div className="items-center box-border gap-x-2 flex gap-y-2">
        <span className="relative text-xs box-border flex shrink-0 h-9 leading-[18px] w-9 border overflow-hidden rounded-full border-solid border-transparent">
          {project.avatar.type === 'image' ? (
            <img src={project.avatar.src} className="box-border h-full max-w-full object-cover w-full" />
          ) : (
            <span className={project.avatar.type === 'letter-a' ? "text-white font-medium items-center bg-indigo-700 box-border flex h-9 justify-center w-9 rounded-full" : "text-white font-medium items-center bg-fuchsia-700 box-border flex h-9 justify-center w-9 rounded-full"}>
              {project.avatar.letter}
            </span>
          )}
        </span>
        <div className="box-border flex justify-between w-full">
          <div className="box-border flex flex-col">
            <div className="items-center box-border gap-x-2 flex gap-y-2 text-ellipsis text-nowrap overflow-hidden">
              <p className="box-border text-ellipsis text-nowrap overflow-hidden">{project.title}</p>
              <span title={project.category.label} className={project.category.className}>
                {project.category.label}
              </span>
            </div>
            <div className="text-zinc-600 text-sm items-center box-border gap-x-2 flex leading-[21px] gap-y-2">
              <p className="box-border">{project.remixes} Remixes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
