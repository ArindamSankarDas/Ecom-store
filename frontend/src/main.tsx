import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(<Route path='/*' element={<App />} />),
	{
		future: {
			v7_fetcherPersist: true,
		},
	}
);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
