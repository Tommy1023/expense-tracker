import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onLogin } = useStore((state) => {
    return {
      onLogin: state.onLogin,
    };
  }, shallow);

  const atSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="container m-auto flex h-[55%] max-h-[425px] max-w-lg flex-col overflow-y-scroll rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[45%]"
    >
      <h2 className="w-full p-2 text-center">登入帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        帳號
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="email"
          id="userId"
          placeholder="請輸入 email"
          {...register('email', { required: true })}
        />
        {errors.email && <small className="text-danger">此欄位為必填</small>}
      </label>
      <label className="flex h-[28%] flex-col justify-center px-2">
        密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userPassword"
          placeholder="請輸入密碼"
          {...register('password', {
            required: true,
            maxLength: 12,
          })}
        />
        {errors.password?.type === 'required' && (
          <small className="text-danger">此欄位為必填</small>
        )}
        {errors.password?.type === 'maxLength' && (
          <small className="text-danger">長度超過15</small>
        )}
      </label>
      <div className="mt-3 flex flex-col justify-evenly px-2 md:flex-row md:px-0">
        <button
          type="submit"
          className="my-1 w-full rounded-md  bg-primary p-2  text-white md:w-[30%]"
        >
          登入
        </button>
        <button className="my-1 w-full rounded-md  bg-[#4267B2] p-2 text-white md:w-[30%]">
          Facebook 登入
        </button>
        <button className="my-1 w-full rounded-md  bg-[#06c755] p-2 text-white md:w-[30%]">
          Line 登入
        </button>
      </div>
      <Link
        to="/user/register"
        className="ml-auto w-[20%] p-2 text-center text-white hover:text-sky-400"
      >
        註冊
      </Link>
    </form>
  );
};

export default React.memo(Login);