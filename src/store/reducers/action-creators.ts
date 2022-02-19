import * as AuthActionCreators from './auth/action-creators';
import * as TaskActionCreators from './task/action-creators';

export const allActionCreators = {
    ...AuthActionCreators,
    ...TaskActionCreators
}
