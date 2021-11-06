import { getReports } from '../../../util/database';

export default async function reportHandler(req, res) {
  const reports = await getReports();
  // console.log('reports in /api/handle: ', reports);

  // const reports = await response.json();
  // console.log('reports in /api/handle: ', reports);

  res.status(200).json(reports);

  // res.status(404).json({ errors: [{ message: 'no reports in DB' }] });
}
