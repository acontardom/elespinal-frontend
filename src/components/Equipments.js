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


function EquipmentGrid () {

    const url = process.env.REACT_APP_API_URL;

    // Consulta a la API los equipos
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        getEquipment();
    }, []);

    async function getEquipment() {
        const res = await axios.get(`${url}/equipment`);
        setEquipos(res.data);
    }

    // Constantes de equipo
    const [patent, setPatent] = useState('');
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [state, setState] = useState('');
    const [km, setKm] = useState(0);

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
    async function deleteEquipment(id) {
        await axios.delete(`${url}/equipment/${id}`);
        handleCloseAlert();
        getEquipment();
    }

    // Crear proyecto
    async function createProject() {
        const res = await axios.post(`${url}/equipment`, {
            patent: patent,
            type: type,
            brand: brand,
            model: model,
            state: state,
            km: km
        });
        handleCloseCreate();
        getEquipment();
    }




    return (
        <div>
            <div>
            <Container>
                <Row>
                    <Col><h2>Equipos</h2></Col>
                    <Col xs lg="2">
                        <Button variant="success" size="sm" onClick={handleShowCreate}>Crear equipo</Button>
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
                        <th>Patente</th>
                        <th>Estado</th>
                        <th>Horas/KM</th>
                        <th className="lastColumn">Acción</th>
                    </tr>
                </thead>
                { equipos.map((equipo) => (
                    <tbody>
                        <tr>
                            <td>{equipo.id}</td>
                            <td>{equipo.brand + ' ' + equipo.model}</td>
                            <td>{equipo.type}</td>
                            <td>{equipo.patent}</td>
                            <td>{equipo.state}</td>
                            <td>{equipo.km}</td>
                            <td className="lastColumn">
                                <Button variant="primary" size="sm">
                                    Ver equipo
                                </Button> {' '}

                                <Button variant="warning" size="sm">
                                    Editar
                                </Button> {' '}

                                <Button variant="danger" size="sm" 
                                onClick={() => {handleShowAlert(equipo.id)}}>
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
              <Modal.Title>¿Estas seguro de eliminar el equipo?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              El equipo se eliminará permanentemente y tambien se elimianrán todas las asignaciones de recursos asociados a este equipo.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {deleteEquipment(id_select)}}>
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
                <Modal.Title>Crear equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control type="text" placeholder="Marca del equipo"
                        onChange={(e) => {setBrand(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type="text" placeholder="Modelo del equipo"
                        onChange={(e) => {setModel(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Tipo de equipo" 
                        onChange={(e) => {setType(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Patente</Form.Label>
                        <Form.Control type="text" placeholder="Patente del equipo"  
                        onChange={(e) => {setPatent(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado del equipo"
                        onChange={(e) => {setState(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>KM/HR</Form.Label>
                        <Form.Control type="text" placeholder="Kilometaje u horas del equipo"
                        onChange={(e) => {setKm(e.target.value)}}
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

export default EquipmentGrid;