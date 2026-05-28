import Masonry from 'react-masonry-css';

const MOCK_PINS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80', title: 'Minimalist Architectural Study', author: 'Elias Thorne' },
  { id: 2, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', title: 'Dark Chocolate & Sea Salt Tart', author: 'Baker\'s Choice' },
  { id: 3, image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80', title: 'Vibrant Street Art Mural', author: 'Urban Canvas' },
  { id: 4, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', title: 'Scandinavian Living Room', author: 'Nesting Design' },
  { id: 5, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', title: 'Tropical Oasis Getaway', author: 'Wanderlust Co.' },
  { id: 6, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', title: 'Moody Forest Path', author: 'Nature Glimpse' },
  { id: 7, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80', title: 'Handcrafted Ceramic Set', author: 'Earth & Fire' },
  { id: 8, image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80', title: 'Brand Color Palette', author: 'Design Studio' },
  { id: 9, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80', title: 'Morning Coffee Ritual', author: 'Cafe Culture' },
  { id: 10, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', title: 'Japanese Garden Zen', author: 'Serenity Scapes' },
  { id: 11, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', title: 'Mountain Peak Sunset', author: 'Peak Explorer' },
  { id: 12, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', title: 'Futuristic Digital Portrait', author: 'Cyber Artist' },
];

const CATEGORIES = ['All', 'Art', 'Interior Design', 'Photography', 'Travel', 'Recipes', 'Digital Art', 'Typography'];

const breakpointColumnsObj = {
  default: 5,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  500: 1
};

const Home = () => {
  return (
    <div className="px-6 pb-20 pt-7">
      <div className="sticky top-20 z-40 mb-8 flex gap-3 overflow-x-auto bg-[#f7f4f5]/95 pb-4 pt-3 backdrop-blur scrollbar-hide">
        {CATEGORIES.map((cat, idx) => (
          <button 
            key={idx}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${idx === 0 ? 'bg-[#e9edf1] text-[#28313a]' : 'bg-[#191b1c] text-white hover:bg-[#2d3031]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {MOCK_PINS.map((pin) => (
          <article key={pin.id} className="group cursor-zoom-in">
            <div className="relative overflow-hidden rounded-[20px] bg-[#d9d9d9] shadow-sm">
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />

              <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                <div className="flex items-start justify-end">
                  <button className="rounded-full bg-[#e60023] px-5 py-3 font-bold text-white shadow-lg transition-colors hover:bg-[#ad081b]">
                    Save
                  </button>
                </div>

                <div className="flex justify-end gap-2">
                  <button aria-label="View pin" className="rounded-full bg-white p-2.5 text-black shadow-md transition-colors hover:bg-gray-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5zM3.18 12a9.821 9.821 0 0 0 17.64 0 9.821 9.821 0 0 0-17.64 0z"/>
                    </svg>
                  </button>
                  <button aria-label="More actions" className="rounded-full bg-white p-2.5 text-black shadow-md transition-colors hover:bg-gray-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1.5"/>
                      <circle cx="19" cy="12" r="1.5"/>
                      <circle cx="5" cy="12" r="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-1 pt-3">
              <h2 className="truncate text-base font-bold text-[#e8e8e8] mix-blend-difference">{pin.title}</h2>
              <p className="truncate text-sm text-[#bdbdbd]">{pin.author}</p>
            </div>
          </article>
        ))}
      </Masonry>

      <a
        href="/create"
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#e60023] text-5xl font-light leading-none text-white shadow-xl transition-transform hover:scale-105"
        aria-label="Create pin"
      >
        +
      </a>
    </div>
  );
};

export default Home;
