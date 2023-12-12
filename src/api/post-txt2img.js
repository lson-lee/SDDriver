import { getRequest, postRequest } from "../utils/request.js";

const sdapiPrefix = '/sdapi/v1'

export const postTxt2img = ({
                              prompt,
                              num,
                              checkPoint,
                              useADetailer = true
                            }) => {
  let config = {
    prompt,
    batch_size: num,
    restore_faces: true,
    sampler_index: 'DPM++ 2M Karras',
    override_settings: {
      sd_model_checkpoint: checkPoint
    }
  };
  if (useADetailer) {
    config = {
      ...config,
      "alwayson_scripts": {
        "ADetailer": {
          "args": [
            true,
            false,
            {
              "ad_model": "face_yolov8n.pt",
              "ad_prompt": "",
              "ad_negative_prompt": "",
              "ad_confidence": 0.3,
              "ad_mask_k_largest": 0,
              "ad_mask_min_ratio": 0.0,
              "ad_mask_max_ratio": 1.0,
              "ad_dilate_erode": 32,
              "ad_x_offset": 0,
              "ad_y_offset": 0,
              "ad_mask_merge_invert": "None",
              "ad_mask_blur": 4,
              "ad_denoising_strength": 0.4,
              "ad_inpaint_only_masked": true,
              "ad_inpaint_only_masked_padding": 0,
              "ad_use_inpaint_width_height": false,
              "ad_inpaint_width": 512,
              "ad_inpaint_height": 512,
              "ad_use_steps": true,
              "ad_steps": 28,
              "ad_use_cfg_scale": false,
              "ad_cfg_scale": 7.0,
              "ad_use_sampler": false,
              "ad_sampler": "DPM++ 2M Karras",
              "ad_use_noise_multiplier": false,
              "ad_noise_multiplier": 1.0,
              "ad_use_clip_skip": false,
              "ad_clip_skip": 1,
              "ad_restore_face": false,
              "ad_controlnet_model": "None",
              "ad_controlnet_module": "None",
              "ad_controlnet_weight": 1.0,
              "ad_controlnet_guidance_start": 0.0,
              "ad_controlnet_guidance_end": 1.0
            }
          ]
        }
      }
    }
  }
  return postRequest(`${sdapiPrefix}/txt2img`, config);
}

export const getCheckpointList = () => {
  return getRequest(`${sdapiPrefix}/sd-models`);
}
