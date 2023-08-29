import ProjectDetails from '../components/ProjectDetails';
import MainNavbar from '../components/NavbarMain';


function ProjectInfo () {
    return (
        <div>
            <div>
                <MainNavbar></MainNavbar>
            </div>

            <br />

            <div>
                <ProjectDetails></ProjectDetails>
            </div>

        </div>
    )
}

export default ProjectInfo;