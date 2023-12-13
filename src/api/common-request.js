import { getRequest } from "../utils/request.js";

const sdapiPrefix = '/sdapi/v1'

export const getRamInfo = () => {
  return getRequest(`${sdapiPrefix}/memory`);
}
