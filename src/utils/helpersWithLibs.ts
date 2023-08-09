import moment from "moment";

export const convertDateMoment = (date: Date, format = "DD-MM-YYYY"): string => {
  return moment(date).format(format)
}