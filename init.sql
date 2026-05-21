CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  salary NUMERIC(10, 2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO employees (first_name, last_name, department, role, salary, is_active) VALUES
  ('Alice', 'Martin', 'Engineering', 'Developer', 52000, true),
  ('Bob', 'Dupont', 'Engineering', 'Tech Lead', 68000, true),
  ('Claire', 'Bernard', 'HR', 'HR Manager', 48000, true),
  ('David', 'Leroy', 'Sales', 'Sales Rep', 38000, false),
  ('Emma', 'Petit', 'Sales', 'Sales Manager', 55000, true),
  ('Franck', 'Moreau', 'Engineering', 'DevOps', 61000, true),
  ('Grace', 'Simon', 'HR', 'Recruiter', 42000, false),
  ('Hugo', 'Laurent', 'Marketing', 'Designer', 44000, true);