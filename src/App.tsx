import MainLayout from "@/layouts/MainLayout";
import AllCompaniesPage from "@/pages/AllCompaniesPage/AllCompaniesPage";
import AllMelasPage from "@/pages/AllMelasPage/AllMelasPage";
import CompanyDetailsPage from "@/pages/CompanyDetailsPage";
import HomePage from "@/pages/HomePage/HomePage";
import CandidateDetailsPage from "@/pages/CandidateDetailsPage/CandidateDetailsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import MelaDetailsPage from "@/pages/MelaDetailsPage/MelaDetailsPage";
import AdminPage from "@/pages/AdminPage/AdminPage";
import AuthInitializer from "@/components/AuthInitializer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectIsUserResolved,
} from "@/store/slices/authSlice";
import CompanyDashboardPage from "./pages/CompanyDashboardPage/CompanyDashboardPage";
import Loading from "./components/customComponents/Loading";

function AppRoutes() {
  const user = useAppSelector(selectCurrentUser);
  const isResolved = useAppSelector(selectIsUserResolved);

  if (!isResolved) {
    return (
      <>
        <AuthInitializer />
        <Loading />
      </>
    );
  }

  if (user?.type === "Mela Admin") {
    return (
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route
          path="/admin/candidates/:id"
          element={<CandidateDetailsPage />}
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="all-companies" element={<AllCompaniesPage />} />
          <Route path="all-melas" element={<AllMelasPage />} />
          <Route path="company/:phoneNo" element={<CompanyDetailsPage />} />
          <Route path="mela/:melaId" element={<MelaDetailsPage />} />
        </Route>
        <Route
          path="/company/company-dashboard"
          element={
            user?.type === "Employer" ? (
              <CompanyDashboardPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    );
  }
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
