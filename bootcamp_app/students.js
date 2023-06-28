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
    res.rows.forEach(student => {
      console.log(`${student.name} has an id of ${student.student_id} and was in the ${student.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));