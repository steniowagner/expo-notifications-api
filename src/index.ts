import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log(process.env.NODE);
  return res.send('Hej hej!');
});

console.log(process.env.NODE);

app.listen(4000, '0.0.0.0');
