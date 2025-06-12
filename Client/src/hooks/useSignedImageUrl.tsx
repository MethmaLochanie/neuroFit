import { useState, useEffect } from 'react';
import { getSignedAzureUrl } from '../services/imageService';

const AZURE_BLOB_STORAGE_URL = process.env.REACT_APP_AZURE_BLOB_STORAGE_URL;
if (!AZURE_BLOB_STORAGE_URL) {
  throw new Error('AZURE_BLOB_STORAGE_URL environment variable is not defined');
}

export const useSignedImageUrl = (imageUrl: string) => {
  const [signedUrl, setSignedUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!imageUrl || !imageUrl.startsWith(AZURE_BLOB_STORAGE_URL)) {
        setSignedUrl(imageUrl);
        return;
      }

      try {
        setLoading(true);
        const url = await getSignedAzureUrl(imageUrl);
        setSignedUrl(url);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to get signed URL'));
        setSignedUrl(imageUrl); // Fallback to original URL
      } finally {
        setLoading(false);
      }
    };

    fetchSignedUrl();
  }, [imageUrl]);

  return { signedUrl, error, loading };
}; 