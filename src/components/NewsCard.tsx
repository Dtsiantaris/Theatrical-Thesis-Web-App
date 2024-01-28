import { Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface NewsCardProps {
  article: {
    url: string;
    urlToImage: string;
    title: string;
    description: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [imageSrc, setImageSrc] = useState(article.urlToImage);

  return (
    <a href={article.url} className="linksNoDecoration">
      <div className="flex flex-col max-w-xs bg-[#2a2a2a] rounded-[4%] overflow-hidden shadow-sm border-2 border-transparent hover:border-purple-400 hover:shadow-md transition-all">
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
