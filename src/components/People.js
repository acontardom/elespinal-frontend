import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function PeopleGrid () {

    const url = process.env.REACT_APP_API_URL;

    // Consulta a la API los personas
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        getPeople();
    }, []);

    async function getPeople() {
        const res = await axios.get(`${url}/people`);
        setPersonas(res.data);
    }
    //   rut      | password |  name   | lastname |    role     | birthdate  
    // Constantes de persona
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');
    const [birthdate, setBirthdate] = useState('');

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
    async function deletePeople(id) {
        await axios.delete(`${url}/people/${id}`);
        handleCloseAlert();
        getPeople();
    }

    // Crear proyecto
    async function createProject() {
        const res = await axios.post(`${url}/people`, {
            rut: rut,
            password: password,
            name: name,
            lastname: lastname,
            role: role,
            birthdate: birthdate
        });
        handleCloseCreate();
        getPeople();
    }

    return (
        <div>
            <div>
            <Container>
                <Row>
                    <Col><h2>Personas</h2></Col>
                    <Col xs lg="2">
                        <Button variant="success" size="sm" onClick={handleShowCreate}>Crear persona</Button>
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
                        <th>RUT</th>
                        <th>Rol</th>
                        <th>Fecha nacimiento</th>
                        <th className="lastColumn">Acción</th>
                    </tr>
                </thead>
                { personas.map((persona) => (
                    <tbody>
                        <tr>
                            <td>{persona.id}</td>
                            <td>{persona.name + ' ' + persona.lastname}</td>
                            <td>{persona.rut}</td>
                            <td>{persona.role}</td>
                            <td>{persona.birthdate}</td>
                            <td className="lastColumn">
                                <Button variant="primary" size="sm">
                                    Ver persona
                                </Button> {' '}

                                <Button variant="warning" size="sm">
                                    Editar
                                </Button> {' '}

                                <Button variant="danger" size="sm" 
                                onClick={() => {handleShowAlert(persona.id)}}>
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
              <Modal.Title>¿Estas seguro de eliminar el persona?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              La persona se eliminará permanentemente y tambien se elimianrán todas las asignaciones asociadas a esta persona.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {deletePeople(id_select)}}>
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
                <Modal.Title>Crear persona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre del persona"
                        onChange={(e) => {setName(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" placeholder="Apellido del persona"
                        onChange={(e) => {setLastname(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="text" placeholder="RUT del persona"  
                        onChange={(e) => {setRut(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control type="text" placeholder="Rol de persona" 
                        onChange={(e) => {setRole(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Fecha nacimiento</Form.Label>
                        <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
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

export default PeopleGrid;