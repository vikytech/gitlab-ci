loadCssFile = function() {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "dashboard.css");
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
};

var getProjectInfo = () => {
  return $.getJSON("http://localhost:3000/projects.json", function(projects) {
    projects;
  });
};

var getUserInfo = () => {
  return $.getJSON("http://localhost:3000/user_info.json", function(user) {
    user;
  });
};

var getInfoFromServer = (userInfo, path, params, callback) => {
  $.ajax({
    url: userInfo.host + path + "?" + $.param(params),
    headers: {
      "PRIVATE-TOKEN": userInfo.private_token
    },
    type: "GET",
    success: function(res) {
      callback(res);
    }
  });
};
var renderJobs = jobs => {
  _.each(jobs, job => {
    filtered_job = {
      jobId: job.id,
      pipelineId: job.pipeline.id,
      stageName: job.stage,
      jobName: job.name,
      jobStatus: job.status
    };
    $('#'+filtered_job.pipelineId + '> .jobs').append(
      '<div id=' + filtered_job.jobId + ' class="job"><div class="job-name ' +
        filtered_job.jobStatus +
        '-fg"><span>' +
        filtered_job.jobName +
        "</span></div></div>"
    );
  });
};

var renderPipeline = pipelineResponse => {
  _.each(pipelineResponse, project => {
    filtered_project = {
      id: project.id,
      name: project.ref,
      projectStatus: project.status
    };
    $(".projects").append(
      '<div id='+filtered_project.id+ ' class="pipeline" >' +
      '<div class="pipeline-status ' +
      filtered_project.projectStatus +
        '-bg"></div>' + '<div class="branch"><span class="branch-name">' +
        filtered_project.name +
        "</span></div><div class='jobs'></div>"
    );
  });
};

var renderDashboard = (userInfo, projects) => {
  pipelineParams = {
    ref: projects[0].branches[0],
    sort: "desc",
    per_page: "1"
  };

  jobParams = {
    ref: projects[0].branches[0],
    sort: "desc"
  };

  jobsCallback = pipelineResponse => {
    renderPipeline(pipelineResponse)
    jobs = getInfoFromServer(
      userInfo,
      "projects/" +
        projects[0].id +
        "/pipelines/" +
        pipelineResponse[0].id +
        "/jobs",
      jobParams,
      renderJobs
    );
  };

  getInfoFromServer(
    userInfo,
    "projects/" + projects[0].id + "/pipelines",
    pipelineParams,
    jobsCallback
  );
};

$(document).ready(() => {
  // setInterval(function() {
  $.when(getUserInfo(), getProjectInfo()).then((userInfo, projects) => {
    renderDashboard(userInfo[0], projects[0].projects);
  });
  // }, 30000);
});
