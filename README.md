Project ini nantinya akan digunakan untuk Project KoinWarga di

> [https://github.com/koinwarga/KoinWargaAndroid](https://github.com/koinwarga/KoinWargaAndroid)

Project ini digunakan untuk eksperimen enkripsi end to end menggunakan public key dan secret key dari stellar account. KeyPair stellar menggunakan enkripsi Ed25519 sehingga perlu dikonversi menjadi Curve25519. Dengan Curve25519 akan dihasilkan shared key yang akan digunakan untuk enkripsi file. Sehingga yang bisa membuka file tersebut hanya KeyPair yang menghasilkan shared key tersebut.
