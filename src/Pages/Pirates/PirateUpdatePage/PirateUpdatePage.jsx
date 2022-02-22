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
import { PiratesProvider } from '../../../Providers/PiratesProvider'

export default function PirateUpdatePage() {
  const [pirate, setPirate] = useState({})
  const [formUpdate, setFormUpdate] = useState({
    id: '',
    prenom: '',
    nom: '',
    equipage: '',
    prime: '',
    photo: '',
    commentaire: '',
  })

  const piratesProvider = new PiratesProvider()
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
    let tmpPirate = piratesProvider.getPirateById(id)

    if (!tmpPirate) {
      alert('Pirate non trouvé dans la base')
      navigate('/pirates')
    } else {
      setPirate(tmpPirate)
      setFormUpdate(tmpPirate)
    }
  }, [id, navigate])

  function update(e) {
    e.preventDefault()
    let res = piratesProvider.update(formUpdate)
    if (res) navigate('/pirates')
    else alert("Erreur lors de l'enregistrement")
  }

  function reset() {
    setFormUpdate(pirate)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Modifier un pirate</h1>
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
                <Form.Label>Équipage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Modifier le nom de l'équipage"
                  value={formUpdate.equipage}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.equipage = e.target.value
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

              <Button variant="light" as={Link} to="/pirates">
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
