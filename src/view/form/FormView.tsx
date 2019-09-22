import React,{Fragment} from "react";
import Form, {
    CheckBox,
    Input
} from "../../../lib/form";
interface FormViewState{
    inputValue?:string
}
class FormView extends React.Component{

    state:FormViewState={
        inputValue:""
    };

    render():JSX.Element{
        return <Form>
            <Form.Item label={"文本输入框"}>
                <Input required onChange={(v)=>{
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
                <CheckBox
                    options={[
                        {text:"多选哦1"}
                    ]}
                />
            </Form.Item>
        </Form>
    }
}

export default FormView;
