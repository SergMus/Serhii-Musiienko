window.onload = function () {
  const cartItems = {};
  const cartSum = {};

  const items = document.getElementsByClassName("product-box__item");

  const btns = document.querySelectorAll(".product-box__btn");
  for (let btn of btns) {
    btn.addEventListener("click", addToCart);
  }

  document
    .getElementById("dishes-select")
    .addEventListener("change", filterByCategory);

  document
    .getElementById("price-select")
    .addEventListener("change", filterByPrice);

  document.querySelector(".btn-check").onclick = function checkout() {
    const modal = document.createElement("div");
    modal.className = "open";
    modal.style.cssText =
      "display: block; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.6); z-index: 1000;";
    const wrapper = document.createElement("div");
    wrapper.style.cssText =
      "border-radius: 5px; background-color: #fefefe; margin: 15% auto; max-width: 500px; padding: 50px 80px; border: 1px solid #888; z-index: 99999;";
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("onsubmit", "alert('Благодарим Вас за покупки!')");
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.required = true;
    name.style.cssText =
      "width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; font-size: 20px";
    name.setAttribute("placeholder", "Имя");
    const email = document.createElement("input");
    email.setAttribute("type", "text");
    email.required = true;
    email.style.cssText =
      "width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; font-size: 20px";
    email.setAttribute("placeholder", "e-mail");
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.style.cssText =
      "padding: 6px 14px; margin-top: 8px; box-sizing: border-box;";
    const text = document.createTextNode("Отправить");
    button.appendChild(text);
    form.append(name, email, button);
    wrapper.append(form);
    modal.append(wrapper);
    document.body.appendChild(modal);
    modal.onclick = (e) => {
      if (e.target.classList.contains("open")) {
        modal.style.display = "none";
      }
    };
  };

  function addToCart(e) {
    let val = 1;
    if (
      cartItems.hasOwnProperty(
        e.target.parentElement.parentElement.children[0].innerText
      )
    ) {
      cartItems[
        e.target.parentElement.parentElement.children[0].innerText
      ] += 1;
      cartSum[e.target.parentElement.parentElement.children[0].innerText] *= 2;
    } else {
      let name = e.target.parentElement.parentElement.children[0].innerText;
      cartItems[name] = val;
      cartSum[name] = +e.target.parentElement.parentElement.dataset.price;
    }

    showCart();
  }

  function showCart() {
    let quantity = 0;
    let sum = 0;

    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      quantity = Object.values(cartItems).reduce((prev, curr) => prev + curr);
    }
    for (let i = 0; i < Object.keys(cartSum).length; i++) {
      sum = Object.values(cartSum).reduce((prev, curr) => prev + curr);
    }

    document.getElementById("quantity").innerHTML = quantity;
    document.getElementById("sum").innerHTML = sum;
  }

  function filterCategoryHelper(iter, elem, val, type, arr) {
    return () => {
      if (elem[iter].selected && elem[iter].value === val) {
        arr.map((item) => {
          return item.dataset.category != type
            ? (item.style.display = "none")
            : (item.style.display = "block");
        });
      }
    };
  }

  function filterPriceHelper(iter, elem, val, type, arr) {
    return () => {
      if (elem[iter].selected && elem[iter].value === val) {
        arr.map((item) => {
          return +item.dataset.price < type
            ? (item.style.display = "block")
            : (item.style.display = "none");
        });
      }
    };
  }

  function filterByCategory() {
    let select = document
      .getElementById("dishes-select")
      .getElementsByTagName("option");

    for (let i = 0; i < select.length; i++) {
      if (select[i].selected && select[i].value === "0") {
        [...items].map((item) => (item.style.display = "block"));
      }
      filterCategoryHelper(i, select, "1", "breakfast", [...items])();
      filterCategoryHelper(i, select, "2", "starters", [...items])();
      filterCategoryHelper(i, select, "3", "sides", [...items])();
    }
  }

  function filterByPrice() {
    let select = document
      .getElementById("price-select")
      .getElementsByTagName("option");

    for (let i = 0; i < select.length; i++) {
      if (select[i].selected && select[i].value === "0") {
        [...items].map((item) => (item.style.display = "block"));
      }
      filterPriceHelper(i, select, "30", 30, [...items])();
      filterPriceHelper(i, select, "50", 50, [...items])();
      filterPriceHelper(i, select, "100", 100, [...items])();
      filterPriceHelper(i, select, "150", 150, [...items])();
    }
  }
};
