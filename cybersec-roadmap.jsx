import { useState, useEffect, useCallback } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Cairo:wght@400;600;700;900&display=swap');`;

const CSS = `
:root{
  --bg:#04080f;--bg2:#0a1220;--bg3:#060c1a;--bg4:#040810;
  --t0:#e2e8f0;--t1:#64748b;--t2:#475569;--t3:#334155;--t4:#94a3b8;--t5:#cbd5e1;
  --wo:rgba(255,255,255,.06);--wh:rgba(255,255,255,.1);--wb:rgba(255,255,255,.08);
  --wm:rgba(255,255,255,.04);--w3:rgba(255,255,255,.03);--w5:rgba(255,255,255,.05);
  --w7:rgba(255,255,255,.07);--w12:rgba(255,255,255,.12);
  --bo:rgba(0,0,0,.2);--bt:rgba(0,0,0,.3);
  --sg:linear-gradient(180deg,#060c1a 0%,#040810 100%);
  --sbg:rgba(0,255,136,.03);--sbg5:rgba(0,255,136,.05);
  --sbgh:rgba(0,255,136,.07);--sbg12:rgba(0,255,136,.12);
  --sbd:rgba(0,255,136,.1);--sbd2:rgba(0,255,136,.2);--sbd25:rgba(0,255,136,.25);
  --sbd3:rgba(0,255,136,.3);--sbd4:rgba(0,255,136,.4);--sbd15:rgba(0,255,136,.15);
  --sbg04:rgba(0,255,136,.04);--sbg06:rgba(0,255,136,.06);--sbg08:rgba(0,255,136,.08);
  --dbbg:rgba(0,212,255,.04);--db07:rgba(0,212,255,.07);--db1:rgba(0,212,255,.1);
  --select-bg:#0f172a;
}
[data-theme="light"]{
  --bg:#f8fafc;--bg2:#f1f5f9;--bg3:#f8fafc;--bg4:#f1f5f9;
  --t0:#0f172a;--t1:#475569;--t2:#64748b;--t3:#94a3b8;--t4:#64748b;--t5:#334155;
  --wo:rgba(0,0,0,.05);--wh:rgba(0,0,0,.08);--wb:rgba(0,0,0,.08);
  --wm:rgba(0,0,0,.03);--w3:rgba(0,0,0,.02);--w5:rgba(0,0,0,.04);--w7:rgba(0,0,0,.06);--w12:rgba(0,0,0,.1);
  --bo:rgba(0,0,0,.06);--bt:rgba(0,0,0,.1);
  --sg:linear-gradient(180deg,#f1f5f9 0%,#e2e8f0 100%);
  --sbg:rgba(0,200,100,.04);--sbg5:rgba(0,200,100,.06);
  --sbgh:rgba(0,200,100,.08);--sbg12:rgba(0,200,100,.12);
  --sbd:rgba(0,200,100,.15);--sbd2:rgba(0,200,100,.2);--sbd25:rgba(0,200,100,.25);
  --sbd3:rgba(0,200,100,.3);--sbd4:rgba(0,200,100,.4);--sbd15:rgba(0,200,100,.15);
  --sbg04:rgba(0,200,100,.05);--sbg06:rgba(0,200,100,.06);--sbg08:rgba(0,200,100,.08);
  --dbbg:rgba(0,0,0,.03);--db07:rgba(0,180,255,.08);--db1:rgba(0,180,255,.1);
  --select-bg:#fff;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;max-width:100%;-webkit-text-size-adjust:100%}
body{background:var(--bg);font-family:'Fira Code',monospace}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg2)}::-webkit-scrollbar-thumb{background:#00ff88;border-radius:3px}
.glow{text-shadow:0 0 18px #00ff88,0 0 36px #00ff8844}
.btn{border:none;cursor:pointer;border-radius:8px;font-family:'Fira Code',monospace;transition:all .2s}
.btn-g{background:linear-gradient(135deg,#00ff88,#00d4ff);color:#040810;font-weight:700;padding:10px 20px}
.btn-g:hover{transform:translateY(-1px);box-shadow:0 4px 20px #00ff8855}
.btn-o{background:transparent;border:1px solid var(--sbd3);color:#00ff88;padding:8px 16px}
.btn-o:hover{background:var(--sbgh)}
.card{background:var(--sbg);border:1px solid var(--sbd);border-radius:12px}
.card:hover{border-color:var(--sbd25);background:var(--sbg5);transition:all .2s}
.nav{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;cursor:pointer;color:var(--t1);font-size:13px;border:1px solid transparent;transition:all .2s}
.nav:hover{background:var(--sbgh);color:#00ff88}
.nav.on{background:var(--sbg12);color:#00ff88;border-color:var(--sbd25)}
.bar{height:6px;border-radius:3px;background:var(--w7);overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width .5s ease}
.topic-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:6px;cursor:pointer;transition:all .15s}
.topic-row:hover{background:var(--wm)}
.chk{width:20px;height:20px;border:2px solid var(--sbd4);border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s}
.chk.on{background:#00ff88;border-color:#00ff88}
.phase-hd{padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background .2s}
.phase-hd:hover{background:var(--sbg04)}
.res-card{background:var(--w3);border:1px solid var(--wb);border-radius:8px;padding:10px 14px;margin-bottom:8px;transition:all .2s;text-decoration:none;display:block}
.res-card:hover{border-color:var(--sbd25);background:var(--sbg04)}
details>summary::-webkit-details-marker{display:none}
details>summary::marker{display:none;content:''}
details[open] summary span:last-child{transform:rotate(-90deg)}
details>summary{transition:all .2s}
details>summary:hover{opacity:0.85}
.todo-item{background:var(--w3);border:1px solid var(--wb);border-radius:8px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;transition:all .2s}
.todo-item:hover{border-color:var(--sbd2)}
.routine-row{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--w5);align-items:flex-start}
.slide{animation:slideIn .3s ease}
@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.xp-toast{position:fixed;top:16px;right:16px;left:16px;background:linear-gradient(135deg,#00ff88,#00d4ff);color:#040810;padding:10px 18px;border-radius:10px;font-weight:700;font-size:14px;z-index:9999;text-align:center;animation:toastIn .4s ease,toastOut .4s ease 2.2s forwards}
@keyframes toastIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastOut{from{opacity:1}to{opacity:0}}
.quiz-opt{background:var(--wm);border:1px solid var(--wh);border-radius:8px;padding:12px 16px;cursor:pointer;transition:all .2s;font-family:'Cairo',sans-serif;color:var(--t5);font-size:14px;text-align:right;width:100%}
.quiz-opt:hover{border-color:rgba(0,212,255,.4);background:var(--db07)}
.quiz-opt.correct{border-color:#10b981;background:rgba(16,185,129,.15);color:#6ee7b7}
.quiz-opt.wrong{border-color:#ef4444;background:rgba(239,68,68,.15);color:#fca5a5}
.quiz-opt.sel{border-color:#00d4ff;background:var(--db1)}
.matrix-bg{background-image:radial-gradient(circle at 15% 50%,var(--sbg08) 0%,transparent 55%),radial-gradient(circle at 85% 20%,var(--dbbg) 0%,transparent 55%)}
input[type="text"],select{background:var(--w5);border:1px solid var(--w12);color:var(--t0);padding:10px 14px;border-radius:8px;outline:none;font-family:'Fira Code',monospace;font-size:13px}
input[type="text"]:focus,select:focus{border-color:var(--sbd4)}
select option{background:var(--select-bg);color:var(--t0)}
.stat-card{background:linear-gradient(135deg,var(--sbg06),var(--dbbg));border:1px solid var(--sbd15);border-radius:12px;padding:16px}
.pulse{animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.sidebar-glow{box-shadow:inset -1px 0 0 var(--sbd)}
.grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.trk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
.bottom-nav{display:none}
.sidebar-overlay{display:none}
/* Theme toggle button */
.theme-tgl{width:36px;height:36px;border-radius:50%;border:1px solid var(--sbd);background:var(--sbg);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .3s;flex-shrink:0}
.theme-tgl:hover{background:var(--sbg5);transform:rotate(15deg)}
/* Stagger animation for lists */
.stg > *{opacity:0;animation:stgIn .35s ease forwards}
@keyframes stgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.stg > *:nth-child(1){animation-delay:0s}
.stg > *:nth-child(2){animation-delay:.03s}
.stg > *:nth-child(3){animation-delay:.06s}
.stg > *:nth-child(4){animation-delay:.09s}
.stg > *:nth-child(5){animation-delay:.12s}
.stg > *:nth-child(6){animation-delay:.15s}
.stg > *:nth-child(7){animation-delay:.18s}
.stg > *:nth-child(8){animation-delay:.21s}
.stg > *:nth-child(9){animation-delay:.24s}
.stg > *:nth-child(10){animation-delay:.27s}
.stg > *:nth-child(11){animation-delay:.3s}
.stg > *:nth-child(12){animation-delay:.33s}
.stg > *:nth-child(13){animation-delay:.36s}
.stg > *:nth-child(14){animation-delay:.39s}
.stg > *:nth-child(15){animation-delay:.42s}
.stg > *:nth-child(16){animation-delay:.45s}
.stg > *:nth-child(n+17){animation-delay:.48s}
/* Hover lift effect */
.hov-up{transition:all .2s}
.hov-up:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,255,136,.12)}
/* Scale click */
.scale-click:active{transform:scale(.95)}
/* Swipeable tabs */
.swipe-container{overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.swipe-container::-webkit-scrollbar{display:none}
.swipe-container > *{scroll-snap-align:start}
@media(max-width:767px){
  .sidebar-desktop{display:none!important}
  .sidebar-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99}
  .sidebar-mobile{position:fixed;top:0;left:0;bottom:0;width:260px;z-index:100;background:var(--sg);border-right:1px solid var(--sbd15);padding:20px 10px;display:flex;flex-direction:column;gap:3;overflow-y:auto;animation:slideInLeft .25s ease}
  @keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  .bottom-nav{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:200;background:var(--sg);border-top:1px solid var(--sbd15);padding:6px 2px 12px;gap:0;overflow-x:auto;-webkit-overflow-scrolling:touch;justify-content:space-around}
  .bottom-nav::-webkit-scrollbar{display:none}
  .bnav-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 8px;border-radius:8px;cursor:pointer;color:var(--t1);flex-shrink:0;min-width:0;flex:1;max-width:72px;border:1px solid transparent;transition:all .2s;-webkit-tap-highlight-color:transparent}
  .bnav-item.on{background:var(--sbg12);color:#00ff88;border-color:var(--sbd25)}
  .bnav-item span:first-child{font-size:20px}
  .bnav-item span:last-child{font-size:9px;font-family:'Cairo',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
  .btn-g,.btn-o{padding:10px 14px;font-size:13px;min-height:44px}
  input[type="text"],select{font-size:16px;width:100%}
  .res-filters select{width:100%!important}
  .topic-row{padding:10px;min-height:44px;gap:8px}
  .phase-hd{min-height:52px}
  .chk{width:22px;height:22px;min-width:22px}
  .quiz-opt{padding:14px 16px;min-height:52px}
  .nav{min-height:44px}
  .stat-card{padding:12px}
  .res-card{padding:12px}
  .todo-item{padding:12px}
  .grid-2col{grid-template-columns:1fr!important}
  .trk-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))!important}
}
@media(min-width:768px){
  .xp-toast{left:auto;right:24px;top:24px;text-align:left}
  .bottom-nav{display:none!important}
  .sidebar-overlay{display:none!important}
  .sidebar-mobile{display:none!important}
}
@media(min-width:768px)and(max-width:1024px){
  .sidebar-desktop{width:72px!important}
  .sidebar-desktop>div:not(:first-child){display:none}
  .sidebar-desktop .nav{padding:10px;justify-content:center}
  .sidebar-desktop .nav span:last-child{display:none}
  .trk-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))!important}
  main{padding:20px!important}
}
@media(min-width:1200px){
  .trk-grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}
}
`;

// ─────────────────────────────────────────────
//  PROGRAM DATA — 24 MONTHS / 5 PHASES / 80 WEEKS
// ─────────────────────────────────────────────
const PHASES = [
  {
    id:"p0",phase:0,icon:"🏗️",color:"#3b82f6",bg:"rgba(59,130,246,.13)",
    nameAr:"مرحلة الأساسيات",nameEn:"Foundation Phase",
    monthLabel:"الشهر 1–3",startWeek:1,endWeek:12,phaseXP:300,
    desc:"الشبكات + لينكس + البرمجة + أمن أساسي",
    relatedTracks:["foundations"],
    weeks:[
      {wk:1,title:"OSI & TCP/IP Deep Dive",quizId:"wk4",
       missions:["شاهد CCNA بالعربي من IT DOSE (أول 10 فيديوهات)","ارسم نموذج OSI بيدك مع مثال حقيقي لكل طبقة","شغّل Wireshark والتقط HTTPS Packet وحللها"],
       topics:[
         "Layer 1 — Physical: الكابلات والإشارات والـ Hubs",
         "Layer 2 — Data Link: MAC Address وEthernet Frames وARP",
         "Layer 3 — Network: IP Addressing والـ Routing والـ Routers",
         "Layer 4 — Transport: TCP vs UDP والـ Ports والـ Segments",
         "Layer 5 — Session: فتح وإدارة وإغلاق الجلسات",
         "Layer 6 — Presentation: Encoding والتشفير والـ Compression",
         "Layer 7 — Application: HTTP وDNS وFTP وSMTP",
         "TCP/IP Model: مقارنة الـ 4 طبقات بالـ OSI 7 طبقات",
         "IPv4 Addressing: Classes وPrivate vs Public",
         "IPv6: بنية العنوان والفرق عن IPv4",
         "DHCP: عملية DORA (Discover, Offer, Request, Acknowledge)",
         "DNS Record Types: A وAAAA وMX وCNAME وNS وTXT",
         "ARP: Broadcast Request وUnicast Reply وARP Cache",
         "ICMP: Echo Request/Reply وTraceroute وPing",
       ]},
      {wk:2,title:"Network Protocols Deep Dive",quizId:"wk4",
       missions:["استخدم curl لترسل GET وPOST وحلل الـ Headers","جرب Netcat لاتصال TCP بسيط","احتجز PCAP وابحث عن FTP Credentials"],
       topics:[
         "HTTP Methods: GET / POST / PUT / DELETE / PATCH / OPTIONS / HEAD",
         "HTTP Status Codes: 1xx / 2xx / 3xx / 4xx / 5xx مع أمثلة",
         "HTTP Request Headers: Host / User-Agent / Authorization / Content-Type",
         "HTTP Response Headers: Set-Cookie / Location / Cache-Control",
         "HTTPS & TLS: TLS Handshake خطوة بخطوة",
         "TLS Certificates: CA والـ Certificate Chain والـ Public Key",
         "FTP: Active vs Passive Mode / Port 21 / Anonymous Login",
         "SSH: Public Key Authentication / Port 22 / Key Exchange Algorithm",
         "Telnet: Port 23 / لماذا هو خطير (Plaintext)",
         "SMTP: Port 25/587 / Email Delivery Process / MX Lookup",
         "TCP 3-Way Handshake: SYN → SYN-ACK → ACK",
         "TCP 4-Way Termination: FIN → FIN-ACK → ACK",
         "UDP: Connectionless / Faster / DNS وDHCP وVoIP",
         "Well-Known Port Numbers: 20/21/22/23/25/53/80/110/143/443/3306/3389",
       ]},
      {wk:3,title:"Network Tools & Scanning",quizId:"wk4",
       missions:["نفذ Nmap Scan بـ 5 Flags مختلفة وقارن النتائج","استخدم Wireshark Filter لعزل HTTP فقط","ابحث عن VPN مفتوح المصدر وجرب إعداده"],
       topics:[
         "Nmap: Host Discovery بـ -sn (Ping Scan)",
         "Nmap: TCP SYN Scan بـ -sS (Stealth)",
         "Nmap: Service Version Detection بـ -sV",
         "Nmap: OS Detection بـ -O",
         "Nmap: NSE Scripts بـ --script مع أمثلة (vuln / http-title)",
         "Nmap: Output Formats بـ -oN / -oX / -oG",
         "Masscan: سرعة عالية لـ Port Scanning الشبكات الكبيرة",
         "Wireshark: Capture Filters (host / port / net)",
         "Wireshark: Display Filters (http / tcp.port / ip.addr)",
         "Wireshark: Protocol Analysis وتتبع الـ Streams",
         "netstat / ss: عرض الاتصالات النشطة والـ Listening Ports",
         "traceroute / mtr: تتبع مسار الحزم",
         "VPNs: OpenVPN vs WireGuard vs IPSec",
         "Firewall: Stateful vs Stateless / iptables Basics",
       ]},
      {wk:4,title:"🧪 Network Lab Week",quizId:"wk4",
       missions:["افتح TryHackMe Pre-Security Path وأكمل 3 Rooms","حلل 3 PCAP مختلفة واستخرج المعلومات","اجتاز اختبار الأسبوع 4 ✅"],
       topics:[
         "Lab 1: PCAP Analysis — تحديد البروتوكولات المستخدمة",
         "Lab 2: PCAP — استخراج ملفات من HTTP Traffic",
         "Lab 3: PCAP — البحث عن FTP Credentials في النص الواضح",
         "TryHackMe: What is Networking Room",
         "TryHackMe: Intro to LAN Room",
         "TryHackMe: DNS in Detail Room",
         "🎯 WEEK 4 ASSESSMENT — اختبار الشبكات الشامل",
       ]},
      {wk:5,title:"Linux Fundamentals",quizId:"wk8",
       missions:["تعلم 20 أمراً أساسياً عملياً وطبّق كل منها","جرب OverTheWire Bandit Level 0 → 3","افهم File System Hierarchy بالكامل"],
       topics:[
         "Navigation: pwd / ls -la / cd / find / locate / which",
         "File Operations: cp / mv / rm / mkdir / touch / ln",
         "File Viewing: cat / less / more / head / tail / tac",
         "Text Processing: grep -r / awk / sed / cut / sort / uniq",
         "File System: / / /etc / /var / /home / /usr / /tmp / /proc",
         "Permissions: rwx / chmod Numeric (755,644) وSymbolic (+x,-w)",
         "Ownership: chown user:group / chgrp",
         "Users: useradd / passwd / /etc/passwd / /etc/shadow",
         "Groups: groupadd / groups / /etc/group / id",
         "Package Management: apt install/update/upgrade / dpkg",
         "Compression: tar / gzip / zip / unzip",
         "Searching: grep -rn / find -name / locate / whereis",
       ]},
      {wk:6,title:"Linux Intermediate",quizId:"wk8",
       missions:["اكتب سكريبت Bash يؤتمت مهمة يومية كاملة","جرب OverTheWire Bandit Level 4 → 10","تعلم SSH Key Authentication وطبّقها"],
       topics:[
         "Bash: Variables / String Manipulation / Quotes",
         "Bash: Conditionals — if / elif / else / test",
         "Bash: Loops — for / while / until",
         "Bash: Functions / return / local variables",
         "Bash: Arrays / Associative Arrays",
         "Bash: Input/Output Redirection و Pipes (|)",
         "Cron Jobs: crontab -e / Cron Syntax (* * * * *)",
         "SSH: ssh-keygen / authorized_keys / config file",
         "SSH: Local Port Forwarding (-L) / Remote (-R) / Dynamic (-D)",
         "Process Management: ps aux / top / htop / kill / pkill / nice",
         "Networking: ip addr / ifconfig / curl / wget / netcat",
         "Disk: df / du / fdisk / mount / lsblk",
       ]},
      {wk:7,title:"Linux Security & PrivEsc",quizId:"wk8",
       missions:["تعلم UFW وiptables وطبّق Rules أساسية","ادرس /var/log/auth.log وابحث عن Failed Logins","جرب TryHackMe Linux PrivEsc Room"],
       topics:[
         "UFW: ufw allow / ufw deny / ufw enable / ufw status",
         "iptables: INPUT / OUTPUT / FORWARD Chains / Rules",
         "Log Files: /var/log/auth.log / /var/log/syslog / /var/log/dmesg",
         "Log Analysis: grep 'Failed' auth.log / tail -f live monitoring",
         "SUID: find / -perm -4000 2>/dev/null / ما هو خطره",
         "SGID: find / -perm -2000 / استغلال SGID",
         "Sudo Misconfig: sudo -l / ALL nopasswd / sudoers file",
         "Cron Job PrivEsc: PATH Hijacking / Wildcard Injection",
         "Writable Files: find / -writable / /etc/passwd Writable",
         "NFS Misconfig: no_root_squash",
         "Linux Hardening: Disable Root SSH / Minimal Services",
         "CIS Benchmarks for Linux: أهم الـ Controls",
       ]},
      {wk:8,title:"🧪 Linux Lab Week",quizId:"wk8",
       missions:["أكمل OverTheWire Bandit Level 11 → 20","حل TryHackMe Linux Fundamentals 1-2-3","اجتاز اختبار الأسبوع 8 ✅"],
       topics:[
         "Bandit L11: ROT13 Decode",
         "Bandit L12: Hexdump وDecompression المتعدد",
         "Bandit L13: SSH Private Key Login",
         "Bandit L14-20: Ports / Daemons / Cron",
         "TryHackMe: Linux PrivEsc Room",
         "TryHackMe: Linux Fundamentals 3",
         "🎯 WEEK 8 ASSESSMENT — اختبار لينكس الشامل",
       ]},
      {wk:9,title:"Python for Security",quizId:"wk12",
       missions:["شاهد Elzero Python Course (أول 20 فيديو)","اكتب سكريبت يقرأ ملفاً ويعدّل محتواه","استخدم requests مع API حقيقي"],
       topics:[
         "Python: Variables / int / str / float / bool / None",
         "Python: Lists / Tuples / Sets / Dictionaries بعمق",
         "Python: Conditionals / Loops (for / while / break / continue)",
         "Python: Functions / Default Args / *args / **kwargs",
         "Python: Classes / OOP / self / __init__ / Inheritance",
         "Python: File I/O: open() / read() / write() / with statement",
         "Python: Exception Handling: try / except / finally / raise",
         "requests Library: GET / POST / Headers / Params / Session",
         "requests: Response Object / status_code / json() / text",
         "Python Socket: socket() / connect() / send() / recv()",
         "Socket: TCP vs UDP Socket Programming",
         "Basic Port Scanner باستخدام Socket",
       ]},
      {wk:10,title:"Python Security Tools",quizId:"wk12",
       missions:["اكتب Port Scanner كامل مع Banner Grabbing","اكتب Web Scraper يجمع Links","تعلم Regex وطبّقها على Security Patterns"],
       topics:[
         "Port Scanner: TCP Connect Scan + Threading للسرعة",
         "Port Scanner: Banner Grabbing من كل Port مفتوح",
         "Port Scanner: خروج تقرير بالنتائج إلى ملف",
         "Web Scraper: requests + BeautifulSoup4",
         "Web Scraper: استخراج Links / Forms / Hidden Fields",
         "Regex: re.findall() / re.search() / re.sub()",
         "Regex Patterns: IP Addresses / Email / URL / Hash",
         "JSON/XML: json.loads() / json.dumps() / xml.etree",
         "argparse: بناء CLI Tools احترافية",
         "subprocess: تشغيل أوامر النظام من Python",
         "hashlib: MD5 / SHA1 / SHA256 / PBKDF2",
         "os / sys: التعامل مع النظام والملفات",
       ]},
      {wk:11,title:"SQL & JavaScript Basics",quizId:"wk12",
       missions:["ادرس SQL من W3Schools وطبّق كل مثال","تعلم JavaScript Basics من Elzero","جرب SQL Injection بسيطة على DVWA"],
       topics:[
         "SQL SELECT: Basic / WHERE / ORDER BY / LIMIT",
         "SQL: AND / OR / NOT / BETWEEN / LIKE / IN",
         "SQL JOIN: INNER / LEFT / RIGHT / FULL OUTER",
         "SQL: GROUP BY / HAVING / COUNT / SUM / AVG",
         "SQL UNION: ضم نتائج Queries متعددة",
         "SQL INSERT / UPDATE / DELETE",
         "SQLi Concept: Login Bypass بـ ' OR 1=1--",
         "SQLi: Error Messages تكشف Database Version",
         "JavaScript: var / let / const / Hoisting",
         "JavaScript: Functions / Arrow Functions / Callbacks",
         "JavaScript DOM: getElementById / querySelector / innerHTML",
         "XSS Concept: <script>alert(1)</script> في DOM",
       ]},
      {wk:12,title:"🎓 Foundation Exam",quizId:"wk12",
       missions:["راجع كل مواضيع Week 1 → 11 بمذكرات","اجتاز Foundation Final Exam (75%+)","احصل على 🏗️ Foundation Master Badge!"],
       topics:[
         "مراجعة: نموذج OSI والبروتوكولات (Wk 1-2)",
         "مراجعة: أدوات الشبكة والـ Scanning (Wk 3)",
         "مراجعة: أوامر Linux والصلاحيات (Wk 5-6)",
         "مراجعة: Linux Security والـ PrivEsc (Wk 7)",
         "مراجعة: Python الأساسيات والأدوات (Wk 9-10)",
         "مراجعة: SQL وJavaScript والـ Injection (Wk 11)",
         "🎓 Foundation Final Exam — 75%+ للنجاح",
         "🏗️ Foundation Master Badge مكتسبة!",
         "📜 Certificate of Foundation Phase",
       ]},
    ]
  },
  {
    id:"p1",phase:1,icon:"🌐",color:"#10b981",bg:"rgba(16,185,129,.13)",
    nameAr:"مرحلة إتقان الويب",nameEn:"Web Mastery Phase",
    monthLabel:"الشهر 4–7",startWeek:13,endWeek:28,phaseXP:600,
    desc:"Web Pentesting + OWASP Top 10 + Bug Bounty Methodology",
    relatedTracks:["web"],
    weeks:[
      {wk:13,title:"Web Fundamentals & HTTP",quizId:"wk16",
       missions:["ادرس كل HTTP Header بمثال عملي","إعداد Burp Suite Community مع FoxyProxy","اقرأ OWASP Top 10 Overview كاملاً"],
       topics:[
         "كيف يعمل الويب: Browser → DNS → Server → Response",
         "HTTP Methods: GET / POST / PUT / DELETE / PATCH / OPTIONS",
         "HTTP Status Codes: 200 / 201 / 301 / 302 / 400 / 401 / 403 / 404 / 500",
         "Request Headers: Host / Referer / User-Agent / Cookie / Authorization",
         "Response Headers: Content-Type / Set-Cookie / Location / X-Powered-By",
         "Cookies: Domain / Path / Secure / HttpOnly / SameSite",
         "Sessions: Session ID / Cookie vs Token Based Auth",
         "Burp Suite: تنزيل وإعداد Community Edition",
         "Burp Suite: FoxyProxy + CA Certificate",
         "Burp Suite: Proxy / Intercept / HTTP History",
         "Web App Architecture: Frontend / Backend / Database / APIs",
         "Same-Origin Policy: ما هي وكيف تحمي",
       ]},
      {wk:14,title:"Burp Suite Mastery",quizId:"wk16",
       missions:["جرب كل أدوات Burp Suite بالتفصيل","حل PortSwigger Apprentice Labs 1-5","تعلم HTTPS وTLS بعمق"],
       topics:[
         "Burp Proxy: تفعيل / إيقاف Interception / Forward / Drop",
         "Burp Proxy: Match & Replace Rules",
         "Burp Repeater: إرسال Requests يدوياً وتعديل Parameters",
         "Burp Repeater: مقارنة Responses بين Requests",
         "Burp Intruder: Sniper / Battering Ram / Pitchfork / Cluster Bomb",
         "Burp Intruder: Payload Sets / Wordlists / Grep Match",
         "Burp Scanner: Active Scan / Passive Scan",
         "Burp Decoder: Base64 / URL / HTML / Hex Encoding",
         "Burp Comparer: مقارنة Responses للكشف عن فروق",
         "Burp Extensions: HUNT Suite / Autorize / Param Miner",
         "TLS Handshake: ClientHello / ServerHello / Certificate",
         "Certificate Pinning: ما هو ودوره في الأمان",
       ]},
      {wk:15,title:"SQL Injection Complete",quizId:"wk16",
       missions:["ادرس SQLi من PortSwigger بالكامل","حل 5 Labs (Error + Blind + UNION)","تعلم sqlmap مع خيارات متقدمة"],
       topics:[
         "SQLi: اكتشاف نقطة الحقن (quote test / error)",
         "Error-Based SQLi: extractvalue() / updatexml()",
         "UNION-Based SQLi: ORDER BY → UNION SELECT NULL",
         "UNION-Based: استخراج DB Name / Tables / Columns",
         "Blind Boolean SQLi: AND 1=1 / AND 1=2",
         "Blind Boolean: تخمين Characters بيت بيت",
         "Time-Based Blind SQLi: SLEEP() / BENCHMARK()",
         "Out-of-Band SQLi: DNS Lookup / HTTP Request",
         "SQLi في Login: Bypass Authentication",
         "SQLi في ORDER BY وGROUP BY",
         "sqlmap: -u / --dbs / -D / --tables / -T / --dump",
         "sqlmap: --level / --risk / --tamper Scripts",
         "Prevention: Prepared Statements / Parameterized Queries",
       ]},
      {wk:16,title:"🧪 XSS & CSRF Lab",quizId:"wk16",
       missions:["حل 5 Labs XSS على PortSwigger (Reflected+Stored+DOM)","ادرس CSRF وجرب CSRF PoC Generator","اجتاز اختبار الأسبوع 16 ✅"],
       topics:[
         "XSS Reflected: Payload في URL → مباشرة في HTML",
         "XSS Stored: Payload يُخزّن في DB ويُعرض لكل زوار",
         "XSS DOM-Based: Payload يُنفّذ في DOM بدون Server",
         "XSS Payloads: <script>alert(1)</script> / img onerror / svg",
         "XSS Filter Bypass: Case / Encoding / Nested Tags",
         "XSS Context: HTML / JS / Attribute / URL Context",
         "XSS Impact: Cookie Theft / Keylogger / Defacement",
         "CSRF: Cross-Site Request Forgery — المفهوم والهجوم",
         "CSRF PoC: HTML Form يُرسل Request مزوّر",
         "CSRF Bypass: Weak Token / Missing Token / Referer Check",
         "Anti-CSRF: CSRF Tokens / SameSite Cookie / CORS",
         "Lab: DVWA XSS Low → Medium → High",
         "🎯 WEEK 16 ASSESSMENT",
       ]},
      {wk:17,title:"IDOR & Broken Access Control",quizId:"wk20",
       missions:["ادرس IDOR من HowToHunt Methodology","حل PortSwigger Access Control Labs (10+)","جرب Autorize Burp Extension"],
       topics:[
         "IDOR/BOLA: تغيير ID في URL/Body/Header",
         "IDOR: Horizontal Privilege Escalation",
         "IDOR: Vertical Privilege Escalation",
         "IDOR: في GUIDs وغير رقمية",
         "Broken Authentication: Weak Passwords / Default Creds",
         "Session Management: Session Fixation / Hijacking",
         "JWT Structure: Header.Payload.Signature",
         "JWT Attack: None Algorithm (alg:none)",
         "JWT Attack: Weak Secret Bruteforce بـ jwt_tool",
         "JWT Attack: Algorithm Confusion RS256 → HS256",
         "Password Reset Flaws: Weak Token / Host Header Injection",
         "2FA Bypass: Response Manipulation / Code Reuse",
         "Autorize Extension: اختبار الـ Authorization تلقائياً",
       ]},
      {wk:18,title:"File Upload & Path Traversal",quizId:"wk20",
       missions:["حل PortSwigger File Upload Labs كاملاً","ادرس Path Traversal بكل Techniques","جرب DVWA File Upload Module كل Levels"],
       topics:[
         "File Upload: Content-Type Bypass (image/jpeg → text/php)",
         "File Upload: Extension Bypass (.php.jpg / .phtml / .php5)",
         "File Upload: Magic Bytes Bypass (GIF89a;<?php)",
         "File Upload: Null Byte Injection (file.php%00.jpg)",
         "File Upload: اكتشاف مسار الرفع",
         "Path Traversal: ../../etc/passwd",
         "Path Traversal: URL Encoding (%2e%2e%2f)",
         "Path Traversal: Double Encoding (%252e%252e%252f)",
         "LFI: Local File Inclusion — قراءة ملفات النظام",
         "LFI: PHP Wrappers (php://filter/convert.base64-encode)",
         "LFI to RCE: عبر Log Poisoning",
         "RFI: Remote File Inclusion (إذا كان allow_url_include مفعلاً)",
         "Prevention: Allowlist Extensions / Store Outside Web Root",
       ]},
      {wk:19,title:"Command Injection & Advanced Attacks",quizId:"wk20",
       missions:["حل Command Injection Labs على PortSwigger","ادرس SSRF بعمق مع Cloud Metadata","تعلم XXE مع كل Payloads"],
       topics:[
         "OS Command Injection: ; / | / && / || / backticks",
         "Blind Command Injection: Time-Based بـ sleep",
         "Blind Command Injection: Out-of-Band بـ DNS/HTTP",
         "SSRF: Server-Side Request Forgery — المفهوم والأثر",
         "SSRF: داخل الـ Network (AWS Metadata 169.254.169.254)",
         "SSRF: Bypass Filters بـ IP Variants وDNS Rebinding",
         "SSRF to RCE: عبر Internal Services",
         "XXE: XML External Entity — قراءة ملفات النظام",
         "XXE: Blind XXE بـ Out-of-Band",
         "XXE: XXE via SVG / DOCX / XLSX",
         "Open Redirect: تحويل المستخدم لـ Phishing",
         "SSTI: Server-Side Template Injection ({{7*7}})",
         "SSTI: Jinja2 / Twig / Freemarker Payloads للـ RCE",
       ]},
      {wk:20,title:"🧪 Web Core Lab Week",quizId:"wk20",
       missions:["حل 10 Labs Mixed على PortSwigger بمستوى Practitioner","جرب OWASP Juice Shop جميع Challenges","اجتاز اختبار الأسبوع 20 ✅"],
       topics:[
         "Lab: PortSwigger Mixed SQLi + XSS + CSRF",
         "Lab: PortSwigger SSRF + XXE + Command Injection",
         "Lab: PortSwigger Access Control + IDOR",
         "Lab: DVWA Low → High لكل Category",
         "OWASP Juice Shop: Score Board وكل Challenges",
         "Lab: تسلسل ثغرات متعددة في Attack Chain",
         "🎯 WEEK 20 ASSESSMENT — Web Core",
       ]},
      {wk:21,title:"Advanced Web Attacks",quizId:"wk28",
       missions:["ادرس JWT Algorithm Confusion بعمق","حل Race Conditions Labs على PortSwigger","تعلم HTTP Request Smuggling نظرياً وعملياً"],
       topics:[
         "JWT Algorithm Confusion: RS256 → HS256 هجوم كامل",
         "JWT Bypass: Embedded JWK / Kid Injection / X5U",
         "Race Conditions: Limit Overrun / Partial Construction",
         "Race Conditions: Turbo Intruder للاستغلال السريع",
         "HTTP Request Smuggling: CL.TE وTE.CL وTE.TE",
         "Smuggling: Bypass Front-End Security / Cache Poisoning",
         "OAuth 2.0: Authorization Code Flow",
         "OAuth Attacks: Open Redirect / CSRF / State Bypass",
         "CORS Misconfigurations: null Origin / Wildcard",
         "Business Logic: Price Manipulation / Negative Quantities",
         "Business Logic: Workflow Bypass / Step Skipping",
         "Web Cache Poisoning: Cache-Control وVary Headers",
       ]},
      {wk:22,title:"Recon & Asset Discovery",quizId:"wk28",
       missions:["تعلم subfinder وamass وأكمل Recon على هدف تجريبي","جرب ffuf وgobuster للـ Content Discovery","مارس 20 Google Dork مختلف"],
       topics:[
         "Subfinder: اكتشاف Subdomains بـ APIs المتعددة",
         "Amass: In-depth Enumeration بـ Active/Passive",
         "Assetfinder: سريع وخفيف للـ Bug Bounty",
         "httpx: فلترة Subdomains الحية",
         "ffuf: Content Discovery بـ Wordlists",
         "gobuster: Dir / DNS / VHost Modes",
         "feroxbuster: Recursive Directory Busting",
         "Google Dorks: site: / inurl: / intitle: / filetype:",
         "Google Dorks: للبحث عن Config Files وBackups",
         "GitHub Dorking: secrets / API Keys في Repos",
         "Shodan Dorks: البحث عن Exposed Services",
         "Censys & Fofa: مقارنة وأفضل استخدام",
         "crt.sh: Certificate Transparency للـ Subdomains",
         "Wayback Machine: URLScan لإيجاد Endpoints قديمة",
       ]},
      {wk:23,title:"Bug Bounty Methodology",quizId:"wk28",
       missions:["اقرأ Jason Haddix Methodology v4 كاملاً","تصفح HackerOne Hacktivity لـ 1 ساعة","اقرأ 3 Writeups كاملة وحلّلها"],
       topics:[
         "اختيار البرنامج: HackerOne / Bugcrowd / Intigriti / Synack",
         "قراءة Scope وProgram Policy (أهم خطوة!)",
         "Target Selection: الأهداف عالية الفائدة",
         "Methodology: Recon → Mapping → Testing → Reporting",
         "Asset Types: Web / Mobile / API / Infrastructure",
         "دراسة Disclosed Reports: كيف يفكر الـ Hackers الناجحون",
         "كتابة Report احترافي: Title / Impact / Steps / POC",
         "CVSS Scoring: تحديد خطورة الثغرة (Low/Medium/High/Critical)",
         "Triage Process: كيف تتعامل مع Triager",
         "Duplicate: كيف تتجنبه وماذا تفعل إذا حدث",
         "Responsible Disclosure: Ethics وقواعد الـ Bug Bounty",
         "المطالبة بالمكافأة: Negotiation وPayout Process",
       ]},
      {wk:24,title:"First Live Bug Hunt 🎯",quizId:"wk28",
       missions:["اختر برنامج Bug Bounty حقيقي على HackerOne","ابدأ Recon كامل وابنِ Asset Map","اكتب أول Report حتى لو Information Only"],
       topics:[
         "اختيار البرنامج الأول: Easy/Large Scope للمبتدئين",
         "Recon كامل: Subdomains → httpx → Screenshotter",
         "Passive Recon: Wayback / GitHub / Shodan للهدف",
         "Mapping: رسم خريطة للـ Endpoints والـ APIs",
         "اختبار Authentication: Login / Register / Reset",
         "اختبار Access Control: IDOR بين Accounts",
         "Low-Hanging Fruit: CORS / Subdomain Takeover / Open Redirect",
         "كتابة Report: حتى لو Information Disclosure بسيطة",
         "Submission: منصة HackerOne / رسالة احترافية",
         "Platform Etiquette: احترام قرارات الـ Triager",
       ]},
      {wk:25,title:"Automation & Nuclei",quizId:"wk28",
       missions:["تعلم Nuclei Templates واكتب Custom واحد","جرب dalfox للـ XSS Automation","ابنِ Pipeline بسيط لـ Recon تلقائي"],
       topics:[
         "Nuclei: تنزيل وإعداد / nuclei -u / -l",
         "Nuclei Templates: YAML Structure / Matchers / Extractors",
         "Nuclei: Community Templates (CVEs / Exposures / Misconfigs)",
         "Nuclei: كتابة Custom Template من الصفر",
         "dalfox: XSS Scanning Automated",
         "ParamSpider: اكتشاف Parameters من Wayback",
         "gf Patterns: تصفية URLs بـ Patterns مخصصة",
         "Automation Pipeline: subfinder | httpx | nuclei",
         "Burp Extensions: Active Scan++ / Param Miner",
         "Burp: Custom Scan Configurations",
         "Rate Limiting في الـ Automation: -rate-limit",
         "Reporting Automation: ملفات JSON/Markdown للنتائج",
       ]},
      {wk:26,title:"Hardening & WAF Bypass",quizId:"wk28",
       missions:["ادرس Security Headers وطبّق كل Header","تعلم WAF Bypass Techniques عملياً","راجع OWASP Top 10 2021 كاملاً"],
       topics:[
         "Content-Security-Policy (CSP): Directives وBypass",
         "X-Frame-Options: Clickjacking Protection",
         "Strict-Transport-Security (HSTS): Preloading",
         "X-Content-Type-Options: nosniff",
         "Referrer-Policy: Origin / Same-Origin",
         "Permissions-Policy: Restricting Features",
         "WAF Bypass: Case Variation (SeLeCT)",
         "WAF Bypass: URL Encoding (%27 = ')",
         "WAF Bypass: HTML Entities (&#39;)",
         "WAF Bypass: Comments (SEL/**/ECT)",
         "WAF Bypass: Unicode Normalization",
         "CORS Misconfiguration: Null Origin / Regex Bypass",
         "Prototype Pollution: معنى الثغرة وكيف تُستغل",
       ]},
      {wk:27,title:"Expert PortSwigger Labs",quizId:"wk28",
       missions:["حل 5 Expert Labs على PortSwigger (أصعب مستوى)","شاهد Rana Khalil Video Series كاملاً","اقرأ 3 مقالات من PortSwigger Research"],
       topics:[
         "Expert SQLi: Multi-Level Blind / Out-of-Band",
         "Expert XSS: CSP Bypass / Angular Template Injection",
         "Expert Auth: JWT Algorithm Confusion كامل",
         "Expert SSRF: Blind SSRF بـ Out-of-Band",
         "Expert XXE: Blind XXE via Repurposed Local DTD",
         "Expert Smuggling: Chained Attacks مع Cache Poisoning",
         "Chained Vulnerabilities: SSRF → XXE → RCE",
         "Chained: Open Redirect → OAuth Token Theft",
         "BSCP Exam Strategy: Time Management والـ Approach",
         "Web Security Researcher Mindset: التفكير خارج الصندوق",
       ]},
      {wk:28,title:"🎓 Web Mastery Exam",quizId:"wk28",
       missions:["راجع كل Web Topics من Week 13→27","اجتاز Web Mastery Final Exam (75%+)","احصل على 🌐 Web Warrior Badge!"],
       topics:[
         "مراجعة: HTTP وBurp Suite (Wk 13-14)",
         "مراجعة: SQLi وXSS وCSRF (Wk 15-16)",
         "مراجعة: IDOR وFile Upload وPath Traversal (Wk 17-18)",
         "مراجعة: SSRF وXXE وCommand Injection (Wk 19)",
         "مراجعة: Advanced Attacks والـ Automation (Wk 21-25)",
         "مراجعة: Bug Bounty والـ Methodology (Wk 22-24)",
         "🎓 Web Mastery Final Exam — 75%+ للنجاح",
         "🌐 Web Warrior Badge مكتسبة!",
         "📜 Certificate of Web Mastery",
       ]},
    ]
  },
  {
    id:"p2",phase:2,icon:"📱",color:"#f59e0b",bg:"rgba(245,158,11,.13)",
    nameAr:"مرحلة الموبايل والـ API",nameEn:"Mobile & API Phase",
    monthLabel:"الشهر 8–10",startWeek:29,endWeek:40,phaseXP:450,
    desc:"Android Pentesting + API Security + Mobile Bug Bounty",
    relatedTracks:["mobile","api"],
    weeks:[
      {wk:29,title:"Android Architecture",quizId:"wk33",
       missions:["ادرس Android Components الأربعة بعمق","تعلم ADB 15 أمراً أساسياً وطبّقها","فكك APK تجريبي بـ apktool وافهم الهيكل"],
       topics:[
         "Android System Architecture: Linux Kernel / HAL / Runtime / Framework",
         "Dalvik vs ART: آلة Java الافتراضية للأندرويد",
         "Activity: دورة الحياة (onCreate→onResume→onPause→onDestroy)",
         "Service: Background Tasks / Foreground Service / Bound Service",
         "BroadcastReceiver: الاستجابة للأحداث النظامية",
         "ContentProvider: مشاركة البيانات بين التطبيقات",
         "AndroidManifest.xml: Permissions / Activities / Services",
         "Intents: Explicit وImplicit / Intent Extras",
         "APK Structure: classes.dex / resources.arsc / AndroidManifest.xml",
         "ADB: adb devices / adb shell / adb push / adb pull",
         "ADB: adb logcat / adb install / adb uninstall",
         "ADB: adb forward / adb reverse للـ Port Forwarding",
         "Android Emulator: إعداد AVD بـ Android Studio",
         "apktool: فك وإعادة بناء APK",
       ]},
      {wk:30,title:"Static Analysis",quizId:"wk33",
       missions:["فكّك APK حقيقي بـ JADX-GUI وحلل الكود","ابحث عن Hardcoded Secrets وAPI Keys","جرب MobSF على 3 تطبيقات مختلفة"],
       topics:[
         "JADX-GUI: فتح APK وعرض Java/Kotlin Decompiled Code",
         "JADX-GUI: البحث في الكود (Ctrl+F) عن Keywords",
         "Manifest Analysis: Exported Activities / Services",
         "Manifest Analysis: Dangerous Permissions / Custom Permissions",
         "Hardcoded Secrets: API Keys / Passwords / Endpoints",
         "Insecure Storage: SharedPreferences / SQLite / External Storage",
         "Insecure Logging: Log.d() في Production Code",
         "Weak Cryptography: MD5 / SHA1 / ECB Mode",
         "Certificate Pinning Implementation تحليل",
         "WebView Security: setJavaScriptEnabled / addJavascriptInterface",
         "MobSF: رفع APK والحصول على تقرير Security",
         "MobSF: Static Analysis Score / Findings تفصيلية",
         "apkleaks: استخراج Secrets تلقائياً",
       ]},
      {wk:31,title:"Dynamic Analysis & Frida",quizId:"wk33",
       missions:["اكتب Frida Script يـ Hook دالة بسيطة","Bypass SSL Pinning على تطبيق تجريبي","أعد ضبط Burp مع المحاكي لاعتراض Traffic"],
       topics:[
         "Dynamic Analysis: تشغيل التطبيق ومراقبة سلوكه",
         "Frida: ما هو وكيف يعمل / frida-server على الجهاز",
         "Frida: frida-ps -U / frida -U -n com.app",
         "Frida Script: Java.use() / .implementation = / overload()",
         "Frida: Hooking Constructor / Static Methods / Overloaded Methods",
         "SSL Pinning: ما هو وكيف يمنع اعتراض الحركة",
         "SSL Pinning Bypass: Frida Script (Universal Bypass)",
         "SSL Pinning Bypass: Objection — objection -g com.app explore",
         "Objection: android sslpinning disable / memory search",
         "Burp + Emulator: Proxy Settings / CA Certificate Install",
         "Runtime Traffic Analysis: اعتراض وتعديل Requests",
         "Root Detection Bypass: Frida / Magisk Hide",
         "Emulator Detection: Bypass Techniques",
       ]},
      {wk:32,title:"OWASP Mobile Top 10",quizId:"wk33",
       missions:["ادرس OWASP MASTG بالكامل (المفاهيم)","جرب DIVA Android كل Challenges","اقرأ 3 Mobile Bug Reports من HackerOne"],
       topics:[
         "M1: Improper Credential Usage — Hardcoded / Exposed",
         "M2: Inadequate Supply Chain Security",
         "M3: Insecure Authentication/Authorization",
         "M4: Insufficient Input/Output Validation (SQLi / XSS في WebView)",
         "M5: Insecure Communication (HTTP / Weak TLS / No Pinning)",
         "M6: Inadequate Privacy Controls — تسريب PII",
         "M7: Insufficient Binary Protections (No Obfuscation / Anti-Tamper)",
         "M8: Security Misconfiguration (Debug Mode / Backup Enabled)",
         "M9: Insecure Data Storage (External / SharedPreferences Plain)",
         "M10: Insufficient Cryptography (Weak Keys / ECB Mode)",
         "DIVA Android: اختبار الـ 13 Challenge كاملاً",
         "Mobile Bug Bounty: قراءة Reports من HackerOne",
         "Mobile Report Writing: Impact + Reproduction Steps",
       ]},
      {wk:33,title:"🧪 Mobile Lab Week",quizId:"wk33",
       missions:["حل InjuredAndroid 10 Flags","اكتب Frida Script يـ Bypass Root Detection","اجتاز اختبار الأسبوع 33 ✅"],
       topics:[
         "InjuredAndroid: Flag 1 — Resources Strings",
         "InjuredAndroid: Flag 2 — Exported Activity",
         "InjuredAndroid: Flag 3 — SQLite Database",
         "InjuredAndroid: Flag 4 — Shared Preferences",
         "InjuredAndroid: Flag 5 — Password Check Bypass",
         "InjuredAndroid: Flag 6 — Login 2 / ADB",
         "InjuredAndroid: Flag 7-10 — Advanced Challenges",
         "Frida: Advanced Root Detection Bypass Script",
         "🎯 WEEK 33 ASSESSMENT — Mobile Security",
       ]},
      {wk:34,title:"API Fundamentals",quizId:"wk36",
       missions:["ادرس REST API Architecture بعمق","تعلم Postman وInsomnia وطبّق كل شيء","جرب vAPI Lab أول 5 Challenges"],
       topics:[
         "REST Architecture: Resources / Stateless / Client-Server",
         "HTTP Methods في APIs: GET / POST / PUT / PATCH / DELETE",
         "API Endpoints: Versioning (v1/v2) / Base URL",
         "Request Body: JSON / XML / Form-Data / Multipart",
         "Authentication: API Key / Basic Auth / Bearer Token",
         "JWT في APIs: Structure / Validation / Claims",
         "OAuth 2.0: Authorization Code / Client Credentials / Implicit",
         "API Documentation: Swagger UI / OpenAPI 3.0 / Postman Collection",
         "Postman: Collections / Variables / Environments",
         "Postman: Pre-request Scripts / Tests / Assertions",
         "Insomnia: REST / GraphQL / gRPC Testing",
         "Rate Limiting: Tokens / Window Size / Bypass Attempts",
       ]},
      {wk:35,title:"OWASP API Security Top 10",quizId:"wk36",
       missions:["ادرس كل OWASP API Vulnerability بعمق","حل vAPI كل Challenges","جرب crAPI Lab"],
       topics:[
         "API1 - BOLA/BFLA: Broken Object Level Authorization",
         "API1: تغيير User ID في Request للوصول لبيانات آخرين",
         "API2 - Broken Authentication: Weak Tokens / JWT Issues",
         "API3 - Broken Object Property Level Auth: Mass Assignment",
         "API3: إرسال isAdmin=true في Body",
         "API4 - Unrestricted Resource Consumption: Rate Limiting Bypass",
         "API5 - Broken Function Level Authorization: Admin Endpoints",
         "API6 - Unrestricted Access to Sensitive Business Flows",
         "API7 - Server Side Request Forgery",
         "API8 - Security Misconfiguration: Debug / CORS / Error Messages",
         "API9 - Improper Inventory Management: Undocumented Endpoints",
         "API10 - Unsafe Consumption of APIs: Third-Party Trust Issues",
         "GraphQL Security: Introspection / Deep Queries / Batch Attacks",
       ]},
      {wk:36,title:"🧪 API Lab Week",quizId:"wk36",
       missions:["أكمل crAPI كل Challenges","جرب DVGA GraphQL","اجتاز اختبار الأسبوع 36 ✅"],
       topics:[
         "crAPI: Challenge 1 — Access Other User Vehicle",
         "crAPI: Challenge 2 — Reset Other User Password",
         "crAPI: Challenge 3 — Delete Video Without Owning",
         "crAPI: Challenge 4 — Find Leaked Sensitive Data in Response",
         "crAPI: Challenge 5 — Perform Privileged Action",
         "Damn Vulnerable GraphQL: Introspection / SQL Injection",
         "API Fuzzing: ffuf مع API Endpoints و Body",
         "API Testing: Param Miner لاكتشاف Hidden Parameters",
         "🎯 WEEK 36 ASSESSMENT — API Security",
       ]},
      {wk:37,title:"Advanced Mobile Attacks",quizId:"wk40",
       missions:["ادرس Deeplink Hijacking بعمق","جرب Intent Redirection عملياً","ادرس Exported Components Abuse"],
       topics:[
         "Deeplink: ما هي وكيف يمكن اختطافها",
         "Deeplink Hijacking: إعادة توجيه Links للتطبيق المخترق",
         "Intent: Explicit vs Implicit / Intent Extras",
         "Intent Redirection: Stealing Intents من Exported Activities",
         "Exported Components: Activity / Service / Provider مكشوفة",
         "WebView: addJavascriptInterface → RCE",
         "WebView: shouldOverrideUrlLoading Bypass",
         "Broadcast Receiver: Stealing Broadcasts المكشوفة",
         "Content Provider: SQL Injection / Path Traversal",
         "Pending Intents: Misuse وسرقة Permissions",
         "Task Hijacking: استبدال Task Stack",
         "Clipjacking: قراءة Clipboard بدون إذن",
       ]},
      {wk:38,title:"API Advanced Hunting",quizId:"wk40",
       missions:["ابحث عن API Keys في GitHub بـ Dorking","تعلم IDOR عبر APIs بشكل متقدم","جرب API Fuzzing بـ ffuf على Target حقيقي"],
       topics:[
         "API Key Leakage: GitHub Dorks (apikey / api_key / token)",
         "API Key Leakage: Wayback Machine لـ Old Endpoints",
         "API Key Testing: صلاحيات الـ Key وامكانية الـ Abuse",
         "IDOR via API: تغيير IDs في Path / Query / Body",
         "IDOR via API: UUID Prediction / Enumeration",
         "Rate Limit Bypass: IP Rotation / Header Manipulation",
         "Auth Token Analysis: JWT / Opaque Tokens / Session Cookies",
         "API Fuzzing: ffuf -u / -w / -X / -d / -H",
         "API Fuzzing: اكتشاف Hidden Endpoints والـ Methods",
         "Nuclei: API Templates للـ Automated Scanning",
         "Postman: Automated Tests مع Collection Runner",
         "API Report Writing: CVSS + Impact + POC",
       ]},
      {wk:39,title:"Mobile + API Integration Testing",quizId:"wk40",
       missions:["ابحث عن API Hidden في تطبيق Android حقيقي","حلل Traffic التطبيق بالكامل لمدة 30 دقيقة","اكتب Combined Report بكل ما وجدت"],
       topics:[
         "Combined Testing: Intercept Mobile App API Calls",
         "MITM على Mobile App: Burp + Emulator + SSL Bypass",
         "API Discovery من APK: Hard-coded Endpoints / BaseURL",
         "API Discovery: MobSF Findings + Manual Verification",
         "API IDOR via Mobile: اختبار كل Endpoint مكتشف",
         "Business Logic: Mobile Workflow Bypass",
         "Parameter Tampering: Mobile → API Params",
         "Combined Vulnerability: Mobile Auth Bypass → API IDOR",
         "Comprehensive Mobile Report: Structure وContent",
         "Video Walkthrough: توثيق الاستغلال بالفيديو",
       ]},
      {wk:40,title:"🎓 Mobile & API Exam",quizId:"wk40",
       missions:["راجع كل Mobile + API Topics","اجتاز Mobile & API Final Exam (75%+)","احصل على 📱 Mobile Expert Badge!"],
       topics:[
         "مراجعة: Android Architecture وADB (Wk 29)",
         "مراجعة: Static Analysis وJADX وMobSF (Wk 30)",
         "مراجعة: Frida وSSL Pinning Bypass (Wk 31)",
         "مراجعة: OWASP Mobile Top 10 (Wk 32)",
         "مراجعة: API Security وOWASP API Top 10 (Wk 34-35)",
         "مراجعة: Advanced Attacks وHunting (Wk 37-38)",
         "🎓 Mobile & API Final Exam — 75%+ للنجاح",
         "📱 Mobile Expert Badge مكتسبة!",
         "📜 Certificate of Mobile & API Security",
       ]},
    ]
  },
  {
    id:"p3",phase:3,icon:"🏰",color:"#ef4444",bg:"rgba(239,68,68,.13)",
    nameAr:"مرحلة البنية التحتية",nameEn:"Infrastructure Phase",
    monthLabel:"الشهر 11–15",startWeek:41,endWeek:60,phaseXP:700,
    desc:"Network Pentest + Active Directory + OSINT + Cloud + DFIR + Wireless",
    relatedTracks:["network","ad","osint","cloud","dfir","wireless"],
    weeks:[
      {wk:41,title:"Network Scanning & Enumeration",quizId:"wk44",
       missions:["نفّذ Nmap Full Scan بكل Options المهمة","جرب Masscan على Subnet كامل","ادرس SMB Enumeration بـ enum4linux"],
       topics:[
         "Nmap: -sn Ping Scan / -sS SYN / -sU UDP / -sV Service",
         "Nmap: -A Aggressive (OS + Service + Scripts + Traceroute)",
         "Nmap: -O OS Detection / --osscan-guess",
         "Nmap: NSE Scripts — --script=vuln / http-title / smb-os-discovery",
         "Nmap: Timing Templates -T0 → -T5",
         "Masscan: --rate / -p / --range / أسرع من Nmap",
         "Service Enumeration: Banner Grabbing بـ Netcat",
         "SMB Enumeration: enum4linux-ng / smbclient / smbmap",
         "NFS Enumeration: showmount -e / nfs Mounting",
         "SNMP Enumeration: snmpwalk / onesixtyone / Community Strings",
         "LDAP Enumeration: ldapsearch / Anonymous Bind",
         "Vulnerability Scanning: OpenVAS / Greenbone",
       ]},
      {wk:42,title:"Network Exploitation",quizId:"wk44",
       missions:["تعلم Metasploit Framework بالكامل عملياً","جرب Responder على Lab Network","ادرس Pass-the-Hash بـ CrackMapExec"],
       topics:[
         "Metasploit: msfconsole / search / use / info / show options",
         "Metasploit: set RHOSTS / RPORT / LHOST / LPORT / run",
         "Metasploit: Meterpreter Shell — sysinfo / getuid / hashdump",
         "Metasploit: Post-Exploitation Modules / migrate",
         "Responder: LLMNR/NBT-NS Poisoning آلية العمل",
         "Responder: التقاط NTLMv2 Hashes من الشبكة",
         "Password Cracking: Hashcat -m 5600 لـ NTLMv2",
         "Password Cracking: John the Ripper / Wordlists",
         "Pass-the-Hash: CrackMapExec -u / -H / --shares",
         "SMB Exploitation: EternalBlue / MS17-010",
         "Relay Attacks: NTLM Relay بـ impacket ntlmrelayx",
         "CrackMapExec: Network Sweep / Credential Spraying",
       ]},
      {wk:43,title:"Post-Exploitation",quizId:"wk44",
       missions:["تعلم Pivoting بـ chisel وSSH","ادرس Linux PrivEsc Methods كلها","جرب Windows PrivEsc على VM"],
       topics:[
         "Pivoting: chisel Server + Client / SOCKS5 Proxy",
         "Pivoting: SSH -D Dynamic Port Forwarding",
         "Pivoting: socat Relay / Metasploit Route",
         "Linux PrivEsc: Sudo -l Misconfiguration",
         "Linux PrivEsc: SUID Binary Exploitation",
         "Linux PrivEsc: Cron Job Path Hijacking / Wildcard",
         "Linux PrivEsc: Writable /etc/passwd",
         "Linux PrivEsc: Capabilities (cap_setuid)",
         "Windows PrivEsc: Unquoted Service Path",
         "Windows PrivEsc: Weak Service Permissions",
         "Windows PrivEsc: Token Impersonation (Potato Attacks)",
         "Windows PrivEsc: AlwaysInstallElevated",
         "Persistence: Cron / Registry Run Keys / Scheduled Tasks",
         "Covering Tracks: Clear Logs / Timestomping",
       ]},
      {wk:44,title:"🧪 Network Lab Week",quizId:"wk44",
       missions:["حل VulnHub Machine من الصفر بدون Hints","جرب HackTheBox Starting Point (3 Machines)","اجتاز اختبار الأسبوع 44 ✅"],
       topics:[
         "VulnHub Machine: Recon → Enumeration → Initial Access",
         "VulnHub Machine: Privilege Escalation → Root",
         "HackTheBox Starting Point: Tier 0 (Meow / Fawn / Dancing)",
         "HackTheBox Starting Point: Tier 1 (Appointment / Sequel)",
         "Full Pentest Report: Executive Summary + Technical Details",
         "Pentest Report: Findings / Risk / Remediation",
         "🎯 WEEK 44 ASSESSMENT — Network Pentesting",
       ]},
      {wk:45,title:"Active Directory Fundamentals",quizId:"wk48",
       missions:["ادرس AD Architecture وKerberos بعمق","إعداد BloodHound + SharpHound في Lab","تعلم PowerView Enumeration"],
       topics:[
         "AD Architecture: Domain / Tree / Forest / Trust",
         "Domain Controller: FSMO Roles / Global Catalog",
         "Kerberos: Authentication Protocol خطوة بخطوة",
         "Kerberos: TGT (Ticket Granting Ticket) Process",
         "Kerberos: TGS (Ticket Granting Service) Process",
         "LDAP: Queries للبحث في AD (ldapsearch)",
         "SAMAccountName: User ID Format في Windows",
         "NTLM: Hash Authentication (Legacy) vs Kerberos",
         "BloodHound: تنزيل + Neo4j + SharpHound Collector",
         "SharpHound: Ingestor Data Collection Methods",
         "BloodHound: Pre-built Queries (Shortest Paths / DA)",
         "PowerView: Get-NetUser / Get-NetGroup / Get-NetComputer",
         "PowerView: Get-NetDomain / Get-DomainTrust",
       ]},
      {wk:46,title:"AD Enumeration",quizId:"wk48",
       missions:["طبّق Full AD Enumeration على Lab","جرب BloodHound Attack Paths كاملاً","ادرس ACL/ACE Abuse بعمق"],
       topics:[
         "BloodHound: Find All Domain Admins",
         "BloodHound: Find Shortest Paths to Domain Admin",
         "BloodHound: Kerberoastable Accounts",
         "BloodHound: AS-REP Roastable Users",
         "User Enumeration: kerbrute / userenum",
         "Group Policy: GPResult / gpedit / GPO Analysis",
         "ACL Abuse: GenericAll / GenericWrite / WriteDACL",
         "ACL Abuse: ForceChangePassword / AddMember",
         "Trust Relationships: Enumeration وExploitation",
         "AD User Properties: Description Field Secrets",
         "Pre-created Computer Accounts: ms-DS-MachineAccountQuota",
         "Domain Password Policy: Spray Safely",
       ]},
      {wk:47,title:"AD Attacks",quizId:"wk48",
       missions:["نفّذ Kerberoasting عملياً في Lab","ادرس DCSync Attack وطبّقه","جرب Pass-the-Ticket وGolden Ticket"],
       topics:[
         "Kerberoasting: طلب TGS لـ SPN-enabled Accounts",
         "Kerberoasting: impacket GetUserSPNs.py / Rubeus",
         "Kerberoasting: Hashcat -m 13100 لكسر TGS Hashes",
         "AS-REP Roasting: حسابات بدون PreAuth",
         "AS-REP: impacket GetNPUsers.py / Rubeus asreproast",
         "Pass-the-Hash: Lateral Movement بـ NTLM Hash",
         "Pass-the-Ticket: استخدام TGT/TGS مسروقة",
         "Overpass-the-Hash: تحويل Hash إلى Kerberos Ticket",
         "DCSync: محاكاة DC لسرقة NTLM Hashes",
         "DCSync: impacket secretsdump.py / Mimikatz",
         "Golden Ticket: KRBTGT Hash → Permanent DA Access",
         "Silver Ticket: Service Account Hash → Service Access",
         "Lateral Movement: PSExec / WinRM / WMI / DCOM",
       ]},
      {wk:48,title:"🧪 Active Directory Lab",quizId:"wk48",
       missions:["جرب VulnAD Lab من الصفر حتى DA","حل TryHackMe AD Rooms (Attacktive Directory)","اجتاز اختبار الأسبوع 48 ✅"],
       topics:[
         "VulnAD: إعداد البيئة الضعيفة (Windows Server + Clients)",
         "VulnAD: Full Attack Path من User → Domain Admin",
         "TryHackMe: Attacktive Directory Room",
         "TryHackMe: Post-Exploitation Basics",
         "Lateral Movement: بين Machines في Domain",
         "Persistence in AD: دور الـ Backdoor Accounts",
         "🎯 WEEK 48 ASSESSMENT — Active Directory",
       ]},
      {wk:49,title:"OSINT & Recon Mastery",quizId:"wk52",
       missions:["تعلم OSINT Framework كامل","جرب Sherlock وtheHarvester على هدف حقيقي","ادرس GitHub Dorking للـ Secrets بعمق"],
       topics:[
         "OSINT Framework: التصنيفات والأدوات لكل نوع",
         "Maltego: رسم شبكة العلاقات / Transforms",
         "theHarvester: -d domain -l 500 -b google",
         "Sherlock: البحث عن Username عبر 300+ منصة",
         "Google Dorks: site: / inurl: / intitle: / filetype:",
         "Google Dorks: للبحث عن Passwords / Config Files",
         "GitHub Dorking: filename:.env / token / password",
         "GitHub Dorking: في Commits القديمة",
         "Shodan: port:22 / product:OpenSSH / country:EG",
         "Censys: org: / services.port: / parsed.names:",
         "Fofa: البديل الصيني والـ Syntax المختلف",
         "crt.sh: %.domain.com لاكتشاف Subdomains",
         "Wayback Machine: اكتشاف Endpoints القديمة",
         "Metadata Extraction: ExifTool على صور ووثائق",
       ]},
      {wk:50,title:"Advanced Asset Discovery",quizId:"wk52",
       missions:["نفّذ Full Recon Pipeline بالكامل آلياً","جرب TruffleHog وGitLeaks على Repos","ادرس SpiderFoot Automation"],
       topics:[
         "Amass: -passive / -active / -brute Modes",
         "Amass: -config لإعداد APIs (Shodan/VirusTotal/etc)",
         "Subfinder: -all / -recursive / -provider-config",
         "DNS Brute Force: dnsx / puredns مع Wordlists",
         "TruffleHog: Scan Git History للـ Secrets",
         "GitLeaks: Pre-commit Hooks / CI/CD Integration",
         "truffleHog3: Scanning بـ Regex Custom Rules",
         "SpiderFoot: Automated OSINT Scan / Modules",
         "Recon-ng: Framework للـ OSINT بـ Modules",
         "OSINT on Individuals: LinkedIn / Social Media",
         "Company OSINT: ASN / IP Ranges / Employees",
         "OSINT Report Writing: Timeline / Findings / Sources",
       ]},
      {wk:51,title:"Cloud Security Fundamentals",quizId:"wk52",
       missions:["ادرس AWS IAM بعمق وجرب AWS CLI","جرب flaws.cloud Level 1 → 5","تعلم S3 Misconfigurations"],
       topics:[
         "Cloud Models: IaaS / PaaS / SaaS / FaaS",
         "Shared Responsibility Model: ما يحميه AWS وما تحميه أنت",
         "AWS IAM: Users / Groups / Roles / Policies",
         "IAM Policy: JSON Structure / Effect / Action / Resource",
         "AWS S3: Bucket Permissions / ACL / Block Public Access",
         "S3 Misconfig: Public Bucket / ListBucket / GetObject",
         "AWS EC2: Instance Metadata Service (IMDS v1 vs v2)",
         "IMDS Exploitation: SSRF → 169.254.169.254/latest",
         "AWS Lambda: Environment Variables Secrets",
         "Secrets Manager vs SSM Parameter Store",
         "AWS CLI: aws configure / s3 ls / iam list-users",
         "flaws.cloud: Level 1→5 Challenges وحلولها",
       ]},
      {wk:52,title:"🧪 Cloud Lab Week",quizId:"wk52",
       missions:["جرب CloudGoat Scenario كامل","تعلم Pacu Framework للـ AWS","اجتاز اختبار الأسبوع 52 ✅"],
       topics:[
         "CloudGoat: IAM Privilege Escalation via Policy Rollback",
         "CloudGoat: EC2 SSRF → Credential Theft",
         "CloudGoat: Lambda Privilege Escalation",
         "Pacu: aws__enum_account / iam__privesc_scan",
         "ScoutSuite: Multi-Cloud Audit / HTML Report",
         "Prowler: CIS Benchmarks / Custom Checks",
         "flaws2.cloud: Attacker + Defender Challenges",
         "🎯 WEEK 52 ASSESSMENT — Cloud Security",
       ]},
      {wk:53,title:"DFIR Fundamentals",quizId:"wk56",
       missions:["تعلم Autopsy للـ Disk Forensics عملياً","ادرس Memory Forensics مع Volatility","جرب CyberDefenders Blue Team Labs"],
       topics:[
         "Forensics Process: Identification / Preservation / Collection",
         "Forensics Process: Analysis / Reporting / Presentation",
         "Disk Imaging: dd if=/dev/sda of=image.dd",
         "Disk Imaging: FTK Imager / Guymager",
         "Autopsy: إضافة Image / Keyword Search / Timeline",
         "File Carving: Foremost / Scalpel لاسترداد الملفات",
         "Browser Forensics: History / Downloads / Cookies",
         "Windows Artifacts: Prefetch / LNK / MRU / Shellbags",
         "Windows Event Logs: Security 4624/4625/4648/4720",
         "Windows Event Logs: System / Application / PowerShell",
         "Email Forensics: Header Analysis / Phishing Detection",
         "Chain of Custody: توثيق الدليل الرقمي",
       ]},
      {wk:54,title:"Memory & Network Forensics",quizId:"wk56",
       missions:["تعلم Volatility 3 Framework","ادرس PCAP Analysis على CyberDefenders","جرب Blue Team Labs Online"],
       topics:[
         "Memory Forensics: ما هي وأين تُطبّق",
         "Memory Acquisition: WinPmem / LiME / DumpIt",
         "Volatility 3: vol.py -f mem.dmp windows.info",
         "Volatility: pslist / pstree / cmdline / dlllist",
         "Volatility: netscan / malfind / dumpfiles",
         "Volatility: hashdump لاستخراج Password Hashes",
         "PCAP Analysis: Wireshark Filters المتقدمة",
         "PCAP: استخراج Files / Credentials / C2 Traffic",
         "Registry Forensics: SYSTEM / SAM / NTUSER.DAT",
         "Registry: Run Keys / UserAssist / RecentDocs",
         "SIEM: Elastic Stack / Splunk Basics",
         "Log Analysis: Correlation Rules / Alerts",
       ]},
      {wk:55,title:"Incident Response",quizId:"wk56",
       missions:["ادرس MITRE ATT&CK Framework بالكامل","تعلم Threat Hunting Methodology","جرب LetsDefend SOC Platform"],
       topics:[
         "Incident Response Lifecycle: Preparation / Detection / Containment",
         "IR Lifecycle: Eradication / Recovery / Lessons Learned",
         "MITRE ATT&CK: Tactics (14) → Techniques → Sub-techniques",
         "ATT&CK Navigator: رسم Attack Paths / هجمات معروفة",
         "Threat Hunting: Hypothesis-Driven vs IOC-Based",
         "Hunting: Process Trees المشبوهة / Network Connections",
         "YARA Rules: البنية / Strings / Conditions / Testing",
         "YARA: استخدام مع Malware Samples",
         "Splunk: SPL Queries / Dashboards / Alerts",
         "Elastic: KQL Queries / Index Patterns / Visualizations",
         "Velociraptor: Hunting Artifacts / VQL Queries",
         "Incident Report: Timeline / TTPs / Remediation",
       ]},
      {wk:56,title:"🧪 DFIR Lab Week",quizId:"wk56",
       missions:["حل CyberDefenders Challenge كامل","جرب LetsDefend SOC Training","اجتاز اختبار الأسبوع 56 ✅"],
       topics:[
         "CyberDefenders: Disk Forensics Challenge",
         "CyberDefenders: Memory Forensics Challenge",
         "CyberDefenders: Network Forensics / PCAP Challenge",
         "LetsDefend: SOC Analyst Alerts (Phishing / Malware)",
         "Blue Team Labs Online: Beginner Challenges",
         "Threat Intelligence: VirusTotal / AbuseIPDB / MalwareBazaar",
         "🎯 WEEK 56 ASSESSMENT — DFIR",
       ]},
      {wk:57,title:"Wireless Security",quizId:"wk60",
       missions:["تعلم Aircrack-ng Suite بالكامل","ادرس WPA2 Handshake Capture وكسره","جرب TryHackMe WiFi Hacking 101"],
       topics:[
         "WiFi Basics: 802.11 Standards / Frequency Bands / Channels",
         "Monitor Mode: airmon-ng start wlan0 / Check Interference",
         "Packet Capture: airodump-ng wlan0mon --bssid / -c / -w",
         "Deauth Attack: aireplay-ng -0 10 -a BSSID",
         "WPA2 4-Way Handshake: Capture ومتطلباته",
         "Handshake Cracking: aircrack-ng -w wordlist.txt",
         "PMKID Attack: hcxdumptool / hcxtools / hashcat",
         "Evil Twin Attack: Hostapd + DHCP + Redirect",
         "WPS Attacks: Reaver / Bully على Pins الضعيفة",
         "Captive Portal: Fake WiFi Login لـ Credential Harvest",
         "WPA3: الفروق وصعوبة الاختراق",
         "Monitor Mode على Alfa Adapter: إعداد Hardware",
       ]},
      {wk:58,title:"Wireless Advanced & Bluetooth",quizId:"wk60",
       missions:["تعلم Bettercap وجرب MITM على WiFi","جرب Wifite2 للـ Automation","ادرس Bluetooth BLE Security"],
       topics:[
         "Bettercap: net.probe / arp.spoof / http.proxy",
         "Bettercap: MITM Attack على WiFi Network",
         "Bettercap: SSL Stripping / Credential Sniffing",
         "Wifite2: Automated WiFi Pentesting",
         "Kismet: Passive Wireless Scanning / Rogue AP Detection",
         "Bluetooth Basics: BR/EDR / BLE / Pairing Modes",
         "BLE Security: Eavesdropping / MITM / Replay",
         "BLE Tools: btlejack / btle-sniffer / Wireshark",
         "Bluetooth Attacks: Bluesnarfing / Bluebugging",
         "BTLE Recon: gatttool / bleah / nRF Connect",
         "ZigBee / Z-Wave: IoT Protocol Basics",
         "Wireless Pentest Report: Findings + Remediation",
       ]},
      {wk:59,title:"Infrastructure Integration",quizId:"wk60",
       missions:["ابنِ Full Attack Chain (Network→AD→Cloud)","راجع كل Infrastructure Topics","جرب HackTheBox Pro Lab Preview"],
       topics:[
         "Full Attack Chain: Initial Access → Privilege Escalation → Lateral Movement",
         "Chain: Network Scan → Service Exploit → Linux PrivEsc",
         "Chain: Phishing → AD User → Kerberoasting → DA",
         "Chain: SSRF → AWS Metadata → S3 Data Exfil",
         "Red Team vs Pentest: الفرق في الـ Approach",
         "Purple Team: الجمع بين Red وBlue",
         "Pro Lab Preparation: OSCP Exam Strategy",
         "OSCP: 24-Hour Exam Format والـ Approach",
       ]},
      {wk:60,title:"🎓 Infrastructure Exam",quizId:"wk60",
       missions:["راجع كل Infrastructure Topics","اجتاز Infrastructure Final Exam (75%+)","احصل على 🏰 Infrastructure Pro Badge!"],
       topics:[
         "مراجعة: Network Scanning وExploitation (Wk 41-42)",
         "مراجعة: Post-Exploitation وPrivEsc (Wk 43)",
         "مراجعة: Active Directory Attacks (Wk 45-47)",
         "مراجعة: OSINT وCloud Security (Wk 49-51)",
         "مراجعة: DFIR وIncident Response (Wk 53-55)",
         "مراجعة: Wireless Security (Wk 57-58)",
         "🎓 Infrastructure Final Exam — 75%+ للنجاح",
         "🏰 Infrastructure Pro Badge مكتسبة!",
         "📜 Certificate of Infrastructure Security",
       ]},
    ]
  },
  {
    id:"p4",phase:4,icon:"💎",color:"#8b5cf6",bg:"rgba(139,92,246,.13)",
    nameAr:"مرحلة الخبراء",nameEn:"Expert Phase",
    monthLabel:"الشهر 16–21",startWeek:61,endWeek:80,phaseXP:1000,
    desc:"Malware Analysis + Binary Exploitation + Web3 + Cryptography + CTF",
    relatedTracks:["malware","ctf","web3track","dfir","pwn","crypto"],
    weeks:[
      {wk:61,title:"Malware Static Analysis",quizId:"wk64",
       missions:["تعلم PE File Format وحلّل بـ PEStudio","جرب FLOSS وstrings على Sample","ادرس Sandbox Analysis على ANY.RUN"],
       topics:[
         "PE Format: DOS Header / PE Header / Sections (.text/.data/.rsrc)",
         "PE Imports: Import Address Table (IAT) / Suspicious APIs",
         "PE Sections: Entropy Analysis للكشف عن Packing",
         "PEStudio: تحليل PE File وFlags المشبوهة",
         "strings: استخراج Strings من Binary",
         "FLOSS: الكشف عن Obfuscated Strings تلقائياً",
         "Detect-It-Easy (DIE): تحديد Compiler / Packer",
         "Exeinfo PE: Packer Identifier",
         "Packed Malware: Entropy > 7.0 = مشبوه",
         "ANY.RUN: Interactive Sandbox Analysis",
         "VirusTotal: Multi-Engine Scan + Behavior Report",
         "Cuckoo Sandbox: Self-Hosted Automated Analysis",
         "YARA: أنماط للكشف عن Malware Families",
       ]},
      {wk:62,title:"Malware Dynamic Analysis",quizId:"wk64",
       missions:["تعلم x64dbg Debugging بالكامل","جرب Process Monitor وProcess Hacker","ادرس Network + Registry Indicators"],
       topics:[
         "x64dbg: Navigation / Breakpoints / Stepping (F7/F8/F9)",
         "x64dbg: Memory View / Dump / Registers",
         "x64dbg: Plugins (x64dbgpy / ScyllaHide)",
         "x64dbg: Anti-Debugging Bypass",
         "Process Monitor (ProcMon): Filter بـ Process Name",
         "ProcMon: Registry Events / File Events / Network Events",
         "Process Hacker: Process Tree / DLL List / Handles",
         "Process Hacker: Memory Search / Strings في Memory",
         "Network IOCs: Wireshark لـ C2 Traffic",
         "Network IOCs: DNS Requests / HTTP Beacons",
         "Registry IOCs: Run Keys / Services / COM Hijacking",
         "Behavior Report: IOC List + TTPs Mapping",
         "Sandbox Evasion: Anti-VM / Anti-Sandbox Techniques",
       ]},
      {wk:63,title:"Reverse Engineering & Ghidra",quizId:"wk64",
       missions:["تعلم Ghidra Navigation والـ Decompiler","ادرس Assembly x86/x64 في سياق Malware","اكتب YARA Rule لـ Malware Sample"],
       topics:[
         "Assembly Basics: Registers (EAX/RBX/RSP/RIP)",
         "Assembly: MOV / PUSH / POP / CALL / RET / JMP",
         "Assembly: Conditional Jumps (JE/JNE/JG/JL)",
         "Assembly: Stack Frame / Function Prologue/Epilogue",
         "Ghidra: Installation / Project / Import Binary",
         "Ghidra: CodeBrowser / Decompiler / Symbol Table",
         "Ghidra: Renaming Functions & Variables",
         "Ghidra: Data Type Manager / Structure Recovery",
         "Ghidra: Scripting (Python / Java)",
         "Packing: UPX Unpack / Manual Unpacking",
         "Obfuscation: Control Flow Flattening / Dead Code",
         "YARA Rule Writing: Strings / Hex / Conditions",
         "YARA Testing: yarGen / Loki / YARA Scanner",
       ]},
      {wk:64,title:"🧪 Malware Lab Week",quizId:"wk64",
       missions:["حلل عينة Malware حقيقية من MalwareBazaar","اكتب تقرير تحليل كامل واحترافي","اجتاز اختبار الأسبوع 64 ✅"],
       topics:[
         "Lab: تحليل Ransomware Sample (Static)",
         "Lab: تحليل RAT Sample (Dynamic)",
         "Lab: استخراج IOCs من PCAP",
         "Lab: كتابة YARA Rule للـ Sample",
         "Lab: Malware Report — Executive Summary",
         "Lab: Malware Report — Technical Analysis",
         "🎯 WEEK 64 ASSESSMENT — Malware Analysis",
       ]},
      {wk:65,title:"Web3 & Solidity Basics",quizId:"wk68",
       missions:["تعلم Solidity من CryptoZombies كامل","جرب Ethernaut Level 1 → 5","ادرس Reentrancy Attack بعمق"],
       topics:[
         "Blockchain Basics: Blocks / Transactions / Consensus",
         "Ethereum: Accounts / Smart Contracts / EVM",
         "Solidity: Data Types / Variables / Functions / Modifiers",
         "Solidity: Visibility (public/private/internal/external)",
         "Solidity: Mappings / Arrays / Structs / Events",
         "Solidity: msg.sender / msg.value / block.timestamp",
         "Remix IDE: Compile / Deploy / Interact",
         "Metamask: Setup / TestNet / Faucets",
         "Reentrancy Attack: CEI Pattern Violation",
         "Ethernaut: Level 1 Fallback / Level 2 Fallout",
         "Ethernaut: Level 3 Coin Flip / Level 4 Telephone",
         "Ethernaut: Level 5 Token Overflow",
         "OpenZeppelin: Secure Contract Patterns",
       ]},
      {wk:66,title:"Smart Contract Auditing",quizId:"wk68",
       missions:["جرب Ethernaut Level 6 → 15","تعلم Slither Static Analyzer","ادرس Damn Vulnerable DeFi"],
       topics:[
         "Integer Overflow/Underflow: SafeMath vs Solidity 0.8+",
         "Access Control: Missing onlyOwner / Role-Based",
         "Flash Loan Attacks: Borrow → Attack → Repay في Transaction",
         "Price Oracle Manipulation: تلاعب في DEX Prices",
         "Front-Running: MEV / Transaction Ordering",
         "Denial of Service: Gas Limit / Push vs Pull Pattern",
         "Slither: Static Analysis Tool / Detectors",
         "Slither: Running / Output / Fix Recommendations",
         "Mythril: Symbolic Execution لاكتشاف Bugs",
         "Damn Vulnerable DeFi: Challenge 1-5",
         "Code4rena: How to Audit / Submissions",
         "Immunefi: Blockchain Bug Bounty Platform",
         "Smart Contract Audit Report: Structure وContent",
       ]},
      {wk:67,title:"Cryptography Attacks",quizId:"wk68",
       missions:["جرب CryptoHack Introduction كامل","ادرس RSA Attacks بعمق","تعلم Padding Oracle Attack"],
       topics:[
         "Symmetric: AES Modes (ECB/CBC/CTR/GCM)",
         "Asymmetric: RSA Key Generation / Encryption / Signing",
         "RSA: Common Modulus Attack (Same N, Different e)",
         "RSA: Small Public Exponent (e=3) Attack",
         "RSA: Wiener's Attack (Small Private Key d)",
         "RSA: Factoring with Fermat (Close Primes)",
         "Padding Oracle: CBC Decryption Attack",
         "Hash Functions: MD5 / SHA-1 / SHA-256 / SHA-3",
         "Hash: Length Extension Attack",
         "Hash: Birthday Attack",
         "ECC: Elliptic Curve Cryptography Basics",
         "CryptoHack: Encoding / XOR / Mathematics Challenges",
         "RsaCtfTool: Automated RSA Attack Tool",
       ]},
      {wk:68,title:"🧪 Web3 & Crypto Lab",quizId:"wk68",
       missions:["حل Cryptopals Set 1 كامل","جرب Damn Vulnerable DeFi Challenge","اجتاز اختبار الأسبوع 68 ✅"],
       topics:[
         "Cryptopals S1C1: Hex to Base64",
         "Cryptopals S1C2: Fixed XOR",
         "Cryptopals S1C3: Single-Character XOR",
         "Cryptopals S1C4: Detect Single-Character XOR",
         "Cryptopals S1C5: Repeating-Key XOR",
         "Cryptopals S1C6-C8: Breaking Vigenere / AES ECB",
         "DeFi Lab: Reentrancy Exploit",
         "DeFi Lab: Flash Loan Attack",
         "🎯 WEEK 68 ASSESSMENT — Crypto & Web3",
       ]},
      {wk:69,title:"Binary Exploitation Basics",quizId:"wk72",
       missions:["ابدأ pwn.college Module 1","تعلم Stack Buffer Overflow بعمق","اكتب أول Exploit بـ pwntools"],
       topics:[
         "Memory Layout: Stack / Heap / .text / .bss / .data",
         "Stack Frame: EBP / ESP / Return Address",
         "Buffer Overflow: Stack-Based Classic",
         "Finding Offset: cyclic / pattern_create / pattern_offset",
         "Controlling EIP/RIP: إعادة توجيه التنفيذ",
         "ret2win: القفز لـ win() Function مباشرة",
         "GDB: run / break / x / info registers / backtrace",
         "pwndbg: stack / vmmap / telescope",
         "pwntools: process() / remote() / p32() / p64()",
         "pwntools: cyclic() / recv() / sendline() / interactive()",
         "Shellcode: ما هو وكيف يُكتب",
         "NOP Sled: توسيع Landing Area للـ Shellcode",
       ]},
      {wk:70,title:"ROP & Advanced Exploitation",quizId:"wk72",
       missions:["تعلم ret2libc Attack","ادرس ROP Chains بعمق","جرب ROPgadget وpwn.college"],
       topics:[
         "ASLR: Address Space Layout Randomization ودوره",
         "PIE: Position Independent Executable",
         "NX / DEP: No-Execute / Data Execution Prevention",
         "ret2libc: الهجوم عبر system('/bin/sh') دون Shellcode",
         "ROP: Return Oriented Programming — المفهوم",
         "ROP Gadgets: pop rdi; ret / pop rsi; ret",
         "ROPgadget: البحث عن Gadgets في Binary",
         "ropper: البديل والأكثر ميزات",
         "ASLR Bypass: Information Leak / Brute Force (32-bit)",
         "PIE Bypass: Leak Function Address",
         "Canary: ما هو Stack Canary وكيف يُكسر",
         "Format String: %x / %s / %n للقراءة والكتابة",
         "Format String → Arbitrary Write: GOT Overwrite",
       ]},
      {wk:71,title:"Heap Exploitation",quizId:"wk72",
       missions:["ادرس Heap Memory Layout بعمق","تعلم Use After Free","جرب Heap Challenges على pwn.college"],
       topics:[
         "Heap: glibc malloc / free / bins",
         "Heap Bins: fastbins / smallbins / largebins / unsorted",
         "Heap: Chunk Structure (prev_size / size / fd / bk)",
         "Heap: tcache (Thread Local Cache) في glibc 2.26+",
         "Use After Free (UAF): استخدام Pointer بعد free()",
         "Double Free: استدعاء free() مرتين على نفس الـ Chunk",
         "Heap Overflow: الكتابة خارج حدود الـ Chunk",
         "tcache Poisoning: تعديل fd لإعادة توجيه malloc",
         "Heap Spray: ملء الـ Heap لتحسين موثوقية الاستغلال",
         "House of Force / House of Einherjar / House of Spirit",
         "Heap Challenges: how2heap Repository",
         "pwn.college: Heap Exploitation Module",
       ]},
      {wk:72,title:"🧪 Binary Lab Week",quizId:"wk72",
       missions:["حل 3 Pwn Challenges من PicoCTF","جرب pwn.college Binary Exploitation Module","اجتاز اختبار الأسبوع 72 ✅"],
       topics:[
         "PicoCTF: Overflow 1 — ret2win",
         "PicoCTF: Overflow 2 — ret2libc / ret2system",
         "PicoCTF: Format String — Leak + Write",
         "pwn.college: Stack Overflow Module",
         "pwn.college: ROP Module",
         "exploit.education: Phoenix Challenges",
         "🎯 WEEK 72 ASSESSMENT — Binary Exploitation",
       ]},
      {wk:73,title:"CTF Methodology & Strategies",quizId:"wk76",
       missions:["تعلم CTF Strategy لكل Category","جرب PicoCTF Web + Crypto + Forensics","ادرس CTF101 الموقع كاملاً"],
       topics:[
         "CTF Types: Jeopardy / Attack-Defense / King of the Hill",
         "Web CTF: SQLi / XSS / IDOR / LFI / RCE Strategy",
         "Crypto CTF: Caesar / Vigenere / RSA / AES ECB",
         "Forensics CTF: Steganography / File Carving / PCAP",
         "Binary CTF: Buffer Overflow / ROP / Format String",
         "Reverse Engineering CTF: Ghidra / GDB Strategy",
         "OSINT CTF: Search / Image Reverse / Metadata",
         "CTF Toolset: CyberChef / pwntools / pwndbg / exiftool",
         "Team Collaboration: Collaboration Tools / Role Division",
         "Time Management في CTF: Prioritization Strategy",
         "Writeup Writing: بعد الحل لحفظ المعرفة",
         "CTFtime: إيجاد والتسجيل في Events",
       ]},
      {wk:74,title:"Live CTF Participation",quizId:"wk76",
       missions:["شارك في CTFtime Event حقيقي","حل 5 Challenges من Categories مختلفة","اكتب Writeup لأفضل حل"],
       topics:[
         "CTFtime: اختيار Event مناسب للمستوى",
         "Team Setup: Discord / CTFd Platform / Shared Notes",
         "Web Challenge: Recon → Exploit → Flag",
         "Crypto Challenge: Identify Algorithm → Attack → Decode",
         "Forensics Challenge: File Analysis → Extract → Decode",
         "Reverse Challenge: Static → Dynamic → Key Extraction",
         "Pwn Challenge: Offset → Payload → Shell",
         "Writeup Format: Introduction / Solution / Code",
         "GitHub Writeups: نشر الحلول للمجتمع",
         "CTF Community: HackTheBox Discord / DEF CON CTF",
       ]},
      {wk:75,title:"Expert Integration & Red Team",quizId:"wk76",
       missions:["ابنِ Full Exploit Chain متعدد التقنيات","راجع كل Expert Topics","جرب HackTheBox Pro Lab"],
       topics:[
         "Full Exploit Chain: Web RCE → Linux PrivEsc → AD Takeover",
         "Full Exploit Chain: Mobile MITM → API BOLA → Data Exfil",
         "Advanced Evasion: AV Bypass / AMSI Bypass",
         "Custom Shellcode: msfvenom / Shellcode Encoding",
         "Living off the Land: LOLBins / LOLBas",
         "Red Team Report: Narrative + Technical + Executive",
         "HackTheBox Pro Lab: Offshore / RastaLabs Preview",
         "Mindset: التفكير كـ Advanced Threat Actor",
       ]},
      {wk:76,title:"🎓 Expert Exam",quizId:"wk76",
       missions:["راجع كل Expert Topics","اجتاز Expert Final Exam (75%+)","احصل على 💎 Elite Hacker Badge!"],
       topics:[
         "مراجعة: Malware Analysis Static + Dynamic (Wk 61-63)",
         "مراجعة: Web3 + Smart Contracts + Auditing (Wk 65-66)",
         "مراجعة: Cryptography Attacks (Wk 67)",
         "مراجعة: Binary Exploitation BOF + ROP + Heap (Wk 69-71)",
         "مراجعة: CTF Methodology + Participation (Wk 73-74)",
         "🎓 Expert Final Exam — 75%+ للنجاح",
         "💎 Elite Hacker Badge مكتسبة!",
         "📜 Certificate of Expert Security",
       ]},
      {wk:77,title:"Red Team Operations",quizId:"wk80",
       missions:["ادرس Red Team Methodology بعمق","تعلم C2 Framework Concepts","ادرس EDR Evasion Techniques"],
       topics:[
         "Red Team vs Pentest: التعريف والهدف والنطاق",
         "Red Team Phases: Reconnaissance / Initial Access / C2",
         "C2 Frameworks: Sliver / Havoc / Cobalt Strike (Concepts)",
         "C2: Malleable Profiles / Listeners / Beacons",
         "EDR Evasion: Process Injection (DLL / Shellcode)",
         "EDR Evasion: AMSI Bypass / ETW Patching",
         "EDR Evasion: Unhooking ntdll / Direct Syscalls",
         "OPSEC: Operational Security في Red Team",
         "Physical Red Team: Basics (Tailgating / Badge Cloning)",
         "Red Team Report: Attack Narrative + Detection Gaps",
       ]},
      {wk:78,title:"Certifications Preparation",quizId:"wk80",
       missions:["خطط لمسار الشهادات المناسب","راجع Exam Objectives لـ OSCP","جرب TJ Null's OSCP Practice List"],
       topics:[
         "OSCP (OffSec): Exam Format / 24H / 70 Points للنجاح",
         "OSCP: Buffer Overflow Section (مضمون في الامتحان)",
         "OSCP: Active Directory Section Strategy",
         "eWPT (eLearnSecurity): Web Pentesting Certification",
         "eWPTX: Advanced Web Pentesting",
         "PNPT (TCM Security): Practical Network Pentest",
         "CEH: Certified Ethical Hacker (النظري)",
         "BSCP: Burp Suite Certified Practitioner",
         "CompTIA PenTest+: Entry Level",
         "Certification Strategy: أيها تناسبك وترتيب الأولويات",
       ]},
      {wk:79,title:"Portfolio & Personal Brand",quizId:"wk80",
       missions:["أنشئ GitHub Security Portfolio احترافياً","اكتب CVE أو Bug Report حقيقي","ابنِ حضور منتظم على Twitter/X الأمني"],
       topics:[
         "GitHub Portfolio: README / Projects / Pinned Repos",
         "Tools Repository: أدوات كتبتها / Scripts",
         "CTF Writeups Repository: توثيق الحلول",
         "Blog Writing: Markdown / GitHub Pages / Medium",
         "Blog Topics: Writeup / Tool Review / Technique",
         "CVE Disclosure: Full Responsible Disclosure Process",
         "Bug Bounty Report: الأفضل من Reports حصلت عليها",
         "Twitter/X: مشاركة في Community / Threads",
         "LinkedIn: Cybersecurity Profile Optimization",
         "Personal Branding: Consistency وما تخصص فيه",
       ]},
      {wk:80,title:"🎓 Expert Final Exam & Graduation",quizId:"wk80",
       missions:["اجتاز Expert Final Exam بـ 75%+","احصل على Elite Certificate","احتفل — أنت الآن Cybersecurity Expert! 🎉"],
       topics:[
         "مراجعة: Red Team Operations (Wk 77)",
         "مراجعة: Certifications Strategy (Wk 78)",
         "مراجعة: Portfolio وPersonal Brand (Wk 79)",
         "🎓 Final Comprehensive Exam",
         "🏆 Elite Certificate Unlock",
         "Career Paths: Penetration Tester / Red Teamer / Bug Bounty",
         "Career Paths: Malware Analyst / Security Researcher / SOC Lead",
         "🚀 Journey Complete — استمر في التعلم دائماً!",
       ]},
    ]
  },
];

// ─────────────────────────────────────────────
//  QUIZZES
// ─────────────────────────────────────────────
const QUIZZES = {
  wk4:{title:"الشبكات — الأسبوع 4",qs:[
    {q:"كم عدد طبقات نموذج OSI؟",os:["5","6","7","8"],a:2,exp:"OSI له 7 طبقات من Physical (1) إلى Application (7)"},
    {q:"ما البروتوكول المسؤول عن ترجمة الأسماء لـ IPs؟",os:["ARP","DNS","DHCP","ICMP"],a:1,exp:"DNS = Domain Name System يحوّل الأسماء لعناوين IP"},
    {q:"في أي طبقة OSI يعمل TCP؟",os:["Layer 2","Layer 3","Layer 4","Layer 7"],a:2,exp:"TCP/UDP في Layer 4 = Transport Layer"},
    {q:"المنفذ الافتراضي لـ HTTPS؟",os:["80","8080","443","8443"],a:2,exp:"HTTPS = Port 443 | HTTP = Port 80"},
    {q:"الفرق الرئيسي بين TCP وUDP؟",os:["TCP أسرع دائماً","TCP موثوق وUDP لا يضمن التسليم","UDP موثوق وTCP أسرع","لا فرق بينهما"],a:1,exp:"TCP = 3-way handshake للموثوقية | UDP = أسرع لكن بلا ضمان"},
  ]},
  wk8:{title:"لينكس — الأسبوع 8",qs:[
    {q:"ما أمر إضافة صلاحية التنفيذ لملف؟",os:["chmod +r file","chmod +x file","chown +x file","sudo exec file"],a:1,exp:"chmod +x يضيف Execute Permission"},
    {q:"ما معنى SUID؟",os:["تشغيل بصلاحيات المالك","تشغيل بصلاحيات المجموعة","حذف تلقائي","تشفير الملف"],a:0,exp:"SUID = تشغيل الملف بصلاحيات المالك (مثل root)"},
    {q:"أين ملفات الـ Logs في Linux؟",os:["/etc","/var/log","/usr/log","/proc/logs"],a:1,exp:"/var/log هو المكان الافتراضي لجميع ملفات السجل"},
    {q:"أمر إيجاد ملفات SUID في النظام؟",os:["find / -perm -4000","ls -suid /","locate suid","grep -r suid /"],a:0,exp:"find / -perm -4000 2>/dev/null يجد SUID files"},
    {q:"أمر عرض كل العمليات الجارية؟",os:["ls -la","ps aux","top --all","run list"],a:1,exp:"ps aux = عرض كل العمليات مع تفاصيلها"},
  ]},
  wk12:{title:"الأساسيات الشاملة — الأسبوع 12",qs:[
    {q:"ما هو CIA Triad؟",os:["Confidentiality, Integrity, Availability","Cyber, Intelligence, Access","Control, Inspect, Analyze","Certificate, Identity, Authentication"],a:0,exp:"CIA = Confidentiality (سرية) + Integrity (سلامة) + Availability (إتاحة)"},
    {q:"الفرق بين Vulnerability وExploit؟",os:["نفس الشيء","Vulnerability = ضعف، Exploit = كود استغلاله","Exploit = ضعف، Vulnerability = كود","لا علاقة"],a:1,exp:"Vulnerability = الثغرة | Exploit = الكود المستخدم لاستغلالها"},
    {q:"ما هو Symmetric Encryption؟",os:["مفتاح واحد للتشفير والفك","مفتاحان مختلفان","بدون مفاتيح","أبطأ من Asymmetric دائماً"],a:0,exp:"Symmetric = نفس المفتاح للتشفير وفك التشفير (مثل AES)"},
    {q:"ما هو الـ Hash؟",os:["تشفير قابل للفك","دالة أحادية الاتجاه لا تُعكس","نوع تشفير متماثل","بروتوكول شبكي"],a:1,exp:"Hash = One-Way Function، لا يمكن الحصول على البيانات الأصلية"},
    {q:"ما هو CVE؟",os:["نوع فيروس","Common Vulnerabilities and Exposures","برنامج أمني","بروتوكول تشفير"],a:1,exp:"CVE = قاعدة بيانات عالمية للثغرات المعروفة"},
  ]},
  wk16:{title:"Web Basics — الأسبوع 16",qs:[
    {q:"ما هو SQL Injection؟",os:["إدخال أكواد SQL لاستغلال قاعدة البيانات","ثغرة في شبكة SQL","نوع Malware","هجوم على بروتوكول SQL"],a:0,exp:"SQLi = حقن أوامر SQL في حقول الإدخال لاستغلال قاعدة البيانات"},
    {q:"ما هو XSS Reflected؟",os:["Payload مخزّن في DB","Payload يُعكس مباشرة في الرد","ثغرة في DOM فقط","هجوم على Server"],a:1,exp:"Reflected XSS = الـ Payload يُرسل في Request ويُعكس مباشرة في Response"},
    {q:"الفرق بين Authentication وAuthorization؟",os:["نفس الشيء","Auth = هوية المستخدم، Authz = ما يُسمح له","Authz = هوية، Auth = صلاحية","لا فرق عملياً"],a:1,exp:"Authentication = التحقق من الهوية | Authorization = التحقق من الصلاحيات"},
    {q:"ما هو CSRF؟",os:["Cross-Site Request Forgery","Cross-Server Request Fake","Content Security Response Filter","Cross-Site Resource Fetch"],a:0,exp:"CSRF = Cross-Site Request Forgery، يخدع المتصفح لإرسال طلبات غير مصرح بها"},
    {q:"المنفذ الافتراضي لـ HTTP؟",os:["443","8080","80","8443"],a:2,exp:"HTTP = Port 80 | HTTPS = Port 443"},
  ]},
  wk20:{title:"Web Advanced — الأسبوع 20",qs:[
    {q:"ما هو IDOR؟",os:["Insecure Direct Object Reference","Internal DNS Override","Identity Document Override","Input Data Object Redirect"],a:0,exp:"IDOR = وصول لموارد مستخدمين آخرين بتغيير الـ ID مباشرة"},
    {q:"ما هو SSRF؟",os:["Server-Side Request Forgery","SQL Server Request Failure","Side-Site Request Filter","Secure Server Resource Fetch"],a:0,exp:"SSRF = إجبار الـ Server على طلبات داخلية لخدمات لا يجب الوصول إليها"},
    {q:"ما هو Path Traversal؟",os:["الوصول لملفات خارج المسار بـ ../","تغيير URL Path","ثغرة في Routing","هجوم على File System"],a:0,exp:"Path Traversal = استخدام ../ للوصول لملفات خارج مجلد التطبيق"},
    {q:"أشهر هجوم على JWT؟",os:["SQL Injection","Algorithm Confusion (RS256→HS256)","Buffer Overflow","Path Traversal"],a:1,exp:"JWT Algorithm Confusion = تغيير الـ Algorithm من RS256 إلى HS256 لـ Bypass التوقيع"},
    {q:"ما هو Business Logic Vulnerability؟",os:["ثغرة في منطق التطبيق التجاري","ثغرة في DB فقط","نوع من XSS","هجوم على Business Server"],a:0,exp:"BLV = ثغرات في المنطق مثل تجاوز الحد الأقصى أو شراء بسعر سالب"},
  ]},
  wk28:{title:"Bug Bounty — الأسبوع 28",qs:[
    {q:"أول خطوة في Bug Bounty Methodology؟",os:["Exploitation مباشرة","قراءة Program Policy والـ Scope","كتابة Report","إرسال Payload"],a:1,exp:"دائماً ابدأ بقراءة الـ Scope وProgram Policy لتجنب Out-of-Scope"},
    {q:"ما هو Subdomain Takeover؟",os:["السيطرة على Subdomain منتهي الـ DNS Record","حذف Subdomain","نقل ملكية دومين","هجوم DNS Poisoning"],a:0,exp:"Subdomain Takeover = Subdomain يشير لـ Service غير موجودة يمكن للمهاجم إعادة تسجيلها"},
    {q:"أفضل أداة لاكتشاف Subdomains؟",os:["Nmap","sqlmap","Subfinder + Amass","Metasploit"],a:2,exp:"Subfinder + Amass = أفضل مزيج لاكتشاف Subdomains بسرعة وشمولية"},
    {q:"ما هي CVSS؟",os:["Common Vulnerability Scoring System","Cyber Vulnerability Security System","Certificate Validation Score","لا شيء من السابق"],a:0,exp:"CVSS = Common Vulnerability Scoring System، نظام تقييم شدة الثغرات (0-10)"},
    {q:"ما هو الـ P1 في Bug Bounty؟",os:["أدنى مستوى خطورة","أعلى مستوى خطورة (Critical)","Priority إدارية","خطأ في البرمجة"],a:1,exp:"P1/Critical = أعلى مستوى خطورة مثل RCE وSQL Injection بيانات حساسة"},
  ]},
  wk33:{title:"Mobile Security — الأسبوع 33",qs:[
    {q:"ما هو ADB؟",os:["Android Debug Bridge","Advanced Database Bridge","Application Debug Binary","Android Data Backup"],a:0,exp:"ADB = Android Debug Bridge، أداة للتواصل مع الأجهزة والمحاكيات"},
    {q:"أداة لفك تشفير APK؟",os:["Nmap","JADX-GUI","Metasploit","Burp Suite"],a:1,exp:"JADX-GUI = أداة لـ Decompile APK وعرض الكود Java/Kotlin"},
    {q:"ما هو SSL Pinning؟",os:["ربط الشهادة بالتطبيق لمنع MITM","نوع تشفير قوي","بروتوكول SSL قديم","نوع هجوم"],a:0,exp:"SSL Pinning = ربط شهادة معينة بالتطبيق لمنع اعتراض الحركة بشهادات مخترقة"},
    {q:"ما هو OWASP MASTG؟",os:["Mobile Application Security Testing Guide","Mobile Attack Standard Testing Guide","Modern Application Security Tool Guide","لا شيء من السابق"],a:0,exp:"MASTG = المرجع الرسمي من OWASP لاختبار أمان التطبيقات المحمولة"},
    {q:"ما أخطر نوع Storage في Android؟",os:["Internal Storage (Private)","Shared Preferences","External Storage (Public)","SQLite Database"],a:2,exp:"External Storage = قابل للوصول من أي تطبيق بصلاحيات READ_EXTERNAL_STORAGE"},
  ]},
  wk36:{title:"API Security — الأسبوع 36",qs:[
    {q:"ما هو BOLA في OWASP API؟",os:["Broken Object Level Authorization","Basic Object Level Access","Broken Open Link Attack","Binary Object Layer Analysis"],a:0,exp:"BOLA = وصول لموارد مستخدمين آخرين عبر تغيير Object ID في API"},
    {q:"ما هو Mass Assignment Vulnerability؟",os:["قبول API لـ Parameters غير متوقعة","هجوم DDoS على API","خطأ في JSON Schema","ثغرة في HTTP Method"],a:0,exp:"Mass Assignment = API يقبل حقولاً إضافية غير متوقعة مثل isAdmin=true"},
    {q:"أفضل أداة لاختبار API؟",os:["Nmap","Postman + Burp Suite","sqlmap","John the Ripper"],a:1,exp:"Postman للتوثيق والـ Burp Suite للاعتراض والتحليل معاً أفضل مزيج"},
    {q:"ما هو GraphQL Introspection Attack؟",os:["استخراج مخطط الـ API الكامل","هجوم DDoS","SQLi في GraphQL","XSS في Query"],a:0,exp:"Introspection = الاستعلام عن مخطط الـ API الكامل إذا لم يتم تعطيله في Production"},
    {q:"ما هو الـ Rate Limiting وأهميته؟",os:["تحديد عدد الطلبات لمنع Abuse وBruteforce","تسريع الـ API","نوع تشفير","تقييد الـ IP فقط"],a:0,exp:"Rate Limiting = تحديد عدد الطلبات لمنع Bruteforce وDDoS وCredential Stuffing"},
  ]},
  wk40:{title:"Mobile & API Final — الأسبوع 40",qs:[
    {q:"ما هو Frida؟",os:["Dynamic Instrumentation Toolkit لـ Hooking Functions","Static Analyzer","Network Scanner","Vulnerability Database"],a:0,exp:"Frida = أداة Dynamic Instrumentation تتيح Hooking الدوال في Runtime"},
    {q:"ما هو BOLA في OWASP API؟",os:["Broken Object Level Authorization","Basic Object Level Access","Broken Open Link Attack","Binary Layer Analysis"],a:0,exp:"BOLA = IDOR في الـ APIs، وصول لموارد مستخدمين آخرين"},
    {q:"ما هو SSL Pinning Bypass؟",os:["تجاوز آلية التحقق من الشهادة لاعتراض الحركة","كسر SSL Encryption","هجوم على CA","نوع XSS"],a:0,exp:"SSL Pinning Bypass = Bypass فحص الشهادة للسماح بـ MITM عبر Burp"},
    {q:"أداة Dynamic Analysis للأندرويد؟",os:["JADX-GUI","Objection + Frida","Nmap","sqlmap"],a:1,exp:"Objection + Frida = أقوى مزيج للـ Dynamic Analysis وSSL Pinning Bypass"},
    {q:"ما هو Mass Assignment في API؟",os:["API يقبل حقولاً غير متوقعة مثل isAdmin=true","هجوم DDoS","خطأ JSON","نوع SQLi"],a:0,exp:"Mass Assignment = API يقبل Parameters إضافية غير متوقعة"},
  ]},
  wk44:{title:"Network Pentest — الأسبوع 44",qs:[
    {q:"ما أمر Nmap لاكتشاف الأجهزة الحية؟",os:["nmap -sV","nmap -sn","nmap -A","nmap -O"],a:1,exp:"nmap -sn (Ping Scan) = يكتشف الأجهزة الحية بدون Port Scanning"},
    {q:"ما هو Responder؟",os:["أداة LLMNR/NBT-NS Poisoning","Antivirus Tool","VPN Client","Password Cracker"],a:0,exp:"Responder = يستغل LLMNR/NBT-NS للحصول على NTLM Hashes من الشبكة"},
    {q:"ما هو Pass-the-Hash؟",os:["تمرير NTLM Hash مباشرة للتوثيق بدون كلمة المرور","اختراق قاعدة بيانات Hashes","هجوم Rainbow Tables","Brute Force الـ Hash"],a:0,exp:"Pass-the-Hash = استخدام NTLM Hash مباشرة للتوثيق بدون كسره"},
    {q:"ما هو GTFOBins؟",os:["موقع Linux PrivEsc Binaries","أداة Network Scanning","مجموعة Exploits","Framework لـ Metasploit"],a:0,exp:"GTFOBins = قاعدة بيانات Linux Binaries يمكن استغلالها لرفع الصلاحيات"},
    {q:"أفضل Framework للـ Post-Exploitation؟",os:["Nmap","Wireshark","Metasploit","Shodan"],a:2,exp:"Metasploit = أشهر وأقوى Framework للـ Exploitation وPost-Exploitation"},
  ]},
  wk48:{title:"Active Directory — الأسبوع 48",qs:[
    {q:"ما هو Kerberoasting؟",os:["طلب Service Tickets وكسر كلمات مرور Service Accounts","هجوم على Kerberos Server مباشرة","ثغرة في LDAP","Attack على DNS"],a:0,exp:"Kerberoasting = طلب TGS لـ Service Accounts وكسر الـ Hash offline"},
    {q:"ما هو AS-REP Roasting؟",os:["مهاجمة حسابات بدون Pre-Authentication","هجوم Kerberos Server","DCSync هجوم","LDAP Injection"],a:0,exp:"AS-REP Roasting = مهاجمة حسابات AD التي لا تتطلب Pre-Authentication"},
    {q:"ما هو DCSync Attack؟",os:["محاكاة Domain Controller لسرقة Hashes","هجوم DDoS على DC","ثغرة في DNS","ضرب الـ SMB"],a:0,exp:"DCSync = طلب Domain Controller لـ Replicate بيانات المستخدمين بما فيها NTLM Hashes"},
    {q:"أفضل أداة لرسم Attack Paths في AD؟",os:["Nmap","BloodHound","sqlmap","Metasploit"],a:1,exp:"BloodHound = يرسم العلاقات في AD ويجد أقصر مسار للوصول لـ Domain Admin"},
    {q:"ما هو Golden Ticket Attack؟",os:["تزوير Kerberos TGT بمفتاح KRBTGT","سرقة بطاقة مادية","هجوم على Gold Standards","LDAP Token Forgery"],a:0,exp:"Golden Ticket = تزوير TGT باستخدام KRBTGT Hash للحصول على صلاحيات Domain Admin دائمة"},
  ]},
  wk52:{title:"OSINT & Cloud — الأسبوع 52",qs:[
    {q:"ما هو Shodan؟",os:["محرك بحث للأجهزة المتصلة بالإنترنت","نوع هجوم","Vulnerability Scanner","VPN Service"],a:0,exp:"Shodan = محرك بحث يفهرس الأجهزة والخدمات المتصلة بالإنترنت"},
    {q:"ما هو Certificate Transparency؟",os:["سجل عام لكل شهادات SSL تم إصدارها","نوع تشفير","Certificate Authority نوع","هجوم على SSL"],a:0,exp:"CT = سجل عام يمكن البحث فيه عن Subdomains عبر crt.sh"},
    {q:"ما هو CloudGoat؟",os:["بيئة AWS ضعيفة للتدريب","خدمة Cloud حقيقية","CMS مبني على Cloud","Anti-virus Cloud"],a:0,exp:"CloudGoat = بيئة AWS Vulnerable-by-Design من Rhino Security Labs للتدريب"},
    {q:"أخطر ثغرة في AWS S3؟",os:["Public Bucket مع بيانات حساسة","بطء التحميل","خطأ في Naming","ثغرة في Python SDK"],a:0,exp:"Public S3 Bucket = أكثر ثغرات AWS شيوعاً، تكشف بيانات حساسة للعالم"},
    {q:"ما هو TruffleHog؟",os:["أداة للبحث عن Secrets في Git Repos","Penetration Testing Framework","Network Scanner","Password Manager"],a:0,exp:"TruffleHog = يبحث في تاريخ Git عن API Keys وكلمات مرور مُسرَّبة"},
  ]},
  wk56:{title:"DFIR — الأسبوع 56",qs:[
    {q:"ما هو Volatility؟",os:["Framework لتحليل Memory Dumps","Vulnerability Scanner","Network Analyzer","Password Cracker"],a:0,exp:"Volatility 3 = أقوى Framework لتحليل الذاكرة Memory Forensics"},
    {q:"ما هو IOC؟",os:["Indicator of Compromise — أثر يدل على اختراق","Internet of Computers","Index of Code","Input/Output Controller"],a:0,exp:"IOC = Indicator of Compromise، أثر رقمي يدل على وجود اختراق"},
    {q:"أهمية MITRE ATT&CK؟",os:["قاعدة بيانات لتكتيكات وتقنيات المهاجمين","نوع Firewall","Certificate Authority","Cloud Provider"],a:0,exp:"MITRE ATT&CK = موسوعة تكتيكات وتقنيات المهاجمين الحقيقية"},
    {q:"ما هو Chain of Custody؟",os:["توثيق سلسلة الحفاظ على الدليل الرقمي","نوع Encryption","بروتوكول تحقيق","File System"],a:0,exp:"Chain of Custody = توثيق كامل للدليل الرقمي من جمعه حتى المحكمة"},
    {q:"الفرق بين SIEM وEDR؟",os:["SIEM للـ Logs، EDR للـ Endpoint","نفس الشيء","EDR للـ Cloud، SIEM للـ On-premise","لا فرق في الوظيفة"],a:0,exp:"SIEM = يجمع ويحلل Logs | EDR = يراقب ويحمي الـ Endpoints مباشرة"},
  ]},
  wk60:{title:"Infrastructure Final — الأسبوع 60",qs:[
    {q:"أفضل أداة لاختبار WiFi WPA2؟",os:["Nmap","Aircrack-ng","sqlmap","Metasploit"],a:1,exp:"Aircrack-ng Suite = أشهر وأقوى مجموعة أدوات لاختبار أمان WiFi"},
    {q:"ما هو Evil Twin Attack؟",os:["إنشاء Access Point مزيف بنفس اسم الشبكة الحقيقية","هجوم على Router مباشرة","كسر WPA3","هجوم DNS"],a:0,exp:"Evil Twin = AP مزيف بنفس SSID يخدع الأجهزة للاتصال به ثم MITM"},
    {q:"ما هو ScoutSuite؟",os:["Multi-Cloud Security Auditing Tool","Network Scanner","Password Manager","Vulnerability Database"],a:0,exp:"ScoutSuite = أداة مجانية لمراجعة أمان بيئات Cloud (AWS/Azure/GCP)"},
    {q:"ما هو PMKID Attack على WPA2؟",os:["اختراق بدون الحاجة لـ 4-Way Handshake","نوع Brute Force بطيء","هجوم على WPS","نوع من MITM"],a:0,exp:"PMKID Attack = يمكن اختراق WPA2 بدون الانتظار لأي Client بالاتصال"},
    {q:"الفرق بين Active وPassive Recon؟",os:["Passive = بلا تفاعل مع الهدف، Active = تفاعل مباشر","نفس الشيء","Active = أبطأ دائماً","Passive = أخطر دائماً"],a:0,exp:"Passive = OSINT بلا تفاعل | Active = تفاعل مباشر مع الهدف"},
  ]},
  wk64:{title:"Malware Analysis — الأسبوع 64",qs:[
    {q:"ما هو PE Format؟",os:["Portable Executable، صيغة ملفات Windows التنفيذية","Programming Environment","Penetration Engine","Process Execution"],a:0,exp:"PE = Portable Executable، الصيغة القياسية للملفات التنفيذية في Windows (.exe/.dll)"},
    {q:"ما هو Packing في Malware؟",os:["ضغط وتشفير الـ Malware لتجنب الكشف","تجميع الأكواد","نوع تشفير SHA","Data Compression فقط"],a:0,exp:"Packing = ضغط وتشفير الـ Malware ليبدو مختلفاً عند التحليل الساكن"},
    {q:"ما هي YARA Rules؟",os:["قواعد تُعرّف أنماط Malware للكشف عنه","نوع Anti-Virus","Programming Language","Database Queries"],a:0,exp:"YARA = لغة لكتابة قواعد تعريف الـ Malware بناءً على أنماط Bytes وStrings"},
    {q:"ما هو Dynamic Analysis؟",os:["تشغيل الـ Malware ومراقبة سلوكه في بيئة محكومة","تحليل الكود بدون تشغيل","قراءة ملف الـ PE","هجوم Reverse"],a:0,exp:"Dynamic Analysis = تشغيل الـ Malware في Sandbox ومراقبة الـ Registry والـ Network والـ Processes"},
    {q:"أفضل Sandbox مجاني لتحليل Malware؟",os:["GitHub","ANY.RUN","Google Drive","LinkedIn"],a:1,exp:"ANY.RUN = أفضل Interactive Sandbox مجاني لتحليل الـ Malware بصرياً"},
  ]},
  wk68:{title:"Web3 & Crypto — الأسبوع 68",qs:[
    {q:"ما هو Reentrancy Attack؟",os:["استدعاء دالة بشكل متكرر قبل انتهاء التنفيذ لسرقة Ether","هجوم على الشبكة","SQL Injection في Solidity","XSS في Smart Contract"],a:0,exp:"Reentrancy = أشهر هجوم Smart Contract، استغل في The DAO Hack 2016 (60M$)"},
    {q:"ما هو Flash Loan Attack؟",os:["اقتراض مبالغ ضخمة بدون ضمان وإعادتها في نفس Transaction","نوع خداع المستثمرين","هجوم على Ethereum Network","Bug في Solidity Compiler"],a:0,exp:"Flash Loan = اقتراض غير مضمون يُستغل لتلاعب الأسعار"},
    {q:"ما هو Symmetric Encryption؟",os:["مفتاح واحد للتشفير والفك (AES)","مفتاحان (RSA)","Hash Function","Digital Signature"],a:0,exp:"Symmetric = نفس المفتاح للتشفير وفك التشفير | مثال: AES-256"},
    {q:"أشهر هجوم على RSA بـ e صغير؟",os:["Wiener's Attack","SQL Injection","XSS Attack","Buffer Overflow"],a:0,exp:"Wiener's Attack = عندما يكون Private Exponent (d) صغيراً يمكن كسر RSA رياضياً"},
    {q:"ما هو Padding Oracle Attack؟",os:["استغلال رسائل خطأ الـ Padding لفك التشفير","هجوم على Hash","SQL في AES","XSS في JWT"],a:0,exp:"Padding Oracle = استغلال رسائل خطأ CBC Padding لفك تشفير البيانات بدون المفتاح"},
  ]},
  wk72:{title:"Binary Exploitation — الأسبوع 72",qs:[
    {q:"ما هو Stack Buffer Overflow؟",os:["كتابة بيانات تتجاوز حجم Buffer لتغيير Flow الـ Program","هجوم على Heap فقط","خطأ في Java","Memory Leak"],a:0,exp:"Stack BOF = كتابة بيانات أكثر من حجم Buffer يُمكّن تغيير Return Address"},
    {q:"ما هو ROP Chain؟",os:["تجميع Gadgets موجودة في Memory لتنفيذ كود بدون Shellcode","نوع SQL Injection","هجوم على Network","JavaScript Attack"],a:0,exp:"ROP = Return Oriented Programming، يستخدم Gadgets موجودة في الـ Binary لتجاوز NX"},
    {q:"ما هو ASLR؟",os:["Address Space Layout Randomization — عشوائية عناوين الذاكرة","Anti-Virus نوع","Assembly Language Runtime","Application Security Layer"],a:0,exp:"ASLR = تقنية حماية تُعشوئ عناوين الـ Stack والـ Heap والـ Libraries في كل تشغيل"},
    {q:"ما هي أداة pwntools؟",os:["Python Framework لكتابة Exploits","Network Scanner","Vulnerability Database","Password Manager"],a:0,exp:"pwntools = أقوى Python Framework لكتابة Exploits واختبار Binary الثغرات"},
    {q:"ما هو Use-After-Free؟",os:["استخدام Pointer لذاكرة تم تحريرها","نوع SQL Injection","Buffer Overflow في Stack","Format String Vulnerability"],a:0,exp:"UAF = استخدام Pointer يشير لـ Memory محررة (freed)، شائع في Heap Exploitation"},
  ]},
  wk76:{title:"Expert Integration — الأسبوع 76",qs:[
    {q:"ما هو Red Team؟",os:["فريق يُحاكي هجمات حقيقية لاختبار الأمن","فريق الدفاع","مجموعة برامج","نوع CTF"],a:0,exp:"Red Team = يُحاكي هجمات APT حقيقية ليختبر دفاعات المؤسسة بشكل واقعي"},
    {q:"ما هو C2 Framework؟",os:["Command & Control — نظام تحكم في الأجهزة المخترقة","نوع Firewall","Cloud Service","Content Management"],a:0,exp:"C2 = Command and Control Framework يتيح للـ Red Team التحكم في الأنظمة المخترقة"},
    {q:"ما هو OSCP؟",os:["Offensive Security Certified Professional","Online Security Course Platform","Operational Security Control Protocol","Open Source Code Project"],a:0,exp:"OSCP = أشهر شهادة Pentesting من Offensive Security، تتطلب اختبار 24 ساعة عملياً"},
    {q:"ما هو الـ CVSS Score لثغرة Critical؟",os:["0.0 – 3.9","4.0 – 6.9","7.0 – 8.9","9.0 – 10.0"],a:3,exp:"Critical = CVSS 9.0–10.0 | مثل: RCE بدون مصادقة"},
    {q:"أول خطوة في أي Pentest احترافي؟",os:["بدء الـ Exploitation","الـ Scoping وتوقيع العقد والـ Rules of Engagement","كتابة الـ Report","تثبيت الأدوات"],a:1,exp:"دائماً: Scoping → Signing Contract → Rules of Engagement قبل أي شيء"},
  ]},
  wk80:{title:"Expert Final — الأسبوع 80",qs:[
    {q:"الفرق بين Pentest وRed Team؟",os:["نفس الشيء","Pentest = نطاق محدد تقني، Red Team = سيناريو هجوم شامل يُحاكي APT","Red Team أسرع دائماً","Pentest يشمل Social Engineering دائماً"],a:1,exp:"Pentest = اختبار نطاق محدد | Red Team = سيناريو هجوم APT كامل متعدد الأوجه"},
    {q:"ما هو أهم مبدأ في OPSEC؟",os:["الهجوم السريع","إخفاء هويتك ومصدرك وأدواتك","الكشف عن كل شيء","استخدام أدوات معروفة فقط"],a:1,exp:"OPSEC = Operational Security، التأكد أن المدافعين لا يعلمون بوجودك"},
    {q:"ما هو Bug Bounty P1 Critical؟",os:["أدنى خطورة","RCE وSQL Injection بيانات حساسة ونقل Arbitrary Files","فقط XSS","CSRF فقط"],a:1,exp:"P1 = Remote Code Execution, SQLi بيانات المستخدمين, Authentication Bypass, Account Takeover"},
    {q:"ما أهم شيء في Pentest Report؟",os:["الأدوات المستخدمة","وصف الثغرة + خطواتها + التأثير + التوصية","عدد ساعات العمل","إثبات الـ Hacking Skills"],a:1,exp:"Report = وصف الثغرة + Proof of Concept + Impact + Recommendation بوضوح"},
    {q:"ما هو الـ Threat Model؟",os:["تحديد المهاجمين المحتملين وأصول النظام الحساسة وناقلات الهجوم","نوع برنامج","قاعدة بيانات Threats","نوع Firewall"],a:0,exp:"Threat Modeling = عملية تحديد منهجية للمخاطر والمهاجمين والأصول الحساسة"},
  ]},
};

// ─────────────────────────────────────────────
//  LEVELS & BADGES
// ─────────────────────────────────────────────
const LEVELS=[
  {lv:0,ar:"مبتدئ",en:"Initiate",min:0,color:"var(--t1)",icon:"🔰"},
  {lv:1,ar:"محلل مبتدئ",en:"Junior Analyst",min:500,color:"#3b82f6",icon:"🔵"},
  {lv:2,ar:"ممارس أمني",en:"Security Practitioner",min:1500,color:"#10b981",icon:"🟢"},
  {lv:3,ar:"مختبر اختراق",en:"Penetration Tester",min:3500,color:"#f59e0b",icon:"🟡"},
  {lv:4,ar:"باحث متقدم",en:"Senior Researcher",min:7000,color:"#f97316",icon:"🟠"},
  {lv:5,ar:"خبير أمني",en:"Expert Hacker",min:12000,color:"#ef4444",icon:"🔴"},
  {lv:6,ar:"فريق أحمر نخبوي",en:"Elite Red Teamer",min:20000,color:"#8b5cf6",icon:"🟣"},
];
const getLevel=(xp)=>{for(let i=LEVELS.length-1;i>=0;i--)if(xp>=LEVELS[i].min)return LEVELS[i];return LEVELS[0];};

const BADGES=[
  {id:"first_blood",icon:"🩸",ar:"أول خطوة",en:"First Blood",desc:"أكملت أول موضوع",xp:20,check:s=>s.totalDone>=1},
  {id:"streak7",icon:"🔥",ar:"مشتعل",en:"On Fire",desc:"7 أيام متواصلة",xp:50,check:s=>s.bestStreak>=7},
  {id:"streak30",icon:"💪",ar:"لا يُوقف",en:"Unstoppable",desc:"30 يوماً متواصلة",xp:150,check:s=>s.bestStreak>=30},
  {id:"streak100",icon:"👑",ar:"الملك",en:"The King",desc:"100 يوم متواصل",xp:500,check:s=>s.bestStreak>=100},
  {id:"quiz_ace",icon:"🎓",ar:"متفوق",en:"Quiz Ace",desc:"اختبار بعلامة 100%",xp:75,check:s=>s.perfectQuiz>=1},
  {id:"p0",icon:"🏗️",ar:"سيد الأساسيات",en:"Foundation Master",desc:"أكملت Foundation Phase",xp:200,check:s=>s.donePhases?.includes("p0")},
  {id:"p1",icon:"🌐",ar:"محارب الويب",en:"Web Warrior",desc:"أكملت Web Phase",xp:400,check:s=>s.donePhases?.includes("p1")},
  {id:"p2",icon:"📱",ar:"خبير الموبايل",en:"Mobile Expert",desc:"أكملت Mobile Phase",xp:350,check:s=>s.donePhases?.includes("p2")},
  {id:"p3",icon:"🏰",ar:"سيد البنية",en:"Infrastructure Pro",desc:"أكملت Infrastructure Phase",xp:500,check:s=>s.donePhases?.includes("p3")},
  {id:"p4",icon:"💎",ar:"الخبير",en:"The Expert",desc:"أكملت Expert Phase",xp:700,check:s=>s.donePhases?.includes("p4")},
  {id:"century",icon:"💯",ar:"مئة موضوع",en:"Centurion",desc:"أكملت 100 موضوع",xp:300,check:s=>s.totalDone>=100},
  {id:"quran",icon:"📖",ar:"حافظ الورد",en:"Quran Keeper",desc:"سجّل الروتين الإسلامي 7 أيام",xp:100,check:s=>s.islamicDays>=7},
];

// ─────────────────────────────────────────────
//  ROUTINE (30 items)
// ─────────────────────────────────────────────
const ROUTINE=[
  {time:"04:30",label:"الاستيقاظ + أذكار الاستيقاظ",type:"islamic",icon:"🌙",detail:"«الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور»"},
  {time:"04:45",label:"صلاة الفجر",type:"prayer",icon:"🕌",detail:"أداء الفريضة + سنة الفجر + أذكار ما بعد الصلاة"},
  {time:"05:05",label:"أذكار الصباح",type:"islamic",icon:"📿",detail:"أذكار الصباح الكاملة من صحيح السنة (15–20 دقيقة)"},
  {time:"05:25",label:"ورد القرآن الكريم",type:"quran",icon:"📖",detail:"تلاوة حزب/ربع/جزء حسب هدفك — مع التدبر (30 دقيقة) | يوم الجمعة: سورة الكهف كاملة"},
  {time:"05:55",label:"مراجعة يوم أمس + Todo",type:"study",icon:"📋",detail:"مراجعة سريعة لما تعلمته أمس + تحديد هدف اليوم (10 دق)"},
  {time:"06:05",label:"🧠 جلسة تعلم رئيسية",type:"study",icon:"💻",detail:"دراسة Track الأساسي — فيديو + ملاحظات (90 دقيقة) — أقوى وقت ذهني"},
  {time:"07:35",label:"رياضة + تمارين",type:"health",icon:"🏃",detail:"مشي أو تمارين خفيفة (30 دقيقة) — لإعادة شحن الطاقة"},
  {time:"08:05",label:"وجبة الإفطار + استراحة",type:"break",icon:"🍳",detail:"وجبة مغذية + استرخاء حقيقي (25 دقيقة)"},
  {time:"08:30",label:"⚙️ تطبيق عملي — Labs",type:"study",icon:"🔧",detail:"حل Labs و Challenges (PortSwigger, TryHackMe, HackTheBox) — 90 دقيقة"},
  {time:"10:00",label:"استراحة ذكية",type:"break",icon:"☕",detail:"استراحة قهوة / قيلولة خفيفة (15 دقيقة)"},
  {time:"10:15",label:"📚 مقالات + Writeups",type:"study",icon:"✍️",detail:"قراءة Writeups وتقارير أمنية ومقالات تقنية (60 دقيقة)"},
  {time:"11:15",label:"صلاة الضحى",type:"prayer",icon:"🕌",detail:"2 إلى 8 ركعات (بركة ونشاط ليومك)"},
  {time:"11:30",label:"🚀 مشاريع شخصية",type:"project",icon:"⚙️",detail:"bbhunter / mbbhunter / open-source contributions (60 دقيقة)"},
  {time:"12:15",label:"🕌 صلاة الجمعة (يوم الجمعة فقط)",type:"prayer",icon:"🕌",detail:"يوم الجمعة: التبكير للمسجد + الإنصات للخطبة + الصلاة + الدعاء في ساعة الإجابة"},
  {time:"12:30",label:"صلاة الظهر",type:"prayer",icon:"🕌",detail:"أداء الفريضة + ذكر الله بعدها"},
  {time:"12:50",label:"وجبة الغداء + قيلولة",type:"break",icon:"🍽️",detail:"وجبة الغداء ثم قيلولة (30–45 دقيقة) — السنة النبوية"},
  {time:"14:00",label:"🎯 CTF / HackTheBox",type:"study",icon:"🚩",detail:"تحديات CTF أو آلة HackTheBox أو TryHackMe (90 دقيقة)"},
  {time:"15:30",label:"صلاة العصر",type:"prayer",icon:"🕌",detail:"أداء الفريضة + أذكار ما بعد العصر — وقت مبارك — الجمعة: الإكثار من الصلاة على النبي ﷺ"},
  {time:"15:45",label:"نشاط خارجي",type:"health",icon:"🌿",detail:"مشي أو رياضة خارجية + تجديد الهواء (30 دقيقة)"},
  {time:"16:15",label:"📝 تدوين الملاحظات",type:"study",icon:"🗒️",detail:"Obsidian أو Notion — تلخيص كل ما تعلمته اليوم (45 دقيقة)"},
  {time:"17:00",label:"مراجعة وFlashcards",type:"study",icon:"🔄",detail:"Anki Flashcards أو مراجعة سريعة للملاحظات (30 دقيقة)"},
  {time:"17:30",label:"أذكار المساء",type:"islamic",icon:"📿",detail:"أذكار المساء الكاملة قبل الغروب (15–20 دقيقة) | الجمعة: الإكثار من الدعاء"},
  {time:"18:00",label:"صلاة المغرب",type:"prayer",icon:"🕌",detail:"أداء الفريضة + ذكر الله بعدها"},
  {time:"18:20",label:"ورد القرآن المسائي",type:"quran",icon:"📖",detail:"تلاوة مسائية هادئة (20 دقيقة)"},
  {time:"18:40",label:"وقت الأهل والعائلة",type:"personal",icon:"👨‍👩‍👧",detail:"أوقات الأهل حق واجب — الرحم والصلة | الجمعة: يوم أسري بامتياز"},
  {time:"19:30",label:"صلاة العشاء",type:"prayer",icon:"🕌",detail:"أداء الفريضة + الوتر + أذكار النوم"},
  {time:"19:50",label:"🌐 Community & GitHub",type:"community",icon:"🌐",detail:"Discord + Twitter/X + GitHub (30 دقيقة) — بناء الشبكة"},
  {time:"20:20",label:"📰 قراءة أخبار أمنية",type:"study",icon:"📰",detail:"Krebs on Security, The Hacker News, Twitter Security (20 دقيقة)"},
  {time:"20:40",label:"مراجعة Todo + تخطيط الغد",type:"study",icon:"✅",detail:"ما أُنجز + ما تأجل + تحديد أهداف الغد الثلاثة الرئيسية"},
  {time:"21:00",label:"🌙 النوم المبكر",type:"break",icon:"😴",detail:"أذكار النوم — الآية الكريمة والمعوذتين — نوم مبارك | رمضان: السحور قبل الفجر"},
];

// ─────────────────────────────────────────────
//  INIT TODOS
// ─────────────────────────────────────────────
const INIT_TODOS=[
  {id:1,text:"إكمال OSI Model Lab على TryHackMe",track:"foundations",priority:"high",done:false,date:"اليوم"},
  {id:2,text:"حل 3 Labs SQL Injection على PortSwigger Academy",track:"web",priority:"high",done:false,date:"اليوم"},
  {id:3,text:"حل 3 Labs XSS على PortSwigger Academy",track:"web",priority:"high",done:false,date:"غداً"},
  {id:4,text:"إعداد بيئة Android (Genymotion + ADB + JADX)",track:"mobile",priority:"medium",done:false,date:"هذا الأسبوع"},
  {id:5,text:"قراءة OWASP Top 10 كاملاً وتدوين ملاحظات",track:"web",priority:"medium",done:false,date:"هذا الأسبوع"},
  {id:6,text:"كتابة ملاحظات اليوم في Obsidian",track:"general",priority:"high",done:false,date:"اليوم"},
  {id:7,text:"حل Bandit Level 0 إلى 10 على OverTheWire",track:"foundations",priority:"medium",done:false,date:"غداً"},
  {id:8,text:"قراءة Writeup Bug Bounty حقيقية من HackerOne",track:"web",priority:"low",done:false,date:"هذا الأسبوع"},
  {id:9,text:"تجربة flaws.cloud Level 1 و 2 (AWS Security)",track:"cloud",priority:"medium",done:false,date:"هذا الأسبوع"},
  {id:10,text:"حل Level 1 من Ethernaut (OpenZeppelin)",track:"web3track",priority:"low",done:false,date:"الشهر القادم"},
  {id:11,text:"تثبيت Volatility 3 وتجربة Memory Forensics",track:"dfir",priority:"low",done:false,date:"الشهر القادم"},
  {id:12,text:"حل CryptoHack — Introduction Challenges",track:"crypto",priority:"medium",done:false,date:"هذا الأسبوع"},
];

// ─────────────────────────────────────────────
//  TRACKS (16 tracks — verified real URLs)
// ─────────────────────────────────────────────
const TRACKS={
  foundations:{id:"foundations",name:"الأساسيات",nameEn:"Foundations",icon:"🏗️",color:"#3b82f6",colorBg:"rgba(59,130,246,0.15)",duration:"2–3 أشهر",desc:"الشبكات، لينكس، البرمجة — نقطة البداية لكل هاكر محترف",
    phases:[
      {id:"f1",name:"Phase 1 — الشبكات",emoji:"🌐",topics:[
         "Lesson 1: نموذج OSI — المقدمة والتاريخ",
         "Lesson 2: Layer 1 Physical — الكابلات والإشارات والـ Hubs",
         "Lesson 3: Layer 2 Data Link — MAC Address وEthernet وSwitches",
         "Lesson 4: Layer 3 Network — IP Addressing والـ Routing",
         "Lesson 5: Layer 4 Transport — TCP vs UDP والـ Ports",
         "Lesson 6: Layer 5-7 — Session / Presentation / Application",
         "Lesson 7: IPv4 — Classes وSubnetting وCIDR Notation",
         "Lesson 8: IPv6 — بنية العنوان والفرق الجوهري عن IPv4",
         "Lesson 9: TCP/IP Model — الـ 4 طبقات مقابل OSI 7",
         "Lesson 10: TCP 3-Way Handshake — SYN / SYN-ACK / ACK",
         "Lesson 11: UDP — Connectionless وأين يُستخدم",
         "Lesson 12: DNS — A / AAAA / MX / CNAME / NS / TXT Records",
         "Lesson 13: DHCP — عملية DORA خطوة بخطوة",
         "Lesson 14: ARP — Broadcast Request وARP Cache",
         "Lesson 15: ICMP — Ping وTraceroute وError Messages",
         "Lesson 16: HTTP/HTTPS — Methods وStatus Codes والـ Headers",
         "Lesson 17: TLS Handshake — Certificate وKey Exchange",
         "Lesson 18: FTP / SSH / Telnet / SMTP — المنافذ والأمان",
         "Lesson 19: VPN — OpenVPN / WireGuard / IPSec",
         "Lesson 20: Wireshark — Capture Filters وDisplay Filters",
         "Lab: تحليل PCAP باستخدام Wireshark عملياً",
         "Lab: Nmap Host Discovery وPort Scanning الأساسي",
       ],
       resources:[
         {title:"مهارة تك — أساسيات شبكات الحاسبات (مجاني بالكامل)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=22"},
         {title:"مهارة تك — تطبيقات شبكات الحاسبات (مجاني بالكامل)",type:"lab",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1179"},
         {title:"CCNA بالعربي — Emad | IT DOSE",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL8s4OGp0649_e_Wbz5MlBgW5rBW-9hD0c"},
         {title:"TryHackMe — Pre-Security Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/presecurity"},
         {title:"Professor Messer — CompTIA Network+ (مجاني)",type:"video",lang:"en",url:"https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/"},
       ]},
      {id:"f2",name:"Phase 2 — لينكس",emoji:"🐧",topics:[
         "Lesson 1: Linux Filesystem Hierarchy — / وكل مجلد لماذا موجود",
         "Lesson 2: Navigation — pwd / ls / cd / tree",
         "Lesson 3: File Operations — cp / mv / rm / mkdir / touch",
         "Lesson 4: Viewing Files — cat / less / more / head / tail",
         "Lesson 5: Text Processing — grep / awk / sed / cut / sort / uniq",
         "Lesson 6: Piping & Redirection — | و > و >> و 2>&1",
         "Lesson 7: File Permissions — rwx / chmod / chown / chgrp",
         "Lesson 8: SUID / SGID / Sticky Bit — ما هي وخطورتها",
         "Lesson 9: Users & Groups — useradd / passwd / /etc/passwd / /etc/shadow",
         "Lesson 10: Process Management — ps / top / kill / jobs / fg / bg",
         "Lesson 11: Package Management — apt / dpkg / snap",
         "Lesson 12: Networking Commands — ifconfig / ip / netstat / ss / curl / wget",
         "Lesson 13: SSH — Key-Based Auth وإعداد Config",
         "Lesson 14: Cron Jobs — Syntax وانتهاز الـ Misconfigurations",
         "Lesson 15: Bash Scripting — Variables / Loops / Conditions / Functions",
         "Lesson 16: Kali Linux — الأدوات والإعداد الأمثل",
         "Lab: OverTheWire Bandit Levels 0–20",
         "Lab: كتابة Script يؤتمت Port Scanning",
       ],
       resources:[
         {title:"Linux بالعربي — Information Technology (Playlist كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLLlr6jKKdyK1FBi3pLVAmilLvMwWHw-84"},
         {title:"OverTheWire: Bandit — أفضل تطبيق عملي (مجاني)",type:"lab",lang:"en",url:"https://overthewire.org/wargames/bandit/"},
         {title:"TryHackMe — Linux Fundamentals Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/module/linux-fundamentals"},
         {title:"Linux Journey — تعليم تفاعلي مجاني",type:"article",lang:"en",url:"https://linuxjourney.com/"},
       ]},
      {id:"f3",name:"Phase 3 — البرمجة للأمن",emoji:"🐍",topics:[
         "Lesson 1: Python — Variables / Data Types / Input / Print",
         "Lesson 2: Python — Conditions (if/elif/else) والـ Loops (for/while)",
         "Lesson 3: Python — Functions وScope والـ Modules",
         "Lesson 4: Python — Lists / Tuples / Dictionaries / Sets",
         "Lesson 5: Python — File I/O — قراءة وكتابة الملفات",
         "Lesson 6: Python — Exception Handling (try/except/finally)",
         "Lesson 7: Python — OOP أساسيات (Classes وObjects)",
         "Lesson 8: Python — socket Library لبناء Port Scanner",
         "Lesson 9: Python — requests Library لـ HTTP Requests",
         "Lesson 10: Python — re Module للـ Regex في الأمن",
         "Lesson 11: Python — subprocess وos.system لتشغيل Commands",
         "Lesson 12: Python — كتابة Exploit بسيط عملي",
         "Lesson 13: JavaScript — Variables / DOM / Events (لفهم XSS)",
         "Lesson 14: SQL — SELECT / INSERT / UPDATE / DELETE (لفهم SQLi)",
         "Lesson 15: SQL — UNION Queries وError-based Basics",
         "Lesson 16: Bash Scripting — For Loops وAutomate Recon",
         "Lab: بناء Port Scanner بالكامل بـ Python",
         "Lab: Automate Directory Bruteforce بـ Python",
       ],
       resources:[
         {title:"Python بالعربي — Elzero Web School (Playlist كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs"},
         {title:"Automate the Boring Stuff with Python (كتاب مجاني)",type:"book",lang:"en",url:"https://automatetheboringstuff.com/"},
         {title:"TCM Security — Python 101 للهاكرز (YouTube مجاني)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=egg-GoT5iVk"},
       ]},
      {id:"f4",name:"Phase 4 — أساسيات الأمن",emoji:"🔐",topics:[
         "Lesson 1: CIA Triad — Confidentiality وIntegrity وAvailability",
         "Lesson 2: AAA Framework — Authentication / Authorization / Accounting",
         "Lesson 3: Symmetric Encryption — AES-128/256 / DES / 3DES",
         "Lesson 4: Asymmetric Encryption — RSA وكيف يتبادل المفاتيح",
         "Lesson 5: Hashing — MD5 / SHA-1 / SHA-256 / bcrypt والفرق",
         "Lesson 6: Digital Signatures وCertificates وPKI",
         "Lesson 7: Authentication Methods — Password / MFA / Biometrics",
         "Lesson 8: Authorization — RBAC / ABAC / Least Privilege",
         "Lesson 9: Vulnerabilities vs Exploits vs Payloads — الثالوث",
         "Lesson 10: CVE — Common Vulnerabilities and Exposures الشرح الكامل",
         "Lesson 11: CVSS Score — كيف تُقرأ 0–10 والـ Metrics",
         "Lesson 12: OWASP Top 10 — المقدمة والمفاهيم",
         "Lesson 13: Defense in Depth — Layered Security Strategy",
         "Lesson 14: Threat / Vulnerability / Risk — الفرق والعلاقة",
         "Lesson 15: Firewalls / IDS / IPS — الأساسيات",
         "Lesson 16: Security Policies وCompliance (ISO 27001, NIST)",
          "Lab: قراءة CVE حقيقية وفهم CVSS Score",
          "Lab: مراجعة OWASP Top 10 الرسمية كاملاً",
          "بلاك سايلنس م1 — Introduction To Workshop",
          "بلاك سايلنس م2 — Introduction To Cybersecurity : Part 1",
          "بلاك سايلنس م3 — Introduction To Cybersecurity : Part 2",
          "بلاك سايلنس م4 — Important Cybersecurity Concepts And Definitions : Part 1",
          "بلاك سايلنس م5 — Important Cybersecurity Concepts And Definitions : Part 2",
          "بلاك سايلنس م6 — Network Basics : Part 1",
          "بلاك سايلنس م7 — Network Basics : Part 2",
          "بلاك سايلنس م8 — Network Basics : Part 3",
          "بلاك سايلنس م9 — Network Basics : Part 4",
          "بلاك سايلنس م10 — Network Basics : Part 5",
          "بلاك سايلنس م11 — Linux Basics : Part 1",
          "بلاك سايلنس م12 — Linux Basics : Part 2",
          "بلاك سايلنس م13 — Linux Basics : Part 3",
          "بلاك سايلنس م14 — Linux Basics : Part 4",
          "بلاك سايلنس م15 — Linux Basics : Part 5",
          "CyMatriX م1 — Introduction to Cybersecurity",
          "CyMatriX م2 — Network Introduction and Protocols",
          "CyMatriX م3 — Network + شرح",
          "CyMatriX م4 — Network Revision (الزيتونة)",
          "CyMatriX م5 — Kali Linux for Beginners",
          "CyMatriX م6 — شرح + Security بالكامل",
          "CyMatriX م7 — Cryptography Basics",
          "CyMatriX م8 — Web Basics (Part 1)",
          "CyMatriX م9 — Web Basics (Part 2)",
          "CyMatriX م10 — Authentication ثغرة",
          "CyMatriX م11 — Path Traversal ثغرة",
          "CyMatriX م12 — Advanced bug bounty tips & tricks",
          "CISSP م1 — Course introduction (مقدمه عن الدوره)",
          "CISSP م2 — Exam blue print",
          "CISSP م3 — Domain 1-1: Security and Risk management- Security Concepts",
          "CISSP م4 — Domain 1-2: Information Security Governance and Frameworks",
          "CISSP م5 — Domain 1-3: Information Security roles, documents and Personal security",
          "CISSP م6 — Domain 1-4: Risk Management",
          "CISSP م7 — Domain 1-5: Business Continuity and Code of Ethics",
          "CISSP م8 — Domain 1-6: Threat Modeling",
          "CISSP م9 — Domain 2: Asset Security",
          "CISSP م10 — Domain 3-1: Security Engineering Development Architecture",
        ],
        resources:[
          {title:"مهارة تك — Cyber Security Engineer Job Profile 🏅 (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1004"},
         {title:"مهارة تك — مقدمة في الأمن السيبراني (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=148"},
         {title:"مهارة تك — Ethical Hacking (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=244"},
         {title:"مهارة تك — أمن الشبكات المتقدم (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=560"},
         {title:"CompTIA Security+ — Professor Messer (مجاني)",type:"video",lang:"en",url:"https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"},
         {title:"TryHackMe — Pre-Security & SOC Level 1",type:"lab",lang:"en",url:"https://tryhackme.com/paths"},
         {title:"OWASP Top 10 — الدليل الرسمي",type:"article",lang:"en",url:"https://owasp.org/www-project-top-ten/"},
          {title:"Get BountyOrDie — Basics Resources",type:"article",lang:"ar",url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest"},
          {title:"Cybersecurity Basics For Beginners — BlackSilence (Playlist)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5"},
          {title:"كورس Cybersecurity for beginner to master bug bounty hunter — CyMatriX",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez"},
          {title:"Security (in Arabic) — Ayman Bahaa-Eldin (تشفير)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV"},
           {title:"CISSP Exam Preparation Arabic — Ahmed Abdelhamid",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLwPnN230DSEAqIPD673UWoO770s5wYzz4"},
           {title:"Web Pen-Testing Course (بالإنجليزية) — The Cyber Mentor",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLP66taSxlNLPVijghTy-sVx7tLmTft6hR"},
         ]},
      ]},
    web:{id:"web",name:"Web Pentesting",nameEn:"Web App Pentesting & Bug Bounty",icon:"🌐",color:"#10b981",colorBg:"rgba(16,185,129,0.15)",duration:"4–6 أشهر",desc:"اختبار اختراق تطبيقات الويب، Bug Bounty، OWASP Top 10",
    phases:[
      {id:"w1",name:"Phase 1 — أساسيات الويب",emoji:"🔌",topics:[
         "Lesson 1: HTTP Protocol — Request Structure (Method / URL / Headers / Body)",
         "Lesson 2: HTTP Methods — GET / POST / PUT / PATCH / DELETE / OPTIONS",
         "Lesson 3: HTTP Status Codes — 1xx / 2xx / 3xx / 4xx / 5xx",
         "Lesson 4: HTTP Headers — Host / Content-Type / Authorization / Cookie",
         "Lesson 5: HTTPS وTLS — كيف يُشفّر الاتصال وشهادات SSL",
         "Lesson 6: كيف تعمل تطبيقات الويب — Client / Server / Database",
         "Lesson 7: Cookies — Attributes (Secure/HttpOnly/SameSite) وأهميتها",
         "Lesson 8: Sessions — Session ID وSession Hijacking",
         "Lesson 9: Burp Suite — Installation وإعداد Proxy",
         "Lesson 10: Burp Suite — Intercept وRepeat وIntruder",
         "Lesson 11: Burp Suite — Decoder وComparer وSequencer",
         "Lesson 12: Authentication vs Authorization — الفرق والأمثلة",
         "Lesson 13: Same-Origin Policy (SOP) — ما تسمح به وما تمنعه",
         "Lesson 14: CORS — التعريف والـ Headers والثغرات",
         "Lesson 15: REST APIs — Endpoints / JSON / Status Codes",
         "Lesson 16: GraphQL — Query / Mutation / Introspection",
          "Lab: Intercept وتعديل HTTP Requests ببـ Burp Suite",
          "Lab: PortSwigger Labs — HTTP الأساسية",
          "Cybrary Web م1 — Introduction (مترجم عربي)",
          "Cybrary Web م2 — Tools (مترجم عربي)",
          "Cybrary Web م3 — Packets (مترجم عربي)",
          "Cybrary Web م4 — HTTP Basics (مترجم عربي)",
          "Cybrary Web م5 — Why Sites Get Hacked (1) (مترجم عربي)",
          "Cybrary Web م6 — Why Sites Get Hacked (2) (مترجم عربي)",
          "Cybrary Web م7 — Why Sites Get Hacked (3) (مترجم عربي)",
          "Cybrary Web م8 — Why Sites Get Hacked (4) (مترجم عربي)",
        ],
        resources:[
          {title:"Web Pentest بالعربي — Ebrahem Hegazy (Zigoo0) Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLv7cogHXoVhXvHPzIl1dWtBiYUAL8baHj"},
         {title:"Web Pentest بالعربي — Flex Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3"},
         {title:"PortSwigger Web Security Academy (مجاني 100%)",type:"lab",lang:"en",url:"https://portswigger.net/web-security"},
          {title:"Sec-88 GitBook — Nour Sallam (مرجع عربي شامل)",type:"article",lang:"ar",url:"https://sallam.gitbook.io/sec-88/web-appsec"},
           {title:"Cybrary Web App Pen Testing — مترجم عربي (CWWC)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo"},
           {title:"Web Pen-Testing Course — The Cyber Mentor (بالإنجليزية)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp"},
         ]},
        {id:"w2",name:"Phase 2 — OWASP Top 10",emoji:"⚡",topics:[
         "Lesson 1: SQL Injection — مقدمة ومفهوم الحقن",
         "Lesson 2: SQLi — Error-Based: استخراج البيانات عبر رسائل الخطأ",
         "Lesson 3: SQLi — UNION-Based: استخراج بيانات من جداول أخرى",
         "Lesson 4: SQLi — Blind Boolean-Based: استنتاج البيانات True/False",
         "Lesson 5: SQLi — Time-Based Blind باستخدام SLEEP()",
         "Lesson 6: SQLi — sqlmap: الأتمتة الكاملة",
         "Lesson 7: XSS Reflected — الـ Payload يُعكس في الـ Response",
         "Lesson 8: XSS Stored — الـ Payload يُحفظ في قاعدة البيانات",
         "Lesson 9: XSS DOM-Based — الـ Payload في DOM بدون Server",
         "Lesson 10: XSS — Cookie Stealing وAccount Takeover",
         "Lesson 11: CSRF — Cross-Site Request Forgery الاستغلال",
         "Lesson 12: CSRF — Bypass SameSite Cookie وCSRF Token",
         "Lesson 13: IDOR — Insecure Direct Object Reference بالأمثلة",
         "Lesson 14: File Upload — Bypass Extension Validation",
         "Lesson 15: File Upload — Webshell Upload وRCE",
         "Lesson 16: Path Traversal — ../ وLFI وRFI",
         "Lesson 17: Command Injection — OS Command في تطبيقات الويب",
         "Lesson 18: Open Redirect — استغلاله في Phishing",
         "Lesson 19: Clickjacking — X-Frame-Options Bypass",
         "Lesson 20: Broken Authentication — Brute Force وWeak Passwords",
         "Lab: PortSwigger SQLi Labs 1–18",
         "Lab: PortSwigger XSS Labs 1–30",
         "Lab: DVWA — جميع التحديات",
       ],
       resources:[
         {title:"مهارة تك — OWASP Top 10 Web 2021 (مجاني بالكامل) 🏅",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1232"},
         {title:"مهارة تك — DevSecOps باستخدام أدوات OWASP (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1105"},
         {title:"مهارة تك — دورة SSDLC الكاملة (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1052"},
         {title:"PortSwigger — SQL Injection Labs (مجاني)",type:"lab",lang:"en",url:"https://portswigger.net/web-security/sql-injection"},
         {title:"PortSwigger — XSS Labs (مجاني)",type:"lab",lang:"en",url:"https://portswigger.net/web-security/cross-site-scripting"},
         {title:"PortSwigger — CSRF Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/csrf"},
         {title:"Rana Khalil — Web Security Academy Video Series (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/channel/UCKaK-XPQAbznwIISC46b1oA"},
         {title:"DVWA — Damn Vulnerable Web App (GitHub)",type:"lab",lang:"en",url:"https://github.com/digininja/DVWA"},
         {title:"HowToHunt — Bug Bounty Checklist (GitHub)",type:"writeup",lang:"en",url:"https://github.com/KathanP19/HowToHunt"},
       ]},
      {id:"w3",name:"Phase 3 — الثغرات المتقدمة",emoji:"🚀",topics:[
         "Lesson 1: SSRF — Server-Side Request Forgery المفهوم والاستغلال",
         "Lesson 2: SSRF — Internal Service Scanning عبر الـ Server",
         "Lesson 3: SSRF — Cloud Metadata (AWS 169.254.169.254)",
         "Lesson 4: SSRF — Bypass Filters (DNS Rebinding / URL Encoding)",
         "Lesson 5: XXE — XML External Entity Injection مفهوم وأمثلة",
         "Lesson 6: XXE — File Read وSSRF عبر XXE",
         "Lesson 7: XXE — Blind XXE باستخدام Out-of-Band",
         "Lesson 8: SSTI — Server-Side Template Injection (Jinja2/Twig/Smarty)",
         "Lesson 9: SSTI — من الـ Detection للـ RCE",
         "Lesson 10: Prototype Pollution — في JavaScript وNode.js",
         "Lesson 11: JWT Attacks — Algorithm None وAlgorithm Confusion",
         "Lesson 12: JWT Attacks — RS256 → HS256 Confusion لتزوير Tokens",
         "Lesson 13: Race Conditions — Limit Overrun وTime-of-Check",
         "Lesson 14: HTTP Request Smuggling — CL.TE وTE.CL",
         "Lesson 15: GraphQL — Introspection وBatching وDOS",
         "Lesson 16: Web Cache Poisoning — Host Header Injection",
         "Lesson 17: OAuth 2.0 — Authorization Code Flow والثغرات",
         "Lesson 18: OAuth — State Parameter Bypass وOpen Redirect Chain",
         "Lab: PortSwigger SSRF Labs",
         "Lab: PortSwigger JWT Labs",
         "Lab: PortSwigger XXE Labs",
       ],
       resources:[
         {title:"PortSwigger — SSRF Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/ssrf"},
         {title:"PortSwigger — JWT Attacks Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/jwt"},
         {title:"PortSwigger — XXE Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/xxe"},
         {title:"PortSwigger — HTTP Request Smuggling Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/request-smuggling"},
         {title:"PortSwigger — Race Conditions Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/race-conditions"},
         {title:"HackTricks — Web Pentesting Reference",type:"article",lang:"en",url:"https://book.hacktricks.xyz/pentesting-web"},
       ]},
      {id:"w4",name:"Phase 4 — Bug Bounty Methodology",emoji:"💰",topics:[
         "Lesson 1: Bug Bounty Platforms — HackerOne / Bugcrowd / Intigriti / Immunefi",
         "Lesson 2: قراءة Program Policy وتحديد Scope بدقة",
         "Lesson 3: Recon Step 1 — Subdomain Enumeration بـ subfinder وamass",
         "Lesson 4: Recon Step 2 — DNS Brute Force وAlt-DNS",
         "Lesson 5: Recon Step 3 — httpx لفلترة الـ Live Subdomains",
         "Lesson 6: Recon Step 4 — Waybackurls وGAU لـ URL Archive",
         "Lesson 7: Content Discovery — ffuf وgobuster وferoxbuster",
         "Lesson 8: Google Dorks — site: / inurl: / filetype: / intitle:",
         "Lesson 9: GitHub Dorking — البحث عن API Keys وSecrets",
         "Lesson 10: Nuclei — تشغيل Templates والفهم العميق",
         "Lesson 11: JavaScript Analysis — LinkFinder وSecretFinder",
         "Lesson 12: Parameter Discovery — ParamSpider وArjun",
         "Lesson 13: Subdomain Takeover Hunting — subjack وSubzy",
         "Lesson 14: CVSS Scoring لتقييم شدة الثغرة",
         "Lesson 15: كتابة Bug Bounty Report احترافي — التنسيق والمكونات",
         "Lesson 16: Triage Process — ما يحدث بعد الإرسال",
          "Lab: تطبيق Methodology كاملة على Target حقيقي",
          "Lab: كتابة Report محترف لثغرة اكتشفتها",
          "rs0n_live م1 — Bug Bounty Hunting for Client-Side Injection | Part I",
          "rs0n_live م2 — Bug Bounty Hunting for Client-Side Injection | Part II",
          "rs0n_live م3 — Bug Bounty Hunting for IDORs and Access Control | Part I",
          "rs0n_live م4 — Bug Bounty Hunting for IDORs and Access Control | Part II",
          "rs0n_live م5 — Bug Bounty Hunting for IDORs and Access Control | Part III",
          "rs0n_live م6 — Weaponizing XSS to Show Impact",
          "rs0n_live م7 — Scan All H1 & Bugcrowd Programs for XSS Targets",
          "rs0n_live م8 — Methodology to Bypass Security Controls & Exploit XSS",
          "rs0n_live م9 — What Can We Learn From These Three Simple Reports?",
          "rs0n_live م10 — Three Common OAuth Misconfigurations Leading to ATO",
          "mahdi م1 — الفرق بين Authentication و Authorization | Access Control",
          "mahdi م2 — Why I Cannot Get Bounties in Bug Bounty?",
          "mahdi م3 — Race Condition (Time-Sensitive Bugs)",
          "mahdi م4 — RC, PE, FC, PD — Easy Money with Honey",
          "mahdi م5 — Privilege Escalation + IDOR — 2 Bugs 1 Hit POCs",
          "mahdi م6 — Privilege Escalation Finding in External Program",
          "mahdi م7 — ما هو الـ API وما فائدته وكيف يعمل",
          "mahdi م8 — Business Logic Error ثغرات | مصادر للتطور",
          "mahdi م9 — AI Will Automate The IDORs (ChatGPT)",
          "mahdi م10 — Step-by-Step Guide to Get IDOR in Live Programs",
          "mahdi م11 — Step-by-Step Guide to Get 2 Privilege Escalation",
          "mahdi م12 — $3,000 Instagram Delete Highlight Cover IDOR",
          "mahdi م13 — How to Use Jira Software for Beginners",
          "mahdi م14 — Auth0 in 100 Seconds | Next.js Auth Tutorial",
          "mahdi م15 — IDOR — Magisto Send via Email PoC",
        ],
        resources:[
          {title:"Recon بالعربي — Critical Glitch Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL76MuQ6v56X8tNsbtB1OsSegz2jHHRRmG"},
         {title:"Get BountyOrDie — Recon & Web Resources (بالعربي)",type:"article",lang:"ar",url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest"},
         {title:"HackerOne — Disclosed Reports (Writeups حقيقية)",type:"writeup",lang:"en",url:"https://hackerone.com/hacktivity"},
         {title:"Pentester Land — Bug Bounty Writeups Compilation",type:"writeup",lang:"en",url:"https://pentester.land/writeups/"},
         {title:"NahamSec — Recon Playlist (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLKAaMVNxvLmAkqBkzFaOxqs3L66z2n8LA"},
          {title:"InsiderPhD — Bug Bounty للمبتدئين (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/c/InsiderPhD"},
          {title:"Bug Bounty Hunting For... — rs0n_live (XSS, IDOR, OAuth)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1"},
          {title:"my fav bug -*-*-* — mahdi (IDOR, Race Condition, PE بالعربي)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx"},
        ]},
     ]},
   mobile:{id:"mobile",name:"Mobile Security",nameEn:"Android Pentesting & Bug Bounty",icon:"📱",color:"#f59e0b",colorBg:"rgba(245,158,11,0.15)",duration:"3–5 أشهر",desc:"تحليل واختبار اختراق تطبيقات الأندرويد من الصفر",
    phases:[
      {id:"mob1",name:"Phase 1 — أساسيات الأندرويد",emoji:"🤖",topics:[
         "Lesson 1: Android Architecture — Kernel / HAL / ART / Framework / Apps",
         "Lesson 2: Android Security Model — Sandboxing وUID Isolation",
         "Lesson 3: APK Structure — classes.dex / AndroidManifest.xml / res / assets",
         "Lesson 4: AndroidManifest.xml — Permissions / exported / Intent Filters",
         "Lesson 5: Activity — ما هي وكيف تُستغل",
         "Lesson 6: Service — Background Tasks وأخطارها الأمنية",
         "Lesson 7: BroadcastReceiver — Exported Receivers والاستغلال",
         "Lesson 8: ContentProvider — Data Sharing والثغرات",
         "Lesson 9: Intents — Explicit / Implicit وIntent Hijacking",
         "Lesson 10: Android Storage — Internal / External / SharedPreferences / SQLite",
         "Lesson 11: ADB — adb devices / shell / install / pull / push",
         "Lesson 12: ADB — logcat / am start / pm list packages",
         "Lesson 13: Android Emulator — إعداد AVD وGenymotion",
         "Lesson 14: Root — ما هو وفائدته في الاختبار (Magisk)",
          "Lab: تحليل APK بسيط باستخدام ADB",
          "Lab: قراءة AndroidManifest.xml وفهم الـ Permissions",
          "عملي: Android Pentesting Basics — تجربة حقيقية (1) — Abdulrahman",
          "عملي: Insecure Data Storage & Insecure Logging — APK Extraction (2)",
          "عملي: Android Components Attacks وFirebase Misconfiguration (3)",
          "عملي: Android Native Library Analysis (4)",
          "عملي: C# based Android Apps Analysis (5)",
          "عملي: Dynamic Analysis باستخدام drozer Framework (6)",
          "عملي: Frida Framework — Dynamic Analysis عملي (7)",
          "عملي: Patching Android Applications — إعادة التجميع (8)",
          "عملي: Traffic Interception وSSL Pinning Bypass (9)",
          "عملي: Root Detection Bypass Techniques (10)",
          "عملي: Objection Framework — Dynamic Analysis متقدم",
          "عملي: Android Exploitation — Hack The Box Track | الجزء 1",
          "عملي: Android Exploitation — Hack The Box Track | الجزء 2",
          "عملي: Task Hijacking Vulnerability في أندرويد",
          "عملي: WebView Security Testing — اختبار WebViews",
          "PentestHint م1 — Android Pentesting Approach and Checklist",
          "PentestHint م2 — Decompile APK to JAR with dex2jar and JDGUI",
          "PentestHint م3 — Read AndroidManifest.xml with APKTOOL",
          "PentestHint م4 — Deploy Root/Non-Root Phone on Android Studio",
          "PentestHint م5 — Setup MOBSF on Docker (Mobile Static Analyzer)",
          "PentestHint م6 — Install/Setup Genymotion Virtual Phone",
          "PentestHint م7 — ADB Commands Full Guide",
          "PentestHint م8 — Intercept HTTPS with Burp Suite on Emulator",
          "PentestHint م9 — Export IPA from iPhone without iTunes",
          "PentestHint م10 — Export IPA from iPhone in Windows 11",
          "PentestHint م11 — Jailbreak iPhone 7 (iOS 14.8)",
          "PentestHint م12 — Code Obfuscation in Android Pentesting",
          "PentestHint م13 — Manually Sign APKs with keytool Jarsigner",
          "PentestHint م14 — Mobile Pentesting Lab Setup (Mobexler)",
          "Cyber_Pharaohs م1 — Course Intro: Mobile PT Overview",
          "Cyber_Pharaohs م2 — Android Architecture",
          "Cyber_Pharaohs م3 — Android Security Model",
          "Cyber_Pharaohs م4 — Android Application Permissions",
          "Cyber_Pharaohs م5 — App Journey: APK Path to Execution",
          "Cyber_Pharaohs م6 — ADB Part 1: Basic Commands",
          "Cyber_Pharaohs م7 — ADB Part 2: Advanced Usage",
          "Cyber_Pharaohs م8 — Reverse Engineering APK Basics",
          "AppSec Hub م1 — Android Penetration Testing Process Part 1",
          "AppSec Hub م2 — Android Penetration Testing Process Part 2",
          "AppSec Hub م3 — Android Security Architecture",
          "AppSec Hub م4 — Application Security and Signing Process",
          "AppSec Hub م5 — Windows JADX GUI Installation",
          "AppSec Hub م6 — Windows ADB Installation",
          "AppSec Hub م7 — Windows APKTool Installation",
          "AppSec Hub م8 — Windows Android Studio Install",
          "AppSec Hub م9 — Kali Linux ADB Install",
          "AppSec Hub م10 — Kali Linux APKTool Install",
          "AppSec Hub م11 — Kali Linux JADX GUI Install",
          "AppSec Hub م12 — Kali Linux Android Studio Install",
          "AppSec Hub م13 — Mac Brew Installation and Guidance",
          "AppSec Hub م14 — Mac JADX GUI",
          "AppSec Hub م15 — Mac APKTool",
        ],
         resources:[
           {title:"Android Pentesting Roadmap — A0xTrojan Notion",type:"article",lang:"ar",url:"https://almond-fontina-ed4.notion.site/Road-map-Android-20190050c671803e8b13f608601c3bb3"},
          {title:"Mobile Security Notes — 0x5atab Notion",type:"article",lang:"ar",url:"https://0x5atab.notion.site/MOBILE-SECURITY-17490ba198d280b497c5fb1d41387288"},
          {title:"OWASP MASTG — Mobile Application Security Testing Guide",type:"book",lang:"en",url:"https://mas.owasp.org/MASTG/"},
          {title:"Android Applications Penetration Testing — Abdulrahman (بالعربي)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F"},
          {title:"Mobile Application Pentesting — PentestHint (هندي/إنجليزي)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ"},
          {title:"Mobile Applications Penetration Testing — Cyber_Pharaohs",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q"},
          {title:"Full Android Penetration Testing Course — AppSec Hub",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t"},
          {title:"Android Pentesting Series — AumLayer (OWASP Mobile Top 10)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14"},
           {title:"Free Android Application Security Course — Mobile Hacking Lab",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr"},
           {title:"MOBISEC — Mobile Security Course (إنجليزي)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK"},
           {title:"MOBISEC 2 — Advanced Mobile Security (إنجليزي)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLo-yDpB0Omq7mBKkynWZWIMePEJjAjSTn"},
         ]},
       {id:"mob2",name:"Phase 2 — Static & Dynamic Analysis",emoji:"🔍",topics:[
         "Lesson 1: Static Analysis — المفهوم وما تبحث عنه",
         "Lesson 2: JADX-GUI — Decompile APK وتصفح الكود Java/Kotlin",
         "Lesson 3: JADX-GUI — البحث عن Hardcoded Secrets وAPI Keys",
         "Lesson 4: JADX-GUI — تحليل الـ Network Calls وEndpoints",
         "Lesson 5: APKTool — Decompile وRepack وSignature",
         "Lesson 6: MobSF — Automated Static & Dynamic Analysis",
         "Lesson 7: MobSF — قراءة التقرير وفهم النتائج",
         "Lesson 8: Dynamic Analysis — إعداد Burp Suite مع الجهاز/المحاكي",
         "Lesson 9: SSL Pinning — ما هو ولماذا يمنع الـ Interception",
         "Lesson 10: Frida — Installation وأول Script",
         "Lesson 11: Frida — Hooking Functions بـ JavaScript",
         "Lesson 12: Frida — SSL Pinning Bypass Script",
         "Lesson 13: Objection — SSL Pinning Bypass بـ أمر واحد",
         "Lesson 14: Objection — File System / SQLite / SharedPreferences Dump",
         "Lesson 15: Runtime Analysis — adb logcat لمراقبة الـ Logs",
         "Lesson 16: Network Traffic Analysis — مراقبة اتصالات التطبيق",
         "Lab: Decompile APK حقيقي وإيجاد API Key مخفي",
         "Lab: SSL Pinning Bypass بـ Objection على تطبيق حقيقي",
       ],
       resources:[
         {title:"JADX-GUI — GitHub (أداة مجانية)",type:"lab",lang:"en",url:"https://github.com/skylot/jadx"},
         {title:"MobSF — Mobile Security Framework (GitHub مجاني)",type:"lab",lang:"en",url:"https://github.com/MobSF/Mobile-Security-Framework-MobSF"},
         {title:"Frida — الموقع الرسمي والتوثيق",type:"article",lang:"en",url:"https://frida.re/docs/home/"},
         {title:"Objection Framework — GitHub (SSL Pinning Bypass)",type:"lab",lang:"en",url:"https://github.com/sensepost/objection"},
         {title:"Android Reports & Resources — B3nac (GitHub)",type:"writeup",lang:"en",url:"https://github.com/B3nac/Android-Reports-and-Resources"},
       ]},
      {id:"mob3",name:"Phase 3 — OWASP Mobile Top 10 & Bug Bounty",emoji:"💰",topics:[
         "Lesson 1: M1 — Improper Credential Usage: Hardcoded Creds والاستغلال",
         "Lesson 2: M2 — Inadequate Supply Chain Security",
         "Lesson 3: M3 — Insecure Authentication/Authorization",
         "Lesson 4: M4 — Insufficient Input/Output Validation (SQL/Command Injection في Mobile)",
         "Lesson 5: M5 — Insecure Communication — HTTP / Weak TLS / No Pinning",
         "Lesson 6: M6 — Inadequate Privacy Controls — PII Exposure",
         "Lesson 7: M7 — Insufficient Binary Protections — Anti-Tamper وObfuscation",
         "Lesson 8: M8 — Security Misconfiguration — Exported Activities وDebug Mode",
         "Lesson 9: M9 — Insecure Data Storage — External Storage / SQLite / Logs",
         "Lesson 10: M10 — Insufficient Cryptography — ECB Mode / Hardcoded Key",
         "Lesson 11: DIVA Android — Challenges 1–13 كل ثغرة على حدة",
         "Lesson 12: InsecureBankv2 — Exploitation الكاملة",
         "Lesson 13: InjuredAndroid — CTF Challenges حل مفصل",
         "Lesson 14: Mobile Bug Bounty — أين تجد تطبيقات الـ Scope",
         "Lesson 15: Mobile Bug Bounty Report — التنسيق والخطوات",
          "Lab: تطبيق OWASP Mobile Top 10 على DIVA",
          "Lab: كتابة Report موبايل احترافي",
          "AumLayer م1 — Introduction to Mobile Penetration Testing",
          "AumLayer م2 — Android Architecture and Compilation",
          "AumLayer م3 — Dynamic Analysis Lab Setup (Burp + Genymotion)",
          "AumLayer م4 — Mobile Pentesting Lab: JADX + ADB + APKTool",
          "AumLayer م5 — Installing MobSF for SAST/DAST",
          "AumLayer م6 — Static Analysis: JADX and Secret Keys",
          "AumLayer م7 — Dynamic Analysis of Android Application",
          "AumLayer م8 — OWASP M1: Improper Platform Usage",
          "AumLayer م9 — OWASP M2: Insecure Data Storage",
          "AumLayer م10 — OWASP M3: Insecure Communication",
          "AumLayer م11 — OWASP M4: Insecure Authentication",
          "AumLayer م12 — Multiple Ways to Bypass SSL Pinning (Frida/Objection/apkmitm)",
          "AumLayer م13 — OWASP M5: Insufficient Cryptography",
          "AumLayer م14 — OWASP M6: Insecure Authorization",
          "AumLayer م15 — OWASP M7: Poor Code Quality",
          "MHL م1 — Full Free Android App Security Course Intro",
          "MHL م2 — Android Application Security Introduction",
          "MHL م3 — Android Architecture: Introduction 1",
          "MHL م4 — Android Architecture: Linux Kernel",
          "MHL م5 — Android Architecture: HAL",
          "MHL م6 — Android Architecture: Libraries + Runtime",
          "MHL م7 — Android Architecture: Java API & Apps",
          "MHL م8 — Android Security",
          "MHL م9 — Android Application Structure",
          "MHL م10 — Android IPC",
          "MHL م11 — Android Application Publishing",
          "MHL م12 — Pen Testing Basics: Host Software Setup",
          "MHL م13 — Pen Testing Basics: ADB",
          "MHL م14 — Pen Testing Basics: Local Device Setup",
          "MHL م15 — Pentesting Basics: MHL Device Setup",
        ],
        resources:[
          {title:"مهارة تك — OWASP Top 10 Mobile 2016 (مجاني بالكامل) 🏅",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1143"},
         {title:"OWASP MASTG — دليل الاختبار الكامل (مجاني)",type:"lab",lang:"en",url:"https://mas.owasp.org/MASTG/"},
         {title:"DIVA Android — Damn Insecure Vulnerable App (GitHub)",type:"lab",lang:"en",url:"https://github.com/payatu/diva-android"},
         {title:"InjuredAndroid — CTF-Style App (GitHub)",type:"lab",lang:"en",url:"https://github.com/B3nac/InjuredAndroid"},
         {title:"AndroGoat — OWASP Practice App (GitHub)",type:"lab",lang:"en",url:"https://github.com/satishpatnayak/AndroGoat"},
       ]},
    ]},
  api:{id:"api",name:"API Security",nameEn:"API Hacking & Security",icon:"🔌",color:"#8b5cf6",colorBg:"rgba(139,92,246,0.15)",duration:"2–3 أشهر",desc:"اختبار أمان REST APIs وGraphQL وكشف ثغرات BOLA/IDOR",
    phases:[
      {id:"api1",name:"Phase 1 — API Fundamentals",emoji:"📡",topics:[
         "Lesson 1: API مقدمة — ما هو الـ API وأنواعه",
         "Lesson 2: REST Architecture — Stateless / Resources / Endpoints",
         "Lesson 3: HTTP Methods — GET / POST / PUT / PATCH / DELETE / OPTIONS / HEAD",
         "Lesson 4: JSON Format — Syntax / Objects / Arrays / Types",
         "Lesson 5: XML Format — Elements / Attributes وComparison مع JSON",
         "Lesson 6: API Authentication — API Keys: في Header / Query / Body",
         "Lesson 7: API Authentication — Basic Auth وDigest Auth",
         "Lesson 8: JWT — Structure (Header.Payload.Signature) والتحقق",
         "Lesson 9: OAuth 2.0 — Authorization Code / Implicit / Client Credentials",
         "Lesson 10: Postman — Collection / Environments / Variables",
         "Lesson 11: Postman — Authorization / Pre-request Scripts / Tests",
         "Lesson 12: GraphQL — Schema / Types / Query / Mutation / Subscription",
         "Lesson 13: GraphQL Introspection — الاستعلام عن Schema كامل",
         "Lesson 14: Swagger / OpenAPI Spec — قراءة الـ API Documentation",
         "Lesson 15: Rate Limiting — X-RateLimit Headers وBypass Techniques",
         "Lesson 16: API Versioning — v1 / v2 وماذا يعني في الـ Pentesting",
         "Lab: إعداد Postman واستكشاف API حقيقي",
         "Lab: Burp Suite مع API Testing",
       ],
       resources:[
         {title:"API Hacking RoadMap — Cyber Samurai Notion",type:"article",lang:"ar",url:"https://cyber-samurai.notion.site/API-Hacking-RoadMap-0817ef70509649dfaec2891ffba1f7db"},
         {title:"PortSwigger — GraphQL API Vulnerabilities Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/graphql"},
         {title:"Postman — Learning Center (مجاني)",type:"article",lang:"en",url:"https://learning.postman.com/docs/getting-started/introduction/"},
         {title:"OWASP API Security Top 10 — الدليل الرسمي",type:"article",lang:"en",url:"https://owasp.org/www-project-api-security/"},
       ]},
      {id:"api2",name:"Phase 2 — OWASP API Security Top 10",emoji:"⚡",topics:[
         "Lesson 1: API1 — BOLA / IDOR: تغيير ID للوصول لموارد مستخدمين آخرين",
         "Lesson 2: API1 — BOLA Horizontal vs Vertical Privilege Escalation",
         "Lesson 3: API2 — Broken Authentication: بدون Token / Weak Token",
         "Lesson 4: API2 — JWT Bypass وBrute Force API Keys",
         "Lesson 5: API3 — Mass Assignment: isAdmin=true / role=admin",
         "Lesson 6: API3 — كيف تكتشف Mass Assignment في API غير موثق",
         "Lesson 7: API4 — Unrestricted Resource Consumption: لا Rate Limiting",
         "Lesson 8: API5 — BFLA: Broken Function Level Authorization",
         "Lesson 9: API6 — Unrestricted Access to Sensitive Business Flows",
         "Lesson 10: API7 — Server Side Request Forgery في APIs",
         "Lesson 11: API8 — Security Misconfiguration: CORS / Debug / Verbose Errors",
         "Lesson 12: API9 — Improper Inventory Management: Legacy APIs / Hidden Endpoints",
         "Lesson 13: API10 — Unsafe Consumption of APIs: Third-party Trust Issues",
         "Lesson 14: Fuzzing API Endpoints — ffuf وwfuzz مع API",
         "Lesson 15: API Key Leakage — GitHub / JS Files / Error Messages",
         "Lab: vAPI — تطبيق جميع الثغرات",
         "Lab: crAPI — Advanced API Security Challenges",
       ],
       resources:[
         {title:"vAPI — Vulnerable API Practice App (GitHub)",type:"lab",lang:"en",url:"https://github.com/roottusk/vapi"},
         {title:"crAPI — Completely Ridiculous API (OWASP GitHub)",type:"lab",lang:"en",url:"https://github.com/OWASP/crAPI"},
         {title:"Damn Vulnerable GraphQL — DVGA (GitHub)",type:"lab",lang:"en",url:"https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application"},
         {title:"HackTricks — API Pentesting Reference",type:"article",lang:"en",url:"https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql"},
         {title:"InsiderPhD — API Security Testing (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/c/InsiderPhD"},
       ]},
    ]},
  network:{id:"network",name:"Network Pentest",nameEn:"Network Penetration Testing",icon:"🕸️",color:"#ef4444",colorBg:"rgba(239,68,68,0.15)",duration:"3–4 أشهر",desc:"اختبار اختراق الشبكات، Metasploit، Post-Exploitation",
    phases:[
      {id:"net1",name:"Phase 1 — Scanning & Enumeration",emoji:"🔭",topics:[
         "Lesson 1: Nmap — Host Discovery: -sn / -PE / -PS / -PA",
         "Lesson 2: Nmap — Port Scanning: -sS / -sT / -sU / -sA",
         "Lesson 3: Nmap — Version Detection: -sV / -A / --version-intensity",
         "Lesson 4: Nmap — OS Detection: -O وقراءة النتائج",
         "Lesson 5: Nmap — NSE Scripts: --script vuln / smb-enum / http-enum",
         "Lesson 6: Nmap — Output Formats: -oN / -oX / -oG / -oA",
         "Lesson 7: Masscan — Fast Network Scanning (ملايين حزمة/ثانية)",
         "Lesson 8: Shodan — البحث عن الهدف بـ Filters (org: / port: / country:)",
         "Lesson 9: SMB Enumeration — smbclient / enum4linux / crackmapexec",
         "Lesson 10: NFS Enumeration — showmount وNFS Misconfigurations",
         "Lesson 11: SNMP Enumeration — onesixtyone / snmpwalk",
         "Lesson 12: LDAP Enumeration — ldapsearch / BloodHound",
         "Lesson 13: FTP Enumeration — Anonymous Login والـ Misconfigs",
         "Lesson 14: OpenVAS / Nessus — Vulnerability Scanning Report",
         "Lesson 15: Wireshark — Protocol Analysis وFollowing TCP Streams",
         "Lesson 16: Responder — LLMNR / NBT-NS Poisoning وHash Capture",
          "Lab: Nmap Full Scan على HackTheBox Machine",
          "Lab: SMB + LDAP Enumeration كامل",
          "eJPTv2 م1 — Passive Information Gathering #1 | تجميع معلومات",
          "eJPTv2 م2 — Passive Information Gathering #2",
          "eJPTv2 م3 — Passive Information Gathering #3",
          "eJPTv2 م4 — Passive Information Gathering #4",
          "eJPTv2 م5 — Active Information Gathering #1",
          "eJPTv2 م6 — Active Information Gathering #2 + تطبيق عملي",
          "eJPTv2 م7 — Footprinting & Scanning: أساسيات الشبكات #1",
          "eJPTv2 م8 — Footprinting & Scanning: أساسيات الشبكات #2",
          "eJPTv2 م9 — تابع أساسيات الشبكات",
          "eJPTv2 م10 — Footprinting & Scanning: أساسيات الشبكات #3",
          "eJPTv2 م11 — Assessment Methodologies: Host Discovery",
          "eJPTv2 م12 — Host Discovery عملي | اكتشاف الأجهزة",
          "eJPTv2 م13 — Assessment Methodologies: Port Scanning",
          "eJPTv2 م14 — Port Scanning #2 | فحص البورتات",
          "eJPTv2 م15 — Nmap Script | استعمال السكريبتات",
        ],
         resources:[
          {title:"مهارة تك — مقدمة في أمن الشبكات (مجاني بالكامل) 🏅",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=560"},
          {title:"مهارة تك — Network Security Engineer Job Profile (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1183"},
          {title:"Nmap — التوثيق الرسمي الكامل",type:"article",lang:"en",url:"https://nmap.org/book/man.html"},
          {title:"TryHackMe — Network Security Path",type:"lab",lang:"en",url:"https://tryhackme.com/paths"},
          {title:"HackTricks — Network Services Pentesting",type:"article",lang:"en",url:"https://book.hacktricks.xyz/network-services-pentesting"},
          {title:"VulnHub — Practice Machines (مجاني)",type:"lab",lang:"en",url:"https://www.vulnhub.com/"},
          {title:"eJPTv2 Course — Cyberock (اختبار اختراق بالعربي كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b"},
          {title:"Zero to Hero Network Pentesting — TCM (The Cyber Mentor)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj"},
          {title:"FSU Offensive Security Lectures — جامعة فلوريدا (مجاني)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq"},
          {title:"Cyber Weapons Lab — Null Byte (Pentesting عملي)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT"},
          {title:"Penetration Testing بالعربي — Ahmed Abdelazeem (8 جلسات)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X"},
        ]},
      {id:"net2",name:"Phase 2 — Exploitation & Post-Exploitation",emoji:"💥",topics:[
         "Lesson 1: Metasploit — msfconsole Navigation وأوامره الأساسية",
         "Lesson 2: Metasploit — search / use / show options / set / run",
         "Lesson 3: Metasploit — Payloads: staged vs stageless / meterpreter",
         "Lesson 4: Metasploit — Post-Exploitation Modules (hashdump / sysinfo)",
         "Lesson 5: MITM Attacks — ARP Spoofing بـ bettercap",
         "Lesson 6: MITM — SSL Stripping وCredential Capture",
         "Lesson 7: Hashcat — Modes: -m 0/1000/3200 وWordlists",
         "Lesson 8: Hashcat — Rules وMask Attack وCombinator",
         "Lesson 9: John the Ripper — --format وCustom Rules",
         "Lesson 10: Pass-the-Hash — Impacket psexec.py / wmiexec.py",
         "Lesson 11: Pass-the-Hash — CrackMapExec: cme smb -H",
         "Lesson 12: Linux PrivEsc — SUID / Sudo / Cron / Capabilities",
         "Lesson 13: Windows PrivEsc — Unquoted Service Path / DLL Hijacking",
         "Lesson 14: Pivoting — SSH Tunneling (-L / -R / -D)",
         "Lesson 15: Pivoting — Chisel وSocat للـ Port Forwarding",
         "Lesson 16: Persistence — Cron Jobs / Registry Run Keys / Scheduled Tasks",
         "Lesson 17: Covering Tracks — Log Clearing / Timestomping",
          "Lab: HackTheBox Linux Box من Scan حتى Root",
          "Lab: HackTheBox Windows Box من Scan حتى Admin",
          "TCM Zero to Hero E1 — Course Intro, Notekeeping, Linux Basics",
          "TCM Zero to Hero E2 — Python 101 for Pentesters",
          "TCM Zero to Hero E3 — Python 102 & Building a Port Scanner",
          "TCM Zero to Hero E4 — Five Phases of Hacking & Passive OSINT",
          "TCM Zero to Hero E5 — Scanning Tools (Nmap, Nessus, BurpSuite)",
          "TCM Zero to Hero E6 — Enumeration: Kioptrix & Hack The Box",
          "TCM Zero to Hero E7 — Exploitation, Shells & Credential Stuffing",
          "TCM Zero to Hero E8 — Building AD Lab, LLMNR Poisoning & NTLMv2 Cracking",
          "TCM Zero to Hero E9 — NTLM Relay, Token Impersonation, Pass the Hash, PsExec",
          "TCM Zero to Hero E10 — MS17-010/EternalBlue, GPP/cPasswords & Kerberoasting",
           "TCM Zero to Hero E11 — File Transfers, Pivoting & Reporting Writing",
           "PT Arabic م1 — Intro to Pen Testing",
           "PT Arabic م2 — Scanning",
           "PT Arabic م3 — Vulnerability Scanning",
           "PT Arabic م4 — Exploitation",
           "PT Arabic م5 — Linux Privilege Escalation",
           "PT Arabic م6 — Windows Privilege Escalation",
           "PT Arabic م7 — Password Attacks & AV Evasion",
            "PT Arabic م8 — Buffer Overflow",
            "FSU Lec 02 — Offensive Computer Security",
            "FSU Lec 03 — Offensive Computer Security",
            "FSU Lec 04 — Offensive Computer Security",
            "FSU Lec 05 — Offensive Computer Security",
            "FSU Lec 07 — Offensive Computer Security",
            "FSU Lec 08 — Offensive Computer Security",
            "FSU — Fuzzing Presentation 2014",
            "FSU Lec 10P1 — Advanced Fuzzing Topics",
            "FSU Lec 10P2 — Exploit Development 101",
            "FSU Lec 11 — Exploit Development 102",
            "FSU Lec 12 — Exploit Development 103",
            "FSU Lec 13 — Networking 101",
            "FSU Lec 14 — Networking 102",
            "FSU Lec 15 — Web Application Hacking/Security 101",
        ],
        resources:[
          {title:"TCM Security — Practical Ethical Hacking (Free on YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=fNzpcB7ODxQ"},
         {title:"GTFOBins — Linux Privilege Escalation",type:"article",lang:"en",url:"https://gtfobins.github.io/"},
         {title:"LOLBAS — Windows Living Off The Land",type:"article",lang:"en",url:"https://lolbas-project.github.io/"},
          {title:"TryHackMe — Offensive Pentesting Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/pentesting"},
          {title:"HackTheBox — Starting Point (مجاني)",type:"lab",lang:"en",url:"https://app.hackthebox.com/starting-point"},
          {title:"Penetration Testing بالعربي — abdelazeem (مبتدئين)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X"},
        ]},
     ]},
   ad:{id:"ad",name:"Active Directory",nameEn:"Active Directory & Red Team",icon:"🏰",color:"#dc2626",colorBg:"rgba(220,38,38,0.15)",duration:"4–6 أشهر",desc:"اختراق بيئات Active Directory وعمليات Red Team",
    phases:[
      {id:"ad1",name:"Phase 1 — AD Fundamentals",emoji:"🏛️",topics:[
         "Lesson 1: Active Directory — ما هو ولماذا يستهدفه المهاجمون",
         "Lesson 2: AD Structure — Forest / Tree / Domain / OU",
         "Lesson 3: Domain Controller — دوره وأهميته",
         "Lesson 4: AD Objects — Users / Groups / Computers / GPOs",
         "Lesson 5: SAMAccountName وUserPrincipalName والـ SID",
         "Lesson 6: Kerberos — الـ Authentication Flow خطوة بخطوة",
         "Lesson 7: Kerberos — TGT: Ticket Granting Ticket (AS-REQ/AS-REP)",
         "Lesson 8: Kerberos — TGS: Service Ticket (TGS-REQ/TGS-REP)",
         "Lesson 9: NTLM Authentication — Challenge/Response Flow",
         "Lesson 10: LDAP — بنية الـ Directory وAD Queries",
         "Lesson 11: BloodHound — Installation وإعداد Neo4j",
         "Lesson 12: SharpHound — جمع البيانات وتحميلها لـ BloodHound",
         "Lesson 13: BloodHound — Queries: Shortest Path to DA",
         "Lesson 14: PowerShell AD Enum — Get-ADUser / Get-ADComputer / Get-ADGroup",
         "Lesson 15: PowerView — Enumeration للـ AD بشكل أعمق",
         "Lesson 16: AD Trust Relationships — Forest Trust / External Trust",
          "Lab: إعداد AD Lab المنزلي بـ Windows Server",
          "Lab: BloodHound Enumeration كاملة على AD Lab",
          "Windows م1 — كيف يعمل نظام تشغيل ويندوز",
          "Windows م2 — أساسيات التعامل مع أوامر CMD",
          "Windows م3 — أساسيات التعامل مع أوامر PowerShell",
          "Windows م4 — التعامل مع الـ Processes في ويندوز",
          "Windows م5 — التعامل مع الـ Services في ويندوز",
          "Windows م6 — التعامل مع الـ Scheduled Tasks",
          "Windows م7 — أهم الـ System Utilities في ويندوز",
          "Windows م8 — التعامل مع الـ Registry",
          "Windows م9 — التعامل مع الـ Sharing في ويندوز",
          "Windows م10 — التعامل مع الـ Logging في ويندوز",
          "Windows م11 — التعامل مع الـ WSL في ويندوز",
        ],
         resources:[
           {title:"TCM Security — Practical AD Pentesting (Free YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=pKtDptF5HA4"},
          {title:"BloodHound — GitHub الرسمي",type:"lab",lang:"en",url:"https://github.com/BloodHoundAD/BloodHound"},
          {title:"TryHackMe — Active Directory Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/room/winadbasics"},
          {title:"HackTricks — Active Directory Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology"},
          {title:"Windows for Cybersecurity Professionals — تكناوي دوت نيت (دورة ويندوز كاملة)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv"},
        ]},
       {id:"ad2",name:"Phase 2 — AD Attacks",emoji:"⚔️",topics:[
         "Lesson 1: LLMNR/NBT-NS Poisoning — Responder لجمع NTLM Hashes",
         "Lesson 2: NTLM Relay Attack — ntlmrelayx.py وتحويل الـ Hash",
         "Lesson 3: Pass-the-Hash — CrackMapExec: --sam / --lsa / -x cmd",
         "Lesson 4: Pass-the-Hash — Evil-WinRM للوصول بـ Hash",
         "Lesson 5: Kerberoasting — Request TGS وكسر كلمة مرور Service Account",
         "Lesson 6: Kerberoasting — GetUserSPNs.py والـ Hashcat -m 13100",
         "Lesson 7: AS-REP Roasting — حسابات بلا Pre-Authentication",
         "Lesson 8: AS-REP Roasting — GetNPUsers.py والكسر",
         "Lesson 9: DCSync Attack — secretsdump.py ومتطلباته",
         "Lesson 10: Golden Ticket — mimikatz lsadump::dcsync + kerberos::golden",
         "Lesson 11: Silver Ticket — استهداف Service محدد",
         "Lesson 12: Lateral Movement — PSExec / WMI / WinRM",
         "Lesson 13: Pass-the-Ticket — استخدام TGT مسروق",
         "Lesson 14: BloodHound — تحليل Attack Paths وتنفيذها",
         "Lesson 15: ACL / ACE Abuse — GenericAll / WriteDACL / ForceChangePassword",
         "Lesson 16: AD Certificate Services (ADCS) Attacks — ESC1-ESC8",
         "Lesson 17: Group Policy Objects — GPO Abuse للـ Persistence",
         "Lab: Kerberoasting على AD Lab من الصفر حتى Hash",
         "Lab: BloodHound Attack Path تنفيذ كامل",
       ],
       resources:[
         {title:"HackTricks — Kerberoasting",type:"article",lang:"en",url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/kerberoast"},
         {title:"VulnAD — Vulnerable AD Lab (GitHub)",type:"lab",lang:"en",url:"https://github.com/WazeHell/vulnerable-AD"},
         {title:"Impacket — Python AD Tools (GitHub)",type:"lab",lang:"en",url:"https://github.com/SecureAuthCorp/impacket"},
         {title:"HackTheBox — Pro Labs (RastaLabs, Offshore)",type:"lab",lang:"en",url:"https://www.hackthebox.com/hacker/pro-labs"},
       ]},
    ]},
  malware:{id:"malware",name:"Malware Analysis",nameEn:"Malware Analysis & Reverse Engineering",icon:"🦠",color:"#06b6d4",colorBg:"rgba(6,182,212,0.15)",duration:"4–6 أشهر",desc:"تحليل البرمجيات الخبيثة والهندسة العكسية",
    phases:[
      {id:"mal1",name:"Phase 1 — Malware Analysis Foundations",emoji:"🧱",topics:[
         "Lesson 1: Assembly x86 — Registers: EAX / EBX / ECX / EDX / ESP / EBP / EIP",
         "Lesson 2: Assembly — Instructions: MOV / PUSH / POP / CALL / RET / JMP",
         "Lesson 3: Assembly — Conditional Jumps: JE / JNE / JG / JL / JZ",
         "Lesson 4: Assembly — Stack Frame: Prologue / Epilogue / Local Variables",
         "Lesson 5: Windows Internals — Processes / Threads / Handles",
         "Lesson 6: Windows Internals — Virtual Memory / VirtualAlloc / VirtualProtect",
         "Lesson 7: Windows Internals — DLLs: LoadLibrary / GetProcAddress",
         "Lesson 8: PE Format — DOS Header / PE Header / Optional Header",
         "Lesson 9: PE Format — Sections: .text / .data / .rdata / .rsrc",
         "Lesson 10: PE Format — Import Table (IAT) والـ Suspicious APIs",
         "Lesson 11: Static Analysis — PEStudio: Flags / Strings / Imports",
         "Lesson 12: Static Analysis — strings / FLOSS لاستخراج الـ Strings المخفية",
         "Lesson 13: Static Analysis — DIE / ExeInfoPE لكشف الـ Packer",
         "Lesson 14: Entropy Analysis — قيمة > 7.0 تعني تشفير أو Packing",
         "Lesson 15: Dynamic Analysis — Process Monitor: Filter وتتبع Events",
         "Lesson 16: Dynamic Analysis — Process Hacker: Process Tree / Memory",
         "Lesson 17: Sandbox Analysis — ANY.RUN Interactive وتفسير النتائج",
         "Lesson 18: Sandbox Analysis — Cuckoo Self-Hosted Setup",
         "Lesson 19: Ghidra — Import / Analysis / Decompiler / Function Renaming",
         "Lesson 20: x64dbg — Breakpoints / Stepping F7-F9 / Memory View",
         "Lesson 21: YARA Rules — Strings / Hex / Conditions / Testing",
         "Lesson 22: IOC Extraction — Network / Registry / File Indicators",
          "Lab: Static Analysis لـ Ransomware Sample حقيقي",
          "Lab: Dynamic Analysis ومراقبة الـ C2 Traffic",
          "BlackSilence M1 — Introduction To Malware Analysis Workshop",
          "BlackSilence M2 — Programming Basics For Malware Analysts Part 1",
          "BlackSilence M3 — Programming Basics For Malware Analysts Part 2",
          "BlackSilence M4 — Python for Malware Analysts Part 1",
          "BlackSilence M5 — Python for Malware Analysts Part 2",
          "BlackSilence M6 — Revision And Task Discussion",
          "BlackSilence M7 — Revision & C Programming Introduction",
          "BlackSilence M8 — Introduction To C Programming Part 2",
          "BlackSilence M9 — Introduction To C Programming Part 3",
          "BlackSilence M10 — Introduction To C Programming Part 4",
          "BlackSilence M11 — Introduction To C Programming Part 5",
          "BlackSilence M12 — Introduction To C Programming Part 6",
          "BlackSilence M13 — CPU Architecture Basics",
          "BlackSilence M14 — Network Basics Part 1",
          "BlackSilence M15 — Network Basics Part 2",
        ],
        resources:[
          {title:"Practical Malware Analysis — كتاب Nostarch (المرجع الأساسي)",type:"book",lang:"en",url:"https://nostarch.com/malware"},
         {title:"Ghidra — NSA Free Disassembler (GitHub)",type:"lab",lang:"en",url:"https://github.com/NationalSecurityAgency/ghidra"},
         {title:"x64dbg — Open Source Debugger (GitHub)",type:"lab",lang:"en",url:"https://github.com/x64dbg/x64dbg"},
         {title:"ANY.RUN — Interactive Sandbox (مجاني)",type:"lab",lang:"en",url:"https://any.run/"},
         {title:"MalwareBazaar — عينات حقيقية للتحليل (مجاني)",type:"lab",lang:"en",url:"https://bazaar.abuse.ch/"},
          {title:"OpenSecurityTraining2 — مجاني بالكامل",type:"video",lang:"en",url:"https://opensecuritytraining.info/"},
          {title:"Malware Analysis Fundamentals — BlackSilence (دورة كاملة)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4"},
        ]},
     ]},
   ctf:{id:"ctf",name:"CTF & Wargames",nameEn:"CTF Competitions & Practice",icon:"🚩",color:"#f97316",colorBg:"rgba(249,115,22,0.15)",duration:"مستمر",desc:"تحديات CTF، تطبيق المهارات، المسابقات الأمنية",
    phases:[
      {id:"ctf1",name:"Phase 1 — CTF Basics & Wargames",emoji:"🎯",topics:[
         "Lesson 1: CTF Types — Web / Crypto / Forensics / Pwn / Reverse Engineering / Misc",
         "Lesson 2: CTF Platform Setup — Kali Linux / Tools / Methodology",
         "Lesson 3: Web CTF — Burp Suite + Developer Tools + Source Code",
         "Lesson 4: Crypto CTF Basics — Caesar / ROT13 / Vigenere / XOR",
         "Lesson 5: Crypto CTF — Base64 / Hex / Binary / ASCII Decoding",
         "Lesson 6: Crypto CTF — RSA Basics وكشف الـ Weak Key",
         "Lesson 7: Forensics CTF — File Identification بـ file / magic bytes",
         "Lesson 8: Forensics CTF — Steganography: strings / steghide / zsteg / exiftool",
         "Lesson 9: Forensics CTF — PCAP Analysis بـ Wireshark / tshark",
         "Lesson 10: Forensics CTF — File Carving بـ Binwalk وForemost",
         "Lesson 11: Reversing CTF — Ghidra: Decompile البرنامج وفهم المنطق",
         "Lesson 12: Reversing CTF — strings وltrace وstrace",
         "Lesson 13: Pwn CTF — Buffer Overflow الأساسي: Python + pwntools",
         "Lesson 14: CyberChef — Magic Mode وتحديد الـ Encoding تلقائياً",
         "Lesson 15: CTF Methodology — كيف تتعامل مع تحدي جديد خطوة بخطوة",
         "Lesson 16: PicoCTF — Walkthrough للمستوى المبتدئ",
         "Lesson 17: OverTheWire Bandit — أفضل بداية لـ CTF",
          "Lab: PicoCTF — حل 10 تحديات مع توثيق الحل",
          "Lab: OverTheWire Natas — Web CTF للمبتدئين",
          "DFIRHub CTF 1 — HTB مقدمة عن تحديات CTF",
          "DFIRHub CTF 2 — Digital Forensics CTF بالعربي",
          "DFIRHub CTF 3 — Steganography CTF Challenges",
          "DFIRHub CTF 4 — Memory Forensics CTF",
          "DFIRHub CTF 5 — Packet Analysis & Misc CTF",
          "DFIRHub CTF 6 — Web CTF Challenges Part 1",
          "DFIRHub CTF 7 — Web CTF Challenges Part 2",
          "DFIRHub CTF 8 — Web CTF Challenges Part 3",
          "DFIRHub CTF 9 — Cryptography CTF Part 1",
          "DFIRHub CTF 10 — Cryptography CTF Part 2",
          "DFIRHub CTF 11 — Cryptography CTF Part 3",
          "SATTAM CTF #0 — Introduction to CTFs (بالعربي)",
          "SATTAM CTF #1 — Forensics 101 Challenge",
          "SATTAM CTF #2 — Talking LS Challenge",
          "SATTAM CTF #3 — Exif & WOW...So Meta Challenges",
          "SATTAM CTF #4 — POST Practice Challenge",
          "SATTAM CTF #5 — Wireshark For CTF",
          "SATTAM CTF #6 — Wireshark Challenges",
          "SATTAM CTF #7 — Forensics Hex Signature Format",
          "Mina CTF #1 — Introduction to CTF (بالعربي)",
          "Mina CTF #2 — Forensics 101 CTFLearn",
          "Mina CTF #3 — Taking ls Challenge CTFlearn",
          "Mina CTF #4 — 07601 Challenge CTFlearn",
          "Mina CTF #5 — POST Practice Challenge CTFlearn",
          "Mina CTF #6 — Android Reverse Engineering CTFlearn",
          "Mina CTF #7 — TUX Forensics Challenge CTFlearn",
          "Mina CTF #8 — Lazy Game Binary Challenge CTFlearn",
          "Mina CTF #9 — Where Can My Robot Go CTFlearn",
          "Mina CTF #10 — WOW So META Forensics",
          "Mina CTF #11 — Binwalk Forensics Challenge",
          "Mina CTF — Learn Reverse Engineering in Arabic",
          "Mina CTF — SQL Injection Basics in Arabic",
          "FSU Lec 1 — Offensive Computer Security Introduction",
        ],
         resources:[
          {title:"CTF101 — Getting Started Guide (مجاني)",type:"article",lang:"en",url:"https://ctf101.org/"},
          {title:"PicoCTF — للمبتدئين من Carnegie Mellon (مجاني)",type:"lab",lang:"en",url:"https://picoctf.org/"},
          {title:"OverTheWire — Wargames كاملة (Bandit,Natas,Leviathan)",type:"lab",lang:"en",url:"https://overthewire.org/wargames/"},
          {title:"CTFtime — مسابقات CTF الحية حول العالم",type:"lab",lang:"en",url:"https://ctftime.org/"},
          {title:"CyberChef — أداة تشفير وتحليل شاملة (مجاني)",type:"lab",lang:"en",url:"https://gchq.github.io/CyberChef/"},
          {title:"CTF Writeups — GitHub Collection",type:"writeup",lang:"en",url:"https://github.com/sajjadium/ctf-archives"},
          {title:"Introduction to CTF in Arabic — DFIRHub (بالعربي)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks"},
          {title:"CTF Course — SATTAM (شروحات CTF بالعربي)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLtJkL6CnLVXM-YZcyKrCWylperkismVHv"},
          {title:"Learn CTF and Cyber Security in Arabic — Mina Ashraf",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA"},
          {title:"FSU Offensive Security — CTF Style Lectures (English)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq"},
        ]},
     ]},
  cloud:{id:"cloud",name:"Cloud Security",nameEn:"Cloud Security (AWS/Azure/GCP)",icon:"☁️",color:"#0ea5e9",colorBg:"rgba(14,165,233,0.15)",duration:"3–5 أشهر",desc:"اختبار اختراق بيئات AWS وAzure وGCP — المجال الأسرع نمواً",
    phases:[
      {id:"cloud1",name:"Phase 1 — Cloud Fundamentals",emoji:"🌩️",topics:[
         "Lesson 1: Cloud Models — Public / Private / Hybrid Cloud",
         "Lesson 2: Service Models — IaaS / PaaS / SaaS والأمثلة",
         "Lesson 3: Shared Responsibility Model — من المسؤول عن ماذا",
         "Lesson 4: AWS IAM — Users / Groups / Roles / Policies / Permissions",
         "Lesson 5: AWS IAM — Trust Relationships / AssumeRole / Cross-Account",
         "Lesson 6: AWS EC2 — Instances / Security Groups / Key Pairs",
         "Lesson 7: AWS S3 — Bucket Policies / ACLs / Public Access Settings",
         "Lesson 8: AWS Lambda — Serverless Functions وثغراتها",
         "Lesson 9: AWS VPC — Subnets / Security Groups / NACLs",
         "Lesson 10: AWS CLI — aws configure / s3 ls / iam list-users",
         "Lesson 11: AWS Metadata Service (IMDS) — IMDSv1 vs IMDSv2",
         "Lesson 12: Azure Core Services — Azure AD / Storage / VM / Functions",
         "Lesson 13: Azure CLI — az login / az account list / az role assignment",
         "Lesson 14: GCP Core Services — IAM / Compute / GCS / Cloud Functions",
         "Lesson 15: gcloud CLI — gcloud auth / gcloud projects list",
         "Lesson 16: Kubernetes Basics — Pods / Services / RBAC",
         "Lab: إعداد AWS Free Tier وتجربة الأوامر الأساسية",
         "Lab: flaws.cloud — AWS Security CTF المستوى 1–3",
       ],
       resources:[
         {title:"flaws.cloud — AWS Security CTF مجاني (Scott Piper)",type:"lab",lang:"en",url:"http://flaws.cloud/"},
         {title:"flaws2.cloud — AWS Security CTF مستوى متقدم",type:"lab",lang:"en",url:"http://flaws2.cloud/"},
         {title:"HackTricks Cloud — مرجع شامل",type:"article",lang:"en",url:"https://cloud.hacktricks.xyz/"},
       ]},
      {id:"cloud2",name:"Phase 2 — AWS & Multi-Cloud Pentesting",emoji:"🔓",topics:[
         "Lesson 1: AWS IAM PrivEsc — iam:PassRole / iam:CreateAccessKey",
         "Lesson 2: AWS IAM PrivEsc — Lambda Invoke / EC2 UserData Injection",
         "Lesson 3: AWS IAM PrivEsc — enumerate-iam.py لاكتشاف الصلاحيات",
         "Lesson 4: S3 Misconfigurations — Public Bucket / AnonRead / AnonWrite",
         "Lesson 5: S3 Misconfigurations — Bucket Enumeration بـ s3scanner",
         "Lesson 6: EC2 SSRF → IMDS Attack — استخراج credentials",
         "Lesson 7: IMDSv1 — curl http://169.254.169.254/latest/meta-data/",
         "Lesson 8: Secrets Manager — ثغرة Exposure في Environment Variables",
         "Lesson 9: Pacu — AWS Exploitation Framework: enum / privesc / exfil",
         "Lesson 10: CloudGoat — Scenario: vulnerable_lambda / iam_privesc_by_rollback",
         "Lesson 11: Azure AD Attacks — Password Spray / MFA Bypass",
         "Lesson 12: Azure AD — Service Principal Abuse وSecret Leakage",
         "Lesson 13: GCP IAM — Default Service Account Abuse",
         "Lesson 14: Kubernetes — RBAC Misconfiguration / Pod Escape",
         "Lesson 15: Kubernetes — Service Account Token Abuse",
         "Lesson 16: ScoutSuite — Multi-Cloud Audit كامل",
         "Lesson 17: Prowler — CIS Benchmark للـ AWS",
         "Lab: flaws.cloud levels 4–6 (Advanced)",
         "Lab: CloudGoat — iam_privesc_by_attachment Scenario",
       ],
       resources:[
         {title:"CloudGoat — Vulnerable-by-Design AWS Lab (GitHub)",type:"lab",lang:"en",url:"https://github.com/RhinoSecurityLabs/cloudgoat"},
         {title:"Pacu — AWS Exploitation Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/RhinoSecurityLabs/pacu"},
         {title:"HackTricks Cloud — AWS Pentesting",type:"article",lang:"en",url:"https://cloud.hacktricks.xyz/pentesting-cloud/aws-security"},
         {title:"ScoutSuite — Multi-Cloud Security Auditing (GitHub)",type:"lab",lang:"en",url:"https://github.com/nccgroup/ScoutSuite"},
         {title:"Prowler — AWS/Azure/GCP Security Tool (GitHub)",type:"lab",lang:"en",url:"https://github.com/prowler-cloud/prowler"},
       ]},
    ]},
  osint:{id:"osint",name:"OSINT & Recon",nameEn:"OSINT & Advanced Reconnaissance",icon:"🔭",color:"#a855f7",colorBg:"rgba(168,85,247,0.15)",duration:"2–3 أشهر",desc:"جمع المعلومات، Footprinting، التحقيق المفتوح المصدر",
    phases:[
      {id:"osint1",name:"Phase 1 — OSINT Foundations",emoji:"🧭",topics:[
         "Lesson 1: OSINT Framework — المفهوم والـ Lifecycle",
         "Lesson 2: Passive vs Active Recon — الفرق الجوهري",
         "Lesson 3: Whois Lookup — تفاصيل الدومين والـ Registrar",
         "Lesson 4: DNS Enumeration — nslookup / dig / host",
         "Lesson 5: DNSDumpster — رسم DNS Records بيانياً",
         "Lesson 6: Shodan — Dorks متقدمة: port:22 org:Google country:SA",
         "Lesson 7: Censys وFofa — بدائل Shodan لأهداف مختلفة",
         "Lesson 8: theHarvester — جمع Emails / Subdomains / IPs",
         "Lesson 9: Google Dorks — site: inurl: intitle: filetype: intext:",
         "Lesson 10: Google Dorks — البحث عن Sensitive Files وLogin Pages",
         "Lesson 11: Sherlock — Username Hunting عبر 300+ Platform",
         "Lesson 12: Social Media OSINT — LinkedIn / Twitter / Facebook",
         "Lesson 13: Wayback Machine — تاريخ الموقع والـ Archived Pages",
         "Lesson 14: ExifTool — استخراج Metadata من الصور والوثائق",
         "Lesson 15: Maltego — رسم خريطة العلاقات (Entities & Transforms)",
         "Lesson 16: OSINT للأفراد — Email Verification / Phone OSINT",
         "Lab: جمع معلومات كاملة عن هدف حقيقي بـ Passive OSINT",
         "Lab: Google Dorking — إيجاد Exposed Files/Creds",
       ],
       resources:[
         {title:"OSINT Framework — المرجع الشامل",type:"article",lang:"en",url:"https://osintframework.com/"},
         {title:"TryHackMe — Intro to OSINT",type:"lab",lang:"en",url:"https://tryhackme.com/room/ohsint"},
         {title:"Sherlock — Username OSINT Tool (GitHub)",type:"lab",lang:"en",url:"https://github.com/sherlock-project/sherlock"},
         {title:"theHarvester — Email & Subdomain OSINT (GitHub)",type:"lab",lang:"en",url:"https://github.com/laramies/theHarvester"},
         {title:"IntelTechniques — Michael Bazzell OSINT Resources",type:"article",lang:"en",url:"https://inteltechniques.com/tools/"},
       ]},
      {id:"osint2",name:"Phase 2 — Advanced OSINT & Tools",emoji:"🕵️",topics:[
         "Lesson 1: Amass — in-scope Subdomain Enumeration مع API Keys",
         "Lesson 2: Subfinder — سرعة ودقة في Passive Subdomain Discovery",
         "Lesson 3: Assetfinder — جمع Assets من مصادر متعددة",
         "Lesson 4: httpx — فلترة Live Subdomains وأخذ Screenshots",
         "Lesson 5: Certificate Transparency — crt.sh لإيجاد Subdomains مخفية",
         "Lesson 6: Recon-ng — Framework للـ OSINT بنظام Modules",
         "Lesson 7: SpiderFoot — Automated OSINT على هدف واحد",
         "Lesson 8: GitHub Dorking — filename: / extension: / في:code API_KEY",
         "Lesson 9: TruffleHog — البحث عن Secrets في Git History",
         "Lesson 10: GitLeaks — Detect API Keys في Repos",
         "Lesson 11: Paste Sites — Pastebin / GitHub Gists لمراقبة Leaks",
         "Lesson 12: Breach Data — HaveIBeenPwned API وDeHashed",
         "Lesson 13: Cloud Recon — S3 Buckets / Azure Blobs / GCS",
         "Lesson 14: ASN Lookup — معرفة نطاق IP لشركة ما",
         "Lesson 15: OSINT Report — هيكل التقرير الاحترافي",
         "Lab: Automated Recon Pipeline (subfinder + httpx + nuclei)",
         "Lab: GitHub Dorking — إيجاد API Key مسرّب حقيقي",
       ],
       resources:[
         {title:"Amass — In-depth Attack Surface Mapping (GitHub)",type:"lab",lang:"en",url:"https://github.com/owasp-amass/amass"},
         {title:"SpiderFoot — Automated OSINT (GitHub)",type:"lab",lang:"en",url:"https://github.com/smicallef/spiderfoot"},
         {title:"crt.sh — Certificate Transparency Search",type:"lab",lang:"en",url:"https://crt.sh/"},
         {title:"TruffleHog — Find Leaked Secrets (GitHub)",type:"lab",lang:"en",url:"https://github.com/trufflesecurity/trufflehog"},
         {title:"GitLeaks — Detect Secrets in Git (GitHub)",type:"lab",lang:"en",url:"https://github.com/gitleaks/gitleaks"},
         {title:"NahamSec — Recon Methodology Playlist (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLKAaMVNxvLmAkqBkzFaOxqs3L66z2n8LA"},
       ]},
    ]},
  web3track:{id:"web3track",name:"Web3 Security",nameEn:"Smart Contract & Web3 Security",icon:"⛓️",color:"#f59e0b",colorBg:"rgba(245,158,11,0.15)",duration:"4–6 أشهر",desc:"أمان العقود الذكية، DeFi Hacking، Smart Contract Auditing",
    phases:[
      {id:"web31",name:"Phase 1 — Blockchain & Solidity Fundamentals",emoji:"🧱",topics:[
         "Lesson 1: Blockchain Basics — Blocks / Transactions / Chain",
         "Lesson 2: Consensus Mechanisms — PoW vs PoS",
         "Lesson 3: Ethereum Architecture — EVM / Gas / Wei / Gwei / Ether",
         "Lesson 4: Ethereum Accounts — EOA vs Contract Accounts",
         "Lesson 5: Transactions — from / to / value / data / gasLimit",
         "Lesson 6: Smart Contracts — ما هو والتوضيح العملي",
         "Lesson 7: Solidity — Version / SPDX / Contract Structure",
         "Lesson 8: Solidity — Data Types: uint / address / bool / bytes / string",
         "Lesson 9: Solidity — Functions: public / private / view / pure / payable",
         "Lesson 10: Solidity — Mappings / Arrays / Structs / Events / Modifiers",
         "Lesson 11: Solidity — msg.sender / msg.value / block.timestamp",
         "Lesson 12: Remix IDE — Compile / Deploy / Interact على TestNet",
         "Lesson 13: Metamask — Setup / Testnet / Faucet Eth",
         "Lesson 14: ERC-20 Standard — Transfer / Approve / Allowance",
         "Lesson 15: ERC-721 NFT Standard — مفهوم الـ Token Unique",
         "Lesson 16: Foundry / Hardhat — أدوات Development والاختيار",
         "Lab: CryptoZombies — Lessons 1–6 كاملة",
         "Lab: Deploy أول Smart Contract على Remix",
       ],
       resources:[
         {title:"Solidity Docs — التوثيق الرسمي",type:"article",lang:"en",url:"https://docs.soliditylang.org/"},
         {title:"CryptoZombies — تعلم Solidity تفاعلياً (مجاني)",type:"lab",lang:"en",url:"https://cryptozombies.io/"},
         {title:"Remix IDE — بيئة تطوير Solidity مجانية",type:"lab",lang:"en",url:"https://remix.ethereum.org/"},
         {title:"Cyfrin Updraft — Smart Contract Security Courses (Free)",type:"video",lang:"en",url:"https://updraft.cyfrin.io/"},
       ]},
      {id:"web32",name:"Phase 2 — Smart Contract Vulnerabilities & Auditing",emoji:"⚡",topics:[
         "Lesson 1: Reentrancy Attack — CEI Pattern Violation والاستغلال",
         "Lesson 2: Reentrancy — The DAO Hack: كيف سُرق 60 مليون دولار",
         "Lesson 3: Integer Overflow/Underflow — SafeMath vs Solidity 0.8+",
         "Lesson 4: Integer Attack — Ethernaut Token Level Exploitation",
         "Lesson 5: Access Control — Missing onlyOwner والاستغلال",
         "Lesson 6: Access Control — Role-Based الإعداد الآمن",
         "Lesson 7: Flash Loan Attack — Borrow → Exploit → Repay في Transaction واحدة",
         "Lesson 8: Price Oracle Manipulation — DEX Price Manipulation",
         "Lesson 9: Front-Running — MEV وTransaction Ordering",
         "Lesson 10: Denial of Service — Gas Limit Attacks",
         "Lesson 11: Delegatecall Vulnerability — Storage Collision",
         "Lesson 12: Slither — Static Analysis وقراءة Detectors",
         "Lesson 13: Mythril — Symbolic Execution وDetecting Bugs",
         "Lesson 14: Ethernaut — Solving Levels 1–20 بالتفصيل",
         "Lesson 15: Damn Vulnerable DeFi — Challenges 1–12",
         "Lesson 16: Code4rena — كيف تشارك في Audit Contests",
         "Lesson 17: Immunefi — Web3 Bug Bounty وكتابة POC",
         "Lesson 18: Smart Contract Audit Report — التنسيق والمحتوى",
         "Lab: Ethernaut Levels 1–10 من الصفر",
         "Lab: Damn Vulnerable DeFi — Reentrancy Challenge",
       ],
       resources:[
         {title:"Ethernaut — OpenZeppelin Web3 CTF (مجاني)",type:"lab",lang:"en",url:"https://ethernaut.openzeppelin.com/"},
         {title:"Damn Vulnerable DeFi — Advanced DeFi Challenges (GitHub)",type:"lab",lang:"en",url:"https://github.com/theredguild/damn-vulnerable-defi"},
         {title:"Slither — Static Analyzer for Solidity (GitHub)",type:"lab",lang:"en",url:"https://github.com/crytic/slither"},
         {title:"DeFiHackLabs — Real DeFi Hacks POCs (GitHub)",type:"writeup",lang:"en",url:"https://github.com/SunWeb3Sec/DeFiHackLabs"},
         {title:"Code4rena — Smart Contract Audit Contests",type:"lab",lang:"en",url:"https://code4rena.com/"},
         {title:"Immunefi — Web3 Bug Bounty Platform",type:"lab",lang:"en",url:"https://immunefi.com/"},
       ]},
    ]},
  dfir:{id:"dfir",name:"DFIR",nameEn:"Digital Forensics & Incident Response",icon:"🔬",color:"#22d3ee",colorBg:"rgba(34,211,238,0.15)",duration:"3–4 أشهر",desc:"التحقيق الجنائي الرقمي، الاستجابة للحوادث، تحليل الأدلة",
    phases:[
      {id:"dfir1",name:"Phase 1 — Digital Forensics",emoji:"🧪",topics:[
         "Lesson 1: Digital Forensics — التعريف والأهمية القانونية",
         "Lesson 2: Chain of Custody — توثيق الدليل من الجمع للمحكمة",
         "Lesson 3: Forensics Principles — Integrity / Authenticity / Non-repudiation",
         "Lesson 4: File Systems — NTFS: MFT / ADS / Timestamps",
         "Lesson 5: File Systems — FAT32 وexFAT وext4 والفروق",
         "Lesson 6: Disk Imaging — dd: if= / of= / bs=",
         "Lesson 7: Disk Imaging — FTK Imager: GUI وVerify Hash",
         "Lesson 8: Write Blocker — لماذا ضروري وأنواعه",
         "Lesson 9: Autopsy — Case Setup / Add Evidence / Analysis",
         "Lesson 10: File Carving — Foremost وScalpel وRecovery",
         "Lesson 11: Windows Registry — HKLM / HKCU والـ Hives",
         "Lesson 12: Windows Registry Forensics — RegRipper وRegistry Explorer",
         "Lesson 13: Windows Event Logs — Security / System / Application",
         "Lesson 14: Windows Event IDs — 4624 (Logon) / 4688 (Process) / 7045 (Service)",
         "Lesson 15: Browser Forensics — History / Cache / Cookies / Downloads",
         "Lesson 16: Prefetch Files — تحليل AppExecution Artifacts",
         "Lesson 17: Timeline Analysis — بناء Forensic Timeline كاملة",
         "Lab: تحليل Disk Image بـ Autopsy من الصفر",
         "Lab: Windows Registry Analysis — إيجاد Persistence",
       ],
        resources:[
          {title:"Autopsy — Digital Forensics Platform (مجاني)",type:"lab",lang:"en",url:"https://www.autopsy.com/"},
          {title:"TryHackMe — Digital Forensics Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/dfir"},
          {title:"HackTricks — Forensics Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/forensics/basic-forensic-methodology"},
          {title:"The Art of DFIR & Threat Hunting — Muhammed Talaat (عربي)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL"},
        ]},
       {id:"dfir2",name:"Phase 2 — Memory & Incident Response",emoji:"🚨",topics:[
         "Lesson 1: Memory Forensics — لماذا الذاكرة أهم من الـ Disk",
         "Lesson 2: Memory Acquisition — winpmem / LiME / DumpIt",
         "Lesson 3: Volatility 3 — Installation وأول Plugin",
         "Lesson 4: Volatility 3 — windows.pslist / pstree / cmdline",
         "Lesson 5: Volatility 3 — windows.netscan للـ Network Connections",
         "Lesson 6: Volatility 3 — windows.malfind للكشف عن Injected Code",
         "Lesson 7: Volatility 3 — windows.dlllist / handles / filescan",
         "Lesson 8: PCAP Analysis — tshark لـ Command Line Analysis",
         "Lesson 9: PCAP Analysis — Zeek / Suricata لـ Network Detection",
         "Lesson 10: MITRE ATT&CK — Tactics / Techniques / Sub-techniques",
         "Lesson 11: MITRE ATT&CK — Mapping Artifacts لـ TTPs",
          "Lesson 12: Threat Hunting — Hypothesis-Based وIOC-Based",
          "Lesson 13: YARA للـ Detection — كتابة Rules للـ Malware الحي",
          "Threat Hunt S1 — Initial Access: Malicious PowerShell & VBS Execution",
          "Threat Hunt S2 — Investigating Lateral Movement: OverPass-The-Hash",
          "Threat Hunt S3 — Investigating Lateral Movement: PSExec Analysis",
          "Threat Hunt S4 — Defense Evasion: Mshta HTML Application (HTA)",
         "Lesson 14: SIEM Basics — Elastic Stack (ELK) Setup وQuerying",
         "Lesson 15: Splunk — SPL Queries وDashboards",
         "Lesson 16: Incident Response Lifecycle — Preparation / Detection / Containment / Eradication / Recovery",
         "Lesson 17: IR Playbook — كتابة Playbook لـ Ransomware Incident",
         "Lab: Volatility 3 — تحليل Memory Dump يحتوي Malware",
         "Lab: CyberDefenders — Blue Team CTF Challenge",
       ],
       resources:[
         {title:"Volatility 3 — Memory Forensics Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/volatilityfoundation/volatility3"},
         {title:"CyberDefenders — Blue Team CTF (مجاني)",type:"lab",lang:"en",url:"https://cyberdefenders.org/"},
         {title:"Blue Team Labs Online (مجاني)",type:"lab",lang:"en",url:"https://blueteamlabs.online/"},
         {title:"MITRE ATT&CK Framework — Official",type:"article",lang:"en",url:"https://attack.mitre.org/"},
         {title:"LetsDefend — Blue Team Practice (مجاني)",type:"lab",lang:"en",url:"https://letsdefend.io/"},
         {title:"Velociraptor — Endpoint Forensics (GitHub)",type:"lab",lang:"en",url:"https://github.com/Velocidex/velociraptor"},
       ]},
    ]},
  wireless:{id:"wireless",name:"Wireless Security",nameEn:"Wireless & WiFi Hacking",icon:"📡",color:"#84cc16",colorBg:"rgba(132,204,22,0.15)",duration:"2–3 أشهر",desc:"اختبار أمان الشبكات اللاسلكية WiFi وBluetooth",
    phases:[
      {id:"wl1",name:"Phase 1 — WiFi Security",emoji:"📶",topics:[
         "Lesson 1: IEEE 802.11 Standards — a/b/g/n/ac/ax والفروق",
         "Lesson 2: Frequency Bands — 2.4GHz vs 5GHz / Channels / Interference",
         "Lesson 3: WiFi Security Protocols — WEP / WPA / WPA2 / WPA3",
         "Lesson 4: Monitor Mode — airmon-ng start wlan0 / Adapter Requirements",
         "Lesson 5: Wireless Recon — airodump-ng: --bssid / -c / -w",
         "Lesson 6: WPA2 4-Way Handshake — الآلية ومتطلبات الـ Capture",
         "Lesson 7: Handshake Capture — Deauth + airodump-ng",
         "Lesson 8: Handshake Cracking — aircrack-ng -w wordlist.txt",
         "Lesson 9: PMKID Attack — hcxdumptool + hcxtools + hashcat -m 22000",
         "Lesson 10: Deauthentication Attack — aireplay-ng -0 وFrame Injection",
         "Lesson 11: Evil Twin Attack — Hostapd + DHCP + DNS Redirect",
         "Lesson 12: Captive Portal — Fake WiFi Login لـ Credential Harvest",
         "Lesson 13: WPS Attacks — Reaver / Bully على WPS PINs",
         "Lesson 14: Wifite2 — Automated WiFi Auditing",
         "Lesson 15: Bettercap — MITM على WiFi + SSL Stripping",
         "Lesson 16: Wireless Pentest Report — Findings + Remediation",
          "Lab: Capture WPA2 Handshake وكسره بـ Hashcat",
          "Lab: Evil Twin Attack Setup كامل",
          "Cyber Weapons Lab م1 — LoRa for Hackers: Long-Range Remote Control",
          "Cyber Weapons Lab م2 — Hacking the Skies: Ghost Drone Swarms with Spoofed IDs",
          "Cyber Weapons Lab م3 — Ethical Hacking Kit with Raspberry Pi 5",
          "Cyber Weapons Lab م4 — Xerosploit for Advanced MiTM Attacks",
          "Cyber Weapons Lab م5 — Facial Detection & Recognition on ESP32",
          "Cyber Weapons Lab م6 — Create a Wi-Fi Spy Camera with ESP32-CAM",
          "Cyber Weapons Lab م7 — Deauther Watch Wi-Fi Hacking Wearable",
          "Cyber Weapons Lab م8 — Fingerprint Web Apps & Servers for Better Recon",
          "Cyber Weapons Lab م9 — Kali Linux as Bootable Live USB",
          "Cyber Weapons Lab م10 — Clear Logs & History on Linux Systems",
          "Cyber Weapons Lab م11 — Practice Wi-Fi Hacking with ESP8266 CTF Games",
          "Cyber Weapons Lab م12 — Directional Antenna with ESP8266",
          "Cyber Weapons Lab م13 — Find Hidden Wi-Fi Networks",
          "Cyber Weapons Lab م14 — Generate Crackable Handshakes with ESP8266",
          "Cyber Weapons Lab م15 — Automate Remote SSH Control with Expect Scripts",
        ],
        resources:[
          {title:"Aircrack-ng Suite — Official Documentation",type:"article",lang:"en",url:"https://www.aircrack-ng.org/documentation.html"},
         {title:"HackTricks — Pentesting WiFi",type:"article",lang:"en",url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/pentesting-wifi"},
         {title:"TryHackMe — WiFi Hacking Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/room/wifihacking101"},
         {title:"Wifite2 — Automated WiFi Auditor (GitHub)",type:"lab",lang:"en",url:"https://github.com/derv82/wifite2"},
         {title:"Bettercap — Network Attack Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/bettercap/bettercap"},
       ]},
      {id:"wl2",name:"Phase 2 — Bluetooth & Advanced Wireless",emoji:"🔵",topics:[
         "Lesson 1: Bluetooth Modes — Classic BR/EDR vs BLE (Bluetooth Low Energy)",
         "Lesson 2: Bluetooth Pairing — PIN / Just Works / Numeric Comparison / OOB",
         "Lesson 3: BLE Architecture — GATT / ATT / Services / Characteristics",
         "Lesson 4: BLE Security Modes — No Security / Unauthenticated / Authenticated",
         "Lesson 5: BLE Recon — gatttool / nRF Connect / bleah",
         "Lesson 6: BLE Sniffing — btlejack / Ubertooth One",
         "Lesson 7: BLE Attacks — Eavesdropping / MITM / Replay",
         "Lesson 8: Bluetooth Classic Attacks — Bluesnarfing / Bluebugging",
         "Lesson 9: SDR Basics — Software Defined Radio مع RTL-SDR",
         "Lesson 10: SDR Tools — GNU Radio / gqrx / SDR#",
         "Lesson 11: NFC Security — MIFARE Classic Vulnerabilities",
         "Lesson 12: RFID Cloning — Proxmark3 وكلون الـ Cards",
         "Lesson 13: Kismet — Passive Wireless Detection للـ Rogue APs",
         "Lesson 14: ZigBee — IoT Protocol Security Analysis",
         "Lab: BLE Scan وقراءة GATT Services",
         "Lab: Kismet — رصد شبكات لاسلكية محيطة",
       ],
       resources:[
         {title:"Kismet — Wireless Network Detector (GitHub)",type:"lab",lang:"en",url:"https://github.com/kismetwireless/kismet"},
         {title:"HackTricks — Pentesting Bluetooth",type:"article",lang:"en",url:"https://book.hacktricks.xyz/bluetooth/"},
         {title:"GNU Radio — SDR Framework (مجاني)",type:"lab",lang:"en",url:"https://www.gnuradio.org/"},
       ]},
    ]},
  crypto:{id:"crypto",name:"Cryptography",nameEn:"Cryptography & Applied Crypto Attacks",icon:"🔐",color:"#e11d48",colorBg:"rgba(225,29,72,0.15)",duration:"2–3 أشهر",desc:"التشفير النظري والتطبيقي، كسر الخوارزميات، Crypto CTF",
    phases:[
      {id:"cry1",name:"Phase 1 — Cryptography Fundamentals",emoji:"🧮",topics:[
         "Lesson 1: Cryptography Basics — السرية / التكامل / المصادقة",
         "Lesson 2: Encoding vs Encryption vs Hashing — الفرق الجوهري",
         "Lesson 3: Base64 — كيف يعمل وفك الترميز يدوياً",
         "Lesson 4: Hex / Binary / ASCII — التحويل بين الصيغ",
         "Lesson 5: Symmetric Encryption — المفهوم والاستخدام",
         "Lesson 6: AES — Block Cipher / Modes: ECB / CBC / CTR / GCM",
         "Lesson 7: DES و3DES — لماذا أصبحا غير آمنَين",
         "Lesson 8: Asymmetric Encryption — Public / Private Key Pair",
         "Lesson 9: RSA — Key Generation (p, q, n, e, d) خطوة بخطوة",
         "Lesson 10: ECC — Elliptic Curve الأسرع والأصغر من RSA",
         "Lesson 11: Hashing — MD5 / SHA-1 / SHA-256 / SHA-3",
         "Lesson 12: Password Hashing — bcrypt / scrypt / Argon2",
         "Lesson 13: HMAC — Hash-based Message Authentication Code",
         "Lesson 14: Digital Signatures — RSA Signature / ECDSA",
         "Lesson 15: Key Exchange — Diffie-Hellman / ECDH",
         "Lesson 16: PKI — Certificate Authority / X.509 / Chain of Trust",
          "Lab: CyberChef — تشفير وفك تشفير AES / RSA / Base64",
          "Lab: CryptoHack — أول 5 تحديات في Intro to Crypto",
          "Security/Ayman م1 — Security Introduction & Cryptography Intro",
          "Security/Ayman م2 — Network Model & Security Attacks",
          "Security/Ayman م3 — Classic Cryptography Caesar & Monoalphabetic",
          "Security/Ayman م4 — Polyalphabetic & Playfair Ciphers",
          "Security/Ayman م5 — Transposition Techniques & Hill Cipher",
          "Security/Ayman م6 — DES & Block Cipher Modes (ECB/CBC)",
          "Security/Ayman م7 — AES & Triple DES",
          "Security/Ayman م8 — Stream Ciphers & RC4",
          "Security/Ayman م9 — Public Key Cryptography & RSA",
          "Security/Ayman م10 — Diffie-Hellman Key Exchange",
          "Security/Ayman م11 — Hash Functions & Message Authentication",
          "Security/Ayman م12 — Digital Signatures & Certificates",
          "Security/Ayman م13 — User Authentication & Kerberos",
          "Security/Ayman م14 — IP Security (IPSec)",
          "Security/Ayman م15 — Web Security (SSL/TLS)",
        ],
        resources:[
          {title:"CryptoHack — Interactive Cryptography Challenges (مجاني)",type:"lab",lang:"en",url:"https://cryptohack.org/"},
         {title:"CyberChef — Crypto Analysis Tool (مجاني)",type:"lab",lang:"en",url:"https://gchq.github.io/CyberChef/"},
         {title:"Cryptopals Challenges — Classic Crypto Attacks (مجاني)",type:"lab",lang:"en",url:"https://cryptopals.com/"},
         {title:"Khan Academy — Cryptography Course (مجاني)",type:"video",lang:"en",url:"https://www.khanacademy.org/computing/computer-science/cryptography"},
       ]},
      {id:"cry2",name:"Phase 2 — Crypto Attacks & CTF",emoji:"⚔️",topics:[
         "Lesson 1: RSA Small e Attack — e=3 وCoppersmith",
         "Lesson 2: RSA Common Modulus Attack — نفس n مع e1 وe2",
         "Lesson 3: RSA Wiener's Attack — d صغير يكشف Private Key",
         "Lesson 4: RSA Factorization — Fermat / Pollard Rho",
         "Lesson 5: AES ECB Attack — Byte-at-a-time Decryption",
         "Lesson 6: AES ECB — Detect Mode عبر Identical Blocks",
         "Lesson 7: AES CBC Padding Oracle Attack — البيت بيت",
         "Lesson 8: AES CBC Bit Flipping Attack — تغيير Plaintext عبر Ciphertext",
         "Lesson 9: Hash Length Extension Attack — sha256 / sha512",
         "Lesson 10: JWT Algorithm None Attack",
         "Lesson 11: JWT RS256 → HS256 Confusion Attack",
         "Lesson 12: Timing Attacks — String Comparison وCache Timing",
         "Lesson 13: Frequency Analysis — كسر Classical Ciphers",
         "Lesson 14: SageMath — Math Library للـ Crypto CTF",
         "Lesson 15: RsaCtfTool — Automated RSA Attacks",
         "Lesson 16: CryptoHack — Advanced Challenges",
         "Lab: Padding Oracle Attack عملي",
         "Lab: RSA CTF من CryptoHack / PicoCTF",
       ],
       resources:[
         {title:"CryptoHack — Advanced Challenges (مجاني)",type:"lab",lang:"en",url:"https://cryptohack.org/challenges/"},
         {title:"RsaCtfTool — RSA Attacks Tool (GitHub)",type:"lab",lang:"en",url:"https://github.com/RsaCtfTool/RsaCtfTool"},
         {title:"PyCryptodome — Python Crypto Library (GitHub)",type:"lab",lang:"en",url:"https://github.com/Legrandin/pycryptodome"},
         {title:"CTF Crypto Writeups — GitHub Collection",type:"writeup",lang:"en",url:"https://github.com/p4-team/ctf"},
       ]},
    ]},
  pwn:{id:"pwn",name:"Binary Exploitation",nameEn:"Binary Exploitation & Reverse Engineering",icon:"💣",color:"#dc2626",colorBg:"rgba(220,38,38,0.12)",duration:"5–8 أشهر",desc:"استغلال الثنائيات، Buffer Overflow، ROP Chains، Kernel Exploitation",
    phases:[
      {id:"pwn1",name:"Phase 1 — Foundations",emoji:"🧱",topics:[
         "Lesson 1: Assembly x86 — Registers: EAX/EBX/ECX/EDX/ESP/EBP/EIP",
         "Lesson 2: Assembly x64 — Registers: RAX/RBX/RCX/RDX/RSP/RBP/RIP",
         "Lesson 3: Assembly — Instructions: MOV/PUSH/POP/CALL/RET/JMP",
         "Lesson 4: Assembly — Conditional Jumps وFlags Register",
         "Lesson 5: C Language — Pointers وMemory Allocation",
         "Lesson 6: C Language — Buffer وString Functions (strcpy/gets/sprintf)",
         "Lesson 7: C Language — Compilation: gcc / objdump / readelf",
         "Lesson 8: Memory Layout — Text / BSS / Data / Heap / Stack / Kernel",
         "Lesson 9: Stack Frame — Prologue / Epilogue / Local Vars / Return Address",
         "Lesson 10: Heap — malloc / free / Heap Chunks / Bins",
         "Lesson 11: GDB — Installation وأوامره الأساسية",
         "Lesson 12: GDB — Breakpoints / nexti / stepi / info registers",
         "Lesson 13: pwndbg Plugin — heap / stack / telescope / nearpc",
         "Lesson 14: System Calls — syscall / int 0x80 / sysenter",
         "Lesson 15: Calling Conventions — x86 (Stack) vs x64 (Registers: rdi/rsi/rdx)",
         "Lesson 16: ELF File Format — .text / .plt / .got / .bss",
         "Lab: pwn.college — Intro to Assembly",
         "Lab: GDB Debug برنامج C بسيط من الصفر",
       ],
       resources:[
         {title:"pwn.college — Free Binary Exploitation (Arizona State Uni)",type:"lab",lang:"en",url:"https://pwn.college/"},
         {title:"pwndbg — GDB Plugin (GitHub)",type:"lab",lang:"en",url:"https://github.com/pwndbg/pwndbg"},
         {title:"OpenSecurityTraining2 — Free RE Courses",type:"video",lang:"en",url:"https://opensecuritytraining.info/"},
       ]},
      {id:"pwn2",name:"Phase 2 — Exploitation Techniques",emoji:"💥",topics:[
         "Lesson 1: Stack Buffer Overflow — Overflow مباشر وتغيير Return Address",
         "Lesson 2: Stack BOF — Pattern Generation (cyclic) لإيجاد Offset",
         "Lesson 3: Stack BOF — Redirect Execution لدالة مخفية",
         "Lesson 4: Shellcode — Writing x86 /bin/sh Shellcode",
         "Lesson 5: NOP Sled — /x90 لتوسيع هدف الـ Shellcode",
         "Lesson 6: Security Mitigations — NX/DEP / ASLR / Canary / PIE",
         "Lesson 7: Return-to-libc — ret2libc بدون Shellcode",
         "Lesson 8: ret2libc — system('/bin/sh') عبر GOT/PLT",
         "Lesson 9: ROP Chains — Gadgets بـ ROPgadget / ropper",
         "Lesson 10: ROP — Building Chain: pop rdi / ret / system",
         "Lesson 11: ROP — ret2plt لـ puts@plt لـ Leak Addresses",
         "Lesson 12: ASLR Bypass — Leak Libc Address + Offset",
         "Lesson 13: Stack Canary Bypass — Format String Leak",
         "Lesson 14: Format String Vulnerability — %p / %x / %n",
         "Lesson 15: Format String — Arbitrary Read وArbitrary Write",
         "Lesson 16: Heap Exploitation — Heap Chunk Structure / Bins",
         "Lesson 17: Use-After-Free — استخدام Pointer بعد free()",
         "Lesson 18: Double Free — Tcache Poisoning",
         "Lesson 19: pwntools — Template لكتابة Exploits بـ Python",
         "Lab: pwn.college — Stack BOF Series",
         "Lab: PicoCTF — Binary Exploitation Challenges",
       ],
       resources:[
         {title:"pwn.college — Full Exploitation Curriculum (مجاني)",type:"lab",lang:"en",url:"https://pwn.college/"},
         {title:"ROPgadget — ROP Gadgets Finder (GitHub)",type:"lab",lang:"en",url:"https://github.com/JonathanSalwan/ROPgadget"},
         {title:"pwntools — CTF Exploit Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/Gallopsled/pwntools"},
         {title:"LiveOverflow — Binary Exploitation YouTube (مجاني)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNfHkzyeN"},
         {title:"ir0nstone — Binary Exploitation Notes (مجاني)",type:"article",lang:"en",url:"https://ir0nstone.gitbook.io/notes/"},
         {title:"PicoCTF — Binary Exploitation Challenges (مجاني)",type:"lab",lang:"en",url:"https://picoctf.org/"},
       ]},
    ]},
  social:{id:"social",name:"Social Engineering",nameEn:"Social Engineering & Phishing",icon:"🎭",color:"#f97316",colorBg:"rgba(249,115,22,0.15)",duration:"1–2 أشهر",desc:"هندسة اجتماعية، Phishing، Red Team Operations",
    phases:[
      {id:"soc1",name:"Phase 1 — Social Engineering Fundamentals",emoji:"🎯",topics:[
         "Lesson 1: Social Engineering — التعريف والمبدأ النفسي الأساسي",
         "Lesson 2: Principles of Influence — Authority / Urgency / Scarcity / Reciprocity",
         "Lesson 3: Pretexting — بناء هوية وهمية وقصة مقنعة",
         "Lesson 4: OSINT للـ SE — جمع معلومات الضحية من LinkedIn/Social",
         "Lesson 5: Phishing Email — Domain Spoofing / Lookalike Domains",
         "Lesson 6: Phishing Email — HTML Cloning وEmail Headers",
         "Lesson 7: Spear Phishing — استهداف شخص بعينه بمعلومات مخصصة",
         "Lesson 8: Whaling — استهداف التنفيذيين (CEO / CFO)",
         "Lesson 9: Vishing — Voice Phishing Scripts وتقنيات الإقناع",
         "Lesson 10: Smishing — SMS Phishing بـ Spoofed Number",
         "Lesson 11: GoPhish — إعداد Phishing Campaign كاملة",
         "Lesson 12: SET (Social Engineer Toolkit) — Website Cloner",
         "Lesson 13: Evilginx2 — Reverse Proxy للـ Session Hijacking",
         "Lesson 14: Physical Social Engineering — Tailgating / Impersonation",
         "Lesson 15: Defense Against SE — Security Awareness Training",
         "Lesson 16: SE في Red Team — توثيق وتقرير النتائج",
         "Lab: GoPhish Campaign من الصفر حتى Report",
         "Lab: تصميم Phishing Email احترافي مع Template",
       ],
       resources:[
         {title:"SET — Social Engineering Toolkit (GitHub)",type:"lab",lang:"en",url:"https://github.com/trustedsec/social-engineer-toolkit"},
         {title:"GoPhish — Phishing Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/gophish/gophish"},
         {title:"TryHackMe — Phishing Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/hacktivities?tab=search&value=phishing"},
         {title:"HackTricks — Phishing Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/phishing-methodology"},
        ]},
     ]},
  general:{id:"general",name:"عام",nameEn:"General Cybersecurity & Community",icon:"🧠",color:"var(--t1)",colorBg:"rgba(100,116,139,0.15)",duration:"مستمر",desc:"بودكاست، فعاليات، محتوى عام ومتنوع يثري معرفتك الأمنية",
    phases:[
      {id:"gen1",name:"Phase 1 — Podcasts & Interviews",emoji:"🎙️",topics:[
         "BugCast Ep:01 — زياد عبدالعظيم | Security Researching & Learning Tips",
         "BugCast Ep:02 — محمود حامد | Bug Bounty Guide",
         "BugCast Ep:03 — معاذ عادل | Hack without learning programming",
         "BugCast Ep:04 — صهيب ناصري | Advice for Bug Bounty",
         "BugCast Ep:05 — ياسر علي | From 0 to working at Facebook (Meta)",
         "BugCast Ep:06 — فادي عثمان | Hacker Mindset",
         "BugCast Ep:07 — محمد نصر | Shifting to Blue Team",
         "BugCast Ep:08 — السيد الرفاعي | Purple Team",
         "BugCast Ep:09 — حازم هشام | Day Life of Red Teamer",
         "BugCast Ep:10 — محمد فتحي | Find your First Job",
         "BugCast Ep:11 — محمد سادات | Working as a Group CISO",
         "BugCast Ep:12 — سيد عبدالحفيظ | How to Hack mobile apps",
         "BugCast Ep:13 — أحمد علاء الدين | Working in Application Security",
      ],
      resources:[
         {title:"BugCast Podcast — سايبر عرب (Playlist كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt"},
      ]},
      {id:"gen2",name:"Phase 2 — Security Events & Workshops",emoji:"🎪",topics:[
         "Ramadan Nights 2025 — Intro To Hardware Security",
         "Ramadan Nights 2025 — Hack AD Like A Team Lead",
         "Ramadan Nights 2025 — Breaking the Signal: Pentesting Wireless",
         "Ramadan Nights 2025 — Your Path to Android Penetration Testing",
         "Ramadan Nights 2025 — Threat detection engineering",
         "Ramadan Nights 2025 — Investigating the Hyperliquid Whale: OSINT Case Study",
         "Ramadan Nights 2025 — Intro to AI hacking",
         "Ramadan Nights 2025 — Secure by Design: Strengthening Applications",
         "Ramadan Nights 2025 — Phishing Analysis Techniques",
         "Ramadan Nights 2025 — From CV to job offer: Essential Tips & Tricks",
         "Ramadan Nights 2025 — Introduction To Infostealer",
         "Ramadan Nights 2025 — From infection To Detection: Intro To Malware Analysis",
         "Ramadan Nights 2025 — Ethical Hacking Radio Stations",
         "Ramadan Nights 2025 — Bug Bounty Hunting",
          "Ramadan Nights 2025 — Blue team Behind the scene",
          "Testing Workshops م1 — Session 1: Intro",
          "Testing Workshops م2 — Session 2",
          "Testing Workshops م3 — Requirements Review",
          "Testing Workshops م4 — Design Test Cases",
          "Testing Workshops م5 — Q&A",
          "Testing Workshops م6 — Agile",
          "Testing Workshops م7 — DB",
          "Testing Workshops م8 — APIs Part 1",
          "Testing Workshops م9 — APIs Part 2",
          "Testing Workshops م10 — Bug Reporting",
          "Testing Workshops م11 — Azure & Questions",
          "Testing Workshops م12 — Java Session 1",
          "Testing Workshops م13 — Java Session 2",
          "Testing Workshops م14 — Java Session 3",
          "Testing Workshops م15 — Java Session 4 (OOP & Maven)",
       ],
       resources:[
         {title:"Ramadan Nights 2025 — AOU Cyber Security Club (Playlist)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf"},
         {title:"Testing Workshops — Rania Mokhtar (Software Testing)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ"},
      ]},
    ]},
};

const TRACK_ORDER=["foundations","web","mobile","api","network","ad","malware","ctf","cloud","osint","web3track","dfir","wireless","crypto","pwn","social","general"];

const SOURCE_PLAYLIST_COUNT=31;
const UNIQUE_PLAYLIST_COUNT=30;
const COURSES=[
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "title": "Cybersecurity Basics For Beginners",
    "url": "https://www.youtube.com/playlist?list=PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "channel": "BlackSilence",
    "lessonCount": 25,
    "trackIds": [
      "foundations"
    ],
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "title": "كورس Cybersecurity for beginner to master bug bounty hunter",
    "url": "https://www.youtube.com/playlist?list=PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "channel": "CyMatriX",
    "lessonCount": 12,
    "trackIds": [
      "web",
      "network",
      "crypto",
      "foundations"
    ],
    "topicTags": [
      "web",
      "network",
      "crypto",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "title": "Malware Analysis Fundamentals",
    "url": "https://www.youtube.com/playlist?list=PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "channel": "BlackSilence",
    "lessonCount": 69,
    "trackIds": [
      "web",
      "malware",
      "foundations",
      "network"
    ],
    "topicTags": [
      "web",
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "title": "Android Applications Penetration Testing (بالعربى)",
    "url": "https://www.youtube.com/playlist?list=PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "channel": "Abdulrahman",
    "lessonCount": 17,
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ],
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "title": "eJPTv2",
    "url": "https://www.youtube.com/playlist?list=PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "channel": "Cyberock",
    "lessonCount": 35,
    "trackIds": [
      "web"
    ],
    "topicTags": [
      "web",
      "ejptv2"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "title": "Mobile Application Pentesting",
    "url": "https://www.youtube.com/playlist?list=PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "channel": "PentestHint - The Tech Fellow",
    "lessonCount": 21,
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ],
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "title": "Mobile Applications Penetration Testing",
    "url": "https://www.youtube.com/playlist?list=PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "channel": "Mohamed Alama",
    "lessonCount": 8,
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ],
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "title": "Full Android Penetration Testing Course Playlist",
    "url": "https://www.youtube.com/playlist?list=PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "channel": "AppSec Hub",
    "lessonCount": 36,
    "trackIds": [
      "web",
      "cloud",
      "mobile",
      "foundations"
    ],
    "topicTags": [
      "web",
      "cloud",
      "mobile",
      "foundations",
      "full",
      "android",
      "penetration",
      "testing"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "title": "Zero to Hero: A Practical Network Penetration Testing Course",
    "url": "https://www.youtube.com/playlist?list=PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "channel": "The Cyber Mentor",
    "lessonCount": 11,
    "trackIds": [
      "network",
      "foundations",
      "web"
    ],
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "title": "Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/playlist?list=PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "channel": "تكناوي دوت نيت",
    "lessonCount": 12,
    "trackIds": [
      "ctf"
    ],
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "title": "Security (in Arabic)",
    "url": "https://www.youtube.com/playlist?list=PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "channel": "Ayman Bahaa-Eldin",
    "lessonCount": 29,
    "trackIds": [
      "ctf"
    ],
    "topicTags": [
      "ctf",
      "security"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "title": "Bug Bounty Hunting For...",
    "url": "https://www.youtube.com/playlist?list=PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "channel": "rs0n_live",
    "lessonCount": 10,
    "trackIds": [
      "web",
      "social",
      "network"
    ],
    "topicTags": [
      "web",
      "social",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "title": "MOBISEC Course",
    "url": "https://www.youtube.com/playlist?list=PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "channel": "Mohamed Sayed - محمد سيد",
    "lessonCount": 22,
    "trackIds": [
      "web"
    ],
    "topicTags": [
      "web",
      "mobisec"
    ]
  },
  {
    "id": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "title": "The Art of DFIR & Threat Hunting - Arabic Training",
    "url": "https://www.youtube.com/playlist?list=PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "channel": "Muhammed Talaat",
    "lessonCount": 4,
    "trackIds": [
      "dfir",
      "ad"
    ],
    "topicTags": [
      "dfir",
      "ad",
      "the",
      "art",
      "threat"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "title": "Web Pen-Testing Course",
    "url": "https://www.youtube.com/playlist?list=PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "channel": "Mohamed Sayed - محمد سيد",
    "lessonCount": 19,
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ],
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "full"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "title": "florida state university offensive security lectures",
    "url": "https://www.youtube.com/playlist?list=PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "channel": "Abdulrahman",
    "lessonCount": 33,
    "trackIds": [
      "malware",
      "dfir"
    ],
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "title": "Intrduction to CTF in arabic",
    "url": "https://www.youtube.com/playlist?list=PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "channel": "DFIRHub",
    "lessonCount": 11,
    "trackIds": [
      "ctf",
      "cloud"
    ],
    "topicTags": [
      "ctf",
      "cloud",
      "intrduction"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "title": "CTF Course",
    "url": "https://www.youtube.com/playlist?list=PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "channel": "SATTAM",
    "lessonCount": 8,
    "trackIds": [
      "ctf",
      "osint"
    ],
    "topicTags": [
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "title": "Web Application Security Course (Arabic)",
    "url": "https://www.youtube.com/playlist?list=PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "channel": "Mohamed Sayed - محمد سيد",
    "lessonCount": 36,
    "trackIds": [
      "web",
      "foundations",
      "mobile"
    ],
    "topicTags": [
      "web",
      "foundations",
      "mobile",
      "application",
      "security",
      "udemy"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "title": "Learn CTF and cyber security in Arabic from zero to hero",
    "url": "https://www.youtube.com/playlist?list=PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "channel": "Mina Ashraf",
    "lessonCount": 39,
    "trackIds": [
      "ctf",
      "crypto"
    ],
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "title": "Cyber Weapons Lab",
    "url": "https://www.youtube.com/playlist?list=PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "channel": "Null Byte",
    "lessonCount": 224,
    "trackIds": [
      "network",
      "foundations",
      "pwn"
    ],
    "topicTags": [
      "network",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "join"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "title": "Cissp- Exam preparation Arabic course-Ahmed Abdelhamid",
    "url": "https://www.youtube.com/playlist?list=PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "channel": "Spectrum CyberSecurity",
    "lessonCount": 10,
    "trackIds": [
      "wireless"
    ],
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "title": "cybrary web application pen testing course in arabic مترجم",
    "url": "https://www.youtube.com/playlist?list=PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "channel": "CWWC",
    "lessonCount": 9,
    "trackIds": [
      "web",
      "foundations"
    ],
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "title": "penetration testing - arabic",
    "url": "https://www.youtube.com/playlist?list=PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "channel": "ahmed abdelazeem",
    "lessonCount": 8,
    "trackIds": [
      "foundations",
      "web"
    ],
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "title": "BugCast Podcast",
    "url": "https://www.youtube.com/playlist?list=PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "channel": "سايبر عرب | Cyber 3rb",
    "lessonCount": 13,
    "trackIds": [
      "api"
    ],
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "cyber",
      "security"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "title": "Ramadan Nights 2025",
    "url": "https://www.youtube.com/playlist?list=PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "channel": "Cyber Security Club - AOU",
    "lessonCount": 18,
    "trackIds": [
      "cloud"
    ],
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "title": "my fav bug -*-*-*",
    "url": "https://www.youtube.com/playlist?list=PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "channel": "mahdi",
    "lessonCount": 54,
    "trackIds": [
      "mobile"
    ],
    "topicTags": [
      "mobile",
      "fav",
      "bug"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "title": "Android Pentesting Series",
    "url": "https://www.youtube.com/playlist?list=PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "channel": "AumLayer",
    "lessonCount": 20,
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ],
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "the"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "title": "Free Android Application Security Course",
    "url": "https://www.youtube.com/playlist?list=PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "channel": "Mobile Hacking Lab",
    "lessonCount": 31,
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "dfir"
    ],
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "title": "Testing Workshops",
    "url": "https://www.youtube.com/playlist?list=PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "channel": "Rania Mokhtar (ويبقى الأثر)",
    "lessonCount": 31,
    "trackIds": [
      "web",
      "social",
      "foundations"
    ],
    "topicTags": [
      "web",
      "social",
      "foundations",
      "testing",
      "workshops"
    ]
  }
];
const LESSONS=[
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-yPrsMK6q9GA",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 1,
    "title": "01- Introduction To Workshop",
    "url": "https://www.youtube.com/watch?v=yPrsMK6q9GA",
    "durationSec": 2090,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-ZuddmvRGGAM",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 2,
    "title": "02- Introduction To Cybersecurity : Part 1",
    "url": "https://www.youtube.com/watch?v=ZuddmvRGGAM",
    "durationSec": 8073,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-PvGWUtIQPSY",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 3,
    "title": "03- Introduction To Cybersecurity : Part 2",
    "url": "https://www.youtube.com/watch?v=PvGWUtIQPSY",
    "durationSec": 5551,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5--8-NrN1O3jY",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 4,
    "title": "04- Important Cybersecurity Concepts And Definitions : Part 1",
    "url": "https://www.youtube.com/watch?v=-8-NrN1O3jY",
    "durationSec": 4260,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-7i7XlluKpIU",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 5,
    "title": "05- Important Cybersecurity Concepts And Definitions : Part 2",
    "url": "https://www.youtube.com/watch?v=7i7XlluKpIU",
    "durationSec": 6171,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-ks1WxiD4EqY",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 6,
    "title": "06- Network Basics : Part 1",
    "url": "https://www.youtube.com/watch?v=ks1WxiD4EqY",
    "durationSec": 4114,
    "topicTags": [
      "network",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-cR7iYJ1b91g",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 7,
    "title": "07- Network Basics : Part 2",
    "url": "https://www.youtube.com/watch?v=cR7iYJ1b91g",
    "durationSec": 4635,
    "topicTags": [
      "network",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-T1T60ZWuPS8",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 8,
    "title": "08- Network Basics : Part 3",
    "url": "https://www.youtube.com/watch?v=T1T60ZWuPS8",
    "durationSec": 4312,
    "topicTags": [
      "network",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-TZR0Zwor_xc",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 9,
    "title": "09- Network Basics : Part 4",
    "url": "https://www.youtube.com/watch?v=TZR0Zwor_xc",
    "durationSec": 2159,
    "topicTags": [
      "network",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-S0ao461rV9E",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 10,
    "title": "10- Network Basics : Part 5",
    "url": "https://www.youtube.com/watch?v=S0ao461rV9E",
    "durationSec": 2407,
    "topicTags": [
      "network",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-jU_6oNbNQRQ",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 11,
    "title": "11- Linux Basics : Part 1",
    "url": "https://www.youtube.com/watch?v=jU_6oNbNQRQ",
    "durationSec": 2518,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-FrZA4TQEgFc",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 12,
    "title": "12- Linux Basics : Part 2",
    "url": "https://www.youtube.com/watch?v=FrZA4TQEgFc",
    "durationSec": 2961,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-h1zv1TqDQd4",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 13,
    "title": "13- Linux Basics : Part 3",
    "url": "https://www.youtube.com/watch?v=h1zv1TqDQd4",
    "durationSec": 890,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-mt6OaqkMhc4",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 14,
    "title": "14- Linux Basics : Part 4",
    "url": "https://www.youtube.com/watch?v=mt6OaqkMhc4",
    "durationSec": 2008,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-gUA2A2wf6PQ",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 15,
    "title": "15- Linux Basics : Part 5",
    "url": "https://www.youtube.com/watch?v=gUA2A2wf6PQ",
    "durationSec": 1783,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-tOQ8UxvUXgo",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 16,
    "title": "16- Linux Basics : Part 6",
    "url": "https://www.youtube.com/watch?v=tOQ8UxvUXgo",
    "durationSec": 1902,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-Cgda61SaDGs",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 17,
    "title": "17- Linux Basics : Part 7",
    "url": "https://www.youtube.com/watch?v=Cgda61SaDGs",
    "durationSec": 1864,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-koYwU0P2evE",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 18,
    "title": "18- Linux Basics : Part 8",
    "url": "https://www.youtube.com/watch?v=koYwU0P2evE",
    "durationSec": 2067,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-_rvxwdWVQ_Q",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 19,
    "title": "19- Windows Basics",
    "url": "https://www.youtube.com/watch?v=_rvxwdWVQ_Q",
    "durationSec": 1888,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-U_QQ-7wLIFE",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 20,
    "title": "20- Python Basics : Part 1",
    "url": "https://www.youtube.com/watch?v=U_QQ-7wLIFE",
    "durationSec": 2976,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-lFoJ6iT1tsU",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 21,
    "title": "21- Python Basics : Part 2",
    "url": "https://www.youtube.com/watch?v=lFoJ6iT1tsU",
    "durationSec": 1701,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-nxkHzp2rA0s",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 22,
    "title": "22- Python Basics : Part 3",
    "url": "https://www.youtube.com/watch?v=nxkHzp2rA0s",
    "durationSec": 2163,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-P4KeXwN9wlk",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 23,
    "title": "23- Python Basics : Part 4",
    "url": "https://www.youtube.com/watch?v=P4KeXwN9wlk",
    "durationSec": 1084,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-00xLOd-6Va4",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 24,
    "title": "24- Cryptography, Encoding, and Data Protection",
    "url": "https://www.youtube.com/watch?v=00xLOd-6Va4",
    "durationSec": 2085,
    "topicTags": [
      "crypto",
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "crypto",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5-CDA0Y3TgZO0",
    "courseId": "PLgKWvRMsdLZ6k109C1TsTTv5AbCM_-Lq5",
    "index": 25,
    "title": "25- What's The Next Step ?",
    "url": "https://www.youtube.com/watch?v=CDA0Y3TgZO0",
    "durationSec": 1094,
    "topicTags": [
      "foundations",
      "cybersecurity",
      "basics",
      "for",
      "beginners"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-TkOtGpTv8_c",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 1,
    "title": "Introduction to Cybersecurity",
    "url": "https://www.youtube.com/watch?v=TkOtGpTv8_c",
    "durationSec": 7004,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-Nuqm43aaCvo",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 2,
    "title": "Network Introduction and Protocols  | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=Nuqm43aaCvo",
    "durationSec": 9996,
    "topicTags": [
      "web",
      "network",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-9Lx3Ah5GbAk",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 3,
    "title": "Network + شرح | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=9Lx3Ah5GbAk",
    "durationSec": 5937,
    "topicTags": [
      "web",
      "network",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-XKpmjlggzWk",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 4,
    "title": "Network Revision (الزيتونة)  | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=XKpmjlggzWk",
    "durationSec": 7146,
    "topicTags": [
      "web",
      "network",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-V5oKavuI4Jc",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 5,
    "title": "Kali Linux for Beginners | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=V5oKavuI4Jc",
    "durationSec": 3385,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-vfZ-b1NAXMI",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 6,
    "title": "شرح + Security بالكامل",
    "url": "https://www.youtube.com/watch?v=vfZ-b1NAXMI",
    "durationSec": 4454,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-_Bev9ckPOXY",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 7,
    "title": "Cryptography Basics | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=_Bev9ckPOXY",
    "durationSec": 7648,
    "topicTags": [
      "web",
      "crypto",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "crypto",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-pgf-uImxeqQ",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 8,
    "title": "Web Basics (Part 1) | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=pgf-uImxeqQ",
    "durationSec": 7739,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-Yd7yIfZeA1M",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 9,
    "title": "Web Basics (Part 2) | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=Yd7yIfZeA1M",
    "durationSec": 4306,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-j1FKUA53PPg",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 10,
    "title": "Authentication ثغرة | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=j1FKUA53PPg",
    "durationSec": 6695,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-nhwrfHC47xE",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 11,
    "title": "Path Traversal ثغرة  | Cybersecurity",
    "url": "https://www.youtube.com/watch?v=nhwrfHC47xE",
    "durationSec": 7900,
    "topicTags": [
      "web",
      "crypto",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "crypto",
      "foundations"
    ]
  },
  {
    "id": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez-gtfIsd5w5XA",
    "courseId": "PLsIGT4L3dt7Np5LAIKzC3Bg_HDBglA0Ez",
    "index": 12,
    "title": "Advanced bug bounty tips & tricks (محتوي عربي)",
    "url": "https://www.youtube.com/watch?v=gtfIsd5w5XA",
    "durationSec": 11251,
    "topicTags": [
      "web",
      "foundations",
      "cybersecurity",
      "for",
      "beginner",
      "master"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-6P8N7VW21MQ",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 1,
    "title": "01- Introduction To The Workshop",
    "url": "https://www.youtube.com/watch?v=6P8N7VW21MQ",
    "durationSec": 9130,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-FPSBYUdvpm8",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 2,
    "title": "02- Programming Basics Concepts For Malware Analysts P1",
    "url": "https://www.youtube.com/watch?v=FPSBYUdvpm8",
    "durationSec": 8790,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "programming"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-WW5xideeUDA",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 3,
    "title": "03- Programming Basics Concepts For Malware Analysts P2",
    "url": "https://www.youtube.com/watch?v=WW5xideeUDA",
    "durationSec": 10080,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "programming"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-m4HoXbxGSsc",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 4,
    "title": "04- Discussion About CTFs & Programming Basics : Python P1",
    "url": "https://www.youtube.com/watch?v=m4HoXbxGSsc",
    "durationSec": 9602,
    "topicTags": [
      "malware",
      "ctf",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "discussion"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-4TJOQaOGDrk",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 5,
    "title": "05- Programming Basics : Python P2",
    "url": "https://www.youtube.com/watch?v=4TJOQaOGDrk",
    "durationSec": 11663,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "programming"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-OZyjwTbPnmA",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 6,
    "title": "06- Revision And Task Discussion",
    "url": "https://www.youtube.com/watch?v=OZyjwTbPnmA",
    "durationSec": 7901,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-yIjt8ZfvB80",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 7,
    "title": "07- Revision & Task Discussion P2 And Introduction To C Programming",
    "url": "https://www.youtube.com/watch?v=yIjt8ZfvB80",
    "durationSec": 9400,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-v4P8m1u_7ik",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 8,
    "title": "08- Introduction To C Programming P2",
    "url": "https://www.youtube.com/watch?v=v4P8m1u_7ik",
    "durationSec": 7983,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-z5qwaZLHep4",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 9,
    "title": "09- Introduction To C Programming P3",
    "url": "https://www.youtube.com/watch?v=z5qwaZLHep4",
    "durationSec": 6406,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9c7nb4KcNfM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 10,
    "title": "10- Introduction To C Programming P4",
    "url": "https://www.youtube.com/watch?v=9c7nb4KcNfM",
    "durationSec": 7414,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-ijc55rW_5z4",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 11,
    "title": "11- Introduction To C Programming P5",
    "url": "https://www.youtube.com/watch?v=ijc55rW_5z4",
    "durationSec": 7117,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-ImrcMr0NgZA",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 12,
    "title": "12- Introduction To C Programming P6",
    "url": "https://www.youtube.com/watch?v=ImrcMr0NgZA",
    "durationSec": 9197,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "introduction"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9AG-fTGbyo8",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 13,
    "title": "13- CPU Arch Basics P1",
    "url": "https://www.youtube.com/watch?v=9AG-fTGbyo8",
    "durationSec": 10263,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "cpu"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-dMVb4_aAhvE",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 14,
    "title": "14- Network Basics P1",
    "url": "https://www.youtube.com/watch?v=dMVb4_aAhvE",
    "durationSec": 7398,
    "topicTags": [
      "network",
      "malware",
      "foundations",
      "analysis",
      "fundamentals"
    ],
    "trackIds": [
      "network",
      "malware",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-OHsGkcptwiM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 15,
    "title": "15- Network Basics P2",
    "url": "https://www.youtube.com/watch?v=OHsGkcptwiM",
    "durationSec": 8686,
    "topicTags": [
      "network",
      "malware",
      "foundations",
      "analysis",
      "fundamentals"
    ],
    "trackIds": [
      "network",
      "malware",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4--Xs2Xw9oSb8",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 16,
    "title": "16- Revision And Task Discussion P1",
    "url": "https://www.youtube.com/watch?v=-Xs2Xw9oSb8",
    "durationSec": 7875,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-dJFCOuMS4WQ",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 17,
    "title": "17- Revision And Task Discussion P2",
    "url": "https://www.youtube.com/watch?v=dJFCOuMS4WQ",
    "durationSec": 5238,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-MY9E4Hf4VeE",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 18,
    "title": "18- Encode , Encryption And Hashing Basics",
    "url": "https://www.youtube.com/watch?v=MY9E4Hf4VeE",
    "durationSec": 5425,
    "topicTags": [
      "malware",
      "crypto",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "encode"
    ],
    "trackIds": [
      "malware",
      "crypto",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-6nKfDXZwUHE",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 19,
    "title": "19- Revision & Task Discussion ( Reverse Tasks )",
    "url": "https://www.youtube.com/watch?v=6nKfDXZwUHE",
    "durationSec": 6959,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-QrCffV5C-hE",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 20,
    "title": "20- OS Basics P1 : OS Introduction",
    "url": "https://www.youtube.com/watch?v=QrCffV5C-hE",
    "durationSec": 5468,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basics"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-2gDHaS8QWoY",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 21,
    "title": "21- OS Basics P2 : OS Structures",
    "url": "https://www.youtube.com/watch?v=2gDHaS8QWoY",
    "durationSec": 6154,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basics"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-pSxob9kkAKI",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 22,
    "title": "22- OS Basics P3 : Processes & Threads",
    "url": "https://www.youtube.com/watch?v=pSxob9kkAKI",
    "durationSec": 4922,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basics"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-v4I7N7bIdoY",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 23,
    "title": "23- OS Basics P4 : System Calls And Windows APIs",
    "url": "https://www.youtube.com/watch?v=v4I7N7bIdoY",
    "durationSec": 5836,
    "topicTags": [
      "api",
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basics"
    ],
    "trackIds": [
      "api",
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-SUFQKgP7F4U",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 24,
    "title": "24- OS Basics P5 : System Calls And Windows APIs P2",
    "url": "https://www.youtube.com/watch?v=SUFQKgP7F4U",
    "durationSec": 6549,
    "topicTags": [
      "api",
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basics"
    ],
    "trackIds": [
      "api",
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-RjOR2ACYS2o",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 25,
    "title": "25- Dive Into Malwares World",
    "url": "https://www.youtube.com/watch?v=RjOR2ACYS2o",
    "durationSec": 5439,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-jIIzm6Rv6Qk",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 26,
    "title": "26- How To Setup Your Malware Analysis Machine ?",
    "url": "https://www.youtube.com/watch?v=jIIzm6Rv6Qk",
    "durationSec": 5821,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "how"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-VVIQ_VE7VRs",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 27,
    "title": "27- Revision & Task Discussion",
    "url": "https://www.youtube.com/watch?v=VVIQ_VE7VRs",
    "durationSec": 6034,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-W8P-22-ts6k",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 28,
    "title": "28- Basic Static Analysis : Intro & Some Important Techniques And Tools",
    "url": "https://www.youtube.com/watch?v=W8P-22-ts6k",
    "durationSec": 5826,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basic"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-Z7i4ff_2q1E",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 29,
    "title": "29- Basic Static Analysis : PE Files And Some Operations And Tools To Deal With It",
    "url": "https://www.youtube.com/watch?v=Z7i4ff_2q1E",
    "durationSec": 5576,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basic"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-Z6Gysvkie58",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 30,
    "title": "30- Meaning & Types Of Packing And How To Deal With It",
    "url": "https://www.youtube.com/watch?v=Z6Gysvkie58",
    "durationSec": 7965,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "meaning"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4--pjhEwyXcHg",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 31,
    "title": "31- Basic Dynamic Analysis : Get Familiar With Sandboxes",
    "url": "https://www.youtube.com/watch?v=-pjhEwyXcHg",
    "durationSec": 6415,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "basic"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-DSbtOqb9vMY",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 32,
    "title": "32- Get Into Assembly Language x86 P1 : Introduction To Assembly Language",
    "url": "https://www.youtube.com/watch?v=DSbtOqb9vMY",
    "durationSec": 7722,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9vxizL6z-08",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 33,
    "title": "33- Get Into Assembly Language x86 P2 : Data Moving Instructions In Assembly Language",
    "url": "https://www.youtube.com/watch?v=9vxizL6z-08",
    "durationSec": 8000,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-rE7paYGmvpw",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 34,
    "title": "34- Get Into Assembly Language x86 P3 : Arithmetic Instructions In Assembly Language",
    "url": "https://www.youtube.com/watch?v=rE7paYGmvpw",
    "durationSec": 5406,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9r8EaqOt-bg",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 35,
    "title": "35- Get Into Assembly Language x86 P4 : Logical Instructions In Assembly Language",
    "url": "https://www.youtube.com/watch?v=9r8EaqOt-bg",
    "durationSec": 3481,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-KqUe8hR6lLM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 36,
    "title": "36- Get Into Assembly Language x86 P5 : Control Instructions In Assembly Language",
    "url": "https://www.youtube.com/watch?v=KqUe8hR6lLM",
    "durationSec": 4763,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-8db8mgzEmT4",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 37,
    "title": "37- Get Into Assembly Language x86 P6 : String And Miscellaneous Instructions In Assembly Language",
    "url": "https://www.youtube.com/watch?v=8db8mgzEmT4",
    "durationSec": 4878,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "get"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-fgqd5s62x_c",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 38,
    "title": "38- Revision And Task Discussion P1",
    "url": "https://www.youtube.com/watch?v=fgqd5s62x_c",
    "durationSec": 7343,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-xb8Xh20QkO4",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 39,
    "title": "39- Q&A Session",
    "url": "https://www.youtube.com/watch?v=xb8Xh20QkO4",
    "durationSec": 7192,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-eoVi6Y7FXtQ",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 40,
    "title": "40- Revision And Task Discussion P2",
    "url": "https://www.youtube.com/watch?v=eoVi6Y7FXtQ",
    "durationSec": 5556,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "revision"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-G-PijruvTpk",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 41,
    "title": "41- Dive Into Assembly x86 P1 : Functions Calls With Stack Layout In Assembly Language",
    "url": "https://www.youtube.com/watch?v=G-PijruvTpk",
    "durationSec": 9019,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-os5pwt9AKpU",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 42,
    "title": "42- Dive Into Assembly x86 P2 : If Conditions & Switch Cases In Assembly Language",
    "url": "https://www.youtube.com/watch?v=os5pwt9AKpU",
    "durationSec": 2260,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-IbiePhG0Ot0",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 43,
    "title": "43- Dive Into Assembly x86 P3 : Loops In Assembly Language",
    "url": "https://www.youtube.com/watch?v=IbiePhG0Ot0",
    "durationSec": 2791,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-48Z4WiVfU4w",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 44,
    "title": "44- Dive Into Assembly x86 P4 : Arrays & Structs With Loops In Assembly Language",
    "url": "https://www.youtube.com/watch?v=48Z4WiVfU4w",
    "durationSec": 4567,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-sHdh01b6Stw",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 45,
    "title": "45- Dive Into IDA & Disassemble Algorithms P1 : Get Familiar With IDA Pro",
    "url": "https://www.youtube.com/watch?v=sHdh01b6Stw",
    "durationSec": 6000,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-_9H3MVPrGos",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 46,
    "title": "46- Dive Into IDA & Disassemble Algorithms P2 : Plugins & Python IDAScripting In IDA Pro",
    "url": "https://www.youtube.com/watch?v=_9H3MVPrGos",
    "durationSec": 6152,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-C3mg6JpxTxU",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 47,
    "title": "47- Dive Into IDA & Disassemble Algorithms P3 : Solve First CTF Challenge Using IDA Pro",
    "url": "https://www.youtube.com/watch?v=C3mg6JpxTxU",
    "durationSec": 5023,
    "topicTags": [
      "malware",
      "ctf",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-dMfdaZKo9LM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 48,
    "title": "48- General Revision : Solve 2 CTFs Challenges Using IDA \"Debugging And Disassembled Python Code\"",
    "url": "https://www.youtube.com/watch?v=dMfdaZKo9LM",
    "durationSec": 6018,
    "topicTags": [
      "malware",
      "ctf",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "general"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-ouLhx2WPEsM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 49,
    "title": "49- Dive Into Ghidra & Disassemble Algorithms P1 : Get Familiar With Ghidra",
    "url": "https://www.youtube.com/watch?v=ouLhx2WPEsM",
    "durationSec": 4027,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-UNZLbIN2ZgI",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 50,
    "title": "50- Dive Into Ghidra & Disassemble Algorithms P2 : Work With Ghidra Scripts & Plugins",
    "url": "https://www.youtube.com/watch?v=UNZLbIN2ZgI",
    "durationSec": 3266,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-WhrSNDURFgw",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 51,
    "title": "51- Dive Into Ghidra & Disassemble Algorithms P3 : Full Java Ransomware Analysis Using Ghidra & Jadx",
    "url": "https://www.youtube.com/watch?v=WhrSNDURFgw",
    "durationSec": 4694,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-aZIFLTiCNFQ",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 52,
    "title": "52- Intro To Debuggers P1 : What Is Debuggers, Why We Need It, And Get Familiar With IDAdbg & x64dbg",
    "url": "https://www.youtube.com/watch?v=aZIFLTiCNFQ",
    "durationSec": 5559,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "intro"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-gOIRWdyQEjQ",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 53,
    "title": "53- Intro To Debuggers P2 : Working With Debuggers ( With .EXEs And .DLLs )",
    "url": "https://www.youtube.com/watch?v=gOIRWdyQEjQ",
    "durationSec": 4759,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "intro"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-UqowHfzPbak",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 54,
    "title": "54- Intro To Debuggers P3 : Tracing And Patching With x64dbg",
    "url": "https://www.youtube.com/watch?v=UqowHfzPbak",
    "durationSec": 3573,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "intro"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-4x2Mg0pgXYc",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 55,
    "title": "55- Intro To Debuggers P4 : Some Important Plugins And Its Functionality In x64dbg",
    "url": "https://www.youtube.com/watch?v=4x2Mg0pgXYc",
    "durationSec": 2842,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "intro"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-gGkbEuOzLvw",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 56,
    "title": "56- General Revision : Full Static And Basic Dynamic Analysis For BadRabbit Malware Sample",
    "url": "https://www.youtube.com/watch?v=gGkbEuOzLvw",
    "durationSec": 7012,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "general"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-So97VTqXQJw",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 57,
    "title": "58- Dive Into Debuggers : Understanding Advanced Debugging Concepts",
    "url": "https://www.youtube.com/watch?v=So97VTqXQJw",
    "durationSec": 1953,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9bkqw8YMrWM",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 58,
    "title": "59- General Practice : Solve RAR-CVE Lab From CyberDefenders",
    "url": "https://www.youtube.com/watch?v=9bkqw8YMrWM",
    "durationSec": 3934,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "general"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-08LFW9-KzP0",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 59,
    "title": "60- Dive Into Debuggers : Anti-Debugging Techniques",
    "url": "https://www.youtube.com/watch?v=08LFW9-KzP0",
    "durationSec": 5235,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-l54YJPFfJCY",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 60,
    "title": "61- Dive Into Debuggers : Bypassing Anti-Debugging Techniques P1",
    "url": "https://www.youtube.com/watch?v=l54YJPFfJCY",
    "durationSec": 5987,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-_w_AuARPkY4",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 61,
    "title": "62- Dive Into Debuggers : Bypassing Anti-Debugging Techniques P2",
    "url": "https://www.youtube.com/watch?v=_w_AuARPkY4",
    "durationSec": 5368,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-uhRDHWrSXIg",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 62,
    "title": "63- Bounce Session : Install MCP Tools For IDA Pro And Ghidra And Configure Network Of The Machine",
    "url": "https://www.youtube.com/watch?v=uhRDHWrSXIg",
    "durationSec": 7908,
    "topicTags": [
      "network",
      "malware",
      "foundations",
      "analysis",
      "fundamentals",
      "bounce"
    ],
    "trackIds": [
      "network",
      "malware",
      "foundations"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-9VNDqBPu-dc",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 63,
    "title": "64- Dive Into Debugging : Kernel Debugging P1",
    "url": "https://www.youtube.com/watch?v=9VNDqBPu-dc",
    "durationSec": 5573,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-PX-Fe0N6a0s",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 64,
    "title": "65- Dive Into Debugging : Kernel Debugging P2",
    "url": "https://www.youtube.com/watch?v=PX-Fe0N6a0s",
    "durationSec": 6316,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-x5IYye6TlBg",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 65,
    "title": "66- Back Again And General Revision",
    "url": "https://www.youtube.com/watch?v=x5IYye6TlBg",
    "durationSec": 3205,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "back"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-_MwB06OuA-k",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 66,
    "title": "67- Dive Into Debugging : Kernel Debugging P3",
    "url": "https://www.youtube.com/watch?v=_MwB06OuA-k",
    "durationSec": 4456,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-96-xHnuTWKI",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 67,
    "title": "68- Dive Into Debugging : Kernel Debugging P4",
    "url": "https://www.youtube.com/watch?v=96-xHnuTWKI",
    "durationSec": 5055,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals",
      "dive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-5P5xBmmzogU",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 68,
    "title": "69- Malware Packing : Introduction To Packing",
    "url": "https://www.youtube.com/watch?v=5P5xBmmzogU",
    "durationSec": 3497,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4-xHGLR5Cwnw8",
    "courseId": "PLgKWvRMsdLZ4N_okwVWqB6cgqeVQtZNC4",
    "index": 69,
    "title": "70- Malware Packing : Introduction To Unpacking \"Automatic Approach\"",
    "url": "https://www.youtube.com/watch?v=xHGLR5Cwnw8",
    "durationSec": 5484,
    "topicTags": [
      "malware",
      "foundations",
      "network",
      "analysis",
      "fundamentals"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "network"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-uyo9GUmI1YI",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 1,
    "title": "Android applications penetration testing Basics (1)",
    "url": "https://www.youtube.com/watch?v=uyo9GUmI1YI",
    "durationSec": 2342,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-3YBtng_NmS4",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 2,
    "title": "Insecure data storage, Insecure Logging, APK Extraction (2)",
    "url": "https://www.youtube.com/watch?v=3YBtng_NmS4",
    "durationSec": 1266,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-vZKC6iQeKD4",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 3,
    "title": "Android Components Attacks and Firebase Misconfiguration. (3)",
    "url": "https://www.youtube.com/watch?v=vZKC6iQeKD4",
    "durationSec": 2902,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-7o3bU_b1hfo",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 4,
    "title": "Android Native Library Analysis (4)",
    "url": "https://www.youtube.com/watch?v=7o3bU_b1hfo",
    "durationSec": 1158,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-DN74aXwaEZA",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 5,
    "title": "C# based Android Apps Analysis (5)",
    "url": "https://www.youtube.com/watch?v=DN74aXwaEZA",
    "durationSec": 970,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-6GKTS6SOHkQ",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 6,
    "title": "Dynamic Application Analysis using drozer framework (6)",
    "url": "https://www.youtube.com/watch?v=6GKTS6SOHkQ",
    "durationSec": 3063,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-DSnyzsulsiM",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 7,
    "title": "Dynamic Application Analysis using Frida framework (7)",
    "url": "https://www.youtube.com/watch?v=DSnyzsulsiM",
    "durationSec": 4360,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-cLec3Ov84JM",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 8,
    "title": "Patching Android Applications (8)",
    "url": "https://www.youtube.com/watch?v=cLec3Ov84JM",
    "durationSec": 731,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-y1Ghdg7Xesk",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 9,
    "title": "Traffic Interception and SSL Pinning (9)",
    "url": "https://www.youtube.com/watch?v=y1Ghdg7Xesk",
    "durationSec": 3551,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-E2S0pws7evM",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 10,
    "title": "Root Detection Bypass (10)",
    "url": "https://www.youtube.com/watch?v=E2S0pws7evM",
    "durationSec": 727,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-JPIgbjqsqoo",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 11,
    "title": "Dynamic Application Analysis using Objection Framework.",
    "url": "https://www.youtube.com/watch?v=JPIgbjqsqoo",
    "durationSec": 1765,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-ESNeN1zckRI",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 12,
    "title": "Hack The Box: Introduction to Android Exploitation Track | Part 1",
    "url": "https://www.youtube.com/watch?v=ESNeN1zckRI",
    "durationSec": 2177,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-i1NXriMNiM8",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 13,
    "title": "Hack The Box: Introduction to Android Exploitation Track | Part 2",
    "url": "https://www.youtube.com/watch?v=i1NXriMNiM8",
    "durationSec": 2127,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-kkRrDZmHEPs",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 14,
    "title": "Task Hijacking Vulnerability",
    "url": "https://www.youtube.com/watch?v=kkRrDZmHEPs",
    "durationSec": 1187,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-rOj2OVcUC8M",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 15,
    "title": "Android Apps Web View Security Testing",
    "url": "https://www.youtube.com/watch?v=rOj2OVcUC8M",
    "durationSec": 1785,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-EZwp2VNLxeg",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 16,
    "title": "Android Apps dev for Hackers: Basic Concepts",
    "url": "https://www.youtube.com/watch?v=EZwp2VNLxeg",
    "durationSec": 2991,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F-6-9rfPbt5FM",
    "courseId": "PLNwotgTQ6zKEcBp3EOmDqw-DKRdOEHl_F",
    "index": 17,
    "title": "Android App dev for Hackers: Activity Lifecycle & Intents",
    "url": "https://www.youtube.com/watch?v=6-9rfPbt5FM",
    "durationSec": 3604,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "android",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-0hL4Vg9e0sY",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 1,
    "title": "eJPTv2(Course) | Information gathering  Passive Information Gathering#1 | تجميع المعلومات بشكل باسيف",
    "url": "https://www.youtube.com/watch?v=0hL4Vg9e0sY",
    "durationSec": 1571,
    "topicTags": [
      "web",
      "ejptv2",
      "information",
      "gathering"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-nv4_Q_HJoaI",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 2,
    "title": "eJPT2(Course)Passive Information Gathering#2 |تجميع المعلومات بشكل باسيف | eJPTv2 كورس بالعربي",
    "url": "https://www.youtube.com/watch?v=nv4_Q_HJoaI",
    "durationSec": 627,
    "topicTags": [
      "web",
      "ejptv2",
      "ejpt2",
      "passive",
      "information"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-ZygcQN5NQas",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 3,
    "title": "Passive Information Gathering#3 | تجميع المعلومات بشكل باسيف | eJPTv2 كورس بالعربي|",
    "url": "https://www.youtube.com/watch?v=ZygcQN5NQas",
    "durationSec": 1142,
    "topicTags": [
      "web",
      "ejptv2",
      "passive",
      "information",
      "gathering#3"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-UKW8y2jPKsg",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 4,
    "title": "Passive Information Gathering#4 |تجميع المعلومات بشكل باسيف | eJPTv2 كورس بالعربي",
    "url": "https://www.youtube.com/watch?v=UKW8y2jPKsg",
    "durationSec": 1477,
    "topicTags": [
      "web",
      "ejptv2",
      "passive",
      "information",
      "gathering#4"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-1i7VMrdVGUM",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 5,
    "title": "Active Information Gathering#1 | تجميع المعلومات بشكل فعال | eJPTv2 كورس بالعربي",
    "url": "https://www.youtube.com/watch?v=1i7VMrdVGUM",
    "durationSec": 1158,
    "topicTags": [
      "web",
      "ejptv2",
      "active",
      "information",
      "gathering#1"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-RyS4uQIsbD4",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 6,
    "title": "Active Information Gathering#2 with lab| تجميع المعلومات بشكل فعال مع تطبيق عملي eJPTv2 كورس بالعربي",
    "url": "https://www.youtube.com/watch?v=RyS4uQIsbD4",
    "durationSec": 1855,
    "topicTags": [
      "web",
      "ejptv2",
      "active",
      "information",
      "gathering#2"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-nkfbUl5VttM",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 7,
    "title": "Assessment Methodologies: Footprinting & Scanning ejptv2 course|  القسم الثاني ٫ اساسيات الشبكات #1",
    "url": "https://www.youtube.com/watch?v=nkfbUl5VttM",
    "durationSec": 1087,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "footprinting"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-_W9azG7sY2g",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 8,
    "title": "Assessment Methodologies: Footprinting & Scanning ejptv2 course| القسم الثاني  اساسيات الشبكات #2 |",
    "url": "https://www.youtube.com/watch?v=_W9azG7sY2g",
    "durationSec": 1491,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "footprinting"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-Wr3ZAlSHc5s",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 9,
    "title": "تابع اساسيات الشبكات #2",
    "url": "https://www.youtube.com/watch?v=Wr3ZAlSHc5s",
    "durationSec": 281,
    "topicTags": [
      "web",
      "ejptv2"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-gbKwGZgFUgU",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 10,
    "title": "Assessment Methodologies: Footprinting & Scanning ejptv2 course| القسم الثاني  اساسيات الشبكات #3 |",
    "url": "https://www.youtube.com/watch?v=gbKwGZgFUgU",
    "durationSec": 1177,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "footprinting"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-Nnr6V0cqMDk",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 11,
    "title": "Assessment Methodologies:Host Discovery",
    "url": "https://www.youtube.com/watch?v=Nnr6V0cqMDk",
    "durationSec": 1906,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "host"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-0o0UDEfH6xI",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 12,
    "title": "Host Discovery | اكتشاف الاجهزة عملي",
    "url": "https://www.youtube.com/watch?v=0o0UDEfH6xI",
    "durationSec": 454,
    "topicTags": [
      "web",
      "ejptv2",
      "host",
      "discovery"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-UrnoEZy6oR8",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 13,
    "title": "Assessment Methodologies: Port Scanning",
    "url": "https://www.youtube.com/watch?v=UrnoEZy6oR8",
    "durationSec": 619,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "port"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-YlBCfeNiH5A",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 14,
    "title": "port scanning#2  |  2#فحص البورتات",
    "url": "https://www.youtube.com/watch?v=YlBCfeNiH5A",
    "durationSec": 1108,
    "topicTags": [
      "web",
      "ejptv2",
      "port",
      "scanning#2"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-vwdPeh4IisI",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 15,
    "title": "Nmap Script | استعمال السكربتات",
    "url": "https://www.youtube.com/watch?v=vwdPeh4IisI",
    "durationSec": 529,
    "topicTags": [
      "network",
      "web",
      "ejptv2",
      "nmap",
      "script"
    ],
    "trackIds": [
      "network",
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-E2R36donibs",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 16,
    "title": "tryhackme#nmap script ine",
    "url": "https://www.youtube.com/watch?v=E2R36donibs",
    "durationSec": 816,
    "topicTags": [
      "network",
      "ctf",
      "web",
      "ejptv2",
      "tryhackme#nmap",
      "script",
      "ine"
    ],
    "trackIds": [
      "network",
      "ctf",
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-F8ZjbOstJDY",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 17,
    "title": "Assessment Methodologies: Enumeration#1",
    "url": "https://www.youtube.com/watch?v=F8ZjbOstJDY",
    "durationSec": 275,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#1"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-ezHq12OAhJo",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 18,
    "title": "Assessment Methodologies: Enumeration#2 | تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=ezHq12OAhJo",
    "durationSec": 427,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#2"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-ApSaRYGkmNM",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 19,
    "title": "Assessment Methodologies: Enumeration#3 | تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=ApSaRYGkmNM",
    "durationSec": 472,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#3"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-MUDeGCopOzA",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 20,
    "title": "Assessment Methodologies: Enumeration#4 | تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=MUDeGCopOzA",
    "durationSec": 614,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#4"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-7zvEBYJPzzk",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 21,
    "title": "Assessment Methodologies: Enumeration#5 | Samba تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=7zvEBYJPzzk",
    "durationSec": 760,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#5"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-AS7dBgZ5vo8",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 22,
    "title": "Assessment Methodologies: Enumeration#6 | تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=AS7dBgZ5vo8",
    "durationSec": 586,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#6"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-nWuuNgCHae0",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 23,
    "title": "Assessment Methodologies: Enumeration#7 SMB Dictionary attack  | الهجوم  على السيرفس",
    "url": "https://www.youtube.com/watch?v=nWuuNgCHae0",
    "durationSec": 1158,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#7"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-5bGOQzIK2d8",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 24,
    "title": "Assessment Methodologies: Enumeration#8 FTP | تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=5bGOQzIK2d8",
    "durationSec": 514,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#8"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-AzLpqcM9-3E",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 25,
    "title": "Assessment Methodologies: Enumeration#9 SSH | #1تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=AzLpqcM9-3E",
    "durationSec": 857,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#9"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-6_kz3fKkzYQ",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 26,
    "title": "Assessment Methodologies: Enumeration#11 http| تجميع المعلومات عن السيرفس",
    "url": "https://www.youtube.com/watch?v=6_kz3fKkzYQ",
    "durationSec": 420,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#11"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-0iYSeOqD19E",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 27,
    "title": "Assessment Methodologies: Enumeration#12 http| تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=0iYSeOqD19E",
    "durationSec": 637,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#12"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-6feZJmiZ568",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 28,
    "title": "Assessment Methodologies: Enumeration#13 http apache| تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=6feZJmiZ568",
    "durationSec": 798,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#13"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-_eMxbjTSXGo",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 29,
    "title": "Assessment Methodologies: Enumeration#16 MySQL | تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=_eMxbjTSXGo",
    "durationSec": 416,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#16"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-9qLBuhJNNA0",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 30,
    "title": "Assessment Methodologies: Enumeration#15 MySQL#2 | تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=9qLBuhJNNA0",
    "durationSec": 580,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#15"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-VgtTvXgjvqQ",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 31,
    "title": "Assessment Methodologies: Enumeration#14 MySQL#1 | تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=VgtTvXgjvqQ",
    "durationSec": 1416,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#14"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-81oaTXTuY_w",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 32,
    "title": "Assessment Methodologies: Enumeration#17 SSH | تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=81oaTXTuY_w",
    "durationSec": 640,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#17"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-vgHuktHoTRs",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 33,
    "title": "Assessment Methodologies: Enumeration#18 SMTP | تجميع المعلومات عن السيرفيس",
    "url": "https://www.youtube.com/watch?v=vgHuktHoTRs",
    "durationSec": 465,
    "topicTags": [
      "web",
      "ejptv2",
      "assessment",
      "methodologies",
      "enumeration#18"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-Um3J0MQHBmU",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 34,
    "title": "Host & Network Penetration Testing: System/Host Based Attacks#1-Intro",
    "url": "https://www.youtube.com/watch?v=Um3J0MQHBmU",
    "durationSec": 876,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "ejptv2",
      "host",
      "penetration"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b-uwfQzI47WSw",
    "courseId": "PLzAnkOon0V20z7t7F0lCOU9T9fL54Li7b",
    "index": 35,
    "title": "Host & Network Penetration Testing: System/Host Based Attacks#2",
    "url": "https://www.youtube.com/watch?v=uwfQzI47WSw",
    "durationSec": 1543,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "ejptv2",
      "host",
      "penetration"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-iIwohkJjXMs",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 1,
    "title": "Android Pentesting Approach and Checklist | Android Application Security Audit | Explain in HINDI",
    "url": "https://www.youtube.com/watch?v=iIwohkJjXMs",
    "durationSec": 2209,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "android"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-LIi-_Mp581U",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 2,
    "title": "Decompile Android APK to a JAR file with dex2jar and JDGUI | Android Application Static Analysis",
    "url": "https://www.youtube.com/watch?v=LIi-_Mp581U",
    "durationSec": 467,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "decompile"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-dHMiW1zqiSk",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 3,
    "title": "How to read AndroidManifest.xml file manually with APKTOOL after decompile | Static Analysis HINDI",
    "url": "https://www.youtube.com/watch?v=dHMiW1zqiSk",
    "durationSec": 575,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-psDnefFUjyg",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 4,
    "title": "How to deploy ROOT/Non-ROOT Phone on Android Studio | Android Pentesting Lab Setup with Emulator",
    "url": "https://www.youtube.com/watch?v=psDnefFUjyg",
    "durationSec": 920,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-K0MqTlAZQpY",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 5,
    "title": "How to setup MOBSF on Docker and Manually | Mobile Application Static Analyzer | Macbook | Hindi",
    "url": "https://www.youtube.com/watch?v=K0MqTlAZQpY",
    "durationSec": 932,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-uf40r5CZumc",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 6,
    "title": "How to Install/Setup Genymotion | Virtual Phone Setup | Android Virtualization | Macbook",
    "url": "https://www.youtube.com/watch?v=uf40r5CZumc",
    "durationSec": 584,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-4Tk6cFKcGDQ",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 7,
    "title": "Android Debug Bridge | ADB Commands | Explain in HINDI",
    "url": "https://www.youtube.com/watch?v=4Tk6cFKcGDQ",
    "durationSec": 1036,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "android"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-3f9FvikLcuI",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 8,
    "title": "How to Intercept HTTPs Request of Android Emulator with BURP SUITE | Android Pentesting in Hindi",
    "url": "https://www.youtube.com/watch?v=3f9FvikLcuI",
    "durationSec": 487,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-XhTLIux8vw8",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 9,
    "title": "How to Export IPA file from iPhone without iTunes | HINDI with English Subtitles | PentestHint",
    "url": "https://www.youtube.com/watch?v=XhTLIux8vw8",
    "durationSec": 311,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-6huL0KVtYl4",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 10,
    "title": "How to Export IPA file from iPhone without iTunes in Windows 11 | PentestHint",
    "url": "https://www.youtube.com/watch?v=6huL0KVtYl4",
    "durationSec": 253,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-d2MrKVdKjzY",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 11,
    "title": "How to Jailbreak iPhone 7 (iOS 14.8) | PentestHint",
    "url": "https://www.youtube.com/watch?v=d2MrKVdKjzY",
    "durationSec": 415,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-GH5wHTj5Kf0",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 12,
    "title": "Yubikey 5 NFC Review & Tutorial | The Best Hardware Security Key | Advance 2FA options |  @Yubico",
    "url": "https://www.youtube.com/watch?v=GH5wHTj5Kf0",
    "durationSec": 379,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "yubikey"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-CIvMIdt4Tkc",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 13,
    "title": "What is Code Obfuscation in Android Pentesting | Static Analysis Complication | Explain in HINDI",
    "url": "https://www.youtube.com/watch?v=CIvMIdt4Tkc",
    "durationSec": 277,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "what"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-iRTNpvTy9zs",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 14,
    "title": "How To Manually Sign APK's with keytool Jarsigner & Zipalign | Explain in HINDI | Android Pentesting",
    "url": "https://www.youtube.com/watch?v=iRTNpvTy9zs",
    "durationSec": 443,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "how"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-Tx2Qft6SAEk",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 15,
    "title": "Mobile Pentesting Lab Setup | Mobile Penetration Testing Operating System | How to setup Mobexler",
    "url": "https://www.youtube.com/watch?v=Tx2Qft6SAEk",
    "durationSec": 582,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-OTZI71j8LnU",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 16,
    "title": "[HINDI] Mobile Application Security Testing Methodology | From OSINT to Report Writing | PentestHint",
    "url": "https://www.youtube.com/watch?v=OTZI71j8LnU",
    "durationSec": 356,
    "topicTags": [
      "osint",
      "mobile",
      "social",
      "foundations",
      "api",
      "application",
      "pentesting",
      "hindi"
    ],
    "trackIds": [
      "osint",
      "mobile",
      "social",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-lKWM2ALU7_w",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 17,
    "title": "[ENGLISH] How to Export IPA file from iPhone without iTunes in Windows 11 | PentestHint",
    "url": "https://www.youtube.com/watch?v=lKWM2ALU7_w",
    "durationSec": 219,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "english"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-qzGAXsnWAS0",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 18,
    "title": "Android Application Architecture as a Pentester | Android Penetration Testing |  PentestHint",
    "url": "https://www.youtube.com/watch?v=qzGAXsnWAS0",
    "durationSec": 1049,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "android"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-RvJRAKDZ1sQ",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 19,
    "title": "[HINDI] Android Manifest.xml file as a pentester | Android Penetration Testing | PentestHint",
    "url": "https://www.youtube.com/watch?v=RvJRAKDZ1sQ",
    "durationSec": 517,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "hindi"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-nEpl0XIik2M",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 20,
    "title": "Android SSL Pinning Bypass Using Frida Objection in Genymotion Virtual Phone | PentestHint",
    "url": "https://www.youtube.com/watch?v=nEpl0XIik2M",
    "durationSec": 1896,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "android"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ-6FbwYglVEGE",
    "courseId": "PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ",
    "index": 21,
    "title": "Android Penetration Testing Checklist with Explanation [HINDI] | PentestHint",
    "url": "https://www.youtube.com/watch?v=6FbwYglVEGE",
    "durationSec": 970,
    "topicTags": [
      "mobile",
      "foundations",
      "api",
      "application",
      "pentesting",
      "android"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-gRT0O76D77M",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 1,
    "title": "Course Intro",
    "url": "https://www.youtube.com/watch?v=gRT0O76D77M",
    "durationSec": 574,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-NAYhuf2cu3Y",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 2,
    "title": "1-Android Architecture",
    "url": "https://www.youtube.com/watch?v=NAYhuf2cu3Y",
    "durationSec": 1214,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-d8VVg2YVdMs",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 3,
    "title": "2-Android_Security_Model",
    "url": "https://www.youtube.com/watch?v=d8VVg2YVdMs",
    "durationSec": 788,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-yzNL-sxnXds",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 4,
    "title": "3-Android_Application_permissions",
    "url": "https://www.youtube.com/watch?v=yzNL-sxnXds",
    "durationSec": 1128,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-CozVXV-3lUA",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 5,
    "title": "4-App_Journey",
    "url": "https://www.youtube.com/watch?v=CozVXV-3lUA",
    "durationSec": 936,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-uB-FQ9xT3C4",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 6,
    "title": "5-adp_part1",
    "url": "https://www.youtube.com/watch?v=uB-FQ9xT3C4",
    "durationSec": 1084,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-NIJI-1cKqZA",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 7,
    "title": "6-adb_part2",
    "url": "https://www.youtube.com/watch?v=NIJI-1cKqZA",
    "durationSec": 766,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q-U1bOqH4l7KQ",
    "courseId": "PLA3ZYReIVnJfTZSFmCbhTRzah1ypMEA3Q",
    "index": 8,
    "title": "7-Reverse_Engineering",
    "url": "https://www.youtube.com/watch?v=U1bOqH4l7KQ",
    "durationSec": 383,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "web",
      "applications",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-HJkYdkewlpI",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 1,
    "title": "Android Penetration Testing Process - Part 1",
    "url": "https://www.youtube.com/watch?v=HJkYdkewlpI",
    "durationSec": 497,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-JTZzfA9ZZfc",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 2,
    "title": "Android Penetration Testing Process - Part 2",
    "url": "https://www.youtube.com/watch?v=JTZzfA9ZZfc",
    "durationSec": 1227,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-kdHs1ZK-kdw",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 3,
    "title": "Android Security Architecture - Part 3",
    "url": "https://www.youtube.com/watch?v=kdHs1ZK-kdw",
    "durationSec": 1326,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-3V3ad-pFeAs",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 4,
    "title": "Application Security and Signing Process - Part 4",
    "url": "https://www.youtube.com/watch?v=3V3ad-pFeAs",
    "durationSec": 353,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-Pmu05nLPZGg",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 5,
    "title": "Windows JADX GUI - Part 5",
    "url": "https://www.youtube.com/watch?v=Pmu05nLPZGg",
    "durationSec": 110,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-MFwo81eSK9Y",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 6,
    "title": "Windows adb Install - Part 6",
    "url": "https://www.youtube.com/watch?v=MFwo81eSK9Y",
    "durationSec": 174,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-AOJUwuD0uJ0",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 7,
    "title": "Windows apktool install - Part 7",
    "url": "https://www.youtube.com/watch?v=AOJUwuD0uJ0",
    "durationSec": 250,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-xAPc1ryTyyM",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 8,
    "title": "Windows Android Studio Install - Part 8",
    "url": "https://www.youtube.com/watch?v=xAPc1ryTyyM",
    "durationSec": 116,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-567gyDt_9eU",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 9,
    "title": "Kali Linux adb Install - Part 9",
    "url": "https://www.youtube.com/watch?v=567gyDt_9eU",
    "durationSec": 21,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-6DI8eMJ7Cdc",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 10,
    "title": "Kali Linux apktool Install - Part 10",
    "url": "https://www.youtube.com/watch?v=6DI8eMJ7Cdc",
    "durationSec": 73,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-mxcNqKjNDfc",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 11,
    "title": "Kali Linux JADX GUI Install - Part 11",
    "url": "https://www.youtube.com/watch?v=mxcNqKjNDfc",
    "durationSec": 155,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-hohbLSWQaoI",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 12,
    "title": "Kali Linux Android Studio Install - Part 12",
    "url": "https://www.youtube.com/watch?v=hohbLSWQaoI",
    "durationSec": 264,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-tHaH1q04JVw",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 13,
    "title": "Mac Brew Installation and Guidance - Part 13",
    "url": "https://www.youtube.com/watch?v=tHaH1q04JVw",
    "durationSec": 77,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-P_hYt6TH_nw",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 14,
    "title": "Mac JADX GUI - Part 14",
    "url": "https://www.youtube.com/watch?v=P_hYt6TH_nw",
    "durationSec": 46,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-70cLDIZaGY4",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 15,
    "title": "Mac Apktool - Part 15",
    "url": "https://www.youtube.com/watch?v=70cLDIZaGY4",
    "durationSec": 48,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-sJvPyMmZ630",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 16,
    "title": "Mac Android Studio - Part 16",
    "url": "https://www.youtube.com/watch?v=sJvPyMmZ630",
    "durationSec": 364,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-KQ7YlgxpzrQ",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 17,
    "title": "Emulator Setup & Recommendations (All Platforms) - Part 17",
    "url": "https://www.youtube.com/watch?v=KQ7YlgxpzrQ",
    "durationSec": 639,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-Fe-MtoWBNWY",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 18,
    "title": "Additional Emulator Options Android (Optional) - Part 18",
    "url": "https://www.youtube.com/watch?v=Fe-MtoWBNWY",
    "durationSec": 154,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-GtzHuXtf9Rg",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 19,
    "title": "Physical Android Device Setup (Optional) - Part - 19",
    "url": "https://www.youtube.com/watch?v=GtzHuXtf9Rg",
    "durationSec": 291,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-bJDcEpb5XGQ",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 20,
    "title": "Pulling an APK From the Google Play Store - Part 20",
    "url": "https://www.youtube.com/watch?v=bJDcEpb5XGQ",
    "durationSec": 337,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-TE9ucy4P1Mg",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 21,
    "title": "Introduction to Injured Android APK for Penetration Testing - 21",
    "url": "https://www.youtube.com/watch?v=TE9ucy4P1Mg",
    "durationSec": 195,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-iR51r1Oqjz0",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 22,
    "title": "Introduction to Android Manifest.xml file - Part 22",
    "url": "https://www.youtube.com/watch?v=iR51r1Oqjz0",
    "durationSec": 567,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-HlPLNBao4zg",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 23,
    "title": "Manual Static Analysis of APK Penetration Testing - Part 23",
    "url": "https://www.youtube.com/watch?v=HlPLNBao4zg",
    "durationSec": 591,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-mqYYyYcCPoM",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 24,
    "title": "How to Find Hardcoded Strings (Android Penetration Testing) - Part - 24",
    "url": "https://www.youtube.com/watch?v=mqYYyYcCPoM",
    "durationSec": 714,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-loal5yRXebQ",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 25,
    "title": "Injured Android Static Analysis (CTF Flags 1-4) Android Penetration Testing) - Part - 25",
    "url": "https://www.youtube.com/watch?v=loal5yRXebQ",
    "durationSec": 720,
    "topicTags": [
      "ctf",
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "ctf",
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-qhjZXnmEH2M",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 26,
    "title": "Enumerating AWS Storage Buckets via Static Analysis (Android Penetration Testing) - Part - 26",
    "url": "https://www.youtube.com/watch?v=qhjZXnmEH2M",
    "durationSec": 546,
    "topicTags": [
      "cloud",
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "cloud",
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-py45gKkVahw",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 27,
    "title": "Enumerating Firebase Databases via Static Analysis (Android Penetration Testing) - Part - 27",
    "url": "https://www.youtube.com/watch?v=py45gKkVahw",
    "durationSec": 446,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-Rb4M6ep9ols",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 28,
    "title": "Introduction to SSL Pinning Dynamic Analysis (Android Penetration Testing) - Part - 28",
    "url": "https://www.youtube.com/watch?v=Rb4M6ep9ols",
    "durationSec": 554,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-J3LZZcm73RQ",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 29,
    "title": "Burp Suite Install and Overview Penetration Testing - Part 29",
    "url": "https://www.youtube.com/watch?v=J3LZZcm73RQ",
    "durationSec": 460,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-u5lbT1bM12o",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 30,
    "title": "Burp Suite Setup Intercept APK Traffic (Android Penetration Testing) - Part - 30",
    "url": "https://www.youtube.com/watch?v=u5lbT1bM12o",
    "durationSec": 489,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-7-MlL0iGxag",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 31,
    "title": "Proxyman Install & Usage (Full Android Penetration Testing) - Part - 31",
    "url": "https://www.youtube.com/watch?v=7-MlL0iGxag",
    "durationSec": 762,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-Hu8m_XseXm4",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 32,
    "title": "Patching Applications Automatically using Objection (Android Penetration Testing) - Part 32",
    "url": "https://www.youtube.com/watch?v=Hu8m_XseXm4",
    "durationSec": 468,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-Uon3Qlt76v0",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 33,
    "title": "Patching Applications Manually (Android Penetration Testing) - 33",
    "url": "https://www.youtube.com/watch?v=Uon3Qlt76v0",
    "durationSec": 966,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-09vFb8jp6vk",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 34,
    "title": "Dynamic Analysis Final Notes and Vectors (Android Penetration Testing) Part - 34",
    "url": "https://www.youtube.com/watch?v=09vFb8jp6vk",
    "durationSec": 371,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-fHgUYT2h8pY",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 35,
    "title": "Live Android Penetration Testing on APK: Joann Fabrics #bughunt Part - 35",
    "url": "https://www.youtube.com/watch?v=fHgUYT2h8pY",
    "durationSec": 2042,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t-oYEcNOKj_C0",
    "courseId": "PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t",
    "index": 36,
    "title": "Live Android Penetration Testing on APK: Sam's Club App #bughunt Part - 36",
    "url": "https://www.youtube.com/watch?v=oYEcNOKj_C0",
    "durationSec": 1198,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "full",
      "android",
      "penetration",
      "testing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-qlK174d_uu8",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 1,
    "title": "Zero to Hero Pentesting: Episode 1 - Course Introduction, Notekeeping, Introductory Linux, and AMA",
    "url": "https://www.youtube.com/watch?v=qlK174d_uu8",
    "durationSec": 14928,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-egg-GoT5iVk",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 2,
    "title": "Zero to Hero Pentesting: Episode 2 - Python 101",
    "url": "https://www.youtube.com/watch?v=egg-GoT5iVk",
    "durationSec": 10158,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-3GriwyvJzio",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 3,
    "title": "Zero to Hero Pentesting: Episode 3 - Python 102, Building a Terrible Port Scanner, and a Giveaway",
    "url": "https://www.youtube.com/watch?v=3GriwyvJzio",
    "durationSec": 9247,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-ChdUC32lsYQ",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 4,
    "title": "Zero to Hero Pentesting: Episode 4 - Five Phases of Hacking + Passive OSINT",
    "url": "https://www.youtube.com/watch?v=ChdUC32lsYQ",
    "durationSec": 11050,
    "topicTags": [
      "network",
      "osint",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "osint",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-t9aAhuG0LkE",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 5,
    "title": "Zero to Hero Pentesting: Episode 5 - Scanning Tools (Nmap, Nessus, BurpSuite, etc.) & Tactics",
    "url": "https://www.youtube.com/watch?v=t9aAhuG0LkE",
    "durationSec": 11263,
    "topicTags": [
      "web",
      "network",
      "foundations",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "web",
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-BWE51iudbPo",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 6,
    "title": "Zero to Hero Pentesting: Episode 6 - Enumeration (Kioptrix & Hack The Box)",
    "url": "https://www.youtube.com/watch?v=BWE51iudbPo",
    "durationSec": 10114,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-gGNjDwnXgsg",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 7,
    "title": "Zero to Hero Pentesting: Episode 7 - Exploitation, Shells, and Some Credential Stuffing",
    "url": "https://www.youtube.com/watch?v=gGNjDwnXgsg",
    "durationSec": 10070,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-_OseTyfXr3Q",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 8,
    "title": "Zero to Hero: Week 8 - Building an AD Lab, LLMNR Poisoning, and NTLMv2 Cracking with Hashcat",
    "url": "https://www.youtube.com/watch?v=_OseTyfXr3Q",
    "durationSec": 8205,
    "topicTags": [
      "network",
      "ad",
      "crypto",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "ad",
      "crypto",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-QvMeLoyS944",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 9,
    "title": "Zero to Hero: Week 9 - NTLM Relay, Token Impersonation, Pass the Hash, PsExec, and more",
    "url": "https://www.youtube.com/watch?v=QvMeLoyS944",
    "durationSec": 7697,
    "topicTags": [
      "network",
      "ad",
      "crypto",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "ad",
      "crypto",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-6rZddmB0fug",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 10,
    "title": "Zero to Hero: Episode 10 - MS17-010/EternalBlue, GPP/cPasswords, and Kerberoasting",
    "url": "https://www.youtube.com/watch?v=6rZddmB0fug",
    "durationSec": 5575,
    "topicTags": [
      "network",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj-MxjIDoGsGCQ",
    "courseId": "PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj",
    "index": 11,
    "title": "Zero to Hero: Week 11 - File Transfers, Pivoting, and Reporting Writing",
    "url": "https://www.youtube.com/watch?v=MxjIDoGsGCQ",
    "durationSec": 5147,
    "topicTags": [
      "network",
      "social",
      "foundations",
      "web",
      "zero",
      "hero",
      "practical"
    ],
    "trackIds": [
      "network",
      "social",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-OpYXo_wrLXk",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 1,
    "title": "مقدمة دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=OpYXo_wrLXk",
    "durationSec": 791,
    "topicTags": [
      "foundations",
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-37jNDg4WZ4g",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 2,
    "title": "كيف يعمل نظام تشغيل ويندوز |  دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=37jNDg4WZ4g",
    "durationSec": 2157,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-Jm47MZzxNRs",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 3,
    "title": "أساسيات التعامل مع أوامر CMD | دورةWindows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=Jm47MZzxNRs",
    "durationSec": 5111,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-6GPZthxEKU0",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 4,
    "title": "أساسيات التعامل مع أوامر Powershell | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=6GPZthxEKU0",
    "durationSec": 5038,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-98HX_jtsutk",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 5,
    "title": "التعامل مع الـ Processes في ويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=98HX_jtsutk",
    "durationSec": 2667,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-ZZRk_OG7WvM",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 6,
    "title": "التعامل مع الـ Services في ويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=ZZRk_OG7WvM",
    "durationSec": 4081,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-k6fDr2wqM9k",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 7,
    "title": "التعامل مع الـ Scheduled Tasks في ويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=k6fDr2wqM9k",
    "durationSec": 1931,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-D_GV0MqgiKs",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 8,
    "title": "أهم الـ System Utilities في نظام تشغيل ويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=D_GV0MqgiKs",
    "durationSec": 1744,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-8A-mhUlxLsQ",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 9,
    "title": "التعامل مع الـ Registry في الويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=8A-mhUlxLsQ",
    "durationSec": 2675,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-FnNtAIp_sXI",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 10,
    "title": "التعامل مع الـ Sharing في الويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=FnNtAIp_sXI",
    "durationSec": 1924,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-Dcok0hpaB9c",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 11,
    "title": "التعامل مع الـ Logging في الويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=Dcok0hpaB9c",
    "durationSec": 3489,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv-Ud0j6wL1rRY",
    "courseId": "PLroS9tRyoUGrC8GOzQRhyYOfwnub2bvQv",
    "index": 12,
    "title": "التعامل مع الـ WSL في الويندوز | دورة Windows for Cybersecurity Professionals",
    "url": "https://www.youtube.com/watch?v=Ud0j6wL1rRY",
    "durationSec": 986,
    "topicTags": [
      "ctf",
      "windows",
      "for",
      "cybersecurity",
      "professionals"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-sIPOIeeSmxw",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 1,
    "title": "Security Lecture 1  Introduction",
    "url": "https://www.youtube.com/watch?v=sIPOIeeSmxw",
    "durationSec": 4812,
    "topicTags": [
      "foundations",
      "ctf",
      "security",
      "lecture",
      "introduction"
    ],
    "trackIds": [
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-DongSm0NXGc",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 2,
    "title": "Security Lecture 2 Part 1 Definitions and Terms",
    "url": "https://www.youtube.com/watch?v=DongSm0NXGc",
    "durationSec": 3009,
    "topicTags": [
      "ctf",
      "security",
      "lecture",
      "definitions"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-gF4hBrp80dI",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 3,
    "title": "Security Lecture 2 Part 2  Classical Ciphers",
    "url": "https://www.youtube.com/watch?v=gF4hBrp80dI",
    "durationSec": 5256,
    "topicTags": [
      "ctf",
      "security",
      "lecture",
      "classical"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-rALbHDgKEBE",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 4,
    "title": "Modern Block Ciphers:  Block Cipher Operation",
    "url": "https://www.youtube.com/watch?v=rALbHDgKEBE",
    "durationSec": 859,
    "topicTags": [
      "ctf",
      "security",
      "modern",
      "block",
      "ciphers"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-X6aTyc1pG8I",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 5,
    "title": "Modern Block Ciphers:  Concepts, Diffusion and Confusion",
    "url": "https://www.youtube.com/watch?v=X6aTyc1pG8I",
    "durationSec": 2717,
    "topicTags": [
      "ctf",
      "security",
      "modern",
      "block",
      "ciphers"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-Q7fgsbO0Pmg",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 6,
    "title": "Modern Block Ciphers: DES",
    "url": "https://www.youtube.com/watch?v=Q7fgsbO0Pmg",
    "durationSec": 3691,
    "topicTags": [
      "ctf",
      "security",
      "modern",
      "block",
      "ciphers"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-RugWgBLbK9o",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 7,
    "title": "Number Theory P1",
    "url": "https://www.youtube.com/watch?v=RugWgBLbK9o",
    "durationSec": 1208,
    "topicTags": [
      "ctf",
      "security",
      "number",
      "theory"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-5AnduNqEV2M",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 8,
    "title": "Number Theory P2",
    "url": "https://www.youtube.com/watch?v=5AnduNqEV2M",
    "durationSec": 1655,
    "topicTags": [
      "ctf",
      "security",
      "number",
      "theory"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-21u_6aek4fg",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 9,
    "title": "Number Theory P3",
    "url": "https://www.youtube.com/watch?v=21u_6aek4fg",
    "durationSec": 2220,
    "topicTags": [
      "ctf",
      "security",
      "number",
      "theory"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-baJp5VLjLMk",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 10,
    "title": "Number Theory P4",
    "url": "https://www.youtube.com/watch?v=baJp5VLjLMk",
    "durationSec": 316,
    "topicTags": [
      "ctf",
      "security",
      "number",
      "theory"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-8lNaf7IprS8",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 11,
    "title": "Number Theory P5",
    "url": "https://www.youtube.com/watch?v=8lNaf7IprS8",
    "durationSec": 4252,
    "topicTags": [
      "ctf",
      "security",
      "number",
      "theory"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-KINXoG_FAik",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 12,
    "title": "AES",
    "url": "https://www.youtube.com/watch?v=KINXoG_FAik",
    "durationSec": 3332,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "aes"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-TtReVW_Q2Zo",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 13,
    "title": "Block Cipher Operation",
    "url": "https://www.youtube.com/watch?v=TtReVW_Q2Zo",
    "durationSec": 3556,
    "topicTags": [
      "ctf",
      "security",
      "block",
      "cipher",
      "operation"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-wcc6ue2WULI",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 14,
    "title": "Security: Random Numbers and Stream Ciphers",
    "url": "https://www.youtube.com/watch?v=wcc6ue2WULI",
    "durationSec": 3032,
    "topicTags": [
      "ctf",
      "security",
      "random",
      "numbers"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-SNtyt-C2Auw",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 15,
    "title": "Cryptography: More Number Theory",
    "url": "https://www.youtube.com/watch?v=SNtyt-C2Auw",
    "durationSec": 4489,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "cryptography",
      "more",
      "number"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-LLRem_TWNKo",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 16,
    "title": "RSA",
    "url": "https://www.youtube.com/watch?v=LLRem_TWNKo",
    "durationSec": 4307,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "rsa"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-lPl8RXfSrCQ",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 17,
    "title": "Hashing Algorithm",
    "url": "https://www.youtube.com/watch?v=lPl8RXfSrCQ",
    "durationSec": 3782,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "hashing",
      "algorithm"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-b0hncc2LosM",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 18,
    "title": "Security: Key Management and Distribution",
    "url": "https://www.youtube.com/watch?v=b0hncc2LosM",
    "durationSec": 4348,
    "topicTags": [
      "ctf",
      "security",
      "key",
      "management"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-e-XxOoW66Ls",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 19,
    "title": "Simple Network Security Part 1/4 (in Arabic)",
    "url": "https://www.youtube.com/watch?v=e-XxOoW66Ls",
    "durationSec": 852,
    "topicTags": [
      "network",
      "ctf",
      "security",
      "simple"
    ],
    "trackIds": [
      "network",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-Z4f5_XjJP0w",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 20,
    "title": "Simple Network Security Part 2/4 (in Arabic), The language of Cryptography",
    "url": "https://www.youtube.com/watch?v=Z4f5_XjJP0w",
    "durationSec": 1062,
    "topicTags": [
      "network",
      "crypto",
      "ctf",
      "security",
      "simple"
    ],
    "trackIds": [
      "network",
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-kvhdNxk5rOs",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 21,
    "title": "Simple Network Security Part 3/4 (in Arabic), The SSL",
    "url": "https://www.youtube.com/watch?v=kvhdNxk5rOs",
    "durationSec": 1293,
    "topicTags": [
      "network",
      "ctf",
      "security",
      "simple"
    ],
    "trackIds": [
      "network",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-Ds_Y-93o8qk",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 22,
    "title": "Simple Network Security Part 4/4 (in Arabic), The Onion Routing (TOR)",
    "url": "https://www.youtube.com/watch?v=Ds_Y-93o8qk",
    "durationSec": 2631,
    "topicTags": [
      "network",
      "ctf",
      "security",
      "simple"
    ],
    "trackIds": [
      "network",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-H9smdichcXI",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 23,
    "title": "Introduction to Cryptography Part (1)",
    "url": "https://www.youtube.com/watch?v=H9smdichcXI",
    "durationSec": 4252,
    "topicTags": [
      "crypto",
      "foundations",
      "ctf",
      "security",
      "introduction",
      "cryptography"
    ],
    "trackIds": [
      "crypto",
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-JbGE83KkaPE",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 24,
    "title": "Introduction to Cryptography Part (2)",
    "url": "https://www.youtube.com/watch?v=JbGE83KkaPE",
    "durationSec": 2032,
    "topicTags": [
      "crypto",
      "foundations",
      "ctf",
      "security",
      "introduction",
      "cryptography"
    ],
    "trackIds": [
      "crypto",
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-kFF6kD2P98k",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 25,
    "title": "Introduction to Cryptography, Part 3: Product Ciphers",
    "url": "https://www.youtube.com/watch?v=kFF6kD2P98k",
    "durationSec": 1710,
    "topicTags": [
      "crypto",
      "foundations",
      "ctf",
      "security",
      "introduction",
      "cryptography",
      "product"
    ],
    "trackIds": [
      "crypto",
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-qyQ-N1ktCXs",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 26,
    "title": "Introduction to Cryptography Part 4, Block Ciphers and the DES",
    "url": "https://www.youtube.com/watch?v=qyQ-N1ktCXs",
    "durationSec": 3463,
    "topicTags": [
      "crypto",
      "foundations",
      "ctf",
      "security",
      "introduction",
      "cryptography",
      "block"
    ],
    "trackIds": [
      "crypto",
      "foundations",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-Usr67XnWIOA",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 27,
    "title": "Security: Advanced Encryption Standard",
    "url": "https://www.youtube.com/watch?v=Usr67XnWIOA",
    "durationSec": 3841,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "advanced",
      "encryption"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-b36vd4QP6YM",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 28,
    "title": "Security: Block Cipher Operation",
    "url": "https://www.youtube.com/watch?v=b36vd4QP6YM",
    "durationSec": 2226,
    "topicTags": [
      "ctf",
      "security",
      "block",
      "cipher"
    ],
    "trackIds": [
      "ctf"
    ]
  },
  {
    "id": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV-Te2lG2XRMbI",
    "courseId": "PLy_2fgXkPiZt3oJcHalAWy9uhQ3wd2fTV",
    "index": 29,
    "title": "RSA Algorithm",
    "url": "https://www.youtube.com/watch?v=Te2lG2XRMbI",
    "durationSec": 4323,
    "topicTags": [
      "crypto",
      "ctf",
      "security",
      "rsa",
      "algorithm"
    ],
    "trackIds": [
      "crypto",
      "ctf"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-cnL7CB-Gak0",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 1,
    "title": "Bug Bounty Hunting for Client-Side Injection Vulnerabilities | Part I",
    "url": "https://www.youtube.com/watch?v=cnL7CB-Gak0",
    "durationSec": 17402,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-jTdqM2aO4Ys",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 2,
    "title": "[Part II] Bug Bounty Hunting for IDORs and Access Control Violations",
    "url": "https://www.youtube.com/watch?v=jTdqM2aO4Ys",
    "durationSec": 8263,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-BfbS8uRjeAg",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 3,
    "title": "[Part I] Bug Bounty Hunting for IDORs and Access Control Violations",
    "url": "https://www.youtube.com/watch?v=BfbS8uRjeAg",
    "durationSec": 5598,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-EeBSqo7N2Bs",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 4,
    "title": "[Part III] Bug Bounty Hunting for IDORs & Access Controls",
    "url": "https://www.youtube.com/watch?v=EeBSqo7N2Bs",
    "durationSec": 14917,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-gZUxroaY6rY",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 5,
    "title": "Bug Bounty Hunting | Weaponizing Cross-Site Scripting (XSS) to Show Impact -- * PREVIEW of Part II *",
    "url": "https://www.youtube.com/watch?v=gZUxroaY6rY",
    "durationSec": 765,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-4wAFYEGEvbo",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 6,
    "title": "Bug Bounty | Scan ALL HackerOne & BugCrowd Public Programs for Cross-Site Scripting (XSS) Targets",
    "url": "https://www.youtube.com/watch?v=4wAFYEGEvbo",
    "durationSec": 2477,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-2IZYwRQ43zw",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 7,
    "title": "Bug Bounty Hunting | Methodology to Bypass Security Controls & Exploit XSS on Real World Targets",
    "url": "https://www.youtube.com/watch?v=2IZYwRQ43zw",
    "durationSec": 4645,
    "topicTags": [
      "web",
      "social",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "social",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1--sLYakVUIuk",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 8,
    "title": "Bug Bounty Hunting For Client-Side Injections Part II - Reflected & Stored Cross-Site Scripting XSS",
    "url": "https://www.youtube.com/watch?v=-sLYakVUIuk",
    "durationSec": 26589,
    "topicTags": [
      "web",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-eWa90bduYsw",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 9,
    "title": "What can we learn from these three simple bug bounty reports?",
    "url": "https://www.youtube.com/watch?v=eWa90bduYsw",
    "durationSec": 930,
    "topicTags": [
      "web",
      "social",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "social",
      "network"
    ]
  },
  {
    "id": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1-QEyOJ86dpz0",
    "courseId": "PLwfoGUoc87Ct-EUzW1mUa8Tlv1cktoCx1",
    "index": 10,
    "title": "Three Common OAuth Misconfigurations That Lead to Account Takeover (Bug Bounty Reports)",
    "url": "https://www.youtube.com/watch?v=QEyOJ86dpz0",
    "durationSec": 1621,
    "topicTags": [
      "web",
      "social",
      "network",
      "bug",
      "bounty",
      "hunting",
      "for..."
    ],
    "trackIds": [
      "web",
      "social",
      "network"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-zmwj4JJ-f-k",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 1,
    "title": "MOBISEC 2020 - 01-02-03 - Welcome + Intro to Smartphones and App Development",
    "url": "https://www.youtube.com/watch?v=zmwj4JJ-f-k",
    "durationSec": 9983,
    "topicTags": [
      "foundations",
      "web",
      "mobisec",
      "2020",
      "welcome"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-x8I5jwN6XFk",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 2,
    "title": "MOBISEC 2020 - 04 - Intro to Android Architecture and Security",
    "url": "https://www.youtube.com/watch?v=x8I5jwN6XFk",
    "durationSec": 4990,
    "topicTags": [
      "mobile",
      "foundations",
      "web",
      "mobisec",
      "2020",
      "intro"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-F1bDH3GSuBQ",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 3,
    "title": "MOBISEC 2020 - 05 - Real-World Android Apps",
    "url": "https://www.youtube.com/watch?v=F1bDH3GSuBQ",
    "durationSec": 2821,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "real"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-jVqJ5O92nr8",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 4,
    "title": "MOBISEC 2020 - 06 - More on Key Android Aspects",
    "url": "https://www.youtube.com/watch?v=jVqJ5O92nr8",
    "durationSec": 2456,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "more"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-Rhvpm8UP2Vc",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 5,
    "title": "MOBISEC 2020 - 07 - Messing with Android Apps",
    "url": "https://www.youtube.com/watch?v=Rhvpm8UP2Vc",
    "durationSec": 5322,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "messing"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-d7OgZ2TReOM",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 6,
    "title": "MOBISEC 2020 - DEMO - Apps, APKs, and Dalvik",
    "url": "https://www.youtube.com/watch?v=d7OgZ2TReOM",
    "durationSec": 3726,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "demo"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-pOFUjcvzA0w",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 7,
    "title": "MOBISEC 2020 - 08 - Reverse Engineering",
    "url": "https://www.youtube.com/watch?v=pOFUjcvzA0w",
    "durationSec": 4123,
    "topicTags": [
      "malware",
      "web",
      "mobisec",
      "2020",
      "reverse"
    ],
    "trackIds": [
      "malware",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-YVcDVY-5aYc",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 8,
    "title": "MOBISEC 2020 - 09 - Frida Overview",
    "url": "https://www.youtube.com/watch?v=YVcDVY-5aYc",
    "durationSec": 1330,
    "topicTags": [
      "malware",
      "mobile",
      "web",
      "mobisec",
      "2020",
      "frida"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-0zYWr68ebjs",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 9,
    "title": "MOBISEC 2020 - 10 - Native Code",
    "url": "https://www.youtube.com/watch?v=0zYWr68ebjs",
    "durationSec": 2164,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "native"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-s9RDrbf_R0Q",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 10,
    "title": "MOBISEC 2020 - DEMO - Emulator CLI and Adb",
    "url": "https://www.youtube.com/watch?v=s9RDrbf_R0Q",
    "durationSec": 2544,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "demo"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-DPYYm7SiMdw",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 11,
    "title": "MOBISEC 2020 - DEMO - Debugging and Reverse Engineering",
    "url": "https://www.youtube.com/watch?v=DPYYm7SiMdw",
    "durationSec": 5458,
    "topicTags": [
      "malware",
      "web",
      "mobisec",
      "2020",
      "demo"
    ],
    "trackIds": [
      "malware",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-d_J7-i-eVuQ",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 12,
    "title": "MOBISEC 2020 - 11 - Advanced Topics on Android System and Security",
    "url": "https://www.youtube.com/watch?v=d_J7-i-eVuQ",
    "durationSec": 9076,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "advanced"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-iZQ3LXt-FQo",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 13,
    "title": "MOBISEC 2020 - 12 - Advanced Topics on Android System and Security (Part 2)",
    "url": "https://www.youtube.com/watch?v=iZQ3LXt-FQo",
    "durationSec": 8120,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "advanced"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-jlo3jQyghss",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 14,
    "title": "MOBISEC 2020 - 13 - Advanced Topics on Android System and Security (Part 3)",
    "url": "https://www.youtube.com/watch?v=jlo3jQyghss",
    "durationSec": 7020,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "advanced"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-Xcazmkshzw4",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 15,
    "title": "MOBISEC 2020 - 14 - Overview on Mobile Ecosystem and Security",
    "url": "https://www.youtube.com/watch?v=Xcazmkshzw4",
    "durationSec": 2760,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "overview"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-nQ8IBx6HwsI",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 16,
    "title": "MOBISEC 2020 - 15 - Mobile Malware",
    "url": "https://www.youtube.com/watch?v=nQ8IBx6HwsI",
    "durationSec": 6511,
    "topicTags": [
      "malware",
      "mobile",
      "web",
      "mobisec",
      "2020"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-K2JX_dUHjGw",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 17,
    "title": "MOBISEC 2020 - 16 - Vulnerability Analysis and Exploitation",
    "url": "https://www.youtube.com/watch?v=K2JX_dUHjGw",
    "durationSec": 10195,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "vulnerability"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK--b9tVysdhfc",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 18,
    "title": "MOBISEC 2020 - 17 - Vulnerability Discovery and Prevention",
    "url": "https://www.youtube.com/watch?v=-b9tVysdhfc",
    "durationSec": 4971,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "vulnerability"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-b4t6LMgntuU",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 19,
    "title": "MOBISEC 2020 - 18 - Mobile UI Security",
    "url": "https://www.youtube.com/watch?v=b4t6LMgntuU",
    "durationSec": 4000,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-GBHAuWGpy2A",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 20,
    "title": "MOBISEC 2020 - 19 - Automated Program Analysis",
    "url": "https://www.youtube.com/watch?v=GBHAuWGpy2A",
    "durationSec": 5686,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "automated"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-IZRhsI0QdbU",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 21,
    "title": "MOBISEC 2020 - 20 - iOS Security",
    "url": "https://www.youtube.com/watch?v=IZRhsI0QdbU",
    "durationSec": 3879,
    "topicTags": [
      "mobile",
      "web",
      "mobisec",
      "2020",
      "ios"
    ],
    "trackIds": [
      "mobile",
      "web"
    ]
  },
  {
    "id": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK-elB0QhVfXzM",
    "courseId": "PLsB1gqjeUAh8GUzHv_jYmUxuix_n7bfrK",
    "index": 22,
    "title": "MOBISEC 2020 - 21 - Big Recap, The Future, and The Meaning of Life",
    "url": "https://www.youtube.com/watch?v=elB0QhVfXzM",
    "durationSec": 2548,
    "topicTags": [
      "web",
      "mobisec",
      "2020",
      "big"
    ],
    "trackIds": [
      "web"
    ]
  },
  {
    "id": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL-acLJgyHyN3I",
    "courseId": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "index": 1,
    "title": "Session 1: DFIR & Threat Hunting - Initial Access - Malicious PowerShell and VBS Execution",
    "url": "https://www.youtube.com/watch?v=acLJgyHyN3I",
    "durationSec": 4034,
    "topicTags": [
      "dfir",
      "ad",
      "the",
      "art",
      "threat"
    ],
    "trackIds": [
      "dfir",
      "ad"
    ]
  },
  {
    "id": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL-EA2kod-okIg",
    "courseId": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "index": 2,
    "title": "Session 2: DFIR & Threat Hunting - Investigating Lateral Movement - OverPass-The-Hash",
    "url": "https://www.youtube.com/watch?v=EA2kod-okIg",
    "durationSec": 5392,
    "topicTags": [
      "dfir",
      "crypto",
      "ad",
      "the",
      "art",
      "threat"
    ],
    "trackIds": [
      "dfir",
      "crypto",
      "ad"
    ]
  },
  {
    "id": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL-PTepERrlwn0",
    "courseId": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "index": 3,
    "title": "Session 3:  DFIR & Threat Hunting - Investigating Lateral Movement - PSExec",
    "url": "https://www.youtube.com/watch?v=PTepERrlwn0",
    "durationSec": 3712,
    "topicTags": [
      "dfir",
      "ad",
      "the",
      "art",
      "threat"
    ],
    "trackIds": [
      "dfir",
      "ad"
    ]
  },
  {
    "id": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL-FCtWh31HWSE",
    "courseId": "PLGJmR5eX86b2XaFa6rDb6Cc8cIgsmzqEL",
    "index": 4,
    "title": "Session 4:  DFIR & Threat Hunting - Defense Evasion - Mshta HTML Application (HTA) Execution",
    "url": "https://www.youtube.com/watch?v=FCtWh31HWSE",
    "durationSec": 3469,
    "topicTags": [
      "dfir",
      "ad",
      "the",
      "art",
      "threat"
    ],
    "trackIds": [
      "dfir",
      "ad"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-V30CtIXouhY",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 1,
    "title": "01- Intro to Web App Pen Testing",
    "url": "https://www.youtube.com/watch?v=V30CtIXouhY",
    "durationSec": 582,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "intro"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-Vr8nSmDz5B4",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 2,
    "title": "02- Vulnerabilities - Cross Site Scripting (XSS) Part 1",
    "url": "https://www.youtube.com/watch?v=Vr8nSmDz5B4",
    "durationSec": 1890,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-hWQ4LuwVAsg",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 3,
    "title": "02- Vulnerabilities - Cross Site Scripting (XSS) Part 2",
    "url": "https://www.youtube.com/watch?v=hWQ4LuwVAsg",
    "durationSec": 1861,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-Mvl-0CBcj4I",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 4,
    "title": "03- Vulnerabilities - Cross Site Request Forgery (CSRF)",
    "url": "https://www.youtube.com/watch?v=Mvl-0CBcj4I",
    "durationSec": 1061,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-LLMFEf90p5A",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 5,
    "title": "04- Vulnerabilities - Local File Inclusion & Path Traversal",
    "url": "https://www.youtube.com/watch?v=LLMFEf90p5A",
    "durationSec": 831,
    "topicTags": [
      "web",
      "crypto",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "crypto",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-FrF-1VofaAc",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 6,
    "title": "05- Vulnerabilities - Insecure Direct Object Reference (IDOR)",
    "url": "https://www.youtube.com/watch?v=FrF-1VofaAc",
    "durationSec": 574,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-LHFzBv85EUc",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 7,
    "title": "06- Vulnerabilities - File Upload",
    "url": "https://www.youtube.com/watch?v=LHFzBv85EUc",
    "durationSec": 789,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-uemVoLzn6pY",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 8,
    "title": "07- Vulnerabilities - SQL Injection",
    "url": "https://www.youtube.com/watch?v=uemVoLzn6pY",
    "durationSec": 1840,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-4BbhCAy9wmM",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 9,
    "title": "08- Vulnerabilities - Insecure Deserialization",
    "url": "https://www.youtube.com/watch?v=4BbhCAy9wmM",
    "durationSec": 1013,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-Ns6XKX_gcqM",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 10,
    "title": "09- Vulnerabilities - XML External Entities (XXE)",
    "url": "https://www.youtube.com/watch?v=Ns6XKX_gcqM",
    "durationSec": 935,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-DkFmGfsPKYg",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 11,
    "title": "10- Vulnerabilities - Clickjacking",
    "url": "https://www.youtube.com/watch?v=DkFmGfsPKYg",
    "durationSec": 284,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-ojwEl4Rtw3Q",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 12,
    "title": "11- Vulnerabilities - JSON With Padding",
    "url": "https://www.youtube.com/watch?v=ojwEl4Rtw3Q",
    "durationSec": 432,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-qewY9EQFQ6E",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 13,
    "title": "12- Vulnerabilities - Account Takeover (ATO)",
    "url": "https://www.youtube.com/watch?v=qewY9EQFQ6E",
    "durationSec": 1415,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-52neBd8xaAA",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 14,
    "title": "13- Vulnerabilities - PostMessage",
    "url": "https://www.youtube.com/watch?v=52neBd8xaAA",
    "durationSec": 453,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-vhpvZGFh0nY",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 15,
    "title": "14- Vulnerabilities - Cross-origin resource sharing (CORS)",
    "url": "https://www.youtube.com/watch?v=vhpvZGFh0nY",
    "durationSec": 765,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-3wQfrJ42W_M",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 16,
    "title": "15- Vulnerabilities - Chain Bugs",
    "url": "https://www.youtube.com/watch?v=3wQfrJ42W_M",
    "durationSec": 440,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "vulnerabilities"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-mFNXJ9cLgBw",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 17,
    "title": "16- Write Pen-Testing Report",
    "url": "https://www.youtube.com/watch?v=mFNXJ9cLgBw",
    "durationSec": 958,
    "topicTags": [
      "web",
      "social",
      "foundations",
      "malware",
      "pen",
      "testing",
      "write"
    ],
    "trackIds": [
      "web",
      "social",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-PRotZzBEi6g",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 18,
    "title": "17- Skills You Need",
    "url": "https://www.youtube.com/watch?v=PRotZzBEi6g",
    "durationSec": 562,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "skills"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp-833C21oclb0",
    "courseId": "PLsB1gqjeUAh_yEuLgtZ0ppLlExcYOL2Kp",
    "index": 19,
    "title": "18- Be Good & Next Step",
    "url": "https://www.youtube.com/watch?v=833C21oclb0",
    "durationSec": 270,
    "topicTags": [
      "web",
      "foundations",
      "malware",
      "pen",
      "testing",
      "good"
    ],
    "trackIds": [
      "web",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-lk3rp53b2NA",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 1,
    "title": "Offensive Computer Security 2014 - Lecture 01",
    "url": "https://www.youtube.com/watch?v=lk3rp53b2NA",
    "durationSec": 3599,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-lbjS2mXyMEQ",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 2,
    "title": "Offensive Computer Security 2014 - Lecture 02",
    "url": "https://www.youtube.com/watch?v=lbjS2mXyMEQ",
    "durationSec": 4442,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-yXX6DWFTLaQ",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 3,
    "title": "Offensive Computer Security 2014 - Lecture 03",
    "url": "https://www.youtube.com/watch?v=yXX6DWFTLaQ",
    "durationSec": 3371,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-MnmX911MqMU",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 4,
    "title": "Offensive Computer Security 2014 - Lecture 04",
    "url": "https://www.youtube.com/watch?v=MnmX911MqMU",
    "durationSec": 3961,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-qlPhpvZCWAI",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 5,
    "title": "Offensive Computer Security 2014 - Lecture 05",
    "url": "https://www.youtube.com/watch?v=qlPhpvZCWAI",
    "durationSec": 4606,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-F4WC26_SpKA",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 6,
    "title": "Offensive Computer Security 2014 - Lecture 08",
    "url": "https://www.youtube.com/watch?v=F4WC26_SpKA",
    "durationSec": 2312,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-P7xUEUJFSA0",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 7,
    "title": "[FSU Cybersecurty Club] Fuzzing Presentation 2014",
    "url": "https://www.youtube.com/watch?v=P7xUEUJFSA0",
    "durationSec": 1804,
    "topicTags": [
      "malware",
      "social",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "social",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-kWmyGZsFc2c",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 8,
    "title": "Offensive Computer Security 2014 - Lecture 10 (Part 1 Advanced Fuzzing Topics)",
    "url": "https://www.youtube.com/watch?v=kWmyGZsFc2c",
    "durationSec": 2205,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-Opz9xIYthD4",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 9,
    "title": "Offensive Computer Security 2014 - Lecture 07",
    "url": "https://www.youtube.com/watch?v=Opz9xIYthD4",
    "durationSec": 3409,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-1UzOTsvPYYg",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 10,
    "title": "Offensive Computer Security 2014 - Lecture 10 (Part 1 Exploit Development 101)",
    "url": "https://www.youtube.com/watch?v=1UzOTsvPYYg",
    "durationSec": 2080,
    "topicTags": [
      "malware",
      "pwn",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-jF1tQk270b0",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 11,
    "title": "Offensive Computer Security 2014 - Lecture 11 (Exploit Development 102)",
    "url": "https://www.youtube.com/watch?v=jF1tQk270b0",
    "durationSec": 2933,
    "topicTags": [
      "malware",
      "pwn",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-lhAyUSM1hyA",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 12,
    "title": "Offensive Computer Security 2014 - Lecture 12 (Exploit Development 103)",
    "url": "https://www.youtube.com/watch?v=lhAyUSM1hyA",
    "durationSec": 4802,
    "topicTags": [
      "malware",
      "pwn",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-xG2VBysUaCY",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 13,
    "title": "Offensive Computer Security 2014 - Lecture 13 (Networking 101)",
    "url": "https://www.youtube.com/watch?v=xG2VBysUaCY",
    "durationSec": 4689,
    "topicTags": [
      "network",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "network",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-JK0BsefRdJ0",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 14,
    "title": "Offensive Computer Security 2014 - Lecture 14 (Networking 102)",
    "url": "https://www.youtube.com/watch?v=JK0BsefRdJ0",
    "durationSec": 5792,
    "topicTags": [
      "network",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "network",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-g8hxbWKqI9w",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 15,
    "title": "Offensive Computer Security 2014 - Lecture 15 (Web Application Hacking/Security 101)",
    "url": "https://www.youtube.com/watch?v=g8hxbWKqI9w",
    "durationSec": 2195,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-PpKjY00b0mY",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 16,
    "title": "Offensive Computer Security 2014 - Lecture 17 (Web Application Hacking/Security 103)",
    "url": "https://www.youtube.com/watch?v=PpKjY00b0mY",
    "durationSec": 3930,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-WE2q9jpz7oM",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 17,
    "title": "Offensive Computer Security 2014 - Lecture 16 (Web Application Hacking/Security 102)",
    "url": "https://www.youtube.com/watch?v=WE2q9jpz7oM",
    "durationSec": 4760,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-W_RP7F7MDkM",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 18,
    "title": "Offensive Computer Security 2014 - Lecture 18",
    "url": "https://www.youtube.com/watch?v=W_RP7F7MDkM",
    "durationSec": 4305,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-WbinXJxBJXI",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 19,
    "title": "Offensive Computer Security 2014 - MIDTERM#2 Review",
    "url": "https://www.youtube.com/watch?v=WbinXJxBJXI",
    "durationSec": 1418,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-QD_N7CJ1f2s",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 20,
    "title": "Offensive Computer Security 2014 - Lecture 19 (Exploit Development 105)",
    "url": "https://www.youtube.com/watch?v=QD_N7CJ1f2s",
    "durationSec": 2711,
    "topicTags": [
      "malware",
      "pwn",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-JH6iHY3jMAE",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 21,
    "title": "Offensive Computer Security 2014 - Lecture 22 (Metasploit)",
    "url": "https://www.youtube.com/watch?v=JH6iHY3jMAE",
    "durationSec": 4040,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-2OdI5KBKglg",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 22,
    "title": "Offensive Computer Security 2014 - Lecture 23 (Post Exploitation)",
    "url": "https://www.youtube.com/watch?v=2OdI5KBKglg",
    "durationSec": 4524,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-hsRscsh1PTM",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 23,
    "title": "Offensive Computer Security 2014 - Lecture 25 (Revisiting old topics)",
    "url": "https://www.youtube.com/watch?v=hsRscsh1PTM",
    "durationSec": 2191,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-KmMFuekpyhQ",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 24,
    "title": "Offensive Computer Security 2014 - Lecture 26 Social Engineering",
    "url": "https://www.youtube.com/watch?v=KmMFuekpyhQ",
    "durationSec": 2255,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-1xFxJuT0SQM",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 25,
    "title": "Offensive Computer Security 2014 - Lecture 20 Return Oriented Programming (Hands on)",
    "url": "https://www.youtube.com/watch?v=1xFxJuT0SQM",
    "durationSec": 6136,
    "topicTags": [
      "malware",
      "foundations",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-SpmIIiMSLnQ",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 26,
    "title": "Lecture 19: Web Exploitation 103",
    "url": "https://www.youtube.com/watch?v=SpmIIiMSLnQ",
    "durationSec": 3931,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-7YcIm1x4LGg",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 27,
    "title": "Lecture 18: Web Exploitation 102",
    "url": "https://www.youtube.com/watch?v=7YcIm1x4LGg",
    "durationSec": 10087,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-BMuLfAoRC3A",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 28,
    "title": "Lecture 26: Tying it All Together",
    "url": "https://www.youtube.com/watch?v=BMuLfAoRC3A",
    "durationSec": 3667,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-DMLai4nw50o",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 29,
    "title": "Lecture 15: Networking 101",
    "url": "https://www.youtube.com/watch?v=DMLai4nw50o",
    "durationSec": 5100,
    "topicTags": [
      "network",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "network",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-q1d9-HSPl08",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 30,
    "title": "OCS 2.0 Lecture 17 - Web Exploitation 101",
    "url": "https://www.youtube.com/watch?v=q1d9-HSPl08",
    "durationSec": 4606,
    "topicTags": [
      "web",
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "web",
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-gHOKBR5ydio",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 31,
    "title": "OCS 2.0 Lecture 14 - Exploitation 103",
    "url": "https://www.youtube.com/watch?v=gHOKBR5ydio",
    "durationSec": 5985,
    "topicTags": [
      "malware",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-jltie_iUhH4",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 32,
    "title": "Lecture 25: Digital Forensics Incident Response (DFIR) + Volatility",
    "url": "https://www.youtube.com/watch?v=jltie_iUhH4",
    "durationSec": 4883,
    "topicTags": [
      "malware",
      "dfir",
      "foundations",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "dfir",
      "foundations"
    ]
  },
  {
    "id": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq-CXRh3tPD9jo",
    "courseId": "PLPH3_iKGpl87SxBPtTZDQBLd-lvPEH_gq",
    "index": 33,
    "title": "Lecture 23: Exploit Development 107",
    "url": "https://www.youtube.com/watch?v=CXRh3tPD9jo",
    "durationSec": 2723,
    "topicTags": [
      "malware",
      "pwn",
      "dfir",
      "florida",
      "state",
      "university",
      "offensive"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "dfir"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-oXeO61l_RS4",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 1,
    "title": "مقدمة عن تحديات التقاط العلم 2 (HTB)",
    "url": "https://www.youtube.com/watch?v=oXeO61l_RS4",
    "durationSec": 1201,
    "topicTags": [
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "htb"
    ],
    "trackIds": [
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-n95uw3vsjFQ",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 2,
    "title": "مقدمة عن تحديات التقاط العلم 3 (Digital Forensics)",
    "url": "https://www.youtube.com/watch?v=n95uw3vsjFQ",
    "durationSec": 1755,
    "topicTags": [
      "dfir",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "digital",
      "forensics"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-rHA69GPSgec",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 3,
    "title": "مقدمة عن تحديات التقاط العلم 4 (steganography)",
    "url": "https://www.youtube.com/watch?v=rHA69GPSgec",
    "durationSec": 907,
    "topicTags": [
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "steganography"
    ],
    "trackIds": [
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-SMIbTjXUvGc",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 4,
    "title": "مقدمة عن تحديات التقاط العلم 5 (Memory forensics)",
    "url": "https://www.youtube.com/watch?v=SMIbTjXUvGc",
    "durationSec": 644,
    "topicTags": [
      "dfir",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "memory",
      "forensics"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-cCM56FZ6EaA",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 5,
    "title": "مقدمة عن تحديات التقاط العلم 6 (Packet analysis and Misc.)",
    "url": "https://www.youtube.com/watch?v=cCM56FZ6EaA",
    "durationSec": 838,
    "topicTags": [
      "network",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "packet",
      "analysis"
    ],
    "trackIds": [
      "network",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-HXqql0p6J14",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 6,
    "title": "مقدمة عن تحديات التقاط العلم 8 (Web CTFs part 2)",
    "url": "https://www.youtube.com/watch?v=HXqql0p6J14",
    "durationSec": 1990,
    "topicTags": [
      "web",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "ctfs"
    ],
    "trackIds": [
      "web",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-v7OtnBHbXnA",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 7,
    "title": "مقدمة عن تحديات التقاط العلم 7 (Web CTFs part 1)",
    "url": "https://www.youtube.com/watch?v=v7OtnBHbXnA",
    "durationSec": 1804,
    "topicTags": [
      "web",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "ctfs"
    ],
    "trackIds": [
      "web",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-9iNKpzHs0gI",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 8,
    "title": "مقدمة عن تحديات التقاط العلم 9 (Web CTFs part 3)",
    "url": "https://www.youtube.com/watch?v=9iNKpzHs0gI",
    "durationSec": 1815,
    "topicTags": [
      "web",
      "ctf",
      "foundations",
      "cloud",
      "intrduction",
      "ctfs"
    ],
    "trackIds": [
      "web",
      "ctf",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-NMsY298Qd2U",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 9,
    "title": "مقدمة عن تحديات التقاط العلم 10(Cryptography CTFs part 1)",
    "url": "https://www.youtube.com/watch?v=NMsY298Qd2U",
    "durationSec": 1846,
    "topicTags": [
      "ctf",
      "crypto",
      "foundations",
      "cloud",
      "intrduction",
      "cryptography",
      "ctfs"
    ],
    "trackIds": [
      "ctf",
      "crypto",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-Dr7DGOrwoSk",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 10,
    "title": "مقدمة عن تحديات التقاط العلم 11(Cryptography CTFs part 2)",
    "url": "https://www.youtube.com/watch?v=Dr7DGOrwoSk",
    "durationSec": 1945,
    "topicTags": [
      "ctf",
      "crypto",
      "foundations",
      "cloud",
      "intrduction",
      "cryptography",
      "ctfs"
    ],
    "trackIds": [
      "ctf",
      "crypto",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks-X4Osal7_Wj0",
    "courseId": "PL_wiobkctTm0vvi4pkwzjMgNvz-MYRxks",
    "index": 11,
    "title": "مقدمة عن تحديات التقاط العلم 12(Cryptography CTFs part 3)",
    "url": "https://www.youtube.com/watch?v=X4Osal7_Wj0",
    "durationSec": 1389,
    "topicTags": [
      "ctf",
      "crypto",
      "foundations",
      "cloud",
      "intrduction",
      "cryptography",
      "ctfs"
    ],
    "trackIds": [
      "ctf",
      "crypto",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-5veGnho2F2E",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 1,
    "title": "Introduction to CTFs - Arabic #0",
    "url": "https://www.youtube.com/watch?v=5veGnho2F2E",
    "durationSec": 579,
    "topicTags": [
      "ctf",
      "foundations",
      "osint",
      "introduction",
      "ctfs"
    ],
    "trackIds": [
      "ctf",
      "foundations",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-Kia0OuFBE-4",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 2,
    "title": "CTF Challenges (Forensics 101) - Arabic #1",
    "url": "https://www.youtube.com/watch?v=Kia0OuFBE-4",
    "durationSec": 331,
    "topicTags": [
      "dfir",
      "ctf",
      "osint",
      "challenges",
      "forensics"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-2w4EuHBl_Dc",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 3,
    "title": "CTF Challenges (Talking LS ) - Arabic #2",
    "url": "https://www.youtube.com/watch?v=2w4EuHBl_Dc",
    "durationSec": 319,
    "topicTags": [
      "ctf",
      "osint",
      "challenges",
      "talking"
    ],
    "trackIds": [
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-BlItqdwoOwQ",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 4,
    "title": "CTF Two Challenges ( Exif & WOW...So Meta ) - Arabic #3",
    "url": "https://www.youtube.com/watch?v=BlItqdwoOwQ",
    "durationSec": 504,
    "topicTags": [
      "ctf",
      "osint",
      "two",
      "challenges"
    ],
    "trackIds": [
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-eWdJlqUfI3s",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 5,
    "title": "CTF Challenges (POST Practice) - Arabic #4",
    "url": "https://www.youtube.com/watch?v=eWdJlqUfI3s",
    "durationSec": 337,
    "topicTags": [
      "ctf",
      "osint",
      "challenges",
      "post"
    ],
    "trackIds": [
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-XnEySjHDgs8",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 6,
    "title": "CTF Challenges (Wireshark For CTF) - Arabic #5",
    "url": "https://www.youtube.com/watch?v=XnEySjHDgs8",
    "durationSec": 572,
    "topicTags": [
      "network",
      "ctf",
      "osint",
      "challenges",
      "wireshark"
    ],
    "trackIds": [
      "network",
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-z7Rdac61aRs",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 7,
    "title": "CTF Challenges ( Wireshark Challenges ) - Arabic #6",
    "url": "https://www.youtube.com/watch?v=z7Rdac61aRs",
    "durationSec": 451,
    "topicTags": [
      "network",
      "ctf",
      "osint",
      "challenges",
      "wireshark"
    ],
    "trackIds": [
      "network",
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv-sknhpxHs-nQ",
    "courseId": "PLtJkL6CnLVXM-YZcyKrCWylperkismVHv",
    "index": 8,
    "title": "CTF Challenges ( Forensics Hex Signature Format ) - Arabic #7",
    "url": "https://www.youtube.com/watch?v=sknhpxHs-nQ",
    "durationSec": 447,
    "topicTags": [
      "dfir",
      "ctf",
      "osint",
      "challenges",
      "forensics"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "osint"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-n8Gx4dYJFG4",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 1,
    "title": "1. Introduction",
    "url": "https://www.youtube.com/watch?v=n8Gx4dYJFG4",
    "durationSec": 3371,
    "topicTags": [
      "web",
      "foundations",
      "mobile",
      "application",
      "security",
      "introduction"
    ],
    "trackIds": [
      "web",
      "foundations",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-e3oU9CaX1GE",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 2,
    "title": "2. Broken Authentication & Access Control",
    "url": "https://www.youtube.com/watch?v=e3oU9CaX1GE",
    "durationSec": 2644,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "broken"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-zSTNyuDeIZw",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 3,
    "title": "3. Insecure direct object references (IDOR) (Labs)",
    "url": "https://www.youtube.com/watch?v=zSTNyuDeIZw",
    "durationSec": 1444,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-eiHjgb1jWXQ",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 4,
    "title": "4. Cross-Site Request Forgery (CSRF) (Explain)",
    "url": "https://www.youtube.com/watch?v=eiHjgb1jWXQ",
    "durationSec": 1335,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "cross"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-NZMAqk6sZHE",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 5,
    "title": "5. Cross-Site Request Forgery (CSRF) (Labs)",
    "url": "https://www.youtube.com/watch?v=NZMAqk6sZHE",
    "durationSec": 1475,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "cross"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-afASRDvimwg",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 6,
    "title": "6. Two Factor Authentication Bypass",
    "url": "https://www.youtube.com/watch?v=afASRDvimwg",
    "durationSec": 1442,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "two"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-jYuAP-veF4Y",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 7,
    "title": "7. SQL injection (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=jYuAP-veF4Y",
    "durationSec": 3570,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "sql"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-67OhK-ByVLI",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 8,
    "title": "8. SQL injection scripting",
    "url": "https://www.youtube.com/watch?v=67OhK-ByVLI",
    "durationSec": 2122,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "sql"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-Qd7UuQyTLYw",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 9,
    "title": "9. Cross site scripting (XSS)",
    "url": "https://www.youtube.com/watch?v=Qd7UuQyTLYw",
    "durationSec": 1612,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "cross"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-3G08COkUuYw",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 10,
    "title": "10. Cross site scripting (XSS) Labs",
    "url": "https://www.youtube.com/watch?v=3G08COkUuYw",
    "durationSec": 5829,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "10."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-Th0QlXoDPhw",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 11,
    "title": "11. Server Side Template Injection (SSTI) (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=Th0QlXoDPhw",
    "durationSec": 1069,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "11."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-RJ6Oa4HWV08",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 12,
    "title": "12. Open redirect (Explain)",
    "url": "https://www.youtube.com/watch?v=RJ6Oa4HWV08",
    "durationSec": 714,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "12."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-vGpVziAW0q4",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 13,
    "title": "13. Open redirect (Labs)",
    "url": "https://www.youtube.com/watch?v=vGpVziAW0q4",
    "durationSec": 711,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "13."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-vHJvKoBOEJo",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 14,
    "title": "14. XML external entity (XXE) (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=vHJvKoBOEJo",
    "durationSec": 1910,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "14."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-1PLdUpHbcXE",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 15,
    "title": "15. OAuth Misconfiguration (Explain and Labs)",
    "url": "https://www.youtube.com/watch?v=1PLdUpHbcXE",
    "durationSec": 1384,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "15."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-WEm8YW2zCu0",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 16,
    "title": "16. Cross-origin resource sharing (CORS) (Explain)",
    "url": "https://www.youtube.com/watch?v=WEm8YW2zCu0",
    "durationSec": 989,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "16."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-9cmKGtMShms",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 17,
    "title": "17. Cross-origin resource sharing (CORS) (Labs)",
    "url": "https://www.youtube.com/watch?v=9cmKGtMShms",
    "durationSec": 1189,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "17."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-pA0KzQptPD4",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 18,
    "title": "18. Clickjacking",
    "url": "https://www.youtube.com/watch?v=pA0KzQptPD4",
    "durationSec": 850,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "18."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-VYGo-X3W9wc",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 19,
    "title": "19. CORS & Clickjacking (Labs)",
    "url": "https://www.youtube.com/watch?v=VYGo-X3W9wc",
    "durationSec": 1493,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "19."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-T0miPx_icoE",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 20,
    "title": "20. JSON with Padding (JSONP) (Explain)",
    "url": "https://www.youtube.com/watch?v=T0miPx_icoE",
    "durationSec": 488,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "20."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-ggbzbuFApBo",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 21,
    "title": "21. JSON with Padding (JSONP) (Labs)",
    "url": "https://www.youtube.com/watch?v=ggbzbuFApBo",
    "durationSec": 1248,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "21."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-LtoUqEpYUN4",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 22,
    "title": "23. LFI & Path Traversal",
    "url": "https://www.youtube.com/watch?v=LtoUqEpYUN4",
    "durationSec": 2248,
    "topicTags": [
      "web",
      "crypto",
      "mobile",
      "application",
      "security",
      "23."
    ],
    "trackIds": [
      "web",
      "crypto",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-ZUSD3ESt4uA",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 23,
    "title": "24. LFI & Path Traversal (More Labs)",
    "url": "https://www.youtube.com/watch?v=ZUSD3ESt4uA",
    "durationSec": 803,
    "topicTags": [
      "web",
      "crypto",
      "mobile",
      "application",
      "security",
      "24."
    ],
    "trackIds": [
      "web",
      "crypto",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-7SK4WrqtsNs",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 24,
    "title": "25. Host header attacks (Explain)",
    "url": "https://www.youtube.com/watch?v=7SK4WrqtsNs",
    "durationSec": 291,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "25."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-IMq5DwSNhiw",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 25,
    "title": "26. Host header attacks (Labs)",
    "url": "https://www.youtube.com/watch?v=IMq5DwSNhiw",
    "durationSec": 1084,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "26."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-R4OKxZ67oko",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 26,
    "title": "27. Logic Bugs (Labs)",
    "url": "https://www.youtube.com/watch?v=R4OKxZ67oko",
    "durationSec": 2424,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "27."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-5scBxIjDwd0",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 27,
    "title": "28. Unrestricted file upload (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=5scBxIjDwd0",
    "durationSec": 2025,
    "topicTags": [
      "web",
      "api",
      "mobile",
      "application",
      "security",
      "28."
    ],
    "trackIds": [
      "web",
      "api",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-KzOTMcT3scg",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 28,
    "title": "29. Insecure Deserialization (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=KzOTMcT3scg",
    "durationSec": 1374,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "29."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-H2A6iNGerKE",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 29,
    "title": "30. Insecure Deserialization (Labs)",
    "url": "https://www.youtube.com/watch?v=H2A6iNGerKE",
    "durationSec": 1348,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "30."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-g7RKLpnxLM8",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 30,
    "title": "31. Server-side request forgery (SSRF) (Explain & Labs)",
    "url": "https://www.youtube.com/watch?v=g7RKLpnxLM8",
    "durationSec": 2397,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "31."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-2oxotsPCcWg",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 31,
    "title": "32. APIs & JWT",
    "url": "https://www.youtube.com/watch?v=2oxotsPCcWg",
    "durationSec": 3139,
    "topicTags": [
      "web",
      "api",
      "mobile",
      "application",
      "security",
      "32."
    ],
    "trackIds": [
      "web",
      "api",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-iv3Sd12P0xA",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 32,
    "title": "33. Reconnaissance",
    "url": "https://www.youtube.com/watch?v=iv3Sd12P0xA",
    "durationSec": 8019,
    "topicTags": [
      "web",
      "osint",
      "mobile",
      "application",
      "security",
      "33."
    ],
    "trackIds": [
      "web",
      "osint",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-GylMyOvUb_c",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 33,
    "title": "34. Regex & Acquisitions",
    "url": "https://www.youtube.com/watch?v=GylMyOvUb_c",
    "durationSec": 1750,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "34."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-VQ0ZIIrBUqg",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 34,
    "title": "35. Information Leakage",
    "url": "https://www.youtube.com/watch?v=VQ0ZIIrBUqg",
    "durationSec": 1516,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "35."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-CjjpBJvsWM8",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 35,
    "title": "36. Mitigations",
    "url": "https://www.youtube.com/watch?v=CjjpBJvsWM8",
    "durationSec": 2755,
    "topicTags": [
      "web",
      "mobile",
      "application",
      "security",
      "36."
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3-N6dEXqHPzlI",
    "courseId": "PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3",
    "index": 36,
    "title": "37. Reporting",
    "url": "https://www.youtube.com/watch?v=N6dEXqHPzlI",
    "durationSec": 2771,
    "topicTags": [
      "web",
      "social",
      "mobile",
      "application",
      "security",
      "37."
    ],
    "trackIds": [
      "web",
      "social",
      "mobile"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-eO6cLnOty10",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 1,
    "title": "#1  CTF course - Learn cyber security in Arabic -- Introduction",
    "url": "https://www.youtube.com/watch?v=eO6cLnOty10",
    "durationSec": 114,
    "topicTags": [
      "ctf",
      "foundations",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "foundations",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-tQ0CMTT3wa0",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 2,
    "title": "#2  CTF course - Learn cyber security in Arabic -- Forensics 101 CTFLearn",
    "url": "https://www.youtube.com/watch?v=tQ0CMTT3wa0",
    "durationSec": 299,
    "topicTags": [
      "dfir",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-Gf83TRatH2Y",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 3,
    "title": "#3 CTF course - Learn cyber Security in Arabic  -- Taking ls challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=Gf83TRatH2Y",
    "durationSec": 204,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-9pDPZ2fDdFA",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 4,
    "title": "#4 CTF course - Learn cyber Security in Arabic  --  07601 challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=9pDPZ2fDdFA",
    "durationSec": 441,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-muIEj7g5DXg",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 5,
    "title": "#5 CTF course - Learn cyber Security in Arabic  --  POST practice challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=muIEj7g5DXg",
    "durationSec": 198,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-4fP6KMkpX0o",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 6,
    "title": "#6 CTF course - Learn cyber Security in Arabic  --  Android Reverse engineering challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=4fP6KMkpX0o",
    "durationSec": 400,
    "topicTags": [
      "malware",
      "ctf",
      "mobile",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "mobile",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA--b0n_jpbkks",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 7,
    "title": "#7 CTF course - Learn cyber Security in Arabic  -- TUX forensics challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=-b0n_jpbkks",
    "durationSec": 275,
    "topicTags": [
      "dfir",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-qxUp49WefWo",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 8,
    "title": "#8 CTF course - Learn cyber Security in Arabic  -- Lazy Game Binary challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=qxUp49WefWo",
    "durationSec": 293,
    "topicTags": [
      "ctf",
      "pwn",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "pwn",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-xyb6CqopHOE",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 9,
    "title": "#9 CTF course - Learn cyber Security in Arabic  -- Where can My robot go challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=xyb6CqopHOE",
    "durationSec": 101,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-QUJLPrZhETg",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 10,
    "title": "#10 CTF course - Learn cyber Security in Arabic  -- WOW so META forensics challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=QUJLPrZhETg",
    "durationSec": 166,
    "topicTags": [
      "dfir",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-PoHVOwIMK1s",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 11,
    "title": "#11 CTF course - Learn cyber Security in Arabic  -- binwalk forensics challenge CTFlearn",
    "url": "https://www.youtube.com/watch?v=PoHVOwIMK1s",
    "durationSec": 332,
    "topicTags": [
      "dfir",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "dfir",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-naqI6PqozyY",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 12,
    "title": "Learn reverse engineering and binary exploitation in Arabic (CTF بالعربي)",
    "url": "https://www.youtube.com/watch?v=naqI6PqozyY",
    "durationSec": 1065,
    "topicTags": [
      "malware",
      "ctf",
      "pwn",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "pwn",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-SJCwqrPUuHE",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 13,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (Easy access challenge)",
    "url": "https://www.youtube.com/watch?v=SJCwqrPUuHE",
    "durationSec": 199,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-hMg20i4qE5c",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 14,
    "title": "SQL injection Basics course in Arabic - CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=hMg20i4qE5c",
    "durationSec": 224,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-vu8Q-N8R-go",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 15,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (This is Sparta challenge)",
    "url": "https://www.youtube.com/watch?v=vu8Q-N8R-go",
    "durationSec": 231,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-4iX6YwyoUzQ",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 16,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (hide data challenge)",
    "url": "https://www.youtube.com/watch?v=4iX6YwyoUzQ",
    "durationSec": 159,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-S2ZfUtWJ4-w",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 17,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (crack the hash challenge)",
    "url": "https://www.youtube.com/watch?v=S2ZfUtWJ4-w",
    "durationSec": 277,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-e7st-f611fI",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 18,
    "title": "#1 Understand RSA encryption in Arabic for CTF players --  CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=e7st-f611fI",
    "durationSec": 685,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-e8si14OoDAY",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 19,
    "title": "#2 decrypting RSA using python in Arabic -- RACTF 2020 -- Really simple algorithm",
    "url": "https://www.youtube.com/watch?v=e8si14OoDAY",
    "durationSec": 327,
    "topicTags": [
      "ctf",
      "crypto",
      "foundations",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto",
      "foundations"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-wWM-GDCfAAA",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 20,
    "title": "#3 decrypting RSA without knowing the factors in Arabic -- CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=wWM-GDCfAAA",
    "durationSec": 174,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-WJFcJorPyvM",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 21,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (Cheers web challenge) شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=WJFcJorPyvM",
    "durationSec": 158,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-VDrIFgsW2s8",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 22,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (Dark project web challenge)",
    "url": "https://www.youtube.com/watch?v=VDrIFgsW2s8",
    "durationSec": 245,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-SeCCgwvZv68",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 23,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (Postbase crypto challenge)",
    "url": "https://www.youtube.com/watch?v=SeCCgwvZv68",
    "durationSec": 517,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-sJbYjl9mRYs",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 24,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (RSA101 crypto challenge)",
    "url": "https://www.youtube.com/watch?v=sJbYjl9mRYs",
    "durationSec": 398,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-5yCnjuDPnng",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 25,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (cool name effect web challenge)",
    "url": "https://www.youtube.com/watch?v=5yCnjuDPnng",
    "durationSec": 181,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-R5e0wgI1epo",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 26,
    "title": "CyberTalents challenges explained -- Learn CTF in Arabic (encrypted database web challenge) شرح",
    "url": "https://www.youtube.com/watch?v=R5e0wgI1epo",
    "durationSec": 243,
    "topicTags": [
      "web",
      "ctf",
      "foundations",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "foundations",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-GJwZp_ORFdE",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 27,
    "title": "#0 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x00  CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=GJwZp_ORFdE",
    "durationSec": 356,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-BCQaiaro_og",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 28,
    "title": "#1 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x01 CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=BCQaiaro_og",
    "durationSec": 146,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-uf3XOaK5uZE",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 29,
    "title": "#2 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x02 CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=uf3XOaK5uZE",
    "durationSec": 210,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-S5SizZN2KQU",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 30,
    "title": "#3 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x03  CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=S5SizZN2KQU",
    "durationSec": 525,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-WKHJ30x5pPo",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 31,
    "title": "#4 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x04 CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=WKHJ30x5pPo",
    "durationSec": 394,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-DY0giEYcFcA",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 32,
    "title": "#5 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x05  CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=DY0giEYcFcA",
    "durationSec": 414,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-Wm41qITeTCE",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 33,
    "title": "#1 exploiting basic cross-site scripting vulnerability in Arabic -- CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=Wm41qITeTCE",
    "durationSec": 132,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-MjUKo2tLx_8",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 34,
    "title": "#2 using JavaScript attributes to exploit XSS vulnerability in Arabic -- CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=MjUKo2tLx_8",
    "durationSec": 240,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-hCIz6XYGDYM",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 35,
    "title": "#3 learn how source code flaws lead to XSS vulnerability in Arabic --CTF شرح بالعربي",
    "url": "https://www.youtube.com/watch?v=hCIz6XYGDYM",
    "durationSec": 552,
    "topicTags": [
      "web",
      "ctf",
      "cloud",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "cloud",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-1evTnQGa44c",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 36,
    "title": "#1 warm up -- cross-site scripting XSS exploitation (alf.nu alert 1 to win)",
    "url": "https://www.youtube.com/watch?v=1evTnQGa44c",
    "durationSec": 191,
    "topicTags": [
      "web",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "web",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-VniSd_dVwPA",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 37,
    "title": "#6 Learn Reverse engineering in Arabic By solving Crackmes -- Crackme 0x06  CTF بالعربي",
    "url": "https://www.youtube.com/watch?v=VniSd_dVwPA",
    "durationSec": 1473,
    "topicTags": [
      "malware",
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "malware",
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-bDfZ-LA0ZkA",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 38,
    "title": "#0 CTF Roadmap for beginners in Arabic - Watch till the end - CTF بالعربي للمبتدئين",
    "url": "https://www.youtube.com/watch?v=bDfZ-LA0ZkA",
    "durationSec": 1242,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA-y1hodnvObHo",
    "courseId": "PLdxfDCLPISTTSCRZyUXvW6shfNyt0wbKA",
    "index": 39,
    "title": "practicing with base64 and morse code - PicoCTF 2019 - Cryptography",
    "url": "https://www.youtube.com/watch?v=y1hodnvObHo",
    "durationSec": 271,
    "topicTags": [
      "ctf",
      "crypto",
      "learn",
      "and",
      "cyber"
    ],
    "trackIds": [
      "ctf",
      "crypto"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-hS_lR4AmvD8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 1,
    "title": "LoRa for Hackers: Testing Long-Range Remote Control in the Real World",
    "url": "https://www.youtube.com/watch?v=hS_lR4AmvD8",
    "durationSec": 535,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "lora"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-IcJvtMXrY80",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 2,
    "title": "Hacking the Skies: Creating Ghost Drone Swarms with Spoofed IDs for $20",
    "url": "https://www.youtube.com/watch?v=IcJvtMXrY80",
    "durationSec": 357,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacking"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-znJY-nhZAo0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 3,
    "title": "Setting Up an Ethical Hacking Kit with a Raspberry Pi 5",
    "url": "https://www.youtube.com/watch?v=znJY-nhZAo0",
    "durationSec": 719,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "setting"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-C63PPEnFQnc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 4,
    "title": "How Hackers Use Xerosploit for Advanced MiTM Attacks",
    "url": "https://www.youtube.com/watch?v=C63PPEnFQnc",
    "durationSec": 772,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-LOqVIe9cnW8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 5,
    "title": "Use Facial Detection & Recognition on an ESP32 Wi-Fi Camera [Tutorial]",
    "url": "https://www.youtube.com/watch?v=LOqVIe9cnW8",
    "durationSec": 891,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tx09GFGgVwA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 6,
    "title": "Create a Wi-Fi Spy Camera with an ESP32-CAM [Tutorial]",
    "url": "https://www.youtube.com/watch?v=tx09GFGgVwA",
    "durationSec": 759,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-H0kRS5zR3-w",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 7,
    "title": "Use the Deauther Watch Wi-Fi Hacking Wearable [Tutorial]",
    "url": "https://www.youtube.com/watch?v=H0kRS5zR3-w",
    "durationSec": 623,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-BDsRy9EzBVg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 8,
    "title": "Fingerprint Web Apps & Servers for Better Recon [Tutorial]",
    "url": "https://www.youtube.com/watch?v=BDsRy9EzBVg",
    "durationSec": 819,
    "topicTags": [
      "web",
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "fingerprint"
    ],
    "trackIds": [
      "web",
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_PGJ980upPQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 9,
    "title": "Get Started with Kali Linux as a Bootable Live USB [Tutorial]",
    "url": "https://www.youtube.com/watch?v=_PGJ980upPQ",
    "durationSec": 796,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "get"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-1Fs3wFA0C1k",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 10,
    "title": "Clear the Logs & History on Linux Systems to Delete All Traces You Were There [Tutorial]",
    "url": "https://www.youtube.com/watch?v=1Fs3wFA0C1k",
    "durationSec": 578,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "clear"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-IK0M5ISGevo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 11,
    "title": "Practice Wi-Fi Hacking Legally with ESP8266 CTF Games [Tutorial]",
    "url": "https://www.youtube.com/watch?v=IK0M5ISGevo",
    "durationSec": 929,
    "topicTags": [
      "ctf",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "practice"
    ],
    "trackIds": [
      "ctf",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-M7MqgRpeQt0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 12,
    "title": "Use a Directional Antenna with ESP8266-Based Board [Tutorial]",
    "url": "https://www.youtube.com/watch?v=M7MqgRpeQt0",
    "durationSec": 729,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_OyJ62fP648",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 13,
    "title": "How Hackers Can Find Hidden Wi-Fi Networks & Their Names",
    "url": "https://www.youtube.com/watch?v=_OyJ62fP648",
    "durationSec": 232,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-YT35DykScnE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 14,
    "title": "Generate Crackable Handshakes with the ESP8266 [Tutorial]",
    "url": "https://www.youtube.com/watch?v=YT35DykScnE",
    "durationSec": 660,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "generate"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Vt5S12U3F0k",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 15,
    "title": "Automate Remote SSH Control of Computers with Expect Scripts [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Vt5S12U3F0k",
    "durationSec": 615,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "automate"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-x4Ap-ypWdFo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 16,
    "title": "Create Your Own Mouse Jiggler with a Digispark & Arduino [Tutorial]",
    "url": "https://www.youtube.com/watch?v=x4Ap-ypWdFo",
    "durationSec": 513,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-mzI59CIS1eE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 17,
    "title": "Using RedRabbit's Best Pentesting & Post-Exploitation Tools on Windows [Tutorial]",
    "url": "https://www.youtube.com/watch?v=mzI59CIS1eE",
    "durationSec": 775,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "using"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-UqzdbOcoF7Q",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 18,
    "title": "Hacker's Guide to Buying an ESP32 Camera Module [Tutorial]",
    "url": "https://www.youtube.com/watch?v=UqzdbOcoF7Q",
    "durationSec": 431,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacker"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-srk63urpHNA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 19,
    "title": "One Way Hackers Can Perform Keystroke Injection Over Wi-Fi from a Smartphone",
    "url": "https://www.youtube.com/watch?v=srk63urpHNA",
    "durationSec": 178,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "one"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-khJ1HbL7208",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 20,
    "title": "Hacking Remotely: Getting an Internet Connection in the Middle of Nowhere [Tutorial]",
    "url": "https://www.youtube.com/watch?v=khJ1HbL7208",
    "durationSec": 1093,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacking"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-dStYJgUpeDw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 21,
    "title": "Build a Software-Based Wi-Fi Jammer with Airgeddon [Tutorial]",
    "url": "https://www.youtube.com/watch?v=dStYJgUpeDw",
    "durationSec": 312,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "build"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ELOTp79MPXA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 22,
    "title": "Use Upip to Load MicroPython Libraries Over Wi-Fi to a Microcontroller [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ELOTp79MPXA",
    "durationSec": 534,
    "topicTags": [
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-c4HOWojf2Jo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 23,
    "title": "Lock Down Your Ubuntu System to Protect It from Being Hacked [Tutorial]",
    "url": "https://www.youtube.com/watch?v=c4HOWojf2Jo",
    "durationSec": 601,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "lock"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-1HDC6fKsKYE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 24,
    "title": "Scan Websites for Potential Vulnerabilities Using Vega in Kali Linux [Tutorial]",
    "url": "https://www.youtube.com/watch?v=1HDC6fKsKYE",
    "durationSec": 804,
    "topicTags": [
      "web",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "scan"
    ],
    "trackIds": [
      "web",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Z2zmvA-ieQc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 25,
    "title": "200th Episode! : Scraping Cryptocurrency Addresses with SpiderFoot CLI [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Z2zmvA-ieQc",
    "durationSec": 713,
    "topicTags": [
      "api",
      "crypto",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "200th"
    ],
    "trackIds": [
      "api",
      "crypto",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-9rxJ1j2seug",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 26,
    "title": "How Hackers Can Send Payloads to Computers Over Wi-Fi with the WiFi Duck",
    "url": "https://www.youtube.com/watch?v=9rxJ1j2seug",
    "durationSec": 200,
    "topicTags": [
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-b6LoNZXkwSA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 27,
    "title": "Create a Dead Man's Switch in Python to Encrypt a File When You Don't Check In [Tutorial]",
    "url": "https://www.youtube.com/watch?v=b6LoNZXkwSA",
    "durationSec": 1071,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-2kv1ey9m9F0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 28,
    "title": "How Hackers Can Steal Information from Computers Using Banner Grabbing",
    "url": "https://www.youtube.com/watch?v=2kv1ey9m9F0",
    "durationSec": 713,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-vOEO_6xfsdo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 29,
    "title": "Upgrade a Dumb Reverse Shell into a Fully Functional Terminal [Tutorial]",
    "url": "https://www.youtube.com/watch?v=vOEO_6xfsdo",
    "durationSec": 650,
    "topicTags": [
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "upgrade"
    ],
    "trackIds": [
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-CCtBhTpx97c",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 30,
    "title": "Use ExtAnalysis for Browser Extension Analysis [Tutorial]",
    "url": "https://www.youtube.com/watch?v=CCtBhTpx97c",
    "durationSec": 684,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-2oeCg8bj-4U",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 31,
    "title": "How a Hacker Could Attack Web Apps with Burp Suite & SQL Injection",
    "url": "https://www.youtube.com/watch?v=2oeCg8bj-4U",
    "durationSec": 609,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT--fbeL4MOfFE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 32,
    "title": "Exploit Sudo & Become a Superuser with SUDO_KILLER [Tutorial]",
    "url": "https://www.youtube.com/watch?v=-fbeL4MOfFE",
    "durationSec": 548,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "exploit"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-fElpxglCfew",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 33,
    "title": "Configure Port Forwarding to Create Internet-Connected Services [Tutorial]",
    "url": "https://www.youtube.com/watch?v=fElpxglCfew",
    "durationSec": 700,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "configure"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-XaVsdopP7Tw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 34,
    "title": "Perform Browser OSINT with the Mitaka Extension [Tutorial]",
    "url": "https://www.youtube.com/watch?v=XaVsdopP7Tw",
    "durationSec": 500,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-BgwecUwuMvk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 35,
    "title": "How Hackers Hack Wi-Fi Automatically Using Besside-ng",
    "url": "https://www.youtube.com/watch?v=BgwecUwuMvk",
    "durationSec": 542,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-U93B9QvuZP8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 36,
    "title": "Exploit WebDAV on a Server & Get a Reverse Shell [Tutorial]",
    "url": "https://www.youtube.com/watch?v=U93B9QvuZP8",
    "durationSec": 541,
    "topicTags": [
      "web",
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "exploit"
    ],
    "trackIds": [
      "web",
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-8a1yTN2kFNw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 37,
    "title": "Conduct a Penetration Test Like a Pro in 6 Phases  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=8a1yTN2kFNw",
    "durationSec": 817,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "conduct"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-3c65Xo_f-O0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 38,
    "title": "Install & Configure a Secure Open BSD Virtual Machine [Tutorial]",
    "url": "https://www.youtube.com/watch?v=3c65Xo_f-O0",
    "durationSec": 565,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "install"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Cm63_p82vSE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 39,
    "title": "How Hackers Use Zydra to Crack Password-Protected Files",
    "url": "https://www.youtube.com/watch?v=Cm63_p82vSE",
    "durationSec": 621,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-v79WBn2VKcA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 40,
    "title": "Perform Wireless Surveillance of Bluetooth & Wi-Fi with Sparrow-wifi [Tutorial]",
    "url": "https://www.youtube.com/watch?v=v79WBn2VKcA",
    "durationSec": 647,
    "topicTags": [
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-FKVsz_2IWJs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 41,
    "title": "How Hackers Could Brute-Force SSH Credentials to Gain Access to Servers",
    "url": "https://www.youtube.com/watch?v=FKVsz_2IWJs",
    "durationSec": 1035,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-67f9iptWqt0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 42,
    "title": "Host a Deep Web IRC Server for More Anonymous Chatting Online [Tutorial]",
    "url": "https://www.youtube.com/watch?v=67f9iptWqt0",
    "durationSec": 583,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "host"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-keK99avGLvQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 43,
    "title": "Automate Recon with Your Own Bash Script [Tutorial]",
    "url": "https://www.youtube.com/watch?v=keK99avGLvQ",
    "durationSec": 426,
    "topicTags": [
      "osint",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "automate"
    ],
    "trackIds": [
      "osint",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-h-vSYo-b5ms",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 44,
    "title": "Intercept LAN Traffic with a Packet Squirrel [Tutorial]",
    "url": "https://www.youtube.com/watch?v=h-vSYo-b5ms",
    "durationSec": 716,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "intercept"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-1-ykWq6BEsQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 45,
    "title": "Create Brute-Force Wordlists from Leaked Password Databases [Tutorial]",
    "url": "https://www.youtube.com/watch?v=1-ykWq6BEsQ",
    "durationSec": 499,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-yhC5Kh5Z_4o",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 46,
    "title": "Crack SSH Private Key Passwords with John the Ripper [Tutorial]",
    "url": "https://www.youtube.com/watch?v=yhC5Kh5Z_4o",
    "durationSec": 771,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "crack"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-uULIfqaPQKI",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 47,
    "title": "Control Electronics from a Web Browser Using MicroPython & Jupyter Notebook [Tutorial]",
    "url": "https://www.youtube.com/watch?v=uULIfqaPQKI",
    "durationSec": 504,
    "topicTags": [
      "web",
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "control"
    ],
    "trackIds": [
      "web",
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-xtTrbZn3VSw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 48,
    "title": "Perform Aircraft OSINT Using Your Smartphone or Computer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=xtTrbZn3VSw",
    "durationSec": 899,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Xq2m2IDyUnw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 49,
    "title": "Enumerate Networks & Services with GoScan [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Xq2m2IDyUnw",
    "durationSec": 592,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "enumerate"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-GVMjk9pj2Cw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 50,
    "title": "Host Your Own Tor Hidden Service with an Onion Address [Tutorial]",
    "url": "https://www.youtube.com/watch?v=GVMjk9pj2Cw",
    "durationSec": 461,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "host"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-aOkg1K6C73U",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 51,
    "title": "Python 2 vs. Python 3: How These Versions Differ for Hackers & Cybersecurity [Tutorial]",
    "url": "https://www.youtube.com/watch?v=aOkg1K6C73U",
    "durationSec": 452,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "python"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-rGyRC_IYR6M",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 52,
    "title": "Use Images to Smuggle Data Past Firewalls on MacOS [Tutorial]",
    "url": "https://www.youtube.com/watch?v=rGyRC_IYR6M",
    "durationSec": 632,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-GfbErjQ3vMQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 53,
    "title": "The Hacker's Guide to 3D Printing [Tutorial]",
    "url": "https://www.youtube.com/watch?v=GfbErjQ3vMQ",
    "durationSec": 1718,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "the"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-rIlkXVlUBCA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 54,
    "title": "Identify Antivirus Software Installed on a Target's Windows PC [Tutorial]",
    "url": "https://www.youtube.com/watch?v=rIlkXVlUBCA",
    "durationSec": 644,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "identify"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-fgf6ym3nRjg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 55,
    "title": "Use One-Lin3r to Quickly Generate Reverse Shells, Run Commands & More [Tutorial]",
    "url": "https://www.youtube.com/watch?v=fgf6ym3nRjg",
    "durationSec": 476,
    "topicTags": [
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-10Y89xaVkqw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 56,
    "title": "Program ESP8266 & ESP32 Boards Over Wi-Fi with MicroPython WebREPL [Tutorial]",
    "url": "https://www.youtube.com/watch?v=10Y89xaVkqw",
    "durationSec": 471,
    "topicTags": [
      "web",
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "program"
    ],
    "trackIds": [
      "web",
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-WfcrRnr2UlM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 57,
    "title": "Lock Down Your DNS with a Pi-Hole for Safer Web Browsing at Home [Tutorial]",
    "url": "https://www.youtube.com/watch?v=WfcrRnr2UlM",
    "durationSec": 1372,
    "topicTags": [
      "web",
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "lock"
    ],
    "trackIds": [
      "web",
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-4CAokDlG_74",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 58,
    "title": "Enable Offline Chat Over Wi-Fi with an ESP32 Microcontroller [Tutorial]",
    "url": "https://www.youtube.com/watch?v=4CAokDlG_74",
    "durationSec": 856,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "enable"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-clWJ78N1new",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 59,
    "title": "Build an Off-the-Grid Wi-Fi System for Voice Communications [Tutorial]",
    "url": "https://www.youtube.com/watch?v=clWJ78N1new",
    "durationSec": 847,
    "topicTags": [
      "social",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "build"
    ],
    "trackIds": [
      "social",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-PE1A1j_xKUE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 60,
    "title": "Find Exploits & Get Root with Linux Exploit Suggester [Tutorial]",
    "url": "https://www.youtube.com/watch?v=PE1A1j_xKUE",
    "durationSec": 411,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "find"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-vBG5Pqnxkk0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 61,
    "title": "Use Zero-Width Characters to Hide Messages & Reveal Leaks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=vBG5Pqnxkk0",
    "durationSec": 826,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Ls0SH9MZMCs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 62,
    "title": "Use Skiptracer to Gather License Plate OSINT Data [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Ls0SH9MZMCs",
    "durationSec": 490,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-xNhQMwC0BLo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 63,
    "title": "Generate Obfuscated Payloads Using Graffiti [Tutorial]",
    "url": "https://www.youtube.com/watch?v=xNhQMwC0BLo",
    "durationSec": 499,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "generate"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-xFEuqdGnhCc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 64,
    "title": "Hack Like It's 1987 with the Telehack Game [Tutorial]",
    "url": "https://www.youtube.com/watch?v=xFEuqdGnhCc",
    "durationSec": 1451,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hack"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-OIa3BkYiQ7U",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 65,
    "title": "Create Rogue APs with MicroPython on an ESP8266 Board [Tutorial]",
    "url": "https://www.youtube.com/watch?v=OIa3BkYiQ7U",
    "durationSec": 754,
    "topicTags": [
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-EL96fXFNLNA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 66,
    "title": "Take Control of Web Browsers with BeEF [Tutorial]",
    "url": "https://www.youtube.com/watch?v=EL96fXFNLNA",
    "durationSec": 732,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "take"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-TtzKrTKkTgs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 67,
    "title": "Discover Hidden HTTP Parameters with Arjun [Tutorial]",
    "url": "https://www.youtube.com/watch?v=TtzKrTKkTgs",
    "durationSec": 376,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "discover"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-g6WFAjBtsyI",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 68,
    "title": "Create Custom Password Libraries with Wordlister [Tutorial]",
    "url": "https://www.youtube.com/watch?v=g6WFAjBtsyI",
    "durationSec": 359,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-mq5F8FyXXhI",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 69,
    "title": "Execute Hidden Python Commands [Tutorial]",
    "url": "https://www.youtube.com/watch?v=mq5F8FyXXhI",
    "durationSec": 602,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "execute"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-X-ml7bLYWpk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 70,
    "title": "Spoof Wi-Fi Hotspot GPS Locations with SkyLift [Tutorial]",
    "url": "https://www.youtube.com/watch?v=X-ml7bLYWpk",
    "durationSec": 431,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "spoof"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-1pAis7c2JVY",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 71,
    "title": "Track Wi-Fi Devices with a Directional Antenna & Wireshark [Tutorial]",
    "url": "https://www.youtube.com/watch?v=1pAis7c2JVY",
    "durationSec": 745,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Ur7U39gmCgs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 72,
    "title": "How Hackers Can Attack 5 GHz Wi-Fi Networks with a Wi-Fi Adapter",
    "url": "https://www.youtube.com/watch?v=Ur7U39gmCgs",
    "durationSec": 215,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Iidqk-pWK0g",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 73,
    "title": "Clean & Map Wigle Wardriving Data in Jupyter Notebook [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Iidqk-pWK0g",
    "durationSec": 1001,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "clean"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-C3UttshkkQw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 74,
    "title": "Pick a Wi-Fi Antenna for WiFi Hacking [Tutorial]",
    "url": "https://www.youtube.com/watch?v=C3UttshkkQw",
    "durationSec": 915,
    "topicTags": [
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "pick"
    ],
    "trackIds": [
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-BmUNKG45jlU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 75,
    "title": "Bypass VPNs to Track a Mac with Arduino [Tutorial]",
    "url": "https://www.youtube.com/watch?v=BmUNKG45jlU",
    "durationSec": 939,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "bypass"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_AYdH9OKfzg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 76,
    "title": "How a Hacker Could Create a Trojan PDF for Macs Using AppleScript, Part 2",
    "url": "https://www.youtube.com/watch?v=_AYdH9OKfzg",
    "durationSec": 203,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-aIW-BssqS3s",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 77,
    "title": "How a Hacker Could Create a Trojan PDF for Macs Using AppleScript, Part 1",
    "url": "https://www.youtube.com/watch?v=aIW-BssqS3s",
    "durationSec": 269,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-hBXIJvdslX0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 78,
    "title": "How Hackers Can Steal a Mac's Preferred Network List Using Arduino",
    "url": "https://www.youtube.com/watch?v=hBXIJvdslX0",
    "durationSec": 245,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-FG0jQESUdyo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 79,
    "title": "Spy on SSH Sessions with SSHPry2.0 [Tutorial]",
    "url": "https://www.youtube.com/watch?v=FG0jQESUdyo",
    "durationSec": 517,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "spy"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-R7aVDO7-ldk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 80,
    "title": "How Hackers Create Phishing Pages for Social Media Accounts & More",
    "url": "https://www.youtube.com/watch?v=R7aVDO7-ldk",
    "durationSec": 209,
    "topicTags": [
      "dfir",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "dfir",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-y8GFQ2j5h-8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 81,
    "title": "How Hackers Can Steal Credentials Stored in Browsers Using a USB Rubber Ducky",
    "url": "https://www.youtube.com/watch?v=y8GFQ2j5h-8",
    "durationSec": 171,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-oW9Bxy0OSrU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 82,
    "title": "One Way Hackers Social Engineer Wi-Fi Passwords",
    "url": "https://www.youtube.com/watch?v=oW9Bxy0OSrU",
    "durationSec": 300,
    "topicTags": [
      "dfir",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "one"
    ],
    "trackIds": [
      "dfir",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_h-gWbGyzd4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 83,
    "title": "How Hackers Can Take Control Over MacOS Computers",
    "url": "https://www.youtube.com/watch?v=_h-gWbGyzd4",
    "durationSec": 220,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-gbFIlV8Sems",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 84,
    "title": "How Hackers Discover & Attack Raspberry Pis on a Network",
    "url": "https://www.youtube.com/watch?v=gbFIlV8Sems",
    "durationSec": 205,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-AnASvDkz7ss",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 85,
    "title": "How Hackers Scan & Attack Wi-Fi Networks with Low-Cost Microcontrollers",
    "url": "https://www.youtube.com/watch?v=AnASvDkz7ss",
    "durationSec": 272,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-zuU_Ub9AZ2s",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 86,
    "title": "How Hackers Get Wi-Fi Passwords with Wifiphisher's Social Engineering Attack",
    "url": "https://www.youtube.com/watch?v=zuU_Ub9AZ2s",
    "durationSec": 215,
    "topicTags": [
      "dfir",
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "dfir",
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ZFq9lTiWUo4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 87,
    "title": "How Hackers Can Take Control of Chromecasts on the Same Network",
    "url": "https://www.youtube.com/watch?v=ZFq9lTiWUo4",
    "durationSec": 284,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-PlP6i3qkaJk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 88,
    "title": "How Hackers Can Brute-Force Website Logins",
    "url": "https://www.youtube.com/watch?v=PlP6i3qkaJk",
    "durationSec": 211,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Pag0FJfsyu0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 89,
    "title": "Track USB Events with USBRip to Find Suspicious Activity on Your Computer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Pag0FJfsyu0",
    "durationSec": 805,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-93ABfKsHd5I",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 90,
    "title": "Analyze Wi-Fi Data with Jupyter Notebook [Tutorial]",
    "url": "https://www.youtube.com/watch?v=93ABfKsHd5I",
    "durationSec": 1076,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "analyze"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_m7zyU0x-GE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 91,
    "title": "How Hackers Arp-Spoof to Intercept Passwords Over Wi-Fi",
    "url": "https://www.youtube.com/watch?v=_m7zyU0x-GE",
    "durationSec": 264,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-YYGH3BIbaN0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 92,
    "title": "How Hackers Can Take Over Sonos Speakers with Python",
    "url": "https://www.youtube.com/watch?v=YYGH3BIbaN0",
    "durationSec": 284,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-1yaHe7zWg1k",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 93,
    "title": "How Hackers Crack WPA2 Networks Using the PMKID Hashcat Attack",
    "url": "https://www.youtube.com/watch?v=1yaHe7zWg1k",
    "durationSec": 312,
    "topicTags": [
      "network",
      "crypto",
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "crypto",
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-iFnc9l3NKyo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 94,
    "title": "Create a Wi-Fi Backdoor Using Arduino [Tutorial]",
    "url": "https://www.youtube.com/watch?v=iFnc9l3NKyo",
    "durationSec": 767,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-4bHLmHu_jCk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 95,
    "title": "How Hackers Can Hunt for Weak Passwords on Wi-Fi Networks",
    "url": "https://www.youtube.com/watch?v=4bHLmHu_jCk",
    "durationSec": 235,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-JmQk4Yp9bww",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 96,
    "title": "Snoop on Bluetooth Devices Using Kali Linux [Tutorial]",
    "url": "https://www.youtube.com/watch?v=JmQk4Yp9bww",
    "durationSec": 750,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "snoop"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Y_zjwIJTkBA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 97,
    "title": "How Hackers Can Take Sudo Passwords from Linux & MacOS Computers",
    "url": "https://www.youtube.com/watch?v=Y_zjwIJTkBA",
    "durationSec": 286,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-TRfzgXXpU0A",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 98,
    "title": "How Hackers Brute-Force Passwords for Network Services",
    "url": "https://www.youtube.com/watch?v=TRfzgXXpU0A",
    "durationSec": 223,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-7SNagx-Cp2E",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 99,
    "title": "How Hackers Perform Online Password Cracking with Dictionary Attacks",
    "url": "https://www.youtube.com/watch?v=7SNagx-Cp2E",
    "durationSec": 220,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-T3Mg221FmdU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 100,
    "title": "How Hackers Can Jam Your Wi-Fi Networks",
    "url": "https://www.youtube.com/watch?v=T3Mg221FmdU",
    "durationSec": 259,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-KZ8IRoLIZbc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 101,
    "title": "How Hackers Can Bypass MacOS Security by Spoofing Trusted Apps",
    "url": "https://www.youtube.com/watch?v=KZ8IRoLIZbc",
    "durationSec": 210,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-odffCT0aW58",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 102,
    "title": "Program MicroPython NeoPixel Holiday Lights with an ESP8266 Microcontroller [Tutorial]",
    "url": "https://www.youtube.com/watch?v=odffCT0aW58",
    "durationSec": 1060,
    "topicTags": [
      "malware",
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "program"
    ],
    "trackIds": [
      "malware",
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-j0hgKkwmSlw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 103,
    "title": "Intro to Programming with MicroPython for ESP8266 Boards [Tutorial]",
    "url": "https://www.youtube.com/watch?v=j0hgKkwmSlw",
    "durationSec": 910,
    "topicTags": [
      "pwn",
      "foundations",
      "cyber",
      "weapons",
      "lab",
      "intro"
    ],
    "trackIds": [
      "pwn",
      "foundations"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-DOTT6m54eRk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 104,
    "title": "How Hackers Can Crack Your Wi-Fi Passwords Using Pyrit",
    "url": "https://www.youtube.com/watch?v=DOTT6m54eRk",
    "durationSec": 267,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-pS9Aoyh7Wz8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 105,
    "title": "How Hackers Can Phish Using Social Media Sites",
    "url": "https://www.youtube.com/watch?v=pS9Aoyh7Wz8",
    "durationSec": 241,
    "topicTags": [
      "dfir",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "dfir",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-HyxQqDq3qs4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 106,
    "title": "How Hackers Can Grab Your Passwords Over Wi-Fi with Evil Twin Attacks",
    "url": "https://www.youtube.com/watch?v=HyxQqDq3qs4",
    "durationSec": 658,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-aC7Pjjr6NcM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 107,
    "title": "Fingerprint a Hashed Password with Hash-Identifier [Tutorial]",
    "url": "https://www.youtube.com/watch?v=aC7Pjjr6NcM",
    "durationSec": 772,
    "topicTags": [
      "crypto",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "fingerprint"
    ],
    "trackIds": [
      "crypto",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Hl0IpoS503A",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 108,
    "title": "View Smartphone Traffic with Wireshark on the Same Network [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Hl0IpoS503A",
    "durationSec": 740,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "view"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-MtU0X0ZpR5k",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 109,
    "title": "Intercept Packets with Sniffglue Without Opening Yourself Up to Zero-Days [Tutorial]",
    "url": "https://www.youtube.com/watch?v=MtU0X0ZpR5k",
    "durationSec": 807,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "intercept"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-7I8sjeNHWjQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 110,
    "title": "Script Your Own MacOS Ducky Script Payloads for a Digispark Board [Tutorial]",
    "url": "https://www.youtube.com/watch?v=7I8sjeNHWjQ",
    "durationSec": 499,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "script"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-hdXDMIvQuTs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 111,
    "title": "Run Graphical X Applications Over SSH [Tutorial]",
    "url": "https://www.youtube.com/watch?v=hdXDMIvQuTs",
    "durationSec": 691,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "run"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-A3cB9BDE6XM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 112,
    "title": "Use USB Rubber Ducky Scripts & Payloads on an Inexpensive Digispark Board [Tutorial]",
    "url": "https://www.youtube.com/watch?v=A3cB9BDE6XM",
    "durationSec": 511,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-5cBiXqz-WY4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 113,
    "title": "Fingerprint Web Application Firewalls with Nmap & Wafw00f [Tutorial]",
    "url": "https://www.youtube.com/watch?v=5cBiXqz-WY4",
    "durationSec": 549,
    "topicTags": [
      "web",
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "fingerprint"
    ],
    "trackIds": [
      "web",
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-PQo9PEdVuIw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 114,
    "title": "Protect Your Ubuntu System with AppArmor & Firejail [Tutorial]",
    "url": "https://www.youtube.com/watch?v=PQo9PEdVuIw",
    "durationSec": 756,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "protect"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-2IosbILbMWQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 115,
    "title": "Defend Your Ubuntu System Against Network Attacks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=2IosbILbMWQ",
    "durationSec": 1316,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "defend"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tJJDZV1XSzo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 116,
    "title": "Lock Down & Protect Ubuntu Linux Against Physical Threats [Tutorial]",
    "url": "https://www.youtube.com/watch?v=tJJDZV1XSzo",
    "durationSec": 1188,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "lock"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-zWWR3r9slNU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 117,
    "title": "Run OSINT Investigations on Businesses & CEOs [Tutorial]",
    "url": "https://www.youtube.com/watch?v=zWWR3r9slNU",
    "durationSec": 832,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "run"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-u_gOnwWEXiA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 118,
    "title": "Find Vulnerable Services & Hidden Info Using Google Dorks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=u_gOnwWEXiA",
    "durationSec": 817,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "find"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-M0eEwqUpKDc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 119,
    "title": "Haunt a Computer Using SSH [Tutorial]",
    "url": "https://www.youtube.com/watch?v=M0eEwqUpKDc",
    "durationSec": 1150,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "haunt"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-z8_qz938wFU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 120,
    "title": "Google Search Like a Hacker [Tutorial]",
    "url": "https://www.youtube.com/watch?v=z8_qz938wFU",
    "durationSec": 699,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "google"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-F9lwzMPGIgo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 121,
    "title": "Conduct Reconnaissance with Cross-Platform Python Tools [Tutorial]",
    "url": "https://www.youtube.com/watch?v=F9lwzMPGIgo",
    "durationSec": 1015,
    "topicTags": [
      "osint",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "conduct"
    ],
    "trackIds": [
      "osint",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-6Epwd3hzBIc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 122,
    "title": "Protect Your New MacBook, iMac, or Mac from Spying & Ransomware [Tutorial]",
    "url": "https://www.youtube.com/watch?v=6Epwd3hzBIc",
    "durationSec": 566,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "protect"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-YKYH7d5vuCU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 123,
    "title": "Check Your MacBook, iMac, or Mac for Malware & Keyloggers [Tutorial]",
    "url": "https://www.youtube.com/watch?v=YKYH7d5vuCU",
    "durationSec": 695,
    "topicTags": [
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "check"
    ],
    "trackIds": [
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-frS5zRBRdfk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 124,
    "title": "Access Multiple Wi-Fi Adapters Over a Network with Airserv-ng [Tutorial]",
    "url": "https://www.youtube.com/watch?v=frS5zRBRdfk",
    "durationSec": 650,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "access"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Tjc-Xs-1fq8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 125,
    "title": "Hacking QR Codes with QRGen to Attack Scanning Devices [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Tjc-Xs-1fq8",
    "durationSec": 607,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacking"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-oDkg1zz6xlw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 126,
    "title": "Search for Vulnerable Devices Around the World with Shodan [Tutorial]",
    "url": "https://www.youtube.com/watch?v=oDkg1zz6xlw",
    "durationSec": 1083,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "search"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Jquf9BDm4iU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 127,
    "title": "Load Kali Linux on a Raspberry Pi 4 Model B for a Mini Hacking Computer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Jquf9BDm4iU",
    "durationSec": 589,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "load"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-cZNsO0aLklA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 128,
    "title": "Set Up an Arch Linux Distro with Manjaro & BlackArch  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=cZNsO0aLklA",
    "durationSec": 944,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "set"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-wo_orZvrqh8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 129,
    "title": "Intercept Passwords Stored on MacOS in Keychain, LastPass, 1Password & KeePassX  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=wo_orZvrqh8",
    "durationSec": 833,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "intercept"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-HrqYGTK8-bo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 130,
    "title": "Hunt Down Social Media Accounts by Usernames Using Sherlock  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=HrqYGTK8-bo",
    "durationSec": 704,
    "topicTags": [
      "dfir",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hunt"
    ],
    "trackIds": [
      "dfir",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-k-EF9Zwe-Hs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 131,
    "title": "Safely Launch Fireworks Over Wi-Fi [Tutorial]",
    "url": "https://www.youtube.com/watch?v=k-EF9Zwe-Hs",
    "durationSec": 1231,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "safely"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-F3tJUNHbwnA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 132,
    "title": "Top 10 Browser Extensions for Hackers & OSINT Researchers  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=F3tJUNHbwnA",
    "durationSec": 1128,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "top"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-DdHK0TOJp98",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 133,
    "title": "Defend Your MacOS Computer from Malware & Evil Maid Attacks  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=DdHK0TOJp98",
    "durationSec": 778,
    "topicTags": [
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "defend"
    ],
    "trackIds": [
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-m0E8PlTIx-c",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 134,
    "title": "Crack Password-Protected Microsoft Office Files [Tutorial]",
    "url": "https://www.youtube.com/watch?v=m0E8PlTIx-c",
    "durationSec": 550,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "crack"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tFdKJcsBJOw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 135,
    "title": "Obtain Valuable Data from Images During Recon Using EXIF Extractors [Tutorial]",
    "url": "https://www.youtube.com/watch?v=tFdKJcsBJOw",
    "durationSec": 840,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "obtain"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-l1W4CAbeEfg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 136,
    "title": "Perform Situational Awareness Attacks on MacOS, Part 2  [Tutorial] - 100th Episode!",
    "url": "https://www.youtube.com/watch?v=l1W4CAbeEfg",
    "durationSec": 576,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ZX3hfW6CJ2M",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 137,
    "title": "Perform Situational Awareness Attacks on MacOS, Part 1  [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ZX3hfW6CJ2M",
    "durationSec": 514,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-owEVhvbZMkk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 138,
    "title": "Discover & Attack Network Devices with Sparta [Tutorial]",
    "url": "https://www.youtube.com/watch?v=owEVhvbZMkk",
    "durationSec": 769,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "discover"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-47I3QTKCXqM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 139,
    "title": "Hide Payloads for MacOS Inside Photo Metadata [Tutorial]",
    "url": "https://www.youtube.com/watch?v=47I3QTKCXqM",
    "durationSec": 829,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hide"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-WW6myutKBYk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 140,
    "title": "Find Information from a Phone Number Using OSINT Tools [Tutorial]",
    "url": "https://www.youtube.com/watch?v=WW6myutKBYk",
    "durationSec": 1019,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "find"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-yD8qrP8sCDs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 141,
    "title": "Create Packets from Scratch with Scapy [Tutorial]",
    "url": "https://www.youtube.com/watch?v=yD8qrP8sCDs",
    "durationSec": 829,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-NHeqI0HNlxE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 142,
    "title": "Take Control of Network Traffic with Evil Limiter [Tutorial]",
    "url": "https://www.youtube.com/watch?v=NHeqI0HNlxE",
    "durationSec": 641,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "take"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-YDpjGTojByw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 143,
    "title": "Identify & Target Bluetooth Devices with Bettercap [Tutorial]",
    "url": "https://www.youtube.com/watch?v=YDpjGTojByw",
    "durationSec": 635,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "identify"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-XlFO5Iat178",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 144,
    "title": "A Hacker's Guide to Programming Microcontrollers [Tutorial]",
    "url": "https://www.youtube.com/watch?v=XlFO5Iat178",
    "durationSec": 1073,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacker"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-A7c_GOduMbA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 145,
    "title": "Get Started with Parrot Security OS on Your Computer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=A7c_GOduMbA",
    "durationSec": 850,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "get"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-pJDJwD8GCIg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 146,
    "title": "Use Photon Scanner to Scrape Web OSINT Data [Tutorial]",
    "url": "https://www.youtube.com/watch?v=pJDJwD8GCIg",
    "durationSec": 1048,
    "topicTags": [
      "web",
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "web",
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-jzLJjbZVQ9s",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 147,
    "title": "Mine Twitter for Targeted Information Using Twint [Tutorial]",
    "url": "https://www.youtube.com/watch?v=jzLJjbZVQ9s",
    "durationSec": 804,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "mine"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-lru-UWQ06I0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 148,
    "title": "Catch Catfish on the Internet with Grabify Tracking Links [Tutorial]",
    "url": "https://www.youtube.com/watch?v=lru-UWQ06I0",
    "durationSec": 641,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "catch"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-154kQIkO86o",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 149,
    "title": "Discover Web Vulnerabilities with Uniscan's Terminal or GUI-Based Tool [Tutorial]",
    "url": "https://www.youtube.com/watch?v=154kQIkO86o",
    "durationSec": 599,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "discover"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-5a_GFWeovYI",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 150,
    "title": "Probe Sites for Vulnerabilities with TIDoS, the Offensive Web App Pen-Testing Framework [Tutorial]",
    "url": "https://www.youtube.com/watch?v=5a_GFWeovYI",
    "durationSec": 1113,
    "topicTags": [
      "web",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "probe"
    ],
    "trackIds": [
      "web",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-4xaWoZE8eik",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 151,
    "title": "Discover & Scan for Devices on a Network with ARP [Tutorial]",
    "url": "https://www.youtube.com/watch?v=4xaWoZE8eik",
    "durationSec": 620,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "discover"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-53SNcPeQih8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 152,
    "title": "Introduction to IPv4 Addresses & How to Use Them to Navigate a Network [Tutorial]",
    "url": "https://www.youtube.com/watch?v=53SNcPeQih8",
    "durationSec": 723,
    "topicTags": [
      "network",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "introduction"
    ],
    "trackIds": [
      "network",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-nPQVp_dDrjM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 153,
    "title": "Intercept Security Camera Images Using Hak5's Plunder Bug [Tutorial]",
    "url": "https://www.youtube.com/watch?v=nPQVp_dDrjM",
    "durationSec": 533,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "intercept"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-noCaFsvgRX0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 154,
    "title": "Spy on Network Relationships with Airgraph-ng [Tutorial]",
    "url": "https://www.youtube.com/watch?v=noCaFsvgRX0",
    "durationSec": 663,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "spy"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-FNiBNdM7srE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 155,
    "title": "Track a Target Using Canary Token Tracking Links [Tutorial]",
    "url": "https://www.youtube.com/watch?v=FNiBNdM7srE",
    "durationSec": 962,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-K78YOmbuT48",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 156,
    "title": "Scan for Vulnerabilities on Any Website Using Nikto [Tutorial]",
    "url": "https://www.youtube.com/watch?v=K78YOmbuT48",
    "durationSec": 956,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "scan"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-BQBcrPTTIUs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 157,
    "title": "Inconspicuously Sniff Wi-Fi Data Packets Using an ESP8266 D1 Mini [Tutorial]",
    "url": "https://www.youtube.com/watch?v=BQBcrPTTIUs",
    "durationSec": 1030,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "inconspicuously"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-qpnpI_mF3Aw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 158,
    "title": "Automate Wi-Fi Hacking with Wifite2 in Kali Linux [Tutorial]",
    "url": "https://www.youtube.com/watch?v=qpnpI_mF3Aw",
    "durationSec": 622,
    "topicTags": [
      "wireless",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "automate"
    ],
    "trackIds": [
      "wireless",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-TCj645oL0wo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 159,
    "title": "Scan Websites for Vulnerabilities using Kali Linux on Any Android Device [Tutorial]",
    "url": "https://www.youtube.com/watch?v=TCj645oL0wo",
    "durationSec": 784,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "scan"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-6bIuwQcfgFk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 160,
    "title": "Weaponize Your Mac with Homebrew & Sshtrix for SSH Cracking [Tutorial]",
    "url": "https://www.youtube.com/watch?v=6bIuwQcfgFk",
    "durationSec": 570,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "weaponize"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ylKOYohHyvQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 161,
    "title": "Create a Wi-Fi Controlled Relay Using aRest & NodeMCU [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ylKOYohHyvQ",
    "durationSec": 809,
    "topicTags": [
      "api",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "api",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Wb91wpCUx8Q",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 162,
    "title": "Create Your Own Nmap Scripts Using Lua [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Wb91wpCUx8Q",
    "durationSec": 608,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-zFo8okxBKDc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 163,
    "title": "Run the Kali Linux Hacking OS on an Unrooted Android Phone [Tutorial]",
    "url": "https://www.youtube.com/watch?v=zFo8okxBKDc",
    "durationSec": 757,
    "topicTags": [
      "mobile",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "run"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-va1wUSPGgSU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 164,
    "title": "Intercept Images from a Security Camera Using Wireshark [Tutorial]",
    "url": "https://www.youtube.com/watch?v=va1wUSPGgSU",
    "durationSec": 1007,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "intercept"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-3U1pJ-eJrAU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 165,
    "title": "Find Network Vulnerabilities with Nmap Scripts [Tutorial]",
    "url": "https://www.youtube.com/watch?v=3U1pJ-eJrAU",
    "durationSec": 473,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "find"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-nHVptUyHcyE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 166,
    "title": "SSH into Remote Devices on Chrome with the Secure Shell Extension [Tutorial]",
    "url": "https://www.youtube.com/watch?v=nHVptUyHcyE",
    "durationSec": 528,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "ssh"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-GlokXVaoM34",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 167,
    "title": "Clone, Compile & Branch Your Code with Git [Tutorial]",
    "url": "https://www.youtube.com/watch?v=GlokXVaoM34",
    "durationSec": 803,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "clone"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-UIwcTU10F5k",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 168,
    "title": "Use & Exit Vim (The Text Editor Every Hacker Should Be Familiar With) [Tutorial]",
    "url": "https://www.youtube.com/watch?v=UIwcTU10F5k",
    "durationSec": 888,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ltEFbi_I2KY",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 169,
    "title": "Use Nmap for Tactical Network Reconnaissance [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ltEFbi_I2KY",
    "durationSec": 1056,
    "topicTags": [
      "network",
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "network",
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-JK-RC0OjcZs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 170,
    "title": "Encrypt your Private Text, Photo & Archive Files with EncryptPad [Tutorial]",
    "url": "https://www.youtube.com/watch?v=JK-RC0OjcZs",
    "durationSec": 680,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "encrypt"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-KT8RI6_CDtc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 171,
    "title": "Scan for Devices Vulnerable to the Libssh Exploit [Tutorial]",
    "url": "https://www.youtube.com/watch?v=KT8RI6_CDtc",
    "durationSec": 397,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "scan"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-U3eldMLq2cc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 172,
    "title": "Enable Monitor Mode & Packet Injection on a Raspberry Pi Zero W Using Nexmon",
    "url": "https://www.youtube.com/watch?v=U3eldMLq2cc",
    "durationSec": 847,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "enable"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-z8G_vBBHtfA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 173,
    "title": "Locate Breached Account Data with H8mail [Tutorial]",
    "url": "https://www.youtube.com/watch?v=z8G_vBBHtfA",
    "durationSec": 837,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "locate"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-JSMw4AHjRAE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 174,
    "title": "Test if Your Wireless Network Adapter Supports Monitor Mode & Packet Injection [Tutorial]",
    "url": "https://www.youtube.com/watch?v=JSMw4AHjRAE",
    "durationSec": 739,
    "topicTags": [
      "network",
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "test"
    ],
    "trackIds": [
      "network",
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-VF4In6rIPGc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 175,
    "title": "Use Netcat to Spawn Reverse Shells & Connect to Other Computers [Tutorial]",
    "url": "https://www.youtube.com/watch?v=VF4In6rIPGc",
    "durationSec": 678,
    "topicTags": [
      "malware",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "malware",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-qgroUbiuNTU",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 176,
    "title": "Create Undetectable Payloads for macOS Computers with Tokyoneon's Armor [Tutorial]",
    "url": "https://www.youtube.com/watch?v=qgroUbiuNTU",
    "durationSec": 688,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-da1CLA82jw8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 177,
    "title": "Use an RTL-SDR Software-Defined Radio Receiver with an Android Smartphone [Tutorial]",
    "url": "https://www.youtube.com/watch?v=da1CLA82jw8",
    "durationSec": 679,
    "topicTags": [
      "mobile",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ne8SPEoDe8o",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 178,
    "title": "Generate Phishing Domains Easily with Dnstwist [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ne8SPEoDe8o",
    "durationSec": 897,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "generate"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-8VL0K0rFgxw",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 179,
    "title": "The Top 10 Things to Do After Installing Kali Linux on Your Computer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=8VL0K0rFgxw",
    "durationSec": 1276,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "the"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-30Eww40s9D0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 180,
    "title": "Detect Your Friend's Devices with a NodeMCU MAC Address Sniffer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=30Eww40s9D0",
    "durationSec": 837,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "detect"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Q395Xcixzac",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 181,
    "title": "Detect Deauthentication & Disassociation Attacks with a NodeMCU [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Q395Xcixzac",
    "durationSec": 1307,
    "topicTags": [
      "dfir",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "detect"
    ],
    "trackIds": [
      "dfir",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-3sYP19Ts48w",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 182,
    "title": "Share Files & Chat Privately Offline with a Raspberry Pi PirateBox [Tutorial]",
    "url": "https://www.youtube.com/watch?v=3sYP19Ts48w",
    "durationSec": 786,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "share"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tIM-kdmKhnE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 183,
    "title": "Build a Pumpkin Pi — A Rogue AP & MitM Framework That Fits in Your Pocket [Tutorial]",
    "url": "https://www.youtube.com/watch?v=tIM-kdmKhnE",
    "durationSec": 734,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "build"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-kY7RmZnMB8I",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 184,
    "title": "Boot Parrot Security, Kali & Other Operating Systems on a Raspberry Pi with BerryBoot [Tutorial]",
    "url": "https://www.youtube.com/watch?v=kY7RmZnMB8I",
    "durationSec": 690,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "boot"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-o95Or-Z_Ybk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 185,
    "title": "Track & Connect to Smartphones with a Beacon Swarm [Tutorial]",
    "url": "https://www.youtube.com/watch?v=o95Or-Z_Ybk",
    "durationSec": 1522,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-4yhhW2ekgN8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 186,
    "title": "Hijack FM Radio Stations with a Raspberry Pi [Tutorial]",
    "url": "https://www.youtube.com/watch?v=4yhhW2ekgN8",
    "durationSec": 694,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hijack"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-fKOX4InkaGc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 187,
    "title": "Set Up a Vulnerable Target Computer with DV-Pi (Damn Vulnerable Pi) [Tutorial]",
    "url": "https://www.youtube.com/watch?v=fKOX4InkaGc",
    "durationSec": 412,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "set"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-jIiaE9H6aXs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 188,
    "title": "Scan Wireless Networks Using Fing on Your Smartphone (& Connect to a Raspberry Pi) [Tutorial]",
    "url": "https://www.youtube.com/watch?v=jIiaE9H6aXs",
    "durationSec": 745,
    "topicTags": [
      "network",
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "scan"
    ],
    "trackIds": [
      "network",
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-j4giW6glvZ4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 189,
    "title": "Use CT-Exposer to Discover Internal Subdomains [Tutorial]",
    "url": "https://www.youtube.com/watch?v=j4giW6glvZ4",
    "durationSec": 497,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-wBl7HM6a4Wo",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 190,
    "title": "Explore & Map Nearby Wireless Networks with WiGLE [Tutorial]",
    "url": "https://www.youtube.com/watch?v=wBl7HM6a4Wo",
    "durationSec": 794,
    "topicTags": [
      "network",
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "explore"
    ],
    "trackIds": [
      "network",
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-KRKz-irsZdA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 191,
    "title": "Conduct OSINT Recon on Domains with Racoon Scanner [Tutorial]",
    "url": "https://www.youtube.com/watch?v=KRKz-irsZdA",
    "durationSec": 689,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "conduct"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-TQJ4vVLm5wM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 192,
    "title": "Conduct OSINT Investigations Online with Buscador OS [Tutorial]",
    "url": "https://www.youtube.com/watch?v=TQJ4vVLm5wM",
    "durationSec": 664,
    "topicTags": [
      "osint",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "conduct"
    ],
    "trackIds": [
      "osint",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-9UZh-4Er7BQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 193,
    "title": "Conceal Secret Messages or Data Through Steganography with Steghide [Tutorial]",
    "url": "https://www.youtube.com/watch?v=9UZh-4Er7BQ",
    "durationSec": 569,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "conceal"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-_L9UYbxj3lk",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 194,
    "title": "Automate Wi-Fi Hacking on a Raspberry Pi with a USB Rubber Ducky [Tutorial]",
    "url": "https://www.youtube.com/watch?v=_L9UYbxj3lk",
    "durationSec": 857,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "automate"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-iCKj0La4Grg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 195,
    "title": "Use Noisy.py to Cloak Your Internet Activity from Network Surveillance [Tutorial]",
    "url": "https://www.youtube.com/watch?v=iCKj0La4Grg",
    "durationSec": 482,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-mSZA69dyAPs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 196,
    "title": "Program a NodeMCU to Detect Wi-Fi Jamming [Tutorial]",
    "url": "https://www.youtube.com/watch?v=mSZA69dyAPs",
    "durationSec": 1049,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "program"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-l5SXMdxFLy4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 197,
    "title": "Set Up Aliasing in Your Mac's Bash Profile for Easier Wi-Fi Packet Captures [Tutorial]",
    "url": "https://www.youtube.com/watch?v=l5SXMdxFLy4",
    "durationSec": 494,
    "topicTags": [
      "network",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "set"
    ],
    "trackIds": [
      "network",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-HYwsJJuAYqc",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 198,
    "title": "Detect Amateur Wi-Fi Attacks from Aireplay-ng & MDK3 with Wireshark [Tutorial]",
    "url": "https://www.youtube.com/watch?v=HYwsJJuAYqc",
    "durationSec": 606,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "detect"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-Z8RHMUSYTiA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 199,
    "title": "Track Devices via Probe Frames with Probequest [Tutorial]",
    "url": "https://www.youtube.com/watch?v=Z8RHMUSYTiA",
    "durationSec": 669,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-wQV8QZLRO3U",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 200,
    "title": "Monitor Live Twitter Discussions with Maltego for Disinformation Attacks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=wQV8QZLRO3U",
    "durationSec": 528,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "monitor"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-PUQ1bMtft-o",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 201,
    "title": "Hack Wi-Fi & Networks with the Lazy Script Framework [Tutorial]",
    "url": "https://www.youtube.com/watch?v=PUQ1bMtft-o",
    "durationSec": 803,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hack"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-pcErNYk7vCs",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 202,
    "title": "Use Beginner Python to Build an SHA1 Hash Brute-Forcer [Tutorial]",
    "url": "https://www.youtube.com/watch?v=pcErNYk7vCs",
    "durationSec": 947,
    "topicTags": [
      "crypto",
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "crypto",
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-WTTreu43g5w",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 203,
    "title": "Defend Against 5 Common Wi-Fi Hacks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=WTTreu43g5w",
    "durationSec": 747,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "defend"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-kXm8f9fhaxQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 204,
    "title": "Disable a Wi-Fi Security Camera with Aireplay-ng [Tutorial]",
    "url": "https://www.youtube.com/watch?v=kXm8f9fhaxQ",
    "durationSec": 503,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "disable"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-u0YrWfze9es",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 205,
    "title": "Exploit a Router Using RouterSploit [Tutorial]",
    "url": "https://www.youtube.com/watch?v=u0YrWfze9es",
    "durationSec": 632,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "exploit"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-hPIhItC-Vr8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 206,
    "title": "Perform Network Fingerprinting with Maltego [Tutorial]",
    "url": "https://www.youtube.com/watch?v=hPIhItC-Vr8",
    "durationSec": 1177,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "perform"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-KQVG1OujkLM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 207,
    "title": "Steal Signal Conversations from a MacBook with a USB Rubber Ducky [Tutorial]",
    "url": "https://www.youtube.com/watch?v=KQVG1OujkLM",
    "durationSec": 788,
    "topicTags": [
      "crypto",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "steal"
    ],
    "trackIds": [
      "crypto",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-VExg83LzZ1Q",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 208,
    "title": "Find Employee Accounts with Password Breaches Using Maltego [Tutorial]",
    "url": "https://www.youtube.com/watch?v=VExg83LzZ1Q",
    "durationSec": 901,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "find"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-T8Xsi0Dne8o",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 209,
    "title": "Install Kali Linux on Windows 10 from the Microsoft Store (Windows Subsystem for Linux) [Tutorial]",
    "url": "https://www.youtube.com/watch?v=T8Xsi0Dne8o",
    "durationSec": 614,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "install"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-fKOorVJzQas",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 210,
    "title": "Search the Web Privately with Your Own Locally Hosted Searx Instance [Tutorial]",
    "url": "https://www.youtube.com/watch?v=fKOorVJzQas",
    "durationSec": 405,
    "topicTags": [
      "web",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "search"
    ],
    "trackIds": [
      "web",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-5ExWmpFnAnE",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 211,
    "title": "Set Up an Ethical Hacking Kali Linux Kit on the Raspberry Pi 3 B+ [Tutorial]",
    "url": "https://www.youtube.com/watch?v=5ExWmpFnAnE",
    "durationSec": 1426,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "set"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-01-Dcz1hFw8",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 212,
    "title": "Create Custom Wordlists with the Mentalist for Brute-Forcing [Tutorial]",
    "url": "https://www.youtube.com/watch?v=01-Dcz1hFw8",
    "durationSec": 908,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "create"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-rJXQYmG5uNY",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 213,
    "title": "Hunt Down & Crack WEP Wi-Fi Networks [Tutorial]",
    "url": "https://www.youtube.com/watch?v=rJXQYmG5uNY",
    "durationSec": 530,
    "topicTags": [
      "network",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hunt"
    ],
    "trackIds": [
      "network",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-SY0WMHTCCOM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 214,
    "title": "Hack WPA & WPA2 Wi-Fi Passwords with a Pixie-Dust Attack using Airgeddon [Tutorial]",
    "url": "https://www.youtube.com/watch?v=SY0WMHTCCOM",
    "durationSec": 783,
    "topicTags": [
      "wireless",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hack"
    ],
    "trackIds": [
      "wireless",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-taAD2z8spP0",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 215,
    "title": "Hack Hotel, Airplane & Coffee Shop Hotspots for Free Wi-Fi with MAC Spoofing [Tutorial]",
    "url": "https://www.youtube.com/watch?v=taAD2z8spP0",
    "durationSec": 619,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hack"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-J6Fm1Da5a4w",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 216,
    "title": "How to Use MITMf to Man-in-the-Middle Passwords Over Wi-Fi on Kali Linux [Tutorial]",
    "url": "https://www.youtube.com/watch?v=J6Fm1Da5a4w",
    "durationSec": 378,
    "topicTags": [
      "foundations",
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "how"
    ],
    "trackIds": [
      "foundations",
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-S85DU66xHiM",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 217,
    "title": "Use 2FA Keys to Access Your Advanced Protected Google Account on Any Device [Tutorial]",
    "url": "https://www.youtube.com/watch?v=S85DU66xHiM",
    "durationSec": 857,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-b7bpXlRHgqY",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 218,
    "title": "Track Down a Tinder Profile with Location Spoofing on Google Chrome [Tutorial]",
    "url": "https://www.youtube.com/watch?v=b7bpXlRHgqY",
    "durationSec": 559,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "track"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tJORRxdgu1E",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 219,
    "title": "Shut Down Phishing with U2F Security Keys & Google's Advanced Protection Program [Tutorial]",
    "url": "https://www.youtube.com/watch?v=tJORRxdgu1E",
    "durationSec": 286,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "shut"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-3v_bwtHIToQ",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 220,
    "title": "Use Kismet to Find & Monitor Nearby Wi-Fi Devices [Tutorial]",
    "url": "https://www.youtube.com/watch?v=3v_bwtHIToQ",
    "durationSec": 436,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "use"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ejTPWPGP0GA",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 221,
    "title": "Hacking Wi-Fi in Seconds with Airgeddon & Parrot Security OS [Tutorial]",
    "url": "https://www.youtube.com/watch?v=ejTPWPGP0GA",
    "durationSec": 934,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "hacking"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-hE_Kjav323U",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 222,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=hE_Kjav323U",
    "durationSec": null,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "private"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-ZBsh9cC3FH4",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 223,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=ZBsh9cC3FH4",
    "durationSec": null,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "private"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT-tM3dEAtNQzg",
    "courseId": "PL4zzNO1AFRUl8HhXpDFH8u-lIiqaBKuGT",
    "index": 224,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=tM3dEAtNQzg",
    "durationSec": null,
    "topicTags": [
      "pwn",
      "cyber",
      "weapons",
      "lab",
      "private"
    ],
    "trackIds": [
      "pwn"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-ux2eXNgDaw8",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 1,
    "title": "CISSP-Course introduction  (مقدمه عن الدوره )",
    "url": "https://www.youtube.com/watch?v=ux2eXNgDaw8",
    "durationSec": 871,
    "topicTags": [
      "foundations",
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "foundations",
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-3CRr9BekYfo",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 2,
    "title": "Cissp-Exam blue print",
    "url": "https://www.youtube.com/watch?v=3CRr9BekYfo",
    "durationSec": 2061,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-QU3pYAnwT6c",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 3,
    "title": "CISSP-Domain 1 - 1 Security and Risk management- Security Concepts and Purpose ..",
    "url": "https://www.youtube.com/watch?v=QU3pYAnwT6c",
    "durationSec": 2093,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-FKyYtVlIZoo",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 4,
    "title": "CISSP-Domain 1-2 Information Security Governance and Frameworks",
    "url": "https://www.youtube.com/watch?v=FKyYtVlIZoo",
    "durationSec": 4617,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-yuTjBePyhEQ",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 5,
    "title": "CISSP Domain 1-3 Information Security roles, documents and Personal security",
    "url": "https://www.youtube.com/watch?v=yuTjBePyhEQ",
    "durationSec": 4807,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-6G3Ir66l6-k",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 6,
    "title": "CISSP Domain 1-4 Risk Management",
    "url": "https://www.youtube.com/watch?v=6G3Ir66l6-k",
    "durationSec": 3523,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-PuHJEgnnrEw",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 7,
    "title": "CISSP - Domain 1-5 Business Continuity and Code of Ethics",
    "url": "https://www.youtube.com/watch?v=PuHJEgnnrEw",
    "durationSec": 3028,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-gjBHWHqt07c",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 8,
    "title": "CISSP- Domain 1-6 Threat Modeling",
    "url": "https://www.youtube.com/watch?v=gjBHWHqt07c",
    "durationSec": 2539,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-NtlwFRdhZIw",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 9,
    "title": "CISSP -Domain2-Asset Security",
    "url": "https://www.youtube.com/watch?v=NtlwFRdhZIw",
    "durationSec": 4696,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4-ibeBGOEidqA",
    "courseId": "PLwPnN230DSEAqIPD673UWoO770s5wYzz4",
    "index": 10,
    "title": "CISSP-Domain 3 -1  Security Engineering Development Architecture and Frameworks",
    "url": "https://www.youtube.com/watch?v=ibeBGOEidqA",
    "durationSec": 4173,
    "topicTags": [
      "wireless",
      "cissp",
      "exam",
      "preparation",
      "ahmed"
    ],
    "trackIds": [
      "wireless"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-jd6cd1TR2q0",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 1,
    "title": "1-introduction-cybrary web hacking course  مترجم",
    "url": "https://www.youtube.com/watch?v=jd6cd1TR2q0",
    "durationSec": 163,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-yArHhL6rWFU",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 2,
    "title": "2-Tools-cybrary web hacking course مترجم",
    "url": "https://www.youtube.com/watch?v=yArHhL6rWFU",
    "durationSec": 495,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-4c63MBvqnRA",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 3,
    "title": "3-Packets - cybrary web hacking course مترجم",
    "url": "https://www.youtube.com/watch?v=4c63MBvqnRA",
    "durationSec": 633,
    "topicTags": [
      "web",
      "network",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "network",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-MsZyxTnBmT0",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 4,
    "title": "4-HTTP Basics  cybrary - web hacking - course مترجم",
    "url": "https://www.youtube.com/watch?v=MsZyxTnBmT0",
    "durationSec": 635,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-gbwc09XTMnE",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 5,
    "title": "5-why sites get hacked(1)-cybrary - web hacking - course مترجم",
    "url": "https://www.youtube.com/watch?v=gbwc09XTMnE",
    "durationSec": 495,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-H9MIsTRurBc",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 6,
    "title": "6-why sites get hacked (2) cybrary - web hacking - course مترجم",
    "url": "https://www.youtube.com/watch?v=H9MIsTRurBc",
    "durationSec": 747,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-Imtg8dFrIP4",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 7,
    "title": "7-why sites get hacked (3) cybrary - web hacking - course مترجم",
    "url": "https://www.youtube.com/watch?v=Imtg8dFrIP4",
    "durationSec": 479,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-NxsPp22fh6k",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 8,
    "title": "8-why sites get hacked (4) cybrary | web hacking  course مترجم",
    "url": "https://www.youtube.com/watch?v=NxsPp22fh6k",
    "durationSec": 358,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo-P2ctCwPIkB4",
    "courseId": "PLgZN2PInJuiQhOwmaNhG6OH_DaGudMJuo",
    "index": 9,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=P2ctCwPIkB4",
    "durationSec": null,
    "topicTags": [
      "web",
      "foundations",
      "cybrary",
      "application",
      "pen"
    ],
    "trackIds": [
      "web",
      "foundations"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-hj8b2zAZeOM",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 1,
    "title": "session 1 - intro to pen testing",
    "url": "https://www.youtube.com/watch?v=hj8b2zAZeOM",
    "durationSec": 7552,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "intro",
      "pen"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-3WdYnty5n7o",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 2,
    "title": "session 2  - Scanning",
    "url": "https://www.youtube.com/watch?v=3WdYnty5n7o",
    "durationSec": 4916,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "scanning"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-m8JfuZtM2E4",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 3,
    "title": "session 3 - vulnerability scanning",
    "url": "https://www.youtube.com/watch?v=m8JfuZtM2E4",
    "durationSec": 6506,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "vulnerability",
      "scanning"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-XaX15p1YI1c",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 4,
    "title": "session 4 - Exploitation",
    "url": "https://www.youtube.com/watch?v=XaX15p1YI1c",
    "durationSec": 6738,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "exploitation"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-okBXbPkz_lc",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 5,
    "title": "session 5 - priv escalation for Linux",
    "url": "https://www.youtube.com/watch?v=okBXbPkz_lc",
    "durationSec": 8172,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "priv",
      "escalation"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-QFaQZxNKdFI",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 6,
    "title": "session 6 - windows priv escalation",
    "url": "https://www.youtube.com/watch?v=QFaQZxNKdFI",
    "durationSec": 6249,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "windows",
      "priv"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-wiyzB3U1uzI",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 7,
    "title": "session 7 - password attacks & AV evasion",
    "url": "https://www.youtube.com/watch?v=wiyzB3U1uzI",
    "durationSec": 6072,
    "topicTags": [
      "foundations",
      "web",
      "penetration",
      "testing",
      "password",
      "attacks"
    ],
    "trackIds": [
      "foundations",
      "web"
    ]
  },
  {
    "id": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X-zScbkq9xLfA",
    "courseId": "PL7QLnOrqAmwaZKK7fi4QgfLjOoQAVvH2X",
    "index": 8,
    "title": "session 8 - buffer overflow",
    "url": "https://www.youtube.com/watch?v=zScbkq9xLfA",
    "durationSec": 5863,
    "topicTags": [
      "pwn",
      "foundations",
      "web",
      "penetration",
      "testing",
      "buffer",
      "overflow"
    ],
    "trackIds": [
      "pwn",
      "foundations",
      "web"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-BI15fbH2MfQ",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 1,
    "title": "BugCast Ep:01  | زياد عبدالعظيم | Security Researching & Learning Tips",
    "url": "https://www.youtube.com/watch?v=BI15fbH2MfQ",
    "durationSec": 6210,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "security"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-kDLRK-zT_1Y",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 2,
    "title": "BugCast Ep:02 | محمود حامد | Bug Bounty Guide",
    "url": "https://www.youtube.com/watch?v=kDLRK-zT_1Y",
    "durationSec": 5799,
    "topicTags": [
      "web",
      "api",
      "bugcast",
      "podcast",
      "bug"
    ],
    "trackIds": [
      "web",
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-PyFHUZV9RrM",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 3,
    "title": "BugCast Ep:03 | معاذ عادل | Hack without learning programming",
    "url": "https://www.youtube.com/watch?v=PyFHUZV9RrM",
    "durationSec": 3197,
    "topicTags": [
      "foundations",
      "api",
      "bugcast",
      "podcast",
      "hack"
    ],
    "trackIds": [
      "foundations",
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-uuxACNbB6Zk",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 4,
    "title": "BugCast Ep:04 | صهيب ناصري | Advice for Bug Bounty @h4x0r_dz",
    "url": "https://www.youtube.com/watch?v=uuxACNbB6Zk",
    "durationSec": 4136,
    "topicTags": [
      "web",
      "api",
      "bugcast",
      "podcast",
      "advice"
    ],
    "trackIds": [
      "web",
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-b9IozcVPyfk",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 5,
    "title": "BugCast Ep:05 | ياسر علي | From 0 to working at Facebook (Meta)",
    "url": "https://www.youtube.com/watch?v=b9IozcVPyfk",
    "durationSec": 7869,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "from"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-kvrXmTkrhgI",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 6,
    "title": "BugCast Ep:06 | فادي عثمان | Hacker Mindset",
    "url": "https://www.youtube.com/watch?v=kvrXmTkrhgI",
    "durationSec": 8196,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "hacker"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-mQPvz3QtCMc",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 7,
    "title": "BugCast Ep:07 | محمد نصر | Shifting to Blue Team",
    "url": "https://www.youtube.com/watch?v=mQPvz3QtCMc",
    "durationSec": 5548,
    "topicTags": [
      "dfir",
      "api",
      "bugcast",
      "podcast",
      "shifting"
    ],
    "trackIds": [
      "dfir",
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-eYRLl8a8VZo",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 8,
    "title": "BugCast Ep:08 | السيد الرفاعي | Purple Team",
    "url": "https://www.youtube.com/watch?v=eYRLl8a8VZo",
    "durationSec": 4132,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "purple"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-RCsVZfue6TY",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 9,
    "title": "BugCast Ep:09 | حازم هشام | Day Life of Red Teamer",
    "url": "https://www.youtube.com/watch?v=RCsVZfue6TY",
    "durationSec": 5743,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "day"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-qWy25Czi-vM",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 10,
    "title": "BugCast Ep:10 | محمد فتحي | Find your First Job",
    "url": "https://www.youtube.com/watch?v=qWy25Czi-vM",
    "durationSec": 4138,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "find"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt--y-uDoaj5RM",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 11,
    "title": "BugCast Ep:11 | محمد سادات | Working as a Group CISO",
    "url": "https://www.youtube.com/watch?v=-y-uDoaj5RM",
    "durationSec": 4289,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "working"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-SXtVi7KtStA",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 12,
    "title": "BugCast Ep:12 | سيد عبدالحفيظ | How to Hack mobile apps",
    "url": "https://www.youtube.com/watch?v=SXtVi7KtStA",
    "durationSec": 4623,
    "topicTags": [
      "mobile",
      "api",
      "bugcast",
      "podcast",
      "how"
    ],
    "trackIds": [
      "mobile",
      "api"
    ]
  },
  {
    "id": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt-t1-TM7P3xrg",
    "courseId": "PLT3xpfeVr-PNhn6P3D5Gpet4NclXZstWt",
    "index": 13,
    "title": "BugCast Ep:13 | أحمد علاء الدين | Working in Application Security",
    "url": "https://www.youtube.com/watch?v=t1-TM7P3xrg",
    "durationSec": 3950,
    "topicTags": [
      "api",
      "bugcast",
      "podcast",
      "working"
    ],
    "trackIds": [
      "api"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-TYlts384PkE",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 1,
    "title": "Intro To Hardware Security",
    "url": "https://www.youtube.com/watch?v=TYlts384PkE",
    "durationSec": 10240,
    "topicTags": [
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "intro"
    ],
    "trackIds": [
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-_kQ4qGI6Z6A",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 2,
    "title": "Hack AD Like A Team Lead",
    "url": "https://www.youtube.com/watch?v=_kQ4qGI6Z6A",
    "durationSec": 4847,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "hack"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-ATn9lcQvE60",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 3,
    "title": "Breaking the Signal  Pentesting Wireless realms 20250316 220540 Meeting Recording",
    "url": "https://www.youtube.com/watch?v=ATn9lcQvE60",
    "durationSec": 7226,
    "topicTags": [
      "wireless",
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "breaking"
    ],
    "trackIds": [
      "wireless",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-L_YinWJz2Xo",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 4,
    "title": "Your Path to Android Penetration Testing",
    "url": "https://www.youtube.com/watch?v=L_YinWJz2Xo",
    "durationSec": 11493,
    "topicTags": [
      "mobile",
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "your"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-s74bOAogyTE",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 5,
    "title": "Threat detection engineering",
    "url": "https://www.youtube.com/watch?v=s74bOAogyTE",
    "durationSec": 8736,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "threat"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-qIgoNeA9nOw",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 6,
    "title": "Investigating the Hyperliquid Whale: A Real-Life OSINT Case Study",
    "url": "https://www.youtube.com/watch?v=qIgoNeA9nOw",
    "durationSec": 4912,
    "topicTags": [
      "osint",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "investigating"
    ],
    "trackIds": [
      "osint",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-81-5uEJhL-k",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 7,
    "title": "Intro to AI hacking",
    "url": "https://www.youtube.com/watch?v=81-5uEJhL-k",
    "durationSec": 5147,
    "topicTags": [
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "intro"
    ],
    "trackIds": [
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-2G2Bns5mbYY",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 8,
    "title": "Secure by Design: Strengthening Applications from the Ground Up",
    "url": "https://www.youtube.com/watch?v=2G2Bns5mbYY",
    "durationSec": 5565,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "secure"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-bxCH2Ws0maY",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 9,
    "title": "Phishing Analysis Techniques",
    "url": "https://www.youtube.com/watch?v=bxCH2Ws0maY",
    "durationSec": 8377,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "phishing"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-PMvqftBkIAI",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 10,
    "title": "From CV to job offer  Essential Tips & Tricks",
    "url": "https://www.youtube.com/watch?v=PMvqftBkIAI",
    "durationSec": 8706,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "from"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-LhNXcda5ay0",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 11,
    "title": "Introduction To Infostealer",
    "url": "https://www.youtube.com/watch?v=LhNXcda5ay0",
    "durationSec": 2631,
    "topicTags": [
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "introduction"
    ],
    "trackIds": [
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-sqwXhCBM7MQ",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 12,
    "title": "from infection To Detection  Intro To Malware Analysis",
    "url": "https://www.youtube.com/watch?v=sqwXhCBM7MQ",
    "durationSec": 9486,
    "topicTags": [
      "malware",
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "from"
    ],
    "trackIds": [
      "malware",
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-IY30Hno4pdo",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 13,
    "title": "Ethical Hacking Radio Stations",
    "url": "https://www.youtube.com/watch?v=IY30Hno4pdo",
    "durationSec": 6418,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "ethical"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-0YYlY583ZRU",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 14,
    "title": "Bug Bounty Hunting",
    "url": "https://www.youtube.com/watch?v=0YYlY583ZRU",
    "durationSec": 5588,
    "topicTags": [
      "web",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "bug"
    ],
    "trackIds": [
      "web",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-9zvRr2CM20k",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 15,
    "title": "Blue team Behind the scene",
    "url": "https://www.youtube.com/watch?v=9zvRr2CM20k",
    "durationSec": 5568,
    "topicTags": [
      "dfir",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "blue"
    ],
    "trackIds": [
      "dfir",
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-ojJizjY-xbg",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 16,
    "title": "BAC and PE Secrets in Bug Hunting and its Automation",
    "url": "https://www.youtube.com/watch?v=ojJizjY-xbg",
    "durationSec": 12060,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "bac"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-EzOVKNr1Q3s",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 17,
    "title": "Let's Break the Rules",
    "url": "https://www.youtube.com/watch?v=EzOVKNr1Q3s",
    "durationSec": 11273,
    "topicTags": [
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "let"
    ],
    "trackIds": [
      "cloud"
    ]
  },
  {
    "id": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf-Uo6vry4qr1k",
    "courseId": "PLtjqS4z_vA-xY2ekTPu2hk7kC4OwCZgWf",
    "index": 18,
    "title": "Back To Basics , Common Pitfalls during Security testing",
    "url": "https://www.youtube.com/watch?v=Uo6vry4qr1k",
    "durationSec": 6028,
    "topicTags": [
      "foundations",
      "cloud",
      "ramadan",
      "nights",
      "2025",
      "back"
    ],
    "trackIds": [
      "foundations",
      "cloud"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-FjiCbidb8v8",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 1,
    "title": "1- الفرق بين Authentication و Authorization | ثغرات Access Control",
    "url": "https://www.youtube.com/watch?v=FjiCbidb8v8",
    "durationSec": 516,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "authentication",
      "authorization"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-AaV67gn4FmU",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 2,
    "title": "Why I cannot get bounties in bugbounty field?",
    "url": "https://www.youtube.com/watch?v=AaV67gn4FmU",
    "durationSec": 616,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "why",
      "cannot"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-tclPuS57pU8",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 3,
    "title": "Attacks In Arabic - Race Condition (Time-Sensitive Bugs)",
    "url": "https://www.youtube.com/watch?v=tclPuS57pU8",
    "durationSec": 1725,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "attacks",
      "race"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-x98-sPJ_s1g",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 4,
    "title": "BugBounty Easy Money with Honey | RC, PE, FC, PD",
    "url": "https://www.youtube.com/watch?v=x98-sPJ_s1g",
    "durationSec": 971,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "bugbounty",
      "easy"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-g-WP_VpHQfo",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 5,
    "title": "Privilege Escalation + IDOR  2 Bugs 1 HIT POC's (Arabic)",
    "url": "https://www.youtube.com/watch?v=g-WP_VpHQfo",
    "durationSec": 719,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "privilege",
      "escalation"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-uJjVaOXEL1Y",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 6,
    "title": "Privilege escalation finding in external program explain (Arabic)",
    "url": "https://www.youtube.com/watch?v=uJjVaOXEL1Y",
    "durationSec": 779,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "privilege",
      "escalation"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-rq7DvjN1Gco",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 7,
    "title": "ما هو الـ API و ما فائدته في البرمجة؟ و كيف يعمل؟",
    "url": "https://www.youtube.com/watch?v=rq7DvjN1Gco",
    "durationSec": 327,
    "topicTags": [
      "api",
      "mobile",
      "fav",
      "bug"
    ],
    "trackIds": [
      "api",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-DIyJCPf-G_0",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 8,
    "title": "شرح ثغرات business logic error | مصادر للتطور الجزء السابع",
    "url": "https://www.youtube.com/watch?v=DIyJCPf-G_0",
    "durationSec": 614,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "business",
      "logic"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-vi_7rPYhPPg",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 9,
    "title": "AI Will Automate The IDORs (ChatGPT) !!",
    "url": "https://www.youtube.com/watch?v=vi_7rPYhPPg",
    "durationSec": 816,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "will",
      "automate"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-9cPHqIeAT84",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 10,
    "title": "Step-by-Step Guide To Get IDOR in Live Bug Bounty Programs | 2024 Tips",
    "url": "https://www.youtube.com/watch?v=9cPHqIeAT84",
    "durationSec": 731,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "step"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-iQYVFBF0qGo",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 11,
    "title": "Step By Step Guide To Get 2 'Privilege Escalation' In Live BugBounty Program",
    "url": "https://www.youtube.com/watch?v=iQYVFBF0qGo",
    "durationSec": 586,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "step"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-_zkxePwnf9A",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 12,
    "title": "[Bug Bounty] $3,000 Instagram delete highlight cover IDOR",
    "url": "https://www.youtube.com/watch?v=_zkxePwnf9A",
    "durationSec": 138,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "bounty"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-aP7W7zNTM2I",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 13,
    "title": "How To Use Jira Software For Beginners | Jira Project Management Software (2026)",
    "url": "https://www.youtube.com/watch?v=aP7W7zNTM2I",
    "durationSec": 521,
    "topicTags": [
      "foundations",
      "mobile",
      "fav",
      "bug",
      "how",
      "use"
    ],
    "trackIds": [
      "foundations",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-yufqeJLP1rI",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 14,
    "title": "Auth0 in 100 Seconds // And beyond with a Next.js Authentication Tutorial",
    "url": "https://www.youtube.com/watch?v=yufqeJLP1rI",
    "durationSec": 504,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "auth0",
      "100"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-WxhwxEV1WQc",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 15,
    "title": "IDOR  \"Send via Email\" - Magisto (PoC)",
    "url": "https://www.youtube.com/watch?v=WxhwxEV1WQc",
    "durationSec": 80,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "idor",
      "send"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-v-ObyM8qx0Y",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 16,
    "title": "Response Manipulation - Open Any Locked Profile (PoC)",
    "url": "https://www.youtube.com/watch?v=v-ObyM8qx0Y",
    "durationSec": 137,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "response",
      "manipulation"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-hmlkUYJ9MFw",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 17,
    "title": "How I made 1k in a day with IDORs! (10 Tips!)",
    "url": "https://www.youtube.com/watch?v=hmlkUYJ9MFw",
    "durationSec": 1389,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "how",
      "made"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-FKYykwxa68w",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 18,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=FKYykwxa68w",
    "durationSec": null,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "private",
      "video"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-MiSL5JzW6ms",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 19,
    "title": "IDOR with EXIF Vulnerability | Bug Bounty POC",
    "url": "https://www.youtube.com/watch?v=MiSL5JzW6ms",
    "durationSec": 136,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "idor",
      "with"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-wx5TwS0Dres",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 20,
    "title": "IDOR - how to predict an identifier? Bug bounty case study",
    "url": "https://www.youtube.com/watch?v=wx5TwS0Dres",
    "durationSec": 1435,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "idor",
      "how"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-XuunRT1DDZs",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 21,
    "title": "I QUIT RECON... and made $10,000 in bounties!",
    "url": "https://www.youtube.com/watch?v=XuunRT1DDZs",
    "durationSec": 681,
    "topicTags": [
      "osint",
      "mobile",
      "fav",
      "bug",
      "quit",
      "recon..."
    ],
    "trackIds": [
      "osint",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-K65e5QRQ1tc",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 22,
    "title": "Automating Permission Checks Using OpenAPI Security Scanner?",
    "url": "https://www.youtube.com/watch?v=K65e5QRQ1tc",
    "durationSec": 269,
    "topicTags": [
      "api",
      "mobile",
      "fav",
      "bug",
      "automating",
      "permission"
    ],
    "trackIds": [
      "api",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-3IqrBm0KrPw",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 23,
    "title": "BUG BOUNTY POC | Broken Access Control",
    "url": "https://www.youtube.com/watch?v=3IqrBm0KrPw",
    "durationSec": 62,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "bounty"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-4h42AFrpyK0",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 24,
    "title": "Ask Yourself These Four Questions When Bug Bounty Hunting for IDORs",
    "url": "https://www.youtube.com/watch?v=4h42AFrpyK0",
    "durationSec": 348,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "ask",
      "yourself"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-im1Qa9n-1KA",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 25,
    "title": "BugBounty Hunting Podcast (EPS.1) - Muhammed K. Sayed | @mux0x",
    "url": "https://www.youtube.com/watch?v=im1Qa9n-1KA",
    "durationSec": 4656,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "bugbounty",
      "hunting"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-yV7O-QRyOao",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 26,
    "title": "Client Side Protecting Bypass [Business Logic Bug] PoC - Jwplayer.com",
    "url": "https://www.youtube.com/watch?v=yV7O-QRyOao",
    "durationSec": 122,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "client",
      "side"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-bavdbzJHW5Q",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 27,
    "title": "EASY $1000 PRICE MANIPULATION BUG | BUSINESS LOGIC VULNERABILITY BUG POC",
    "url": "https://www.youtube.com/watch?v=bavdbzJHW5Q",
    "durationSec": 168,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "easy",
      "1000"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-Vb4md5w6JJ8",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 28,
    "title": "36- شرح ثغرات ال CSRF مع مثال علي ثغرة خطيرة في موقع تويتر",
    "url": "https://www.youtube.com/watch?v=Vb4md5w6JJ8",
    "durationSec": 1784,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "csrf"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-Ael3hqxe2-s",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 29,
    "title": "[Private video]",
    "url": "https://www.youtube.com/watch?v=Ael3hqxe2-s",
    "durationSec": null,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "private",
      "video"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-M0YjAN-EIy4",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 30,
    "title": "Attacks in Arabic: Response Manipulation | What's it, Why it happens, where could it be?",
    "url": "https://www.youtube.com/watch?v=M0YjAN-EIy4",
    "durationSec": 686,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "attacks",
      "response"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-YXWaDIZyLfg",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 31,
    "title": "Response manipulation leads to purchase free items (Arabic)",
    "url": "https://www.youtube.com/watch?v=YXWaDIZyLfg",
    "durationSec": 445,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "response",
      "manipulation"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-ANlHnemhl3g",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 32,
    "title": "No Rate limit | Bug bounty POC | #bugbountypoc",
    "url": "https://www.youtube.com/watch?v=ANlHnemhl3g",
    "durationSec": 160,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "rate",
      "limit"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-EB9sqPvlLlE",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 33,
    "title": "[Deleted video]",
    "url": "https://www.youtube.com/watch?v=EB9sqPvlLlE",
    "durationSec": null,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "deleted",
      "video"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-gH-X-Fx8SnM",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 34,
    "title": "Unique Password Reset Flaw: PoC | Bug Bounty",
    "url": "https://www.youtube.com/watch?v=gH-X-Fx8SnM",
    "durationSec": 124,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "unique",
      "password"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-Id5j9XBWURk",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 35,
    "title": "OTP Bypass Vulnerability Via Brute-Forcing : PoC | Bug Bounty",
    "url": "https://www.youtube.com/watch?v=Id5j9XBWURk",
    "durationSec": 231,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "otp",
      "bypass"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-y3HMsDJ1Esg",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 36,
    "title": "Business logic error/Excessive trust in client Side Request: PoC | Bug Bounty",
    "url": "https://www.youtube.com/watch?v=y3HMsDJ1Esg",
    "durationSec": 132,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "business",
      "logic"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-1228cGGa4E4",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 37,
    "title": "Weird Logic Scenario I faced",
    "url": "https://www.youtube.com/watch?v=1228cGGa4E4",
    "durationSec": 449,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "weird",
      "logic"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-IzpCHKy3HAU",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 38,
    "title": "SSRFIDOR | What am i talking about?",
    "url": "https://www.youtube.com/watch?v=IzpCHKy3HAU",
    "durationSec": 487,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "ssrfidor",
      "what"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-g_bLZnjYTYI",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 39,
    "title": "Portswigger Labs - Solving New API Testing Path Labs (Part 2)",
    "url": "https://www.youtube.com/watch?v=g_bLZnjYTYI",
    "durationSec": 575,
    "topicTags": [
      "api",
      "foundations",
      "mobile",
      "fav",
      "bug",
      "portswigger",
      "labs"
    ],
    "trackIds": [
      "api",
      "foundations",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-dJqFZDh5eRs",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 40,
    "title": "IDOR (Insecure Direct Object Reference) Vulnerability Bug Bounty Program",
    "url": "https://www.youtube.com/watch?v=dJqFZDh5eRs",
    "durationSec": 480,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "idor",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-7eVwAzXCrgA",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 41,
    "title": "Discovering Logic Bugs and Access Control in Real-World Targets",
    "url": "https://www.youtube.com/watch?v=7eVwAzXCrgA",
    "durationSec": 2117,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "discovering",
      "logic"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-kdCawzxWdDY",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 42,
    "title": "The key to succeed in bug bounty - @NahamSec",
    "url": "https://www.youtube.com/watch?v=kdCawzxWdDY",
    "durationSec": 4222,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "the",
      "key"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-dMZAWtLHiqU",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 43,
    "title": "My Two years of experience in bug hunting",
    "url": "https://www.youtube.com/watch?v=dMZAWtLHiqU",
    "durationSec": 1856,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "two",
      "years"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-BmEn8DWDo38",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 44,
    "title": "Race Conditions Bug POC",
    "url": "https://www.youtube.com/watch?v=BmEn8DWDo38",
    "durationSec": 148,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "race",
      "conditions"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-oLv3C7O-8_o",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 45,
    "title": "Race condition vulnerability poc | bug bounty |",
    "url": "https://www.youtube.com/watch?v=oLv3C7O-8_o",
    "durationSec": 60,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "race",
      "condition"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-wCLbLfN3ZS4",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 46,
    "title": "Session For CATReloaded : Power of Understanding Website Logic",
    "url": "https://www.youtube.com/watch?v=wCLbLfN3ZS4",
    "durationSec": 7637,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "for",
      "catreloaded"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-lkl22mnw8eY",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 47,
    "title": "Zero-Click Electricity Consumer Account Takeover on www.apdcl.org | POC #3",
    "url": "https://www.youtube.com/watch?v=lkl22mnw8eY",
    "durationSec": 98,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "zero",
      "click"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-4wd5iL-x3z4",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 48,
    "title": "Bug Bounty Poc | Privilege Escalation from Users to Admin $$",
    "url": "https://www.youtube.com/watch?v=4wd5iL-x3z4",
    "durationSec": 88,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "bounty"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-dUDTDglKAPw",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 49,
    "title": "Race Condition Vulnerability  | Bug Bounty PoC",
    "url": "https://www.youtube.com/watch?v=dUDTDglKAPw",
    "durationSec": 81,
    "topicTags": [
      "web",
      "mobile",
      "fav",
      "bug",
      "race",
      "condition"
    ],
    "trackIds": [
      "web",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-GE7BuEWEtSU",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 50,
    "title": "[Deleted video]",
    "url": "https://www.youtube.com/watch?v=GE7BuEWEtSU",
    "durationSec": null,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "deleted",
      "video"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-IaUl6g82C1Q",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 51,
    "title": "Logic Bugs Are The Best",
    "url": "https://www.youtube.com/watch?v=IaUl6g82C1Q",
    "durationSec": 991,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "logic",
      "bugs"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-00rZJFMrLlE",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 52,
    "title": "Hacking GraphQL | Easy $$ By Breaking Logic Workflow",
    "url": "https://www.youtube.com/watch?v=00rZJFMrLlE",
    "durationSec": 442,
    "topicTags": [
      "api",
      "mobile",
      "fav",
      "bug",
      "hacking",
      "graphql"
    ],
    "trackIds": [
      "api",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-lcfwvb1-GLM",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 53,
    "title": "PWN WordPress admin panel (Arabic)",
    "url": "https://www.youtube.com/watch?v=lcfwvb1-GLM",
    "durationSec": 479,
    "topicTags": [
      "pwn",
      "mobile",
      "fav",
      "bug",
      "wordpress"
    ],
    "trackIds": [
      "pwn",
      "mobile"
    ]
  },
  {
    "id": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx-iplhAO9KtsQ",
    "courseId": "PLlPyr6ELnn9WjTqNklFOTABogKz_6yqbx",
    "index": 54,
    "title": "[Deleted video]",
    "url": "https://www.youtube.com/watch?v=iplhAO9KtsQ",
    "durationSec": null,
    "topicTags": [
      "mobile",
      "fav",
      "bug",
      "deleted",
      "video"
    ],
    "trackIds": [
      "mobile"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-vz7amNXvlhY",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 1,
    "title": "Introduction to #Mobile #Penetration Testing",
    "url": "https://www.youtube.com/watch?v=vz7amNXvlhY",
    "durationSec": 1192,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "introduction"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-vozCSB3JNQ8",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 2,
    "title": "Brief Introduction on #Android Architecture and Android compilation.",
    "url": "https://www.youtube.com/watch?v=vozCSB3JNQ8",
    "durationSec": 693,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "brief"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-ILzXzbqsxmg",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 3,
    "title": "#Dynamic analysis Lab setup for Mobile. #Burpsuite #genymotion",
    "url": "https://www.youtube.com/watch?v=ILzXzbqsxmg",
    "durationSec": 1304,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "#dynamic"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-H7rZ9ai297I",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 4,
    "title": "#Mobile #Pentesting Lab Part-2, #jadx #adb #apktool",
    "url": "https://www.youtube.com/watch?v=H7rZ9ai297I",
    "durationSec": 992,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "#mobile"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-GWfv6133G_8",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 5,
    "title": "Installing #Mobsf Mobile-Security Framework, #SAST #DAST",
    "url": "https://www.youtube.com/watch?v=GWfv6133G_8",
    "durationSec": 1021,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "installing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-a255VGZn8dk",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 6,
    "title": "Static analysis of mobile application #Jadx #SecretKeys",
    "url": "https://www.youtube.com/watch?v=a255VGZn8dk",
    "durationSec": 1632,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "static"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-fbXfLdtmYfE",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 7,
    "title": "Dynamic analysis of #android #Application | #androidpentesting",
    "url": "https://www.youtube.com/watch?v=fbXfLdtmYfE",
    "durationSec": 1533,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "dynamic"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-ZMblrlAlFXA",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 8,
    "title": "Improper Platform usage - 1 | #androidpentesting #owasp top 1 Mobile,",
    "url": "https://www.youtube.com/watch?v=ZMblrlAlFXA",
    "durationSec": 1161,
    "topicTags": [
      "web",
      "mobile",
      "pwn",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "improper"
    ],
    "trackIds": [
      "web",
      "mobile",
      "pwn",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-I8j9YIQjMWc",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 9,
    "title": "Insecure data Storage |  #androidpentesting #owasp top 2 Mobile,",
    "url": "https://www.youtube.com/watch?v=I8j9YIQjMWc",
    "durationSec": 1312,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-eqkvroYnmyo",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 10,
    "title": "Insecure communication - 3 |  #androidpentesting #owasp top 3 Mobile,",
    "url": "https://www.youtube.com/watch?v=eqkvroYnmyo",
    "durationSec": 890,
    "topicTags": [
      "web",
      "mobile",
      "social",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile",
      "social",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-4HhHs-JUmF8",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 11,
    "title": "Insecure authentication  |  #androidpentesting #owasp top 4 Mobile,",
    "url": "https://www.youtube.com/watch?v=4HhHs-JUmF8",
    "durationSec": 609,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-vwrFoMoB9nE",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 12,
    "title": "Multiple ways to #bypass #Android #SSL #PINNING | #frida #objection #apkmitm - BONUS TUTORIAL",
    "url": "https://www.youtube.com/watch?v=vwrFoMoB9nE",
    "durationSec": 842,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "android",
      "pentesting",
      "series",
      "multiple"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-drKnPGdz35Y",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 13,
    "title": "Insufficient cryptography |  #androidpentesting #owasp top 5 Mobile,",
    "url": "https://www.youtube.com/watch?v=drKnPGdz35Y",
    "durationSec": 326,
    "topicTags": [
      "web",
      "mobile",
      "crypto",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "insufficient"
    ],
    "trackIds": [
      "web",
      "mobile",
      "crypto",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-wceNGmfv0zk",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 14,
    "title": "Insecure authorization |  #androidpentesting #owasp top 6 Mobile,",
    "url": "https://www.youtube.com/watch?v=wceNGmfv0zk",
    "durationSec": 929,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "insecure"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-G5Kq98VWwKY",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 15,
    "title": "Poor code quality |  #androidpentesting #owasp top  Mobile,",
    "url": "https://www.youtube.com/watch?v=G5Kq98VWwKY",
    "durationSec": 605,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "poor"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-4L0OxDe4Bpg",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 16,
    "title": "Code tampering |  #androidpentesting #owasp top 8 Mobile,",
    "url": "https://www.youtube.com/watch?v=4L0OxDe4Bpg",
    "durationSec": 350,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "code"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-LvNSQ5GxR5g",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 17,
    "title": "Reverse engineering  |  #androidpentesting #owasp top 9 Mobile,",
    "url": "https://www.youtube.com/watch?v=LvNSQ5GxR5g",
    "durationSec": 353,
    "topicTags": [
      "web",
      "malware",
      "mobile",
      "foundations",
      "android",
      "pentesting",
      "series",
      "reverse"
    ],
    "trackIds": [
      "web",
      "malware",
      "mobile",
      "foundations"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-AdssITGKFTo",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 18,
    "title": "Extraneous Functionality |  #androidpentesting #owasp top 10 Mobile,",
    "url": "https://www.youtube.com/watch?v=AdssITGKFTo",
    "durationSec": 326,
    "topicTags": [
      "web",
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "extraneous"
    ],
    "trackIds": [
      "web",
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14-Sy09edb57hg",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 19,
    "title": "Installing Xposed Framework | Rootcloak | Inspeckage | SSLunpin | Xposed modules",
    "url": "https://www.youtube.com/watch?v=Sy09edb57hg",
    "durationSec": 340,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "installing"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14--rrQu7ziZdU",
    "courseId": "PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14",
    "index": 20,
    "title": "Automate the Drozer to find the vulnerabilities in android components | Android scanner | drozer",
    "url": "https://www.youtube.com/watch?v=-rrQu7ziZdU",
    "durationSec": 396,
    "topicTags": [
      "mobile",
      "foundations",
      "malware",
      "android",
      "pentesting",
      "series",
      "automate"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "malware"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-io2lCB5Tc6A",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 1,
    "title": "1 Full Free Android Application Security Course",
    "url": "https://www.youtube.com/watch?v=io2lCB5Tc6A",
    "durationSec": 63,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-7s-PLmYs3VI",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 2,
    "title": "1.1 Android Application Security   Introduction",
    "url": "https://www.youtube.com/watch?v=7s-PLmYs3VI",
    "durationSec": 284,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-MPMWsEir-2o",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 3,
    "title": "2.1 Android Architecture   Introduction 1",
    "url": "https://www.youtube.com/watch?v=MPMWsEir-2o",
    "durationSec": 142,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-V5U6qTLId1o",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 4,
    "title": "2.2 Android Architecture Linux Kernel",
    "url": "https://www.youtube.com/watch?v=V5U6qTLId1o",
    "durationSec": 239,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-JP3NnypAS6Y",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 5,
    "title": "2.3 Android Architecture  HAL",
    "url": "https://www.youtube.com/watch?v=JP3NnypAS6Y",
    "durationSec": 128,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-zSReeluIhuI",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 6,
    "title": "2.4 Android Architecture - Libraries + Runtime",
    "url": "https://www.youtube.com/watch?v=zSReeluIhuI",
    "durationSec": 239,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-DWAMOMgBOOk",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 7,
    "title": "2.5 Android Architecture   Java API s & Apps",
    "url": "https://www.youtube.com/watch?v=DWAMOMgBOOk",
    "durationSec": 159,
    "topicTags": [
      "api",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "api",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-wCB66c28MLs",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 8,
    "title": "2.6 Android Security",
    "url": "https://www.youtube.com/watch?v=wCB66c28MLs",
    "durationSec": 427,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-AM0adAla9hA",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 9,
    "title": "2.7 Android Application Structure",
    "url": "https://www.youtube.com/watch?v=AM0adAla9hA",
    "durationSec": 689,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-yOAZo40J_S0",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 10,
    "title": "2.8 Android Application Structure IPC",
    "url": "https://www.youtube.com/watch?v=yOAZo40J_S0",
    "durationSec": 172,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-6yR1Y1IwCeg",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 11,
    "title": "2.9 Android Application Publishing",
    "url": "https://www.youtube.com/watch?v=6yR1Y1IwCeg",
    "durationSec": 205,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-ogmTCK-2Dhs",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 12,
    "title": "3.1 Android Pen testing Basics  Host software setup",
    "url": "https://www.youtube.com/watch?v=ogmTCK-2Dhs",
    "durationSec": 172,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-4yijmR52IKI",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 13,
    "title": "3.2 Android Pen testing Basics ADB",
    "url": "https://www.youtube.com/watch?v=4yijmR52IKI",
    "durationSec": 216,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-Pv7CGm-_EhM",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 14,
    "title": "3.3 Android Pen testing basics   local device setup",
    "url": "https://www.youtube.com/watch?v=Pv7CGm-_EhM",
    "durationSec": 247,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-uQ8SVWO0zEI",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 15,
    "title": "3.4 Android Pentesting basics - MHL device setup",
    "url": "https://www.youtube.com/watch?v=uQ8SVWO0zEI",
    "durationSec": 147,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-1lNywTF3Xm0",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 16,
    "title": "3.5 Intercepting Network traffic   Introduction redited",
    "url": "https://www.youtube.com/watch?v=1lNywTF3Xm0",
    "durationSec": 419,
    "topicTags": [
      "network",
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "network",
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-r0NqCzAx-_o",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 17,
    "title": "3.6 Android Pen testing Basics - Intercepting mobile network traffic",
    "url": "https://www.youtube.com/watch?v=r0NqCzAx-_o",
    "durationSec": 336,
    "topicTags": [
      "network",
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "network",
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-Rg9LKHOnj6c",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 18,
    "title": "3.7 Android Pen testing Basics   Frida introduction enhanced",
    "url": "https://www.youtube.com/watch?v=Rg9LKHOnj6c",
    "durationSec": 276,
    "topicTags": [
      "malware",
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-0800Ez1yRDk",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 19,
    "title": "3.8 Frida Usage and Interceptor Example",
    "url": "https://www.youtube.com/watch?v=0800Ez1yRDk",
    "durationSec": 471,
    "topicTags": [
      "malware",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-Z4jV4y1Y_1k",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 20,
    "title": "3.9 Dynamic instrumentation with Frida CodeShare demo",
    "url": "https://www.youtube.com/watch?v=Z4jV4y1Y_1k",
    "durationSec": 319,
    "topicTags": [
      "malware",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-ux9keprxDzY",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 21,
    "title": "3.10 Android Pentesting Basics using MobSF",
    "url": "https://www.youtube.com/watch?v=ux9keprxDzY",
    "durationSec": 514,
    "topicTags": [
      "mobile",
      "foundations",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "foundations",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-ojJ_eQNgEAM",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 22,
    "title": "4.1 Reversing Android Apps into and pulling the APK",
    "url": "https://www.youtube.com/watch?v=ojJ_eQNgEAM",
    "durationSec": 206,
    "topicTags": [
      "malware",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-hlDvegk4keY",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 23,
    "title": "4.2 Android Reverse Engineering using Apktool",
    "url": "https://www.youtube.com/watch?v=hlDvegk4keY",
    "durationSec": 264,
    "topicTags": [
      "malware",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-t0pA6rD7MGA",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 24,
    "title": "4.3 Android Reverse Engineering using JADX",
    "url": "https://www.youtube.com/watch?v=t0pA6rD7MGA",
    "durationSec": 157,
    "topicTags": [
      "malware",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "malware",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-ezx6nwQFxck",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 25,
    "title": "5.1 Android Application Attack Surface",
    "url": "https://www.youtube.com/watch?v=ezx6nwQFxck",
    "durationSec": 556,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-8gUGUmSTHUg",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 26,
    "title": "5.2 Exploiting Android Exported Activities",
    "url": "https://www.youtube.com/watch?v=8gUGUmSTHUg",
    "durationSec": 449,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-HCPF39T_faM",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 27,
    "title": "5.3 Exploiting Android Exported Services",
    "url": "https://www.youtube.com/watch?v=HCPF39T_faM",
    "durationSec": 231,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-yU8MpaWdsSY",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 28,
    "title": "5.4 Exploiting Android Exported Broadcast Receivers",
    "url": "https://www.youtube.com/watch?v=yU8MpaWdsSY",
    "durationSec": 338,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-bFpKf5KixaE",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 29,
    "title": "5.5 Exploiting Android Deep Links",
    "url": "https://www.youtube.com/watch?v=bFpKf5KixaE",
    "durationSec": 351,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-c_-qNSk6-Z4",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 30,
    "title": "5.6 Exploit Android Data Storage",
    "url": "https://www.youtube.com/watch?v=c_-qNSk6-Z4",
    "durationSec": 452,
    "topicTags": [
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr-mIWN5Qr6enA",
    "courseId": "PLwOCu7hSL9MqBeEZUgV5-6n3z4Xw-yaMr",
    "index": 31,
    "title": "5.7 Exploiting Android SQL Injections",
    "url": "https://www.youtube.com/watch?v=mIWN5Qr6enA",
    "durationSec": 335,
    "topicTags": [
      "web",
      "mobile",
      "dfir",
      "free",
      "android",
      "application",
      "security"
    ],
    "trackIds": [
      "web",
      "mobile",
      "dfir"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-UnUHasLkjFk",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 1,
    "title": "Testing workshops  session 1",
    "url": "https://www.youtube.com/watch?v=UnUHasLkjFk",
    "durationSec": 7154,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-A5ewKMpWaeY",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 2,
    "title": "Testing Workshops session2",
    "url": "https://www.youtube.com/watch?v=A5ewKMpWaeY",
    "durationSec": 1848,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-4dKkFpQ88oI",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 3,
    "title": "Testing Workshops session 3 Requirements Review",
    "url": "https://www.youtube.com/watch?v=4dKkFpQ88oI",
    "durationSec": 8121,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-wT5hapqx804",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 4,
    "title": "Testing Workshops Session 4 Design TCs",
    "url": "https://www.youtube.com/watch?v=wT5hapqx804",
    "durationSec": 11189,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-Cg8ltySNOSE",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 5,
    "title": "Testin workshops session 5 Q&A",
    "url": "https://www.youtube.com/watch?v=Cg8ltySNOSE",
    "durationSec": 8020,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "testin"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-BImtN66bRWA",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 6,
    "title": "Testing Workshops session 6 Agile",
    "url": "https://www.youtube.com/watch?v=BImtN66bRWA",
    "durationSec": 8644,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-PmTG1ncz3ew",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 7,
    "title": "Testing Workshops session 7 DB",
    "url": "https://www.youtube.com/watch?v=PmTG1ncz3ew",
    "durationSec": 7261,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-BB6zg0m6_aY",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 8,
    "title": "Testing Workshops Session 8 APIs [part#1]",
    "url": "https://www.youtube.com/watch?v=BB6zg0m6_aY",
    "durationSec": 7999,
    "topicTags": [
      "api",
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "api",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-b6NqjRo78mU",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 9,
    "title": "testing workshops session 9 APIs part2",
    "url": "https://www.youtube.com/watch?v=b6NqjRo78mU",
    "durationSec": 8447,
    "topicTags": [
      "api",
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "api",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-CHMhHKwOuvE",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 10,
    "title": "workshops session10 Bug Reporting",
    "url": "https://www.youtube.com/watch?v=CHMhHKwOuvE",
    "durationSec": 6276,
    "topicTags": [
      "social",
      "foundations",
      "testing",
      "workshops",
      "session10"
    ],
    "trackIds": [
      "social",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-0sqmgPW6hFc",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 11,
    "title": "Testing Workshops Session 11 Azure&Questions",
    "url": "https://www.youtube.com/watch?v=0sqmgPW6hFc",
    "durationSec": 9383,
    "topicTags": [
      "cloud",
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "cloud",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-wEQlQZ6Dmz8",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 12,
    "title": "testing workshops 12 Java session1",
    "url": "https://www.youtube.com/watch?v=wEQlQZ6Dmz8",
    "durationSec": 8856,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-O30IV83BFzY",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 13,
    "title": "testing workshops _13_Java session 2",
    "url": "https://www.youtube.com/watch?v=O30IV83BFzY",
    "durationSec": 9564,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-xH36tjS0ZQ0",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 14,
    "title": "Java Session 3 Testing Workshops",
    "url": "https://www.youtube.com/watch?v=xH36tjS0ZQ0",
    "durationSec": 9594,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "java"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-jY11LBKHGeM",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 15,
    "title": "Java Session 4 (OOP & Maven)",
    "url": "https://www.youtube.com/watch?v=jY11LBKHGeM",
    "durationSec": 11254,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "java",
      "oop"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-BHW1x5e7zFg",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 16,
    "title": "Testing Workshops Session 5 TestNG",
    "url": "https://www.youtube.com/watch?v=BHW1x5e7zFg",
    "durationSec": 11015,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-BqUyve-rC8s",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 17,
    "title": "Testing workshops selenium part1",
    "url": "https://www.youtube.com/watch?v=BqUyve-rC8s",
    "durationSec": 11373,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-vT1SZf0DlHw",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 18,
    "title": "testing workshop selenium part2",
    "url": "https://www.youtube.com/watch?v=vT1SZf0DlHw",
    "durationSec": 10086,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "workshop"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-MGZXn_JG8cs",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 19,
    "title": "testing workshops Design Patterns",
    "url": "https://www.youtube.com/watch?v=MGZXn_JG8cs",
    "durationSec": 10277,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-fTcjvsjiKBs",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 20,
    "title": "Reset Assured First Session",
    "url": "https://www.youtube.com/watch?v=fTcjvsjiKBs",
    "durationSec": 8761,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "reset",
      "assured"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-plLMXvAkTPA",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 21,
    "title": "workshops rest assured 2",
    "url": "https://www.youtube.com/watch?v=plLMXvAkTPA",
    "durationSec": 7712,
    "topicTags": [
      "api",
      "foundations",
      "testing",
      "workshops",
      "rest"
    ],
    "trackIds": [
      "api",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-1u6pQ1GMyx0",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 22,
    "title": "WorkShops RestAssured 3",
    "url": "https://www.youtube.com/watch?v=1u6pQ1GMyx0",
    "durationSec": 6599,
    "topicTags": [
      "api",
      "foundations",
      "testing",
      "workshops",
      "restassured"
    ],
    "trackIds": [
      "api",
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-e-O8SUwiDTw",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 23,
    "title": "GIT Session 1 Testing Workshops",
    "url": "https://www.youtube.com/watch?v=e-O8SUwiDTw",
    "durationSec": 9354,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "git"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ--KmhmEwM81U",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 24,
    "title": "Testing Workshops GIT Session 2",
    "url": "https://www.youtube.com/watch?v=-KmhmEwM81U",
    "durationSec": 6899,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-MHomSnaUE1Q",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 25,
    "title": "WorkShops performance",
    "url": "https://www.youtube.com/watch?v=MHomSnaUE1Q",
    "durationSec": 7680,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "performance"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-XnVAO0jppGs",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 26,
    "title": "workshops SHAFT",
    "url": "https://www.youtube.com/watch?v=XnVAO0jppGs",
    "durationSec": 10746,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "shaft"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-0olJQfqtM7E",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 27,
    "title": "Workshops_ Appium",
    "url": "https://www.youtube.com/watch?v=0olJQfqtM7E",
    "durationSec": 10713,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "appium"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-Kif9w4Btyv4",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 28,
    "title": "workshops Soft Skills",
    "url": "https://www.youtube.com/watch?v=Kif9w4Btyv4",
    "durationSec": 6839,
    "topicTags": [
      "foundations",
      "testing",
      "workshops",
      "soft"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-9G-xj36OdCo",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 29,
    "title": "workshops AI",
    "url": "https://www.youtube.com/watch?v=9G-xj36OdCo",
    "durationSec": 6585,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-eoC0f7kp2ro",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 30,
    "title": "workshops CI CD",
    "url": "https://www.youtube.com/watch?v=eoC0f7kp2ro",
    "durationSec": 7564,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  },
  {
    "id": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ-RHBRwn1T57o",
    "courseId": "PL594OqWI4Um4qn5S5YyUQwEOimJ9sXbfZ",
    "index": 31,
    "title": "سيشن الختام",
    "url": "https://www.youtube.com/watch?v=RHBRwn1T57o",
    "durationSec": 8861,
    "topicTags": [
      "foundations",
      "testing",
      "workshops"
    ],
    "trackIds": [
      "foundations"
    ]
  }
];

const COURSE_BY_ID=Object.fromEntries(COURSES.map(c=>[c.id,c]));
const COURSE_LESSONS=COURSES.reduce((acc,c)=>({...acc,[c.id]:LESSONS.filter(l=>l.courseId===c.id)}),{});
const RESOURCE_INDEX=TRACK_ORDER.flatMap(tid=>{
  const track=TRACKS[tid];
  if(!track)return[];
  return track.phases.flatMap(ph=>ph.resources.map(r=>({...r,tid,phase:ph.name,trackName:track.name,trackIcon:track.icon,trackColor:track.color})));
});

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const STORAGE_KEY="cyberpath_v3";
const DAILY_SESSION_COUNT=3;
const SESSION_TARGET_MIN=90;
const DEFAULT_LESSON_MIN=30;
const STUDY_DAYS=[0,1,2,3,4,6];
const AR_DAYS=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const D0={xp:0,currentWeek:1,streak:0,bestStreak:0,lastCheckIn:null,doneMissions:{},doneTopics:{},donePhases:[],quizHistory:{},badges:[],totalDone:0,perfectQuiz:0,islamicDays:0,trackChecked:{},studyLog:{},weeklyReports:{},certificates:[],reviewQueue:[],trainingStartDate:null,doneLessons:{},doneDailySessions:{},lessonNotes:{}};

const pad2=n=>String(n).padStart(2,"0");
const parseDate=(value)=>{
  if(value instanceof Date)return new Date(value.getFullYear(),value.getMonth(),value.getDate());
  const [y,m,d]=String(value||dateKey(new Date())).split("-").map(Number);
  return new Date(y,m-1,d);
};
const dateKey=(dateLike)=>{
  const d=dateLike instanceof Date?dateLike:parseDate(dateLike);
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
};
const today=()=>dateKey(new Date());
const addDays=(dateLike,days)=>{
  const d=parseDate(dateLike);
  d.setDate(d.getDate()+days);
  return d;
};
const isStudyDay=dateLike=>STUDY_DAYS.includes(parseDate(dateLike).getDay());
const isFriday=dateLike=>parseDate(dateLike).getDay()===5;
const dayLabel=dateLike=>AR_DAYS[parseDate(dateLike).getDay()];
const fmtDate=dateLike=>parseDate(dateLike).toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const pct=(done,total)=>total?Math.round(done/total*100):0;
const trackLabel=tid=>TRACKS[tid]?`${TRACKS[tid].icon} ${TRACKS[tid].name}`:tid;
const textNorm=v=>String(v||"").toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ").trim();

const getTrainingDay=(startDate,targetDate=today())=>{
  const start=parseDate(startDate||today());
  const target=parseDate(targetDate||today());
  const forward=start<=target;
  let cursor=forward?start:target;
  const end=forward?target:start;
  let count=0;
  while(cursor<=end){
    if(isStudyDay(cursor))count++;
    cursor=addDays(cursor,1);
  }
  return forward?count:-count;
};

const lessonMinutes=lesson=>Math.ceil((lesson.durationSec||DEFAULT_LESSON_MIN*60)/60);
const formatDuration=sec=>{
  const minutes=Math.round((sec||DEFAULT_LESSON_MIN*60)/60);
  if(minutes<60)return `${minutes}m`;
  const h=Math.floor(minutes/60),m=minutes%60;
  return m?`${h}h ${m}m`:`${h}h`;
};

const buildDailyTodo=dayNumber=>{
  const sessions=Array.from({length:DAILY_SESSION_COUNT},(_,i)=>({id:`s${i+1}`,title:`الجلسة ${i+1}`,targetMin:SESSION_TARGET_MIN,lessons:[],usedMin:0}));
  if(dayNumber<1)return{dayNumber,sessions,exhausted:false};
  let currentDay=1,currentSession=0,usedMin=0;
  for(const lesson of LESSONS){
    const minutes=lessonMinutes(lesson);
    if(usedMin>0&&usedMin+minutes>SESSION_TARGET_MIN){
      currentSession++;
      usedMin=0;
      if(currentSession>=DAILY_SESSION_COUNT){
        currentDay++;
        currentSession=0;
      }
    }
    if(currentDay===dayNumber){
      sessions[currentSession].lessons.push({...lesson,durationMin:minutes});
      sessions[currentSession].usedMin+=minutes;
    }
    usedMin+=minutes;
    if(usedMin>=SESSION_TARGET_MIN){
      currentSession++;
      usedMin=0;
      if(currentSession>=DAILY_SESSION_COUNT){
        currentDay++;
        currentSession=0;
      }
    }
    if(currentDay>dayNumber)break;
  }
  return{dayNumber,sessions,exhausted:currentDay<dayNumber};
};

const sessionKey=(dateId,sessionId)=>`${dateId}-${sessionId}`;
const syncDailySessions=(state,plan,dateId)=>{
  const doneDailySessions={...(state.doneDailySessions||{})};
  plan.sessions.forEach(session=>{
    const key=sessionKey(dateId,session.id);
    if(session.lessons.length&&session.lessons.every(lesson=>state.doneLessons?.[lesson.id]))doneDailySessions[key]=true;
    else delete doneDailySessions[key];
  });
  return doneDailySessions;
};

const getLessonRelatedResources=lesson=>{
  const tracks=new Set((lesson.trackIds?.length?lesson.trackIds:["general"]).filter(tid=>TRACKS[tid]));
  const tags=(lesson.topicTags||[]).map(textNorm).filter(tag=>tag.length>=3);
  const seen=new Set();
  return RESOURCE_INDEX.filter(r=>{
    const title=textNorm(`${r.title} ${r.phase} ${r.trackName}`);
    return tracks.has(r.tid)||tags.some(tag=>title.includes(tag));
  }).filter(r=>{
    if(seen.has(r.url))return false;
    seen.add(r.url);
    return true;
  });
};

const findPhase=wk=>PHASES.find(p=>wk>=p.startWeek&&wk<=p.endWeek)||PHASES[0];

function Ring({pct:percent,size=48,stroke=4,color="#00ff88"}){
  const r=(size-stroke*2)/2,c=2*Math.PI*r,o=c-(percent/100)*c;
  return(<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--wb)" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.5s ease"}}/>
  </svg>);
}

function Tag({type,lang}){return(<span style={{display:"inline-flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
  <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,fontFamily:"'Fira Code',monospace",background:type==="video"?"rgba(239,68,68,0.15)":type==="lab"?"rgba(34,197,94,0.15)":type==="article"?"rgba(249,115,22,0.15)":type==="writeup"?"rgba(236,72,153,0.15)":type==="book"?"rgba(234,179,8,0.15)":"rgba(100,116,139,0.15)",color:type==="video"?"#f87171":type==="lab"?"#4ade80":type==="article"?"#fb923c":type==="writeup"?"#f472b6":type==="book"?"#facc15":"var(--t4)",border:`1px solid ${type==="video"?"rgba(239,68,68,0.3)":type==="lab"?"rgba(34,197,94,0.3)":type==="article"?"rgba(249,115,22,0.3)":type==="writeup"?"rgba(236,72,153,0.3)":type==="book"?"rgba(234,179,8,0.3)":"rgba(100,116,139,0.3)"}`}}>
    {type==="video"?"Video":type==="lab"?"Lab":type==="article"?"Article":type==="writeup"?"Writeup":type==="book"?"Book":"Link"}
  </span>
  {lang&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,fontFamily:"'Fira Code',monospace",background:lang==="ar"?"rgba(0,212,255,0.15)":"rgba(139,92,246,0.15)",color:lang==="ar"?"#00d4ff":"#a78bfa",border:`1px solid ${lang==="ar"?"rgba(0,212,255,0.3)":"rgba(139,92,246,0.3)"}`}}>{lang==="ar"?"AR":"EN"}</span>}
</span>);}

// ─────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────
export default function CyberPath(){
  const [s,setS]=useState(D0);
  const [toast,setToast]=useState(null);
  const [loading,setLoading]=useState(true);
  const [sideOpen,setSideOpen]=useState(true);
  const [isMobile,setIsMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<768);
  const [viewOffset,setViewOffset]=useState(0);
  const [courseOpen,setCourseOpen]=useState(false);
  const [roadmapOpen,setRoadmapOpen]=useState(false);
  const [theme,setTheme]=useState("dark");

  const saveState=useCallback(ns=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(ns));}catch(e){}},[]);
  const mergeState=raw=>{
    const ns={...D0,...raw};
    ns.trainingStartDate=raw?.trainingStartDate||today();
    ns.doneLessons=raw?.doneLessons||{};
    ns.doneDailySessions=raw?.doneDailySessions||{};
    ns.lessonNotes=raw?.lessonNotes||{};
    ns.badges=raw?.badges||[];
    ns.certificates=raw?.certificates||[];
    ns.totalDone=Object.values(ns.doneLessons).filter(Boolean).length||ns.totalDone||0;
    return ns;
  };
  const upd=useCallback(patch=>{
    setS(prev=>{
      const next=typeof patch==="function"?patch(prev):{...prev,...patch};
      saveState(next);
      return next;
    });
  },[saveState]);
  const showToast=m=>{setToast(m);setTimeout(()=>setToast(null),2600);};
  const toggleTheme=()=>setTheme(p=>p==="dark"?"light":"dark");

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);
      const ns=mergeState(raw?JSON.parse(raw):{});
      setS(ns);
      saveState(ns);
    }catch(e){
      setS(mergeState({}));
    }
    setLoading(false);
  },[saveState]);
  useEffect(()=>{const fn=()=>setIsMobile(window.innerWidth<768);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);

  const selectedDate=addDays(new Date(),viewOffset);
  const selectedDateKey=dateKey(selectedDate);
  const trainingDay=getTrainingDay(s.trainingStartDate||today(),selectedDateKey);
  const restDay=isFriday(selectedDate);
  const dailyPlan=restDay?{dayNumber:trainingDay,sessions:[],exhausted:false}:buildDailyTodo(trainingDay);
  const doneLessonCount=Object.values(s.doneLessons||{}).filter(Boolean).length;
  const totalLessonCount=LESSONS.length;
  const overallPct=pct(doneLessonCount,totalLessonCount);
  const lv=getLevel(s.xp);
  const nextLevel=LEVELS.find(l=>l.lv===lv.lv+1)||lv;
  const levelPct=clamp(Math.round((s.xp-lv.min)/((nextLevel.min||lv.min+1000)-lv.min)*100),0,100);
  const todayDone=dailyPlan.sessions.flatMap(session=>session.lessons).filter(lesson=>s.doneLessons?.[lesson.id]).length;
  const todayTotal=dailyPlan.sessions.reduce((sum,session)=>sum+session.lessons.length,0);
  const currentRoadmapWeek=clamp(Math.ceil(Math.max(1,trainingDay)/6),1,80);
  const currentPhase=findPhase(currentRoadmapWeek);
  const SB=sideOpen?260:72;

  useEffect(()=>{
    if(loading)return;
    const earned=BADGES.filter(b=>!s.badges.includes(b.id)&&b.check(s));
    if(earned.length){
      upd(prev=>({...prev,badges:[...prev.badges,...earned.map(b=>b.id)],xp:prev.xp+earned.reduce((sum,b)=>sum+b.xp,0)}));
      showToast(`شارة جديدة: ${earned.map(b=>b.ar).join(" + ")}`);
    }
  },[s.totalDone,s.bestStreak,s.perfectQuiz,s.islamicDays,JSON.stringify(s.donePhases),loading,upd]);

  const toggleLesson=lesson=>{
    const was=!!s.doneLessons?.[lesson.id];
    upd(prev=>{
      const doneLessons={...(prev.doneLessons||{})};
      if(was)delete doneLessons[lesson.id];
      else doneLessons[lesson.id]=today();
      const next={...prev,doneLessons,totalDone:Object.values(doneLessons).filter(Boolean).length,xp:Math.max(0,prev.xp+(was?-10:10))};
      next.doneDailySessions=syncDailySessions(next,dailyPlan,selectedDateKey);
      return next;
    });
    showToast(was?"تم إرجاع الدرس لقائمة اليوم":"تم إنهاء الدرس +10 XP");
  };

  const completeSession=session=>{
    const missing=session.lessons.filter(lesson=>!s.doneLessons?.[lesson.id]);
    if(!missing.length){showToast("الجلسة مكتملة بالفعل");return;}
    upd(prev=>{
      const doneLessons={...(prev.doneLessons||{})};
      missing.forEach(lesson=>{doneLessons[lesson.id]=today();});
      const next={...prev,doneLessons,totalDone:Object.values(doneLessons).filter(Boolean).length,xp:prev.xp+(missing.length*10)};
      next.doneDailySessions=syncDailySessions(next,dailyPlan,selectedDateKey);
      return next;
    });
    showToast(`الجلسة اكتملت +${missing.length*10} XP`);
  };

  const saveLessonNote=(lessonId,value)=>upd(prev=>({...prev,lessonNotes:{...(prev.lessonNotes||{}),[lessonId]:value}}));
  const goToday=()=>setViewOffset(0);
  const doCheckIn=()=>{
    const t=today();
    if(s.lastCheckIn===t){showToast("سبق تسجيل الحضور اليوم");return;}
    const y=dateKey(addDays(new Date(),-1));
    const streak=s.lastCheckIn===y?s.streak+1:1;
    upd(prev=>({...prev,lastCheckIn:t,streak,bestStreak:Math.max(streak,prev.bestStreak||0),xp:prev.xp+15,islamicDays:(prev.islamicDays||0)+1}));
    showToast(`حضور اليومي مسجل: سلسلة ${streak} يوم`);
  };

  const Sidebar=()=>(<div className={isMobile?"sidebar-mobile":"sidebar-glow sidebar-desktop"} style={{width:isMobile?260:(sideOpen?260:72),minHeight:"100vh",background:"var(--sg)",borderRight:"1px solid rgba(0,255,136,0.1)",display:isMobile&&!sideOpen?"none":"flex",flexDirection:"column",padding:"20px 10px",gap:10,transition:"width 0.3s ease",position:"fixed",top:0,left:0,zIndex:100,overflowY:"auto",overflowX:"hidden"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 4px"}}>
      <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>setSideOpen(p=>!p)}>
        <span style={{fontSize:16,color:"#050810",fontWeight:900}}>CP</span>
      </div>
      {sideOpen&&<div style={{minWidth:0}}><div style={{color:"#00ff88",fontWeight:700,fontSize:13,fontFamily:"'Fira Code',monospace"}} className="glow">CyberPath Academy</div><div style={{color:"var(--t2)",fontSize:10}}>Todo اليوم · YouTube Curriculum</div></div>}
      <button className="theme-tgl" onClick={toggleTheme} title={theme==="dark"?"الوضع النهاري":"الوضع الليلي"}>{theme==="dark"?"☀":"☾"}</button>
    </div>
    {sideOpen&&(<>
      <div style={{padding:12,background:"rgba(0,255,136,0.05)",borderRadius:8,border:"1px solid rgba(0,255,136,0.1)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:8}}>
          <div><div style={{color:lv.color,fontSize:12,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{lv.icon} {lv.ar}</div><div style={{color:"var(--t2)",fontSize:10}}>{s.xp} XP</div></div>
          <Ring pct={levelPct} size={42} color={lv.color}/>
        </div>
        <div className="bar"><div className="bar-fill" style={{width:`${levelPct}%`,background:`linear-gradient(90deg,${lv.color},${lv.color}88)`}}/></div>
      </div>
      <div style={{padding:12,background:"var(--bo)",border:"1px solid var(--wo)",borderRadius:8}}>
        <div style={{color:"var(--t0)",fontSize:12,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>تقدم المنهج</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[{label:"الدروس",val:`${doneLessonCount}/${totalLessonCount}`},{label:"اليوم",val:trainingDay>0?trainingDay:"راحة"},{label:"الكورسات",val:COURSES.length},{label:"القوائم",val:`${UNIQUE_PLAYLIST_COUNT}/${SOURCE_PLAYLIST_COUNT}`}].map((item,i)=><div key={i}>
            <div style={{color:"#00ff88",fontSize:12,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{item.val}</div>
            <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Cairo',sans-serif"}}>{item.label}</div>
          </div>)}
        </div>
        <div className="bar" style={{marginTop:10}}><div className="bar-fill" style={{width:`${overallPct}%`,background:"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div>
      </div>
      <button className="btn btn-o" onClick={doCheckIn} style={{fontSize:12,padding:"9px 12px"}}>تسجيل حضور اليومي</button>
    </>)}
  </div>);

  const LessonRow=({lesson})=>{
    const course=COURSE_BY_ID[lesson.courseId];
    const done=!!s.doneLessons?.[lesson.id];
    const resources=getLessonRelatedResources(lesson);
    const note=s.lessonNotes?.[lesson.id]||"";
    return(<div style={{background:done?"rgba(0,255,136,0.06)":"var(--bo)",border:`1px solid ${done?"rgba(0,255,136,0.28)":"var(--wo)"}`,borderRadius:9,padding:10}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"auto 1fr auto",gap:10,alignItems:"start"}}>
        <button onClick={()=>toggleLesson(lesson)} className={`chk ${done?"on":""}`} style={{marginTop:2,border:"2px solid var(--sbd4)",background:done?"#00ff88":"transparent"}} aria-label={done?"إلغاء الدرس":"إنهاء الدرس"}>{done&&<span style={{color:"var(--bg4)",fontSize:10,fontWeight:900}}>✓</span>}</button>
        <div style={{minWidth:0}}>
          <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
            <span style={{color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{course?.title} · #{lesson.index}</span>
            <span style={{color:"#a78bfa",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{formatDuration(lesson.durationSec)}</span>
          </div>
          <div style={{color:done?"var(--t2)":"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",lineHeight:1.6,textDecoration:done?"line-through":"none",overflowWrap:"anywhere"}}>{lesson.title}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:7}}>
            {(lesson.trackIds||[]).slice(0,4).map(tid=><span key={tid} style={{fontSize:10,color:TRACKS[tid]?.color||"var(--t1)",background:"var(--wm)",border:"1px solid var(--wo)",padding:"2px 7px",borderRadius:20,fontFamily:"'Cairo',sans-serif"}}>{trackLabel(tid)}</span>)}
            {(lesson.topicTags||[]).slice(0,5).map(tag=><span key={tag} style={{fontSize:10,color:"var(--t1)",background:"var(--wm)",border:"1px solid var(--wo)",padding:"2px 7px",borderRadius:20}}>#{tag}</span>)}
          </div>
        </div>
        <a className="btn btn-g" href={lesson.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",fontSize:11,padding:"8px 12px",textAlign:"center",whiteSpace:"nowrap"}}>الفيديو</a>
      </div>
      <details style={{marginTop:9}}>
        <summary style={{cursor:"pointer",color:"#00d4ff",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>كل المصادر المتعلقة ({resources.length}) + ملاحظات الدرس</summary>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:7,marginTop:9}}>
          {resources.map((r,i)=><a key={`${r.url}-${i}`} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <div className="res-card" style={{marginBottom:0}}>
              <div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:5,overflowWrap:"anywhere"}}>{r.title}</div>
              <div style={{display:"flex",justifyContent:"space-between",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:r.trackColor,fontFamily:"'Cairo',sans-serif"}}>{r.trackIcon} {r.trackName}</span>
                <Tag type={r.type} lang={r.lang}/>
              </div>
            </div>
          </a>)}
        </div>
        <textarea value={note} onChange={e=>saveLessonNote(lesson.id,e.target.value)} placeholder="ملاحظاتك على هذا الدرس..." style={{width:"100%",minHeight:70,marginTop:9,resize:"vertical",fontSize:12,fontFamily:"'Cairo',sans-serif",background:"var(--bo)",color:"var(--t0)",border:"1px solid var(--wo)",borderRadius:8,padding:10}}/>
      </details>
    </div>);
  };

  const SessionCard=({session})=>{
    const done=session.lessons.filter(lesson=>s.doneLessons?.[lesson.id]).length;
    const total=session.lessons.length;
    const sessionDone=total>0&&done===total;
    const key=sessionKey(selectedDateKey,session.id);
    return(<div className="card" style={{padding:12,borderColor:sessionDone?"rgba(0,255,136,0.32)":"var(--sbd)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:10}}>
        <div>
          <div style={{color:"var(--t0)",fontSize:15,fontWeight:800,fontFamily:"'Cairo',sans-serif"}}>{session.title} · 90 دقيقة</div>
          <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{done}/{total} lessons · {session.usedMin}m scheduled · saved: {s.doneDailySessions?.[key]?"yes":"no"}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Ring pct={pct(done,total)} size={42} color={sessionDone?"#00ff88":"#00d4ff"}/>
          <button className="btn btn-o" disabled={!total} onClick={()=>completeSession(session)} style={{fontSize:11,padding:"7px 10px",opacity:total?1:.45}}>إنهاء الجلسة</button>
        </div>
      </div>
      <div className="bar" style={{marginBottom:10}}><div className="bar-fill" style={{width:`${pct(done,total)}%`,background:sessionDone?"#00ff88":"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div>
      {total?(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>{session.lessons.map(lesson=><LessonRow key={lesson.id} lesson={lesson}/>)}</div>
      ):(
        <div style={{color:"var(--t2)",fontSize:12,fontFamily:"'Cairo',sans-serif",padding:10,background:"var(--bo)",border:"1px solid var(--wo)",borderRadius:8}}>لا توجد دروس في هذه الجلس.</div>
      )}
    </div>);
  };

  const RestDay=()=>{
    const reviewPlan=buildDailyTodo(Math.max(1,trainingDay));
    const reviewLessons=reviewPlan.sessions.flatMap(session=>session.lessons).slice(0,6);
    return(<div className="card" style={{padding:isMobile?14:18,borderColor:"rgba(250,204,21,0.28)",background:"rgba(250,204,21,0.05)",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div><div style={{color:"#fde047",fontSize:17,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>الجمعة راحة ومراجعة خفيفة</div><div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.8}}>لا توجد دروس جديدة اليوم. راجع ملاحظاتك، أعد مشاهدة الدروس الصعبة، وخفف الحمل.</div></div>
        <button className="btn btn-o" onClick={goToday} style={{fontSize:12,padding:"8px 12px"}}>اليوم</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:8,marginTop:12}}>
        {reviewLessons.map(lesson=><a key={lesson.id} href={lesson.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <div className="res-card" style={{marginBottom:0}}>
            <div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",overflowWrap:"anywhere"}}>{lesson.title}</div>
            <div style={{color:"var(--t2)",fontSize:10,marginTop:4}}>{COURSE_BY_ID[lesson.courseId]?.title}</div>
          </div>
        </a>)}
      </div>
    </div>);
  };

  const CourseLibrary=()=>(
    <div className="card" style={{padding:isMobile?12:16,marginTop:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:12}}>
        <div><div style={{color:"var(--t0)",fontSize:16,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>كتالوج الكورسات الكامل</div><div style={{color:"var(--t2)",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{SOURCE_PLAYLIST_COUNT} links input · {UNIQUE_PLAYLIST_COUNT} playlists unique · {LESSONS.length} lessons</div></div>
        <button className="btn btn-o" onClick={()=>setCourseOpen(p=>!p)} style={{fontSize:12,padding:"8px 12px"}}>{courseOpen?"إخفاء":"عرض الكورسات"}</button>
      </div>
      {courseOpen&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
        {COURSES.map(course=>{
          const lessons=COURSE_LESSONS[course.id]||[];
          const done=lessons.filter(lesson=>s.doneLessons?.[lesson.id]).length;
          return(<details key={course.id} style={{background:"var(--bo)",border:"1px solid var(--wo)",borderRadius:9,padding:10}}>
            <summary style={{cursor:"pointer",listStyle:"none"}}>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr auto",gap:10,alignItems:"center"}}>
                <div style={{minWidth:0}}>
                  <div style={{color:"var(--t0)",fontSize:13,fontWeight:800,fontFamily:"'Cairo',sans-serif",overflowWrap:"anywhere"}}>{course.title}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:5}}>
                    <span style={{color:"#00ff88",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{done}/{lessons.length} lessons</span>
                    {(course.trackIds||[]).slice(0,4).map(tid=><span key={tid} style={{fontSize:10,color:TRACKS[tid]?.color||"var(--t1)"}}>{trackLabel(tid)}</span>)}
                  </div>
                </div>
                <div style={{minWidth:120}}><div className="bar"><div className="bar-fill" style={{width:`${pct(done,lessons.length)}%`,background:"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div></div>
              </div>
            </summary>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:7,marginTop:10}}>
              {lessons.map(lesson=><a key={lesson.id} href={lesson.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <div className="res-card" style={{marginBottom:0,borderColor:s.doneLessons?.[lesson.id]?"rgba(0,255,136,0.25)":"var(--wb)"}}>
                  <div style={{color:s.doneLessons?.[lesson.id]?"var(--t2)":"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",overflowWrap:"anywhere"}}>{lesson.index}. {lesson.title}</div>
                  <div style={{color:"var(--t2)",fontSize:10,marginTop:4}}>{formatDuration(lesson.durationSec)}</div>
                </div>
              </a>)}
            </div>
          </details>);
        })}
      </div>}
    </div>
  );

  const RoadmapSummary=()=>(
    <div className="card" style={{padding:isMobile?12:16,marginTop:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:12}}>
        <div><div style={{color:"var(--t0)",fontSize:16,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>خريطة 80 أسبوع كتصنيف ثانوي</div><div style={{color:"var(--t2)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>الأسابيع لم تعد الشاشة الأساسية؛ تظهر هنا كمؤشر عام مرتبط برقم يوم التدريب.</div></div>
        <button className="btn btn-o" onClick={()=>setRoadmapOpen(p=>!p)} style={{fontSize:12,padding:"8px 12px"}}>{roadmapOpen?"إخفاء":"عرض الخريطة"}</button>
      </div>
      {roadmapOpen&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:9}}>
        {PHASES.map(ph=>{
          const done=clamp(currentRoadmapWeek-ph.startWeek+1,0,ph.endWeek-ph.startWeek+1);
          const total=ph.endWeek-ph.startWeek+1;
          const percent=pct(done,total);
          const active=currentPhase?.id===ph.id;
          return(<div key={ph.id} style={{background:active?ph.bg:"var(--bo)",border:`1px solid ${active?ph.color+"66":"var(--wo)"}`,borderRadius:10,padding:12}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"center"}}>
              <span style={{fontSize:22}}>{ph.icon}</span>
              <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{Math.round(percent)}%</span>
            </div>
            <div style={{color:"var(--t0)",fontSize:13,fontWeight:800,fontFamily:"'Cairo',sans-serif",marginTop:6}}>{ph.nameAr}</div>
            <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace",marginTop:2}}>Weeks {ph.startWeek}-{ph.endWeek} · {ph.monthLabel}</div>
            <div className="bar" style={{marginTop:8}}><div className="bar-fill" style={{width:`${percent}%`,background:ph.color}}/></div>
          </div>);
        })}
      </div>}
    </div>
  );

  const Dashboard=()=>(
    <div className="slide">
      <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.15)",borderRadius:16,padding:isMobile?"16px":"20px 24px",marginBottom:14,position:"relative",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{minWidth:0}}>
            <div style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:4}}>// Today-first YouTube training plan</div>
            <h1 style={{color:"var(--t0)",fontSize:isMobile?22:30,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>Todo اليوم</h1>
            <div style={{color:"var(--t4)",fontSize:13,fontFamily:"'Cairo',sans-serif"}}>{fmtDate(selectedDate)} · {restDay?"جمعة راحة":`يوم تدريبي ${trainingDay}`} · البداية {s.trainingStartDate}</div>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button className="btn btn-o" onClick={()=>setViewOffset(v=>v-1)} style={{fontSize:12,padding:"8px 12px"}}>اليوم السابق</button>
            <button className="btn btn-g" onClick={goToday} style={{fontSize:12,padding:"8px 12px"}}>اليوم</button>
            <button className="btn btn-o" onClick={()=>setViewOffset(v=>v+1)} style={{fontSize:12,padding:"8px 12px"}}>اليوم التالي</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:8,marginTop:14}}>
          {[{label:"تقدم الكل",val:`${overallPct}%`,color:"#00ff88"},{label:"دروس اليوم",val:`${todayDone}/${todayTotal}`,color:"#00d4ff"},{label:"الجلسات",val:"3 × 90m",color:"#a78bfa"},{label:"المستوى",val:lv.ar,color:lv.color}].map((item,i)=><div key={i} className="stat-card" style={{padding:11}}>
            <div style={{color:item.color,fontSize:16,fontWeight:900,fontFamily:"'Fira Code',monospace"}}>{item.val}</div>
            <div style={{color:"var(--t2)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:4}}>{item.label}</div>
          </div>)}
        </div>
        <div className="bar" style={{height:8,marginTop:12}}><div className="bar-fill" style={{width:`${overallPct}%`,background:"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div>
      </div>

      {restDay?<RestDay/>:dailyPlan.exhausted?(
        <div className="card" style={{padding:18,marginBottom:14}}>
          <div style={{color:"#00ff88",fontSize:17,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>أكملت كل الدروس المستخرجة</div>
          <div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",marginTop:6}}>لا توجد دروس جديدة لهذا اليوم التدريبي. راجع الكتالوج أو أعد تثبيت تاريخ البداية.</div>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {dailyPlan.sessions.map(session=><SessionCard key={session.id} session={session}/>)}
        </div>
      )}

      <CourseLibrary/>
      <RoadmapSummary/>
    </div>
  );

  if(loading)return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg)",flexDirection:"column",gap:16}}>
    <style>{FONTS+CSS}</style><div className="pulse" style={{fontSize:48}}>CP</div>
    <div style={{color:"#00ff88",fontFamily:"'Fira Code',monospace",fontSize:14}}>جاري التحميل...</div>
  </div>);

  return(<div className="matrix-bg" data-theme={theme} style={{fontFamily:"'Fira Code',monospace",background:"var(--bg)",minHeight:"100vh",color:"var(--t0)"}}>
    <style>{FONTS+CSS}</style>
    {toast&&<div className="xp-toast">{toast}</div>}
    {isMobile&&sideOpen&&<div className="sidebar-overlay" onClick={()=>setSideOpen(false)}/>}
    <Sidebar/>
    <main style={{marginLeft:isMobile?0:SB,padding:isMobile?"60px 14px 24px":"26px 26px 40px",maxWidth:isMobile?"100%":1180,transition:"margin-left 0.3s ease"}}>
      {isMobile&&<div style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"var(--bg)",borderBottom:"1px solid var(--sbd15)",display:"flex",alignItems:"center",gap:10,padding:"10px 14px"}}>
        <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>setSideOpen(p=>!p)}>
          <span style={{fontSize:16,color:"#050810",fontWeight:900}}>☰</span>
        </div>
        <div style={{flex:1,color:"#00ff88",fontWeight:700,fontSize:12,fontFamily:"'Fira Code',monospace"}} className="glow">Todo اليوم</div>
        <button className="theme-tgl" onClick={toggleTheme} title={theme==="dark"?"الوضع النهاري":"الوضع الليلي"} style={{margin:0}}>{theme==="dark"?"☀":"☾"}</button>
      </div>}
      <Dashboard/>
    </main>
  </div>);
}
