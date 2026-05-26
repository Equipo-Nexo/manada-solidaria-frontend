import { useEffect, useState } from 'react'
import type { Post } from '../types/Post'
import { getPosts } from '../services/postsService'
import PostCard from '../components/PostCard'
import './PostsPage.css'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="posts-page">
      <header className="posts-page__header">
        <h1 className="posts-page__title">Publicaciones</h1>
      </header>

      <main className="posts-page__content">
        {loading && (
          <div className="posts-page__status">
            <div className="posts-page__spinner" />
            <p>Cargando publicaciones...</p>
          </div>
        )}

        {error && (
          <div className="posts-page__status posts-page__status--error">
            <p>No se pudieron cargar las publicaciones.</p>
            <button
              type="button"
              className="posts-page__retry"
              onClick={() => {
                setError(null)
                setLoading(true)
                getPosts()
                  .then(setPosts)
                  .catch((err: Error) => setError(err.message))
                  .finally(() => setLoading(false))
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="posts-page__status">
            <p>No hay publicaciones todavia.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="posts-page__list">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
