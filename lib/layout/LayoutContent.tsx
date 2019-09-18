import React from "react";
import {createRocket} from "../_utils/create-rocket";
import {InferProps} from "../_utils/util";

export const LayoutContent = Object.assign(
    createRocket(
        "LayoutContent",
        "main.ks-layout__content",
        "div.ks-layout__content-inner"
    )
);

export type LayoutContentProps = InferProps<typeof LayoutContent>;