export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result as string;
      resolve(encoded.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};
