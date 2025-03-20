import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import Search from './Search';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // Define breadcrumb paths dynamically
  const breadcrumbMap: Record<string, string[]> = {
    '/admin/dashboard': ['Dashboard', 'Home'],
    '/admin/users': ['Dashboard', 'Users'],
    '/master/manage-service': ['Master', 'Manage Service'],
    '/master/manage-repair': ['Master', 'Manage Repair'],
  };

  // Get breadcrumbs based on the current pathname
  const breadcrumbs = breadcrumbMap[location.pathname] || ['Dashboard'];

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs breadcrumbs={breadcrumbs} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
