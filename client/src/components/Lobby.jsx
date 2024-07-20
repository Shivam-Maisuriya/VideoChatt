import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      setEmail("");
      setRoom("");
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
    // console.log(email, room);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div className="bg-slate-800 w-screen h-screen flex flex-col justify-center items-center text-white">
        <div className="size-fit bg-slate-600 p-8 flex flex-col justify-center items-center space-y-5 rounded-xl">
          <h1 className="text-3xl font-semibold">Lobby</h1>
          <form onSubmit={handleSubmit} className="w-[300px]">
            <label htmlFor="email" className="text-sm ">Email  </label><br />
            <input
              type="email"
              placeholder="enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="false"
              className="rounded-full text-black border-none outline-none px-2 py-1 text-md mb-3 w-full"
              required
            />
            <br />
            <label htmlFor="room"  className="text-sm">Room Number </label><br />
            <input
              type="text"
              placeholder="enter your room number"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="rounded-full px-2 py-1 text-md w-full text-black border-none outline-none"
              required
            />
            <br />
            <br />
            <button className="w-full bg-slate-800 text-lg py-1 rounded-full "> Join </button>
          </form >
        </div>
      </div>
    </>
  );
}

export default Lobby;
