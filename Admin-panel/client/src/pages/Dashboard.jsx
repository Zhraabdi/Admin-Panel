import DashboardHeader from "../components/DashboardHeader";
import Products from "./Products";

function Dashboard() {
  return (
    <div>
      <main>
        <DashboardHeader/>
        <Products />
      </main>
    </div>
  );
}

export default Dashboard;
