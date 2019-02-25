define([], function () {
   if('serviceWorker' in navigator){
       navigator.serviceWorker.register('sw.js')
           .then(function (swRegistration){

               var serviceWorker;

            if(swRegistration.installing){

                console.log('Resolved at installing: ', swRegistration);
                serviceWorker = swRegistration.installing;
            } else if(swRegistration.waiting){
                console.log('Resolved at waiting: ', swRegistration);
                serviceWorker = swRegistration.waiting;
            }else if(swRegistration.active){
                console.log('Resolved at activated: ', swRegistration);
                serviceWorker = swRegistration.active;
            }

            if(serviceWorker){
                serviceWorker.addEventListener('statechange', function (event) {
                    console.log(event.target.state)
                })
            }

            swRegistration.addEventListener('updatefound', function (event) {
                swRegistration.installing.addEventListener('statechange', function (event) {
                    console.log('New service worker state: ', event.target.state);
                });
                console.log('Nieuwe service worker gevonden!', swRegistration);
            });

            setInterval(function () {
                swRegistration.update()

            },5000)

           }).catch(function (error) {
               console.log('er is een error: ', error);
       });

       navigator.serviceWorker.addEventListener('controllerchange', function (event) {
           console.log('Controller Changed...');
       })

   }
});