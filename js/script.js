const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearOldQR();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  if (url === '') {
    alert('enter a valid url');
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;
        downloadButton(saveUrl);
      }, 50);
    }, 1000);
  }

  console.log(url, size);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

const clearOldQR = () => {
  qr.innerHTML = '';
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) downloadBtn.remove();
};

const downloadButton = (imgUrl) => {
  const link = document.createElement('a');
  link.id = 'download-btn';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = imgUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};

form.addEventListener('submit', onGenerateSubmit);
