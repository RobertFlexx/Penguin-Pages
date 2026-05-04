let tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
    let sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
    let dockLinks = Array.prototype.slice.call(document.querySelectorAll('[data-tab-link]'));
    let search = document.getElementById('search');
    let blocks = Array.prototype.slice.call(document.querySelectorAll('.doc-block'));
    let clock = document.getElementById('clock');
    let ticker = document.getElementById('ticker');
    let miniTerm = document.getElementById('miniTerm');
    let miniForm = document.getElementById('miniForm');
    let miniInput = document.getElementById('miniInput');

    function showTab(id) {
      let savedScroll = window.scrollY;

      tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === id);
      });

      sections.forEach((section) =>  {
        section.classList.toggle('active', section.id === id);
      });

      history.replaceState(null, '', '#' + id);
      search.value = '';
      filterBlocks('');

      requestAnimationFrame(() => {
        let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo(0, Math.min(savedScroll, maxScroll));
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', function() {
        showTab(tab.getAttribute('data-tab'));
      });
    });

    dockLinks.forEach((link) => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        showTab(link.getAttribute('data-tab-link'));
      });
    });

    function filterBlocks(query) {
      let q = query.toLowerCase();
      blocks.forEach((block) => {
        let activeParent = block.closest('.section.active');
        if (!activeParent) return;
        let visible = !q || block.textContent.toLowerCase().indexOf(q) !== -1;
        block.style.display = visible ? '' : 'none';
      });
    }

    search.addEventListener('input', function() {
      filterBlocks(search.value);
    });

    document.getElementById('clearSearch').addEventListener('click', () => {
      search.value = '';
      filterBlocks('');
      search.focus();
    });

    document.getElementById('printPage').addEventListener('click', () => {
      window.print();
    });

    function tickClock() {
      let now = new Date();
      clock.textContent = `local time: ${now.toLocaleString()}`;
    }

    tickClock();
    setInterval(tickClock, 1000);

    let tickerLines = [
      'reading documentation index ... ok',
      'checking modules.dep ... ok',
      'scanning man-pages ... ok',
      'syncing HOWTO shelf ... ok',
      'grepping dmesg notes ... ok',
      'updating package table ... ok',
      'refreshing boot notes ... ok',
      'checking filesystem notes ... ok',
      'loading init table ... ok',
      'reviewing security shelf ... ok',
      'probing audio stack ... ok',
      'fetching unix-like ring ... ok',
      'checking distro download shelf ... ok',
      'reading kernel lab links ... ok'
    ];

    let tickerIndex = 0;
    setInterval(() => {
      ticker.textContent = tickerLines[tickerIndex];
      tickerIndex = (tickerIndex + 1) % tickerLines.length;
    }, 1900);

    function termLine(text) {
      if (!miniTerm) return;
      let div = document.createElement('div');
      div.textContent = text;
      miniTerm.appendChild(div);
      miniTerm.scrollTop = miniTerm.scrollHeight;
    }

    let lookup = {
      help: ['topics: boot, modules, logs, network, files, perms, graphics, package, kernel, kernel-lab, desktop, wm, fs, init, security, audio, virt, downloads, glossary, tux'],
      boot: ['boot: firmware -> bootloader -> kernel -> initramfs -> rootfs -> init -> services -> login'],
      modules: ['modules: lsmod, modinfo, modprobe, modprobe -r, /lib/modules/$(uname -r)'],
      logs: ['logs: journalctl -xb, dmesg -T, /var/log, systemctl --failed'],
      network: ['network: ip addr, ip route, ss -tulpn, resolvectl status, ping, tracepath'],
      files: ['files: /etc config, /usr programs, /var state, /home users, /run runtime'],
      perms: ['perms: user/group/other, chmod, chown, umask, ACLs, capabilities'],
      graphics: ['graphics: kernel DRM/KMS, Mesa or vendor driver, X.Org or Wayland compositor, desktop shell'],
      package: ['package tools: apt, dnf, pacman, zypper, xbps, emerge, pkgtool'],
      kernel: ['kernel: scheduler, mm, vfs, net, drivers, arch, security, ipc'],
      'kernel-lab': ['kernel lab: kernel.org downloads, git.kernel.org, torvalds/linux, building, patching, LFS, BLFS'],
      desktop: ['desktop: KDE Plasma, GNOME, XFCE, LXQt, Cinnamon, MATE, Budgie'],
      wm: ['wm: i3, sway, Hyprland, xmonad, IceWM, JWM, dwm'],
      fs: ['filesystems: ext4, Btrfs, XFS, ZFS, FAT32, exFAT, tmpfs, overlayfs'],
      init: ['init: systemd, OpenRC, runit, s6, dinit, SysVinit'],
      security: ['security: users, groups, sudo, permissions, ACLs, capabilities, AppArmor, SELinux, firewall'],
      audio: ['audio: ALSA, PulseAudio, PipeWire, WirePlumber, JACK'],
      virt: ['virt: chroot, systemd-nspawn, Docker, Podman, LXC, QEMU/KVM, libvirt'],
      downloads: ['downloads: user friendly, advanced, rolling, server, minimal, security, and special-use distro groups'],
      glossary: ['glossary: kernel, userspace, initramfs, module, syscall, daemon, TTY, compositor, mount point'],
      tux: ['tux: Linux mascot. Header artwork links to Wikimedia Commons.']
    };

    if (miniTerm && miniForm && miniInput) {
      termLine('Penguin Pages lookup shell');
      termLine('type help for topics');
      miniForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let input = miniInput.value.trim().toLowerCase();
        if (!input) return;
        termLine('lookup$ ' + input);
        if (input === 'clear') {
          miniTerm.innerHTML = '';
        } else if (lookup[input]) {
          lookup[input].forEach(termLine);
        } else {
          termLine('no entry: ' + input + ' -- try help');
        }
        miniInput.value = '';
      });
    }

    let hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      showTab(hash);
    }
