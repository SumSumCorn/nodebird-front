import {Button, Form, Input} from "antd";
import React, {useCallback, useEffect} from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addCommentRequest} from "../reducer/post";

const CommentForm = ({post})=>{
    const dispatch = useDispatch()
    const id = useSelector((state)=>state.user.me?.id)
    const { addCommentDone } = useSelector((state)=>state.post)
    const [commentText,onChangeCommentText, setCommentText] = useInput('')

    useEffect(()=>{
        if(addCommentDone){
            setCommentText('')
        }
    },[addCommentDone])

    const onSubmitComment = useCallback((e)=>{
        console.log(post.id,commentText)
        dispatch(addCommentRequest({commentText, postId: post.id, userId: id }))
    },[commentText, id])
    return(
        <Form onFinish={onSubmitComment}>
,.            <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
            <Button type={"primary"} htmlType={"submit"} >삐약</Button>
        </Form>
    )
}

CommentForm.propTypes = {post: PropTypes.object}

export default CommentForm;