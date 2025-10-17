const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Ciwaruga = require('./models/routeModel'); // model schema yang udah kamu ubah sebelumnya

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

// =======================================
// 🗺️ ROUTER DESA CIWARUGA
// =======================================

// 📝 CREATE (Tambah data GeoJSON Desa Ciwaruga)
app.post('/api/ciwaruga', async (req, res) => {
  try {
    const newData = await Ciwaruga.create(req.body);
    res.json(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📜 READ ALL (Ambil semua data GeoJSON Ciwaruga)
app.get('/api/ciwaruga', async (req, res) => {
  try {
    const data = await Ciwaruga.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 READ BY ID (Ambil satu data berdasarkan ID)
app.get('/api/ciwaruga/:id', async (req, res) => {
  try {
    const data = await Ciwaruga.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data Ciwaruga tidak ditemukan' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ UPDATE (Edit data GeoJSON berdasarkan ID)
app.put('/api/ciwaruga/:id', async (req, res) => {
  try {
    const updated = await Ciwaruga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑️ DELETE (Hapus data GeoJSON)
app.delete('/api/ciwaruga/:id', async (req, res) => {
  try {
    await Ciwaruga.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data Desa Ciwaruga berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================================
// 🟢 START SERVER
// =======================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Desa Ciwaruga berjalan di port ${PORT}`));
