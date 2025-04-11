import { get } from "aws-amplify/api"

const getSummissionsData = async () => {
    try {
        const resOperation= get({
            apiName: "resourceapi",
            path: "/api/resources/submissions",
        })
        const result = await resOperation.response;
        const response = await result.body.json()
        console.log("Submissions data", response)
        return response;
    } catch (error) {
        console.error("Error", error);
    }
}
export {getSummissionsData}