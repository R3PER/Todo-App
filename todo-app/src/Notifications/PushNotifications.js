import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function PushNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Service Worker registered');
        })
        .catch(function(error) {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const subscribeUser = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BPwCKes_CQAc043ejcucre3ci9XiPBpNo70x-MTLfIp9Ml68Yuj0ifhj6D4ZUNIIYXvyaXAzAiWIEGULVKQfsOk'
      });

      // Send the subscription to your server
      await fetch('/api/save-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });

      setIsSubscribed(true);
    }
  };

  return (
    <Button onClick={subscribeUser} disabled={isSubscribed}>
      {isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
    </Button>
  );
}

export default PushNotifications;