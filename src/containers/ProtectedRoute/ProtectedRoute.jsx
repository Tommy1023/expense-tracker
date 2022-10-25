import React from 'react';
import { Navigate, useMatch, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { toastHelper } from '../../helpers/swalHelper';

const ProtectedRoute = (props) => {
  const isMatch = useMatch('/admin/*');
  const navigate = useNavigate();
  const { children } = props;

  const { user, onSocialMediaLogin, isSocialMediaLogin } = useStore((state) => {
    return {
      user: state.user,
      onSocialMediaLogin: state.onSocialMediaLogin,
      isSocialMediaLogin: state.isSocialMediaLogin,
    };
  }, shallow);

  React.useEffect(() => {
    if (isSocialMediaLogin) onSocialMediaLogin();
    if (user) {
      setTimeout(() => {
        toastHelper('登入成功!', 'success', { position: 'top' });
      }, 500);
    }
  }, []);//eslint-disable-line

  if (!user) {
    setTimeout(() => {
      toastHelper('請先登入帳號!', 'warning', { position: 'top' });
    }, 500);
    return (
      <Navigate
        to={`/user/login?redirect_url=${encodeURIComponent(
          window.location.pathname,
        )}`}
        replace
      />
    );
  }
  if (!user.isAdmin && isMatch) {
    toastHelper('沒有管理員權限!', 'warning', { position: 'top' });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
    return '';
  }

  return children;
};

export default React.memo(ProtectedRoute);
