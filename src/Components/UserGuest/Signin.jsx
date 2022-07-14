import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { Radio } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

import { signinApi } from '../../api/user';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";



export default function Signin(props) {
  const { setIsLogin } = props;

  const [birthDate, setBirthDate] = useState(null);

  const signinUser = e => {
    const data = {
      name: e.target.name.value, 
      lastname: e.target.lastname.value, 
      email: e.target.email.value, 
      password: e.target.password.value, 
      repeatPassword: e.target.repeatPassword.value, 
      male: e.target.male.checked, 
      birthDate: e.target.birthDate.value,
    };
    
    // TODO: check if all fields have values ​​and check if the data format is ok
    // ex: check with regular expression if the email is valid
    // if not -> give friendly message

    signinApi(data).then((user) => {
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
        onSubmit={e => signinUser(e)}
      >
        <h2 className="text-4xl font-bold text-center py-6">
          Light-it - ApiMedic
        </h2>
        <div className="flex flex-col py-2">
          <label>Name</label>
          <input className="border p-2" name="name" type="text" />
        </div>
        <div className="flex flex-col py-2">
          <label>Lastname</label>
          <input className="border p-2" name="lastname" type="text" />
        </div>

        <div className="flex flex-col py-2">
          <label>Gender</label>
          <div className="flex gap-10">
            <Radio id="male" name="gender" label="Male" defaultChecked />
            <Radio id="female" name="gender" label="Female" />
          </div>
        </div>

        <div className="flex flex-col py-2">
          <label>Date of birth</label>
          <DatePicker
            className="border p-2 w-full"
            selected={birthDate}
            onChange={date => setBirthDate(date)}
            name="birthDate"
          />
        </div>

        <div className="flex flex-col py-2">
          <label>Email</label>
          <input className="border p-2" type="text" name="email" />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input className="border p-2" type="password" name="password" />
        </div>
        <div className="flex flex-col py-2">
          <label>Repeat Password</label>
          <input className="border p-2" type="password" name="repeatPassword" />
        </div>
        <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
          Signin
        </button>
        <div className="flex justify-between">
          <p>Already have an account? </p>
          <button
            onClick={() => setIsLogin(true)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Log In here
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
