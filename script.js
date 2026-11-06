// DATA PESANAN
let orders = [];
let total = 0;

// FORMAT RUPIAH
function rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

// SPLASH SCREEN KE ONBOARDING
function showOnboarding() {
  document.getElementById("splashScreen").hidden = true;
  document.getElementById("onboardingScreen").hidden = false;
}

// ONBOARDING KE DASHBOARD
function enterApp() {
  document.getElementById("onboardingScreen").hidden = true;
  document.getElementById("mainApp").hidden = false;
  showPage("home");
}

// PINDAH HALAMAN
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(function(page) {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// TAMBAH PESANAN
function addOrder(nama, harga) {
  orders.push({
    nama: nama,
    harga: harga
  });

  total += harga;
  updateOrder();

  alert(nama + " berhasil ditambahkan!");
}

// PERBARUI DAFTAR PESANAN
function updateOrder() {
  const orderList = document.getElementById("orderList");
  const totalElement = document.getElementById("total");

  if (orders.length === 0) {
    orderList.textContent = "Belum ada pesanan.";
  } else {
    orderList.innerHTML = orders.map(function(order, index) {
      return `
        <p>
          ${index + 1}. ${order.nama}
          - ${rupiah(order.harga)}
        </p>
      `;
    }).join("");
  }

  totalElement.textContent = rupiah(total);
}

// CHECKOUT
function checkout() {
  if (orders.length === 0) {
    alert("Belum ada pesanan!");
    return;
  }

  alert(
    "Pesanan berhasil dicatat!\nTotal pembayaran: " +
    rupiah(total)
  );

  orders = [];
  total = 0;
  updateOrder();
}

// SELAMATKAN BAHAN
function saveIngredients() {
  const checkedItems = document.querySelectorAll(
    '#save input[type="checkbox"]:checked'
  );

  if (checkedItems.length === 0) {
    alert("Pilih bahan yang sudah digunakan terlebih dahulu.");
    return;
  }

  const names = Array.from(checkedItems).map(function(item) {
    return item.value;
  });

  document.getElementById("savedHistory").textContent =
    "Berhasil dicatat: " + names.join(", ");

  checkedItems.forEach(function(item) {
    item.checked = false;
  });

  alert("Catatan penggunaan bahan berhasil disimpan!");
}

// SIMULASI ENERGI SURYA
function calculateEnergy() {
  const bill = Number(document.getElementById("bill").value);
  const solar = Number(document.getElementById("solar").value);

  if (!Number.isFinite(bill) || bill <= 0) {
    alert("Masukkan tagihan listrik yang valid.");
    return;
  }

  const saving = bill * solar / 100;
  const newBill = bill - saving;

  document.getElementById("saving").textContent =
    rupiah(saving) + " / bulan";

  document.getElementById("newBill").textContent =
    "Perkiraan tagihan baru: " + rupiah(newBill);
}

// HITUNG KULAKAN
function updateBulkTotal() {
  const kg = Number(document.getElementById("kg").value);
  const totalBulk = kg * 12000;

  document.getElementById("bulkTotal").textContent =
    "Total: " + rupiah(totalBulk);
}

// GABUNG KULAKAN
function joinBulk() {
  const kg = Number(document.getElementById("kg").value);

  if (!Number.isInteger(kg) || kg < 1) {
    alert("Masukkan jumlah kilogram minimal 1 kg.");
    return;
  }

  const totalBulk = kg * 12000;

  alert(
    "Pesanan kulakan berhasil dicatat!\n" +
    "Jumlah: " + kg + " kg\n" +
    "Total: " + rupiah(totalBulk)
  );
}

// HITUNG TOTAL KULAKAN SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", function() {
  updateBulkTotal();
  updateOrder();
});