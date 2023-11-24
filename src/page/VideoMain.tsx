import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoMain = () => {
  const [uuid, setUuid] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<string[]>([]); // 이 배열은 서버에서 가져온 방 목록을 저장합니다.
  const navigate = useNavigate();
  console.log(id, uuid);
  useEffect(() => {
    const storedUuid = localStorage.getItem("uuid");
    localStorage.setItem("id", id);
    if (!storedUuid) {
      const newUuid = generateUuid();
      localStorage.setItem("uuid", newUuid);
      setUuid(newUuid);
    } else {
      setUuid(storedUuid);
    }
  }, []);
  useEffect(() => {
    console.log(id, uuid);
  });

  const generateUuid = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const addUuidToButtonLink = (buttonValue: string) => {
    const ref = `/room/${buttonValue}/user/${uuid}`;
    console.log("link.href:" + ref);
    return ref;
  };

  return (
    <main role="main" className="container">
      <h1>Simple WebRTC Signaling Server</h1>
      <div id="container">
        <p>This part receives a room number (or generates new one), and redirects current user there.</p>
        <form method="post" action="/KNUChat/room" id="form">
          <input type="hidden" id="uuid" name="uuid" value={uuid} />
          <div className="row justify-content-md-center">
            <div className="input-group col-md-6 mb-3 justify-content-md-center">
              <div className="mb-3">
                <label htmlFor="rooms-list">Select one of the rooms created:</label>
                <br />
                <h4>
                  <span id="rooms-list">
                    {rooms.map((room, index) => (
                      <a key={index} href={addUuidToButtonLink(room)} id={`button-link-${room}`}>
                        <button type="button" name="action" value={room} className="btn badge badge-primary">
                          {room}
                        </button>
                      </a>
                    ))}
                  </span>
                </h4>
              </div>
              <div className="mb-3">
                <label htmlFor="id">To create a new room enter your room number, or press 'Random #' button to get a random one</label>
                <input
                  className="form-control"
                  name="id"
                  id="id"
                  type="number"
                  placeholder="Min: 0, max: 99"
                  min="0"
                  max="99"
                  value={id}
                  required
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <a href="/KNUChat/room/random">
                  <button className="btn btn-outline-success" type="button">
                    Random #
                  </button>
                </a>
                <button name="action" value="create" type="submit" className="btn btn-outline-primary">
                  Create Selected Room
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default VideoMain;
