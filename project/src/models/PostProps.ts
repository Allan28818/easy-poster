import docElementsProp from "./DocElementsProp";

interface savePostProps {
  post: docElementsProp[];
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
  };
}

export default savePostProps;
