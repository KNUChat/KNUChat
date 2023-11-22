import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import Chat from "@/page/Chat";
import OpenChat from "@/page/OpenChat";
import Search from "@/page/Search";
import NotFound from "@page/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
        {["/me", "/record", "/addRecord", "/profile"].map((path) => (
          <Route key={path} path={path} element={<MyPage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
