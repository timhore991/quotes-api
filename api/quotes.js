import rawQuotes from '../quotes.json';

export default function handler(req, res) {
  // Map JSON supaya output bersih: hanya quote, author, key_quote
  const quotes = rawQuotes.map(q => ({
    key: q.key_quote,  // jadikan key utama
    quote: q.quote,
    author: q.author
  }));

  const { key } = req.query;

  if (key) {
    // Cari quote sesuai key_quote
    const filtered = quotes.filter(q => q.key === key);

    if (filtered.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    // Jika ada lebih dari 1 quote untuk key yang sama, ambil random
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    return res.json(random);
  }

  // Jika tidak ada key, ambil random dari semua quotes
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
}
