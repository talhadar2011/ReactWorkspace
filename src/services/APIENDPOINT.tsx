import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyjson.com/',
});
export const getUsers = async () => {
    return (await API.get('/users')).data;
};