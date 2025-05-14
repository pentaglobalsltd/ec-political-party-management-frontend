import axios from 'axios';

export const isRequestCancelled = (error: unknown) => axios.isCancel(error);
