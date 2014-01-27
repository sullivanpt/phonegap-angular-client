// this placeholder file is replaced by the platform specific JS by the phonegap build

// mock out some cordova features in the web app
function mockCordovaFeatures() {
  window.device = {
    model: 'Browser'
  };
}

// Fire fake deviceready event
// https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent?redirectlocale=en-US&redirectslug=DOM%2Fdocument.createEvent#The_old-fashioned_way
window.setTimeout(function() {
  console.log('Cordova deviceready stubbed.');
  mockCordovaFeatures();
  var event = document.createEvent('Event');
  event.initEvent('deviceready', true, true);
  document.dispatchEvent(event);
}, 4000);
