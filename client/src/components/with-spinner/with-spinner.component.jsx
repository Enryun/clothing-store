import React from 'react';
import  Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponet => ({ isLoading, ...otherProps}) => {
        return isLoading ? (
            <Spinner />
        ) : (
            <WrappedComponet {...otherProps} />
        )
    };


export default WithSpinner;