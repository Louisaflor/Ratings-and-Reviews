import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

/*
vus: the Current number of active virtual users
duration: the total time for the request in the http_req_duration metric
*/

export const options = {
  vus: 150,
  duration: '60s',
};


export default function () {
  let body = {
    "product_id": 40344,
    "rating": 1,
    "summary": "The cow jumped over the moon",
    "body": "hello hello",
    "recommend": false,
    "name": "louisa",
    "email": "fake@gmail.com",
    "photos" :["this", "that", "url"],
    "characteristics" : {
        "96": 4,
        "97" : 3,
        "98": 2,
        "99": 5
        }
  }
  const url = http.post('http://localhost:3100/reviews', body);

  check(url, {
    'status is 201': (r) => r.status == 201,
    'response less than 3000ms': (r) => r.timings.duration < 3000,
  }) || errorRate.add(1);
  sleep(1);
}