import RNMessageChannel from 'react-native-webview-messaging';

// RNMessageChannel.on('text', text => {
//   if (text === 'ship') {
//     document.getElementById('ship').style.display = 'none';
//   }
// });
const messagesContainer = document.querySelector('p');
RNMessageChannel.on('text', text => {
  messagesContainer.innerHTML = `Received text from RN: ${text}`;
});
