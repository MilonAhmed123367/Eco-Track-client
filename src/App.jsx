import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailsPage from "./pages/DetailsPage";
import Page404 from "./pages/Page404";
import AddChallengePage from "./pages/AddChallengePage";
import MyActivitiesPage from "./pages/MyActivitiesPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChallengesPage from "./pages/ChallengesPage";
function App() {
  return (
    <Routes>
      <Route path="challenges" element={<ChallengesPage />} />
      
        <Route index element={<HomePage />} />
        <Route path="challenges/:id" element={<DetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="challenges/add" element={<AddChallengePage />} />
          <Route path="my-activities" element={<MyActivitiesPage />} />
          <Route path="my-activities/:id" element={<MyActivitiesPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      
    </Routes>
  );
}

export default App;
