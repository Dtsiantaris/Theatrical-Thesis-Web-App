import { useEffect, useState } from "react";
import useSWR from "swr";
import getShowImage from "../utils/getShowImage";
import ArtistCard from "./ArtistCard";
import VenueCard from "./VenueCard";
import ShowCard from "./ShowCard";
import { internalFetcherGet } from "../utils/AxiosInstances";

interface FetchComponentProps {
  path?: string;
  id: string;
}

interface DataProps {
  id: string;
  fullName?: string;
  image?: string;
  title?: string;
  mediaURL?: string;
}

const FetchComponent: React.FC<FetchComponentProps> = ({ path, id }) => {
  const [props, setProps] = useState<DataProps>({ id: "" });
  const { data } = useSWR<DataProps>(
    path ? ["/api/fetchMask", path, id] : null,
    internalFetcherGet
  );

  let component;

  useEffect(() => {
    if (data) {
      const props: DataProps = {
        id: data.id,
      };
      if (path === "people") {
        props.fullName = data.fullName || "";
        props.image = data.image || "";
      } else if (path === "productions") {
        props.title = data.title || "";
        props.mediaURL = getShowImage(data.mediaURL || "");
      } else if (path === "venues") {
        props.title = data.title || "";
      }
      setProps(props);
    }
  }, [data, path]);

  if (path === "people" && props.fullName && props.image) {
    component = (
      <ArtistCard id={props.id} fullName={props.fullName} image={props.image} />
    );
  } else if (path === "productions" && props.title && props.mediaURL) {
    component = (
      <ShowCard id={props.id} title={props.title} media={props.mediaURL} />
    );
  } else if (path === "venues" && props.title) {
    component = <VenueCard id={props.id} title={props.title} />;
  }

  return component || null;
};

export default FetchComponent;
