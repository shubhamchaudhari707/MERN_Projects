import React, { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import {Container} from "react-bootstrap"


const EmpDetails = () => {

    const {empid} = useParams();
    console.log(empid)
    const [empdata, setEmpData]=useState("")

    useEffect(()=>{
        fetch("http://localhost:3001/employee/"+empid).then((result) => {
            return result.json();
        }).then((resp)=>{
            setEmpData(resp)
            
        }).catch((err) => {
            console.log(err)
        });
    }, [empdata])

  return (
    <>
        <Container>
            {   
                empdata && <div>
                    <h1>Emp ID : {empdata.id}</h1>
                    <h1>Epm Name : {empdata.name}</h1>
                    <h1>Emp Email : {empdata.email}</h1>
                    <h1>Emp Phone : {empdata.phone}</h1>
                    <hr />
                    <Link to="/" className="btn btn-success">Back</Link>
                </div>
            }
        </Container>
    </>
  )
}

export default EmpDetails