import React, { useEffect } from 'react';
import './GraphQLError.scss';
import { APIError, GraphQLResponseError } from 'graphql-hooks';

interface GraphQLErrorProps {
  error: APIError<GraphQLResponseError>;
}

export function GraphQLError(props: Readonly<GraphQLErrorProps>) {
  useEffect(() => {
    console.error(props.error);
  }, []);

  return <>Networking error</>
}