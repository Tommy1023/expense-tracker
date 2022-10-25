import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import PasswordSwitch from '../../components/PasswordSwitch';
import { socialMediaLoginConfirm, toastHelper } from '../../helpers/swalHelper';
import lineLoginBtn from '../../assets/images/btn_login.png';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onLogin, passwordHide, setPasswordHide } = useStore((state) => {
    return {
      onLogin: state.onLogin,
      passwordHide: state.passwordHide,
      setPasswordHide: state.setPasswordHide,
    };
  }, shallow);

  const atSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  const socialMediaLogin = (socialMedial) => {
    socialMediaLoginConfirm().then((result) => {
      if (result.isConfirmed) {
        return window.open(
          `${process.env.REACT_APP_API_URL}/socialMediaAuth/${socialMedial}`,
          '_self',
        );
      }
      return toastHelper('取消登入', 'info');
    });
  };

  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="container m-auto flex h-[55%] max-h-[425px] max-w-lg flex-col overflow-y-scroll rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[45%] lg:overflow-y-hidden"
    >
      <h2 className="w-full p-2 text-center">登入帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        <p className="mb-1">帳號</p>
        <input
          className="rounded-sm p-2 leading-5"
          type="text"
          id="userId"
          placeholder="請輸入 email (ex: example@gmail.com)"
          {...register('email', {
            required: '此欄位為必填',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'email 格式錯誤',
            },
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="email" />
        </small>
      </label>
      <label className="flex h-[28%] flex-col justify-center px-2">
        <p className="mb-1">密碼</p>
        <div className="flex items-center">
          <input
            className="w-full rounded-sm p-2 leading-5"
            type={passwordHide ? 'password' : 'text'}
            id="userPassword"
            placeholder="請輸入密碼(6~12字)"
            {...register('password', {
              required: '此欄位為必填',
              maxLength: { value: 12, message: '長度超過12' },
              minLength: { value: 6, message: '長度小於6' },
            })}
          />
          <PasswordSwitch
            passwordHide={passwordHide}
            setPasswordHide={setPasswordHide}
          />
        </div>
        <small className="text-danger">
          <ErrorMessage errors={errors} name="password" />
        </small>
      </label>
      <div className="mt-3 flex flex-col justify-evenly px-2 md:flex-row md:px-0">
        <button
          type="submit"
          className="my-1 w-full rounded-md bg-primary p-2 text-center text-lg text-white md:w-[30%]"
        >
          一般登入
        </button>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            socialMediaLogin('line');
          }}
          className="my-1 flex w-full rounded-md bg-[#06c755] p-2 text-center text-lg text-white md:w-[30%]"
        >
          <img src={lineLoginBtn} alt="lineLogin" className="h-[30px]" />
          <p className="w-full">Line 登入</p>
        </div>
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
