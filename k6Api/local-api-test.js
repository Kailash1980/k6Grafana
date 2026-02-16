import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
     cloud: {
    // Project: Default project
    projectID: 6677834,
    // Test runs with the same name groups test runs together.
    name: 'Test (Kp)'
  },
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    }
};

const url = "https://jsonplaceholder.typicode.com/posts";

const payload = JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1
});

const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function () {

    const response = http.post(url, payload, params);

    console.log("*** printing payload ***", payload);
    console.log("*** printing response ***", response.body);

    check(response, {
        'Status Code Validation': (r) => r.status === 201,
        'Response Validation': (r) => r.body.includes('id'),
    });
}
