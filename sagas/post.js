import {all, delay, fork, put, takeLatest} from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS
} from "../reducer/post";
import axios from "axios";


function addPostAPI(data) {
    return axios.post(`/api/${data.post.id}/post`, data);
}

function addCommentAPI(data) {
    return axios.post(`/api/${data.post.id}/comment`, data);
}


function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000)
        yield put({
            type: ADD_POST_SUCCESS,
        })
    }catch (e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data,
        })
    }
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
        })
    }catch (e) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e.response.data,
        })
    }
}

function* watchPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchPost),
        fork(watchComment)
    ])
}