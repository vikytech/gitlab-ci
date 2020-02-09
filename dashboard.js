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
    $("#" + filtered_job.pipelineId + "> .jobs").append(
      "<div id=" +
        filtered_job.jobId +
        ' class="job"><div class="job-name ' +
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
      "<div id=" +
        filtered_project.id +
        ' class="pipeline" >' +
        '<div class="pipeline-status ' +
        filtered_project.projectStatus +
        '-bg"></div>' +
        '<div class="branch"><span class="branch-name"> #' +
        filtered_project.name +
        "</span></div><div class='jobs'></div>"
    );
  });
};

var renderDashboard = (userInfo, projects) => {
  _.each(projects, project => {
    _.each(project.branches, branch => {
      pipelineParams = {
        ref: branch,
        sort: "desc",
        per_page: "1"
      };

      jobParams = {
        ref: branch,
        sort: "desc"
      };

      jobsCallback = pipelineResponse => {
        renderPipeline(pipelineResponse);
        jobs = getInfoFromServer(
          userInfo,
          "projects/" +
            project.id +
            "/pipelines/" +
            pipelineResponse[0].id +
            "/jobs",
          jobParams,
          renderJobs
        );
      };

      getInfoFromServer(
        userInfo,
        "projects/" + project.id + "/pipelines",
        pipelineParams,
        jobsCallback
      );
    });
  });
};

$(document).ready(() => {
  // setInterval(function() {
  $.when(getUserInfo(), getProjectInfo()).then((userInfo, repositories) => {
    _.each(repositories[0], repo => {
      renderDashboard(userInfo[0], repo);
    });
  });
  // }, 30000);
});
