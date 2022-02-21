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
import { MarinesProvider } from '../../Providers/MarinesProviders'

export default function MarineUpdatePage() {
  const [marine, setMarine] = useState({})
  const [formUpdate, setFormUpdate] = useState({
    id: '',
    prenom: '',
    nom: '',
    grade: '',
    photo: '',
    commentaire: '',
  })
  const marinesProvider = new MarinesProvider()
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
    let tmpMarine = marinesProvider.getMarineById(id)

    if (!tmpMarine) {
      alert('Marine non trouvé dans la base')
      navigate('/marines')
    } else {
      setMarine(tmpMarine)
      setFormUpdate(tmpMarine)
    }
  }, [id, navigate])

  function update(e) {
    e.preventDefault()
    let res = marinesProvider.update(formUpdate)
    if (res) navigate('/marines')
    else alert("Erreur lors de l'enregistrement")
  }

  function reset() {
    setFormUpdate(marine)
  }


return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Modifier un membre de la marine</h1>
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
                <Form.Label>Grade</Form.Label>
                <Form.Select
                  value={formUpdate.grade}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.grade = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                >
                  <option value="">Choisissez un grade</option>
                  <option>Amiral en chef</option>
                  <option>Amiral</option>
                  <option>Vice-Amiral</option>
                  <option>Contre-Amiral</option>
                  <option>Commodore</option>
                  <option>Colonel</option>
                  <option>Commandant</option>
                  <option>Lieutenant-Colonel</option>
                  <option>Lieutenant</option>
                  <option>Vice-Lieutenant</option>
                  <option>Sous-Lieutenant</option>
                  <option>Major</option>
                  <option>Sergent-Chef</option>
                  <option>Sergent</option>
                  <option>Caporal</option>
                  <option>Matelot 1ère classe</option>
                  <option>Matelot 2ème classe</option>
                  <option>Matelot 3ème classe</option>
                  <option>Homme de corvée</option>
                </Form.Select>
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
                  placeholder="Modifier le commentaire"
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

              <Button variant="light" as={Link} to="/marines">
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
