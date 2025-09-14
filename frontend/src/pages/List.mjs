import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem("token");

  const fetchUsers = () => {
    axios
      .get("/api/users", {
        headers: { Authorization: token },
      })
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/users/${id}`, {
      headers: { Authorization: token },
    });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditForm(user);
  };

  const handleUpdate = async () => {
    await axios.put(`/api/users/${editingId}`, editForm, {
      headers: { Authorization: token },
    });
    setEditingId(null);
    fetchUsers();
  };

  return (
    <div className="list">
      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                {editingId === u._id ? (
                  <input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editingId === u._id ? (
                  <input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                {editingId === u._id ? (
                  <input
                    value={editForm.contact}
                    onChange={(e) =>
                      setEditForm({ ...editForm, contact: e.target.value })
                    }
                  />
                ) : (
                  u.contact
                )}
              </td>
              <td>{u.username}</td>
              <td>
                {editingId === u._id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(u)}>Edit</button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
