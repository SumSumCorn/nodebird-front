import React, {useCallback} from "react";
import {Avatar, Button, Card} from "antd";

const UserProfile = ({setIsLoggedIn})=> {
    const onLogout = useCallback(()=>{
        setIsLoggedIn(false);
    },[])


    return (
        <Card
        actions={[
            <div key={"twit"}>짹짹<br/></div>,
            <div key={"followings"}>팔로잉</div>,
            <div key={"followers"}>팔로워</div>
        ]}
        >
            <Card.Meta
                avatar={<Avatar>ZC</Avatar>}
                title={"ZeroCho"}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;