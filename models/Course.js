import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Web Series Title"],
  },
  urlTitle: {
    type: String,
    required: [true, "Please Enter Web Series urlTitle"],
  },
  about: {
    type: String,
    required: [true, "Please Enter Web Series About"],
  },
  genre: {
    type: String,
    required: [true, "Please Enter Web Series Genre"],
  },
  cast: {
    type: String,
    required: [true, "Please Enter Web Series Cast"],
  },
  director: {
    type: String,
    required: [true, "Please Enter Web Series Director"],
  },
  language: {
    type: String,
    required: [true, "Please Enter Web Series Language"],
  },
  creator: {
    type: String,
    required: [true, "Please Enter Web Series Creator"],
  },
  trailer: {
    type: String,
    required: [true, "Please Enter Web Series Trailer"],
  },
  rating: {
    type: Number,
    required: [true, "Please Enter Web Series rating"],
  },
  subscription: {
    type: String,
    required: [true, "Please Enter Web Series Subscription"],
  },
  season: {},
  faqs: {},
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  top: {
    type: Number,
    default: 0,
  },
  latest: {
    type: Number,
    default: 0,
  },
  list: {
    type: Number,
    default: 0,
  },
  listNumber: {
    type: Number,
    default: 0,
  },
});
export const Course = mongoose.model("Course", schema);
