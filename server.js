const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Route = require('./models/routeModel');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Koneksi MongoDB
mongoose.connect(process.env.MONGO_GEO)
  .then(() => {
    console.log('✅ MongoDB connected:', process.env.MONGO_GEO);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Mongoose error event:', err);
});

// 📝 CREATE
app.post('/api/routes', async (req, res) => {
  try {
    const newRoute = await Route.create(req.body);
    res.json(newRoute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📜 READ ALL
app.get('/api/routes', async (req, res) => {
  const routes = await Route.find();
  res.json(routes);
});

// 🔍 READ BY ID
app.get('/api/routes/:id', async (req, res) => {
  const route = await Route.findById(req.params.id);
  if (!route) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json(route);
});

// ✏️ UPDATE
app.put('/api/routes/:id', async (req, res) => {
  const updated = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🗑️ DELETE
app.delete('/api/routes/:id', async (req, res) => {
  await Route.findByIdAndDelete(req.params.id);
  res.json({ message: 'Data berhasil dihapus' });
});

// 🟢 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
