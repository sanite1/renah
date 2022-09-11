import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import api from "../../api/api"
import {useNavigate} from "react-router-dom"


export default function AccountMenu(props) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };\

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await api.post("/api/logout")
            if(response.data.success){

                console.log("Success");
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                navigate('/')
                // navigate.push("/login")
            }else{
                // seterrorMessage(response.data.err.message);
            }
        } catch(err) {
            if(err.response) {
                console.log(err.response);
                // seterrorMessage(err.response);   
            }
        }
        console.log("Logout");
    }
    

    return (
        <React.Fragment>
        <Menu
            anchorEl={props.anchorEl}
            id="account-menu"
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
            <Avatar /> Profile
            </MenuItem>
            <MenuItem>
            <Avatar /> My account
            </MenuItem>
            <Divider />
            {/* <MenuItem>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
            </MenuItem> */}
            <MenuItem>
            <ListItemIcon>
                {/* <Settings fontSize="small" /> */}
            </ListItemIcon>
            Settings
            </MenuItem>
            <MenuItem onClick={() => logout()}>
            <ListItemIcon>
                {/* <Logout fontSize="small" /> */}
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}
