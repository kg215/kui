import React, { Suspense } from "react";
import {HashRouter} from "react-router-dom";
import {Layout} from "../../lib/layout"
import {Menu} from "../../lib/menu"
import {AppRouter} from "./AppRouter";
import {MenuItems} from "../config/menus";

class App extends React.Component<{}, {}> {
    render() {
        return <Suspense fallback={<>...</>}>
            <HashRouter>
                <Layout>
                    <Layout.Header>
                        <Menu theme={"dark"} title="Typescript写React-UI库">
                            <Menu.Item title="没用的菜单项1" />
                            <Menu.Item title="没用的菜单项2" />
                            <Menu.Item title="没用的菜单项3" />
                            <Menu.Item title="没用的菜单项4" />
                        </Menu>
                    </Layout.Header>
                    <Layout.Body>
                        <Layout.Sider>
                            <Menu mode="inline">
                                <MenuItems />
                            </Menu>
                        </Layout.Sider>
                        <Layout.Content>
                            <AppRouter />
                        </Layout.Content>
                    </Layout.Body>
                    {/*<Layout.Footer>*/}
                    {/*    <div>隐私保护 xx公司 版权所有 京ICP证000001</div>*/}
                    {/*    <div>客服服务热线:123456 违法和不良信息举报电话:10101 举报邮箱192394600@qq.com</div>*/}
                    {/*    <div>温馨提示:xxxxxx</div>*/}
                    {/*</Layout.Footer>*/}
                </Layout>
            </HashRouter>
        </Suspense>
    }
}

export default App;

