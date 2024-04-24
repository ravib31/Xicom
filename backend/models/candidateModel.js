const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dob: { type: Date },
  currentAddress: { type: String },
  currentAddress2: { type: String },
  permanentAddress: { type: String },
  permanentAddress2: { type: String },
  files: [
    {
      fileName: String,
      fileType: String,
      filePublicId: String,
      fileUrl: String,
    },
  ],
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
