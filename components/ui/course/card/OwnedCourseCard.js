import Image from "next/image";

const STATE_COLORS = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red",
};

const OwnedCourseCard = ({ children, course }) => {
  const stateColor = STATE_COLORS[course.state];
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block sm:flex">
        <div className="flex-1">
          <div className="h-72 sm:h-full next-image-wrapper">
            <Image
              className="object-cover"
              height={45}
              width={45}
              layout="responsive"
              src={course.coverImage}
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <span className="text-lg leading-6 font-medium text-gray-900 mr-2">
              {course.title}
            </span>
            <span
              className={`text-xs p-2 rounded-full bg-${stateColor}-200 text-${stateColor}-700`}
            >
              {course.state}
            </span>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.price} ETH
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.ownedCourseId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Proof</dt>
                <dd className="break-words mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedCourseCard;
