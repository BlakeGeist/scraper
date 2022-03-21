import axios from 'axios';

export const getGoogleResults = (query, amount) => {
    var options = {
        method: 'GET',
        url: 'https://google-web-search.p.rapidapi.com/',
        params: {query: query, gl: 'US', max: amount},
        headers: {
          'x-rapidapi-host': 'google-web-search.p.rapidapi.com',
          'x-rapidapi-key': 'f0e8153803msh7efbc70383f5751p1baaecjsn6c32aa1b3e5a'
        }
      };

    return axios.request(options).then(function (response) {
        console.log(response.data)
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}