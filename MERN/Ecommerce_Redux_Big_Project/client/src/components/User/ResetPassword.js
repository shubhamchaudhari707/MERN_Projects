import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css"
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();

        const data1 = {password, confirmPassword}

        dispatch(resetPassword(token, data1));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            //   dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate("/login");
        }
    }, [dispatch, error, alert, success, token]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Password</h2>

                            <form className="resetPasswordForm" onSubmit={submitForm}>
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update" className="resetPasswordBtn"/>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ResetPassword;
