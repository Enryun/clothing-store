import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const WithSpinner = WrappedComponet => {
    const Spinner = ({ isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponet {...otherProps} />
        )
    };
    return Spinner;
}

export default WithSpinner;