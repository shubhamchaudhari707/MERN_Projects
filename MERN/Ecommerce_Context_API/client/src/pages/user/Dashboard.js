import React from "react";
import Layout from "../../comonents/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../comonents/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title={"Dashboard - Ecommerce App"}>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>{auth.user?.name}</h3>
                <h3>{auth.user?.email}</h3>
                <h3>{auth.user?.phone}</h3>
                <h3>{auth.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
