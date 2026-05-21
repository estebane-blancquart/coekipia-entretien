import express from 'express';
import { filterAndSort, FilterableKey } from './employees';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/employees', async (req, res) => {
  const { filterKey, filterValue, sortKey } = req.query;

  try {
    const employees = await filterAndSort(
      filterKey as FilterableKey | undefined,
      filterValue as string | undefined,
      sortKey as FilterableKey | undefined
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/fields', (req, res) => {
  const fields: FilterableKey[] = [
    'first_name', 'last_name', 'department', 'role', 'salary', 'is_active'
  ];
  res.json(fields);
});

app.listen(3001, () => {
  console.log('Node backend running on port 3001');
});