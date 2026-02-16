import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
};

const url = 'https://serviceapi.dev.innovations.qtsdatacenters.com/qtac/cmdb/api/v1/dash/sites/all/templates';
const params = {
    headers: {
        'x-api-key': '0e5c04c4d3101b75bdf0e38cfaad1cdfabae8f7aabbd95b6fae023efce08da1e',
        'x-client-id': 'a93a6b99eb250c82d5db8324faff167a',
    },
};

export default function () {
    const res = http.get(url, params);
    console.log('Response body:', res.body);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response is not empty': (r) => r.body && r.body.length > 0,
    });
}
