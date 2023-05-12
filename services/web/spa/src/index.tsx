import React from "react";
import { createRoot } from "react-dom/client";
import Application from "./containers/Application";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Application />);
