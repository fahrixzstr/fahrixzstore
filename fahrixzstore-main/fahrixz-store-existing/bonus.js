const copyBtn =
document.getElementById(
  'copyBtn'
);

copyBtn.addEventListener(
  'click',

  () => {

    const code =
    document.getElementById(
      'referralCode'
    );

    navigator.clipboard
    .writeText(code.value);

    alert(
      'Kode referral disalin'
    );

  }

);