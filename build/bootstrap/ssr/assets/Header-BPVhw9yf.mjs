import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { c as cn } from "./button-CjC9Szlf.mjs";
import { Link } from "@inertiajs/react";
import { Server } from "lucide-react";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Header = () => {
  return /* @__PURE__ */ jsx("header", { className: "w-full h-16 border-b bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-full items-center", children: [
    /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(Server, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "JCC Framework" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "ml-auto flex gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/jammehabdou64/new-jcc-express-mvc-app",
          className: "text-sm font-medium hover:underline underline-offset-4",
          target: "_blank",
          children: "Docs"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "login",
          className: "text-sm font-medium hover:underline underline-offset-4",
          children: "Login"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/register",
          className: "text-sm font-medium hover:underline underline-offset-4",
          children: "Register"
        }
      )
    ] })
  ] }) });
};
export {
  Header as H,
  Label as L
};
