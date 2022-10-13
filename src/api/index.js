
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
});

axiosInstance.interceptors.request.use((req) => {
  const auth_token = localStorage.getItem("auth_token");

  if (auth_token) {
    req.headers.authorization = `Bearer ${auth_token}`;
  }
  // ngegetnya dari headers authorization biar secure

  return req;
});

// axiosInstance.interceptors.response.use(
//   (resSuccess) => {
//     return resSuccess;
//   },
//   (resError) => {
//     // console.log(resError);
//     if (resError.response.status === 401) {
//       console.log("LOGOUT USER");
//       localStorage.removeItem("auth_token");
//       store.dispatch(logout());
//       // ini gk pake useDispatch karena bukan format jsx
//     }

//     return Promise.reject(resError);
//   }
// );

export { axiosInstance };
