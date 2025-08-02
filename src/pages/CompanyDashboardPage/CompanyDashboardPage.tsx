import Header from "./components/Header";
import MyJobMelas from "./components/MyJobMelas";
import Sidebar from "./components/Sidebar";
import UpcomingJobMelas from "./components/UpcomingJobMelas";

const CompanyDashboard = () => {

    return (
        <div className="bg-gray-200">
            <div className="flex h-screen overflow-hidden">

                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="overflow-auto p-6 w-full space-y-20">
                        <MyJobMelas />

                        <UpcomingJobMelas />

                    </main>
                </div>
            </div>
        </div >
    );
};

export default CompanyDashboard;