import axios from 'axios';
import Cookies from 'js-cookie';

const JWT_TOKEN = 'JWT_TOKEN';
const baseURL = process.env.REACT_APP_API_URL;
const apiHelper = axios.create({
  baseURL,
  withCredentials: true,
});

// auth api
export const getJWTToken = () => {
  return Cookies.get(JWT_TOKEN);
};
export const setToken = (token) => {
  Cookies.set(JWT_TOKEN, token);
  apiHelper.defaults.headers.authorization = `Bearer ${token}`;
};
export const cleanToken = () => {
  Cookies.remove(JWT_TOKEN);
  delete apiHelper.defaults.headers.authorization;
};
export const verifyToken = (token) => {
  return axios
    .get(`${baseURL}/auth`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      apiHelper.defaults.headers.authorization = `Bearer ${token}`;
      return data;
    })
    .catch((err) => {
      console.log('verifyToken error:', err);
      cleanToken();
      return Promise.reject();
    });
};

// user api
export const fetchRegister = (userData) => {
  return axios
    .post(`${baseURL}/register`, {
      ...userData,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchLogin = (email, password) => {
  return axios
    .post(`${baseURL}/login`, {
      email,
      password,
      expiresIn: '1d',
    })
    .then(({ data }) => {
      setToken(data.data.token);
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchSocialMediaLogin = () => {
  return axios
    .get(`${baseURL}/socialMediaAuth/login/success`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.status === 200) return res;
      throw new Error('authentication has been failed!');
    })
    .catch((err) => console.log('fetchSocialMediaLogin error:', err));
};
export const fetchLogout = () => {
  return axios
    .get(`${baseURL}/socialMediaAuth/logout`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log('fetchLogout error:', err));
};
export const fetchAllUsers = () => {
  return apiHelper
    .get('/admin/users')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchGetUser = () => {
  return apiHelper.get();
};
export const fetchPutUser = (uid, data) => {
  return apiHelper
    .put(`/user/${uid}/edit`, { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchDeleteUser = (uid) => {
  return apiHelper
    .delete(`/admin/user/${uid}/delete`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// record api
export const fetchPostNewRecord = (data) => {
  return apiHelper
    .post('/record/new', { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchGetRecords = () => {
  return apiHelper
    .get('/records')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};
export const fetchGetRecord = (rid) => {
  return apiHelper
    .get(`/record/${rid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchPutRecord = (rid, data) => {
  return apiHelper
    .put(`/record/${rid}/edit`, { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchDeleteRecord = (rid) => {
  return apiHelper
    .delete(`/record/${rid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchGetAllRecords = () => {
  return apiHelper
    .get('/admin/records')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// location api
export const fetchPostNewLocation = (data) => {
  return apiHelper
    .post('/admin/location/new', { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchGetLocations = () => {
  return apiHelper
    .get('/locations')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};
export const fetchPutLocation = (lid, data) => {
  return apiHelper
    .put(`/admin/location/${lid}/edit`, { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchDeleteLocation = (lid) => {
  return apiHelper
    .delete(`/admin/location/${lid}/delete`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// product api
export const fetchPostNewProduct = (data) => {
  return apiHelper
    .post('/admin/product/new', { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchGetProducts = () => {
  return apiHelper
    .get('/products')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};
export const fetchPutProduct = (pid, data) => {
  return apiHelper
    .put(`/admin/product/${pid}/edit`, { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchDeleteProduct = (pid) => {
  return apiHelper
    .delete(`/admin/product/${pid}/delete`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
