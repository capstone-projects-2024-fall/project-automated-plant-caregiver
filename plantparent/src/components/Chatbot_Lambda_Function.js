export const callLambda = async (message, image = null, userId = null) => {
  const API_URL = 'https://ol5xz6ueag.execute-api.us-east-1.amazonaws.com';

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

    console.log('Making request to:', `${API_URL}/Chat`);

    const response = await fetch(`${API_URL}/Chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
};

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