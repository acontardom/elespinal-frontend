import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "../styles/tableProratio.css";

function ProrationNav () {

  const url = process.env.REACT_APP_API_URL;

  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("1");
  const [proration, setProration] = useState([]);
  const [projects, setProjects] = useState([]);
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    getPeople();
    getProjects();
  }, []);

  async function getPeople() {
    const res = await axios.get(`${url}/people`);
    setPersonas(res.data);
  }

  async function getProjects() {
    const res = await axios.get(`${url}/projects`);
    setProjects(res.data);
  }

  async function handleProration () {
    try {
      const res = await axios.get(`${url}/pasignation/proration/${month}/${year}`)
      setProration(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const personMap = {};
    personas.forEach(person => {
    personMap[person.id] = person;
    });

    const columnHeaders = proration.map(person => (
        <th key={person.PeopleId}>{personMap[person.PeopleId]?.name} {personMap[person.PeopleId]?.lastname}</th>
      ));

  const tableRows = projects.map(project => (
    <tr key={project.id}>
      <td>{project.name}</td>
      {proration.map(person => (
        <td key={person.PeopleId}>{person.projects[project.id]?.prop || '0.00'}</td>
      ))}
    </tr>
  ));

  return(
    <div className="main-container">
      <Row xs={1} md={3} className="g-4">
        <Col>
          <h6>Seleccionar año</h6>
        </Col>
        <Col>
          <h6>Selecionar mes a prorratear</h6>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Form.Select aria-label="Year" size="md" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Month" size="md" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </Form.Select>
        </Col>
        <Col>
          <Button variant="success" size="md" onClick={handleProration}>Prorratear</Button>{' '}
        </Col>
      </Row>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Proyectos</th>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProrationNav;
