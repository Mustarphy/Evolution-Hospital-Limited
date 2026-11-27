import { isRouteErrorResponse, useRouteError } from 'react-router'
import NotFound from './NotFound'
import { hospital, primaryPhone } from '../data/site'

export default function RouteError() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />

  return (
    <NotFound
      title="Something went wrong"
      description={`This page could not be loaded. Please refresh, or call ${hospital.name} on ${primaryPhone.display}.`}
    />
  )
}
