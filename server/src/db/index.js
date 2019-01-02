import mysql from 'mysql';

let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'chirprapp',
  password: 'chirp123',
  database: 'chirpr'
});

let chirprdb = {};

chirprdb.user = (name) => {
  pool.query(
    `SELECT id FROM users WHERE name == '${name}';`,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      return results[0];
    }
  )
}

chirprdb.newUser = (text, name, email, location) => {
  return new Promise ((resolve, reject) => {
    pool.query(
      `BEGIN;
        INSERT INTO users (name, email, password)
        VALUES ('${name}', '${email}', '${password}');
        SELECT LAST_INSERT_ID() INTO @user_id;
        INSERT INTO chirps (userid, text, location)
        VALUES (@user_id, '${text}', '${location}');
        INSERT INTO mentions (userid, chirpid)
        VALUES (@user_id, LAST_INSERT_ID());
      COMMIT;`
    )
  })
}

chirprdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM chirps', (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    })
  })
}

chirprdb.one = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT c.id, c.text, u.name, c._created FROM chirps c JOIN users u ON u.id = c.userid WHERE c.id = ${id};`,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      }
    )
  })
}

chirprdb.del = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE c FROM chirps c WHERE c.id = ${id};`,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    )
  })
}

chirprdb.put = (id, text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE chirps SET text = '${text}' WHERE id = ${id};`,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    )
  })
}

chirprdb.post = (user, text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE name = '${user}';`,
      (error, results) => {
        if (error) {
          return reject(error)
        } else if (results[0].name == null) {
          pool.query(
            'INSERT INTO users (name, '
          )
        } else {
          pool.query(
            `INSERT INTO chirps (userid, text) VALUES (${user}, '${text}');`,
            (error, results) => {
              if (error) {
                return reject(error);
              }
              return resolve(results);
            }
          )
        }
      }
    )
    // pool.query(
    //   `INSERT INTO chirps (userid, text) VALUES (${user}, '${text}');`,
    //   (error, results) => {
    //     if (error) {
    //       return reject(error);
    //     }
    //     return resolve(results);
    //   }
    // )
  })
}

export default chirprdb;