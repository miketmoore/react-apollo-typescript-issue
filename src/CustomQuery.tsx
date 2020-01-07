import React from "react";
import { Query, QueryProps, OperationVariables } from "react-apollo";

interface CustomQueryProps<TData = any, TVariables = OperationVariables>
  extends QueryProps<TData, TVariables> {}

function doCustomThing(a) {
  if (a.data && a.data.testQuery) {
    a.data.testQuery.extra = "something extra for ya";
  }
  return a;
}

export function CustomQuery<TData = any, TVariables = OperationVariables>({
  children,
  ...props
}: CustomQueryProps<TData, TVariables>) {
  return (
    <Query<TData, TVariables>
      {...props}
      children={queryProps => {
        return children(doCustomThing(queryProps));
      }}
    />
  );
}
