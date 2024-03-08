class BankAccount {
    constructor(saldo = 0) {
      this.saldo = saldo;
    }
  
    formatRupiah(angka) {
      let formatSaldo = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatSaldo.format(angka);
    }
  
    updateSaldo() {
      return new Promise((resolve) => {
        const saldoElement = document.getElementById("saldo");
        saldoElement.innerText = `Saldo Anda: ${this.formatRupiah(this.saldo)}`;
        setTimeout(() => {
          resolve(`Saldo Anda : ${this.formatRupiah(this.saldo)}`);
        }, 2000);
      });
    }
  
    deposit() {
      return new Promise((resolve, reject) => {
        window.alert("Tunggu Beberapa Saat...\nPermintaan Anda Sedang Diproses...")
        setTimeout(() => {
        let amount = prompt("Masukkan Jumlah Deposit Saldo :");
        amount = parseInt(amount);

        if (!isNaN(amount) && amount > 0) {
          this.saldo += amount;
          window.alert("Tunggu Sebentar...")
          setTimeout(() => {
          this.updateSaldo();
          resolve(window.alert(`Anda Telah Berhasil Melakukan Deposit Saldo Sebesar ${this.formatRupiah(amount)}.`));
          }, 3000);
        } else if (isNaN(amount)) {
          reject(window.alert("Masukkan Jumlah Saldo Berupa Nominal Angka!"));
        } else {
          reject(window.alert("Saldo Yang Diinput Tidak Bisa <= 0"));
        }
      }, 2000);
      });
    }
  
    withdraw() {
      return new Promise((resolve, reject) => {
        window.alert("Tunggu Beberapa Saat...\nPermintaan Anda Sedang Diproses...")
        setTimeout(() => {
        let amount = prompt("Masukkan Jumlah Withdraw Saldo :");
        amount = parseInt(amount);
  
        if (!isNaN(amount) && amount > 0 && amount <= this.saldo) {
          this.saldo -= amount;
          window.alert("Tunggu Sebentar...")
          setTimeout(() => {
          this.updateSaldo();
          resolve(window.alert(`Anda Telah Berhasil Melakukan Penarikan Saldo Sebesar ${this.formatRupiah(amount)}`));
        }, 3000);
        } else if (isNaN(amount)) {
          reject(window.alert("Masukkan Jumlah Saldo Berupa Nominal Angka!"));
        } else if (amount <= 0) {
          reject(window.alert("Saldo Yang Diinput Tidak Bisa <= 0"));
        } else {
          reject(window.alert("Saldo Yang Diinput Tidak Bisa Melebihi Sisa Saldo Anda!"));
        }
    }, 2000);
      });
    }
  }
  
  const account = new BankAccount(0);
  
  const transaksi = () => {
    try {
      account.updateSaldo();
  
      window.alert("Selamat Datang....!!!")
      document.getElementById("depositBtn").addEventListener("click", () => {
        account
          .deposit()
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  
      document.getElementById("withdrawBtn").addEventListener("click", () => {
        account
          .withdraw()
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  transaksi();
  