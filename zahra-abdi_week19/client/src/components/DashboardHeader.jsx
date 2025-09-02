import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "../components/Search";
import { useUI } from "../context/UIContext";
import { deleteCookie } from "../utils/cookie";


function DashboardHeader({ isLoading }) { 
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: uiState, dispatch: uiDispatch } = useUI();

  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    deleteCookie("token");
    toast.success("خروج با موفقیت انجام شد");
    navigate("/login");
  };

  return (
    <header className="mx-3 bg-white border border-grayborder rounded-2xl mt-4 py-3 flex flex-col md:flex-row justify-between md:items-center gap-4">
    <div className="max-w-[1140px]  flex justify-between items-center px-4 ">
    <Search value={uiState.searchTerm} onChange={(val) => uiDispatch({ type: "SET_SEARCH", payload: val })} isLoading={isLoading} />
    </div>

    <div className="flex items-center justify-between w-full md:w-auto gap-4 border-t md:border-t-0 md:border-r border-grayborder px-4 pt-3 md:pt-0">
      <div>
      <img src="images/profile.png" alt="" />
      </div>

    <div className="flex flex-col text-right flex-1">
    <span className="whitespace-nowrap text-base">{authState.user?.username}</span>
    <span className="text-sm text-gray-500">مدیر</span>
    </div>
    <div>
    <button className="px-3 py-1 rounded-md border bg-bluecustom text-white" onClick={handleLogout}>خروج</button>
    </div>
    </div>
    </header>
  );
}

export default DashboardHeader;
