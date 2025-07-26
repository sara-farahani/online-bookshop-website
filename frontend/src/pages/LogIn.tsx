import { useState } from "react";
import Form from "../components/forms/Form";
import login from "../lib/api/auth/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/login";

export default function LogInForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedin } = useAuth();
  return (
    <Form
      error={error}
      formType={"logIn"}
      title={"ورود"}
      onSubmit={async (data) => {
        setError("");
        const response = await login(data);
        if (response.error) {
          setError(response.error);
        } else {
          setIsLoggedin(true);
          navigate("/");
        }
      }}
    />
  );
}
