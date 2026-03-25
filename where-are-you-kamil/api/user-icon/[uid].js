import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const { uid } = req.query;
        
        const [profileResponse, leaderboardResponse] = await Promise.all([
        fetch(`https://bestdori.com/api/player/en/${uid}?mode=2`),
        fetch('https://bestdori.com/api/eventtop/data?server=1&event=296&mid=0&latest=1')
        ]);

        const [profileData, leaderboardData] = await Promise.all([
        profileResponse.json(),
        leaderboardResponse.json()
        ]);

        const iconStatus = profileData.data?.profile?.userProfileSituation?.illust;
        const user = leaderboardData.users?.find(u => u.uid === parseInt(uid));
        const sid = user?.sid;

        if (!sid) {
        return res.status(404).json({ error: 'User SID not found' });
        }
        
        const cardResponse = await fetch(`https://bestdori.com/api/cards/${sid}.json`);
        const cardData = await cardResponse.json();
        
        const calcCardResourceId = Math.floor(sid / 50);
        const formattedCardResourceId = String(calcCardResourceId).padStart(5, '0');
        const iconUrl = `https://bestdori.com/assets/en/thumb/chara/card${formattedCardResourceId}_rip/${cardData.resourceSetName}_${iconStatus}.png`;
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ iconUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
        error: 'Failed to fetch user icon',
        fallbackUrl: 'https://bestdori.com/assets/en/thumb/chara/card00000_rip/default_normal.png'
        });
    }
};