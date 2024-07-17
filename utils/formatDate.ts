import moment from "moment";

export const formatDate = (dateString: string) => {
  // Parse the input date string using the appropriate format
  const formattedDate = moment(dateString).format("MMMM DD, YYYY hh:mm:ss A");
  return formattedDate;
};
