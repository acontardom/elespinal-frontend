import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useState } from 'react';

function NavbarEs() {

  const url = 'http://190.114.255.176';


  // Cargar personas
  const [personas, setPersonas] = useState([]);

  // Cargar equipos
  const [equipos, setEquipos] = useState([]);

  // Cargar proyectos
  const [proyectos, setProyectos] = useState([]);

  // Fechas de inicio y fin, proyecto, persona y equipo seleccionados
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [persona, setPersona] = useState('');
  const [equipo, setEquipo] = useState('');

  
  // Form para asignar personas
  const [showP, setShowP] = useState(false);

  // En el handleShowP se debe hacer la consulta a la API
  const handleCloseP = () => setShowP(false);

  // Handle sumbit
  const handleSubmitP = async (e) => {
    e.preventDefault();
    const data = {
      projectId: proyecto,
      PeopleId: persona,
      init_date: fechaInicio,
      finish_date: fechaFin
    }
    try {
      const res = await axios.post(`${url}/pasignation`, data);
      console.log(res);
      alert('Asignación realizada con éxito');
      setShowP(false);
      // Recargar la pagina
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert('Error al realizar la asignación');
    }
  }

  // En el handleShowP se debe hacer la consulta a la API
  async function handleShowP() {
    const pers = await axios.get(`${url}/people`);
    const proy = await axios.get(`${url}/projects`);
    setPersonas(pers.data);
    setProyectos(proy.data);
    setShowP(true);
  }

  // Form para asignar equipos
  const [showE, setShowE] = useState(false);
  const handleCloseE = () => setShowE(false);

  // Handle sumbit
  const handleSubmitE = async (e) => {
    e.preventDefault();
    const data = {
      projectId: proyecto,
      EquipmentId: equipo,
      init_date: fechaInicio,
      finish_date: fechaFin
    }
    try {
      const res = await axios.post(`${url}/masignation`, data);
      console.log(res);
      alert('Asignación realizada con éxito');
      setShowE(false);
      // Recargar la pagina
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert('Error al realizar la asignación');
    }
  }

  // En el handleShowE se debe hacer la consulta a la API
  async function handleShowE() {
    const equi = await axios.get(`${url}/equipment`);
    const proy = await axios.get(`${url}/projects`);
    setEquipos(equi.data);
    setProyectos(proy.data);
    setShowE(true);
  }

  // Consultas a la API ¿Hacerlo junto con el handleShowP y handleShowE?

  return (
    <div>
      <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container>
          <Navbar.Brand href="/"> 
          El Espinal SpA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/calendar">Calendario</Nav.Link>
              <Nav.Link href="/projects">Proyectos</Nav.Link>
              <Nav.Link href="/people">Personas</Nav.Link>
              <Nav.Link href="/equipment">Equipos</Nav.Link>
              <NavDropdown title="Asignar" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShowP}>Asignar persona</NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowE}>Asignar equipo</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>


      <div>
        <Modal show={showP} onHide={handleCloseP} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Asignar persona</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Persona</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setPersona(e.target.value)}>
                  <option>Seleccionar persona</option>
                  {personas.map((per) => (
                    <option value={per.id}>{per.name + ' ' + per.lastname}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Proyecto</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setProyecto(e.target.value)}>
                  <option>Seleccionar proyecto</option>
                  {proyectos.map((pro) => (
                    <option value={pro.id}>{pro.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Fecha inicio</Form.Label>
                  <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <br />
                <Form.Label>Fecha termino</Form.Label>
                  <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />

              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseP}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmitP}>
              Agregar asinación
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


      <div>
      <Modal show={showE} onHide={handleCloseE} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Asignar equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Equipo</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setEquipo(e.target.value)}>
                  <option>Seleccionar equipo</option>
                  {equipos.map((equipo) => (
                    <option value={equipo.id}>{equipo.brand + ' ' + equipo.model + ' ' + equipo.patent}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Proyecto</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setProyecto(e.target.value)}>
                  <option>Seleccionar proyecto</option>
                  {proyectos.map((pro) => (
                    <option value={pro.id}>{pro.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Fecha inicio</Form.Label>
                  <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <br />
                <Form.Label>Fecha termino</Form.Label>
                  <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />

              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseE}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmitE}>
              Agregar asinación
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>




  );
}

export default NavbarEs;