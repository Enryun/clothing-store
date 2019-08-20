import React, { Component } from 'react';
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error.styles.js';

export default class ErrorComponent extends Component {

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasErrored: true}
    }

    componentDidCatch(error, info) {
        console.log(error);
        
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/flHudHE.png'/>
                    <ErrorImageText>Sorry this Page has broken!</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        
        return this.props.children
    }
}
