import { Container, Row } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <main>
        <Container>
          <Row>
            <div className="p-5 mb-4 bg-light rounded-3">
              <Container fluid className="py-5">
                <h1 className="display-5 fw-bold">
                  Devoir ReactJS
                </h1>
              </Container>
            </div>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default App
