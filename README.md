# Penguin Pages

<p align="center">
  <a href="https://robertflexx.github.io/Penguin-Pages/#home">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Tux, the Linux mascot" width="260">
  </a>
</p>

<p align="center">
  <strong>An unofficial Linux reference site for GitHub Pages.</strong>
</p>

<p align="center">
  <a href="https://robertflexx.github.io/Penguin-Pages/#home"><strong>Visit the site</strong></a>
</p>

<p align="center">
  <a href="https://robertflexx.github.io/Penguin-Pages/#kernel">Kernel</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#boot">Boot</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#admin">Sysadmin</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#commands">Commands</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#source">Source Tree</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#graphics">Graphics</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#distros">Distros</a> ·
  <a href="https://robertflexx.github.io/Penguin-Pages/#links">Links</a>
</p>

---

## About

Penguin Pages is a static Linux reference site with an early web documentation style.

It contains notes and links for Linux kernel documentation, boot repair, system administration, common commands, the Linux source tree, graphics stacks, distribution families, and related open source projects.

The site is built for GitHub Pages and is meant to be fast, simple, readable, and easy to edit.

---

## Live site

[https://robertflexx.github.io/Penguin-Pages/#home](https://robertflexx.github.io/Penguin-Pages/#home)

---

## What it is

Penguin Pages is a small Linux documentation homepage. It is not a distro, package manager, wiki engine, or full manual replacement. It is a quick reference page for common Linux topics and useful documentation links.

The design is intentionally old-school: simple boxes, small text, plain colors, and a Tux logo at the top.

---

## Sections

* **Front page** - site overview and quick notes
* **Kernel** - kernel docs, boot parameters, modules, `/proc`, `/sys`, and `/dev`
* **Boot** - Linux boot chain, GRUB notes, initramfs notes, and recovery commands
* **Sysadmin** - filesystem layout, users, permissions, logs, services, and first checks
* **Commands** - shell, storage, networking, process, and package manager examples
* **Source Tree** - overview of the Linux kernel source directories
* **Graphics** - DRM/KMS, Mesa, X.Org, Wayland, and desktop stack notes
* **Distros** - common distribution families and package tools
* **Links** - external Linux documentation and project links

---

## Features

* Static HTML site
* GitHub Pages ready
* Early-2000s Linux documentation style
* Real Tux SVG from Wikimedia Commons
* Tab navigation
* Hash-based section links
* Page filtering
* Print-friendly styling
* Small Linux lookup shell
* Real links to Linux documentation and project sites
* No build step or framework required

---

## Repository layout

```text
Penguin-Pages/
├── index.html
├── README.md
└── LICENSE
```

---

## Running locally

Open the site directly:

```sh
xdg-open index.html
```

Or run a local web server:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## GitHub Pages

The site is served through GitHub Pages from the repository contents. Since the page is static, GitHub Pages can host it directly without any build process.

The main site file is:

```text
index.html
```

---

## Tux artwork

The Tux image is loaded from Wikimedia Commons:

```html
<img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Tux, the Linux mascot">
```

File page:

[https://commons.wikimedia.org/wiki/File:Tux.svg](https://commons.wikimedia.org/wiki/File:Tux.svg)

---

## License

Penguin Pages is licensed under the **GNU General Public License v3.0**.

See the `LICENSE` file for the full license text.

---

## Disclaimer

Penguin Pages is an unofficial Linux reference site.

Linux is a trademark of Linus Torvalds in the United States and other countries.
