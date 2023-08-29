import ProjectsGrid from '../components/Projects';
import React from "react";
import MainNavbar from "../components/NavbarMain";


function Projects() {
    return (
        <div>
          <div>
            <MainNavbar></MainNavbar>
          </div>
          <br />
          <div>
            <ProjectsGrid></ProjectsGrid>
          </div>
        </div>
      );
    }

export default Projects;