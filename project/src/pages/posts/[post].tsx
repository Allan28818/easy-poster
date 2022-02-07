import React from "react";
import docElementsProp from "../../models/DocElementsProp";
import styles from "../../styles/posts/post-details.module.scss";

export default function PostDetails(props: docElementsProp) {
  console.log("props", props);
  return (
    <>
      <header className={styles.postHeader}>
        <h1>Post</h1>
      </header>
      <div className={styles.postBody}></div>
    </>
  );
}
