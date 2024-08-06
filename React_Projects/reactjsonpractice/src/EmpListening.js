import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmpListening = () => {
  const [empdata, setemp] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const categoryList = ["smartphones", "laptop", "smartphones"];

  useEffect(() => {
    fetch("http://localhost:3001/employee")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setemp(data);
        console.log(empdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filterdata = empdata.filter((item) => {
      item.name.toLowerCase().includes(searchVal.toLowerCase());
    });

    setemp(filterdata);
  }, []);

  const deleteData = (id) => {
    fetch("http://localhost:3001/employee/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        alert("Removed sucessfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-title text-center">
            <h2>Employee Listening</h2>
          </div>

          <div className="card-body">
            <div>
              <Link to="/employee" className="btn btn-success ">
                Create
              </Link>
            </div>

            <div>
              <Form inline>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="m-3"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                {/* <button className="btn btn-success" onClick={handleSearchClick}>Submit</button> */}
              </Form>
            </div>

            <table className="table table-border">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {empdata &&
                  empdata
                    .filter((item) => {
                      return searchVal.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(searchVal);
                    })
                    .map((emp) => {
                      return (
                        <>
                          <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>
                              <Link
                                to={`/empedit/${emp.id}`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>

                              <Button
                                variant="danger"
                                type="submit"
                                onClick={() => deleteData(emp.id)}
                              >
                                Delete
                              </Button>
                              <Link
                                to={`/empdetail/${emp.id}`}
                                className="btn btn-success"
                              >
                                Detail
                              </Link>
                            </td>
                          </tr>
                        </>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpListening;
