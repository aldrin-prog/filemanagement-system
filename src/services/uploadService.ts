import {uploadData} from 'aws-amplify/storage'
const uploadFile = async (file: File) => {
    try {
        const uploadTask = uploadData({
          path: `public/guest/${file.name}`, 
          // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
          data: file,
          options: {
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                console.log(
                  `Upload progress ${
                    Math.round((transferredBytes / totalBytes) * 100)
                  } %`
                );
              }
            }
          }
        });
        const result = await uploadTask.result;
        console.log('Path from Response: ', result.path);
      } catch (error) {
        console.log('Error : ', error);
      }
};
export { uploadFile };