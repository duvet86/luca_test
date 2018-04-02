import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  DATASERVICES_REQUEST,
  QUERY_DESCRIBE_REQUEST,
  queryConfigError,
  dataServicesSuccess,
  queryDescribeSuccess
} from "workbench/query/actions";
import {
  getDataServicesObs,
  getDataServiceDescriptionObs
} from "workbench/query/api";

export const dataServicesEpic = action$ =>
  action$.pipe(
    ofType(DATASERVICES_REQUEST),
    mergeMap(({ tenantId, sessionId, queryGraphId, elementId }) =>
      getDataServicesObs(tenantId, sessionId, queryGraphId, elementId).pipe(
        map(dataServices => dataServicesSuccess(dataServices)),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const serviceDescriptionEpic = (action$, store) =>
  action$.pipe(
    ofType(QUERY_DESCRIBE_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: { session: { TenantId, SessionId, QueryGraphId } },
        queryConfigReducer: { elementId }
      } = store.getState();

      return getDataServiceDescriptionObs(
        TenantId,
        SessionId,
        QueryGraphId,
        elementId
      ).pipe(
        map(serviceDescription =>
          queryDescribeSuccess(serviceDescription, elementId)
        ),
        catchError(error => handleException(error, queryConfigError()))
      );
    })
  );