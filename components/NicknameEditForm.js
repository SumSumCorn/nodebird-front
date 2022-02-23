import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducer/user';

function NicknameEditForm() {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname || '');

  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }), []);

  useEffect(() => {
    if (changeNicknameDone) {
      setNickname('');
    }
  }, [changeNicknameDone]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default NicknameEditForm;
