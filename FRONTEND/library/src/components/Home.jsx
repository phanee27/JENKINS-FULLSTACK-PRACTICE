import React, { useEffect, useState } from "react";

function Home() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: "",
    isbn: "",
    title: "",
    publishyear: "",
    category: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch all books
  const fetchBooks = () => {
    fetch("http://localhost:6969/library/all")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "string") {
          setBooks([]);
        } else {
          setBooks(data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update book
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editing
      ? `http://localhost:6969/library/update/${form.id}`
      : "http://localhost:6969/library/add";

    const method = editing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        fetchBooks();
        setForm({ id: "", isbn: "", title: "", publishyear: "", category: "" });
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };

  // Delete book
  const handleDelete = (id) => {
    fetch(`http://localhost:6969/library/delete/${id}`, { method: "DELETE" })
      .then(() => fetchBooks())
      .catch((err) => console.error(err));
  };

  // Edit book
  const handleEdit = (book) => {
    setForm(book);
    setEditing(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📚 Library CRUD</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="number"
          name="publishyear"
          placeholder="Publish Year"
          value={form.publishyear}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />{" "}
        <button type="submit">{editing ? "Update" : "Add"} Book</button>
      </form>

      {/* Table */}
      {books.length === 0 ? (
        <p>📭 Library is empty.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Publish Year</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.publishyear}</td>
                <td>{book.category}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>✏️ Edit</button>{" "}
                  <button onClick={() => handleDelete(book.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
