import mongoose from "mongoose"

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TripSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    itinerary: {
        type: String,
    },
    destination: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    numOfTravellers: {
        type: Number,
    },
    numOfTravellers: {
        type: Number,
    },
    modeOfTransport: {
        type: String,
    },
    userId: {
        type: ObjectId,
        required: true,
    },
});

const Trip = mongoose.model("trip", TripSchema);

export { Trip };
