const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cloudinary = require("cloudinary");
const multer = require("multer");
const Candidate = require("./models/candidateModel");
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "degtb4kdh",
  api_key: "778862813976536",
  api_secret: "gZrAZT0eOmFFXkeWCU7fU7Yc6Gg",
});
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb+srv://Vraj:Vishal123@cluster0.n6fk1.mongodb.net/candidate")
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.put("/candidate", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      currentAddress,
      currentAddress2,
      permanentAddress,
      permanentAddress2,
    } = req.body;
    const updatingCandidate = await Candidate.findByIdAndUpdate(req.body._id, {
      firstName,
      lastName,
      email,
      dob,
      currentAddress,
      currentAddress2,
      permanentAddress,
      permanentAddress2,
    });
    res.status(201).send({ candidate: updatingCandidate });
  } catch (error) {
    res.send(error);
  }
});
app.post("/candidate/docs", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "ravi",
    });

    if (req.body._id && file.filename && result.secure_url) {
      const updatingCandidateFiles = await Candidate.findByIdAndUpdate(
        req.body._id,
        {
          $push: {
            files: {
              fileName: file.originalname,
              fileType: file.mimetype,
              filePublicId: result.public_id,
              fileUrl: result.secure_url,
            },
          },
        },
        { new: true }
      );

      res.status(201).send({ candidate: updatingCandidateFiles });
    } else {
      let candidate = new Candidate({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        currentAddress: "",
        currentAddress2: "",
        permanentAddress: "",
        permanentAddress2: "",
        files: [],
        useCurrentAddress: false,
      });
      const savedCandidate = await candidate.save();

      if (savedCandidate._id && file.filename && result.secure_url) {
        const updatingCandidateFiles = await Candidate.findByIdAndUpdate(
          savedCandidate._id,
          {
            $push: {
              files: {
                fileName: file.originalname,
                fileType: file.mimetype,
                filePublicId: result.public_id,
                fileUrl: result.secure_url,
              },
            },
          },
          { new: true }
        );

        res.status(201).send({ candidate: updatingCandidateFiles });
      } else {
        res.status(400).send("Missing required data for file upload.");
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while processing the file upload.");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port port 🔥`);
