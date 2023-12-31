import { useState, useEffect } from "react";
import classnames from "classnames";
import { addProject } from "../../../services/apiProject";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";

export default function Landing() {
  /////cookies
  if (!Cookies.get("user")) {
    window.location.replace("/login-page");
  }

  const token = JSON.parse(Cookies.get("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  ////////
  const navigate = useNavigate();
  const param = useParams();
  const [InvestNotif, setInvestNotif] = useState(false);

  let formData = new FormData();
  const [image, setImage] = useState();
  const [message, setmessage] = useState();
  const [Project, setProject] = useState({
    title: "",
    description: "",
    domaine: "",
    goal: "",
    numberOfPeople: "",
    montant_Final: "",
    location: "",
    image_project: "",
  });
  const handlechange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
    console.log(Project);
  };
  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const add = async (e) => {
    toast.success(
      "Votre ajout est en cours de traitement. Veuillez ne pas paniquer si cette procédure prend un peu de temps. Votre description passe par une validation automatique par l\'IA.",
      { autoClose: 30000, position: "top-center" }
    );
    formData.append("title", Project.title);
    formData.append("description", Project.description);
    formData.append("domaine", Project.domaine);
    formData.append("goal", Project.goal);
    formData.append("numberOfPeople", Project.numberOfPeople);
    formData.append("montant_Final", Project.montant_Final);
    formData.append("location", Project.location);
    formData.append("image_project", image);
    const res = await addProject(formData, config)
      .then(console.log("ajout passe"))
      .catch((error) => {
        console.log(error.response.data.message);
      });
    console.log(res.data);
    console.log(res.data.message);
    setmessage(res.data.message);
    if (res.data.message == undefined) {
      delayFunction();
    }
  };
  function delayFunction() {
    setTimeout(function() {
      navigate(`/landing-page`)
        }, 1000); // 3000 ms = 3 secondes
  }
  return (
    <>
      <DemoNavbar /> <ToastContainer />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <div className="ml-9 text-success font-weight-bold">
                  Create Your Project
                </div>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" enctype="multipart/form-data">
                      <Form.Group>
                        <Form.Label>title projet :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="title projet"
                            type="text"
                            name="title"
                            onChange={(e) => handlechange(e)}
                            label="Titre du projet"
                            aria-label="Titre du projet"
                          />
                        </InputGroup>
                        {message === "title is already taken" ||
                        message === "title is a required field" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            title is already taken
                          </label>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="description"
                            type="text"
                            name="description"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                        {message ===
                        "description must contain min 4 characters max 50 characters" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            description must contain min 4 characters max 50
                            characters
                          </label>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Domaine :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Check
                            type="radio"
                            label="earthly"
                            name="domaine"
                            value="earthly"
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="oceanic "
                            name="domaine"
                            value="oceanic "
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="information technology "
                            name="domaine"
                            value="informatique "
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="health and medicine  "
                            name="domaine"
                            value="health"
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="art and culture "
                            name="domaine"
                            value="Art&culture"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Label>Goal :</Form.Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-time-alarm" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Social"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Social</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Economy"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Economy</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Environment"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Environment</label>
                        </div>
                      </InputGroup>
                      <Form.Group>
                        <Form.Label>number Of People :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="numberOfPeople"
                            name="numberOfPeople"
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                        {message ===
                        "The numberOfPeople must be a positive number max 100 min 10" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            The numberOfPeople must be a positive number min 10
                            max 100
                          </label>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>final amount :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            min={1000}
                            placeholder="final amount"
                            name="montant_Final"
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                        {message ===
                          "The montant_Final must be a positive number min 1000 dt" ||
                        'montant_Final must be a `number` type, but the final value was: `NaN` (cast from the value `""`).' ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            "The montant_Final must be a positive number min
                            1000 dt"
                          </label>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Location :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="location"
                            name="location"
                            type="text"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>picture :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="image_project"
                            name="image_project"
                            type="file"
                            onChange={(e) => handlechangeFile(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Row className="my-4">
                        <Col xs="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span>
                                I agree with the
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="button"
                          onClick={(e) => add(e)}
                        >
                          Create Project
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
