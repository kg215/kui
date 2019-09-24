import React,{Fragment} from "react";
import Form, {
    CheckBoxGroup,
    CheckBox,
    Input, Upload
} from "../../../lib/form";
import {Select} from "../../../lib/form/Select";
interface FormViewState{
    inputValue?:string
}
class FormView extends React.Component{

    state:FormViewState={
        inputValue:""
    };

    render():JSX.Element{
        return <Form>
            <Form.Item required label={"文本输入框"}>
                <Input onChange={(v)=>{
                    this.setState({inputValue:v});
                }} />
                {
                    this.state.inputValue?<Fragment>
                        <span style={{marginLeft:10}}>输入内容:</span>
                        <span style={{marginLeft:10}}>{this.state.inputValue}</span>
                    </Fragment>:null
                }
            </Form.Item>
            <Form.Item label={"文本域"}>
                <Input required cols={30} rows={10} onChange={v=>{
                    console.log(v)
                }} type={"textarea"} />
            </Form.Item>
            <Form.Item label={"多选"}>
                <CheckBoxGroup
                    defaultValue={[2]}
                    options={[
                        {value:1,text:"多个CheckBox1"},
                        {value:"2",text:"多个CheckBox2"},
                        {value:"3",text:"多个CheckBox3"},
                    ]}
                    onChange={
                        (v,{event})=>{
                            console.log(v)
                        }
                    }
                />
                <CheckBox checked onChange={(v)=>{
                    console.log(v);
                }} text="单个checkbox" />
            </Form.Item>
            <Form.Item required label={"下拉框"}>
                <Select options={[
                    {text:"下拉选项1",value:"1"},
                    {text:"下拉选项2",value:"2"}
                ]} />
            </Form.Item>
            <Form.Item required label={"文件上传"}>
                <Upload />
            </Form.Item>
        </Form>
    }
}

export default FormView;
