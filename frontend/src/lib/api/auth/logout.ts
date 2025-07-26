import axios from "axios";
import { axiosJson, AxiosJsonError, axiosJsonwithAuth } from "../axios";
import { Meta, redirect } from "react-router-dom";
import { useAuth } from "../../../contexts/login";

export default async function logout() {
  // const url = `${process.env.REACT_APP_API_ORIGIN}/api/login`;
  const url = `http://localhost:8000/api/users/logout/`;
  const config = { method: "POST" };
  try {
    const response = await axiosJsonwithAuth(url, {}, config);
    redirect("/");
    return { data: response };
  } catch (err: any) {
    const errorMessage =
      err instanceof AxiosJsonError ? err.message : "خطای ناشناخته در ورود";
    return { error: errorMessage };
  }
}
