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
import { PiratesProvider } from '../../../Providers/PiratesProvider'

export default function PirateAddPage() {
  const [formAdd, setFormAdd] = useState({
    id: '',
    prenom: '',
    nom: '',
    equipage: '',
    prime: '',
    photo: '',
    commentaire: '',
  })

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

  const piratesProvider = new PiratesProvider()
  const navigate = useNavigate()

  function add(e) {
    e.preventDefault()
    piratesProvider.add(formAdd)
    navigate('/pirates')
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Ajouter un pirate</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => add(e)}>
              <Form.Group className="mb-3">
                <Form.Label className="title-modif">Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer prenom"
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
                <Form.Label className="title-modif">Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer nom"
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
                <Form.Label className="title-modif">Équipage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom de l'équipage"
                  value={formAdd.equipage}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.equipage = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="title-modif">Prime</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer le montant de la prime"
                  value={formAdd.prime}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.prime = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Label className="title-modif">Commentaire</Form.Label>

              <FloatingLabel
                controlId="floatingTextarea"
                label="commentaire"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Commentaire presonnalisé"
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
                <Form.Label className="title-modif">Image du personnage</Form.Label>
                <Form.Control type="file" onChange={uploadImage} />
              </Form.Group>

              <hr />

              <Button variant="success" type="submit" className="button-up">
                Enregistrer
              </Button>
              <p></p>
              <Button className="button-up" variant="light" as={Link} to="/pirates">
                Retour
              </Button>
              <p></p>
              <Button
                 as={Link} to="/"
                variant="outline-secondary"
                className="button-up"
                type="reset"
              >
                Annuler
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
