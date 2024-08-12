import { HomePage } from '../pages/Backup_marketplace';
import { Layout } from '../layout/Layout';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
];
