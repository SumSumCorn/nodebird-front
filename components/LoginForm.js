import React, {useCallback} from "react";
import Link from 'next/link'
import {Button, Form, Input} from "antd";
import useinput from "../hooks/useInput";
import {useDispatch} from "react-redux";
import {loginAction} from "../reducer/user";


const LoginForm = () => {
    const dispatch = useDispatch()
    const [id, onChangeId] = useinput('');
    const [password, onChangePassword] = useinput('')

    const onSubmitForm =useCallback(()=>{
        // console.log(id,password);
        dispatch(loginAction({ id, password }))
        // setIsLoggedIn(true);
    },[id,password]);

    return(
        <Form onFinish={onSubmitForm} style={{padding: '10px'}}>
            <div>
                <label htmlFor={"user-id"}>아이디</label>
                <br/>
                <Input name={"user-id"} value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor={"user-password"}>비밀번호</label>
                <br/>
                <Input
                    name={"user-password"}
                    type={"password"}
                    value={password}
                    onChange={onChangePassword}
                    required />
            </div>
            <div>
                <Button type={"primary"} htmlType={"submit"} loading={false} style={{marginTop:'10px'}}>로그인</Button>
                <Link href={"/signup"}><a><Button style={{marginTop:'10px'}}>회원가입</Button></a></Link>
            </div>
        </Form>
    )
}

export default LoginForm;