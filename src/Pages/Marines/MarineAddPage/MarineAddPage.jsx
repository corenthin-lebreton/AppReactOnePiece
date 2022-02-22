import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MarinesProvider } from '../../../Providers/MarinesProviders'

export default function MarineAddPage() {


  const [image, setImage] = useState("")
  const [formAdd, setFormAdd] = useState({
    id: '',
    prenom: '',
    nom: '',
    grade: '',
    commentaire: '',
    photo: '',
  })

  const marinesProvider = new MarinesProvider()
  const navigate = useNavigate()


// Upload de L'image vers un cloud et le LocalStorage
// fonction asynchrone qui récupère l'image  vers le profil du cloud
const uploadImage = async e => {
  const files = e.target.files
  const data = new FormData()
  data.append('file', files[0])
  data.append('upload_preset', 'jxnellvh')

  //on attend la connexion avec l'api du cloud

  const res = await fetch("https://api.cloudinary.com/v1_1/firewax/image/upload",
  {
    method: 'POST',
    body:data
  })


  // on récupère le contenu de l'image en JSON dans la console
const file = await res.json()
// console.log(file)

// dans le photo du LS, on ajoute le lien de l'image ( secure_url) dans la catégorie photo pour l'upload dans le LocalStorage
setFormAdd((previous)=>{
    return {
      ...previous,
      photo:file.secure_url
    }
})

// console.log(image)

}

  function add(e) {
    e.preventDefault()
    marinesProvider.add(formAdd)
    navigate('/marines')
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Ajouter un membre de la marine</h1>
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
                <Form.Label>Grade</Form.Label>
                <Form.Select onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.grade = e.target.value
                    setFormAdd(tmp)}}
                    required
                    >
                  <option value ="">Choisissez un grade</option> 
                  <option>Amiral en Chef</option>
                  <option>Amiral</option>
                  <option>Vice-Amiral</option>
                  <option>Contre-Amiral</option>
                  <option>Commodore</option>
                  <option>Colonnel</option>
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
                  <option>Homme de Corvée</option>   

                 </Form.Select>
                </Form.Group>

              <Form.Label>Commentaire</Form.Label>

              <FloatingLabel
                controlId="floatingTextarea"
                label="commentaire"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Commentaire personnalisé"
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
                <Form.Control type="file"
                  onChange={uploadImage} 
                  
                /> 
              </Form.Group>

              <hr />

              <Button variant="light" as={Link} to="/marines">
                Retour
              </Button>

              <Button
                variant="outline-secondary"
                className="float-end mx-2"
                as={Link} to="/"
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

      <img src={image}></img>
    </>
  )
}