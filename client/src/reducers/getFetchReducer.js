export const defaultState = {
    isFetching: false,
    error: false,
    value: ''
};

const getFetchReducers = ({request, success, failure}) => {
    const reducer = Object.create(null);

    reducer[request] = (state = defaultState) => ({
        ...state,
        isFetching: true,
        error: false
    });

    reducer[success] = (state = defaultState, action) => ({
        ...state,
        isFetching: false,
        value: action.payload
    });

    reducer[failure] = (state = defaultState, action) => ({
        ...state,
        isFetching: false,
        error: action.payload
    });

    const stateIdentity = (state = defaultState) => state;

    const reducers = new Proxy(reducer, {
        get: (target, type) => target[type] || stateIdentity
    });

    return (state = defaultState, action) => reducers[action.type](state, action);
};

export default getFetchReducers;
