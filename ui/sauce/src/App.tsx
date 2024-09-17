import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/common/Header";
import { LoggedHomePage } from "./pages/LoggedHomePage";
import { LoginPage } from "./pages/LoginPage";
import { PublicHomePage } from "./pages/PublicHomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { useUserStore } from "./states/userState";

function App() {

  const { user } = useUserStore();

  const homeComponent = user ? <LoggedHomePage /> : <PublicHomePage />

  return <>
    <AppHeader />
    <Routes>
      <Route index element={homeComponent} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </>
}

export default App;
