import updateProfileImageService from "../services/users/updateProfileImageService";

async function updateProfileImageController(
  newProfileImageSrc: string | ArrayBuffer
) {
  const stringfiedSrc = newProfileImageSrc.toString();

  const response = await updateProfileImageService(stringfiedSrc);

  return response?.data.message;
}

export { updateProfileImageController };
