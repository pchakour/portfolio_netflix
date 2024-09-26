import { prependGraphQlUrl } from "../../App";

interface VideoProps {
  video?: string[];
  image: string;
  controls?: boolean;
}

export function Video({ video, image, controls }: Readonly<VideoProps>) {
  return (
    <>
      {video ?
        <video autoPlay loop muted controls={controls}>
          { video.map((v) => <source key={v} src={prependGraphQlUrl(v)} type={`video/${v.split('.').pop()}`} />)}
          <img src={prependGraphQlUrl(image)} alt="" />
        </video>
      : 
        <img src={prependGraphQlUrl(image)} alt="" />
      }
    </>
  );
}