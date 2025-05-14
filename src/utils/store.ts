export const getInitialState = (state = {}) => ({
  ...state,
  request: false,
  success: false,
  failed: false,
});

export const getRequestingState = (state = {}) => ({
  ...state,
  request: true,
  success: false,
  failed: false,
});

export const getSuccessState = (state = {}) => ({
  ...state,
  request: false,
  success: true,
  failed: false,
});

export const getFailedState = (state = {}) => ({
  ...state,
  request: false,
  success: false,
  failed: true,
});

export const isRequested = (state = { request: false }) => !!state.request;
export const isSuccess = (state = { success: false }) => !!state.success;
export const isFailed = (state = { failed: false }) => !!state.failed;

export const getData = (state = { data: {} }, defaultValue = {}) =>
  state.data || defaultValue;
export const hasData = (state = { data: {} }) => !!state.data;
export const shouldLoad = (state = { isLoaded: false, isLoading: false }) =>
  !state.isLoaded && !state.isLoading;
