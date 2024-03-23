import { useState } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { NewsCardProps } from "../types/cards/NewsCardProps";

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [imageSrc, setImageSrc] = useState(article.urlToImage);

  return (
    <a
      href={article.url}
      className="linksNoDecoration hover:scale-105 transition-transform hover:border-secondary"
    >
      <div className="flex flex-col max-w-xs h-[470px] bg-paper rounded-[4%] overflow-hidden shadow-sm border-2 border-transparent hover:border-secondary hover:shadow-md transition-all">
        <div className="relative h-44">
          <Image
            onError={() => setImageSrc("/DefaultShowImage.jpg")}
            src={imageSrc}
            alt={`${article.title} Thumbnail`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="px-5 py-2">
          <Typography variant="h4" component="h3">
            {article.title}
          </Typography>
          <Typography variant="body2">{article.description}</Typography>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
