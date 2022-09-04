import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "./slices/user.slice";
import loadingReducer from "./slices/loading.slice";
import collectionReducer from "./slices/collection.slice";

import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  collection: collectionReducer,
});

export const store = configureStore({
  preloadedState: {
    // router: initialRouterState(asPath),
  },
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false })
      // .concat(routerMiddleware)
      .concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
