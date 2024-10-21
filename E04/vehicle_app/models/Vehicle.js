const mongoose = require('mongoose');

// Define a regex pattern for Finnish license plates (3 letters followed by 3 digits)
const licensePlateRegex = /^[A-Z]{3}-\d{3}$/;

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    maxLength: 10,
  },
  model: String,
  type: {
    type: String,
    required: true
  },
  license_plate: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return licensePlateRegex.test(v);  // Custom validator using regex
      },
      message: props => `${props.value} is not a valid Finnish license plate!`
    }
  },
  mileage: {
    type: Number,
    default: 0  // Default value of 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],  // Enum options
    default: 'active'  // Default to 'active'
  }
});

// pre-update hook to check the status change
vehicleSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();

  // Check if the status is being changed to 'inactive'
  if (update.status === 'inactive') {
    // Fetch the current document to compare the existing status
    const vehicle = await this.model.findOne(this.getQuery());

    // If the current status is 'active' and the update is setting it to 'inactive'
    if (vehicle.status === 'active' && update.status === 'inactive') {
      // Ensure mileage is provided
      if (!update.mileage && !vehicle.mileage) {
        return next(new Error('Mileage must be provided when changing status to inactive.'));
      }
    }
  }

  next();
});

module.exports = mongoose.model('Vehicle', vehicleSchema);