import {Button, Form, Input} from "antd";
import React, {useCallback, useState} from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const CommentForm = ({post})=>{
    const id = useSelector((state)=>state.user.me?.id)
    const [commentText,onChangeCommentText] = useInput('')
    const onSubmitComment = useCallback((e)=>{
        console.log(post.id,commentText)
    },[commentText])
    return(
        <Form onFinish={onSubmitComment}>
            <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
            <Button type={"primary"} htmlType={"submit"} >삐약</Button>
        </Form>
    )
}

CommentForm.propTypes = {post: PropTypes.object}

export default CommentForm;