import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "./api";
import "./App.css";

function App() {
  // ── State ──
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // ── Fetch on load ──
  useEffect(() => {
    getExpenses()
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  // ── Add ──
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      const res = await addExpense({ title, amount: +amount, category });
      setExpenses([res.data, ...expenses]);
      setTitle("");
      setAmount("");
    } catch (err) {
      console.log("Error adding expense:", err);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.log("Error deleting expense:", err);
    }
  };

  // ── RENDER ──
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">

      {/* ── Header with Tailwind Gradient ── */}
      <header className="bg-gradient-to-r from-gradStart to-gradEnd p-8 text-center text-white shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight flex justify-center items-center gap-2">
          <span>💰</span> Expense Tracker
        </h1>
        <p className="text-sm mt-2 opacity-90 font-medium">Track your daily spending easily</p>
      </header>

      {/* ── Main Layout Container ── */}
      <main className="flex-grow max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 w-full">
        
        {/* ── Form Section ── */}
        <section className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Expense</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Expense title (e.g. Lunch)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gradStart transition text-sm text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Amount (₹)</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Amount ₹"
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gradStart transition text-sm text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gradStart bg-white transition text-sm text-gray-800"
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-gradStart to-gradEnd text-white py-3 rounded-xl font-semibold hover:opacity-95 shadow-md hover:shadow-lg transition transform active:scale-95 text-sm mt-2"
            >
              ➕ Add Expense
            </button>
          </form>
        </section>

        {/* ── List Section ── */}
        <section className="md:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
              <h2 className="text-xl font-bold text-gray-800">📋 Your Expenses</h2>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                Total: {expenses.length} items
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {expenses.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-sm">
                  No expenses yet. Add one above! 👆
                </p>
              ) : (
                expenses.map((exp) => (
                  <div 
                    key={exp._id} 
                    className="flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition shadow-sm"
                  >
                    <div className="space-y-1">
                      <span className="block font-semibold text-gray-800 text-sm capitalize">{exp.title}</span>
                      <span className="inline-block bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider">
                        {exp.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-gray-900 text-base">
                        ₹{Number(exp.amount).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-gradient-to-r from-gradStart to-gradEnd rounded-lg text-white font-bold text-xs">
              ET
            </span>
            <span className="font-semibold text-gray-700">Expense Tracker</span>
          </div>
          <p className="text-xs">
            Made with ❤️ by Me | &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
