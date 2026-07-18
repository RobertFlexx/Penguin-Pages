(() => {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const sections = Array.from(document.querySelectorAll(".section"));
    const dockLinks = Array.from(document.querySelectorAll("[data-tab-link]"));
    const search = document.getElementById("search");
    const clearSearch = document.getElementById("clearSearch");
    const printPage = document.getElementById("printPage");
    const clock = document.getElementById("clock");
    const ticker = document.getElementById("ticker");
    const miniTerm = document.getElementById("miniTerm");
    const miniForm = document.getElementById("miniForm");
    const miniInput = document.getElementById("miniInput");

    let blocks = Array.from(document.querySelectorAll(".doc-block"));
    let noResults = document.getElementById("noSearchResults");

    if (!noResults && search) {
      noResults = document.createElement("div");
      noResults.id = "noSearchResults";
      noResults.className = "warning doc-block search-empty";
      noResults.textContent = "No visible notes matched that search.";
      noResults.style.display = "none";
      const main = document.querySelector(".main");
      if (main) main.prepend(noResults);
    }

    function validTabId(id) {
      return sections.some((section) => section.id === id);
    }

    function activeSection() {
      return document.querySelector(".section.active");
    }

    function filterBlocks(query) {
      const section = activeSection();
      const q = String(query || "").trim().toLowerCase();
      let visibleCount = 0;

      blocks.forEach((block) => {
        if (!section || !section.contains(block)) return;
        const visible = !q || block.textContent.toLowerCase().includes(q);
        block.style.display = visible ? "" : "none";
        if (visible) visibleCount += 1;
      });

      if (noResults) {
        noResults.style.display = q && visibleCount === 0 ? "" : "none";
      }
    }

    function clearFilter() {
      if (search) search.value = "";
      blocks.forEach((block) => {
        block.style.display = "";
      });
      if (noResults) noResults.style.display = "none";
    }

    function showTab(id, options = {}) {
      if (!validTabId(id)) id = "home";

      const savedScroll = options.keepScroll ? window.scrollY : 0;
      const hashId = options.anchor || id;

      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === id);
        tab.setAttribute("aria-selected", tab.dataset.tab === id ? "true" : "false");
        tab.setAttribute("tabindex", tab.dataset.tab === id ? "0" : "-1");
      });

      sections.forEach((section) => {
        const active = section.id === id;
        section.classList.toggle("active", active);
        section.hidden = !active;
      });

      clearFilter();

      if (location.hash.replace("#", "") !== hashId) {
        history.replaceState(null, "", "#" + hashId);
      }

      requestAnimationFrame(() => {
        if (options.anchor) {
          document.getElementById(options.anchor)?.scrollIntoView();
        } else if (options.keepScroll) {
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo(0, Math.min(savedScroll, maxScroll));
        } else {
          window.scrollTo(0, 0);
        }
      });
    }

    function showHash(id) {
      const target = document.getElementById(id);
      const section = target?.closest(".section");
      if (!section) return false;
      showTab(section.id, id === section.id ? {} : { anchor: id });
      return true;
    }

    tabs.forEach((tab, index) => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", tab.classList.contains("active") ? "true" : "false");
      tab.setAttribute("tabindex", tab.classList.contains("active") ? "0" : "-1");

      tab.addEventListener("click", () => {
        showTab(tab.dataset.tab || "home");
      });

      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();

        let next = index;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;

        tabs[next].focus();
        showTab(tabs[next].dataset.tab || "home", { keepScroll: true });
      });
    });

    dockLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showTab(link.getAttribute("data-tab-link") || "home");
      });
    });

    if (search) {
      search.addEventListener("input", () => filterBlocks(search.value));
    }

    if (clearSearch) {
      clearSearch.addEventListener("click", () => {
        clearFilter();
        if (search) search.focus();
      });
    }

    if (printPage) {
      printPage.addEventListener("click", () => window.print());
    }

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const typing = target && ["INPUT", "TEXTAREA"].includes(target.tagName);

      if ((event.key === "/" && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
        if (!search) return;
        event.preventDefault();
        search.focus();
        search.select();
      }

      if (event.key === "Escape" && document.activeElement === search) {
        clearFilter();
        search.blur();
      }
    });

    function tickClock() {
      if (!clock) return;
      const now = new Date();
      clock.textContent = "local time: " + now.toLocaleString();
    }

    tickClock();
    setInterval(tickClock, 1000);

    const tickerLines = [
      "reading documentation index ... ok",
      "checking modules.dep ... ok",
      "scanning man-pages ... ok",
      "syncing HOWTO shelf ... ok",
      "grepping dmesg notes ... ok",
      "updating package table ... ok",
      "refreshing boot notes ... ok",
      "checking filesystem notes ... ok",
      "loading init table ... ok",
      "reviewing security shelf ... ok",
      "probing audio stack ... ok",
      "fetching unix-like ring ... ok",
      "checking distro download shelf ... ok",
      "reading kernel lab links ... ok",
      "checking Exherbo option drift ... ok",
      "reading Paludis world set ... ok",
      "probing Plasma Wayland notes ... ok",
      "checking nvidia-drm modeset ... ok",
      "checking CONFIG_PROTECT notes ... ok"
    ];

    let tickerIndex = 0;
    if (ticker) {
      ticker.textContent = tickerLines[0];
      setInterval(() => {
        ticker.textContent = tickerLines[tickerIndex];
        tickerIndex = (tickerIndex + 1) % tickerLines.length;
      }, 1900);
    }

    function termLine(text) {
      if (!miniTerm) return;
      const div = document.createElement("div");
      div.textContent = text;
      miniTerm.appendChild(div);
      miniTerm.scrollTop = miniTerm.scrollHeight;
    }

    const lookup = {
      help: ["topics: boot, modules, logs, network, files, perms, graphics, package, kernel, kernel-lab, desktop, wm, fs, init, security, audio, virt, exherbo, paludis, cave, plasma, amd, radeon, intel, nvidia, laptop, headless, downloads, glossary, tux"],
      boot: ["boot: firmware -> bootloader -> kernel -> initramfs -> rootfs -> init -> services -> login"],
      modules: ["modules: lsmod, modinfo, modprobe, modprobe -r, /lib/modules/$(uname -r)"],
      logs: ["logs: journalctl -xb, dmesg -T, /var/log, systemctl --failed"],
      network: ["network: ip addr, ip route, ss -tulpn, resolvectl status, ping, tracepath"],
      files: ["files: /etc config, /usr programs, /var state, /home users, /run runtime"],
      perms: ["perms: user/group/other, chmod, chown, umask, ACLs, capabilities"],
      graphics: ["graphics: kernel DRM/KMS, Mesa or vendor driver, X.Org or Wayland compositor, desktop shell"],
      package: ["package tools: apt, dnf, pacman, zypper, xbps, emerge, cave, flatpak"],
      kernel: ["kernel: scheduler, mm, vfs, net, drivers, arch, security, ipc"],
      "kernel-lab": ["kernel lab: kernel.org downloads, git.kernel.org, torvalds/linux, building, patching, LFS, BLFS"],
      desktop: ["desktop: KDE Plasma, GNOME, XFCE, LXQt, Cinnamon, MATE, Budgie"],
      wm: ["wm: i3, sway, Hyprland, xmonad, IceWM, JWM, dwm"],
      fs: ["filesystems: ext4, Btrfs, XFS, ZFS, FAT32, exFAT, tmpfs, overlayfs"],
      init: ["init: systemd, OpenRC, runit, s6, dinit, SysVinit"],
      security: ["security: users, groups, sudo, permissions, ACLs, capabilities, AppArmor, SELinux, firewall"],
      audio: ["audio: ALSA, PulseAudio, PipeWire, WirePlumber, JACK"],
      virt: ["virt: chroot, systemd-nspawn, Docker, Podman, LXC, QEMU/KVM, libvirt"],
      exherbo: ["exherbo: source-based distro using Paludis/cave, exheres packages, options.conf, world sets, CONFIG_PROTECT, and explicit system assembly. The field guide covers headless, AMD, Intel, Radeon, NVIDIA, virtual, KDE, GNOME, XFCE, LXQt, and standalone sessions."],
      paludis: ["paludis: package manager framework. cave is the main frontend. options.conf controls package choices; cave resolve world previews rebuilds before executing."],
      cave: ["cave: cave resolve world previews changes; cave resolve --execute world applies them; cave search finds packages; cave show inspects package options."],
      plasma: ["plasma: install plasma-desktop, plasma-workspace, kwin, systemsettings, sddm, xdg-desktop-portal-kde, plasma-pa, plasma-nm, powerdevil, kscreen, kinfocenter, and themes."],
      amd: ["AMD graphics: identify the generation; modern cards normally use amdgpu plus firmware, Mesa RadeonSI, and RADV. Confirm binding with lspci -nnk and acceleration with glxinfo -B."],
      radeon: ["Radeon graphics: older cards commonly use the radeon kernel driver plus firmware and Mesa. Do not force amdgpu until the exact GPU generation and kernel support are known."],
      intel: ["Intel graphics: established hardware commonly uses i915 with Mesa Iris/ANV; newer hardware may use Xe where supported. Confirm the bound kernel driver and avoid llvmpipe."],
      nvidia: ["nvidia: for KDE Wayland use nvidia-drivers with wayland/tools, nvidia-drm.modeset=1, nvidia-drm.fbdev=1, nouveau blacklisted, matching kernel modules, and a rebuilt initramfs."],
      laptop: ["laptop: verify battery, thermals, suspend, hibernation, lid handling, touchpad, rfkill, hybrid graphics, and dock/display hotplug before relying on mobile use."],
      headless: ["headless: omit desktop graphics, display manager, portals, and GUI packages; configure networking, time, local recovery, SSH keys, and a firewall."],
      downloads: ["downloads: user friendly, advanced, rolling, server, minimal, security, and special-use distro groups"],
      glossary: ["glossary: kernel, userspace, initramfs, module, syscall, daemon, TTY, compositor, mount point"],
      tux: ["tux: Linux mascot. Header artwork links to Wikimedia Commons."]
    };

    if (miniTerm && miniForm && miniInput) {
      termLine("Penguin Pages lookup shell");
      termLine("type help for topics");
      miniForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = miniInput.value.trim().toLowerCase();
        if (!input) return;

        termLine("lookup$ " + input);

        if (input === "clear") {
          miniTerm.innerHTML = "";
        } else if (lookup[input]) {
          lookup[input].forEach(termLine);
        } else {
          termLine("no entry: " + input + " -- try help");
        }

        miniInput.value = "";
      });
    }

    window.addEventListener("hashchange", () => {
      const id = location.hash.replace("#", "");
      showHash(id);
    });

    const hash = location.hash.replace("#", "");
    if (hash && showHash(hash)) {
      // showHash activates the parent tab and positions nested anchors.
    } else {
      const active = document.querySelector(".tab.active");
      showTab(active ? active.dataset.tab : "home", { keepScroll: true });
    }
  });
})();
