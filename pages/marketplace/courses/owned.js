import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

const OwnedCourses = () => {
  return (
    <BaseLayout>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section>
        <OwnedCourseCard />
      </section>
    </BaseLayout>
  );
};

export default OwnedCourses;
