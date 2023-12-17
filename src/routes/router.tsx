import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import OpenChat from "@/page/OpenChat";
import NotFound from "@page/NotFound";
import Login from "@page/Login";
import WebRtcTest from "@page/WebRtcTest";
import VideoCall from "@page/Reference";
import Redirect from "@components/Redirect";
import ProtectAuth from "@page/ProtectAuth";
import ProtectMain from "@page/ProtectMain";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectAuth>
            <Login />
          </ProtectAuth>
        }
      />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            // <ProtectMain>
            <Main />
            // </ProtectMain>
          }
        />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/rtctest" element={<WebRtcTest />} />
        <Route path="/rtc" element={<VideoCall />} />

        {["/me", "/record", "/addRecord", "/profile", "/search", "/record/:recordId", "/record/edit/:recordId", "/profile/:profileId"].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              // <ProtectMain>
              <MyPage />
              // </ProtectMain>
            }
          />
        ))}
        <Route path="/Redirect" element={<Redirect />} />
        {["/oauth2/google/callback"].map((path) => (
          <Route key={path} path={path} element={<Main />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
