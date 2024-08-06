import React from "react";
import Alert from "react-bootstrap/Alert";

const Success = ({ success }) => {
  return (
    <>
      <Alert variant="success">{success}</Alert>
    </>
  );
};

export default Success;
