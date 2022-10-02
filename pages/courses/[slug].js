import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import getAllCourses from "@content/courses/fetcher";

const Course = ({ course }) => {
  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints keypoints={course.wsl} />
      <Curriculum locked={true} />
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
