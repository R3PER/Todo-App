/* eslint-disable no-restricted-globals */
/* global clients */

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      // Używamy domyślnych ikon przeglądarki
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('http://localhost:3000')
    );
  });