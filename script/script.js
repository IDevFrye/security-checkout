import {el, setChildren} from 'redom';

const paragraph = () => {
  return el("p.secure", "Secure Checkout");
};

const creditCard = () => {
  return el("div.credit-card", [
    el("span.card__number", "xxxx xxxx xxxx xxxx"),
    el("div.card__personal", [
      el("span.card__name", "YOUR NAME"),
      el("span.card__date", "MM/YY")
    ])
  ]);
};

const cardForm = () => {
  return el("form", {action:"#", class:"form", id:"form"}, [
    el("div.form__input-wrap.form__input-wrap_holder", [
      el("label.form__label.form__holder-label", {for: ""}, "Card Holder"),
      el("input.input.input__holder", {type:"text"})
    ]),
    el("div.form__input-wrap.form__input-wrap_number", [
      el("label.form__label.form__number-label", {for: ""}, "Card Number"),
      el("input.input.input__number", {id: "cardNumber"})
    ]),
    el("div.form__input-wrap.form__input-wrap_date", [
      el("label.form__label.form__date-label", {for: ""}, "Card Expiry"),
      el("input.input.input__date", {type:"text"})
    ]),
    el("div.form__input-wrap.form__input-wrap_cvv", [
      el("label.form__label.form__cvv-label", {for: ""}, "CVV"),
      el("input.input.input__cvv", {type:"text"})
    ]),
    el("button.form__button", "CHECK OUT")
  ])
};

const wrapper = () => {
  return el("div.wrapper", 
    el("div.card",
      [paragraph(), creditCard(), cardForm()]
    )
  )
};

setChildren(document.body, wrapper());
