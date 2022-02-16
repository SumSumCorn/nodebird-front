import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import {
  Avatar, Button, Card, Comment, Image, List, Popover,
} from 'antd';
import {
  EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const id = useSelector((state) => state.user.me?.id);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heartFilled" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button type="primary">수정</Button>
                    }
                    <Button type="danger">삭제</Button>
                  </>
                ) : <Button>신고</Button>}
              </Button.Group>
                    )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      07ㅕㅓㅏ
      {commentFormOpened && (
      <div>
        <CommentForm post={post} />
        <List
          header={`${post.Comments.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={post.Comments}
          renderItem={(item) => (
            <li>
              8q  a-=
              <Comment
                author={item.User.nickname}
                content={item.content}
              />
            </li>
          )}
        />
      </div>
      )}
      {/* <Comments /> */}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
