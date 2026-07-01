import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import StarsIcon from '@mui/icons-material/Stars';
import SubjectIcon from '@mui/icons-material/Subject';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


const admin = true;
const teacher = true;

export const SideBarData = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        link: '/'
    },
    {
        title: 'Role',
        icon: <StarsIcon />,
        link: '/role'
    },


    {
        title: 'Courses',
        icon: <SubjectIcon />,
        link: '/courses'
    },
    
    
     
    ...teacher || admin ? [
    {
        title: 'Create New Courses',
        icon: <ImportContactsIcon />,
        link: '/create-new-courses'
    },
   
    {
        title: 'Manage Courses',
        icon: <ManageAccountsIcon />,
        link: '/manage-courses'
    },
    ] : [],

    ...admin ? [

    {
        title: 'Create User Account',
        icon: <AccountBoxIcon />,
        link: '/create-new-user'
    },


    {
        title: 'Manage User Account',
        icon: <ManageSearchIcon />,
        link: '/manage-user-account'
    }
] : []
]

