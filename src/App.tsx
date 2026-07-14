import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
