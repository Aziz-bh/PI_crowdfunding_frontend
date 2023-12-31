import {      Card,    CardHeader,    CardFooter,      Media,
    Pagination,    PaginationItem,    PaginationLink,     Table,    Container,    Row,    UncontrolledTooltip,    Button } from "reactstrap";
  // core components
  import Header from "components/Headers/Header";
  import { useNavigate } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';

import AdminFablab from "./AdminFablab";


  const AdminFablabJoin = () => {
    const navigate = useNavigate();
    const [fablabs, setFablabs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [disable, setDisable] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [nonAccepted, setNonAccepted] = useState(false);
    const[is_accepted , setIsAccepted]= useState(null);
    const[is_treated,setIsTreated]=useState(null);
    const[message,setMessage]=useState(null)
    const getAllFablabs=async(url)=>{

        console.log(url);
        
       const res = await axios.get(url).then(res => {
            console.log(res.data);
              setFablabs(res.data.fablabs);
              setTotalPages(res.data.totalPages);  
              setMessage(null);
          })
          .catch(err => {
            console.log(err);
            setMessage(err);
          });
      }

      useEffect(() => {
        getAllFablabs(`http://localhost:5000/fablabs/requests?page=${currentPage}`); 
       
      }, [currentPage]);

      const handlePageClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
      };
    
      const renderPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
              <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        return items;
      };

      const treatedFunction=()=>{
        getAllFablabs(`http://localhost:5000/fablabs/requests?is_treated=true`); 
        setDisable(false);
        setIsTreated(true);
      };

      const nonTreatedFunction=()=>{
        getAllFablabs(`http://localhost:5000/fablabs/requests?is_treated=false`); 
        setDisable(true);
        setIsTreated(false);
        setAccepted(false);
        setNonAccepted(false);

        
        
      };
      const allFunction=()=>{
        getAllFablabs(`http://localhost:5000/fablabs/requests?page=${currentPage}`)
        setDisable(true);
        setIsTreated(false);
        setAccepted(false);
        setNonAccepted(false);
      
      };
      
      const handleAcceptedChange = (e) => {
        getAllFablabs(`http://localhost:5000/fablabs/requests?is_treated=true&is_accepted=true`); 
        setAccepted(e.target.checked);
        setNonAccepted(false);
        setIsAccepted(true);
       
        
      };
      
      const handleNonAcceptedChange = (e) => {
        getAllFablabs(`http://localhost:5000/fablabs/requests?is_treated=true&is_accepted=false`); 
        setNonAccepted(e.target.checked);
        setAccepted(false);
        setIsAccepted(false);
      
      };
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-1" fluid>
          {/* Table */}
          <Row>
            <div className="col-2">
              <Card className="shadow" style={{ width: "240px" }}> 
                <Table className="align-items-center table-flush mt-2" responsive>
                <thead className="thead-light "  style={{ height: "58px" }}>
                  <tr>
                    <th scope="col"  style={{ fontSize : "20px"}}>Filter</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="All"
                            type="radio"
                            name="custom-radio-2"
                            onClick={allFunction}
                          />
                          <label className="custom-control-label" htmlFor="All">
                              All
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th scope="row">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="NonTreated"
                            type="radio"
                            name="custom-radio-2"
                            onClick={nonTreatedFunction}
                          />
                          <label className="custom-control-label" htmlFor="NonTreated">
                              Non Treated
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="Treated"
                            type="radio"
                            name="custom-radio-2"
                            onClick={treatedFunction}
                          />
                          <label className="custom-control-label" htmlFor="Treated">
                             Treated
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="Accepted"
                            type="radio"
                            name="custom-radio-3"
                            disabled={disable}
                            checked={accepted}
                            onClick={handleAcceptedChange}

                          />
                          <label className="custom-control-label" htmlFor="Accepted">
                              Accepted
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="NonAccepted"
                            type="radio"
                            name="custom-radio-3"
                            disabled={disable}
                            checked={nonAccepted}
                            onClick={handleNonAcceptedChange}
                          />
                          <label className="custom-control-label" htmlFor="NonAccepted">
                          Non Accepted
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                
                </tbody>
              </Table>
              </Card>
            </div>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Fablab Requests</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Fablab</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Address</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>{!message ? (<> {fablabs.map(fablab => (
                    <tr key={fablab._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                            <img
                             className="avatar rounded-circle mr-3"
                              alt="..."
                              src={`http://localhost:5000/images/${fablab.fablbLogo}`}
                            />
                        
                          <Media>
                            <span className="mb-0 text-sm">
                              {fablab.fablabName}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{fablab.fablabEmail}</td>
                      <td>
                      {fablab.phoneNumber}
                      </td>
                      <td>
                        {fablab.address}
                      </td>
                      <td>
                        <div className="avatar-group">
                         {fablab.is_treated ? (<>
                          <a
                            className="avatar avatar-sm"
                           
                            id="treated"
                          
                            style={{backgroundColor: '#2DCE89' , cursor: "help"}}
                          >
                             <span className="rounded-circle"  >
                                <i class="fa fa-eye" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                              </span>

                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="treated"
                          >
                            Treated
                          </UncontrolledTooltip>
                          {fablab.is_accepted ?(<><a
                            className="avatar avatar-sm"
                           
                            id="accepted"
                          
                            style={{backgroundColor: '#2DCE89' , cursor: "help"}}
                          >
                             <span className="rounded-circle"  >
                                <i class="fa fa-check " style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                              </span>

                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="accepted"
                          >
                            Accepted
                          </UncontrolledTooltip></>):(<><a
                                      className="avatar avatar-sm"
                                
                                      id="notaccepted"
                                      style={{backgroundColor: '#f5365c' , cursor: "help"}}
                                    >
                                      <span className="rounded-circle"  >
                                          <i class="fa fa-times" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                                        </span>
                                    </a>
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="notaccepted"
                                    >
                                      Not Accepted
                                    </UncontrolledTooltip></>)}
                         </>):(<>
                         <a
                                      className="avatar avatar-sm"
                                
                                      id="nottreated"
                                      style={{backgroundColor: '#f5365c' , cursor: "help"}}
                                    >
                                      <span className="rounded-circle"  >
                                          <i class="fa fa-eye-slash" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                                        </span>
                                    </a>
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="nottreated"
                                    >
                                      Not Treated
                                    </UncontrolledTooltip>
                         </>)}
                          

                       
                        </div>
                      </td>
                      <td>
                      <Button
                          
                          color="Primary"
                          style={{backgroundColor:"#5E72E4",color:"#ffff"}}
                          size="sm"
                          onClick={(e) => navigate(`/FablabRequestDetails/${fablab._id}`)}
                       >
                        More Details
                      </Button>
                      </td>
                    </tr>
                   ))}</>) :(<><h4>No records found </h4></>)}
                 
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem className={currentPage === 1 ? 'disabled' : ''}>
                        <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, currentPage - 1)} tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {renderPaginationItems()}
                      <PaginationItem className={currentPage === totalPages ? 'disabled' : ''}>
                        <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, currentPage + 1)}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        
        </Container>
        <AdminFablab />
      </>
    );
  };
  
  export default AdminFablabJoin;
  