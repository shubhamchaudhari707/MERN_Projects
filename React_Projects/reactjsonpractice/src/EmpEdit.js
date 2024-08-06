import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EmpEdit = () => {
  const navigate = useNavigate();

  const { empid } = useParams();
  // console.log(empid)
  // const [empdata, setEmpData]=useState("")

  const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/employee/" + empid)
      .then((result) => {
        return result.json();
      })
      .then((resp) => {
        setid(resp.id);
        setName(resp.name);
        setEmail(resp.email);
        setPhone(resp.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();

    const empdata = {  name, email, phone };

    fetch(`http://localhost:3001/employee/` + empid,  {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("save");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row>
        <Col>
          <div className="container text-center w-90px">
            <div className="card">
              <div className="card-title">
                <h1>Emplyee Edit details</h1>
              </div>

              <div className="card-body">
                <form onSubmit={submitHandle}>
                  <div className="form-group mt-3">
                    <label htmlFor="">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={id}
                      onChange={(e) => setid(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="">Phone</label>
                    <input
                      type="phone"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="m-2 p-2">
                    <Button variant="success" type="submit">
                      {" "}
                      save
                    </Button>
                    <Link to="/" className="btn btn-danger m-2">
                      {" "}
                      Back
                    </Link> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Col>
        <Col>kjdh</Col>
      </Row>
    </>
  );
};

export default EmpEdit;
