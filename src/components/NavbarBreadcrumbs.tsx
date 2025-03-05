import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

interface NavbarBreadcrumbsProps {
  breadcrumbs: string[];
}

export default function NavbarBreadcrumbs({ breadcrumbs }: NavbarBreadcrumbsProps) {
  

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((crumb, index) => (
        <Typography 
          key={index} 
          variant="body1" 
          sx={{ color: index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit', fontWeight: index === breadcrumbs.length - 1 ? 600 : 'normal' }}
        >
          {crumb}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
