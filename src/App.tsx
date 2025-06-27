import MainLayout from "@/layouts/MainLayout";
import AllCompaniesPage from "@/pages/AllCompaniesPage";
import AllMelasPage from "@/pages/AllMelasPage";
import CompanyDetailsPage from "@/pages/CompanyDetailsPage";
import HomePage from "@/pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/all-companies" element={<AllCompaniesPage />} />
          <Route path="/all-melas" element={<AllMelasPage />} />
          <Route path="/company/:phoneNo" element={<CompanyDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
