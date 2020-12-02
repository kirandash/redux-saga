import axios from 'axios';

// API call
export const getUsers = () => {
    return axios.get('/users', {
        params: {
            limit: 1000 // by default api has 10 limit: 1000 should return all for our example
        }
    })
};
