import pool from './db';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  department: string;
  role: string;
  salary: number;
  is_active: boolean;
}

export type FilterableKey = keyof Omit<Employee, 'id'>;

export async function filterAndSort(
  filterKey?: FilterableKey,
  filterValue?: string | number | boolean,
  sortKey?: FilterableKey
): Promise<Employee[]> {
  if (filterKey && filterValue !== undefined && filterValue !== '' && sortKey) {
    const result = await pool.query(
      `SELECT * FROM employees WHERE ${filterKey} = $1 ORDER BY ${sortKey}`,
      [filterValue]
    );
    return result.rows as Employee[];
  }
  const result = await pool.query(`SELECT * FROM employees ORDER BY id`);
  return result.rows as Employee[];
}