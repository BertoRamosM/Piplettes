import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  hour: {
    type: String,
    default: "",
  },
  day: {
    type: String,
    default: "",
  },
  month: {
    type: String,
    default: "",
    required: true,
  },
  themes: {
    type: [String],
  },
  release: {
    type: String,
    required: true,
  },
});

const Events = mongoose.models.Events || mongoose.model("Events", eventSchema);

export default Events;
