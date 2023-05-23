
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.use(cors())

app.get('/', (req, res) => {
  const randInt = getRandomInt(0, 1000);  
  res.setHeader('Cache-Control', 'max-age=500');
  res.setHeader('Vary', 'Accept-Language, X-Current-UID');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.send(String(randInt));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

