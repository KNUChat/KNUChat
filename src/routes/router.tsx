import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import Chat from "@/page/Chat";
import OpenChat from "@/page/OpenChat";
import Profile from "@/page/Profile";
import Search from "@/page/Search";
import Record from "@/page/Record";
import NotFound from "@page/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Record" element={<Record />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
