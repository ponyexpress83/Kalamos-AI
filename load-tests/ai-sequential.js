import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://kalamos-ai.vercel.app';
const API_TOKEN = __ENV.KALAMOS_API_TOKEN || '';
const ITERATIONS = Number(__ENV.ITERATIONS || '3');

export const options = {
  vus: 1,
  iterations: ITERATIONS,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<60000'],
  },
};

const testo = `
La pioggia era cominciata prima dell'alba. Elena guardava la stazione dalla finestra della cucina.
Non aspettava nessuno, almeno cosi continuava a ripetersi. Quando il treno delle sette entro lentamente
sul primo binario, vide un uomo scendere con una valigia rossa. Rimase immobile finche il marciapiede
non torno vuoto, poi spense la luce e prese il cappotto.
`;

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  if (API_TOKEN) headers['x-kalamos-token'] = API_TOKEN;

  const res = http.post(
    `${BASE_URL}/api/analyze`,
    JSON.stringify({
      titolo: 'Romanzo sintetico - benchmark Kalamos',
      text: testo,
      publisherIds: ['sperling-kupfer'],
    }),
    { headers, timeout: '65s', tags: { scenario: 'ai-sequential' } },
  );

  check(res, {
    'analysis returns 200': (r) => r.status === 200,
    'no server error': (r) => r.status < 500,
  });
}
