Building a .exe file for iipzy-encrypt.

Google search: node.js to .exe

See: https://www.section.io/engineering-education/compile-your-nodejs-application-into-a-exe-file/

1.  Download nasm-2.15.04-installer-x64.exe from https://www.nasm.us/pub/nasm/releasebuilds/2.15.04/win64/

2.  Install nasm-2.15.04-installer-x64.exe - only nasm and docs.

3.  Install express: npm i express

4.  Install pkg: npm i pkg -g

    check install: pkg -h

5.  pkg src/index.js

    produces: index-win.exe

6.  Rename: ren index-win.exe iipzy-encrypt.exe

Building on Linux/openWrt

1.  cd /root/pi

2.  mkdir iipzy-encrypt

3.  cd iipzy-encrypt

5.  git clone "http://github.com/KRobesky/iipzy-encrypt.git"

8.  cd ..

9.  cd iipzy-encrypt

10. npm i

11. Install nexe: npm i nexe -g

    check install: nexe -h

5.  cd src

6.  nexe index.js --build

7.  Build: nexe --build 

8.  copy src.exe ..\iipzy-encrypt.exe

9.  rem src.exe
