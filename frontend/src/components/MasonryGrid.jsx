import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  500: 1,
};

const MasonryGrid = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-4 md:-ml-6"
      columnClassName="pl-4 md:pl-6 bg-clip-padding"
    >
      {children}
    </Masonry>
  );
};

export default MasonryGrid;
