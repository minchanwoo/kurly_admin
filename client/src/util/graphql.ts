import Axios from "axios";

export const graphql = async ({
  query,
  variables
}: {
  query: string;
  variables?: object;
}) => {
  const result = await Axios.post("http://localhost:5000/", {
    query,
    variables
  });
  return result.data.data;
};
