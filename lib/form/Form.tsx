import React from  "react";
import {createRocket} from "../_utils/create-rocket";
import {Item} from "./Item"

export const Form=Object.assign(
    createRocket("Form","div.ks-form"),
    {Item}
);
