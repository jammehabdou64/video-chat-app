import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-CjC9Szlf.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-DTx77LuE.mjs";
import { I as Input } from "./input-CTBr40PW.mjs";
import { H as Header, L as Label } from "./Header-BPVhw9yf.mjs";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "lucide-react";
const Register = () => {
  const onChangeHandler = (e) => {
    const target = e.target;
    setData({ ...data, [target.name]: target.value });
  };
  const { data, setData, processing, errors, post } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/auth/register");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Create an account" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Enter your information to create an account" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                placeholder: "John Doe",
                value: data.name,
                name: "name",
                onChange: onChangeHandler,
                required: true
              }
            ),
            errors?.name && /* @__PURE__ */ jsx("small", { className: "text-sm text-red-500", children: errors?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                placeholder: "name@example.com",
                value: data.email,
                onChange: onChangeHandler,
                name: "email",
                required: true
              }
            ),
            errors?.email && /* @__PURE__ */ jsx("small", { className: "text-sm text-red-500", children: errors?.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                onChange: onChangeHandler,
                required: true
              }
            ),
            errors?.password && /* @__PURE__ */ jsx("small", { className: "text-sm text-red-500", children: errors?.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "confirm-password",
                type: "password",
                value: data.confirmPassword,
                name: "confirmPassword",
                onChange: onChangeHandler,
                required: true
              }
            ),
            errors?.confirmPassword && /* @__PURE__ */ jsx("small", { className: "text-sm text-red-500", children: errors?.confirmPassword })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col space-y-4", children: [
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: processing, children: processing ? "Creating account..." : "Register" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-primary hover:underline", children: "Login" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  Register as default
};
