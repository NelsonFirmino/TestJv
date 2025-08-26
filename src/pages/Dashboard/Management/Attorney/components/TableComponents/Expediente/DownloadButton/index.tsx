import toast from "react-hot-toast";
import {
  decodeBase64Utf8,
  openOctetStreamInNewTab2,
} from "../../../../../../../../utils/openOctetStreamInNewTab.util";
import { DownloadButtonProps } from "./download-button.interface";
import * as S from "./styled";

export const DownloadButton = ({ data }: DownloadButtonProps) => {
  return (
    <S.DocumentButton
      onClick={() => {
        const decodedMessage = decodeBase64Utf8(data.file_stream);
        if (decodedMessage.toLowerCase().includes("bloqueada")) {
          toast(decodedMessage, {
            icon: "🔒",
            style: {
              borderRadius: "10px",
              background: "#e57373",
              color: "#fff",
              fontSize: "30px",
            },
          });
          return;
        } else {
          openOctetStreamInNewTab2(data.file_stream, data.name);
        }
      }}
    >
      <S.DocumentIcon />
    </S.DocumentButton>
  );
};
