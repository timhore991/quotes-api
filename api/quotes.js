import rawQuotes from '../quotes.json';

export default function handler(req, res) {
  const { key, listAuthors } = req.query;

  // Map JSON agar hanya kolom yang penting
  const quotes = rawQuotes.map(q => ({
    key: q.key_quote,
    quote: q.quote,
    author: q.author
  }));

  // Jika query ?listAuthors=true
  if (listAuthors === 'true') {
    // Buat set unik author per key
    const authors = {};
    quotes.forEach(q => {
      if (!authors[q.key]) {
        authors[q.key] = [];
      }
      if (!authors[q.key].includes(q.author)) {
        authors[q.key].push(q.author);
      }
    });
    return res.json(authors);
  }

  // Jika query ?key=xxxx
  if (key) {
    const filtered = quotes.filter(q => q.key === key);
    if (filtered.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    return res.json(filtered); // kembalikan semua data terkait key
  }

  // Jika tidak ada key → random quote
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
}
