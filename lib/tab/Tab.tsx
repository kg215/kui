import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import classNames from "classnames";

interface TabWrapperProps {
  checkedKey?: string;
  onChange?: (checkedKey: TabWrapperProps["checkedKey"]) => void;
  onTabClick?: (checkedKey: TabWrapperProps["checkedKey"]) => void;
}

function isUndefined(key: any): key is undefined {
  return key === undefined;
}

const TabWrapper: FC<TabWrapperProps> = function (
  {
    checkedKey,
    onChange = () => { },
    onTabClick = () => { },
    children
  }
) {
  const [key, setKey] = useState<string>(checkedKey);
  let handleClick = useCallback((key) => {
    onTabClick(key);
    setKey(key);
  }, []);
  useEffect(function () {
    setKey(checkedKey);
    onChange(checkedKey);
  }, [checkedKey]);
  useEffect(function () {
    onChange(key);
  }, [key]);

  return <div className={"ks-tab_wrapper"}>
    <div className={"ks-tab_nav"}>
      <div className={"ks-tab_list"}>
        {
          React.Children.map(children, (child: React.ReactElement, index) => {
            let id: string = String(isUndefined(child.key) ? index : child.key);
            return typeof child === "string" ?
              child
              :
              <div
                onClick={child.props.disabled ? void 0 : () => handleClick(id)}
                className={classNames("ks-tab_item",
                  {
                    "ks-tab_checked": !child.props.disabled && key === id,
                    "disabled": child.props.disabled,
                  }
                )}>
                {child.props.tab}
              </div>

          })
        }
      </div>
    </div>
    <div className={"ks-tab_body"}>
      {
        React.Children.map(children, (child: React.ReactElement, index) => {
          let id: string = String(isUndefined(child.key) ? index : child.key);
          return typeof child === "string" ?
            child
            :
            <div className={classNames("ks-tab_pane", {
              "ks-tab_pane_checked": key === id
            })}>
              {child.props.children}
            </div>
        })
      }
    </div>
  </div>
};
TabWrapper.displayName = "Tab";
interface TabPaneProps {
  key: string,
  disabled?: boolean;
  tab?: string | React.ReactNode,
}
export const TabPane: FC<TabPaneProps> = () => <Fragment />

const Tab = Object.assign(TabWrapper, {
  Pane: TabPane
});

export { Tab };

