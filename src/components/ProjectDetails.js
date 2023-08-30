import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectDetails () {
    
        const url = "http://190.114.255.176";
    
        const { id } = useParams();
    
        const [project, setProject] = useState([]);
    
        useEffect(() => {
            getProject();
        }, []);
    
        async function getProject() {
            const res = await axios.get(`${url}/projects/${id}`);
            setProject(res.data);
        }
    
        return (
            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
            </div>
        )
    }

    export default ProjectDetails;