import { Container, Row, Col, Button, Table, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MarinesProvider } from '../../Providers/MarinesProviders'

export default function MarinePage() {
  const [marines, setMarines] = useState([])
  const MarinesProviders = new MarinesProvider()

  useEffect(() => {
    let datas = MarinesProviders.getMarines()
    setMarines(datas)
  }, [])

  function remove(marine) {
    let rep = window.confirm(
      `Etes-vous sur de vouloir supprimer le ${marine.grade} ${marine.prenom} ${marine.nom}`
    )
    if (rep) {
      MarinesProviders.remove(marine)
      let datas = MarinesProviders.getMarines()
      setMarines(datas)
    }
  }

  let displayMarines = marines.map((marine, indice) =>{
    return(

      <Container  key={indice + 1}>
        <Col>
            <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src= {marine.photo} />
        <Card.Body>
          <Card.Title>{marine.prenom} {marine.nom}</Card.Title>
          <Card.Text>
          Commentaire personnalisé : {marine.commentaire}
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
          <ListGroupItem>Grade : {marine.grade}</ListGroupItem>
          </ListGroup>
          <Card.Body>
          <Button as={Link} to={'/marines/' + marine.id} variant="warning">
                  Modifier
              </Button>   <Button variant="danger" onClick={() => remove(marine)}>
                  Supprimer
                </Button>
        </Card.Body>
          </Card>
        </Col>
</Container>
    )
  })


  return (
    <>
        <Row>
          <Col md={12}>
            <div className="mb-3">
              <Button as={Link} to="/marines/add">
                Ajouter un membre de la Marine
              </Button>
            </div>
            </Col>
        </Row>

<br></br>


{displayMarines}
    </>
  )
}