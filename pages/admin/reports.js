import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ReportInstance from '../../components/ReportInstance';

const reportsContainer = css`
  border: 1px grey solid;
  border-radius: 10px;
  margin: 1% 5%;
  padding: 1%;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  button {
    width: 150px;
    height: 25px;
    margin: 4%auto;
  }
`;

const textSectionStyles = css`
  margin-bottom: 1.5%;
  .col-10 {
    float: left;
    width: 14%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
  }
  .comment {
    float: left;
    width: 36%;
    margin-bottom: 0.5%;
    font-weight: bold;
  }
  .why {
    float: left;
    width: 32%;
    margin-bottom: 0.5%;
    font-weight: bold;
  }
  .actions {
    float: left;
    width: 16%;
    margin-bottom: 0.5%;
    font-weight: bold;
  }
`;

export default function Reports(props) {
  const [reports, setReports] = useState(props.reports);
  const [errors, setErrors] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [messages, setMessages] = useState('');
  function refreshPage() {
    // useRouter is an alternative
    window.location.reload();
  }
  return (
    <Layout userType={props.userType}>
      <Head>
        <title>Reports</title>
      </Head>
      <h1>Reports</h1>
      <h2>
        {useEffect(() => refreshPage, [refresher])}
        {errors.map((error) => (
          <li key={`err-${error}`}>{error.message}</li>
        ))}
      </h2>
      <h2>{messages}</h2>

      <section css={reportsContainer}>
        <section css={textSectionStyles}>
          <span className="col-10"></span>
          <span className="comment">COMMENT:</span>
          <span className="why">WHY:</span>
          <span className="actions">DELETE:</span>
        </section>
        {reports &&
          reports.map((report) => (
            <ReportInstance
              setErrors={setErrors}
              sessionToken={props.sessionToken}
              rep={report}
              reports={reports}
              setReports={setReports}
              comments={props.comments}
              setMessages={setMessages}
              setRefresher={setRefresher}
              key={`repInst-${report.id}`}
            />
          ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log('gSSP in reports');
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/admin/reports`,
        permanent: true,
      },
    };
  }
  const reportsResponse = await fetch(
    `${process.env.BASE_URL}/api/reports/handle`,
  );
  const reports = await reportsResponse.json();

  const commentsResponse = await fetch(
    `${process.env.BASE_URL}/api/comments/get`,
  );
  const comments = await commentsResponse.json();

  //
  //
  // is admin?
  const { getRoleByToken } = await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP in reports', sessionToken);

  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP reports: ', userType);

  if (!userType) {
    return {
      redirect: {
        destination: '/loginOrRegister',
        permanent: false,
      },
    };
  }

  if (userType.role === 1) {
    return {
      props: {
        userType: 'admin',
        reports: reports,
        comments: comments,
        sessionToken: sessionToken,
      },
    };
  }

  if (userType.role === 2) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
