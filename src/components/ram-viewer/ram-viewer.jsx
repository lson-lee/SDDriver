import { useState } from "react";
import { getRamInfo } from "../../api/common-request.js";

export default function RamViewer () {
  const [ramInfo, setRamInfo] = useState(0);
  setInterval(() => {
    // getRamInfo().then(res => {
    //   console.log(res);
    // })
    // console.log(1)
  }, 1000)
  return (
    <div>{ramInfo}</div>
  )
}
