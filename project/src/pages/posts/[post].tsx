import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import docElementsProp from "../../models/DocElementsProp";

import { getPosts } from "../../services/posts/getPosts";

import TextComponent from "../../components/TextComponents/TextComponent";
import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../../styles/posts/post-details.module.scss";
import Link from "next/link";
import formatDate from "../../services/formatDate";
import dynamic from "next/dynamic";

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
    </>
  );
}

export default PostDetails;
