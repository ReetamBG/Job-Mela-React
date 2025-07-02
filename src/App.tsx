import MainLayout from "@/layouts/MainLayout";
import AllCompaniesPage from "@/pages/AllCompaniesPage/AllCompaniesPage";
import AllMelasPage from "@/pages/AllMelasPage/AllMelasPage";
import CompanyDetailsPage from "@/pages/CompanyDetailsPage";
import HomePage from "@/pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import MelaDetailsPage from "@/pages/MelaDetailsPage/MelaDetailsPage";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="all-companies" element={<AllCompaniesPage />} />
            <Route path="all-melas" element={<AllMelasPage />} />
            <Route path="company/:phoneNo" element={<CompanyDetailsPage />} />
            <Route path="mela/:melaId" element={<MelaDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
