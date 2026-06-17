import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;