
import handler from './api/weather.js';

const req = {
    query: {
        lat: -31.3789,
        lon: -64.4647
    }
};

const res = {
    status: (code) => {
        console.log('Status:', code);
        return res;
    },
    json: (data) => {
        console.log('JSON:', JSON.stringify(data, null, 2));
        return res;
    },
    setHeader: (name, value) => {
        console.log('Header:', name, '=', value);
        return res;
    }
};

handler(req, res);
