function Pembeli(nama, item, pembayaranVia, email, totalHarga, modal) {
  this.nama = nama;
  this.item = item;
  this.pembayaranVia = pembayaranVia;
  this.email = email;
  this.totalHarga = totalHarga;
  this.modal = modal;
  this.pendapatanBersih = totalHarga - modal;
}

let totalPendapatanKotor = 0;
let totalModal = 0;

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah pengiriman form

  // Ambil nilai dari input yang dipilih
  document.getElementById("rincian-pembeli-container").style.display = 'block';
  document.getElementById("pendapatan-container").style.display = 'block';
  const nama = document.getElementById("nama").value.trim(); // Menghilangkan spasi di awal atau akhir
  const pilihItem = document.getElementById("pilih-item");
  const itemText = pilihItem.options[pilihItem.selectedIndex].text;
  const [itemValue, modalValue] = pilihItem.value.split("-").map(Number); // Memisahkan dengan '-' untuk menghasilkan dua array
  const pembayaranVia = document.getElementById("pembayaran-via");
  const pembayaranText =
    pembayaranVia.options[pembayaranVia.selectedIndex].text;
  const email = document.getElementById("email").value.trim(); // Menghilangkan spasi di awal atau akhir

  // Buat objek JavaScript dengan constructor function
  const pembeli = new Pembeli(
    nama,
    itemText,
    pembayaranText,
    email,
    itemValue,
    modalValue
  );

  // Tambahkan data ke tabel rincian pembeli
  const rincianTbody = document.querySelector("#rincian-pembeli tbody");
  const row = rincianTbody.insertRow(); // Menambahkan baris baru ke dalam tabel
  row.innerHTML = `
            <td>${pembeli.nama}</td>
            <td>${pembeli.item}</td>
            <td>${pembeli.pembayaranVia}</td>
            <td>${pembeli.email}</td>
            <td>Rp ${pembeli.totalHarga.toLocaleString('id-ID')}</td> 
        `; // toLocaleString disini berfungsi untuk mengubah int menjadi string dengan menambahkan pemisah seperti '.' atau ','

  // Update total pendapatan kotor dan modal
  totalPendapatanKotor += pembeli.totalHarga;
  totalModal += pembeli.modal;

  // Hitung total pendapatan bersih
  const totalPendapatanBersih = totalPendapatanKotor - totalModal;

  // Tampilkan data pendapatan kotor dan bersih di tabel
  const pendapatanTbody = document.querySelector("#pendapatan tbody");
  pendapatanTbody.innerHTML = `
            <tr>
                <td>Rp${totalPendapatanKotor.toLocaleString('id-ID')}</td>
                <td>Rp${totalModal.toLocaleString('id-ID')}</td>
                <td>Rp ${totalPendapatanBersih.toLocaleString('id-ID')}</td>
            </tr>
        `;

  // Tampilkan tabel rincian dan pendapatan jika belum terlihat
  document.getElementById("rincian-pembeli").style.display = "table";
  document.getElementById("pendapatan").style.display = "table";

  // Reset form setelah submit
  document.getElementById("myForm").reset();
});
