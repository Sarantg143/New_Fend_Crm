


// import React, { useState } from "react";

// const UserTaskPage = () => {
//   // Sample data
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "Complete Project Documentation",
//       description: "Prepare the final project documentation in PDF format",
//       file: "project_docs.pdf",
//       assignedBy: "Admin",
//       dateAssigned: "2023-05-15",
//     },
//     {
//       id: 2,
//       title: "Review API Design",
//       description: "Review the API design document and provide feedback",
//       file: "api_design.pdf",
//       assignedBy: "Admin",
//       dateAssigned: "2023-05-10",
//     },
//   ]);

//   const [submissions, setSubmissions] = useState([
//     {
//       id: 1,
//       taskId: 2,
//       link: "https://docs.google.com/document/d/456",
//       status: "approved", // pending, approved, rejected
//       dateSubmitted: "2023-05-12",
//     },
//   ]);

//   const [newSubmission, setNewSubmission] = useState({
//     taskId: "",
//     link: "",
//   });

//   // Get progress percentage and color based on submission status
//   const getProgressInfo = (taskId) => {
//     if (!hasSubmission(taskId)) return { percentage: 0, color: "bg-gray-400" };

//     const status = getSubmissionStatus(taskId);
//     switch (status) {
//       case "pending":
//         return { percentage: 75, color: "bg-yellow-500" };
//       case "approved":
//         return { percentage: 100, color: "bg-green-500" };
//       case "rejected":
//         return { percentage: 35, color: "bg-red-500" };
//       default:
//         return { percentage: 0, color: "bg-gray-400" };
//     }
//   };

//   // Handle submission
//   const handleSubmitTask = (e) => {
//     e.preventDefault();
//     const newSubmissionObj = {
//       id: submissions.length + 1,
//       taskId: parseInt(newSubmission.taskId),
//       link: newSubmission.link,
//       status: "pending",
//       dateSubmitted: new Date().toISOString().split("T")[0],
//     };

//     setSubmissions([...submissions, newSubmissionObj]);
//     setNewSubmission({
//       taskId: "",
//       link: "",
//     });

//     alert("Task submitted successfully! Status: Waiting for admin review");
//   };

//   // Check if task has submission
//   const hasSubmission = (taskId) => {
//     return submissions.some((sub) => sub.taskId === taskId);
//   };

//   // Get submission status for a task
//   const getSubmissionStatus = (taskId) => {
//     const submission = submissions.find((sub) => sub.taskId === taskId);
//     return submission ? submission.status : null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-4 shadow-md">
//         <div className="container mx-auto">
//           <h1 className="text-2xl font-bold">User Task Dashboard</h1>
//         </div>
//       </header>

//       <main className="container mx-auto p-4">
//         <div className="grid grid-cols-1 gap-6">
//           {/* Assigned Tasks */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Your Assigned Tasks</h2>
//             {tasks.length === 0 ? (
//               <p className="text-gray-500">No tasks assigned to you</p>
//             ) : (
//               <div className="space-y-4">
//                 {tasks.map((task) => {
//                   const progress = getProgressInfo(task.id);
//                   return (
//                     <div
//                       key={task.id}
//                       className="border p-4 rounded-lg bg-gray-50"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-medium text-lg">{task.title}</h3>
//                           <p className="text-sm text-gray-600 mb-2">
//                             Assigned by: {task.assignedBy} on{" "}
//                             {task.dateAssigned}
//                           </p>
//                           <p className="text-gray-700 mb-3">
//                             {task.description}
//                           </p>
//                         </div>
//                         {hasSubmission(task.id) ? (
//                           <span
//                             className={`inline-block px-3 py-1 rounded-full text-sm ${
//                               getSubmissionStatus(task.id) === "pending"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : getSubmissionStatus(task.id) === "approved"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {getSubmissionStatus(task.id)}
//                           </span>
//                         ) : null}
//                       </div>

//                       {/* Progress Bar with dynamic color */}
//                       <div className="mb-3">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-xs font-medium text-gray-500">
//                             Progress
//                           </span>
//                           <span className="text-xs font-medium text-gray-500">
//                             {progress.percentage}%
//                           </span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                           <div
//                             className={`${progress.color} h-2.5 rounded-full transition-all duration-500 ease-out`}
//                             style={{ width: `${progress.percentage}%` }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-3 mt-3">
//                         <a
//                           href={task.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//                         >
//                           Download Task PDF
//                         </a>

//                         {!hasSubmission(task.id) ? (
//                           <button
//                             onClick={() =>
//                               setNewSubmission({
//                                 ...newSubmission,
//                                 taskId: task.id.toString(),
//                               })
//                             }
//                             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
//                           >
//                             Submit Task
//                           </button>
//                         ) : getSubmissionStatus(task.id) === "pending" ? (
//                           <span className="text-gray-600 text-sm flex items-center">
//                             Waiting for admin review
//                           </span>
//                         ) : null}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Submit Task Form */}
//           {newSubmission.taskId && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">
//                   Submit Task:{" "}
//                   {
//                     tasks.find((t) => t.id === parseInt(newSubmission.taskId))
//                       ?.title
//                   }
//                 </h2>
//                 <button
//                   onClick={() => setNewSubmission({ taskId: "", link: "" })}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ×
//                 </button>
//               </div>
//               <form onSubmit={handleSubmitTask}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">
//                     Submission Link (Google Docs, GitHub, etc.)
//                   </label>
//                   <input
//                     type="url"
//                     className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="https://..."
//                     value={newSubmission.link}
//                     onChange={(e) =>
//                       setNewSubmission({
//                         ...newSubmission,
//                         link: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Provide a link to your completed work
//                   </p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Submit Task
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setNewSubmission({ taskId: "", link: "" })}
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserTaskPage;





import React, { useState } from "react";

const UserTaskPage = () => {
  // Sample data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Project Documentation",
      description: "Prepare the final project documentation in PDF format",
      file: "project_docs.pdf",
      assignedBy: "Admin",
      dateAssigned: "2023-05-15",
    },
    {
      id: 2,
      title: "Review API Design",
      description: "Review the API design document and provide feedback",
      file: "api_design.pdf",
      assignedBy: "Admin",
      dateAssigned: "2023-05-10",
    },
  ]);

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      taskId: 2,
      link: "https://docs.google.com/document/d/456",
      status: "approved", // pending, approved, rejected
      dateSubmitted: "2023-05-12",
    },
  ]);

  const [newSubmission, setNewSubmission] = useState({
    taskId: "",
    link: "",
  });

  // Get progress information
  const getProgressInfo = (taskId) => {
    if (!hasSubmission(taskId)) return { percentage: 0, color: "bg-gray-300" };

    const status = getSubmissionStatus(taskId);
    switch (status) {
      case "pending":
        return { percentage: 75, color: "bg-amber-400" };
      case "approved":
        return { percentage: 100, color: "bg-emerald-500" };
      case "rejected":
        return { percentage: 35, color: "bg-rose-500" };
      default:
        return { percentage: 0, color: "bg-gray-300" };
    }
  };

  // Handle submission
  const handleSubmitTask = (e) => {
    e.preventDefault();
    const newSubmissionObj = {
      id: submissions.length + 1,
      taskId: parseInt(newSubmission.taskId),
      link: newSubmission.link,
      status: "pending",
      dateSubmitted: new Date().toISOString().split("T")[0],
    };

    setSubmissions([...submissions, newSubmissionObj]);
    setNewSubmission({ taskId: "", link: "" });
  };

  // Check if task has submission
  const hasSubmission = (taskId) => {
    return submissions.some((sub) => sub.taskId === taskId);
  };

  // Get submission status
  const getSubmissionStatus = (taskId) => {
    const submission = submissions.find((sub) => sub.taskId === taskId);
    return submission ? submission.status : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="">
        <div className=" px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Task Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Task List */}
        <div className="space-y-6">
          {/* Submit Task Form (when active) */}
          {newSubmission.taskId && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Submit Task:{" "}
                  {
                    tasks.find((t) => t.id === parseInt(newSubmission.taskId))
                      ?.title
                  }
                </h2>
                <button
                  onClick={() => setNewSubmission({ taskId: "", link: "" })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmitTask}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submission Link
                  </label>
                  <input
                    type="url"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="https://..."
                    value={newSubmission.link}
                    onChange={(e) =>
                      setNewSubmission({
                        ...newSubmission,
                        link: e.target.value,
                      })
                    }
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Provide a link to your completed work (Google Docs, GitHub,
                    etc.)
                  </p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setNewSubmission({ taskId: "", link: "" })}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Task
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Tasks</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">No tasks assigned to you</p>
                </div>
              ) : (
                tasks.map((task) => {
                  const progress = getProgressInfo(task.id);
                  const status = getSubmissionStatus(task.id);

                  return (
                    <div key={task.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {task.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Assigned by {task.assignedBy} on {task.dateAssigned}
                          </p>
                          <p className="mt-2 text-sm text-gray-700">
                            {task.description}
                          </p>
                        </div>
                        {status && (
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {status}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-gray-700">
                            {progress.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${progress.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex space-x-3">
                        <a
                          href={task.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download
                        </a>
                        {!status ? (
                          <button
                            onClick={() =>
                              setNewSubmission({
                                ...newSubmission,
                                taskId: task.id.toString(),
                              })
                            }
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Submit Task
                          </button>
                        ) : (
                          status === "pending" && (
                            <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500">
                              Under review
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserTaskPage;