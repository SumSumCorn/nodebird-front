import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useinput from '../hooks/useInput';
import { loginRequestAction } from '../reducer/user';

function LoginForm() {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useinput('');
  const [password, onChangePassword] = useinput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    // console.log(email,password);
    dispatch(loginRequestAction({ email, password }));
    // setIsLoggedIn(true);
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={logInLoading} style={{ marginTop: '10px' }}>로그인</Button>
        <Link href="/signup"><a><Button style={{ marginTop: '10px' }}>회원가입</Button></a></Link>
      </div>
    </Form>
  );
}

export default LoginForm;
