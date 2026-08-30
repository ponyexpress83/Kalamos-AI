import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://kalamos-ai.vercel.app';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 20 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const pages = ['/', '/login'];

  for (const path of pages) {
    const res = http.get(`${BASE_URL}${path}`, { tags: { page: path } });
    check(res, {
      [`${path} returns 200`]: (r) => r.status === 200,
    });
  }

  sleep(1);
}
