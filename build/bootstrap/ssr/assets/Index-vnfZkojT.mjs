import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { B as Button } from "./button-CjC9Szlf.mjs";
import { I as Input } from "./input-CTBr40PW.mjs";
import { router } from "@inertiajs/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Home() {
  const [roomId, setRoomId] = useState("");
  const handleJoinRoom = () => {
    if (roomId.trim()) {
      router.visit(`/room/${roomId}`, { replace: true });
    }
  };
  const handleRandomRoom = () => {
    const randomId = Math.random().toString(36).substring(7);
    router.visit(`/room/${randomId}`);
  };
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-2xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Video Call" }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-300 mb-8", children: "Join a room and start calling" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "Room ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Enter room ID",
            value: roomId,
            onChange: (e) => setRoomId(e.target.value),
            onKeyPress: (e) => e.key === "Enter" && handleJoinRoom(),
            className: "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleJoinRoom,
          disabled: !roomId.trim(),
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white",
          children: "Join Room"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-slate-600" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-2 bg-slate-800 text-slate-400", children: "or" }) })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRandomRoom,
          variant: "outline",
          className: "w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent",
          children: "Create Random Room"
        }
      )
    ] })
  ] }) });
}
export {
  Home as default
};
