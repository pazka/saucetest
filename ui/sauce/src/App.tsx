import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/common/Header/Header";
import { LoginPage } from "./pages/LoginPage";
import { PublicHomePage } from "./pages/PublicHomePage";
import { RegisterPage } from "./pages/RegisterPage";


function App() {
  return <>
    <AppHeader />
    
    <Routes>
        <Route index element={<PublicHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
  </>
}

export default App;
