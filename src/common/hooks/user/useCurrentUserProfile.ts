import { useGetUserProfileQuery } from "@/users/app/api/usersApi";
import useAuth from "../auth/useAuth";
import { normalizeImageUrl } from "@/common/utils/CommonUtils";

function useCurrentUserProfile() {

  const { userId } = useAuth();
  const { data: userData } = useGetUserProfileQuery(userId);

  const storedProfileImage =
    userData?.profile.profileImageURL ?? userData?.profile.profileImageUrl;

  const profileImage = normalizeImageUrl(storedProfileImage);

  return {
    email: userData?.profile.email,
    username: userData?.username,
    profileImage,
  }
}

export default useCurrentUserProfile
