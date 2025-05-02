# Panduan Instalasi SILANG (Sistem Laravel dengan Inertia)

## Daftar Isi
1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Langkah Instalasi](#langkah-instalasi)
3. [Konfigurasi Aplikasi](#konfigurasi-aplikasi)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Kredensial Default](#kredensial-default)
6. [Penggunaan Dasar](#penggunaan-dasar)
7. [Pemecahan Masalah](#pemecahan-masalah)

## Persyaratan Sistem

Pastikan sistem Anda memenuhi persyaratan berikut sebelum melakukan instalasi:

- PHP 8.2 atau lebih tinggi
- Composer 2.0 atau lebih tinggi
- Node.js 18.0 atau lebih tinggi
- npm 9.0 atau lebih tinggi
- Git
- SQLite, MySQL, atau PostgreSQL

## Langkah Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/username/silang.git
cd silang
```

### 2. Instal dependensi PHP

```bash
composer install
```

### 3. Instal dependensi JavaScript

```bash
npm install
```

### 4. Buat salinan file environment

```bash
cp .env.example .env
```

### 5. Generate application key

```bash
php artisan key:generate
```

### 6. Siapkan database

Untuk SQLite:
```bash
touch database/database.sqlite
```

Atau gunakan MySQL/PostgreSQL:
- Buat database baru
- Update konfigurasi database di file `.env`

### 7. Jalankan migrasi dan seeder

```bash
php artisan migrate --seed
```

### 8. Buat tautan storage

```bash
php artisan storage:link
```

## Konfigurasi Aplikasi

### Konfigurasi database

Edit file `.env` dan sesuaikan pengaturan database:

