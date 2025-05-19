export const BASE_URL = "http://localhost:8080/effort";

export const actionRequired_ajax = `${BASE_URL}/reactrest/api/ajax/get/dashboard/action/required/configurations`;
export const actionRequired_Approvals = `${BASE_URL}/reactrest/api/individualSpec/formApprovalCount`;
export const actionRequired_leaveRequests = `${BASE_URL}/reactrest/api/ajax/actionable/leavesCountForid`;
export const actionRequired_worksList = `${BASE_URL}/reactrest/api/ajax/actionable/works`;
export const todaysEmpLeave_ajax = `${BASE_URL}/reactrest/api/today/employeeLeaves`;
export const loadHomeScreenCards_ajax = `${BASE_URL}/reactrest/api/weblite/menuItems`;
export const loggedInUser_ajax = `${BASE_URL}/reactrest/api/home`;
export const totalCustomersSize_ajax = `${BASE_URL}/reactrest/api/get/weblite/total/customers/count`;
export const todaysCustomerVisits_ajx = `${BASE_URL}/reactrest/api/get/weblite/todays/customers/visits`;
export const loadNotMetPast30Days_ajax = `${BASE_URL}/reactrest/api/get/weblite/met/customer`;
export const loadMetPast30DaysPercentage_ajax = `${BASE_URL}/reactrest/api/get/weblite/not/met/customer`;
export const loadtotalsCustomersCountUnderEmployees_ajax = `${BASE_URL}/reactrest/api/get/weblite/total/mapped/customers/count/team`;
export const loadYesterdayCustomerVisitsByTeam_ajax = `${BASE_URL}/reactrest/api/get/team/employee/met/customer?viewType=yesterday`;
export const loadTodaysCustomerVisitsByTeam_ajax = `${BASE_URL}/reactrest/api/get/team/employee/met/customer?viewType=today`;
export const loadNotMetPast30DaysByTeam_ajax = `${BASE_URL}/reactrest/api/get/employee/not/met/customer`;

export const getCustomersAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/all/customers`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};



export const getKnowledgeBaseAjaxUrl = `${BASE_URL}/reactrest/api/knowledgebase/manage`;
export const getArticleAjax = (id, forView) =>
  `${BASE_URL}/reactrest/api/manage/articles/${id}?forView=${forView}`;
export const getArticleNewAjaxUrl = (viewType) =>
  `${BASE_URL}/reactrest/api/knowledgebase/manage/new?viewType=${viewType}`;
export const loadKNowledgeBasedCount = `${BASE_URL}/reactrest/api/knowledgebase/manage/count`;
export const getDayPlanCustomerUrl = `${BASE_URL}/reactrest/api/dayPlan/customers`;
