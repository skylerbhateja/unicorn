import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Header = ({ title, buttonText, onButtonClick, buttonProps }) => {
  return (
    <Box
      sx={styles.container}
    >
      <Typography variant="h4" fontSize={"1.5rem"} fontWeight={"700"}>
        {title}
      </Typography>
      {buttonText && (
        <Button variant="contained" onClick={onButtonClick} {...buttonProps}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    mb: "3%",
  },
};

export default Header;
