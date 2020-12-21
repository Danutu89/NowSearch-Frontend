import {main as mainStore} from '$stores/index';

function dispatch (action) {
    const action_ = action();
    mainStore.update((prevState) => ({called: action_.name, [action_.name]: {...prevState[action_.name], action: action_}}));
}

function catcher (state) {
    const name = state.called;
    const a_result = state[name].action;
    if (state[name].interceptor) state[name].interceptor(a_result);
    const result = state[name].reducer(a_result);
    state[name].state.update((prevState) => ({...prevState[name], ...result}));
}

export {catcher, dispatch}