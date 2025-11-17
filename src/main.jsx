// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthProvider";
// import "./index.css";
// import App from "./App";

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <router></router>
//         <Toaster position="top-center" />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import router from "./routes/Routes";
import { AuthProvider } from "./context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </AuthProvider>
);

