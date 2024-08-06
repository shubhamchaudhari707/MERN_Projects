import React, {useEffect} from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"User Profile"} />

          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src="./images/Profile.png" alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
