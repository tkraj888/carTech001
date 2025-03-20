import { jsx as _jsx } from "react/jsx-runtime";
import Stack from '@mui/material/Stack';
import AppTheme from '../theme/AppTheme';
import SignUpCard from '../components/SignUpCard';
export default function SignUp(props) {
    return (_jsx(AppTheme, { ...props, children: _jsx(Stack, { direction: "column", component: "main", sx: [
                {
                    justifyContent: 'center',
                    height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
                    marginTop: 'max(1px - var(--template-frame-height, 0px), 0px)',
                    minHeight: '100%',
                },
                (theme) => ({
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        zIndex: -1,
                        inset: 0,
                        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundRepeat: 'no-repeat',
                        ...theme.applyStyles('dark', {
                            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    },
                }),
            ], children: _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                    justifyContent: 'center',
                    gap: { xs: 6, sm: 12 },
                    p: 2,
                    mx: 'auto',
                }, children: _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: { xs: 2, sm: 4 },
                        m: 'auto',
                    }, children: _jsx(SignUpCard, {}) }) }) }) }));
}
