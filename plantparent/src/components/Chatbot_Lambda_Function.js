export const callLambda = async (message, image = null, userId = null) => {
  try {
    const body = {
      message,
      userId
    };

    if (image) {
      if (typeof image === 'string' && image.startsWith('http')) {
        body.imageUrl = image;
      } else if (image instanceof File) {
        const base64String = await convertToBase64(image);
        body.imageBase64 = base64String;
      }
    }

    const response = await fetch(`${process.env.REACT_APP_API_GATEWAY_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Lambda:', error);
    throw error;
  }
};

// Helper function to convert File to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};