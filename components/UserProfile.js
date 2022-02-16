import React, {useCallback} from "react";
import {Avatar, Button, Card} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequestAction} from "../reducer/user";

const UserProfile = ()=> {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state)=>state.user)

    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction())
    },[])


    return (
        <Card
        actions={[
            <div key={"twit"}>짹짹<br/>{me.post.length}</div>,
            <div key={"followings"}>팔로잉<br/>{me.Followings.length}</div>,
            <div key={"followers"}>팔로워<br/>{me.Followers.length}</div>
        ]}
        >
            <Card.Meta
                avatar={<Avatar>ZC</Avatar>}
                title={"ZeroCho"}
            />
            <Button onClick={onLogout} loading={logOutLoading} >로그아웃</Button>
        </Card>
    )
}

export default UserProfile;