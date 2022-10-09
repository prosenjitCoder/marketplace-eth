import { useWalletInfo } from "@components/hooks/web3";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import getAllCourses from "@content/courses/fetcher";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";

const purchaseCourse = (order) => {
  alert(JSON.stringify(order));
};

const Marketplace = ({ courses }) => {
  const { canPurchaseCourse } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <BaseLayout>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            disabled={!canPurchaseCourse}
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          onSubmit={purchaseCourse}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </BaseLayout>
  );
};

export const getStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

export default Marketplace;
