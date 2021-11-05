import Layout from '../../components/Layout';
import ReportInstance from '../../components/ReportInstance';

export default function Reports() {
  return (
    <Layout>
      <h1>Reports</h1>
      <ReportInstance />
    </Layout>
  );
}

export async function getServerSideProps() {}
