import Navigation from "./navigation";
import HeaderCtrl from "./controllers/Header/HeaderCtrl";
import SidebarCtrl from "./controllers/Sidebar/SidebarCtrl";
import { useAuth } from "./context/AuthContext";

function App() {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;
  return (
    <>
      {isAuthenticated && (
        <>
          <HeaderCtrl />
          <SidebarCtrl />
        </>
      )}
      <Navigation />
    </>
  );
}

export default App;
