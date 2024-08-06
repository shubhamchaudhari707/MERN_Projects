import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const Register = () => {

    const [name, setName] = useState("");
    const [file, setFile] = useState("");

    const navigate = useNavigate();

    const addUserData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("photo", file);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const res = await axios.post("http://localhost:5000/register", formData, config);
        console.log(res)

        if (res.status == 200) {
            navigate("/")
        } else {
            alert("error")
        }

    }

    return (
        <>
            <div className='container mt-3'>
                <h1>Upload your Img Here</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Choose a file </Form.Label>
                        <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={addUserData}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register