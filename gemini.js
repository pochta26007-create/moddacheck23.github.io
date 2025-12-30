// api/gemini.js
export default async function handler(req, res) {
    // CORS (ruxsatnoma) sozlamalari
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Brauzer so'rov yuborishdan oldin "mumkinmi?" deb so'raganda darhol "ha" deb javob beramiz
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Sizning API kalitingiz (buni keyinchalik Vercel sozlamalariga o'tkazish tavsiya etiladi, hozircha shu yerda tursin)
    const API_KEY = "AIzaSyDlsVlLXmaXV5_TnDei5Ys0x4wgfZ5d0TE"; 

    // To'g'ri model nomini ishlatamiz (gemini-1.5-flash)
    const GOOGLE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(GOOGLE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
}