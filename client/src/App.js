import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Produce from "./pages/home/Produce";
import "./index.scss";
import Page403 from "./pages/error/403";
import { useAppContext } from "./contexts/AppContext";
import { Button, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Auth from "./routes/Auth";
import RequireAuth from "./routes/RequireAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { updateProduct } from "./api/product";
import ProductLine from "./pages/productline/ProductLine";
import ProductLineInfo from "./pages/productline/ProductLineInfo";
import { Pie } from "@ant-design/plots";
import ProductLineUpdate from "./pages/productline/ProductLineUpdate";
import { useEffect } from "react";
import User from "./pages/user/User";
import ProductLineAdd from "./pages/productline/ProductLineAdd";
import { setAuthHeader } from "./api/auth";
import RequireNotAdmin from "./routes/RequireNotAdmin";
import Import from "./pages/import/Productline";
import ImportDetail from "./pages/import/ImportDetail";
import Factory from "./pages/import/Factory";
import Request from "./pages/request/Request";
import axios from "./api/axios";
import Product from "./pages/product/Product";

function App() {
  const {
    authState: { isLoading, user },
    openSideBar,
  } = useAppContext();

  const antIcon = <LoadingOutlined />;
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  useEffect(() => {
    console.log(axios.defaults);
    if (localStorage["token"]) {
      setAuthHeader(localStorage["token"]);
    }
    console.log(openSideBar);
  }, []);

  return (
    <Spin spinning={isLoading} indicator={antIcon}>
      <div className="App">
        {/* <Pie {...config} /> */}
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/" element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />

            <Route path="/produce" element={<Produce />} />
            <Route path="/request" element={<Request />} />
            {/* productline */}
            <Route path="/productline" element={<ProductLine />} />
            <Route path="/productline/:id" element={<ProductLineInfo />} />
            <Route
              path="/productline/:id/edit"
              element={<ProductLineUpdate />}
            />
            <Route path="/productline/create" element={<ProductLineAdd />} />
            {/* account */}
            <Route path="/user" element={<User />} />
            {/* importProductLine */}
            <Route path="/import/productline" element={<Import />} />
            <Route path="/import/productline/:id" element={<ImportDetail />} />
            <Route
              path="/import/productline/:id/factory"
              element={<Factory />}
            />
          </Route>
          <Route path="/403" element={<Page403 />} />
        </Routes>
      </div>
    </Spin>
  );
}

export default App;
