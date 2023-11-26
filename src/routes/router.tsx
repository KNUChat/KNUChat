import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import Chat from "@/page/Chat";
import OpenChat from "@/page/OpenChat";
import NotFound from "@page/NotFound";
import Login from "@page/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/*" element={<NotFound />} />
        {["/me", "/record", "/addRecord", "/profile", "/search"].map((path) => (
          <Route key={path} path={path} element={<MyPage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
