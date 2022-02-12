import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import docElementsProp from "../../models/DocElementsProp";

import { getPosts } from "../../services/posts/getPosts";

import TextComponent from "../../components/TextComponents/TextComponent";
import Doughnut from "../../components/Graphics/Doughnut";
import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../../styles/posts/post-details.module.scss";
import Link from "next/link";
import formatDate from "../../services/formatDate";

function PostDetails() {
  const [postInformations, setPostInformations] = useState<any>({});

  const router = useRouter();

  const { post } = router.query;

  console.log(postInformations.postData);

  useEffect(() => {
    const handleFecthPost = async () => {
      if (!!post) {
        const currentPost: any = await getPosts({ id: post });
        setPostInformations({
          ...currentPost[0],
        });
      }
    };

    handleFecthPost();
  }, [post]);

  return (
    <>
      <header className={styles.postHeader}>
        <Link href={"/"}>
          <AiOutlineArrowLeft className={styles.arrowLeft} />
        </Link>
        <h1 className={styles.postTitle}>{postInformations.postName}</h1>
        <span className={styles.creatorCredits}>
          This post belongs to &copy;{" "}
          {!!postInformations.createdAt
            ? `${postInformations.creatorData?.fullName} - ${formatDate(
                postInformations.createdAt.toDate(),
                "yyyy"
              )}`
            : ""}
        </span>
      </header>
      <div id="post-body">
        {!!postInformations.postData &&
          postInformations.postData.map((currentElement: docElementsProp) => {
            if (!!currentElement.src) {
              return (
                <img
                  key={currentElement.id}
                  src={currentElement.src}
                  alt={currentElement.alt}
                />
              );
            } else if (currentElement.textContent && !currentElement.type) {
              return (
                <TextComponent
                  key={currentElement.id}
                  id={currentElement.id}
                  elementName={currentElement.elementName}
                  textContent={currentElement.textContent}
                />
              );
            } else if (!!currentElement.type && !!currentElement.series) {
              return (
                <Doughnut
                  key={currentElement.id}
                  caption={currentElement.caption}
                  subCaption={currentElement.subCaption}
                  labels={currentElement.labels}
                  paletteColors={currentElement.colors}
                  series={currentElement.series}
                  numberPrefix={currentElement.graphicPrefix}
                />
              );
            }
          })}
      </div>
    </>
  );
}

export default PostDetails;
