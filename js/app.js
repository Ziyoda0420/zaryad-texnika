const PRODUCTS = [
  {
    id: "p1",
    name: "iPhone 16 Pro 256 GB",
    cat: "smartfon",
    price: 18990000,
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",
    desc: "Titanium korpus, A18 Pro, 48 MP kamera. Rasmiy kafolat 12 oy.",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S25",
    cat: "smartfon",
    price: 12450000,
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
    desc: "Dynamic AMOLED, 120 Hz, 5000 mAh. Toshkent omborida.",
  },
  {
    id: "p3",
    name: "Xiaomi 14 Ultra",
    cat: "smartfon",
    price: 9890000,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    desc: "Leica optika, IP68, tezkor zaryad 90W.",
  },
  {
    id: "p4",
    name: "MacBook Air 13\" M3",
    cat: "noutbuk",
    price: 16490000,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    desc: "18 soat batareya, 16 GB RAM, 512 GB SSD.",
  },
  {
    id: "p5",
    name: "ASUS ROG Zephyrus",
    cat: "noutbuk",
    price: 21990000,
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
    desc: "Ryzen 9, RTX 4070, 240 Hz ekran — o‘yin va montaj.",
  },
  {
    id: "p6",
    name: "Lenovo ThinkPad X1",
    cat: "noutbuk",
    price: 18750000,
    img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    desc: "Biznes klass, mil-spec mustahkamlik, 14\" OLED.",
  },
  {
    id: "p7",
    name: "Sony WH-1000XM5",
    cat: "audio",
    price: 4290000,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    desc: "Shovqinni yutish, 30 soat musiqa, LDAC.",
  },
  {
    id: "p8",
    name: "AirPods Pro 2",
    cat: "audio",
    price: 2890000,
    img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80",
    desc: "USB-C, Adaptive Audio, MagSafe quti.",
  },
  {
    id: "p9",
    name: "Samsung OLED 55\"",
    cat: "tv",
    price: 13290000,
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
    desc: "4K 120 Hz, Tizen, Game Mode. Uyga o‘rnatib beramiz.",
  },
  {
    id: "p10",
    name: "LG C4 OLED 65\"",
    cat: "tv",
    price: 18990000,
    img: "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80",
    desc: "webOS, Dolby Vision, α9 protsessor.",
  },
  {
    id: "p11",
    name: "PlayStation 5 Slim",
    cat: "oyun",
    price: 7590000,
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80",
    desc: "1 TB SSD, DualSense pult bilan.",
  },
  {
    id: "p12",
    name: "Xbox Series X",
    cat: "oyun",
    price: 6990000,
    img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=900&q=80",
    desc: "4K 120 FPS, Game Pass tayyor.",
  },
];

const CATS = [
  { id: "all", label: "Hammasi" },
  { id: "smartfon", label: "Smartfonlar" },
  { id: "noutbuk", label: "Noutbuklar" },
  { id: "audio", label: "Audio" },
  { id: "tv", label: "Televizorlar" },
  { id: "oyun", label: "O‘yin" },
];

const money = (n) =>
  new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

const $ = (id) => document.getElementById(id);

let filter = "all";
let query = "";
let cart = JSON.parse(localStorage.getItem("zaryad-cart") || "[]");

function saveCart() {
  localStorage.setItem("zaryad-cart", JSON.stringify(cart));
}

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-on"), 2200);
}

function visibleProducts() {
  return PRODUCTS.filter((p) => {
    const catOk = filter === "all" || p.cat === filter;
    const q = query.trim().toLowerCase();
    const qOk = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return catOk && qOk;
  });
}

function renderFilters() {
  $("filters").innerHTML = CATS.map(
    (c) =>
      `<button type="button" class="filter-btn${c.id === filter ? " is-active" : ""}" data-cat="${c.id}">${c.label}</button>`
  ).join("");
}

function renderGrid() {
  const list = visibleProducts();
  const grid = $("productGrid");
  if (!list.length) {
    grid.innerHTML = `<p class="empty">Hech narsa topilmadi.</p>`;
    return;
  }
  grid.innerHTML = list
    .map(
      (p) => `
      <article class="card">
        <div class="card-img">
          <img src="${p.img}" alt="${p.name}" />
        </div>
        <div class="card-body">
          <span class="card-cat">${CATS.find((c) => c.id === p.cat)?.label || ""}</span>
          <h3>${p.name}</h3>
          <p class="price">${money(p.price)}</p>
          <div class="card-actions">
            <button class="btn btn-ghost" type="button" data-view="${p.id}">Batafsil</button>
            <button class="btn btn-primary" type="button" data-add="${p.id}">Savatga</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function cartSum() {
  return cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  $("cartCount").textContent = cartCount();
  $("cartTotal").textContent = money(cartSum());
  const box = $("cartItems");
  if (!cart.length) {
    box.innerHTML = `<p class="empty">Savat bo‘sh.</p>`;
    return;
  }
  box.innerHTML = cart
    .map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      if (!p) return "";
      return `
        <div class="cart-row">
          <img src="${p.img}" alt="" />
          <div>
            <strong>${p.name}</strong>
            <div class="qty">
              <button type="button" data-dec="${p.id}">−</button>
              <span>${i.qty}</span>
              <button type="button" data-inc="${p.id}">+</button>
            </div>
          </div>
          <div>${money(p.price * i.qty)}</div>
        </div>`;
    })
    .join("");
}

function addToCart(id) {
  const row = cart.find((i) => i.id === id);
  if (row) row.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  toast("Savatga qo‘shildi");
}

function openCart(open) {
  $("cartDrawer").classList.toggle("is-open", open);
  $("cartDrawer").setAttribute("aria-hidden", String(!open));
  $("overlay").hidden = !open;
}

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  $("modalBody").innerHTML = `
    <div class="modal-layout">
      <img src="${p.img}" alt="${p.name}" />
      <div>
        <p class="card-cat">${CATS.find((c) => c.id === p.cat)?.label || ""}</p>
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
        <p class="price">${money(p.price)}</p>
        <button class="btn btn-primary" type="button" data-add="${p.id}">Savatga qo‘shish</button>
      </div>
    </div>`;
  $("productModal").showModal();
}

renderFilters();
renderGrid();
renderCart();

$("filters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cat]");
  if (!btn) return;
  filter = btn.dataset.cat;
  renderFilters();
  renderGrid();
});

$("productGrid").addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const view = e.target.closest("[data-view]");
  if (add) addToCart(add.dataset.add);
  if (view) openProduct(view.dataset.view);
});

$("modalBody").addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) addToCart(add.dataset.add);
});

$("searchToggle").addEventListener("click", () => {
  const bar = $("searchBar");
  bar.hidden = !bar.hidden;
  if (!bar.hidden) $("searchInput").focus();
});

$("searchInput").addEventListener("input", (e) => {
  query = e.target.value;
  renderGrid();
});

$("cartToggle").addEventListener("click", () => openCart(true));
$("cartClose").addEventListener("click", () => openCart(false));
$("overlay").addEventListener("click", () => openCart(false));

$("cartItems").addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc) {
    const row = cart.find((i) => i.id === inc.dataset.inc);
    if (row) row.qty += 1;
  }
  if (dec) {
    const id = dec.dataset.dec;
    const row = cart.find((i) => i.id === id);
    if (!row) return;
    row.qty -= 1;
    if (row.qty <= 0) cart = cart.filter((i) => i.id !== id);
  }
  saveCart();
  renderCart();
});

$("modalClose").addEventListener("click", () => $("productModal").close());
$("checkoutClose").addEventListener("click", () => $("checkoutModal").close());

$("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    toast("Savat bo‘sh");
    return;
  }
  openCart(false);
  $("checkoutModal").showModal();
});

$("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  cart = [];
  saveCart();
  renderCart();
  $("checkoutModal").close();
  e.target.reset();
  toast("Buyurtma qabul qilindi. Tez orada qo‘ng‘iroq qilamiz.");
});

$("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Xabaringiz yuborildi");
});
