export type UserPostType = 'animal' | 'campaign' | 'fundraising';

export type GetUserPostsResponse = {
  id: string;
  title: string;
  imageId: string;
  status: string;
  createdSince: number;
  postType: UserPostType;
}
