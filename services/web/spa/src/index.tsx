import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Application from "./containers/Application";
import theme from './containers/Application/theme';

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(<ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
        <Application />
    </React.StrictMode>
</ThemeProvider>
);
