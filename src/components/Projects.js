import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../styles/tables.css'


// Path: espinal/src/pages/Projects.js


function ProjectsGrid () {

    const url = process.env.REACT_APP_API_URL;

    // Consulta a la API los proyectos
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    async function getProjects() {
        const res = await axios.get(`${url}/projects`);
        setProyectos(res.data);
    }

    // Constantes de proyecto
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ubication, setUbication] = useState('');
    const [state, setState] = useState('');


    // Constantes para manejo de alertas
    const [id_select, setId_select] = useState(0);
    const [alert, setAlert] = useState(false);
    const [update, setUpdate] = useState(false);
    const [create, setCreate] = useState(false);

    // Manejo de alertas
    const handleCloseAlert = () => setAlert(false);
    const handleShowAlert = (id) => {
        setId_select(id);
        setAlert(true);
    }

    const handleCloseUpdate = () => setUpdate(false);
    const handleShowUpdate = (id) => {
        setId_select(id);
        setUpdate(true);
    }

    const handleCloseCreate = () => setCreate(false);
    const handleShowCreate = () => setCreate(true);

    // Elimina un proyecto
    async function deleteProject(id) {
        await axios.delete(`${url}/projects/${id}`);
        handleCloseAlert();
        getProjects();
    }

    // Crear proyecto
    async function createProject() {
        const res = await axios.post(`${url}/projects`, {
            name: name,
            type: type,
            ubication: ubication,
            state: state
        });
        handleCloseCreate();
        getProjects();
    }




    return (
        <div>
            <div>
            <Container>
                <Row>
                    <Col><h2>Proyectos</h2></Col>
                    <Col xs lg="2">
                        <Button variant="success" size="sm" onClick={handleShowCreate}>Crear proyecto</Button>
                    </Col>
                </Row>
            </Container>
            </div>
            <br/>
            <Container className="tableContainer">
            <Table striped hover className="customTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th className="lastColumn">Acción</th>
                </tr>
            </thead>
            { proyectos.map((proyecto) => (
                <tbody>
                    <tr>
                        <td>{proyecto.id}</td>
                        <td>{proyecto.name}</td>
                        <td>{proyecto.type}</td>
                        <td>{proyecto.ubication}</td>
                        <td>{proyecto.state}</td>
                        <td className="lastColumn">
                            <Button variant="primary" size="sm" href={`/projects/${proyecto.id}`}>
                                Ver proyecto
                            </Button> {' '}

                            <Button variant="warning" size="sm">
                                Editar
                            </Button> {' '}

                            <Button variant="danger" size="sm" 
                            onClick={() => {handleShowAlert(proyecto.id)}}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                </tbody>
            ))}
            
            </Table>
            </Container>
            
            
            <Modal
                show={alert}
                onHide={handleCloseAlert}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
              <Modal.Title>¿Estas seguro de eliminar el proyecto?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              El proyecto se eliminará permanentemente y tambien se elimianrán todas las asignaciones de recursos asociados a este proyecto.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {deleteProject(id_select)}}>
                Eliminar
              </Button>
              <Button variant="primary" onClick={handleCloseAlert}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

            <Modal
            show={create}
            onHide={handleCloseCreate}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Crear proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre del proyecto"
                        onChange={(e) => {setName(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Tipo de proyecto" 
                        onChange={(e) => {setType(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control type="text" placeholder="Ubicación del proyecto"  
                        onChange={(e) => {setUbication(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado del proyecto"
                        onChange={(e) => {setState(e.target.value)}}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCreate}>
                Cerrar
                </Button>
                <Button variant="primary" onClick={() => {createProject()}}>
                Crear
                </Button>
            </Modal.Footer>
            </Modal>

                
                
        </div>

        

      );
} 

export default ProjectsGrid

// Path: espinal/src/pages/Proyectos.js