const express = require('express');
const cors = require('cors');
const AnagramFinder = require('./anagram');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/anagrams', (req, res) => {
  const input = req.body.text;

  const finder = new AnagramFinder(input);
  finder.findAnagrams().then((resp) => {
    count=resp.length;
    const randomValues = [];
    t=10
    if (resp.length<10) {t=resp.length}
    for (let i = 0; i < t; i++) {
      const randomIndex = Math.floor(Math.random() * resp.length); 
      const randomValue = resp[randomIndex]; 
      randomValues.push(randomValue); 
    }
    anagrams = randomValues
    res.json({anagrams, count, t});
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


