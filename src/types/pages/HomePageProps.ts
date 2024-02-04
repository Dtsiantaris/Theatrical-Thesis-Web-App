import { NewsCardProps } from "../cards/NewsCardProps";
import { ShowCardProps } from "../cards/ShowCardProps";
import { Person } from "../entities/Person";

export interface HomePageProps {
  artists: Person[];
  latestShows: ShowCardProps[];
  articles: NewsCardProps["article"][];
}
