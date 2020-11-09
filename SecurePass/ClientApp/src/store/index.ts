export interface ApplicationState {

}

export const reducers = {

};

export type AppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => ApplicationState) => void;
