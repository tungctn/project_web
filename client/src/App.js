import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Produce from "./pages/home/Produce";
import Request from "./pages/home/Request";
import "./index.scss";
import Page403 from "./pages/error/403";
import { useAppContext } from "./contexts/AppContext";
import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Auth from "./routes/Auth";
import RequireAuth from "./routes/RequireAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { updateProduct } from "./api/product";
import ProductLine from "./pages/productline/ProductLine";

function App() {
  const {
    authState: { isLoading },
  } = useAppContext();

  const antIcon = <LoadingOutlined />;
  return (
    <Spin spinning={isLoading} indicator={antIcon}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/" element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/produce" element={<Produce />} />
            <Route path="/request" element={<Request />} />
          </Route>
          <Route path="/*" element={<Page403 />} />
        </Routes>
      </div>
    </Spin>
  );
}

export default App;
