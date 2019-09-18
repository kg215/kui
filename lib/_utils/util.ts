import React from "react";

export type InferProps<C> = C extends React.ComponentType<infer P> ? P : never;
