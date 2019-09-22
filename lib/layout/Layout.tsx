import React, { useEffect, useState} from "react";
import {createRocket,RocketProps} from "../_utils/create-rocket";
import {InferProps} from "../_utils/util";
import classNames from "classnames";
import {isChildOfType} from "../_utils/is-child-of-type";
import {LayoutContent} from "./LayoutContent";

const LayoutHeader=createRocket("LayoutHeader","header.ks-layout__header");
const LayoutFooter=createRocket("LayoutHeader","div.ks-layout__footer");
const LayoutSider=createRocket("LayoutHeader","header.ks-layout__sidebar");

function LayoutBody({className,style,children}:RocketProps) {
    const [hasSider, setHasSider] = useState<boolean>(false);
    useEffect(()=>{
        React.Children.forEach(children,child=>{
            if (isChildOfType(child, LayoutSider)) {
                setHasSider(true);
            }
        });
    });

    return <section
        className={classNames(
            "ks-layout__body",
            { "has-subsidebar": hasSider },
            className
        )}
        style={style}
    >
        {children}
    </section>
}

export const Layout = Object.assign(
    createRocket("Layout","section.ks-layout"),
    {
        Header:LayoutHeader,
        Body:LayoutBody,
        Footer:LayoutFooter,
        Sider:LayoutSider,
        Content:LayoutContent,
    }
);

export type LayoutProps = InferProps<typeof Layout>;