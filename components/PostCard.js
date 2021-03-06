import React, { useCallback, useState } from 'react';
import {
  Avatar, Button, Card, Comment, List, Popover,
} from 'antd';
import {
  EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST } from '../reducer/post';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const { removePostLoading } = useSelector((state) => state.post);
  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [post.id]);

  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heartFilled" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button type="primary">??????</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>??????</Button>
                  </>
                ) : <Button>??????</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}?????? ??????`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
