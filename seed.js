const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('./models/routeModel');

dotenv.config();

mongoose.connect(process.env.MONGO_GEO)
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding');

    const data = {
      name: 'Jalur 1',
      geojson: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [107.142063, -6.999619],
            [107.143158, -7.004297],
            [107.144788, -7.009416]
          ]
        },
        properties: {}
      }
    };

    await Route.deleteMany();  // bersihin data lama
    await Route.create(data);  // seed data baru

    console.log('🌱 Seed data berhasil dimasukkan');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
