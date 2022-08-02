import axios from "axios";

const getStats = async (url: string) => {
  try {
    const { data } = await axios.post("/api/getStats", { url });
    return { data };
  } catch (error) {
    return { error };
  }
};

export default getStats;
