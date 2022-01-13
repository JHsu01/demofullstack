import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { DropdownButton, Dropdown, FormCheck } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "bootstrap/dist/css/bootstrap.min.css";


const Landing = () => {

    const [data, setData] = useState([]);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [supervisor, setSupervisor] = useState("");

    async function HandleGetManagers() {
        const result = await axios.get("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers");

        let raw_data = result.data;
        raw_data.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
        raw_data.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
        raw_data.sort((a, b) => a.jurisdiction > b.jurisdiction ? 1 : -1);
        setData(raw_data);

        console.log(raw_data);


    }

    async function HandlePost() {
        axios.post('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            supervisor: supervisor
        })

        
            .then(function (response) {
                console.log(firstName, lastName, email, phoneNumber, supervisor);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    let pattern = /[^0-9]/g;

    let submitbutton = <div class>
        
        <Button onClick={() => HandlePost()}> Submit </Button>
    </div>

    let signupform = 
        <div class>
            <h1> Made by Joseph Hsu</h1>
            <span> &nbsp; </span>
            <Row>
            <Col><Form.Control placeholder='First Name' onChange={(e) => setfirstName(e.target.value)} required/></Col>
            <br></br>
            <Col><Form.Control placeholder='Last Name' onChange={(e) => setlastName(e.target.value)} required/></Col>
            <br></br>
            </Row>
            <span> &nbsp; </span>
            
           <Row>
               <br></br><br></br>
               <span> &nbsp; </span>
               <p>How would you prefer to be notified?</p>
               <Col>
               <Form.Check type="checkbox" label="Email" />
               <Form.Control placeholder='Email' classname="form-control" required onChange={(e) => setEmail(e.target.value)} />
               </Col>
               
               <Col>
               <Form.Check type="checkbox" label="phone number" />
               <Form.Control placeholder='Phone Number' onChange={(e) => setphoneNumber(e.target.value)} />
               </Col>
               <span> &nbsp; </span>
           </Row>

          
            

           <span> &nbsp; </span>
            
            
                        


        </div>
    
   
    let dropdown = <DropdownButton variant="success"  id="dropdown-basic" title={supervisor} onClick={() => HandleGetManagers()} >
        { data.map((element) => element.jurisdiction.match(pattern) ? <Dropdown.Item onClick={(e) => setSupervisor(element.firstName)} >{element.jurisdiction} - {element.lastName}, {element.firstName}  </Dropdown.Item> : "")}
        

    </DropdownButton>

    

    return (
        <div class = "form">
            
            {signupform}
            <div class = "center">
            <br></br>
            <Row>
                <Col>
                </Col>
                <Col>
                <p>Supervisor</p>
                {dropdown}
                </Col>
                <Col>
                </Col>
            </Row>
            
            <br></br>
            {submitbutton}
            </div>

            
        </div>
    );
}

export default Landing