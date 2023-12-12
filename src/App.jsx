import './App.css'
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Snackbar,
  Stack,
  CircularProgress,
  Grid,
  Slider,
  Sheet,
  Box,
  Autocomplete,
} from '@mui/joy';
import { getCheckpointList, postTxt2img } from "./api/post-txt2img.js";
import { styled } from '@mui/joy/styles';

function App () {
  const Item = styled(Sheet)(({theme}) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));

  const [alertConfig, setAlertConfig] = useState({
    open: false,
  });

  const toggleAlert = (message) => {
    setAlertConfig({
      open: !alertConfig.open,
      message
    })
  }
  const handleClickButton = async () => {
    if (buttonLoading) {
      toggleAlert(`${prompt} 这个提示词正在进行中，不要急哦`)
      return;
    }
    setButtonloading(true)
    const data = await postTxt2img({
      prompt,
      num: imgNum,
      checkPoint,
    })
    setImageSrc(data.images);
    setImgInfo(JSON.parse(data.info))
    setButtonloading(false)
  }

  const [checkpointList, setCheckpointList] = useState([])
  useEffect(() => {
    const dataFetch = async () => {
      const data = await getCheckpointList()
      setCheckpointList(data.map(item => item.model_name));
    }
    dataFetch();
  },[])


  const handleAlertClose = () => {
    toggleAlert();
  }
  const [buttonLoading, setButtonloading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imgSrc, setImageSrc] = useState('');
  const [checkPoint, setCheckpoint] = useState('');
  const [imgInfo, setImgInfo] = useState({});
  const [imgNum, setImgNum] = useState(1);
  return (
    <>
      <Stack spacing={1}>
        {imgSrc ? (<Grid container
                         display="grid" gridTemplateColumns="repeat(1, 4fr)" gap={2} flexWrap="wrap"
                         sx={{flexGrow: 1}} columns={2}>
          {imgSrc.map((src, index) =>
            <Box gridColumn="span 1" key={index}>
              <Item>
                <img src={`data:image/jpeg;base64,${src}`} alt="" className='generated-image'
                     title={imgInfo.infotexts[index]}
                />
              </Item>
            </Box>
            )}
        </Grid>) : null}
        <Stack>
          <Slider
            aria-labelledby="一次多少张"
            aria-label="Small steps"
            defaultValue={1}
            value={imgNum}
            onChange={(e, newVal) => setImgNum(newVal)}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {
                value: 1,
                label: '1张',
              },
              {
                value: 2,
                label: '2张',
              },
              {
                value: 3,
                label: '3张',
              },
              {
                value: 4,
                label: '4张',
              },
            ]}
            min={1}
            max={2}
          />
        </Stack>
        <Stack>
          <Autocomplete
            placeholder="选择模型"
            options={checkpointList}
            value={checkPoint}
            onChange={(event, newValue) => {
              setCheckpoint(newValue);
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Input name="Plain" placeholder="请输入 prompt" variant="plain" value={prompt}
                 onChange={(event) => setPrompt(event.target.value)}
          />
          <Button varint="solid" onClick={handleClickButton}
                  startDecorator={buttonLoading && <CircularProgress variant="solid"/>}>出发！</Button>
        </Stack>
      </Stack>
      <Snackbar open={alertConfig.open} onClose={handleAlertClose}>{alertConfig.message}</Snackbar>
    </>
  )
}

export default App
