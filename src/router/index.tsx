'use client';

import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

import { RouteType } from './types';

export const AppRouter = () => {
  const buildRoute = (route: RouteType): ReactNode | null => {
    if (route === undefined || null) return null;
    const { id, children, path, index: idx, element } = route;

    return idx ? (
      <Route index key={id} element={element} />
    ) : (
      <Route path={path} key={id}>
        {children ? (
          children.length && children.map((child) => buildRoute(child))
        ) : (
          <></>
        )}
      </Route>
    );
  };

  return (
    <Routes>{routes().map((route: RouteType) => buildRoute(route))}</Routes>
  );
};
