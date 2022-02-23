import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PiratesProvider } from '../../../Providers/PiratesProvider'

export default function PiratePage() {
  const [pirates, setPirates] = useState([])
  const PiratesProviders = new PiratesProvider()

  useEffect(() => {
    let datas = PiratesProviders.getPirates()
    setPirates(datas)
  }, [])

  function remove(pirates) {
    let rep = window.confirm(
      `Etes-vous sur de vouloir supprimer le pirate ${pirates.prenom} ${pirates.nom}`
    )
    if (rep) {
      PiratesProviders.remove(pirates)
      let datas = PiratesProviders.getPirates()
      setPirates(datas)
    }
  }

  let displayPirates = pirates.map((pirate, indice) => {
    return (

        <Col lg={5} md={5} key={indice + 1}>
          <Card className='Card2' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={pirate.photo} />
            <Card.Body>
              <Card.Title>
                {pirate.prenom} {pirate.nom}
              </Card.Title>
              <Card.Text>
                Commentaire : {pirate.commentaire}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Équipage : {pirate.equipage}</ListGroupItem>
              <ListGroupItem>Prime : {pirate.prime}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button className='button'  as={Link} to={'/pirates/' + pirate.id} variant="warning">
                Modifier
              </Button>
              <Button variant="danger" onClick={() => remove(pirate)}>
                Supprimer
              </Button>
            </Card.Body>
          </Card>
        </Col>
    )
  })
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Gestion des Pirates</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="mb-3">
              <Button as={Link} to="/pirates/add">
                Ajouter un pirate
              </Button>
            </div>
          </Col>
        </Row>
      </Container>


      <br></br>
      <Container key={pirates.id} className='Container2'>{displayPirates}</Container>      
    </>
  )
}
