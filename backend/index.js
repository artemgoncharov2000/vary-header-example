
import express from 'express';
import cors from 'cors';
import got from 'got';
const app = express()
const port = 8080
const cacheMap = new Map();

function getStringHash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

app.use(cors())

app.get('/', async (req, res) => {
  res.setHeader('Cache-Control', 'max-age=1000');
  res.setHeader('Vary', 'Accept-Language, X-Current-UID');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const requestedStr = req.query.str
  const response = await got(`http://localhost:8080/getStringHash?str=${requestedStr}`, { cache: cacheMap });
  console.log("isFromCache", response.isFromCache);

  res.send(response.body);
});

app.get('/getStringHash', (req, res) => {
  const requestedStr = req.query.str || '';
  const stringHash = getStringHash(requestedStr);  
  res.send(String(stringHash));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

