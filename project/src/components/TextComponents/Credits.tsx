import { DocumentData } from "firebase/firestore";
import React from "react";
import formatDate from "../../utils/formatDate";

interface CreditsProps {
  creatorName: string;
  createdAt: DocumentData;
}

const Credits = (props: CreditsProps) => {
  const { creatorName, createdAt } = props;
  const formatedDate = formatDate(createdAt.toDate(), "yyyy");

  return (
    <span>
      &copy; {creatorName} - {formatedDate}
    </span>
  );
};

export default Credits;
