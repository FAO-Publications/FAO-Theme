!function(){"use strict";"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.getRegistrations().then((function(n){for(var t of n)t.unregister().then((function(){return self.clients.matchAll()})).then((function(n){n.forEach((function(n){n.url&&"navigate"in n&&n.navigate(n.url)}))}))}))}))}();