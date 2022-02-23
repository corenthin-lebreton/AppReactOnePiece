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
import { MarinesProvider } from '../../../Providers/MarinesProviders'

export default function MarinePage() {

  const [marines, setMarines] = useState([])
  const MarinesProviders = new MarinesProvider()

  // UseEffect où on récupère le contenu du la bdd spa-marines dans un usestate (marine)


  useEffect(() => {
    //on utilise une fonction du provider qui récupère les élements du localstorage

    let datas = MarinesProviders.getMarines()

    // on le stock dans le usestate marines, à l'aide de setMarines

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


  // permet de faire un affichage pour chaque personnage crée à l'aide du .map
  // on utilise le usestate marines pour récupérer l'ensemble du contenu du localstorage stocker dedans, on utilise le paramètre marine pour 
  //récupérer le nom, prenom, image etc
  let displayMarines = marines.map((marine, indice) => {
    return (
     
        <Col className='crudStuff' lg={5} md={5}>
          <Card className='Card' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={marine.photo} />
            <Card.Body>
              <Card.Title>
                {marine.prenom} {marine.nom}
              </Card.Title>
              <Card.Text>
                Commentaire : {marine.commentaire}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Grade : {marine.grade}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button className="button-del" as={Link} to={'/marines/' + marine.id} variant="warning">
                Modifier
              </Button>
              <p></p>
              <Button className="button-del" onClick={() => remove(marine)}>
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
            <h1 className="title-marine">Gestion des membres de la Marine</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <div>
              <Button className="button-marine" as={Link} to="/marines/add">
                Ajouter un membre de la Marine
              </Button>
            </div>
          </Col>
        </Row>
        
      
      </Container>
      <br></br>
      <Container className='Container' >{displayMarines}</Container>
    </>
  )
}
