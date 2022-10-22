import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Message, Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import getAllCourses from "@content/courses/fetcher";

const Course = ({ course }) => {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  const isLocked = courseState !== "activated";

  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints keypoints={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState == "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contract
                info@blockcoding.crypto
              </i>
            </Message>
          )}
          {courseState == "activated" && (
            <Message type="success">
              Blockcoding wishes you happy watching of the course.
            </Message>
          )}
          {courseState == "deactivated" && (
            <Message type="danger">
              Course has been deactivated, due to the incorrect purchase data.
              The functionality to watch the course has been temporarily
              disabled.
              <i className="block font-normal">
                Please contract info@blockcoding.crypto
              </i>
            </Message>
          )}
        </div>
      )}

      <Curriculum locked={isLocked} courseState={courseState} />
      <Modal />
    </BaseLayout>
  );
};

export const getStaticPaths = () => {
  const { data } = getAllCourses();
  return {
    paths: data.map((course) => {
      return {
        params: {
          slug: course.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { data } = getAllCourses();

  return {
    props: {
      course: data.filter((course) => course.slug == params.slug)[0],
    },
  };
};

export default Course;
