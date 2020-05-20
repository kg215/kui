import React from 'react'
import classNames from 'classnames'
import { Tab } from './TabProps'


const TabPanel: React.FC<Tab> = ({ children, className, style = {} }) => {

  return <div className={classNames("mtab-panel", className)} style={style}>
    {children}
  </div>
}


export default TabPanel