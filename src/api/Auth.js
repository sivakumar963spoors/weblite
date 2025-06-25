export const BASE_URL = "http://localhost:8080/effort";
//export const BASE_URL ="https://vapt.spoors.dev/React_weblite"
//export const BASE_URL = "https://vapt.spoors.dev/webliteBackend";
//export const BASE_URL = "https://vapt.spoors.dev/Reactweblite";
export const encrypasswprd = `${BASE_URL}/service/get/encriptedSHA256`;
export const postLogin = `${BASE_URL}/reactrest/get/webliteLogin`;
// logout
// add leave
export const getAddLeaveData = `${BASE_URL}/reactrest/api/leave/my/create/-330?isWebLiteView=true`;
export const postleave = `${BASE_URL}/reactrest/api/data/leave/my/create`;
export const get_logout = `${BASE_URL}/reactrest/weblite/logout?value=1`;
export const actionRequired_ajax = `${BASE_URL}/reactrest/api/ajax/get/dashboard/action/required/configurations`;
export const actionRequired_Approvals = `${BASE_URL}/reactrest/api/individualSpec/formApprovalCount`;
export const actionRequired_leaveRequests = `${BASE_URL}/reactrest/api/ajax/actionable/leavesCountForid`;
export const actionRequired_worksList = `${BASE_URL}/reactrest/api/ajax/actionable/works`;
export const todaysEmpLeave_ajax = `${BASE_URL}/reactrest/api/today/employeeLeaves`;
export const loadHomeScreenCards_ajax = `${BASE_URL}/reactrest/api/weblite/menuItems`;
// cancel leave 
export const getWithDrawLeave = ({ leaveId, tzo, webActionToken, isWebLiteView, leaveMenuType }) => {
  const url = new URL(`${BASE_URL}/reactrest/api/leave/my/cancel/${leaveId}/${tzo}`);

  url.searchParams.append("webActionToken", webActionToken);
  url.searchParams.append("isWebLiteView", isWebLiteView);
  url.searchParams.append("leaveMenuType", leaveMenuType);

  return url.toString();
};


export const loggedInUser_ajax = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/home`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

export const totalCustomersSize_ajax = `${BASE_URL}/reactrest/api/get/weblite/total/customers/count`;
export const todaysCustomerVisits_ajx = `${BASE_URL}/reactrest/api/get/weblite/todays/customers/visits`;
export const loadNotMetPast30Days_ajax = `${BASE_URL}/reactrest/api/get/weblite/met/customer`;
export const loadMetPast30DaysPercentage_ajax = `${BASE_URL}/reactrest/api/get/weblite/not/met/customer`;
export const loadtotalsCustomersCountUnderEmployees_ajax = `${BASE_URL}/reactrest/api/get/weblite/total/mapped/customers/count/team`;
export const loadYesterdayCustomerVisitsByTeam_ajax = `${BASE_URL}/reactrest/api/get/team/employee/met/customer?viewType=yesterday`;
export const loadTodaysCustomerVisitsByTeam_ajax = `${BASE_URL}/reactrest/api/get/team/employee/met/customer?viewType=today`;
export const loadNotMetPast30DaysByTeam_ajax = `${BASE_URL}/reactrest/api/get/employee/not/met/customer`;

//knowledge base
export const getKnowledgeBaseAjaxUrl = `${BASE_URL}/reactrest/api/knowledgebase/manage`;
export const getArticleAjax = (id, forView) =>
  `${BASE_URL}/reactrest/api/manage/articles/${id}?forView=${forView}`;
export const getArticleNewAjaxUrl = (viewType) =>
  `${BASE_URL}/reactrest/api/knowledgebase/manage/new?viewType=${viewType}`;
export const loadKNowledgeBasedCount = `${BASE_URL}/reactrest/api/knowledgebase/manage/count`;

//customer

export const customerDetailsAPi = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/customer/details/view`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
export const getCustomersAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/all/customers`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
export const getEmpAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/all/employees`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

export const cutomerActivityUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/customer/activities`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
export const customerActivityForms = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/customer/activity/forms`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// works count

export const loadActionableWorksByMeURl = `${BASE_URL}/reactrest/api/ajax/get/actionable/works/me`;
export const loadWorkSpecCardsCounturl = `${BASE_URL}/reactrest/api/ajax/get/weblite/workSpecs`;
export const loadWorkSpecPendingInvitationByMeUrl = `${BASE_URL}/reactrest/api/ajax/get/pending/work/invitations/me`;
export const loadWorkSpecPendingInvitationByTeamUrl = `${BASE_URL}/reactrest/api/ajax/get/pending/work/invitations/team`;
export const loadInActiveWorks = `${BASE_URL}/reactrest/api/ajax/get/inactive/works`;
export const loadCompletedWorks = `${BASE_URL}/reactrest/api/ajax/get/completed/weblite/workSpecs`;
//export const loadForTeamNeedTodo = `${BASE_URL}/reactrest/api/workSpec/actionable/details/byTeam`;
export const loadForTeamNeedTodo = (params = {}) => {
  const url = new URL(
    `${BASE_URL}/reactrest/api/workSpec/actionable/details/byTeam`
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
// forms

export const loadFormApprovalsCountByMe = `${BASE_URL}/reactrest/api/get/form/approvals/count/under/emp`;
export const loadFormApprovalsCountByManager = `${BASE_URL}/reactrest/api/get/form/approvals/count/me`;
export const loadFromApprovedByMe = (formspecId) =>
  `${BASE_URL}/reactrest/api/get/form/approved/count/me?formSpecId=${formspecId}`;

// forms today yestarday
export const yestardayCountUrl = (empId) =>
  `${BASE_URL}/reactrest/api/ajax/form/activities?employeeId=${empId}&day=yesterday`;
export const todayCountUrl = (empId) =>
  `${BASE_URL}/reactrest/api/ajax/form/activities?employeeId=${empId}&day=today`;

// leaves for customer view
export const getLeavesByTypes = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/leaves/new`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
export const getLeavesByTypesForCount = (params = {}) => {
  const url = new URL(
    `${BASE_URL}/reactrest/api/view/leaves/new/manager/employees/count`
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// leaves  manager for module
export const pendingApprovals = `${BASE_URL}/reactrest/api/get/weblite/leaves/pending/count/me`;
export const totalMyLeavesSize = `${BASE_URL}/reactrest/api/get/weblite/leaves/count/me`;
export const totalTeamLeavesSize = `${BASE_URL}/reactrest/api/get/weblite/leaves/count`;

// leaves not manager module

export const approvedLeaves = `${BASE_URL}/reactrest/api/get/weblite/leaves/approved/count/me`;

export const rejectedLeaves = `${BASE_URL}/reactrest/api/get/weblite/leaves/rejected/count/me`;

// day plan
// all customer
export const getDayPlanCustomerUrl = `${BASE_URL}/reactrest/api/dayPlan/customers`;
export const getPlannedCustomersCount = (allCustomers) =>
  `${BASE_URL}/reactrest/api/ajax/customers/planned/visits?allCustomers=${allCustomers}&viewType=1`;
export const getActualCustomerVisitsCount = (allCustomers, normal, forced) =>
  `${BASE_URL}/reactrest/api/ajax/actual/customers/planned/visits/counts?allCustomers=${allCustomers}&normal=${normal}&forced=${forced}`;

export const getUnplannedCustomerVisitsCount = (allCustomers, normal, forced) =>
  `${BASE_URL}/reactrest/api/ajax/unplanned/customer/visits/counts?allCustomers=${allCustomers}&normal=${normal}&forced=${forced}`;
//  day plan for manager

export const getTeamPlannedCustomersCount = (allCustomers) =>
  `${BASE_URL}/reactrest/api/ajax/customers/planned/visits?allCustomers=${allCustomers}&viewType=2`;
export const getTeamUnplannedCustomerVisitsCount = (
  allCustomers,
  normal,
  forced
) =>
  `${BASE_URL}/reactrest/api/ajax/customers/unplanned/visits?allCustomers=${allCustomers}&normal=${normal}&forced=${forced}`;
//  signin signout
export const getSignInReason = (params = {}) => {
  const { empId, ...queryParams } = params;

  const url = new URL(
    `${BASE_URL}/reactrest/api/device/dashboard/reasonSignin/${empId}`
  );

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
// view approvals

export const getViewApprovals = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/approvals`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// form view
export const getfromAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/forms`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
export const getnewfromAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/view/forms/new`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// workspec view
export const getnewworksAjaxUrl = (params = {}) => {
  const url = new URL(`${BASE_URL}/reactrest/api/workSpec/actions/new`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};
// my approvals status view
export const fetchMyApprovals = (formId)=>`${BASE_URL}/reactrest/api/status/view/${formId}?isWebLiteView=true` 