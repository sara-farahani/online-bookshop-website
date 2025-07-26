import { useState } from "react";
import Form from "../components/forms/Form";
import signup from "../lib/api/auth/signUp";

export default function SignUpForm() {
  const [error, setError] = useState("");
  return (
    <Form
      error={error}
      formType={"signUp"}
      title={"ثبت‌نام"}
      onSubmit={async (data) => {
        setError("");
        const response = await signup(data);
        if (response.error) {
          setError(response.error);
        }
      }}
    />
  );
}
