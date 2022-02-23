import { useEffect } from 'react'
import { useState } from 'react'
import { Badge, Container, Row, Col } from 'react-bootstrap'

export default function HomePage() {

  const [dataMarine, setDataMarine] = useState([])
  const [dataPirate, setDataPirate] = useState([])
  const [dataShichibukai, setDataShichibukai] = useState([])

// récupération de chaque bdd dans le localstorage
// on stocke le contenu de chque bdd dans une variable du use state : dataMarine, dataPirate, dataShichibukai
  useEffect(()=>{
    let data = localStorage.getItem('spa-marines')
        ? localStorage.getItem('spa-marines')
        : '[]'
    data = JSON.parse(data)
    setDataMarine(data)
  }, [])

useEffect(()=>{
  let data = localStorage.getItem('spa-pirates')
    ? localStorage.getItem('spa-pirates')
    : '[]'
  data = JSON.parse(data)
  setDataPirate(data)
}, [])



useEffect(()=>{
  let data = localStorage.getItem('spa-shichibukai')
    ? localStorage.getItem('spa-shichibukai')
    : '[]'
  data = JSON.parse(data)
  setDataShichibukai(data)
}, [])


// on affiche le nombre d'élements à l'aide du .length

  return (
    <div className="App">
      <main>
        <Container>
         <Row>
            <Col>
                  <h1>Accueil</h1>
                  <hr />
                <h2>Statistiques</h2>
                <br />
            </Col> 
          </Row> 
        <h6>Membres de la Marines <Badge bg="info">{dataMarine.length}</Badge></h6>
        <h6> Membres de la Piraterie <Badge bg="dark">{dataPirate.length}</Badge></h6>
        <h6>Membres des Shichibukai <Badge bg="danger">{dataShichibukai.length}</Badge></h6>
        </Container>
      </main>
    </div>
  )
}