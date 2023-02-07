import { useState } from 'react';
import images from '~/assets/images';
function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return <img src={fallback || src} className={className} alt={alt} {...props} onError={handleError} />;
}

export default Image;
