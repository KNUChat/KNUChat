import styled from "styled-components";
import ProfileTab from "./ProfileTab";
import RecordTab from "./RecordTab";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import ProfileContent from "@components/Profile/ProfileContent";
import RecordContent from "@components/Record/RecordContent";
import AddRecord from "@components/Record/AddRecord";
import Search from "@components/Search";

const ContentTable: { [key: string]: ReactNode } = {
  "/me": (
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
  const location = useLocation();
  const path = location.pathname;
  const ContentComponent = () => {
    return ContentTable[path];
  };

  return (
    <MainContentWrapper>
      <ContentComponent />
    </MainContentWrapper>
  );
};

export default MainContent;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
