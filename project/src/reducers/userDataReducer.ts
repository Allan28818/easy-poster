import { DocumentData } from "firebase/firestore";

enum ReducerActionKind {
  FOLLOW_USER = "FOLLOW_USER",
  UNFOLLOW_USER = "UNFOLLOW_USER",
  SET_POSTS = "SET_POSTS",
  SET_PAGE_PERMISSION = "SET_PAGE_PERMISSION",
  SET_INITIAL_DATA = "SET_INITIAL_DATA",
}

interface ReducerAction {
  type: ReducerActionKind;
  amIFollowing?: boolean;
  following?: string[];
  followers?: string[];
  userPostsList?: DocumentData[];
  pageVisitorId?: string | null;
  pageOwnerId?: string;
}

interface ReducerState {
  pageOwnerId: string;
  pageVisitorId: string;
  followers: string[];
  following: string[];
  postsAmount: number;
  userPostsList: DocumentData[];
  amIFollowing: boolean;
  amIPageOwner: boolean;
}

const userDataInitialState: ReducerState = {
  amIFollowing: false,
  amIPageOwner: false,
  followers: [],
  following: [],
  pageOwnerId: "",
  pageVisitorId: "",
  postsAmount: 0,
  userPostsList: [],
};

function userDataReducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case "FOLLOW_USER":
      return {
        ...state,
        amIFollowing: true,
        followers: action.followers || [],
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        amIFollowing: false,
        followers: action.followers || [],
      };

    case "SET_POSTS":
      return {
        ...state,
        userPostsList: action.userPostsList || [],
        postsAmount: action.userPostsList?.length || 0,
      };
    case "SET_PAGE_PERMISSION":
      return {
        ...state,
        amIPageOwner: action.pageOwnerId === action.pageVisitorId,
      };
    case "SET_INITIAL_DATA":
      return {
        amIFollowing: !!action.amIFollowing,
        amIPageOwner: action.pageOwnerId === action.pageVisitorId,
        followers: action.followers || [],
        following: action.following || [],
        pageOwnerId: action.pageOwnerId || "",
        pageVisitorId: action.pageVisitorId || "",
        postsAmount: action.userPostsList?.length || 0,
        userPostsList: action.userPostsList || [],
      };
    default:
      return state;
  }
}

export { userDataReducer, userDataInitialState, ReducerActionKind };
