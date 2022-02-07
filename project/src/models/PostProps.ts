import docElementsProp from "./DocElementsProp";

interface savePostProps {
  post: docElementsProp[];
  postName: string;
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
  };
}

export default savePostProps;
