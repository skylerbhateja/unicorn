import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { Box, Card, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/Modal/ImageUpload";
import { styles } from "./styles";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CameraIcon from "@mui/icons-material/CameraAlt";

const CreateUser = () => {
  const navigate = useNavigate();
  const { handleAddUser, users } = useAppContext();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: users.length + 1,
    },
  });
  const imgRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setFile(null);
    setCrop();
  };

  const handleFileDrop = (file) => {
    setFile(URL.createObjectURL(file[0]));
  };

  const handleSelectedFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCrop = (e, percentCrop) => {
    setCrop(percentCrop);
  };

  const handleCompletedCrop = (e) => {
    setCompletedCrop(e);
  };

  const getCroppedImage = useCallback(() => {
    if (!file) return;

    const image = imgRef.current;

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);

    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg");

    setCroppedFile(croppedImageUrl);
    setCrop();
    setCompletedCrop();
    setShowModal(false);
  }, [completedCrop]);

  const onSubmit = (data) => {
    setLoading(true);
    handleAddUser(data);
    navigate("/users");
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Header title={"Create a new user"} />
      <Grid gap={4} sx={styles.flexRow}>
        <Grid item>
          <Paper elevation={0} sx={styles.mainCard}>
            <Box onClick={handleOpenModal} sx={styles.photoContainer}>
              <Box sx={styles.uploadPhotoContainer}>
                {croppedFile ? (
                  <img src={croppedFile} style={styles.uploadedImg} />
                ) : (
                  <Box
                    sx={styles.uploadPhotoLayout}
                    role="presentation"
                    tabIndex="0"
                  >
                    <CameraIcon fontSize="large" />
                    <Typography fontWeight="500" variant="caption">
                      Upload photo
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={0} sx={styles.mainCard}>
            <Grid container>
              <Grid container gap={2}>
                <Grid item flex={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Full Name"
                    name="email"
                    autoFocus
                    {...register("fullname", { required: true })}
                  />
                </Grid>
                <Grid item flex={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                    {...register("email", { required: true })}
                  />
                </Grid>
              </Grid>

              <Grid container gap={2}>
                <Grid item flex={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Company"
                    name="email"
                    autoFocus
                    {...register("company", { required: false })}
                  />
                </Grid>
                <Grid item flex={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="role"
                    name="email"
                    autoFocus
                    {...register("role", { required: true })}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 2, justifyContent: "flex-end" }}>
                <LoadingButton
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  variant="contained"
                >
                  Create User
                </LoadingButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ImageUpload
        isOpen={showModal}
        file={file}
        crop={crop}
        imgRef={imgRef}
        handleCrop={handleCrop}
        handleCompletedCrop={handleCompletedCrop}
        handleFileDrop={handleFileDrop}
        handleSelectedFile={handleSelectedFile}
        handleSubmit={getCroppedImage}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
};

export default CreateUser;
