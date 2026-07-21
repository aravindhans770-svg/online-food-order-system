const MENU = [
  { id:'burger',    name:'Burger',    price:120, icon:'🍔' },
  { id:'pizza',     name:'Pizza',     price:250, icon:'🍕' },
  { id:'sandwich',  name:'Sandwich',  price:90,  icon:'🥪' },
  { id:'fries',     name:'Fries',     price:80,  icon:'🍟' },
  { id:'juice',     name:'Juice',     price:60,  icon:'🥤' },
];

const menuGrid = document.getElementById('menuGrid');

MENU.forEach(item => {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.id = 'card-' + item.id;
  card.innerHTML = `
    <div class="item-top">
      <div class="item-icon">${item.icon}</div>
    </div>
    <div class="item-name">${item.name}</div>
    <div class="item-price">₹${item.price} <span style="color:var(--ink-soft); font-weight:400;">/ item</span></div>
    <div class="item-controls">
      <label class="check-wrap">
        <input type="checkbox" id="chk-${item.id}" data-id="${item.id}">
        Add
      </label>
      <div class="qty-stepper">
        <button type="button" data-action="dec" data-id="${item.id}">−</button>
        <input type="text" id="qty-${item.id}" value="1" readonly>
        <button type="button" data-action="inc" data-id="${item.id}">+</button>
      </div>
    </div>
  `;
  menuGrid.appendChild(card);
});

// ---------- Live cart rendering ----------
const cartEmpty = document.getElementById('cartEmpty');
const cartLines = document.getElementById('cartLines');
const cartRule = document.getElementById('cartRule');
const cartTotalRow = document.getElementById('cartTotalRow');
const cartTotal = document.getElementById('cartTotal');

function renderCart(){
  const selected = MENU.filter(item => document.getElementById('chk-' + item.id).checked);
  cartLines.innerHTML = '';

  if (selected.length === 0){
    cartEmpty.style.display = 'block';
    cartRule.style.display = 'none';
    cartTotalRow.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartRule.style.display = 'block';
  cartTotalRow.style.display = 'flex';

  let total = 0;
  selected.forEach(item => {
    const qty = parseInt(document.getElementById('qty-' + item.id).value, 10) || 1;
    const subtotal = qty * item.price;
    total += subtotal;
    const line = document.createElement('div');
    line.className = 'cart-line';
    line.innerHTML = `<span>${item.name} x${qty} = ₹${subtotal}</span>
      <button type="button" class="cart-remove" data-id="${item.id}" title="Remove">✕</button>`;
    cartLines.appendChild(line);
  });

  cartTotal.textContent = '₹' + total;
}

// checkbox + qty behaviour
MENU.forEach(item => {
  const chk = document.getElementById('chk-' + item.id);
  const card = document.getElementById('card-' + item.id);
  chk.addEventListener('change', () => {
    card.classList.toggle('checked', chk.checked);
    renderCart();
  });
});

menuGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = btn.dataset.id;
  const qtyInput = document.getElementById('qty-' + id);
  let val = parseInt(qtyInput.value, 10) || 1;
  if (btn.dataset.action === 'inc') val = Math.min(val + 1, 20);
  if (btn.dataset.action === 'dec') val = Math.max(val - 1, 1);
  qtyInput.value = val;
  renderCart();
});

// remove item directly from the cart
cartLines.addEventListener('click', (e) => {
  const btn = e.target.closest('.cart-remove');
  if (!btn) return;
  const id = btn.dataset.id;
  document.getElementById('chk-' + id).checked = false;
  document.getElementById('card-' + id).classList.remove('checked');
  document.getElementById('qty-' + id).value = 1;
  renderCart();
});

// Validation helpers
function setError(id, msg){
  document.getElementById('err-' + id).textContent = msg;
}

function validate(){
  let ok = true;
  const name = document.getElementById('custName').value.trim();
  const mobile = document.getElementById('custMobile').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  setError('name',''); setError('mobile',''); setError('address',''); setError('items','');

  if (!name) { setError('name', 'Please enter your name.'); ok = false; }
  else if (!/^[A-Za-z ]{2,}$/.test(name)) { setError('name', 'Name should only contain letters.'); ok = false; }

  if (!mobile) { setError('mobile', 'Please enter your mobile number.'); ok = false; }
  else if (!/^[6-9]\d{9}$/.test(mobile)) { setError('mobile', 'Enter a valid 10-digit mobile number.'); ok = false; }

  if (!address) { setError('address', 'Please enter your delivery address.'); ok = false; }

  const selected = MENU.filter(item => document.getElementById('chk-' + item.id).checked);
  if (selected.length === 0) { setError('items', 'Please select at least one item.'); ok = false; }

  return { ok, name, mobile, address, selected };
}

document.getElementById('placeOrderBtn').addEventListener('click', () => {
  const { ok, name, mobile, address, selected } = validate();
  if (!ok) return;

  let grandTotal = 0;
  const itemsHtml = selected.map(item => {
    const qty = parseInt(document.getElementById('qty-' + item.id).value, 10) || 1;
    const subtotal = qty * item.price;
    grandTotal += subtotal;
    return `<div class="line-item"><span>${item.name} x${qty}</span><span>₹${subtotal}</span></div>`;
  }).join('');

  document.getElementById('ticketName').textContent = name;
  document.getElementById('ticketMobile').textContent = mobile;
  document.getElementById('ticketAddress').textContent = address;
  document.getElementById('ticketItems').innerHTML = itemsHtml;
  document.getElementById('ticketGrand').textContent = '₹' + grandTotal;

  const summarySection = document.getElementById('summarySection');
  summarySection.style.display = 'block';

  // ---- Populate Bill / Invoice ----
  const billBody = document.getElementById('billTableBody');
  billBody.innerHTML = '';
  let billSubtotal = 0;
  selected.forEach(item => {
    const qty = parseInt(document.getElementById('qty-' + item.id).value, 10) || 1;
    const amount = qty * item.price;
    billSubtotal += amount;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.name}</td><td>₹${item.price}</td><td>${qty}</td><td>₹${amount}</td>`;
    billBody.appendChild(row);
  });
  const gst = Math.round(billSubtotal * 0.05);
  const payable = billSubtotal + gst;

  document.getElementById('billName').textContent = name;
  document.getElementById('billInvoiceNo').textContent = '#SE-' + Date.now().toString().slice(-6);
  document.getElementById('billDate').textContent = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  document.getElementById('billSubtotal').textContent = '₹' + billSubtotal;
  document.getElementById('billTax').textContent = '₹' + gst;
  document.getElementById('billPayable').textContent = '₹' + payable;
  document.getElementById('billSection').style.display = 'block';

  summarySection.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('printBillBtn').addEventListener('click', () => {
  window.print();
});

document.getElementById('orderAgainBtn').addEventListener('click', () => {
  document.getElementById('summarySection').style.display = 'none';
  document.getElementById('billSection').style.display = 'none';
  document.getElementById('custName').value = '';
  document.getElementById('custMobile').value = '';
  document.getElementById('custAddress').value = '';
  MENU.forEach(item => {
    document.getElementById('chk-' + item.id).checked = false;
    document.getElementById('card-' + item.id).classList.remove('checked');
    document.getElementById('qty-' + item.id).value = 1;
  });
  renderCart();
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
});
