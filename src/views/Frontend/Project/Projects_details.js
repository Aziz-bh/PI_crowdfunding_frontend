import { useState, useEffect } from "react";
import { getUserAuth } from "../../../services/apiUser.js";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Progress,
  Media,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { getProject } from "../../../services/apiProject";
import { getUser } from "../../../services/apiUser";
import { getlisteInverstors } from "../../../services/apiInvest";
import { differenceInYears } from "date-fns";

export default function Landing() {
  const navigate = useNavigate();
  const param = useParams();
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

  const [project, setProject] = useState([]);
  const [invests, setInvests] = useState([]);

  const [user, setuser] = useState([]);
  const [userAuth, setuserAuth] = useState([]);

  useEffect(() => {
    getoneProject(config);
    getCreator(config);
    getAllInvest(config);
    getUserFunction(config);

    const interval = setInterval(() => {
      getoneProject(config);
      getUserFunction(config);
    }, 1000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);
  const getoneProject = async (config) => {
    const res = await getProject(param.id, config)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllInvest = async (config) => {
    const res = await getlisteInverstors(param.id, config)
      .then((res) => {
        setInvests(res.data.invests);
        console.log(res.data.invests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function getCreator(config) {
    const res = await getUser(param.iduser, config)
      .then((res) => {
        setuser(res.data.user);
        countProject(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getUserFunction = async (config) => {
    const res = await getUserAuth(param.id, config)
      .then((res) => {
        setuserAuth(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function moyenne(entier1, entier2) {
    const moyenne = (entier1 / entier2) * 100;
    return Math.floor(moyenne);
  }
  function calculerDureeDeVie(dateDeCreation) {
    const dateDeCreationObjet = new Date(dateDeCreation);
    const maintenant = new Date();
    const differenceEnMilliseconds =
      maintenant.getTime() - dateDeCreationObjet.getTime();
    const differenceEnSecondes = Math.floor(differenceEnMilliseconds / 1000);
    const differenceEnMinutes = Math.floor(differenceEnSecondes / 60);
    const differenceEnHeures = Math.floor(differenceEnMinutes / 60);
    const differenceEnJours = Math.floor(differenceEnHeures / 24);
    const differenceEnMois = Math.floor(differenceEnJours / 30);
    const differenceEnAnnees = Math.floor(differenceEnMois / 12);
    return `${differenceEnJours % 30} jours ${differenceEnHeures % 24} Heures ${
      differenceEnMinutes % 60
    } Minutes et ${differenceEnSecondes % 60} Seconds `;
  }
  const countProject = (projects) => {
    return projects.length;
  };
  const AfficherDateDeNaissance = (dateOfBirth) => {
    const date = moment(dateOfBirth);
    const mois = date.format("MM");
    const jour = date.format("DD");
    const annee = date.format("YYYY");
    return "" + annee + "/" + mois + "/" + jour + "";
  };
  function isMontantActuelGreaterOrEqual(project) {
    console.log(project.creator, userAuth._id);
    return (
      project.montant_actuel >= project.montant_Final ||
      project.numberOfPeople <= project.numberOfPeople_actuel ||
      project.creator == userAuth._id
    );
  }
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg pb-50">
            <Row className=" justify-content-right">
              <Col lg="10">
                <div class="d-flex align-items-center">
                  <div class="mr-1"></div>
                  <div class="mx-1">
                    <h2 className="display-3 text-capitalize text-info ml-5 ">
                      {project.title}
                    </h2>
                  </div>
                  <div className=" icon-shape rounded-circle mb-4">
                    {/* <i className="ni ni-check-bold" /> */}
                    <Media className="align-items-center justify-content-end ml-5 ml-9">
                      <a className="avatar ml-9">
                        <img
                          src={`http://localhost:5000/images/${project.image_project}`}
                          style={{
                            width: "200px",
                            height: "200px",
                            display: "block",
                            margin: "10 auto",
                          }}
                        />
                      </a>
                    </Media>
                  </div>
                </div>
                <div className="font-weight-bold">
                  <div class="d-flex align-items-center">
                    <div class="mr-1">Description</div>
                    <i
                      class="fa fa-text-height mr-2 ml-2"
                      aria-hidden="true"
                    ></i>
                    :
                    <h2 className="text-white  mr-8 ml-2 my-4">
                      {project.description}
                    </h2>
                  </div>
                </div>
                <div className="font-weight-bold">
                  <i class="fa fa-pie-chart mr-2 ml-2" aria-hidden="true"></i>{" "}
                  Domain :
                  <Badge color="success" pill className="text-white mr-5 ml-5">
                    {project.domaine}
                  </Badge>
                  <i class="fa fa-star mr-2 ml-2" aria-hidden="true"></i>
                  Goal :
                  <Badge color="warning" pill className="text-white  mr-5 ml-5">
                    {project.goal}
                  </Badge>
                  <i class="fa fa-map-marker mr-2 ml-2" aria-hidden="true"></i>
                  location :
                  <Badge color="info" pill className="text-white  mr-5 ml-2">
                    {project.location}
                  </Badge>
                  <br></br>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">Duration</div>
                    <div class="mx-1">
                      <i class="fa fa-clock-o mr-2" aria-hidden="true"></i>:
                    </div>
                    <h2 className="text-white  mr-5 ml-2">
                      {calculerDureeDeVie(project.created_at)}
                    </h2>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">current amount</div>
                    <div class="mx-1">
                      <i class="fa fa-money mr-2" aria-hidden="true"></i>:
                    </div>
                    <h2 className="text-white  mr-5 ml-2">
                      {project.montant_actuel} $
                    </h2>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">
                      <i class="fa fa-street-view mr-2" aria-hidden="true"></i>
                      Creator
                    </div>
                    <div class="mx-1">:</div>
                    <h2 className="text-white  mr-5 ml-2">
                      <a
                        className="mt-2"
                        outline
                        type="button"
                        onClick={(e) =>
                          navigate(`/ProfileUserProject/${user._id}`)
                        }
                      >
                        {user.username}
                      </a>
                    </h2>
                    <img className="avatar avatar-sm rounded-circle "
                      src={`http://localhost:5000/images/${user.image_user}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        display: "block",
                      }}
                    />
                    <div class="mr-1 ml-4">
                      <i
                        class="fa fa-calendar-o mr-2 ml-2"
                        aria-hidden="true"
                      ></i>
                      Age
                    </div>
                    <div class="mx-1">:</div>
                    <h2 className="text-white  mr-5 ml-2">
                      {differenceInYears(
                        new Date(),
                        new Date(user.dateOfBirth)
                      )}
                    </h2>
                  </div>
                </div>{" "}
                <div class="d-flex align-items-center">
                  <div class="mr-1">investor</div>
                  <div class="mx-1">
                    <i class="fa fa-clock-o mr-2" aria-hidden="true"></i>:
                  </div>
                  {invests.map((Invest) => (
                    <Media className="align-items-center ">
                      <span
                        className="avatar avatar-sm rounded-circle "
                        key={Invest._id}
                      >
                        <img
                          alt="..."
                          src={`http://localhost:5000/images/${Invest.image_user}`}
                        />
                      </span>
                    </Media>
                  ))}
                </div>
                <div className="progress-wrapper">
                  <div className="progress-info">
                    <div className="progress-label">
                      <span>
                        Task completed : .
                        {moyenne(project.montant_actuel, project.montant_Final)}{" "}
                        %
                      </span>
                    </div>
                    <div className="progress-percentage">
                      <span>
                        {project.montant_actuel}/{project.montant_Final}
                        <i className="fa fa-usd mr-2 ml-2" />
                      </span>
                    </div>
                  </div>
                  <Progress
                    max={project.montant_Final}
                    value={project.montant_actuel}
                    color="success"
                  />
                  {project.numberOfPeople_actuel}/{project.numberOfPeople}
                  <i className="fa fa-users mr-2 ml-2" />
                </div>
              </Col>
              <Button
                disabled={isMontantActuelGreaterOrEqual(project)}
                className="btn-1 ml-1 mt-4"
                color="success"
                outline
                type="button"
                onClick={(e) => navigate(`/AddInvest/${project._id}`)}
              >
                <i class="fa fa-cubes mr-2" aria-hidden="true"></i>
                Invest
              </Button>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
