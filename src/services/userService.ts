import { signUp,signIn, type SignInInput,signOut,getCurrentUser, fetchAuthSession,fetchUserAttributes,updatePassword, type UpdatePasswordInput} from "aws-amplify/auth";
import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand,ListUsersCommand,AdminListGroupsForUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { getUserResourcesByUsername } from "./resourceService";

const appAwsSecretAccessKey = import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY;
const appAwsAccessKeyId     = import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID
type SignUpParameters = {
  name: string;
  password: string;
  email: string;
};
const USER_POOL_ID = "ap-southeast-2_b9wpomezT";
const client = new CognitoIdentityProviderClient({
  region: "ap-southeast-2",
  credentials:{
    accessKeyId: appAwsAccessKeyId,
    secretAccessKey: appAwsSecretAccessKey,
  }
})
interface AddUserToGroupParams {
  username: string;
  userPoolId: string;
  groupName: string;
}

const addUserToGroup = async ({ username, userPoolId, groupName }: AddUserToGroupParams): Promise<void> => {
  try {
    const command = new AdminAddUserToGroupCommand({
      GroupName: groupName,
      UserPoolId: userPoolId,
      Username: username,
    });
    await client.send(command)
  } catch (error) {
    console.error("Error adding user to group:", error);
  }
};
const registerUSer = ({ name, password, email }: SignUpParameters) => {
  return new Promise((resolve, reject) => {
    const signUpUser = async () => {
      try {
        const {  userId } = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              name,
            },
          },
        })
        await addUserToGroup({
          username: email,
          userPoolId: USER_POOL_ID,
          groupName: "USER"});
        resolve(userId)
      } catch (error) {
        console.log("error signing up:", error);
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    };
    signUpUser()
  });
};
const signInUser =({ username, password }: SignInInput)=>{
  return new Promise((resolve, reject) => {
    const processSignIn = async () => {
      try {
        const { isSignedIn,nextStep}= await signIn({ username, password });
        if (isSignedIn)
          resolve(isSignedIn)
      } catch (error) {
        console.log("error signing in:", error);  
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    }
    processSignIn()
  })
}
const signOutUser = async () => {
  return new Promise((resolve, reject) => {
    const processSignOut = async () => {
      try {
        await signOut({ global: true });
        resolve("Signed out");
      } catch (error) {
        console.log("error signing out:", error);
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    };
    processSignOut();
  });
}

const getAuthenticatedUser= async()=> {
  return new Promise((resolve, reject) => {
    const processCurrentUser = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        resolve({ username, userId, signInDetails });
      } catch (err) {
        reject(new Error("Error fetching current user"));
      }
    }
    processCurrentUser();
  })
}
const getUserGroups = async () => {
  try {
    const userGroups = (await fetchAuthSession()).tokens?.accessToken?.payload["cognito:groups"];
    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups", error);
    return null;
  }
}
const getUserInfo = async () => {
  try {
    const userInfo = await fetchAuthSession();
    const currentUserAttributes = await fetchUserAttributes(); 
    const user=userInfo?.tokens?.accessToken?.payload ?? null;
    if (!user) {
      return null;
    }

    return {...user,userAttributes:currentUserAttributes}; ;
  } catch (error) {
    console.error("Error fetching user info", error);
    return null;
  }
}
const getUsers = async () => {
  try {
    const command = new ListUsersCommand({ UserPoolId: USER_POOL_ID });
    const response = await client.send(command);
    if (!response.Users) {
      return [];
    }

    const formattedUsers = await Promise.all(
      response.Users.map(async (user) => {
        const {Username:username,Enabled:status} = user;
        const listGroupsCommand = new AdminListGroupsForUserCommand({
          UserPoolId: USER_POOL_ID,
          Username: username,
        });
        const groupsResponse = await client.send(listGroupsCommand);
        const groupNames = groupsResponse.Groups?.map((group) => group.GroupName) || [];
        
        const attributes = user?.Attributes?.reduce((acc, attr) => {
          if (attr.Name === "email" || attr.Name === "name") {
            acc[attr.Name] = attr.Value ?? "";
          }
          return acc;
        }, {} as Record<string, string>);

        const submissions  = username ? await getUserResourcesByUsername(username) : [];
        return { 
          id: username, 
          ...attributes, 
          confirmationStatus: user.UserStatus?.toLocaleLowerCase(),
          submissions: Array.isArray(submissions) ? submissions.length : 0, 
          role:  groupNames[0]?.toLocaleLowerCase(), 
          status:status? "active":"inactive",
          // lastLogin: "2025-03-24"
        };
        
      })
    );
    return formattedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const updateUserPassword=async ({
  oldPassword,
  newPassword
}: UpdatePasswordInput)=>{
  try {
    const res = await updatePassword({ oldPassword, newPassword });
    console.log("Password updated successfully:", res);
  } catch (err) {
    console.log(err);
  }
}
export { registerUSer,signInUser,signOutUser,getAuthenticatedUser,getUserGroups,getUserInfo,addUserToGroup,getUsers,updateUserPassword };
