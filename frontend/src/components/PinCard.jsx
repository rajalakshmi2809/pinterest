import { FiHeart, FiMessageCircle } from 'react-icons/fi';

const PinCard = ({ post }) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_20px_80px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-slate-700">
      <div className="relative overflow-hidden bg-slate-950">
        <img src={post.imageUrl} alt={post.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/95 to-transparent p-4 text-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{post.category}</p>
          <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm leading-6 text-slate-300">{post.description || 'A visual story for modern creators.'}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-100">{post.createdBy?.username?.charAt(0)}</span>
            <div>
              <p className="text-sm font-semibold text-slate-100">{post.createdBy?.username || 'VisionBoard'}</p>
              <p className="text-xs text-slate-500">{post.likes?.length || 0} likes • {post.comments?.length || 0} comments</p>
            </div>
          </div>
          <div className="flex gap-3 text-slate-400">
            <FiHeart />
            <FiMessageCircle />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PinCard;
