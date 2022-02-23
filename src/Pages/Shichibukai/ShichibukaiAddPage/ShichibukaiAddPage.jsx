import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ShichibukaiProvider } from '../../../Providers/ShichibukaiProvider'

export default function ShichibukaiAddPage() {
  const [formAdd, setFormAdd] = useState({
    id: '',
    prenom: '',
    nom: '',
    prime: '',
    photo: '',
    commentaire: '',
  })

  const shichibukaiProvider = new ShichibukaiProvider()
  const navigate = useNavigate()

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'jxnellvh')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/firewax/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )

    const file = await res.json()
    console.log(file)

    setFormAdd(previous => {
      return { ...previous, photo: file.secure_url }
    })
  }

  function add(e) {
    e.preventDefault()
    shichibukaiProvider.add(formAdd)
    navigate('/shichibukai')
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Ajouter un shichibukai</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => add(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter prenom"
                  value={formAdd.prenom}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.prenom = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nom"
                  value={formAdd.nom}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.nom = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prime</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter le montant de la prime"
                  value={formAdd.prime}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.prime = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Label>Commentaire</Form.Label>
              <FloatingLabel
                controlId="floatingTextarea"
                label="commentaire"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="commentaire presonnalisé"
                  value={formAdd.commentaire}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.commentaire = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </FloatingLabel>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image du personnage</Form.Label>
                <Form.Control type="file" onChange={uploadImage} />
              </Form.Group>

              <hr />

              <Button variant="light" as={Link} to="/shichibukai">
                Retour
              </Button>

              <Button
                as={Link} to="/"
                variant="outline-secondary"
                className="float-end mx-2"
                type="reset"
              >
                Annuler
              </Button>

              <Button variant="success" type="submit" className="float-end">
                Enregistrer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
