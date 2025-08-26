import { MetabaseIframeProps } from "./interfaces/matabase-iframe.interface";
import * as S from "./styled";

export const MetabaseIframe = ({ dashboardKey }: MetabaseIframeProps) => {
  const embedURL = process.env.REACT_APP_METABASE_URL + dashboardKey;
  return (
    <S.CustomIframe
      src={embedURL}
      frameBorder="0"
      width="100%"
      allowTransparency
    ></S.CustomIframe>
  );
};
