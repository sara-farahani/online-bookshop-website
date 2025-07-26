import { AxiosJsonError, axiosJsonwithAuth } from "../axios";
import { validateFormData } from "../validateData";
import { signupSchema } from "../../../schemas/signupSchema";

type signupResponse = {
  access: string;
  refresh: string;
};

export default async function signup(signupData: FormData) {
  // const url = `${process.env.REACT_APP_API_ORIGIN}/api/login`;
  const url = `http://localhost:8000/api/users/register/`;

  const { cleanedInput, errorMessage } = validateFormData(
    signupSchema,
    signupData
  );

  if (errorMessage) {
    return { error: errorMessage };
  }

  const { email, password } = cleanedInput;

  const body = { email, password };

  const config = { method: "POST" };

  try {
    const response = await axiosJsonwithAuth(url, body, config);
    return { data: response };
  } catch (err: any) {
    const errorMessage =
      err instanceof AxiosJsonError ? err.message : "خطای ناشناخته در ورود";

    return { error: errorMessage };
  }
}
