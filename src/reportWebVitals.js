const reportWebVitals = (callbacks) => {
  if (callbacks && typeof callbacks === 'object') {
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        if (callbacks.getCLS) getCLS(callbacks.getCLS);
        if (callbacks.getFID) getFID(callbacks.getFID);
        if (callbacks.getFCP) getFCP(callbacks.getFCP);
        if (callbacks.getLCP) getLCP(callbacks.getLCP);
        if (callbacks.getTTFB) getTTFB(callbacks.getTTFB);

        console.log('Web vitals have been successfully reported.');
      })
      .catch((error) => {
        console.error('Error loading web vitals:', error);
      });
  } else {
    console.warn('No valid callback functions provided for reporting web vitals.');
  }
};

export default reportWebVitals;
