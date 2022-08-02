import axios from "axios";

const getImage = async (url: string) => {
  try {
    const { data } = await axios.post(
      "/api/getImage",
      { url },
      { responseType: "blob" }
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

export default getImage;
