import React, { useState, useEffect } from "react";

import "./JoinPartyPage.css";

import CustomInput from "../../components/customInput/customInput";

import CustomButton from "../../components/customButton/customButton";

import Spinner from 'react-bootstrap/Spinner'

import {
  checkIfRoomExsist,
  joinParty,
  setupJoinedListener,
} from "../../firebase/firebase";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setPartyIdRedux,
  setIsAdmin,
  setJoining,
} from "../../redux/game/game-actions";

import FileUploader from "../../components/fileUploader/fileUploader";

import userPhotoPlaceholder from "../../assets/user_placeholder.png";

const JoinPartPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [partyId, onPartyIdChange] = useState("");

  const [image, setImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");

  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);

  const onJoinHandler = async () => {
    setLoading(true);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      const exsist = await checkIfRoomExsist(partyId);
      if (name.length && partyId.length) {
        if (exsist) {
          dispatch(setJoining(true));
          joinParty(partyId, {
            name: name,
            imageUrl: image,
            isAdmin: false,
            score: 0,
          })(dispatch);
          setupJoinedListener(partyId)(dispatch);
          dispatch(setPartyIdRedux(partyId));
          dispatch(setIsAdmin(false));
          setLoading(false);
          history.push(`/lobby/${partyId}`);
        } else {
          alert("Party doesn't exsist");
          setLoading(false);
        }
      } else {
        alert("Please fill out all the fields.");
        setLoading(false);
      }
    };
    if (loading) {
      asyncFunction();
    }
  }, [loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "partyId") {
      onPartyIdChange(value);
    }
  };

  const cloudinaryUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wiml-preset-name");

    fetch("https://api.cloudinary.com/v1_1/wiml/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.secure_url);
        setImage(data.secure_url);
        setLoadingPhoto(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedFile.length) {
      setLoadingPhoto(true);
      cloudinaryUpload(selectedFile2);
    }
  }, [selectedFile]);

  return (
    <div className="join-party-page-container">
      <div className="imagePressable">
        <FileUploader
          onFileSelectSuccess={(file, file2) => {
            setSelectedFile(file);
            setSelectedFile2(file2);
          }}
          onFileSelectError={({ error }) => alert(error)}
        />
        <img
          className="joinImage"
          src={selectedFile.length ? selectedFile : userPhotoPlaceholder}
        />
      </div>

      <CustomInput
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        label="Username"
        required
        maxLength={10}
      />

      <CustomInput
        type="text"
        name="partyId"
        value={partyId}
        onChange={handleChange}
        label="Party ID"
        required
        maxLength={5}
      />

      {loadingPhoto ? (
        <Spinner animation="grow" variant="light" />
      ) : loading ? (
        <Spinner animation="grow" variant="light" />
      ) : (
        <CustomButton onPress={onJoinHandler}>Join</CustomButton>
      )}
    </div>
  );
};

export default JoinPartPage;
