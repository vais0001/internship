const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./blog_site.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.get('/api/posts/liked-by-user-8', (req, res) => {
  const sql = `
    SELECT bp.* 
    FROM blog_posts bp 
    INNER JOIN likes l ON bp.blog_id = l.blog_id 
    WHERE l.user_id = 8 AND l.like = 1
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
