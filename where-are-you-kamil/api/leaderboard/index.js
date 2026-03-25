import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const response = await fetch('https://bestdori.com/api/eventtop/data?server=1&event=295&mid=0&latest=1');
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
};