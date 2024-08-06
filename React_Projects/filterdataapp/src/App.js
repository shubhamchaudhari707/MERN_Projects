import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortorderData, setsortorderData] = useState("ASC");

  const category = ["mobiles", "smartphones", "laptop"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loaduserData = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const datafilter = data.filter((item) => {
        return value.toLocaleLowerCase() === ""
          ? item
          : item.name.toLowerCase().includes(value);
      });

      setData(datafilter);
    } catch (error) {
      console.log(error);
    }
  };

  // category filter
  const handleFilter = (category) => {
    setSelectedCategory(category);

    const filtered = data.filter((item)=>{
      return (
        item.category === category
      )
    })
    setData(filtered);
  };

  
  

  useEffect(() => {
    loaduserData();
  }, [setData]);

  // console.log(data);

  const handleReset = (e) => {
    loaduserData();
  };

  // sorting
  const sorting = (col) => {
    if (sortorderData === "ASC") {
      const sorted = [...data].sort((a, b) => {
        if (a[col].toLowerCase() > b[col].toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
      setData(sorted);
      setsortorderData("DSC");
    }

    if (sortorderData === "DSC") {
      const sorted = [...data].sort((a, b) => {
        // a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        if (a[col].toLowerCase() < b[col].toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
      setData(sorted);
      setsortorderData("ASC");
    }
  };

  

  return (
    <>
      <MDBContainer>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          className="d-flex input-group w-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <MDBBtn color="dark" type="submit">
            Search
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="info"
            className="mx-2"
            onClick={() => handleReset()}
          >
            Reset
          </MDBBtn>
        </form>

        <div style={{ marginTop: "100px" }}>
          <MDBRow>
            <h2 className="text-center">Search, filter, sort , pagination</h2>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead className="table-dark">
                  <tr>
                    <th scope="col" onClick={() => sorting("id")}>
                      NO
                    </th>
                    <th scope="col" onClick={() => sorting("name")}>
                      Name
                    </th>
                    <th scope="col" onClick={() => sorting("email")}>
                      Email
                    </th>
                    <th scope="col" onClick={() => sorting("phone")}>
                      Phone
                    </th>
                    <th scope="col" onClick={() => sorting("address")}>
                      Address
                    </th>
                    <th scope="col" onClick={() => sorting("status")}>
                      Status
                    </th>
                    <th scope="col" onClick={() => sorting("status")}>
                      Category
                    </th>
                  </tr>
                </MDBTableHead>

                {data &&
                  data.map((item, index) => {
                    return (
                      <>
                        <MDBTableBody key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.status}</td>
                            <td>{item.category}</td>
                          </tr>
                        </MDBTableBody>
                      </>
                    );
                  })}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>

        <hr />

        <div className="filter-container">
          <div>Filter by Category:</div>
          <div>
            <select
              name="category-list"
              id="category-list"
              value={selectedCategory}
              onChange={(e)=>handleFilter(e.target.value)}
            >
              <option value="">All</option>
              {category.map((cate, index) => {
                return (
                  <>
                    <option value={cate} key={index}>
                      {cate}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default App;
