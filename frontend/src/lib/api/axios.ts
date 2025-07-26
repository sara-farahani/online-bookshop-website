import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import decamelizeKeys from "decamelize-keys";

export class AxiosJsonError extends Error {
  response: AxiosResponse;
  status: number;
  message: string;

  constructor({
    status,
    message,
    response,
  }: {
    status: number;
    message: string;
    response: AxiosResponse;
  }) {
    super(message);
    this.name = "AxiosJsonError";
    this.response = response;
    this.status = status;
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AxiosJsonError);
    }
  }
}

export async function axiosJsonwithAuth<JSON = unknown>(
  url: string,
  body?: object,
  config?: AxiosRequestConfig
): Promise<JSON> {
  try {
    const axiosConfig: AxiosRequestConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      ...(config || {}),
    };

    const payload = body ? decamelizeKeys(body, { deep: true }) : undefined;

    const method = config?.method?.toUpperCase() || "GET";
    const res = await axios.request({
      url,
      method,
      data: payload,
      ...axiosConfig,
    });
    const camelData = camelcaseKeys(res.data, { deep: true });
    return camelData as JSON;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new AxiosJsonError({
        status: error.response.status,
        message: error.response.data?.message || error.response.statusText,
        response: error.response,
      });
    } else {
      throw error;
    }
  }
}

export async function axiosJson<JSON = unknown>(
  url: string,
  body?: object,
  config?: AxiosRequestConfig
): Promise<JSON> {
  try {
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      ...(config || {}),
    };

    const payload = body ? decamelizeKeys(body, { deep: true }) : undefined;

    const method = config?.method?.toUpperCase() || (body ? "POST" : "GET");

    const res = await axios.request({
      url,
      method,
      data: payload,
      ...axiosConfig,
    });
    console.log("res", res);
    const camelData = camelcaseKeys(res.data, { deep: true });
    return camelData as JSON;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new AxiosJsonError({
        status: error.response.status,
        message: error.response.data?.message || error.response.statusText,
        response: error.response,
      });
    } else {
      throw error;
    }
  }
}
