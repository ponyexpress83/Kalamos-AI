import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://kalamos-ai.vercel.app';
const API_TOKEN = __ENV.KALAMOS_API_TOKEN || '';
const VUS = Number(__ENV.VUS || '2');
const DURATION = __ENV.DURATION || '20s';

export const options = {
  vus: VUS,
  duration: DURATION,
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<60000'],
  },
};

const testo = `
La pioggia era cominciata prima dell'alba. Elena guardava la stazione dalla finestra della cucina.
Non aspettava nessuno. Quando il treno delle sette entro lentamente sul primo binario, vide un uomo
scendere con una valigia rossa. Per un istante penso di riconoscerlo, ma la distanza e il vetro bagnato
le impedirono di esserne certa. Prese il cappotto e usci senza spegnere la radio.
`;

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  if (API_TOKEN) headers['x-kalamos-token'] = API_TOKEN;

  const res = http.post(
    `${BASE_URL}/api/analyze`,
    JSON.stringify({
      titolo: `Benchmark concorrente VU-${__VU}`,
      text: testo,
      publisherIds: ['sperling-kupfer'],
    }),
    { headers, timeout: '65s', tags: { scenario: `ai-${VUS}-vus` } },
  );

  check(res, {
    'analysis accepted or rate-limited intentionally': (r) => r.status === 200 || r.status === 429,
    'no 5xx': (r) => r.status < 500,
  });

  sleep(1);
}
