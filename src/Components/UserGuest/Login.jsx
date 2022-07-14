import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { loginApi } from '../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";


export default function Login(props) {
  const { setIsLogin } = props;

  const loginUser = e => {
    const data = {
      email: e.target.email.value, 
      password: e.target.password.value, 
    };
    
    // TODO: check if all fields have values ​​and check if the data format is ok
    // ex: check with regular expression if the email is valid
    // if not -> give friendly message

    loginApi(data).then((user) => {
      if (user && user.ok) {
        const { accessToken, refreshToken } = user;

        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        window.location.href = "/";

      } else {
        toast.info(user.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center">
      <form
        className="max-w-[400px] w-full mx-auto bg-white p-4"
        onSubmit={e => loginUser(e)}
      >
        <h2 className="text-4xl font-bold text-center py-6">
          Light-it - ApiMedic
        </h2>
        <div className="flex flex-col py-2">
          <label>Email</label>
          <input className="border p-2" type="text" name="email" />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input className="border p-2" type="password" name="password" />
        </div>
        <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
          Login
        </button>
        <div className="flex justify-between">
          <p>Don't have an account? </p>
          <button
            onClick={() => setIsLogin(false)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Sign up here
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
