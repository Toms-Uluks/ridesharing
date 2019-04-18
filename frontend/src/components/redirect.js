import React from 'react';

const renderRedirect = (props) => {
    if (props.aprove) {
        return <Redirect to={'/'+props.href} />
    }
}

export default renderRedirect;