import React from "react";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/timeline.css";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


import Timeline, {
  TimelineHeaders,
  DateHeader,
  CustomMarker,
  TodayMarker
} from "react-calendar-timeline/lib";
import Modal from 'react-bootstrap/Modal';


function MainTimeline() {

    const url = 'http://190.114.255.176';
    //const [personas, setPersonas] = useState([]);
    //const [equipos, setEquipos] = useState([]);
    const [items, setItems] = useState([]);
    const [grupos, setGrupos] = useState([]);
    
    // Consultar a la API

    //setGrupos(groups);
    useEffect(() => {
      getData();
    }, []);

    
    function handleCloseP (){
      setShowP(false);
      setDisabled(true);
      setEditing(false);
    }
    const [showP, setShowP] = useState(false);

    const [showM, setShowM] = useState(false);
    function handleCloseM (){
      setShowM(false);
      setDisabled(true);
      setEditing(false);
    }

    const [init_date, setInit_date] = useState('');
    const [finish_date, setFinish_date] = useState('');
    const [disabled, setDisabled] = useState(true);

    // Delete
    const [alert, setAlert] = useState(false);
    const [alertM, setAlertM] = useState(false);
    function handleShowAlert() {
      setAlert(true);
      setShowP(false);
    }
    function handleShowAlertM() {
      setAlertM(true);
      setShowM(false);
    }

    function handleCloseAlert() {
      setAlert(false);
      setShowP(true);
      setDisabled(true);
      setEditing(false);
    }
    function handleCloseAlertM() {
      setAlertM(false);
      setShowM(true);
      setDisabled(true);
      setEditing(false);
    }

    const [project, setProject] = useState('');
    const [people, setPeople] = useState('');
    const [equipment, setEquipment] = useState('');
    const [selected_item, setSelected_item] = useState('');

    const [editing, setEditing] = useState(false);

    async function starEdit () {
      setDisabled(false);
      setEditing(true);
    }

    async function handleEditP () {
      // Editar en la base de datos
      try {
        const res = await axios.patch(`${url}/pasignation/${selected_item}`, {
          init_date: init_date,
          finish_date: finish_date
        });
        setDisabled(true);
        setEditing(false);
        handleCloseP();
        getData();
      }
      catch (error) {
        console.log(error);
      }
    }

    async function handleEditM () {
      // Editar en la base de datos
      try {
        const res = await axios.patch(`${url}/masignation/${selected_item}`, {
          init_date: init_date,
          finish_date: finish_date
        });
        setDisabled(true);
        setEditing(false);
        handleCloseM();
        getData();
      } catch (error) {
        console.log(error);
      }
    }

    async function showItem(item, event, time) {

      if (item >= 10000) {
        // Es un equipo
        const id = item - 10000;
        setSelected_item(id);
        const res = await axios.get(`${url}/masignation/${id}`);

        const project_id = res.data.projectId;
        const equipment_id = res.data.EquipmentId;

        setInit_date(res.data.init_date);
        setFinish_date(res.data.finish_date);

        const project = await axios.get(`${url}/projects/${project_id}`);
        const equi = await axios.get(`${url}/equipment/${equipment_id}`);

        setProject(project.data.name);
        setEquipment(equi.data.brand + ' ' + equi.data.model);

        // Mostrar modal
        setShowM(true);

      } else {
        // Es una persona
        const id = item;
        setSelected_item(id);
        const res = await axios.get(`${url}/pasignation/${id}`);
        const project_id = res.data.projectId;
        const people_id = res.data.PeopleId;

        setInit_date(res.data.init_date);
        setFinish_date(res.data.finish_date);

        const project = await axios.get(`${url}/projects/${project_id}`);
        const people = await axios.get(`${url}/people/${people_id}`);

        setProject(project.data.name);
        setPeople(people.data.name + ' ' + people.data.lastname);

        // Mostrar modal
        setShowP(true);
      }
    }

    async function handleDeleteP () {
      const res = await axios.delete(`${url}/pasignation/${selected_item}`);
      setAlert(false);
      handleCloseP();
      getData();
    }

    async function handleDeleteM () {
      const res = await axios.delete(`${url}/masignation/${selected_item}`);
      setAlertM(false);
      handleCloseM();
      getData();
    }

    let groupRenderer = ({ group }) => {

      // Se asignan de manera alternada los colores

      // Equipos se asigna como equipment
      if (group.id >= 100) {
        if (group.id % 2 === 0) {
          return <div className="equipment_1">{group.title}</div>;
        } else {
          return <div className="equipment_2">{group.title}</div>;
        }

      // Personas se asigna como people
      } 
      else {
        if (group.id % 2 === 0) {
          return <div className="people_1">{group.title}</div>;
        } else {
          return <div className="people_2">{group.title}</div>;
        }
      }
    };

    async function getData () {
      const personas = await axios.get(`${url}/people`);
      const equipos = await axios.get(`${url}/equipment`);
      
      // Setear la informacion
      const asigned_persons = personas.data.map(persona => {
        return {
          id: persona.id,
          title: persona.name + ' ' + persona.lastname,
          bgColor: '#f00'
        }
      });
      const asigned_equipment = equipos.data.map(equipo => {
        return {
          id: equipo.id + 100,
          title: equipo.brand + ' ' + equipo.model
        }
      });

      const projects = await axios.get(`${url}/projects`);
      const pasignations = await axios.get(`${url}/pasignation`);
      const masignations = await axios.get(`${url}/masignation`);

      // Setear la informacion
      const asigned_pasignation = pasignations.data.map(pasignation => {

        let project_name = '';
        for (let i = 0; i < projects.data.length; i++) {
          if (projects.data[i].id === pasignation.projectId) {
            // Guardar el nombre del proyecto
            project_name = projects.data[i].name;
          }
        }
        return {
          id: pasignation.id,
          group: pasignation.PeopleId,
          title: project_name, // OJO CON ESTO
          start_time: moment(pasignation.init_date),
          end_time: moment(pasignation.finish_date),
        }
      });
      console.log(masignations.data)
      console.log(projects.data)
      const asigned_masignation = masignations.data.map(masignation => {
        // Buscar el proyecto
        let project_name = '';
        for (let i = 0; i < projects.data.length; i++) {
          if (projects.data[i].id === masignation.projectId) {
            // Guardar el nombre del proyecto
            project_name = projects.data[i].name;
          }
        }

        return {
          id: masignation.id + 10000,
          group: masignation.EquipmentId + 100,
          title: project_name, // OJO CON ESTO
          start_time: moment(masignation.init_date),
          end_time: moment(masignation.finish_date),
          }
      });

      // Concatenar los arrays
      const groups = asigned_persons.concat(asigned_equipment);
      const items_aux = asigned_pasignation.concat(asigned_masignation);

      setItems(items_aux);
      setGrupos(groups);
    }

    const defaultTimeStart = moment()
      .startOf("day")
      .valueOf();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(30, "day")
      .valueOf();


  
    return (
      <div> 
        <div>
          <Timeline
            groups={grupos}
            items={items}
            groupRenderer={groupRenderer}
            sidebarContent={<div>Above The Left</div>}
            itemsSorted
            itemTouchSendsClick={false}
            stackItems
            itemHeightRatio={0.8}
            showCursorLine
            canMove={false}
            canResize={false}
            buffer={100}
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            onItemClick={(item, e, time) => showItem(item, e, time)}

            minZoom={60 * 60 * 1000 * 24 * 7}
          >
            <TimelineHeaders className="sticky">
            <TodayMarker />
            <DateHeader unit="primaryHeader" />
            <DateHeader />
            </TimelineHeaders>
          </Timeline>
        </div>
        <div>
          <div>
          <Modal show={showP} onHide={handleCloseP} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Asignación persona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>Proyecto</Col>
                  <Col>{project}</Col>
                </Row>
                <Row>
                  <Col>Persona</Col>
                  <Col>{people}</Col>
                </Row>
                <Row>
                  <Col>Fecha inicio</Col>
                  <Col>
                    <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={init_date}
                    onChange={(e) => setInit_date(e.target.value)}
                    disabled={disabled}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>Fecha fin</Col>
                  <Col>
                    <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={finish_date}
                    onChange={(e) => setFinish_date(e.target.value)}
                    disabled={disabled}
                    />
                  </Col>
                  
                </Row>
              </Container>

            </Modal.Body>
            <Modal.Footer>
              
            {editing ? (
                <Button variant="success" onClick={handleEditP}>
                Guardar
              </Button>
        
              ) : (
                <Button variant="warning" onClick={starEdit}>
                Editar
              </Button>
              )}
              <Button variant="danger" onClick={handleShowAlert}>
                Eliminar
              </Button>
              <Button variant="primary" onClick={handleCloseP}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={alert}
            onHide={handleCloseAlert}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>¿Estas seguro de eliminar la asignación?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              La asignación será eliminada de forma permanente.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteP}>
                Eliminar
              </Button>
              <Button variant="primary" onClick={handleCloseAlert}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          </div>

          {/* Modal equipo */}
          <div>
          <Modal show={showM} onHide={handleCloseM} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Asignación equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>Proyecto</Col>
                  <Col>{project}</Col>
                </Row>
                <Row>
                  <Col>Equipo</Col>
                  <Col>{equipment}</Col>
                </Row>
                <Row>
                  <Col>Fecha inicio</Col>
                  <Col>
                    <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={init_date}
                    onChange={(e) => setInit_date(e.target.value)}
                    disabled={disabled}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>Fecha fin</Col>
                  <Col>
                    <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={finish_date}
                    onChange={(e) => setFinish_date(e.target.value)}
                    disabled={disabled}
                    />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              {editing ? (
                <Button variant="success" onClick={handleEditM}>
                Guardar
              </Button>
        
              ) : (
                <Button variant="warning" onClick={starEdit}>
                Editar
              </Button>
              )}
              <Button variant="danger" onClick={handleShowAlertM}>
                Eliminar
              </Button>
              <Button variant="primary" onClick={handleCloseM}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={alertM}
            onHide={handleCloseAlertM}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>¿Estas seguro de eliminar la asignación?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              La asignación será eliminada de forma permanente.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteM}>
                Eliminar
              </Button>
              <Button variant="primary" onClick={handleCloseAlertM}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          </div>

        </div>
      </div>



    );
  }

export default MainTimeline;