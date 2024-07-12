
import { Card, CardContent, Typography } from '@mui/material';

const UserManagement = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          User Management
        </Typography>
        <Typography variant="body2">
          Manage your users here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
