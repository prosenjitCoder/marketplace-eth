import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const ActiveLink = ({ children, activeLinkClass, ...props }) => {
  let className = children.props.className ?? "";
  const { pathname } = useRouter();
  if (pathname === props.href) {
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "!text-indigo-600"
    }`;
  }
  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
