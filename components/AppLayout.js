import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link'
import {Input, Menu, Row, Col } from 'antd'
import styled from "styled-components";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";


const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <Menu mode={"horizontal"}>
                <Menu.Item key={"/"}>
                    <Link href={"/"}><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key={"/profile"}>
                    <Link href={"/profile"}><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key={"searchInput"}>
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item key={"/signup"}>
                    <Link href={"/signup"}><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href={"https://www.naver.com"} target="_blank" rel="noreferrer noopener">네이버</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;
