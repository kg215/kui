import React,{lazy,useEffect,useState,Fragment} from "react";
import _ from "lodash";
import {RouteComponentProps} from "react-router";
import {Route} from "react-router-dom";
import {routeCT} from "../type/types";
import {Menu} from "../../lib/menu"
const Icons =  lazy(()=>import(/*webpackChunkName: "Icons"*/"../view/icon/Icons"));
const Buttons =  lazy(()=>import(/*webpackChunkName: "Buttons"*/"../view/button/Buttons"));
const Flex =  lazy(()=>import(/*webpackChunkName: "Flex"*/"../view/flex/Flex"));
const Grid =  lazy(()=>import(/*webpackChunkName: "Grid"*/"../view/grid/Grid"));
const FormView = lazy(()=>import(/*webpackChunkName: "FormView"*/"../view/form/FormView"));
const Modals = lazy(()=>import(/*webpackChunkName: "Modals"*/"../view/modal/Modals"));
const Progresses = lazy(()=>import(/*webpackChunkName: "Progresses"*/"../view/progress/Progresses"));
const Messages = lazy(()=>import(/*webpackChunkName: "Progresses"*/"../view/message/Messages"));
interface MenuItemTitlesProps {
    id:string|number,
    title:string,
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    path?:string,
    children?:MenuItemTitlesProps[]
}

export const menus:MenuItemTitlesProps[] = [
    {id:_.uniqueId(),title:"通用",
        children:[
            {id:_.uniqueId(),title:"按钮",path:"/buttons",component:Buttons},
            {id:_.uniqueId(),title:"Icon图标",path:"/icons",component:Icons},
            {id:_.uniqueId(),title:"Flex",path:"/flex",component:Flex},
            {id:_.uniqueId(),title:"Grid",path:"/grid",component:Grid},
        ]
    },
    {id:_.uniqueId(),title:"布局",
        children:[
            {id:_.uniqueId(),title:"Layout",path:"/grid"},
        ]
    },
    {id:_.uniqueId(),title:"数据处理",
        children:[
            {id:_.uniqueId(),title:"Form表单",path:"/FormView",component:FormView},
        ]
    },
    {id:_.uniqueId(),title:"反馈",
        children:[
            {id:_.uniqueId(),title:"弹出层",path:"/Modal",component:Modals},
            {id:_.uniqueId(),title:"进度条",path:"/Progresses",component:Progresses},
            {id:_.uniqueId(),title:"消息提示",path:"/Messages",component:Messages},
        ]
    },
];

export const MenuItems:React.FC<any>=function(){
    const [selected,setSelected] = useState(null);
    useEffect(()=>{
        let defaultSelect = selected || (_.head(menus)!.children[0]["id"] || _.head(menus).title);
        setSelected(defaultSelect);
    });
    return <Fragment>
        {
            menus.map((v,i)=>{
                if(v.children){
                    return <Menu.SubMenu key={v.id} defaultOpen={i===0} title={v.title}>
                        {v.children.map((vv)=>{
                            return <Menu.Item
                                style={{padding:"0 40px"}}
                                key={vv.id}
                                selected={vv.id==selected}
                                path={vv.path}
                                onClick={()=>setSelected(vv.id)}>
                                {vv.title}
                            </Menu.Item>
                        })}
                    </Menu.SubMenu>
                }else{
                    return <Menu.Item key={v.id} path={v.path} selected={v.id==selected} onClick={()=>setSelected(v.id)} title={v.title}>
                        {v.title}
                    </Menu.Item>
                }
            })
        }
    </Fragment>;
};

const mapRoute = (C:routeCT,path:string,id:string|number)=>{
    if(C){
        return <Route key={id} path={path} component={C} />
    }
};
export const routers= menus.map(v=>{
    if(v.children){
        return v.children.map(vv=>{
            return mapRoute(vv.component,vv.path,vv.id);
        });
    }
    return mapRoute(v.component,v.path,v.id);
});