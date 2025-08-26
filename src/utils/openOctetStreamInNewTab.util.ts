export const getMimeTypeFromName = (fileName: string) => {
  const extension = fileName.split(".").pop();

  const mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
    // Adicione outros tipos MIME conforme necessário
  };

  const mimeType = mimeTypes[extension];

  if (!mimeType) {
    throw new Error(
      `Invalid input: No matching MIME type for extension ${extension}`
    );
  }

  return mimeType;
};

export const openOctetStreamInNewTab = async (
  file_stream: string,
  file_name: string,
  mimeType?: string
) => {
  const binary = window.atob(file_stream || "");
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }

  let blob = new Blob([view], { type: "application/octet-stream" });

  let fileType = null;

  if (!mimeType) {
    fileType = await getMimeTypeFromName(file_name);
  }

  if (mimeType || fileType) {
    blob = new Blob([view], { type: mimeType || fileType });
  }
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
};

export const openOctetStreamInNewTab2 = async (
  file_stream: string,
  file_name: string,
  mimeType?: string
) => {
  // Decodifica com UTF-8
  const decoded = decodeBase64Utf8(file_stream || "");

  // Inferir tipo
  let fileType = mimeType || (await getMimeTypeFromName(file_name));

  if (!fileType) {
    const preview = decoded.slice(0, 100).toLowerCase();
    if (
      preview.includes("<html") ||
      preview.includes("<!doctype html") ||
      preview.includes("visualiza")
    ) {
      fileType = "text/html; charset=utf-8";
    } else {
      fileType = "application/octet-stream";
    }
  }

  let blob: Blob;

  if (fileType.startsWith("text/")) {
    blob = new Blob([decoded], { type: fileType });
  } else {
    // Binário real
    const binary = window.atob(file_stream || "");
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    blob = new Blob([view], { type: fileType });
  }

  const url = window.URL.createObjectURL(blob);

  if (fileType.startsWith("text/")) {
    window.open(url, "_blank");
  } else {
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    link.click();
  }
};

// Função auxiliar
export function decodeBase64Utf8(base64: string): string {
  const binary = window.atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}
