import React, { useEffect, useState } from "react";
import {

  getUserAuth,
} from "../../../services/apiUser";
import { useNavigate, useParams , useLocation } from "react-router-dom";

import { getProjects  } from "../../../services/apiProject";
import Cookies from "js-cookie";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { Card, Container,Alert} from "reactstrap";

import { v4 as uuidv4 } from 'uuid';


import { getEvaluation ,getTopEvaluations } from "../../../services/apiEvaluation";

import { getTBadge } from "../../../services/apiBadges";
import ProfileDetails from "./profileDetails";
import ProjectProfile from "./projectProfile";

import axios from "axios";

const Profile = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainRef.current.scrollTop = 0;
  }, []);

  const mainRef = React.createRef();
  const [profileVisible , setProfileVisible]=useState(true)
  const [projectVisible , setProjectVisible]=useState(false)
  const [InvestVisible , setInvestVisible]=useState(false)
  const [eventVisible , setEventVisible]=useState(false)

  const [nbP,setNbP]=useState(0)
  const [nbI,setNbI]=useState(0)
  const location= useLocation();
  const exist = location.state ? location.state.e : null;


  const [refresh, setRefresh] = useState(uuidv4());

  useEffect(() => {
    setRefresh(uuidv4()); // Trigger refresh when component mounts or location changes
  }, [location]);

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

  //const param = useParams();
  const [projects, setProjects] = useState([]);
  const[events,setEvent]= useState([]);
  const[connected,setConnected]= useState(false);

  const [evaluation, setEvaluation] = useState({
    usernameE: "", // Utiliser le même nom de propriété que dans localStorage
    xp: 0,
    lvl: 0,
  });
  const { usernameE, xp, lvl } = evaluation;

  const [badge, setBadge] = useState({
    usernameB: "", // Utiliser le même nom de propriété que dans localStorage
    badgeName: "",
    badgeDescription: "",
    date: "",
    badgeImg: "",
  });
  const { usernameB, badgeName, badgeDescription, date, badgeImg } = badge;

  const [user, setUser] = useState([]);
  const { _id, username, first_Name, last_Name, email, phoneNumber, address } =
    user;
    const Projects = async (config,project) => {
      console.log(project)
      if(project === true){
        const res = await getProjects(config)
        .then((res) => {
          const verifiedProjects = res.data.projects.filter((project) =>  project.creator === user._id );
         
            setProjects(verifiedProjects);
          
          
        })
        .catch((err) => {
          console.log(err);
        });

      }else if (project === false){
        const res = await axios.get(`http://localhost:5000/users/projects/${user._id}`)
        .then((res) => {
         
            setProjects(res.data.projects);
           
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
     
    };




    
 
    useEffect(() => {
      let isMounted = true;
   
  
      const getUserFunction = async () => {
        try {
          /////cookies
          let response;
          
          response = await getUserAuth("", config);
          const res= await axios.get(`http://localhost:5000/fablabs`);
          ////////
          let  userL ;
            // Check if the component is still mounted before updating the state
          if (isMounted) {
            if(exist){
              setConnected(false)
              setUser(exist);
              setNbP(exist.events.length);
              setNbI(exist.invests.length);
              userL = exist.username;
              setEvent(exist.events)
            }else{
              setConnected(true);
              if(response.data.user.userType === "fablab")
              {
                const fab = res.data.fablabs.filter((fablab) =>  fablab._id === response.data.user._id )[0];
                setUser(fab)
                setNbP(fab.events.length)
                setNbI(fab.invests.length);
                userL = fab.username;
                setEvent(fab.events)
  
              }else{
                setUser(response.data.user);
                setNbP(response.data.user.projects.length);
                setNbI(response.data.user.invests.length);
                userL = response.data.user.username;
              }
               
            }
          }
          //console.log(user)
          //evaluation---------
          const response1 = await getEvaluation(userL, config);
          // Supposons que la réponse contient un champ 'evaluations' avec un tableau d'évaluations
          const firstEvaluation = response1.data.evaluations[0]; // Accéder à la première évaluation
          setEvaluation(firstEvaluation);
    
          const response2 = await getTBadge(userL); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
          console.log(response2.data.badges)
          setBadge(response2.data.badges); // Supposons que la réponse contient un champ 'badges' avec un tableau d'objets de badges
  
  
          //------------
        } catch (error) {
          console.log(error);
        }
      };
     
      getTEvaluations();
      getUserFunction();
     
      return () => {
        isMounted = false;
      };
    }, []);

  const [evaluations, setEvaluations] = useState([]);





  const getTEvaluations = async () => {
    try {

      const res = await getTopEvaluations({});
      setEvaluations(res.data);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  //evaluation
  /*
  const fetchEvaluation = async () => {
    try {
      const response = await getEvaluation(username, config);
      // Supposons que la réponse contient un champ 'evaluations' avec un tableau d'évaluations
      const firstEvaluation = response.data.evaluations[0]; // Accéder à la première évaluation
      setEvaluation(firstEvaluation);
    } catch (error) {
      console.log(error);
    }
  };*/



  return (
    <>
      <DemoNavbar />
      
      <main className="profile-page" ref={mainRef}>
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        
        <section className="section">
          
          <Container style={{display: "flex",flexWrap: "wrap"}}>
          
            <Card className="card-profile shadow mt--300 col ml--9" style={{flex: 1 ,maxWidth:"100%" }} >
              
              {profileVisible && <ProfileDetails  key={refresh.toString()} user={user} evaluation={evaluation} badge={badge} nbI={nbI} nbP={nbP}  isConnected={connected}/>}
              
              {projects && (<>
                  {projectVisible && <ProjectProfile  key={refresh.toString()}  paragraph="These are the projects that this User creates" projects={projects}  user={user}/>}
                  {InvestVisible && <ProjectProfile  key={refresh.toString()} paragraph="These are the projects that this User invests in" projects={projects} user={user} />}
                  </>)}
              {user.userType === "fablab" && (events && (eventVisible &&  <ProjectProfile  key={refresh.toString()} paragraph="These are the Events that this Fablab creates" projects={events} user={user} events={true}/>) 
               )}
            </Card>
          
            <Card style={{ maxWidth:"30%" ,height:"520px",flex: 1,marginRight:"-250px"}} className="card-profile shadow mt--300 col-2 ml-2 ">
                <div >
                  <br/>
                    <h3>👑TOP 3 USERS👑</h3>
                    {evaluations && evaluations.map((type,index) => (
                        <div>
                          <div className="progress-wrapper">
                            <div className="progress-info">
                              <div className="progress-label">
                              <text>⚡ {type.usernameE}  </text>
                                {index === 0 && (     
                                <span style={{ background:"#1A3A46",opacity:1,borderRadius: "30px",padding: "0.25rem 1rem",color:"white"}} >  LEVEL: {type.lvl} </span>
                                )}
                                {index === 1&& (     
                                <span style={{ background:"#386857",opacity:1,borderRadius: "30px",padding: "0.25rem 1rem",color:"white"}} >  LEVEL: {type.lvl} </span>
                                )}
                                {index === 2 && (     
                                <span style={{ background:"#738564",opacity:1,borderRadius: "30px",padding: "0.25rem 1rem",color:"white"}} >  LEVEL: {type.lvl} </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                          ))}
                         
                </div>
                <div className="mt-4 py-1" style={{borderTop:"0.1rem solid #1A3A46"}} > 

                    <div className="mt-3 py-1" > 
                      {user.userType === "fablab" ? (
                         <Alert color="danger" style={{cursor:"pointer"}} onClick={(e)=> {setEventVisible(true);setProjectVisible(false);setProfileVisible(false);setInvestVisible(false);}}>
                         <strong>Show Events</strong>
                       </Alert>
                      ):(<Alert color="danger" style={{cursor:"pointer"}} onClick={(e)=> {setEventVisible(false);setProjectVisible(true);setProfileVisible(false);setInvestVisible(false);Projects(config,true)}}>
                        <strong>Show Projects</strong>
                      </Alert>)}
                     
                    </div>
                    <div className="mt-1 py-1" > 
                    <Alert color="danger" style={{cursor:"pointer"}}  onClick={(e)=> {setEventVisible(false);setProjectVisible(false);setProfileVisible(false);setInvestVisible(true);Projects(config,false)}}>
                      <strong>Show Invests</strong>
                    </Alert>
                    </div>
                    <div className="mt-1 py-1" > 
                    <Alert color="danger" style={{cursor:"pointer"}}  onClick={(e)=> {setEventVisible(false);setProjectVisible(false);setProfileVisible(true);setInvestVisible(false)}}>
                      <strong>Profile</strong>
                    </Alert>
                    </div>
                </div>

            </Card>
          </Container>
        </section>
      </main>
    
      </>
                  );
  }
export default Profile ;