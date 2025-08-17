import Dashboard from "../components/domains/dashboard/dashboard.component";
import LeaderboardsWrapper from "../components/domains/leaderboards/leaderboards-wrapper/leaderboards-wrapper.component";
import SingleForm from "../layout/single-form.layout";

function DashboardPage() {
    return (
        <SingleForm>
            <Dashboard />
            <LeaderboardsWrapper />
        </SingleForm>
    );
}

export default DashboardPage;
