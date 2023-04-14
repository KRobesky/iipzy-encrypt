Building a .exe file for iipzy-encrypt.

Google search: node.js to .exe

See: https://www.section.io/engineering-education/compile-your-nodejs-application-into-a-exe-file/

1.  Download nasm-2.15.04-installer-x64.exe from https://www.nasm.us/pub/nasm/releasebuilds/2.15.04/win64/

2.  Install nasm-2.15.04-installer-x64.exe - only nasm and docs.

3.  Install express: npm i express

4.  Install pkg: npm i pkg -g

    check install: pkg -h

5.  pkg src/index.js -t node12-win-x64 -o iipzy-encrypt.exe

    produces: iipzy-encrypt.exe

6.  Check in changes

Building on Linux/openWrt

1.  cd /root/pi

2.  git clone "http://github.com/KRobesky/iipzy-encrypt.git"

3.  cd iipzy-encrypt

4.  npm i

4.  Install pkg: npm i pkg -g

    check install: pkg -h

5.  pkg src/index.js -t node16-linux-arm64

    produces: index

7.  rename: mv index iipzy-encrypt

8.  run: ./iipzy-encrypt

    Fails with: -bash: ./iipzy-encrypt: No such file or directory
    
    > ldd iipzy-encrypt
        /lib/ld-linux-aarch64.so.1 (0xffffb0e16000)
        libdl.so.2 => /lib/ld-linux-aarch64.so.1 (0xffffb0e16000)
        libstdc++.so.6 => /usr/lib/libstdc++.so.6 (0xffffb0be4000)
        libm.so.6 => /lib/ld-linux-aarch64.so.1 (0xffffb0e16000)
        libgcc_s.so.1 => /lib/libgcc_s.so.1 (0xffffb0bbf000)
        libpthread.so.0 => /lib/ld-linux-aarch64.so.1 (0xffffb0e16000)
        libc.so.6 => /lib/ld-linux-aarch64.so.1 (0xffffb0e16000)
        Error loading shared library ld-linux-aarch64.so.1: No such file or directory (needed by iipzy-encrypt)
        Error relocating iipzy-encrypt: __getauxval: symbol not found
        Error relocating iipzy-encrypt: __register_atfork: symbol not found
        Error relocating iipzy-encrypt: makecontext: symbol not found
        Error relocating iipzy-encrypt: backtrace: symbol not found
        Error relocating iipzy-encrypt: setcontext: symbol not found
        Error relocating iipzy-encrypt: getcontext: symbol not found
        Error relocating iipzy-encrypt: backtrace_symbols: symbol not found
        Error relocating iipzy-encrypt: gnu_get_libc_version: symbol not found
        Error relocating iipzy-encrypt: __strdup: symbol not found
        Error relocating iipzy-encrypt: __libc_stack_end: symbol not found
