Building a .exe file for iipzy-encrypt.

Google search: node.js to .exe

See: https://www.section.io/engineering-education/compile-your-nodejs-application-into-a-exe-file/

1.  Download nasm-2.15.04-installer-x64.exe from https://www.nasm.us/pub/nasm/releasebuilds/2.15.04/win64/

2.  Install nasm-2.15.04-installer-x64.exe - only nasm and docs.

3.  Install express: npm i express

4.  Install nexe: npm i nexe -g

    check install: nexe -h

5.  cd src

6.  nexe index.js

7.  Build: nexe --build 

8.  copy src.exe ..\iipzy-encrypt.exe

9.  rem src.exe
