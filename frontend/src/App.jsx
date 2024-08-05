import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';

function Layout() {
  return (
    <div className="montserrat-medium">
      <Outlet />
    </div>
  );
}

const appRouting = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
            <HomePage />
        ),
      },
      {
        path: "post/:postId",
        element:(
          <PostPage />
        )
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
