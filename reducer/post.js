import shortId from 'shortid';
import produce from 'immer';
import faker from '@faker-js/faker';

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번 째 게시글 #해시태그 #익스프레스',
    Images: [{
      id: shortId.generate(),
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jordan_Peterson_by_Gage_Skidmore.jpg/1200px-Jordan_Peterson_by_Gage_Skidmore.jpg',
    }, {
      id: shortId.generate(),
      src: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/08/20/827ca1e8-bcb7-4e6a-8bc5-d6d0b22353f3.jpg',
    }, {
      src: 'https://w.namu.la/s/f1defec95368865357b4ee0119fbadb028d87af3dc5acf7c5b32aea7275d7d7bbb8ece37fe86d0afc5f8cd8d4dffe340a098267dfd611e078067dbc47bb104930a9181d62e4e10019f63991ae167198bfb83dcad4a8d9967f256988d6ac6c72b',
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'nero',
      },
      content: '우와 첫 댓글~~',
    }, {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'corntea',
      },
      content: '2빠~~',
    }],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.image(),
    }],
    Comments: [{
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  })),
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequest = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});
const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts.unshift(dummyPost(action.data));
      draft.addPostDone = true;
      draft.addPostLoading = false;
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = state.mainPosts.filter((post) => post.id !== action.data);
      draft.removePostDone = true;
      draft.removePostLoading = false;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data));
      draft.addCommentDone = true;
      draft.addCommentLoading = false;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
