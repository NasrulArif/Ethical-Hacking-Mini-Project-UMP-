# Ethical-Hacking-Mini-Project-UMP-
Mini project for Ethical Hacking subject. Semester II of 2017/2018. 

A web extension for detecting malicious URL (works in Chrome only at the moment).

The extension work is such way when activate:
1. Extension initiate blacklist, normallist, bufferlist of URL.
2. Extension fetch the next URL user is visiting.
3. Extension compare if the URL exist in bufferlist. If yes, the URL considered to be normal and stored in normallist.
4. If not, extension compare if the URL exist in normallist. If yes, user may proceed accessing the URL.
5. If not, extension compare if the URL exist in blacklist. If yes, user will be warned upon before loading the URL whether to proceed or not.
6. If not, extension will store the URL into bufferlist and user may proceed accessing the URL.

DETAIL OF THE PROJECT CAN BE READ FROM THE PROJECT REPORT IN PDF FORMAT
