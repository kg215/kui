import React from "react";
import Form from "../../../lib/form";
class FormView extends React.Component{

    render():JSX.Element{
        return <Form>
            <Form.Item label={"表单一"}>
                啊表单啊啊表单啊啊表单啊啊
            </Form.Item>
            <Form.Item label={"表单2"}>
                啊表单啊啊表单啊啊
            </Form.Item>
        </Form>
    }
}

export default FormView;
