import Layout from '../../components/Layout';
import ReportInstance from '../../components/ReportInstance';

export default function Reports(props) {
  // console.log('props.reports: ', props.reports);
  return (
    <Layout>
      <h1>Reports</h1>
      {props.reports &&
        props.reports.map((report) => (
          <ReportInstance
            rep={report}
            comments={props.comments}
            key={`repInst-${report.id}`}
          />
        ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const reportsResponse = await fetch(
    'http://localhost:3000/api/reports/handle',
  );
  const reports = await reportsResponse.json();
  // console.log('reports in gSSP: ', reports);

  const commentsResponse = await fetch(
    'http://localhost:3000/api/comments/get',
  );
  const comments = await commentsResponse.json();
  return {
    props: {
      reports: reports,
      comments: comments,
    },
  };
}
