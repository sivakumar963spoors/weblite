import { DayPlannerModuleMenu } from './DayPlannerData';

const {
  plannedCount,
  actualCount,
  unplannedCount,
  teamPlannedCount,
  teamUnplannedCount,
} = useSelector((state) => state.DayPlannerModule);

export const GetDayPlannerModuleMenu = DayPlannerModuleMenu({
  plannedCount,
  actualCount,
  unplannedCount,
  teamPlannedCount,
  teamUnplannedCount,
});
