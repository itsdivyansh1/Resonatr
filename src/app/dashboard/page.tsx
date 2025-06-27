import AnalyticsPreview from "./_components/analytics-preview";
import CommunityTips from "./_components/community-tips";
import ContentCalendarPreview from "./_components/content-calendar-preview";
import QuickActions from "./_components/quick-actions";
import RecentContentIdeas from "./_components/recent-content-ideas";
import ResourcePreview from "./_components/resource-preview";
import StatsCards from "./_components/statscard";
import WorkflowStatus from "./_components/workflow-status";

const DashboardHome = () => {
  return (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContentCalendarPreview />
        <RecentContentIdeas />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <AnalyticsPreview />
        <WorkflowStatus />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ResourcePreview />
        <QuickActions />
        <CommunityTips />
      </div>
    </>
  );
};

export default DashboardHome;
