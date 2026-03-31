require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('./generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

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

app.get('/', async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/service', async (req, res) => {
try {
    const services = await prisma.service.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    res.json(services);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong'});
}
})

app.post('/service', async (req, res) => {
    try {
        const { game, type, service } = req.body;
         if (!game || !type ||!service) {
             return res.status(400).json({
                 error: 'game, type, and serce are required',
             });
         }

        const newService = await prisma.service.create({
            data: {
                game,
                type,
                service,
            },
        });
        res.status(201).json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong'});
    }
});
app.listen(3000, () => console.log('Server running on 3000 🚀'));
