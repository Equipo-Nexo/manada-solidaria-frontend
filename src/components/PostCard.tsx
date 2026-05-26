import type { Post } from '../types/Post'
import './PostCard.css'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card__avatar">
        {post.title.charAt(0).toUpperCase()}
      </div>
      <div className="post-card__content">
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__description">{post.description}</p>
      </div>
    </article>
  )
}
