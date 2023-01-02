import { DocumentData } from "firebase/firestore";

enum ReducerActionKind {
  GET_FEED = "GET_FEED",
  GET_MY_POSTS = "GET_MY_POSTS",
}

interface ReducerAction {
  type: ReducerActionKind;
  feedPosts?: DocumentData[];
  myPosts?: DocumentData[];
}

interface ReducerState {
  feedPosts: DocumentData[];
  myPosts: DocumentData[];
}

const postsTypeInitialState: ReducerState = {
  feedPosts: [],
  myPosts: [],
};

function postsTypeReducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case "GET_FEED":
      return {
        ...state,
        feedPosts: action?.feedPosts || [],
      };
    case "GET_MY_POSTS":
      return {
        ...state,
        myPosts: action?.myPosts || [],
      };
    default:
      return state;
  }
}

export { postsTypeReducer, postsTypeInitialState, ReducerActionKind };
