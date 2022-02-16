export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번 째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jordan_Peterson_by_Gage_Skidmore.jpg/1200px-Jordan_Peterson_by_Gage_Skidmore.jpg',
    }, {
      src: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/08/20/827ca1e8-bcb7-4e6a-8bc5-d6d0b22353f3.jpg',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 첫 댓글~~',
    }, {
      User: {
        nickname: 'corntea',
      },
      content: '2빠~~',
    }],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};
// ,{
// src: 'https://w.namu.la/s/f1defec95368865357b4ee0119fbadb028d87af3dc5acf7c5b32aea7275d7d7bbb8ece37fe86d0afc5f8cd8d4dffe340a098267dfd611e078067dbc47bb104930a9181d62e4e10019f63991ae167198bfb83dcad4a8d9967f256988d6ac6c72b'
// }
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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
const dummyPost = {
  id: 2,
  content: '더미 데이터 입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostDone: true,
        addPostLoading: false,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentDone: true,
        addCommentLoading: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;