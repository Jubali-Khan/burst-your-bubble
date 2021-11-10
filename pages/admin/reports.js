import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ReportInstance from '../../components/ReportInstance';

const reportsContainer = css`
  border: 1px grey solid;
  border-radius: 10px;
  margin: 1% 5%;
  padding: 1%;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const textSectionStyles = css`
  .col-10 {
    float: left;
    width: 14%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
  }
  .comment {
    float: left;
    width: 36%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
  }
  .why {
    float: left;
    width: 31%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
  }
  .actions {
    float: left;
    width: 19%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
  }
`;

export default function Reports(props) {
  const [reports, setReports] = useState(props.reports);
  return (
    <Layout>
      <h1>Reports</h1>
      <section css={textSectionStyles}>
        <span className="col-10"></span>
        <span className="comment">COMMENT:</span>
        <span className="why">WHY:</span>
        <span className="actions">ACTIONS:</span>
      </section>
      <section css={reportsContainer}>
        {reports &&
          reports.map((report) => (
            <ReportInstance
              rep={report}
              reports={reports}
              setReports={setReports}
              comments={props.comments}
              key={`repInst-${report.id}`}
            />
          ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const reportsResponse = await fetch(
    'http://localhost:3000/api/reports/handle',
  );
  const reports = await reportsResponse.json();
  // console.log('reports in gSSP: ', reports);

  const commentsResponse = await fetch(
    'http://localhost:3000/api/comments/get',
  );
  const comments = await commentsResponse.json();

  // is admin?
  const { isAdminSession } = await import('../../util/database');

  // No session?
  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP in reports', sessionToken);

  if (!sessionToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  //

  const adminSession = await isAdminSession(sessionToken);

  console.log('adminSession in gSSP reports: ', adminSession);
  // console.log('adminSession.role in gSSP create: ', adminSession.role);

  // Not an admin adminSession?
  if (!adminSession) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }
  //

  return {
    props: {
      reports: reports,
      comments: comments,
    },
  };
}
