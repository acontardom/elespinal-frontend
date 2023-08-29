import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function HomeGroup() {
  return (
    <CardGroup> 

          <Card >
            <Card.Body>
              <Card.Title>Calendario general</Card.Title>
              <Card.Text>
                Calendario con todas las asignaciones de cada persona y equipo, junto con los proyectos asignados.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/calendar'>Ir a Calendario</Button>
          </Card>

          <Card >
            <Card.Body>
              <Card.Title>Proyectos</Card.Title>
              <Card.Text>
                Ver todos los proyectos con sus estados actuales. Tambien puedes crear, editar y eliminar proyectos.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/projects'>Ir a Proyectos</Button>
          </Card>

          <Card >
            <Card.Body>
              <Card.Title>Personas</Card.Title>
              <Card.Text>
                Ver todas las personas que forman parte de la empresa con sus estados actuales. Tambien puedes crear, editar y eliminar personas.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/people'>Ir a Personas</Button>
          </Card>

          <Card >
            <Card.Body>
              <Card.Title>Equipos</Card.Title>
              <Card.Text>
                Ver todos los equipos de la empresa con sus estados actuales. Tambien puedes crear, editar y eliminar equipos.
              </Card.Text>
            </Card.Body>
            <Button variant="link" href='/equipment'>Ir a Equipos</Button>
          </Card>

    </CardGroup>
        

  );
}

export default HomeGroup;