export type UserPostType = 'animal' | 'campaign'

export type GetUserPostsResponse = {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  createdSince: number;
  postType: UserPostType;
}
