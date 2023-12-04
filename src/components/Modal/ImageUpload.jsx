import React from "react";
import Dropzone from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageUpload = ({
  isOpen,
  file,
  crop,
  handleCrop,
  imgRef,
  handleCompletedCrop,
  handleFileDrop,
  handleSelectedFile,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Upload Photo</DialogTitle>
      <DialogContent>
        {file ? (
          <ReactCrop
            crop={crop}
            onChange={handleCrop}
            style={styles.cropContainer}
            onComplete={handleCompletedCrop}
          >
            <img
              ref={imgRef}
              src={file}
              alt="profile"
              style={styles.img}
            />
          </ReactCrop>
        ) : (
          <Dropzone onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                style={{
                  ...styles.dropZone,
                  borderColor: isDragActive ? "#2196f3" : "#eeeeee",
                }}
              >
                <input {...getInputProps()} onChange={handleSelectedFile} />
                <p>Drag and drop a file here, or click to select a file</p>
              </div>
            )}
          </Dropzone>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  cropContainer: { width: "400px", height: "400px" },
  img:{ objectFit: "contain", width: "400px", height: "400px" },
  dropZone: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    color: "#bdbdbd",
    border: "2px dashed",
    borderRadius: 2,
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
};

export default ImageUpload;
