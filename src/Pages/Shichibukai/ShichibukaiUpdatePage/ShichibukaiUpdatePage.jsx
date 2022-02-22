import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShichibukaiProvider } from '../../../Providers/ShichibukaiProvider'

export default function ShichibukaiUpdatePage() {
  const [shichibukai, setShichibukai] = useState({})
  const [formUpdate, setFormUpdate] = useState({
    id: '',
    prenom: '',
    nom: '',
    prime: '',
    photo: '',
    commentaire: '',
  })
  const shichibukaiProvider = new ShichibukaiProvider()
  const { id } = useParams()
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

    setFormUpdate(previous => {
      return { ...previous, photo: file.secure_url }
    })
  }

  useEffect(() => {
    let tmpShichibukai = shichibukaiProvider.getShichibukaiById(id)

    if (!tmpShichibukai) {
      alert('Shichibukai non trouvé dans la base')
      navigate('/shichibukai')
    } else {
      setShichibukai(tmpShichibukai)
      setFormUpdate(tmpShichibukai)
    }
  }, [id, navigate])

  function update(e) {
    e.preventDefault()
    let res = shichibukaiProvider.update(formUpdate)
    if (res) navigate('/shichibukai')
    else alert("Erreur lors de l'enregistrement")
  }

  function reset() {
    setFormUpdate(shichibukai)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Modifier un shichibukai</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => update(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Modifier le prenom"
                  value={formUpdate.prenom}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.prenom = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Modifier le nom"
                  value={formUpdate.nom}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.nom = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prime</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Modifier le montant de la prime"
                  value={formUpdate.prime}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.prime = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                />
              </Form.Group>

              <Form.Label>Commentaire</Form.Label>
              <FloatingLabel
                controlId="floatingTextarea"
                label="commentaire"
                className="mb-3"
                value={formUpdate.commentaire}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Modifier un commentaire"
                  value={formUpdate.commentaire}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.commentaire = e.target.value
                    setFormUpdate(tmp)
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
                variant="outline-secondary"
                className="float-end mx-2"
                type="reset"
                onClick={reset}
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
