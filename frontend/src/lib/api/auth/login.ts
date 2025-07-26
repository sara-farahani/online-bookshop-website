import { AxiosJsonError, axiosJsonwithAuth } from "../axios";
import { loginSchema } from "../../../schemas/loginSchema";
import { validateFormData } from "../validateData";

export default async function login(loginData: FormData) {
  // const url = `${process.env.REACT_APP_API_ORIGIN}/api/login`;
  const url = `http://localhost:8000/api/users/login/`;

  const { cleanedInput, errorMessage } = validateFormData(
    loginSchema,
    loginData
  );

  if (errorMessage) {
    return { error: errorMessage };
  }
  const { email, password } = cleanedInput;

  const body = { email, password };
  const config = { method: "POST" };

  try {
    const response = await axiosJsonwithAuth(url, body, config);
    console.log("LOGEDDD IN ");
    return { data: response };
  } catch (err: any) {
    const errorMessage =
      err instanceof AxiosJsonError ? err.message : "خطای ناشناخته در ورود";
    return { error: errorMessage };
  }
}
