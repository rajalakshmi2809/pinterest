const Profile = () => {
  const pins = [
    { title: 'Modern Desert Sanctuary', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
    { title: 'Fluid Dynamics in Red', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80' },
    { title: 'Timeless Precision', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
    { title: 'Morning Reflection', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
    { title: 'Minimal Workspace', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80' },
    { title: 'Urban Geometry', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="mx-auto flex max-w-[1500px] flex-col items-center px-5 py-10">
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=220&q=80" alt="Profile" className="mb-6 h-44 w-44 rounded-full border-2 border-gray-700 object-cover" />
      <h1 className="mb-1 text-5xl font-bold tracking-tight text-white">Alex Rivet</h1>
      <p className="text-gray-400 mb-6 font-medium">@alexrivet_design</p>
      
      <div className="flex gap-4 mb-12">
        <button className="bg-[#2b2b2b] hover:bg-[#383838] text-white font-bold py-3 px-6 rounded-full transition-colors">Edit Profile</button>
        <button className="bg-[#2b2b2b] hover:bg-[#383838] text-white font-bold py-3 px-6 rounded-full transition-colors">Share</button>
      </div>

      <div className="mb-10 flex w-full justify-center gap-8 border-b border-[#7a4d4d]">
        <button className="text-white font-bold pb-3 border-b-2 border-white px-2 text-lg">Created</button>
        <button className="text-gray-400 font-bold pb-3 hover:text-white transition-colors px-2 text-lg border-b-2 border-transparent">Saved</button>
      </div>

      <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {pins.map((pin) => (
          <div key={pin.title} className="group flex cursor-pointer flex-col gap-3">
            <div className="overflow-hidden rounded-2xl bg-[#202020]">
              <img src={pin.image} alt={pin.title} className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="truncate px-1 text-base font-bold text-white">{pin.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
