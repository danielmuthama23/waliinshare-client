export const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
  };