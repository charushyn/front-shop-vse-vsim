'use client';

import { Provider } from 'react-redux';
import { store } from '../../../shared/utils/redux/store';

const ReduxProvider = ({ children } : {children: React.ReactNode}) =>  {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider;