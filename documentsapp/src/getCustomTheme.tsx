import type {} from '@mui/material/themeCssVarsAugmentation';
import {ThemeOptions, alpha} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import {PaletteMode} from '@mui/material';

declare module '@mui/material/styles/createPalette' {
    interface ColorRange {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    interface PaletteColor extends ColorRange {
    }
}

export const brand = {
    50: '#e4f1fa',
    100: '#bedbf5',
    200: '#97c5ee',
    300: '#72aee6',
    400: '#5b9de1',
    500: '#498edb',
    600: '#4480ce',
    700: '#3c6fbb',
    800: '#365ea9',
    900: '#2b4189',
};

export const secondary = {
    50: '#ece8f6',
    100: '#cfc6e9',
    200: '#afa0dc',
    300: '#907ace',
    400: '#775ec3',
    500: '#5e43b8',
    600: '#553eb2',
    700: '#4736a9',
    800: '#3b30a1',
    900: '#252592',
};

export const gray = {
    50: '#FBFCFE',
    100: '#EAF0F5',
    200: '#D6E2EB',
    300: '#BFCCD9',
    400: '#94A6B8',
    500: '#5B6B7C',
    600: '#4C5967',
    700: '#364049',
    800: '#131B20',
    900: '#090E10',
};

export const green = {
    50: '#f2f8e9',
    100: '#dfedc8',
    200: '#cae0a6',
    300: '#b5d483',
    400: '#a5cb67',
    500: '#96C24D',
    600: '#86b245',
    700: '#729e3b',
    800: '#5f8a32',
    900: '#3d6822',
};

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            light: brand[200],
            main: brand[700],
            dark: brand[800],
            contrastText: brand[50],
            ...(mode === 'dark' && {
                contrastText: brand[100],
                light: brand[300],
                main: brand[400],
                dark: brand[800],
            }),
        },
        secondary: {
            light: secondary[300],
            main: secondary[500],
            dark: secondary[800],
            ...(mode === 'dark' && {
                light: secondary[400],
                main: secondary[500],
                dark: secondary[900],
            }),
        },
        warning: {
            main: '#F7B538',
            dark: '#F79F00',
            ...(mode === 'dark' && {main: '#F7B538', dark: '#F79F00'}),
        },
        error: {
            light: red[50],
            main: red[500],
            dark: red[700],
            ...(mode === 'dark' && {light: '#D32F2F', main: '#D32F2F', dark: '#B22A2A'}),
        },
        success: {
            light: green[300],
            main: green[600],
            dark: green[800],
            ...(mode === 'dark' && {
                light: green[400],
                main: green[500],
                dark: green[700],
            }),
        },
        grey: {
            50: gray[50],
            100: gray[100],
            200: gray[200],
            300: gray[300],
            400: gray[400],
            500: gray[500],
            600: gray[600],
            700: gray[700],
            800: gray[800],
            900: gray[900],
        },
        divider: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
        background: {
            default: '#F6F8FA',
            paper: gray[50],
            ...(mode === 'dark' && {default: gray[900], paper: gray[800]}),
        },
        text: {
            primary: gray[800],
            secondary: gray[600],
            ...(mode === 'dark' && {primary: '#fff', secondary: gray[400]}),
        },
        action: {
            selected: `${alpha(brand[900], 0.2)}`,
            hover: `${alpha(brand[500], 0.2)}`,
            ...(mode === 'dark' && {
                selected: alpha(brand[800], 0.2),
            }),
        },
    },
    typography: {
        h1: {
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 78 / 70,
            letterSpacing: -0.2,
        },
        h2: {
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: 42,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h5: {
            fontSize: 18,
            fontWeight: 500,
            color: gray[600],
        },
        h6: {
            fontSize: 18,
        },
        subtitle1: {
            fontSize: 18,
        },
        subtitle2: {
            fontSize: 16,
        },
        body1: {
            fontWeight: 400,
            fontSize: 15,
        },
        body2: {
            fontWeight: 400,
            fontSize: 14,
        },
        caption: {
            fontWeight: 400,
            fontSize: 12,
        },
    },
});

export default function getCustomTheme(mode: PaletteMode): ThemeOptions {
    return {
        ...getDesignTokens(mode),
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: ({theme}) => ({
                        '& .MuiFilledInput-root': {
                            backgroundColor: theme.palette.grey[50],
                            width: '280px',
                            height: '42px',
                        },
                    }),
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: ({theme}) => ({
                        ".MuiTabs-indicator": {
                            background: theme.palette.primary.main,
                        }
                    }),
                },
            },
            MuiTable: {
                styleOverrides: {
                    root: {
                        minWidth: '650px',
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: `${alpha(brand[200], 0.3)}`,
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: ({theme}) => ({
                        '&:hover': {
                            backgroundColor: theme.palette.grey[500],
                        },
                    }),
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: 'none',
                        padding: '8px',
                    },
                    head: {
                        fontWeight: 'bold',
                        fontSize: '1rem',
                    },
                },
            },
            /*
            MuiChip: {
                styleOverrides: {
                    root: ({theme}) => ({
                        alignSelf: 'end',
                        py: 1.5,
                        px: 0.5,
                        background: `linear-gradient(to bottom right, ${gray[50]}, ${gray[100]})`,
                        border: '1px solid',
                        borderColor: `${alpha(brand[500], 0.3)}`,
                        fontWeight: '600',
                        '&:focus-visible': {
                            borderColor: brand[800],
                            backgroundColor: brand[100],
                        },
                        '& .MuiChip-label': {
                            color: brand[800],
                        },
                        '& .MuiChip-icon': {
                            color: brand[800],
                        },
                        ...(theme.palette.mode === 'dark' && {
                            background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
                            borderColor: `${alpha(brand[500], 0.5)}`,
                            '&:hover': {
                                backgroundColor: brand[600],
                            },
                            '&:focus-visible': {
                                borderColor: brand[200],
                                backgroundColor: brand[600],
                            },
                            '& .MuiChip-label': {
                                color: brand[200],
                            },
                            '& .MuiChip-icon': {
                                color: brand[200],
                            },
                        }),
                    }),
                },
            },
             */

        },
    }
}

