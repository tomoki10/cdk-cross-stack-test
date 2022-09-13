exports.handler = async (event: any) => {
  console.log(JSON.stringify(event, null, 2));
  var response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: "ok",
  };
  return response;
};
