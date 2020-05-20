import React, { useState } from 'react'
import classNames from 'classnames'
import TabPanel from './TabPanel'
import { TabsProps, Tab } from './TabProps'
import { isChildOfType } from '../../_utils/is-child-of-type'

const Tabs: React.FC<TabsProps> = ({
  activeId,
  defaultActiveId,
  onActive,
  tabs = [],
  children,
  className,
  style
}) => {
  //如果都没传就选中第一个没有disabled的tab
  if (typeof activeId === 'undefined' && typeof defaultActiveId === 'undefined') {
    const firstAvaliable = tabs.find(x => !x.disabled)
    defaultActiveId = firstAvaliable ? firstAvaliable.id : null
  }

  const [iactiveId, setActiveId] = useState(defaultActiveId)

  if (typeof activeId === 'undefined') {
    activeId = iactiveId
    onActive = (onActive => (tab: Tab, evt: React.SyntheticEvent) => {
      setActiveId(tab.id)
      if (typeof onActive === 'function') {
        onActive(tab, evt)
      }
    })(onActive)
  }


  function getTabPanels() {
    const panelChildren: React.ReactNode[] = []

    React.Children.map(children, (child, index) => {

      if (isChildOfType(child, TabPanel)) {
        const { props, key } = child;
        const { style = {}, id } = props;
        const active = activeId === props.id;

        panelChildren.push(
          React.cloneElement(child, { key: key || id, active, style })
        );
      } else if (React.isValidElement(child)) {
        panelChildren.push(React.cloneElement(child, { key: index }));
      } else {
        panelChildren.push(<div key={index}>{child}</div>)
      }

    })

    return panelChildren
  }

  const classname = classNames('mtab', className)

  return <div className={classname} style={style}>
    {getTabPanels()}
  </div>
}

export default Object.assign(Tabs, {
  TabPanel
})