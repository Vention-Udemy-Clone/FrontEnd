import { Bookmark } from "lucide-react";

export const CourseCard = () => {
  return (
    <div className="mx-auto flex max-w-[400px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md sm:max-w-none">
      <div>
        <img
          className="h-40 w-full object-cover"
          src="https://source.unsplash.com/random"
          alt="courseimage "
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-1 gap-4">
          <h3 className="mr-auto text-lg font-semibold">Course Title</h3>
          <Bookmark className="text-gray-300" />
        </div>

        <p className="mb-10 mt-3 line-clamp-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consequatur cupiditate, ex
          molestiae laudantium minus quod in consequuntur ab, aliquam sequi ratione possimus qui
          dolorem deleniti? Maiores quibusdam hic natus.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 shrink-0 rounded-full"
              src="https://source.unsplash.com/random"
              alt="avatar"
            />
            <div className="overflow-hidden">
              <p className="line-clamp-1 break-words text-sm/4 text-gray-500">Instructor Name</p>
            </div>
          </div>

          <p className="ml-auto text-xs/3 font-bold text-primary">Beginner</p>
        </div>
      </div>
    </div>
  );
};
