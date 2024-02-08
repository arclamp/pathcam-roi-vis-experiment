console.log('hi');

const h1s = document.getElementsByTagName('h1');
if (h1s.length > 0) {
  const h1 = h1s[0];
  h1.textContent = 'hello, earth';
}
