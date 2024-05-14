import { Bookmark } from 'lucide-react';

export const CourseCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      <div>
        <img
          className="w-full h-40 object-cover"
          src="https://source.unsplash.com/random"
          alt="courseimage "
        />
      </div>

      <div className="p-4 flex flex-1 flex-col">
        <div className="flex flex-1 gap-4 mb-24">
          <h3 className="text-lg font-semibold mr-auto">Course Title</h3>
          <Bookmark className="text-gray-300" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full shrink-0"
              src="https://source.unsplash.com/random"
              alt="avatar"
            />
            <div className="overflow-hidden">
              <p className="text-sm/4 text-gray-500 break-words line-clamp-1">Instructor Name</p>
            </div>
          </div>

          <p className="ml-auto text-xs/3 font-bold text-primary">Beginner</p>
        </div>
      </div>
    </div>
  );
};
