import { useState } from 'react';
import { FaUpload, FaInfoCircle } from 'react-icons/fa';

const CreatePin = () => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    handleDrag(e);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-white">Create Pin</h1>
        <div className="flex gap-4">
          <button className="bg-[#2b2b2b] hover:bg-[#383838] text-white font-semibold py-3 px-6 rounded-full transition-colors">Discard</button>
          <button className="bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold py-3 px-6 rounded-full transition-colors">Save</button>
        </div>
      </div>

      <div className="flex flex-col gap-10 rounded-2xl border border-[#2b2b2b] bg-[#0f1010] p-8 shadow-lg md:flex-row">
        <div className="flex-1 flex flex-col">
          <label 
            className={`relative flex-1 min-h-[500px] border-2 border-dashed ${dragActive ? 'border-gray-300 bg-[#252525]' : 'border-gray-600 bg-[#1e1e1e]'} rounded-3xl flex flex-col justify-center items-center p-6 text-center transition-all cursor-pointer hover:bg-[#252525] hover:border-gray-500`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input className="sr-only" type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
            {preview ? (
              <img src={preview} alt="Pin preview" className="absolute inset-0 h-full w-full rounded-3xl object-cover" />
            ) : (
              <>
                <div className="bg-[#383838] p-4 rounded-full mb-4">
                  <FaUpload className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 max-w-sm">Choose a file or drag and drop it here</h3>
                <p className="text-gray-300 text-base max-w-sm">We recommend using high quality .jpg files less than 20MB</p>
              </>
            )}
          </label>
          <button className="w-full mt-6 bg-[#383838] hover:bg-[#454545] text-gray-300 font-semibold py-4 rounded-xl transition-colors">
            Save from URL
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Pin Title</label>
            <input 
              type="text" 
              placeholder="Add a title" 
              className="w-full bg-[#111111] text-white text-2xl font-bold rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700 transition-all placeholder-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Description</label>
            <textarea 
              placeholder="Tell everyone what your Pin is about" 
              rows="4"
              maxLength={500}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full bg-[#111111] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700 transition-all placeholder-gray-700 resize-none font-medium"
            ></textarea>
            <div className="text-right text-xs text-gray-500 mt-1 font-semibold">{description.length}/500 characters</div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Category</label>
            <div className="relative">
              <select defaultValue="" className="w-full appearance-none bg-[#2b2b2b] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-transparent focus:border-gray-600 transition-all font-medium cursor-pointer">
                <option value="" disabled hidden>Select a category</option>
                <option value="art">Art</option>
                <option value="design">Interior Design</option>
                <option value="photo">Photography</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-semibold text-gray-300">Alt Text</label>
              <FaInfoCircle className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Explain what people can see in the Pin" 
              className="w-full bg-[#111111] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700 transition-all placeholder-gray-700 font-medium"
            />
          </div>

          <div className="mt-2 flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span className="font-semibold text-sm">More options</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
