import React, { ComponentType, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { getPosts } from "../../services/posts/getPosts";
import formatDate from "../../utils/formatDate";

import docElementsProp from "../../models/DocElementsProp";

import TextComponent from "../../components/TextComponents/TextComponent";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Link from "next/link";
import dynamic, { LoaderComponent } from "next/dynamic";

import styles from "../../styles/posts/post-details.module.scss";
import PropsReturn from "../../models/core.response";

const GeneratePDF = dynamic(() => import("../../components/PDF/GeneratePDF"));

const Piechart = dynamic(() => import("../../components/Graphics/PieChart"), {
  ssr: false,
});

const Donut = dynamic(() => import("../../components/Graphics/Donut"), {
  ssr: false,
});

const BarChart = dynamic(() => import("../../components/Graphics/BarChart"), {
  ssr: false,
});

const LineChart = dynamic(() => import("../../components/Graphics/LineChart"), {
  ssr: false,
});

const Radar = dynamic(() => import("../../components/Graphics/Radar"), {
  ssr: false,
});

function PostDetails() {
  const [postInformations, setPostInformations] = useState<any>({});

  const router = useRouter();
  const postRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { post } = router.query;

  useEffect(() => {
    const handleFecthPost = async () => {
      if (!!post) {
        const currentPost: PropsReturn = await getPosts({ postId: post });

        if (currentPost.data) {
          setPostInformations({
            ...currentPost.data[0],
          });
        }
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
      <div ref={postRef}>
        <div id="post-body">
          {!!postInformations.postData &&
            postInformations.postData.map((currentElement: docElementsProp) => {
              if (!!currentElement.src && currentElement.type === "img") {
                return (
                  <img
                    key={currentElement.id}
                    src={currentElement.src}
                    alt={currentElement.alt}
                  />
                );
              } else if (
                currentElement.textContent &&
                currentElement.type === "text-element"
              ) {
                return (
                  <TextComponent
                    key={currentElement.id}
                    id={currentElement.id}
                    elementName={currentElement.elementName}
                    textContent={currentElement.textContent}
                    isEditable={false}
                  />
                );
              } else if (!!currentElement.type && !!currentElement.series) {
                const chartOptions: any = {
                  pie: (
                    <Piechart
                      key={currentElement.id}
                      colors={currentElement.colors}
                      labels={currentElement.labels}
                      series={currentElement.series}
                    />
                  ),
                  donut: (
                    <Donut
                      key={currentElement.id}
                      colors={currentElement.colors}
                      labels={currentElement.labels}
                      series={currentElement.series}
                    />
                  ),
                  bar: (
                    <BarChart
                      title={currentElement.chartTitle}
                      xLabels={currentElement.labels}
                      series={currentElement.chartData}
                      colors={currentElement.colors}
                    />
                  ),
                  line: (
                    <LineChart
                      title={currentElement.chartTitle}
                      xLabels={currentElement.labels}
                      series={currentElement.chartData}
                      colors={currentElement.colors}
                    />
                  ),
                  radar: (
                    <Radar
                      title={currentElement.chartTitle}
                      xLabels={currentElement.labels}
                      series={currentElement.chartData}
                      colors={currentElement.colors}
                    />
                  ),
                };

                return chartOptions[currentElement.type];
              }
            })}
        </div>
      </div>

      <GeneratePDF htmlContent={postRef} docName={postInformations.postName} />
    </>
  );
}

export default PostDetails;
