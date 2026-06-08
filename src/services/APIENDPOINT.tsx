import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
export const getUsers = async () => {
    return (await API.get('/users')).data;
};