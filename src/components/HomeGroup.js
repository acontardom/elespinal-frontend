import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function HomeGroup() {
  return (
    <Row xs={1} md={3} className="g-4">
        <Col>
          <Card >
            <Card.Body>
              <Card.Title>Calendario general</Card.Title>
              <Card.Text>
                Calendario con todas las asignaciones de cada persona y equipo, junto con los proyectos asignados.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/calendar'>Ir a Calendario</Button>
          </Card>
        </Col>
        <Col>
          <Card >
            <Card.Body>
              <Card.Title>Proyectos</Card.Title>
              <Card.Text>
                Ver todos los proyectos con sus estados actuales. Tambien puedes crear, editar y eliminar proyectos.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/projects'>Ir a Proyectos</Button>
          </Card>
        </Col>
        <Col>

          <Card >
            <Card.Body>
              <Card.Title>Personas</Card.Title>
              <Card.Text>
                Ver todas las personas que forman parte de la empresa con sus estados actuales. Tambien puedes crear, editar y eliminar personas.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/people'>Ir a Personas</Button>
          </Card>
          </Col>
        <Col>

          <Card >
            <Card.Body>
              <Card.Title>Equipos</Card.Title>
              <Card.Text>
                Ver todos los equipos de la empresa con sus estados actuales. Tambien puedes crear, editar y eliminar equipos.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/equipment'>Ir a Equipos</Button>
          </Card>
        </Col>

        <Col>  
          <Card>
            <Card.Body>
              <Card.Title>Prorrateo</Card.Title>
              <Card.Text>
                Sección con las funcionalidades para realizar el prorrateo de las personas
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/proration'>Ir a Prorrateo</Button>
          </Card>
        </Col>

        </Row>


        

  );
}

export default HomeGroup;