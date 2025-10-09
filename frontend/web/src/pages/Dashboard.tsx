import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [status, setStatus] = useState("⏳ Connexion au serveur...");
  const [form, setForm] = useState({ name: "", email: "" });
  const [tripForm, setTripForm] = useState({
    user: "",
    origin: "",
    destination: "",
    distanceKm: "",
  });
  const [calculatedEcoPoints, setCalculatedEcoPoints] = useState(0);

  // 🧠 Charger les utilisateurs et trajets
  useEffect(() => {
    fetchUsers();
    fetchTrips();
  }, []);

  // ✅ Récupérer les utilisateurs
  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setUsers(data);
      setStatus("✅ Connexion API réussie");
    } catch (error) {
      console.error(error);
      setStatus("❌ Erreur de connexion au serveur");
    }
  }

  // ✅ Récupérer les trajets
  async function fetchTrips() {
    try {
      const res = await fetch("http://localhost:3000/trips");
      if (res.ok) {
        const data = await res.json();
        setTrips(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ➕ Ajouter un utilisateur
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ecoPoints: 0 }),
      });
      if (res.ok) {
        const data = await res.json();
        setUsers([...users, data.user]);
        setForm({ name: "", email: "" });
      } else {
        alert("⚠️ Cet email est peut-être déjà utilisé.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ➕ Ajouter un trajet
  const handleAddTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    const distance = parseFloat(tripForm.distanceKm);
    const ecoPoints = distance * 2;
    try {
      const res = await fetch("http://localhost:3000/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tripForm,
          distanceKm: distance,
          ecoPoints,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTrips([...trips, data.trip]);
        setTripForm({ user: "", origin: "", destination: "", distanceKm: "" });
        setCalculatedEcoPoints(0);
      } else {
        alert("❌ Erreur lors de l’ajout du trajet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🧮 Calcul automatique écoPoints
  const handleTripChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...tripForm, [name]: value };
    if (name === "distanceKm") {
      const distance = parseFloat(value) || 0;
      setCalculatedEcoPoints(distance * 2);
    }
    setTripForm(updatedForm);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 12px rgba(76,175,80,0.4)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: "100px 20px",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          background: "#f5f7f4",
          minHeight: "100vh",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🚗 Tableau de bord Ecoride
        </motion.h1>
        <p style={{ color: "#2e7d32", fontWeight: "bold" }}>{status}</p>

        {/* 👥 Liste des utilisateurs */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "30px",
            margin: "30px auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            width: "90%",
            maxWidth: "900px",
          }}
        >
          <h2>👥 Liste des utilisateurs ({users.length})</h2>
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {users.map((user) => (
                <motion.li
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <strong>{user.name}</strong> ({user.email}) —{" "}
                  {user.ecoPoints} pts
                </motion.li>
              ))}
            </ul>
          )}

          {/* ➕ Ajouter utilisateur */}
          <motion.form
            onSubmit={handleAddUser}
            style={{ marginTop: "15px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>➕ Ajouter un utilisateur</h3>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{ margin: "5px", padding: "6px" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{ margin: "5px", padding: "6px" }}
            />
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                padding: "10px 16px",
                marginTop: "8px",
              }}
            >
              Ajouter
            </motion.button>
          </motion.form>
        </motion.div>

        {/* 🚗 Liste des trajets */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "30px",
            margin: "30px auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            width: "90%",
            maxWidth: "900px",
          }}
        >
          <h2>🌍 Liste des trajets ({trips.length})</h2>
          {trips.length === 0 ? (
            <p>Aucun trajet enregistré.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {trips.map((trip) => (
                <motion.li
                  key={trip._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {trip.origin} → {trip.destination} ({trip.distanceKm} km) 🌱{" "}
                  <span style={{ color: "#4CAF50" }}>{trip.ecoPoints} pts</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* ➕ Ajouter un trajet */}
          <form onSubmit={handleAddTrip} style={{ marginTop: "15px" }}>
            <h3>➕ Ajouter un trajet</h3>
            <select
              name="user"
              value={tripForm.user}
              onChange={handleTripChange}
              required
              style={{ margin: "5px", padding: "6px" }}
            >
              <option value="">-- Sélectionner un utilisateur --</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            <input
              type="text"
              name="origin"
              placeholder="Origine"
              value={tripForm.origin}
              onChange={handleTripChange}
              required
              style={{ margin: "5px", padding: "6px" }}
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={tripForm.destination}
              onChange={handleTripChange}
              required
              style={{ margin: "5px", padding: "6px" }}
            />
            <input
              type="number"
              name="distanceKm"
              placeholder="Distance (km)"
              value={tripForm.distanceKm}
              onChange={handleTripChange}
              min="1"
              required
              style={{ margin: "5px", padding: "6px" }}
            />
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                padding: "10px 16px",
                marginTop: "8px",
              }}
            >
              Ajouter le trajet
            </motion.button>
          </form>

          {calculatedEcoPoints > 0 && (
            <p style={{ color: "#2e7d32", marginTop: "10px" }}>
              🌱 Ce trajet rapportera environ{" "}
              <strong>{calculatedEcoPoints}</strong> écoPoints
            </p>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
