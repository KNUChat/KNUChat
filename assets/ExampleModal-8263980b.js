import{s as r,u as h,j as e,c as f,r as d,a as I,b as j,d as b,e as k}from"./index-9c93a802.js";const C={display:"flex",justifyContent:"center",alignItems:"center"},x=r.div`
  width: ${({width:o})=>o}px;
  border-radius: 0.375rem;
  padding: ${({p:o})=>o}px;
  display: flex;
  flex-direction: column;
`;x.defaultProps={p:32};const M=({children:o,width:t,p:i,onClick:s})=>{const{setShowModal:c}=h(),l=()=>{s?s():c(!1)};return e.jsx(y,{onClick:l,children:e.jsx(x,{width:t,p:i,onClick:a=>a.stopPropagation(),children:o})})},y=r.div`
  ${C}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`,w=f(o=>({mentorId:"21",setMentorId:t=>o({mentorId:t})})),v=()=>{const{mentorId:o}=w(),[t,i]=d.useState(o),[s,c]=d.useState(""),{setUpdate:l}=I(),{authToken:a}=j(),{userInfo:p}=b(),u=Number(p.id);console.log("authToken",a),console.log("userId",u),d.useRef(null);const g=async()=>{try{const n=typeof t=="number"?t:parseInt(t);if(console.log("mentorIdInt",n),isNaN(n)){console.error("Invalid menteeId or mentorId");return}const m=await k.post("http://52.79.37.100:30952/chat/room",{menteeId:u,mentorId:n,message:s},{headers:{Authorization:`${a}`},withCredentials:!1});console.log(m.data),m.status===200?(console.log("Chat room created successfully!"),l(!0)):console.error("Failed to create chat room")}catch(n){console.error("Error creating chat room:",n)}};return e.jsxs(S,{children:[e.jsx("h1",{children:"Mentor ID"}),e.jsx("label",{children:e.jsxs(B,{children:['신청하려는 멘토님의 ID는 "',t,'"입니다.']})}),e.jsx("h2",{children:"남기실 첫 번째 메세지를 작성해주세요! "}),e.jsx("label",{children:e.jsx(E,{placeholder:"First Message",type:"text",value:s,onChange:n=>c(n.target.value)})}),e.jsx(R,{onClick:g,children:"채팅 시작하기"})]})},S=r.div`
  display: flex;
  flex-direction: column;
`,B=r.h3`
  margin: 0;
`,R=r.button`
  flex: 8;
  max-width: 7rem;
  max-height: 2rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #fff;
  }
`,E=r.input`
  width: 90%;
  margin-bottom: 0.5rem;
  min-height: 2rem;
`,W=()=>{const{setShowModal:o}=h(),t=d.useCallback(()=>{o(!1)},[]);return e.jsx(M,{width:440,p:0,children:e.jsxs(e.Fragment,{children:[e.jsx(F,{}),e.jsxs(N,{children:[e.jsx($,{children:e.jsx(v,{})}),e.jsx(z,{children:e.jsx("button",{onClick:t,children:"취소"})})]})]})})},F=r.div`
  padding: 1.5rem 1.5rem 0;
`,$=r.div`
  margin: 1rem 0;
  padding: 0 0.5rem 0 1rem;
  background-color:white;
`,z=r.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color:white;
`,N=r.div`
  background-color:white;
`;export{W as default};
