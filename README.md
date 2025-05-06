<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# SILANG - Sistem Laravel dengan Inertia dan React

Aplikasi ini adalah sistem manajemen pengguna berbasis Laravel, Inertia.js, dan React. Mendukung autentikasi, manajemen pengguna (CRUD), serta kontrol akses berbasis peran (admin/user).

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Kredensial Login Default](#kredensial-login-default)
- [Struktur Folder](#struktur-folder)

---

## Fitur Utama

- Autentikasi pengguna (login/logout)
- Manajemen pengguna (CRUD)
- Kontrol akses berbasis peran (admin/user)
- UI modern dengan React & Tailwind CSS
- Flash message dan konfirmasi aksi
- Pagination & pencarian pengguna
- Proteksi aksi sensitif (tidak bisa hapus/ubah peran sendiri)

---

## Persyaratan Sistem

- PHP 8.2+
- Composer 2.0+
- Node.js 18+
- npm 9+
- SQLite/MySQL/PostgreSQL

---

## Instalasi

1. **Clone repository**
    ```bash
    git clone https://github.com/username/silang.git
    cd silang
    ```

2. **Install dependensi PHP**
    ```bash
    composer install
    ```

3. **Install dependensi JavaScript**
    ```bash
    npm install
    ```

4. **Salin file environment**
    ```bash
    cp .env.example .env
    ```

5. **Generate application key**
    ```bash
    php artisan key:generate
    ```

6. **Siapkan database**
    - Untuk SQLite:
        ```bash
        touch database/database.sqlite
        ```
    - Atau gunakan MySQL/PostgreSQL dan sesuaikan `.env`

7. **Jalankan migrasi dan seeder**
    ```bash
    php artisan migrate --seed
    ```

8. **Buat symbolic link storage**
    ```bash
    php artisan storage:link
    ```

---

## Konfigurasi

- Edit file `.env` untuk pengaturan database, mail, dsb sesuai kebutuhan.
- Default menggunakan SQLite.

---

## Menjalankan Aplikasi

- Jalankan server Laravel:
    ```bash
    php artisan serve
    ```
- Jalankan Vite untuk asset frontend:
    ```bash
    npm run dev
    ```

---

## Kredensial Login Default

Admin:
- Email: `admin@example.com`
- Password: `password`

Pengguna Biasa:
- Email: `user@example.com`
- Password: `password`

---

## Struktur Folder

```
app/            # Kode backend Laravel (Controllers, Models, Middleware)
resources/js/   # Kode frontend React (Pages, Components, Layouts)
routes/         # Definisi route Laravel
database/       # Migrasi, seeder, dan factory
public/         # Public assets & entrypoint
config/         # Konfigurasi aplikasi
tests/          # Unit & feature tests (Pest)
```

---

## Lisensi

Aplikasi ini menggunakan [MIT License](https://opensource.org/licenses/MIT).
