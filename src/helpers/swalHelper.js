import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const toastHelper = (message, status, toastOpt) => {
  Toast.fire({
    title: message,
    icon: status,
    ...toastOpt,
  });
};

export const deleteConfirm = () => {
  return MySwal.fire({
    title: '確定要刪除這筆記錄?',
    text: '刪除後無法復原!!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪除!',
  });
};

export const socialMediaLoginConfirm = () => {
  return MySwal.fire({
    title: '個資取得授權',
    text: '使用第三方登入時會向第三方平台取得您的 email 及公開的個資，此資料僅用於註冊會員資料使用。',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#06c755',
    cancelButtonColor: '#d33',
    confirmButtonText: '同意',
  });
};
