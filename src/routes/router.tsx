import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import OpenChat from "@/page/OpenChat";
import Search from "@components/Search";
import NotFound from "@page/NotFound";
import Login from "@page/Login";
import Test from "@page/Test";
import MakeRoom from "@components/Chat/MakeRoom";
import VideoChat from "@page/VideoChat";
import Streaming from "@page/Streaming";
import SdpOffer from "@page/SdpOffer";
import VideoMain from "@page/VideoMain";
import WebRTC from "@page/webRTC";
import WebRtcTest from "@page/WebRtcTest";
import VideoCall from "@page/Reference";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/video" element={<VideoChat />} />
        <Route path="/stream" element={<Streaming />} />
        <Route path="/SdpOffer" element={<SdpOffer />} />
        <Route path="/videomain" element={<VideoMain />} />
        <Route path="/room/random" element={<WebRTC />} />
        <Route path="/room/:id" element={<WebRTC />} />
        <Route path="/rtctest" element={<WebRtcTest />} />
        <Route path="/rtc" element={<VideoCall />} />
        {["/me", "/record", "/addRecord", "/profile", "/search"].map((path) => (
          <Route key={path} path={path} element={<MyPage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
