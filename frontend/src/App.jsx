import { useState, useEffect } from "react";

const BACKENDS = {
  "Node.js": "http://localhost:3001",
  Python: "http://localhost:3002",
  Java: "http://localhost:3003",
};

export default function App() {
  const [backend, setBackend] = useState("Node.js");
  const [fields, setFields] = useState([]);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const fetchEmployees = async (currentBackend) => {
    setError("");
    try {
      const res = await fetch(`${BACKENDS[currentBackend]}/employees`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data);
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetch(`${BACKENDS[backend]}/fields`)
      .then((res) => res.json())
      .then((data) => {
        setFields(data);
        setFilterKey(data[0]);
        setSortKey(data[0]);
      });
    fetchEmployees(backend); // eslint-disable-line
  }, [backend]);

  const handleSearch = async () => {
    setError("");
    try {
      const params = new URLSearchParams({ filterKey, filterValue, sortKey });
      const res = await fetch(`${BACKENDS[backend]}/employees?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data);
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setFilterValue("");
    fetchEmployees(backend);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Employee Filter</h1>

      <div className="flex gap-2 mb-6">
        {Object.keys(BACKENDS).map((b) => (
          <button
            key={b}
            onClick={() => {
              setBackend(b);
              setResults([]);
              setFilterValue("");
            }}
            className={`px-4 py-2 rounded font-medium ${backend === b ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Filter by</label>
          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            className="bg-gray-800 px-3 py-2 rounded"
          >
            {fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Value</label>
          <input
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="bg-gray-800 px-3 py-2 rounded"
            placeholder="ex: Engineering"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Sort by</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="bg-gray-800 px-3 py-2 rounded"
          >
            {fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-medium"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                {Object.keys(results[0]).map((k) => (
                  <th key={k} className="px-4 py-2 text-left text-gray-400">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t border-gray-800 hover:bg-gray-900"
                >
                  {Object.values(emp).map((v, i) => (
                    <td key={i} className="px-4 py-2">
                      {String(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
