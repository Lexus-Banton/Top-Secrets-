const pool = require('../utils/pool.js');

class Secret {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM secrets');
    return rows.map((row) => new Secret(row));
  }
}

module.exports = { Secret };
