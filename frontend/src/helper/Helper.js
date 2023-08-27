import axios from "axios";

const getResponse = async (text) => {
  console.log(text);
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/get_objects`,
    {
      user_input: text,
    }
  );
  return data;
};

export { getResponse };
