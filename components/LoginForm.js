import React, {useCallback, useState} from "react";
import Link from 'next/link'
import {Button, Form, Input} from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import useinput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
  padding: 10px;
`


const LoginForm = ({setIsLoggedIn}) => {
    const [id, onChangeId] = useinput('');
    const [password, onChangePassword] = useinput('')

    const onSubmitForm =useCallback(()=>{
        console.log(id,password);
        setIsLoggedIn(true);
    },[id,password]);

    return(
        <FormWrapper onFinish={onSubmitForm}>
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
            <ButtonWrapper>
                <Button type={"primary"} htmlType={"submit"} loading={false}>로그인</Button>
                <Link href={"/signup"}><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm;