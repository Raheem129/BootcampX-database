const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    console.log('connected');
    res.rows.forEach(row => {
      console.log(`ID: ${row.student_id}, Name: ${row.name}, Cohort: ${row.cohort}`);
    });
  })
  .catch(err => console.error('query error', err.stack))
