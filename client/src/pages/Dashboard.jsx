import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });
    const [editForm, setEditForm] = useState({ id: "", title: "", description: "" });
    const [showEditModal, setShowEditModal] = useState(false);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Fetch tasks on mount
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            setMsg("❌ Session expired. Please log in again.");
            localStorage.clear();
            navigate("/login");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:4000/api/v1/tasks", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setForm({ title: "", description: "" });
            setMsg("✅ Task added successfully!");
            fetchTasks();
        } catch (err) {
            console.error(err);
            setMsg("❌ Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((t) => t._id !== id));
        } catch {
            setMsg("❌ Error deleting task");
        }
    };

    // ✅ Open modal for editing
    const handleEditClick = (task) => {
        setEditForm({ id: task._id, title: task.title, description: task.description || "" });
        setShowEditModal(true);
    };

    // ✅ Update task API call
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:4000/api/v1/tasks/${editForm.id}`,
                { title: editForm.title, description: editForm.description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMsg("✅ Task updated successfully!");
            setShowEditModal(false);
            fetchTasks();
        } catch (err) {
            console.error(err);
            setMsg("❌ Failed to update task");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div style={styles.wrapper}>
            {/* Header Section */}
            <div style={styles.header}>
                <h2 style={styles.title}>
                    Welcome, {user.name || "User"} 👋{" "}
                    <span style={styles.roleBadge}>
                        {user.role?.toUpperCase() || "USER"}
                    </span>
                </h2>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Admin banner */}
            {user.role === "admin" && (
                <div style={styles.adminBanner}>
                    🛡️ You are logged in as <strong>Admin</strong>. You can view and delete
                    all users’ tasks.
                </div>
            )}

            {/* Add Task Section */}
            <div style={styles.card}>
                <h3 style={{ marginBottom: "10px" }}>
                    {user.role === "admin" ? "Add Task (Admin)" : "Add Your Task"}
                </h3>
                <form onSubmit={handleCreate} style={styles.form}>
                    <input
                        style={styles.input}
                        name="title"
                        placeholder="Task title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <textarea
                        style={styles.textarea}
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </form>
                {msg && (
                    <p style={msg.includes("✅") ? styles.success : styles.error}>{msg}</p>
                )}
            </div>

            {/* Task List Section */}
            <div style={styles.tasksContainer}>
                {tasks.length === 0 ? (
                    <p style={{ color: "#777" }}>No tasks yet. Add one!</p>
                ) : (
                    tasks.map((t) => (
                        <div key={t._id} style={styles.taskCard}>
                            <h4>{t.title}</h4>
                            <p style={{ color: "#555" }}>{t.description || "No description"}</p>
                            <div style={styles.taskFooter}>
                                <span style={styles.status}>{t.status || "Pending"}</span>

                                {/* Only admin OR owner of task can edit/delete */}
                                {(user.role === "admin" || t.userId === user.id) && (
                                    <div>
                                        <button
                                            style={styles.editBtn}
                                            onClick={() => handleEditClick(t)}
                                        >
                                            ✏ Edit
                                        </button>
                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => handleDelete(t._id)}
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ✅ Edit Modal */}
            {showEditModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Edit Task</h3>
                        <form onSubmit={handleUpdate} style={styles.form}>
                            <input
                                style={styles.input}
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, title: e.target.value })
                                }
                                required
                            />
                            <textarea
                                style={styles.textarea}
                                value={editForm.description}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, description: e.target.value })
                                }
                            />
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button type="submit" style={styles.button}>
                                    Update
                                </button>
                                <button
                                    type="button"
                                    style={styles.cancelBtn}
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        padding: "40px 20px",
        color: "#333",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "900px",
        margin: "0 auto 30px",
        color: "#fff",
    },
    title: {
        fontSize: "26px",
        fontWeight: "bold",
    },
    logoutBtn: {
        background: "#FF5555",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
    },
    roleBadge: {
        background: "#fff",
        color: "#5563DE",
        borderRadius: "8px",
        padding: "4px 8px",
        fontSize: "13px",
        marginLeft: "10px",
        fontWeight: "bold",
    },
    adminBanner: {
        background: "#f6f8ff",
        color: "#333",
        textAlign: "center",
        padding: "10px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto 20px",
        fontWeight: "500",
        border: "1px solid #dbe0ff",
    },
    card: {
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "0 auto 30px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
    },
    textarea: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        resize: "none",
        minHeight: "60px",
    },
    button: {
        background: "#5563DE",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    cancelBtn: {
        background: "#999",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    success: { color: "green", marginTop: "10px", fontWeight: "bold" },
    error: { color: "red", marginTop: "10px", fontWeight: "bold" },
    tasksContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        maxWidth: "900px",
        margin: "0 auto",
    },
    taskCard: {
        background: "#fff",
        borderRadius: "10px",
        padding: "15px 20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    taskFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
    },
    editBtn: {
        background: "none",
        border: "none",
        color: "#0077ff",
        cursor: "pointer",
        marginRight: "10px",
        fontWeight: "bold",
    },
    deleteBtn: {
        background: "none",
        border: "none",
        color: "#FF5555",
        cursor: "pointer",
        fontWeight: "bold",
    },
    status: {
        background: "#e2e8f0",
        padding: "3px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        color: "#444",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
    },
};
