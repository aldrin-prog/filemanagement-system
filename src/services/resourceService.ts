import { get, post, del } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { remove, downloadData } from "aws-amplify/storage";

type DocumentType = {
  id: string;
  fullname: string;
  category: string;
  subject: string;
  createdAt: string;
  status: string;
  files: any[];
};

const getResources = async (): Promise<DocumentType> => {
  try {
    const restOperation = get({
      apiName: "resourceapi",
      path: "/api/resources",
    });
    const result = await restOperation.response;
    const response = await result.body.json();
    return response as DocumentType;
  } catch (error) {
    console.error("Error", error);
    return error as DocumentType;
  }
};

const addResource = async (resource: any, files: Array<string>) => {
  try {
    console.log("Adding resource", resource, files);
    const userInfo = await fetchAuthSession()
      ?.then((user) => user.tokens)
      .catch(() => null);
    const restOperation = post({
      apiName: "resourceapi",
      path: "/api/resources",
      options: {
        body: {
          ...resource,
          files,
          username: userInfo?.accessToken?.payload?.username || null,
        },
      },
    });
    const result = await restOperation.response;
    const response = await result.body.json();
    return response;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

const deleteResource = async (id: string, attachments: any) => {
  try {
    if (attachments && attachments.length > 0) {
      await Promise.all(
        attachments.map(async (attachment: any) => {
          await remove({ path: attachment });
        })
      );
    }
    const restOperation = del({
      apiName: "resourceapi",
      path: `/api/resources/${id}`,
    });
    await restOperation.response;
  } catch (error) {
    console.error("Error", error);
  }
};

const getUserResources = () => {
  return new Promise((resolve, reject) => {
    const processUserResources = async () => {
      try {
        const userInfo = await fetchAuthSession()
          ?.then((user) => user.tokens)
          .catch(() => null);
        if (!userInfo) {
          reject(new Error("User not authenticated"));
          return;
        }
        const restOperation = post({
          apiName: "resourceapi",
          path: "/api/resources/user",
          options: {
            body: {
              username: userInfo?.accessToken?.payload?.username || null,
            },
          },
        });
        const response = await restOperation.response;
        const result = await response.body.json();
        resolve(result);
      } catch (error) {
        console.error("Error", error);
      }
    };
    processUserResources();
  });
};
const getUserResourcesByUsername = async (username: string) => {
  try {
    const restOperation = post({
      apiName: "resourceapi",
      path: "/api/resources/user",
      options: {
        body: {
          username: username,
        },
      },
    });
    const response = await restOperation.response;
    const result = await response.body.json();
    return result;
  } catch (error) {}
};
const downloadResource = async (path: string) => {
  try {
    // Download a file from s3 bucket
    const { body} = await downloadData({
      path: path,
      
    }).result;
    const blob = await body.blob();
    // Create a Blob URL
    const url = window.URL.createObjectURL(blob);

    // Trigger file download
    const a = document.createElement("a");
    a.href = url;
    a.download = path.split("/").pop() ?? "downloaded-file"; // Extract file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading resource", error);
  }
};

export {
  getUserResources,
  getResources,
  addResource,
  deleteResource,
  getUserResourcesByUsername,
  downloadResource,
};
