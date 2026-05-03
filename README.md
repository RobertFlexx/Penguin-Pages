# Penguin Pages

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Tux, the Linux mascot" width="220">
</p>

<p align="center">
  <strong>An unofficial Linux reference site with an early-2000s documentation mirror feel.</strong>
</p>

<p align="center">
  <a href="https://www.kernel.org/">kernel.org</a> ·
  <a href="https://docs.kernel.org/">Linux kernel docs</a> ·
  <a href="https://man7.org/linux/man-pages/">Linux man-pages</a> ·
  <a href="https://www.x.org/">X.Org</a> ·
  <a href="https://wayland.freedesktop.org/">Wayland</a>
</p>

---

## About

**Penguin Pages** is a small static Linux reference website built for GitHub Pages. It is styled like an old Linux documentation mirror: plain colors, hard borders, compact text, simple tabs, real documentation links, and no modern web-app bloat.

The site collects practical Linux notes in one place, including kernel documentation, boot repair, sysadmin commands, filesystem layout, package managers, graphics stack notes, distro references, and source tree navigation.

It is not a distro, not a commercial product, and not an official Linux project. It is just a clean little reference shelf for people who like Linux, terminals, manuals, and the old web.

---

## What the site includes

* A front page with a classic Tux header
* Kernel boot parameter notes
* `/proc`, `/sys`, and `/dev` explanations
* Boot chain and recovery notes
* GRUB and initramfs repair examples
* Sysadmin command cribsheet
* Filesystem hierarchy notes
* Package manager references
* Linux source tree map
* X.Org, Wayland, Mesa, DRM, and desktop stack notes
* Distro family reference table
* Real links to official documentation
* Small JavaScript tab system
* Local search/filter box
* Print-friendly styling
* Tiny lookup shell for Linux topics

---

## Screenshots

Add screenshots here once the site is published.

```text
screenshots/
├── front-page.png
├── kernel-tab.png
└── commands-tab.png
```

---

## Running locally

This site is just static HTML, CSS, and JavaScript.

Open it directly:

```sh
xdg-open index.html
```

Or serve it locally:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## GitHub Pages setup

1. Put the site file in the repository as `index.html`.
2. Put this README in the repository as `README.md`.
3. Commit and push:

```sh
git add index.html README.md
git commit -m "Add Penguin Pages site"
git push
```

4. Open the repository on GitHub.
5. Go to **Settings → Pages**.
6. Set the source to the branch containing `index.html`.
7. Save and wait for GitHub Pages to publish the site.

The finished URL usually looks like:

```text
https://USERNAME.github.io/REPOSITORY/
```

---

## Suggested repository layout

```text
penguin-pages/
├── index.html
├── README.md
├── screenshots/
│   ├── front-page.png
│   ├── kernel-tab.png
│   └── commands-tab.png
└── LICENSE
```

The current version keeps everything in one HTML file, so it is easy to publish and easy to copy around.

---

## Documentation linked by the site

Penguin Pages links to real Linux and open source documentation, including:

* Linux kernel documentation
* The Linux Kernel Archives
* Linux man-pages project
* GNU coreutils manual
* Bash manual
* Debian documentation
* Fedora documentation
* Arch Wiki
* openSUSE documentation
* Gentoo Wiki
* Void Linux Handbook
* SlackDocs
* X.Org
* Wayland
* freedesktop.org
* Mesa
* PipeWire
* BusyBox
* Bootlin Elixir source browser
* kernel.org git browser

---

## Tux artwork

The Tux image used in the site header is loaded from Wikimedia Commons:

```html
<img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Tux, the Linux mascot">
```

The image links back to the Wikimedia Commons file page in the site itself.

---

## Design goals

Penguin Pages intentionally avoids the heavy modern landing-page look. The style is closer to old documentation mirrors, personal Linux pages, and early web reference indexes.

The goals are:

* readable first
* fast to load
* easy to host
* easy to edit
* no build step
* no framework
* no tracking
* no unnecessary dependencies
* useful even with JavaScript disabled, aside from tab switching and search

---

## Ideas for future additions

* More init system notes: systemd, OpenRC, runit, s6, dinit
* Filesystem pages for ext4, Btrfs, XFS, ZFS, tmpfs, overlayfs
* Networking page for NetworkManager, systemd-networkd, ifupdown, nftables
* Audio stack page for ALSA, PulseAudio, PipeWire, WirePlumber
* Bootloader page for GRUB, systemd-boot, rEFInd, Limine
* Kernel build page with distro-specific instructions
* Troubleshooting flowcharts
* Small glossary of Linux terms
* More old-web badges and mirror links

---

## License

Choose a license before publishing if you want others to reuse the site.

Common choices:

* MIT License for permissive reuse
* BSD-2-Clause or BSD-3-Clause for a traditional permissive license
* CC BY-SA for documentation-style sharing
* Public domain dedication if you want it completely free to reuse

---

## Disclaimer

Penguin Pages is an unofficial reference site. Linux is a trademark of Linus Torvalds in the United States and other countries. This site is not affiliated with Linus Torvalds, The Linux Foundation, kernel.org, GNU, Debian, Fedora, Arch Linux, openSUSE, Gentoo, Void Linux, Slackware, X.Org, Wayland, Mesa, or any other project linked from the site.
