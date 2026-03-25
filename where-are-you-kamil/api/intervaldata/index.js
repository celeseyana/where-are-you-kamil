import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const response = await fetch('https://bestdori.com/api/eventtop/data?server=1&event=296&mode=1&interval=3600000');
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data intervals' });
    }
};