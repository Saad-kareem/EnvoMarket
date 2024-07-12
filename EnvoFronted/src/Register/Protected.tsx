import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;

export const PrivateAdmin = () => {
  return <div>
    
  </div>;
};
