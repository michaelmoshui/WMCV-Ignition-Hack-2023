import axios from "axios";

const getResponse = async (text) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/careers`,
    {
      text: text,
    }
  );
  return data;
};

const getURL = async (type, itemList) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/${type}/getItem`,
    {
      itemList: itemList,
    }
  );
  return data.URLList;
};

export { getResponse, getURL };
