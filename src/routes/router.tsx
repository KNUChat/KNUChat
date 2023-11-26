import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import Chat from "@/page/Chat";
import OpenChat from "@/page/OpenChat";
import Search from "@/page/Search";
import NotFound from "@page/NotFound";
import Login from "@page/Login";
import VideoChat from "@page/VideoChat";
import Streaming from "@page/Streaming";
import SdpOffer from "@page/SdpOffer";
import VideoMain from "@page/VideoMain";
import WebRTC from "@page/webRTC";
import WebRtcTest from "@page/WebRtcTest";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/video" element={<VideoChat />} />
        <Route path="/stream" element={<Streaming />} />
        <Route path="/SdpOffer" element={<SdpOffer />} />
        <Route path="/videomain" element={<VideoMain />} />
        <Route path="/room/random" element={<WebRTC />} />
        <Route path="/room/:id" element={<WebRTC />} />
        <Route path="/rtctest" element={<WebRtcTest />} />
        {["/me", "/record", "/addRecord", "/profile"].map((path) => (
          <Route key={path} path={path} element={<MyPage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
