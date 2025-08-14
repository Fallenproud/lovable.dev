// This file is replaced by PlaygroundPage.tsx - redirect to new playground
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Playground() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new playground page
    navigate('/app/playground', { replace: true });
  }, [navigate]);

  return null;
}
