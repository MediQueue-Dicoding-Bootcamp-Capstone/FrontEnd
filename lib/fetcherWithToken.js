const fetcherWithToken = (url, token) => axios.get(url, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then(res => res.data);
export default fetcherWithToken;