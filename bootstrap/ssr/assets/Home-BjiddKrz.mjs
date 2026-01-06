import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Users, Server, Clock, BarChart } from "lucide-react";
import { B as Button } from "./button-CjC9Szlf.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DTx77LuE.mjs";
import { usePage, Head, Link } from "@inertiajs/react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const Home = () => {
  const auth = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Home" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex w-64 flex-col h-screen bg-muted border-r", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-b", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Dashboard" }) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 absolute bottom-0 border-t ", children: /* @__PURE__ */ jsx(Link, { href: "/logout", children: "Logout" }) })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 p-6 overflow-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            "Welcome ",
            auth?.name
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              className: "md:hidden",
              onClick: () => alert(""),
              children: "Logout"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Users" }),
              /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "1,234" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "+12% from last month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "API Requests" }),
              /* @__PURE__ */ jsx(Server, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "45.2k" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "+8% from last month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Response Time" }),
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "42ms" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "-3ms from last month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Active Projects" }),
              /* @__PURE__ */ jsx(BarChart, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "12" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "+2 from last month" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  Home as default
};
