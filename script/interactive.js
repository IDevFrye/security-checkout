document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector(".form");
  const type = document.querySelector(".typeCard");
  
  const name = document.querySelector(".card__name");
  const cardnumber = document.querySelector(".card__number");
  const expirationdate = document.querySelector(".card__date");

  const inputName = document.querySelector(".input__holder");
  const inputNumber = document.querySelector(".input__number");
  const inputExpire = document.querySelector(".input__date");
  const inputSecurity = document.querySelector(".input__cvv");

  const defaultCardNumber = "xxxx xxxx xxxx xxxx";
  const defaultCVV = "___";
  const defaultExpire = "MM/YY";
  const defaultName = "YOUR NAME";

  const mask = [
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardType: "american express",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6(?:011|5[0-9]{2})\d{0,12}/,
      cardType: "discover",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0[0-5]|[68][0-9])\d{0,11}/,
      cardType: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^5[1-5]\d{0,14}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 000000 00000",
      regex: /^(?:2131|1800|35\d{3})\d{0,11}/,
      cardType: "jcb15",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:2131|1800|35\d{2})\d{0,11}/,
      cardType: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{0,13}/,
      cardType: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(62|88)\d{0,16}/,
      cardType: "unionpay",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^2(?:2[0-9]{1}|4[0-9]{1}|5[0-9]{1}|6[0-9]{1})\d{0,14}/,
      cardType: "МИР",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "Unknown",
    },
  ];

  IMask(inputNumber, {
    mask: mask, 
    dispatch: function (appended, dynamicMasked) {
      let number = (dynamicMasked.value + appended).replace(/\D/g, "");

      let matchedMask = dynamicMasked.compiledMasks.find(m => m.regex?.test(number)) || 
                        dynamicMasked.compiledMasks.find(m => m.cardType === "Unknown");

      return matchedMask; 
    }
  });



  IMask(inputExpire, {
    mask: "00/00",
    blocks: {
      MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
      YY: { mask: IMask.MaskedRange, from: 25, to: 99 }
    }
  });

  IMask(inputSecurity, { mask: "000" });

  inputName.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    let words = this.value.split(/\s+/);
    if (words.length > 2) {
      this.value = words.slice(0, 2).join(" ");
    }

    name.textContent = this.value || defaultName;
  });

  let matchedMask = '';
  inputNumber.addEventListener("input", function () {
    let value = inputNumber.value.replace(/\D/g, "");
    
    matchedMask = mask.find(m => m.regex?.test(value)) || mask[mask.length - 1];
    console.log('matchedMask: ', matchedMask);

    
    if (matchedMask.cardType === "Unknown") {
      let paddedValue = value.padEnd(defaultCardNumber.replace(/\D/g, "").length, "x");
      cardnumber.textContent = paddedValue.replace(/(.{4})(?=.)/g, "$1 ");
    } else {
      cardnumber.textContent = inputNumber.value || defaultCardNumber;
    }
    console.log('value: ', value);
    if(value === '') {
      cardnumber.textContent = defaultCardNumber;
    }
  });

  inputExpire.addEventListener("input", () => {
    expirationdate.textContent = inputExpire.value || defaultExpire;
  });

  inputSecurity.addEventListener("mouseenter", () => {
    if (!inputSecurity.value) {
      inputSecurity.setAttribute("placeholder", defaultCVV);
    }
  });

  inputExpire.addEventListener("mouseenter", () => {
    if (!inputExpire.value) {
      inputExpire.setAttribute("placeholder", defaultExpire);
    }
  });

  inputName.addEventListener("mouseenter", () => {
    if (!inputName.value) {
      inputName.setAttribute("placeholder", defaultName);
    }
  });

  inputNumber.addEventListener("mouseenter", () => {
    if (!inputNumber.value) {
      inputNumber.setAttribute("placeholder", defaultCardNumber);
    }
  });

  inputSecurity.addEventListener("mouseleave", () => {
    inputSecurity.removeAttribute("placeholder");
  });

  inputExpire.addEventListener("mouseleave", () => {
    inputExpire.removeAttribute("placeholder");
  });

  inputName.addEventListener("mouseleave", () => {
    inputName.removeAttribute("placeholder");
  });

  inputNumber.addEventListener("mouseleave", () => {
    inputNumber.removeAttribute("placeholder");
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('matchedMask: ', matchedMask);
    type.textContent = matchedMask.cardType;
    
    console.log('matchedMask.cardType: ', matchedMask.cardType);
  });
});
