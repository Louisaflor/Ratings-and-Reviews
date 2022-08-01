import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

  export const options = {
    vus: 150,
    duration: '60s',
  };


export default function () {
  let options = {
    headers: {
      'Authorization': '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'
    }
  }
  const url = http.get('http://localhost:3100/reviews?product_id=40344');

  check(url, {
    'status is 200': (r) => r.status == 200,
    'response less than 2000ms': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  sleep(1);
}
// http://localhost:3100/reviews?product_id=40344

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=40344

// export const options = {
//   insecureSkipTLSVerify: true,
//   noConnectionReuse:false,
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1000,
//       timeUnit: '1s',
//       duration: '60s',
//       preAllocatedVUs: 100,
//       maxVUs: 150
//     }
//   },
// };