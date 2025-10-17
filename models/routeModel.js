const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  desa: {
    type: String,
    required: true,
    default: 'Ciwaruga' // otomatis diisi nama desa
  },
  geojson: {
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true
    },
    features: [
      {
        type: {
          type: String,
          enum: ['Feature'],
          required: true
        },
        properties: {
          name: String,
          description: String
        },
        geometry: {
          type: {
            type: String,
            enum: ['LineString', 'Polygon', 'Point'],
            required: true
          },
          coordinates: {
            type: Array,
            required: true
          }
        }
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
