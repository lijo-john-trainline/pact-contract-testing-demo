const axios = require("axios");

exports.getUser = async (id, baseUrl) => {
  const res = await axios.get(`${baseUrl}/user/${id}`);
  return res.data;
};

exports.getOrder = async (id, baseUrl) => {
  const res = await axios.get(`${baseUrl}/order/${id}`);
  return res.data;
};