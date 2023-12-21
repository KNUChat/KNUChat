import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import RecordTab from "./RecordTab";
import ProfileContent from "@components/Profile/ProfileContent";
import RecordContent from "@components/Record/RecordContent";
import AddRecord from "@components/Record/AddRecord";
import Search from "@components/Search";
import DetailRecord from "@components/Record/DetailRecord";
import DetailProfile from "@components/Profile/DetailProfile";
import EditRecord from "@components/Record/EditRecord";

const ContentTable = {
  "/": (
    <>
      <ProfileTab />
      <RecordTab />
    </>
  ),
  "/profile": (
    <>
      <ProfileContent />
    </>
  ),
  "/record": (
    <>
      <RecordContent />
    </>
  ),
  "/addRecord": (
    <>
      <AddRecord />
    </>
  ),
  "/search": (
    <>
      <Search />
    </>
  ),
};

const MainContent = () => {
  const { pathname } = useLocation();
  const { recordId, profileId } = useParams<{ recordId: string; profileId: string }>();
  const [selectedContent, setSelectedContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const renderSelectedContent = () => {
      if (pathname.startsWith("/record/edit/") && recordId) {
        setSelectedContent(<EditRecord recordId={recordId} />);
      } else if (pathname.startsWith("/record/") && recordId) {
        setSelectedContent(<DetailRecord recordId={recordId} />);
      } else if (pathname.startsWith("/profile/") && profileId) {
        setSelectedContent(<DetailProfile profileId={profileId} />);
      } else {
        setSelectedContent(ContentTable[pathname]);
      }
    };

    renderSelectedContent();
  }, [pathname, recordId]);

  return <MainContentWrapper>{selectedContent}</MainContentWrapper>;
};

export default MainContent;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
