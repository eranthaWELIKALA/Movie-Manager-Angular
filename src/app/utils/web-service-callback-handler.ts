export interface WebServiceCallbackHandler {    
    onSuccess(callback, data: any);
    onFail(errorCallback, error: any);
}
