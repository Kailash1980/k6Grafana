import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6'

export const options = {
  vus: 5,
  duration: '3s',
  cloud: {
    // Project: Default project
    projectID: 6677834,
    // Test runs with the same name groups test runs together.
    name: 'Test (Kp)'
  }
};

const url = "https://reqres.in/api/users"

const data = {
    "name": "Kailash Pathak",
    "job": "QA Engineer"
}


export default function () {
    const response = http.post(url, data)
    console.log("*** printing the payload ***", data)
    console.log("*** printing the response ***", response.body)

    check(response, {
        'status code validation': (response) => response.status === 201,
        'Response Id Validation': (response) => response.body.includes('id')
    })
}