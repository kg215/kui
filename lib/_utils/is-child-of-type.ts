/* eslint-disable import/export */
import React from "react";

export function isChildOfType(
  child: React.ReactNode,
  type: "text"
): child is string;

export function isChildOfType(
  child: React.ReactNode,
  type: "number"
): child is number;

export function isChildOfType<T extends keyof JSX.IntrinsicElements>(
  child: React.ReactNode,
  type: T
): child is React.ReactComponentElement<T>;

export function isChildOfType<T extends React.ElementType>(
  child: React.ReactNode,
  type: T
): child is React.ReactElement<
  T extends React.ElementType<infer P> ? P : any,
  T
>;

export function isChildOfType(
  child: React.ReactNode,
  type: "text" | "number" | React.ElementType
) {
  if (typeof child === "undefined" || child === null) return false;
  if (typeof child === "string") {
    return type === "text";
  }
  if (typeof child === "number") {
    return type === "number";
  }
  if (React.isValidElement(child)) {
    if (typeof type === "string") {
      return child.type === type;
    }
    if (typeof type === "function" && typeof child.type === "function") {
      return child.type === React.createElement(type, {}).type;
    }
    // forwardRef
    if (typeof type === "object" && typeof child.type === "object") {
      //@ts-ignore
      return child["$$typeof"] === React.createElement(type, {})["$$typeof"];
    }
  }
  return false;
}
/* eslint-enable import/export */
