import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAppContext } from "../../context/AuthContext";
import EditUserDialog from "./EditUserDialog";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import {
  DELETE_USER_MESSAGE,
  DELETE_USER_TITLE,
} from "../../components/Constants";

export default function Users() {
  const startIcon = React.useMemo(() => <AddIcon />, []);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [user, setUser] = React.useState();
  const { users, handleUpdateUser, handleDeleteUser } = useAppContext();
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "fullname", headerName: "Full name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="edit">
              <IconButton onClick={() => handleEditUser(params.row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="delete">
              <IconButton onClick={() => setDeleteUser(params.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const handleAddUser = () => {
    navigate("/user/new");
  };

  const handleEditUser = (data) => {
    setUser(data);
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const setDeleteUser = (userId) => {
    setUser(userId)
    handleOpenConfirmDialog()
  }

  const deleteUser = () => {
    const response = handleDeleteUser(user)
    if (response) {
      handleCloseConfirmDialog()
    } 
  }

  const handleOpenConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };
  return (
    <React.Fragment>
      <Header
        title={"Users"}
        onButtonClick={handleAddUser}
        buttonText={"Add User"}
        buttonProps={{ startIcon: startIcon }}
      />
      <Card>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Card>
      <EditUserDialog
        open={showDialog}
        data={user}
        handleUpdateUser={handleUpdateUser}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <ConfirmationDialog
        open={showConfirmDialog}
        title={DELETE_USER_TITLE}
        body={DELETE_USER_MESSAGE}
        handleSubmit={deleteUser}
        handleClose={handleCloseConfirmDialog}
        confirmButtonText="Delete"
      />
    </React.Fragment>
  );
}
