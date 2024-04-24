import React, { useState } from "react";
import axios from "axios";

function CandidateForm() {
  const file = {
    fileName: "",
    fileType: "",
    uploadedFile: "",
  };

  const [files, setFiles] = useState([file]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    currentAddress: "",
    currentAddress2: "",
    permanentAddress: "",
    permanentAddress2: "",
    useCurrentAddress: false,
  });

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      permanentAddress: formData.currentAddress,
      permanentAddress2: formData.currentAddress2,
    });
  };
  // console.log(formData.files);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const selectedDate = new Date(formData.dob);
    if (selectedDate >= minDate) {
      return alert("You must be 18 years or older to register");
    }

    if (files[0].uploadedFile === "") {
      return alert("Please upload a file");
    }
    try {
      const res = await axios.put("http://localhost:5000/candidate", formData);

      if (res.data) {
        setFormData({
          ...formData,
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          currentAddress: "",
          currentAddress2: "",
          permanentAddress: "",
          permanentAddress2: "",
          useCurrentAddress: false,
        });

        document.getElementById("fileInput").value = "";

        alert("Candidate created successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating candidate");
    }
  };

  return (
    <div className="flex w-full items-center justify-center flex-col">
      <h1 className="text-3xl text-center mb-6 font-bold">
        MERN STACK MACHINE TEST
      </h1>
      {formData.error && (
        <div className="text-red-500 mb-4">{formData.error}</div>
      )}
      <form className="bg-white p-2 rounded shadow-md w-[52.5%]">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="mb-2 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name*
            </label>
            <input
              className="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-2 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name*
            </label>
            <input
              className="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail*
            </label>
            <input
              className="appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="ex:myname@example.com"
            />
          </div>
          <div className="mb-2 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth(Min. age should be 18 years)*
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row gap-3">
          <div className="mb-2 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Residential Address*
            </label>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
              <input
                className="appearance-none  w-full md:w-1/2 border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formData.currentAddress}
                onChange={(e) =>
                  setFormData({ ...formData, currentAddress: e.target.value })
                }
                placeholder="Street 1"
              />
              <input
                className="appearance-none border rounded py-2  w-full md:w-1/2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formData.currentAddress2}
                onChange={(e) =>
                  setFormData({ ...formData, currentAddress2: e.target.value })
                }
                placeholder="Street 2"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.useCurrentAddress}
            onChange={handleCheckboxChange}
            id="sameAsResidential"
            className="mr-2"
          />
          <label htmlFor="sameAsResidential">Same as Residential Address</label>
        </div>
        {!formData.useCurrentAddress && (
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Permanent Address*
            </label>
            <div className="w-full flex items-center justify-between gap-3">
              <input
                className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formData.permanentAddress}
                onChange={(e) =>
                  setFormData({ ...formData, permanentAddress: e.target.value })
                }
                placeholder="Street 1"
              />
              <input
                className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formData.permanentAddress2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    permanentAddress2: e.target.value,
                  })
                }
                placeholder="Street 2"
              />
            </div>
          </div>
        )}

        {files.map((item, index) => (
          <div key={index}>
            <p className="my-2 text-lg">Upload documents*</p>
            <div className="flex items-center flex-col md:flex-row justify-between gap-3">
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold">
                  File Name*
                </label>
                <input
                  className="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={item.fileName}
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index].fileName = e.target.value;
                    setFiles({ ...files, files: updatedFiles });
                  }}
                  placeholder="ex: Document Name"
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold">
                  Type of File*
                </label>
                <input
                  className="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={item.fileType}
                  onChange={async (e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index].fileType = e.target.value;
                    setFiles({ ...files, files: updatedFiles });
                  }}
                  placeholder="ex: PDF, JPG, etc."
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold">
                  Upload Documents*
                </label>
                <input
                  id="fileInput"
                  className="appearance-none w-full border rounded p-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  onChange={async (e) => {
                    const fileFormData = new FormData();
                    fileFormData.append("file", e.target.files[0]);
                    if (formData._id) {
                      fileFormData.append("_id", formData._id);
                    }
                    let res = await axios.post(
                      "http://localhost:5000/candidate/docs",
                      fileFormData
                    );
                    if (res.data) {
                      setFormData({ ...formData, _id: res.data.candidate._id });
                      let updatedFiles = files;
                      updatedFiles[index].uploadedFile = e.target.files[0];
                      updatedFiles[index].fileName =
                        res.data.candidate.files[index].fileName;
                      updatedFiles[index].fileType =
                        res.data.candidate.files[index].fileType;
                      setFiles(updatedFiles);
                    }
                  }}
                />
              </div>
              {index !== 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    const updatedFiles = files.filter(
                      (_item, idx) => idx !== index
                    );
                    setFiles(updatedFiles);
                  }}
                  className="text-[2.5rem] rounded p-1 md:mt-2 h-8 font-bold flex items-center justify-center"
                >
                  -
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setFiles([
                      ...files,
                      { fileName: "", fileType: "", uploadedFile: "" },
                    ])
                  }
                  className="text-[2.5rem] rounded p-1 md:mt-2 h-8 font-bold flex items-center justify-center"
                >
                  +
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          className="bg-black text-white rounded-xl p-2 m-2 w-32 block mx-auto"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CandidateForm;
