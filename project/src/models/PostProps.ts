import docElementsProp from "./DocElementsProp";

interface savePostProps {
  post: docElementsProp[];
  isPublic: boolean;
  postName: string;
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
    email: string | null | undefined;
  };
}

export interface editPostProps {
  postData: {
    post: docElementsProp[];
    postId: string;
  };
  postName: string;
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
  };
}

export default savePostProps;
