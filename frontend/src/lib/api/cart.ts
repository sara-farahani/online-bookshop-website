import { AxiosJsonError, axiosJsonwithAuth } from "./axios";

export default async function fetchCartProducts() {
  // const url = `${process.env.REACT_APP_API_ORIGIN}/api/login`;
  const url = "http://localhost:8000/api/orders/cart/";

  try {
    const response = await axiosJsonwithAuth(url);
    return { data: response["items"] };
  } catch (err: any) {
    const errorMessage =
      err instanceof AxiosJsonError ? err.message : "خطای ناشناخته در ورود";

    return { error: errorMessage };
  }
}

async function postLocalStorageCarttoBack(cartItems: any) {
  //TODO: handle response better
  const url = "http://localhost:8000/api/cart/add/";
  let response = "";
  for (const item of cartItems) {
    const body = { product_id: item.product_id, quantity: item.quantity };
    response = await axiosJsonwithAuth(url, body);
  }
  return response;
}
