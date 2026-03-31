const express = require('express');

const app = express();

const data = [
    {
        game: "World of Warcraft",
        type: "PVP Boost",
        service: "1600 Rating",
    },
    {
        game: "World of Warcraft",
        type: "PVE Boost",
        service: "3000 Mythic+ Rating",
    },
]

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.set({'Content-Type': 'application/json'})
    res.send(data);
});

app.get('/service', (req, res) => {
    const { game, type, service } = req.body;

    console.log(req.body);

    res.json({
        message: 'Service recieved',
        data: {game, type, service}
    });
})

app.post('/newservice', (req, res) => {
    data.push(req.body);
    console.log(data);
    res.redirect('/');
})
app.listen(3000, () => console.log('Server running on 3000 🚀'));
