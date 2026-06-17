import { useEffect, useState } from "react";
import axios from "axios";

function Reports({ workspaceId }) {

  const [reports, setReports] =
    useState([]);

  useEffect(() => {

    fetchReports();

  }, [workspaceId]);

  const fetchReports =
    async () => {

      try {

        const response =
          await axios.get(
            `http://127.0.0.1:8000/interview-reports/${workspaceId}`
          );

        setReports(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="reports-container">

      <h2>
        Interview Reports
      </h2>

      {
        reports.length === 0 ? (

          <div className="empty-state">
            No reports available yet.
          </div>

        ) : (

          reports.map(
            (report) => (

              <div
                key={report._id}
                className="report-card"
              >

                <div className="report-date">

                  {
                    new Date(
                      report.created_at
                    ).toLocaleString()
                  }

                </div>

                <pre>
                  {report.report}
                </pre>

              </div>
            )
          )
        )
      }

    </div>
  );
}

export default Reports;