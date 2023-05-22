
const express = require('express')
const app = express()
const port = 8080


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', (req, res) => {
  const randInt = getRandomInt(0, 1000);  
  res.setHeader('Cache-Control', 'max-age=500');
  res.setHeader('Vary', 'Accept-Language');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.send(String(randInt));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

