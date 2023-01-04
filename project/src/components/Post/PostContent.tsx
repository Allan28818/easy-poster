import docElementsProp from "../../models/DocElementsProp";
import BarChart from "../Graphics/BarChart";
import Donut from "../Graphics/Donut";
import LineChart from "../Graphics/LineChart";
import Piechart from "../Graphics/PieChart";
import Radar from "../Graphics/Radar";
import TextComponent from "../TextComponents/TextComponent";

interface PostContentProps {
  postElemnts: docElementsProp[];
}

const PostContent = (props: PostContentProps) => {
  const { postElemnts } = props;

  return (
    <div id="post-body">
      {postElemnts.map((currentElement: docElementsProp) => {
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
  );
};

export { PostContent };
