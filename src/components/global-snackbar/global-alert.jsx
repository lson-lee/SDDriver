import Snackbar from '@mui/joy/Snackbar';
import { useGlobalAlert } from "./use-alert.js";


export default function GlobalAlert () {
  const {alertConfig} = useGlobalAlert();

  return (
    <>
      <Snackbar {...alertConfig}></Snackbar>
    </>
  )
}
