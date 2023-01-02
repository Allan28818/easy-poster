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
  followingAmount?: number;
  followersAmount?: number;
  userPostsList?: DocumentData[];
  pageVisitorId?: string | null;
  pageOwnerId?: string;
}

interface ReducerState {
  pageOwnerId: string;
  pageVisitorId: string;
  followersAmount: number;
  followingAmount: number;
  postsAmount: number;
  userPostsList: DocumentData[];
  amIFollowing: boolean;
  amIPageOwner: boolean;
}

const userDataInitialState: ReducerState = {
  amIFollowing: false,
  amIPageOwner: false,
  followersAmount: 0,
  followingAmount: 0,
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
        followersAmount: action.followersAmount || 0,
        followingAmount: action.followingAmount || 0,
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        amIFollowing: false,
        followersAmount: action.followersAmount || 0,
        followingAmount: action.followingAmount || 0,
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
        followersAmount: action.followersAmount || 0,
        followingAmount: action.followingAmount || 0,
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
