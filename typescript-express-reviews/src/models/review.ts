import mongoose from './mongoose';

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    validate: (v: number) => Number.isInteger(v)
  },
  text: {
    type: String,
    required: true,
    validate: (v: string) => v.length >= 30
  },
  userId: {
    type: 'ObjectId',
    required: true
  },
  vehicleId: {
    type: 'ObjectId',
    required: true
  }
}, { timestamps: true });

schema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

schema.virtual('vehicle', {
  ref: 'Vehicle',
  localField: 'vehicleId',
  foreignField: '_id',
  justOne: true
});

schema.pre('save', async function updateVehicleRating() {
  if (!this.isNew) {
    return;
  }
  const vehicle = await mongoose.model('Vehicle').findById(this.vehicleId).orFail();
  
  // Use incremental average calculation instead of fetching all reviews
  const currentAverage = vehicle.averageReview || 0;
  const currentCount = vehicle.numReviews || 0;
  
  // Calculate new average incrementally: new_avg = (old_avg * old_count + new_rating) / new_count
  const newCount = currentCount + 1;
  const newAverage = (currentAverage * currentCount + this.rating) / newCount;
  
  vehicle.numReviews = newCount;
  vehicle.averageReview = newAverage;
  await vehicle.save();
});

const Review = mongoose.model('Review', schema);

export default Review;
