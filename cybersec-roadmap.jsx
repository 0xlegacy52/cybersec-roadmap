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
@media(max-width:767px){
  .sidebar-desktop{display:none!important}
  .bottom-nav{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:200;background:var(--sg);border-top:1px solid var(--sbd15);padding:6px 4px 10px;gap:2px;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .bottom-nav::-webkit-scrollbar{display:none}
  .bnav-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 10px;border-radius:8px;cursor:pointer;color:var(--t1);flex-shrink:0;min-width:56px;border:1px solid transparent;transition:all .2s;-webkit-tap-highlight-color:transparent}
  .bnav-item.on{background:var(--sbg12);color:#00ff88;border-color:var(--sbd25)}
  .bnav-item span:first-child{font-size:20px}
  .bnav-item span:last-child{font-size:9px;font-family:'Cairo',sans-serif;white-space:nowrap}
  .btn-g,.btn-o{padding:10px 14px;font-size:13px;min-height:44px}
  input[type="text"],select{font-size:16px;width:100%}
  .res-filters select{width:100%!important}
  .topic-row{padding:10px;min-height:44px}
  .phase-hd{min-height:52px}
  .chk{width:22px;height:22px}
  .quiz-opt{padding:14px 16px;min-height:52px}
  .nav{min-height:44px}
  .stat-card{padding:12px}
  .res-card{padding:12px}
  .todo-item{padding:12px}
  .grid-2col{grid-template-columns:1fr!important}
  .trk-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))!important}
}
@media(min-width:768px){
  .xp-toast{left:auto;right:24px;top:24px;text-align:left}
  .bottom-nav{display:none!important}
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
const PRI_COL={high:"#ef4444",medium:"#f59e0b",low:"#10b981"};
const PRI_BG={high:"rgba(239,68,68,0.12)",medium:"rgba(245,158,11,0.12)",low:"rgba(16,185,129,0.12)"};
const R_COL={prayer:"rgba(250,204,21,0.15)",islamic:"rgba(52,211,153,0.15)",quran:"rgba(52,211,153,0.2)",study:"rgba(59,130,246,0.12)",health:"rgba(34,197,94,0.12)",break:"rgba(148,163,184,0.08)",project:"rgba(168,85,247,0.12)",community:"rgba(236,72,153,0.12)",personal:"rgba(249,115,22,0.1)"};
const R_TXT={prayer:"#fde047",islamic:"#34d399",quran:"#6ee7b7",study:"#60a5fa",health:"#4ade80",break:"var(--t4)",project:"#c084fc",community:"#f472b6",personal:"#fb923c"};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const today=()=>new Date().toISOString().split("T")[0];
const findPhase=(wk)=>PHASES.find(p=>wk>=p.startWeek&&wk<=p.endWeek)||PHASES[0];
const findWeek=(wk)=>{for(const ph of PHASES){const f=ph.weeks.find(w=>w.wk===wk);if(f)return{...f,phase:ph};}return null;};
const D0={xp:0,currentWeek:1,streak:0,bestStreak:0,lastCheckIn:null,doneMissions:{},doneTopics:{},donePhases:[],quizHistory:{},badges:[],totalDone:0,perfectQuiz:0,islamicDays:0,trackChecked:{},studyLog:{},weeklyReports:{},certificates:[],reviewQueue:[]};

// خطة يومية: توزيع المواضيع على أيام الأسبوع (السبت→الخميس = 6 أيام، الجمعة راحة)
const STUDY_DAYS=["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس"];
const DAY_PLAN=(wk)=>{
  const w=findWeek(wk);if(!w)return[];
  const allItems=[
    ...w.missions.map((m,i)=>({type:"mission",text:m,idx:i,xp:5,icon:"🎯",wk})),
    ...w.topics.map((t,i)=>({type:"topic",text:t,idx:i,xp:10,icon:"📚",wk}))
  ];
  // توزيع متساوٍ على 6 أيام
  return STUDY_DAYS.map((day,di)=>{
    const perDay=Math.ceil(allItems.length/6);
    const items=allItems.slice(di*perDay,(di+1)*perDay);
    const hrs=items.length>0?Math.max(1,Math.round(items.length*0.5)):0;
    return{day,items,hrs};
  }).filter(d=>d.items.length>0);
};
// حساب يوم الأسبوع العربي الحالي
const getTodayDayAr=()=>{const d=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];return d[new Date().getDay()];};
// مراجعة Spaced Repetition: الأسابيع المكتملة قبل 7,14,30 يوم
const SR_INTERVALS=[7,14,30];
const getReviewWeeks=(s)=>{
  const done=[];
  PHASES.forEach(ph=>ph.weeks.forEach(w=>{
    const topics=w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length;
    if(topics===w.topics.length&&w.wk<s.currentWeek)done.push(w.wk);
  }));
  return done.slice(-6);
};

function Ring({pct,size=48,stroke=4,color="#00ff88"}){
  const r=(size-stroke*2)/2,c=2*Math.PI*r,o=c-(pct/100)*c;
  return(<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--wb)" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
      strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.5s ease"}}/>
  </svg>);
}
function Tag({type,lang}){return(<span style={{display:"inline-flex",gap:4,alignItems:"center"}}>
  <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,fontFamily:"'Fira Code',monospace",background:type==="video"?"rgba(239,68,68,0.15)":type==="lab"?"rgba(34,197,94,0.15)":type==="article"?"rgba(249,115,22,0.15)":type==="writeup"?"rgba(236,72,153,0.15)":type==="book"?"rgba(234,179,8,0.15)":"rgba(100,116,139,0.15)",color:type==="video"?"#f87171":type==="lab"?"#4ade80":type==="article"?"#fb923c":type==="writeup"?"#f472b6":type==="book"?"#facc15":"var(--t4)",border:`1px solid ${type==="video"?"rgba(239,68,68,0.3)":type==="lab"?"rgba(34,197,94,0.3)":type==="article"?"rgba(249,115,22,0.3)":type==="writeup"?"rgba(236,72,153,0.3)":type==="book"?"rgba(234,179,8,0.3)":"rgba(100,116,139,0.3)"}`}}>
    {type==="video"?"▶ Video":type==="lab"?"⚗ Lab":type==="article"?"📄 Article":type==="writeup"?"✍ Writeup":type==="book"?"📚 Book":"🔗"}
  </span>
  {lang&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,fontFamily:"'Fira Code',monospace",background:lang==="ar"?"rgba(0,212,255,0.15)":"rgba(139,92,246,0.15)",color:lang==="ar"?"#00d4ff":"#a78bfa",border:`1px solid ${lang==="ar"?"rgba(0,212,255,0.3)":"rgba(139,92,246,0.3)"}`}}>{lang==="ar"?"🇸🇦 AR":"🌐 EN"}</span>}
</span>);}

// ─────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────
export default function CyberPath(){
  const [s,setS]=useState(D0);
  const [page,setPage]=useState("dashboard");
  const [toast,setToast]=useState(null);
  const [loading,setLoading]=useState(true);
  const [sideOpen,setSideOpen]=useState(true);
  const [isMobile,setIsMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<768);
  const [expPhase,setExpPhase]=useState(null);
  const [expWeek,setExpWeek]=useState(null);
  const [quiz,setQuiz]=useState({active:false,wkId:null,ans:{},submitted:false,score:0});
  const [todos,setTodos]=useState(INIT_TODOS);
  const [newTask,setNewTask]=useState("");
  const [newPri,setNewPri]=useState("medium");
  const [newTrack,setNewTrack]=useState("general");
  const [todoFilter,setTodoFilter]=useState("all");
  const [routineFilter,setRoutineFilter]=useState("all");
  const [resType,setResType]=useState("all");
  const [resLang,setResLang]=useState("all");
  const [resTid,setResTid]=useState("all");
  const [studyHoursInput,setStudyHoursInput]=useState("");
  const [weekReportOpen,setWeekReportOpen]=useState(false);
  const [certModal,setCertModal]=useState(null);
  const [theme,setTheme]=useState("dark");

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("cyberpath_v3");if(r?.value){const p=JSON.parse(r.value);setS({...D0,...p});if(p.todos)setTodos(p.todos);}}catch(e){}setLoading(false);})();},[]);
  useEffect(()=>{const fn=()=>setIsMobile(window.innerWidth<768);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);

  const save=useCallback(async(ns,td)=>{try{await window.storage.set("cyberpath_v3",JSON.stringify({...ns,todos:td||todos}));}catch(e){};},[todos]);
  const upd=useCallback((patch)=>{setS(prev=>{const ns={...prev,...(typeof patch==="function"?patch(prev):patch)};save(ns);return ns;});},[save]);
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),2800);};
  const toggleTheme=()=>{setTheme(p=>p==="dark"?"light":"dark");};

  const g2=isMobile?"1fr":"1fr 1fr";
  const lv=getLevel(s.xp);
  const nlv=LEVELS.find(l=>l.lv===lv.lv+1)||lv;
  const lvPct=Math.min(100,Math.round((s.xp-lv.min)/((nlv.min||lv.min+1000)-lv.min)*100));
  const curPh=findPhase(s.currentWeek);
  const curWk=findWeek(s.currentWeek);
  const totalT=PHASES.reduce((a,ph)=>a+ph.weeks.reduce((b,w)=>b+w.topics.length,0),0);
  const donePct=totalT>0?Math.round(s.totalDone/totalT*100):0;

  useEffect(()=>{
    if(loading)return;
    const earned=BADGES.filter(b=>!s.badges.includes(b.id)&&b.check(s));
    if(earned.length>0){
      const nb=[...s.badges,...earned.map(b=>b.id)];
      const bx=earned.reduce((a,b)=>a+b.xp,0);
      upd(p=>({...p,badges:nb,xp:p.xp+bx}));
      showToast(`🏅 ${earned.map(b=>b.ar).join(" + ")} +${bx} XP`);
    }
  },[s.totalDone,s.bestStreak,s.perfectQuiz,s.islamicDays,JSON.stringify(s.donePhases),loading]);

  const doCheckIn=()=>{
    const t=today();
    if(s.lastCheckIn===t){showToast("✅ سبق تسجيل الحضور اليوم!");return;}
    const y=new Date(Date.now()-86400000).toISOString().split("T")[0];
    const ns=s.lastCheckIn===y?s.streak+1:1;
    const nb=Math.max(ns,s.bestStreak);
    upd({lastCheckIn:t,streak:ns,bestStreak:nb,xp:s.xp+15,islamicDays:s.islamicDays+1});
    showToast(`🕌 حضور مسجّل! 🔥 سلسلة ${ns} يوم | +15 XP`);
  };

  // تسجيل ساعات الدراسة اليومية
  const logStudyHours=(hrs)=>{
    const h=parseFloat(hrs);
    if(isNaN(h)||h<=0||h>16){showToast("❗ أدخل عدد ساعات صحيح (1-16)");return;}
    const t=today();
    const prev=s.studyLog[t]||0;
    const nl={...s.studyLog,[t]:prev+h};
    // حساب إجمالي ساعات الأسبوع الحالي
    const weekDates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toISOString().split("T")[0];});
    const weekHrs=weekDates.reduce((a,d)=>a+(nl[d]||0),0);
    const xpBonus=Math.floor(h)*3;
    upd({studyLog:nl,xp:s.xp+xpBonus});
    setStudyHoursInput("");
    showToast(`⏱️ ${h} ساعة مسجّلة! أسبوعياً: ${weekHrs.toFixed(1)}h | +${xpBonus} XP`);
  };

  // توليد التقرير الأسبوعي
  const generateWeekReport=()=>{
    const wk=s.currentWeek;const wData=curWk;if(!wData)return null;
    const mDone=wData.missions.filter((_,i)=>s.doneMissions?.[`m-${wk}-${i}`]).length;
    const tDone=wData.topics.filter((_,i)=>s.doneTopics?.[`${wk}-${i}`]).length;
    const weekDates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toISOString().split("T")[0];});
    const weekHrs=weekDates.reduce((a,d)=>a+(s.studyLog?.[d]||0),0);
    const quizScore=s.quizHistory[wData.quizId]?.score??null;
    const ph=findPhase(wk);
    return{wk,title:wData.title,phase:ph.nameAr,mDone,mTotal:wData.missions.length,tDone,tTotal:wData.topics.length,weekHrs:weekHrs.toFixed(1),quizScore,date:today(),xpGained:s.xp};
  };
  const saveWeekReport=()=>{
    const r=generateWeekReport();if(!r)return;
    upd({weeklyReports:{...s.weeklyReports,[`wk${r.wk}`]:r}});
    setWeekReportOpen(true);
    showToast("📋 تم حفظ تقرير الأسبوع!");
  };

  // شهادات إنهاء المراحل
  const earnCertificate=(phId)=>{
    if(s.certificates.includes(phId))return;
    const ph=PHASES.find(p=>p.id===phId);if(!ph)return;
    const nc=[...s.certificates,phId];
    upd({certificates:nc,xp:s.xp+150});
    setCertModal(ph);
    showToast(`🎓 شهادة ${ph.nameAr} +150 XP`);
  };

  const markTopic=(wk,i)=>{
    const k=`${wk}-${i}`;const was=!!s.doneTopics[k];
    const nt={...s.doneTopics,[k]:!was};
    const tot=Object.values(nt).filter(Boolean).length;
    upd({doneTopics:nt,totalDone:tot,xp:Math.max(0,s.xp+(was?-10:10))});
    if(!was)showToast("+10 XP ✅");
  };
  const markMission=(wk,i)=>{
    const k=`m-${wk}-${i}`;const was=!!s.doneMissions[k];
    upd({doneMissions:{...s.doneMissions,[k]:!was},xp:Math.max(0,s.xp+(was?-5:5))});
    if(!was)showToast("🎯 مهمة مكتملة! +5 XP");
  };

  const advWeek=()=>{
    if(s.currentWeek>=80){showToast("🎉 أكملت البرنامج الكامل! أنت Expert!");return;}
    const q=curWk?.quizId;
    if(q&&!s.quizHistory[q]){showToast("❗ أكمل اختبار هذه المرحلة أولاً!");return;}
    const nw=s.currentWeek+1;
    const old=findPhase(s.currentWeek);
    const np=findPhase(nw);
    const nd=[...s.donePhases];
    if(np.id!==old.id&&!nd.includes(old.id))nd.push(old.id);
    upd({currentWeek:nw,xp:s.xp+20,donePhases:nd});
    showToast(`🚀 الأسبوع ${nw} — تقدم رائع! +20 XP`);
  };

  const startQuiz=(wkId)=>{if(!QUIZZES[wkId])return;setQuiz({active:true,wkId,ans:{},submitted:false,score:0});setPage("quiz");};
  const submitQuiz=()=>{
    const qs=QUIZZES[quiz.wkId].qs;
    let sc=0;qs.forEach((q,i)=>{if(quiz.ans[i]===q.a)sc++;});
    const pct=Math.round(sc/qs.length*100);
    const bx=pct>=80?100:pct>=60?50:20;
    upd({quizHistory:{...s.quizHistory,[quiz.wkId]:{score:pct,date:today()}},xp:s.xp+bx,perfectQuiz:pct===100?s.perfectQuiz+1:s.perfectQuiz});
    setQuiz(q=>({...q,submitted:true,score:pct}));
    showToast(`📝 ${pct}% | +${bx} XP`);
  };

  const getTrkPct=(tid)=>{
    const t=TRACKS[tid];if(!t)return 0;
    let tot=0,dn=0;
    t.phases.forEach(ph=>ph.topics.forEach((_,i)=>{tot++;if(s.trackChecked?.[`${tid}-${ph.id}-${i}`])dn++;}));
    return tot?Math.round(dn/tot*100):0;
  };
  const toggleTrkTopic=(tid,phId,i)=>upd(p=>({...p,trackChecked:{...p.trackChecked,[`${tid}-${phId}-${i}`]:!p.trackChecked?.[`${tid}-${phId}-${i}`]}}));

  const addTodo=()=>{if(!newTask.trim())return;const nt=[...todos,{id:Date.now(),text:newTask,track:newTrack,priority:newPri,done:false,date:"اليوم"}];setTodos(nt);save(s,nt);setNewTask("");};
  const togTodo=(id)=>{const nt=todos.map(t=>t.id===id?{...t,done:!t.done}:t);setTodos(nt);save(s,nt);};
  const delTodo=(id)=>{const nt=todos.filter(t=>t.id!==id);setTodos(nt);save(s,nt);};

  const doneTd=todos.filter(t=>t.done).length;
  const filtTd=todos.filter(t=>{
    if(todoFilter==="done")return t.done;if(todoFilter==="pending")return !t.done;
    if(todoFilter==="high")return t.priority==="high"&&!t.done;return true;
  });

  const allRes=[];TRACK_ORDER.forEach(tid=>TRACKS[tid].phases.forEach(ph=>ph.resources.forEach(r=>allRes.push({...r,tid,ph:ph.name}))));
  const filtRes=allRes.filter(r=>(resType==="all"||r.type===resType)&&(resLang==="all"||r.lang===resLang)&&(resTid==="all"||r.tid===resTid));
  const SB=sideOpen?260:72;

  if(loading)return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg)",flexDirection:"column",gap:16}}>
    <style>{FONTS+CSS}</style><div className="pulse" style={{fontSize:48}}>⚡</div>
    <div style={{color:"#00ff88",fontFamily:"'Fira Code',monospace",fontSize:14}}>جاري التحميل...</div>
  </div>);

  const NAV_ITEMS=[
    {id:"dashboard",icon:"📊",label:"Dashboard"},
    {id:"program",icon:"🗺️",label:"البرنامج"},
    {id:"missions",icon:"🎯",label:"المهام"},
    {id:"quiz",icon:"📝",label:"اختبارات"},
    {id:"achievements",icon:"🏅",label:"إنجازات"},
    {id:"resources",icon:"📚",label:"موارد"},
    {id:"todo",icon:"✅",label:"Todo"},
    {id:"routine",icon:"🕐",label:"الروتين"},
    {id:"stats",icon:"📈",label:"إحصائيات"},
  ];

  // ─── SIDEBAR ───
  const Sidebar=()=>(<div className="sidebar-glow sidebar-desktop" style={{width:sideOpen?260:72,minHeight:"100vh",background:"var(--sg)",borderRight:"1px solid rgba(0,255,136,0.1)",display:"flex",flexDirection:"column",padding:"20px 10px",gap:3,transition:"width 0.3s ease",position:"fixed",top:0,left:0,zIndex:100,overflowY:"auto",overflowX:"hidden"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,padding:"0 4px"}}>
      <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>setSideOpen(p=>!p)}>
        <span style={{fontSize:16,color:"#050810",fontWeight:900}}>⚡</span>
      </div>
      {sideOpen&&<div><div style={{color:"#00ff88",fontWeight:700,fontSize:13,fontFamily:"'Fira Code',monospace"}} className="glow">CyberPath Academy</div><div style={{color:"var(--t2)",fontSize:10}}>24M | 80W | 5 Phases</div></div>}
      <button className="theme-tgl" onClick={toggleTheme} title={theme==="dark"?"الوضع النهاري":"الوضع الليلي"}>{theme==="dark"?"☀️":"🌙"}</button>
    </div>
    {sideOpen&&<div style={{fontSize:10,color:"var(--t3)",padding:"4px 6px",fontFamily:"'Fira Code',monospace"}}>NAVIGATION</div>}
    {[
      {id:"dashboard",icon:"📊",label:"Dashboard"},
      {id:"program",icon:"🗺️",label:"البرنامج الكامل"},
      {id:"missions",icon:"🎯",label:"Daily Missions"},
      {id:"quiz",icon:"📝",label:"الاختبارات"},
      {id:"achievements",icon:"🏅",label:"الإنجازات"},
      {id:"resources",icon:"📚",label:"Resources Hub"},
      {id:"todo",icon:"✅",label:"Todo List"},
      {id:"routine",icon:"🕐",label:"الروتين الإسلامي"},
      {id:"stats",icon:"📈",label:"الإحصائيات"},
    ].map(item=>(<div key={item.id} className={`nav ${page===item.id?"on":""}`} onClick={()=>setPage(item.id)} title={item.label} style={{minHeight:44}}>
      <span style={{fontSize:18,flexShrink:0}}>{item.icon}</span>
      {sideOpen&&<span style={{fontFamily:"'Cairo',sans-serif",fontSize:13}}>{item.label}</span>}
    </div>))}
    {sideOpen&&(<div style={{marginTop:"auto",padding:12,background:"rgba(0,255,136,0.05)",borderRadius:8,border:"1px solid rgba(0,255,136,0.1)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{fontSize:18}}>{lv.icon}</span>
        <div><div style={{color:lv.color,fontSize:12,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{lv.ar}</div><div style={{color:"var(--t2)",fontSize:10}}>{s.xp} XP</div></div>
      </div>
      <div className="bar"><div className="bar-fill" style={{width:`${lvPct}%`,background:`linear-gradient(90deg,${lv.color},${lv.color}88)`}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
        <span style={{color:"var(--t3)",fontSize:10}}>Wk {s.currentWeek}/80</span>
        <span style={{color:"var(--t3)",fontSize:10}}>🔥{s.streak}</span>
      </div>
    </div>)}
  </div>);

  // ─── DASHBOARD ───
  const Dashboard=()=>(<div className="slide">
    <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.15)",borderRadius:16,padding:isMobile?"16px":"24px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-20,right:-20,width:200,height:200,background:"radial-gradient(circle,rgba(0,255,136,0.08),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:4}}>// مرحباً في CyberPath Academy</div>
      <h1 style={{color:"var(--t0)",fontSize:isMobile?18:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>طريقك للاحتراف في الأمن السيبراني 🛡️</h1>
      <p style={{color:"var(--t4)",fontSize:isMobile?12:13,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>برنامج 24 شهراً | 80 أسبوع | 5 مراحل | 16 Track + موارد حقيقية ومتحقق منها</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button className="btn btn-g" onClick={()=>setPage("program")}>🗺️ البرنامج الكامل</button>
        <button className="btn btn-o" onClick={()=>setPage("missions")}>🎯 مهام اليوم</button>
        <button className="btn btn-o" onClick={doCheckIn}>🕌 تسجيل الحضور</button>
      </div>
    </div>
    <div className="stg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:8,marginBottom:20}}>
      {[
        {label:"تقدم البرنامج",val:`${donePct}%`,icon:"📊",color:"#00ff88",sub:`${s.totalDone}/${totalT} موضوع`},
        {label:"المستوى",val:lv.icon,icon:"🏆",color:lv.color,sub:lv.ar},
        {label:"🔥 السلسلة",val:`${s.streak} يوم`,icon:"🔥",color:"#f97316",sub:`الأفضل: ${s.bestStreak}`},
        {label:"XP الكلي",val:s.xp,icon:"⭐",color:"#fbbf24",sub:`${nlv.lv>lv.lv?nlv.min-s.xp:0} XP للتالي`},
        {label:"الإنجازات",val:`${s.badges.length}/${BADGES.length}`,icon:"🏅",color:"#a78bfa",sub:"شارة"},
        {label:"الاختبارات",val:Object.keys(s.quizHistory).length,icon:"📝",color:"#00d4ff",sub:`من ${Object.keys(QUIZZES).length}`},
      ].map((st,i)=>(<div key={i} className="stat-card hov-up scale-click">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <span style={{fontSize:18}}>{st.icon}</span>
          <span style={{color:st.color,fontSize:18,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
        </div>
        <div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",marginTop:6}}>{st.label}</div>
        <div style={{color:"var(--t2)",fontSize:11,marginTop:2,fontFamily:"'Cairo',sans-serif"}}>{st.sub}</div>
      </div>))}
    </div>
    {/* ─ بطاقة خطة اليوم الرئيسية ─ */}
    {(()=>{
      const todayAr=getTodayDayAr();
      const isFriday=todayAr==="الجمعة";
      const dayPlan=DAY_PLAN(s.currentWeek);
      const todayPlan=dayPlan.find(d=>d.day===todayAr)||null;
      const todayHrs=s.studyLog?.[today()]||0;
      const weekDates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toISOString().split("T")[0];});
      const weekHrs=weekDates.reduce((a,d)=>a+(s.studyLog?.[d]||0),0);
      return(<div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.07),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.25)",borderRadius:14,padding:isMobile?"14px":"18px",marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{color:"#00ff88",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>📅 خطة اليوم — {todayAr}</div>
            <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>الأسبوع {s.currentWeek} · {curWk?.title}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {todayPlan&&<span style={{background:"rgba(0,255,136,0.1)",color:"#00ff88",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>⏱ {todayPlan.hrs}h مقترحة</span>}
            <span style={{background:todayHrs>0?"rgba(167,139,250,0.15)":"var(--bt)",color:todayHrs>0?"#a78bfa":"var(--t3)",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>✓ {todayHrs}h مسجلة</span>
            <span style={{background:"rgba(249,115,22,0.1)",color:"#f97316",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>📅 {weekHrs.toFixed(1)}h أسبوعياً</span>
          </div>
        </div>
        {isFriday?(
          <div style={{textAlign:"center",padding:"12px 0",color:"#fde047",fontSize:13,fontFamily:"'Cairo',sans-serif"}}>🕌 يوم الجمعة — يوم الراحة والعبادة · سورة الكهف · صلاة الجمعة</div>
        ):todayPlan?(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {todayPlan.items.slice(0,4).map((item,i)=>{
              const dn=item.type==="mission"?!!s.doneMissions?.[`m-${item.wk}-${item.idx}`]:!!s.doneTopics?.[`${item.wk}-${item.idx}`];
              return(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:dn?"rgba(0,255,136,0.04)":"var(--bo)",borderRadius:8,border:`1px solid ${dn?"rgba(0,255,136,0.2)":"var(--w5)"}`,cursor:"pointer"}}
                onClick={()=>{setPage("missions");}}>
                <div style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${dn?"#00ff88":"rgba(0,255,136,0.3)"}`,background:dn?"#00ff88":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {dn&&<span style={{color:"var(--bg4)",fontSize:8,fontWeight:900}}>✓</span>}
                </div>
                <span style={{color:dn?"var(--t2)":"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",flex:1,textDecoration:dn?"line-through":"none"}}>{item.icon} {item.text}</span>
                <span style={{color:item.type==="mission"?"#00ff88":"#00d4ff",fontSize:10,flexShrink:0}}>+{item.xp} XP</span>
              </div>);
            })}
            {todayPlan.items.length>4&&(<div style={{color:"var(--t2)",fontSize:11,textAlign:"center",fontFamily:"'Cairo',sans-serif",cursor:"pointer",padding:"5px"}} onClick={()=>setPage("missions")}>+ {todayPlan.items.length-4} مهام أخرى ← اعرض الكل</div>)}
          </div>
        ):(
          <div style={{color:"var(--t3)",textAlign:"center",padding:"12px 0",fontFamily:"'Cairo',sans-serif",fontSize:12}}>لا توجد مهام مخطط لهذا اليوم</div>
        )}
        <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
          <button className="btn btn-g" style={{fontSize:11,padding:"6px 14px",flex:1}} onClick={()=>setPage("missions")}>🎯 خطة الأسبوع الكاملة</button>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 14px"}} onClick={doCheckIn}>🕌 تسجيل الحضور</button>
        </div>
      </div>);
    })()}

    <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:20}}>
      <div className="card" style={{padding:14}}>
        <div style={{color:"var(--t0)",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>📍 الأسبوع الحالي — Week {s.currentWeek}</div>
        {curWk&&(<>
          <div style={{color:curPh.color,fontSize:12,fontFamily:"'Fira Code',monospace",marginBottom:6}}>{curPh.icon} {curPh.nameAr}</div>
          <div style={{color:"var(--t4)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>{curWk.title}</div>
          <div className="bar"><div className="bar-fill" style={{width:`${donePct}%`,background:"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <button className="btn btn-o" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setPage("missions")}>🎯 المهام</button>
            {QUIZZES[curWk.quizId]&&!s.quizHistory[curWk.quizId]&&(<button className="btn btn-g" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>startQuiz(curWk.quizId)}>📝 اختبار</button>)}
            {s.quizHistory[curWk.quizId]&&(<button className="btn btn-g" style={{fontSize:11,padding:"5px 10px"}} onClick={advWeek}>🚀 الأسبوع التالي</button>)}
          </div>
        </>)}
      </div>
      <div className="card" style={{padding:14}}>
        <div style={{color:"var(--t0)",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🕌 أوقات الصلاة</div>
        {ROUTINE.filter(r=>r.type==="prayer").slice(0,5).map((r,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:7,background:"rgba(250,204,21,0.06)",border:"1px solid rgba(250,204,21,0.1)",marginBottom:5}}>
          <span style={{fontSize:13}}>{r.icon}</span>
          <span style={{color:"#fde047",fontSize:12,fontFamily:"'Cairo',sans-serif",flex:1}}>{r.label}</span>
          <span style={{color:"#78716c",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{r.time}</span>
        </div>))}
      </div>
    </div>
    <h2 style={{color:"var(--t0)",fontSize:15,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🚀 المراحل الخمس</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>
      {PHASES.map(ph=>{
        const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
        const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
        const pct=pt>0?Math.round(pd/pt*100):0;
        return(<div key={ph.id} className="card" style={{padding:14,cursor:"pointer",borderColor:ph.id===curPh.id?"rgba(0,255,136,0.4)":""}} onClick={()=>{setPage("program");setExpPhase(ph.id);}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:22}}>{ph.icon}</span>
            <div>
              <div style={{color:"var(--t0)",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{ph.nameAr}</div>
              <div style={{color:"var(--t2)",fontSize:10}}>{ph.monthLabel}</div>
            </div>
            {ph.id===curPh.id&&<span style={{marginLeft:"auto",fontSize:10,color:"#00ff88",background:"rgba(0,255,136,0.12)",padding:"2px 7px",borderRadius:4}}>● نشط</span>}
          </div>
          <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{color:"var(--t1)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{ph.desc.substring(0,35)}…</span>
            <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
          </div>
        </div>);
      })}
    </div>
  </div>);

  // ─── PROGRAM ───
  const Program=()=>(<div className="slide">
    <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🗺️ البرنامج الكامل</h1>
    <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:14}}>24 شهراً | 80 أسبوع | 5 مراحل</p>
    {PHASES.map(ph=>{
      const isO=expPhase===ph.id;
      const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
      const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
      const pct=pt>0?Math.round(pd/pt*100):0;
      return(<div key={ph.id} style={{border:`1px solid ${isO?ph.color+"44":"var(--wb)"}`,borderRadius:12,marginBottom:10,overflow:"hidden",background:isO?ph.bg:"var(--bo)"}}>
        <div className="phase-hd" onClick={()=>setExpPhase(isO?null:ph.id)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>{ph.icon}</span>
            <div>
              <div style={{color:"var(--t0)",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{ph.nameAr} — {ph.nameEn}</div>
              <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{ph.monthLabel} | Weeks {ph.startWeek}–{ph.endWeek} | +{ph.phaseXP} XP</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:90}}>
              <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:ph.color}}/></div>
              <div style={{color:ph.color,fontSize:10,marginTop:2,fontFamily:"'Fira Code',monospace",textAlign:"right"}}>{pct}%</div>
            </div>
            <span style={{color:"var(--t1)",fontSize:14,transform:isO?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
          </div>
        </div>
        {isO&&(<div style={{padding:"0 16px 16px"}}>
          <p style={{color:"var(--t4)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:12,paddingTop:8}}>{ph.desc}</p>
          {ph.weeks.map(w=>{
            const wKey=`${ph.id}-${w.wk}`;const wO=expWeek===wKey;
            const wd=w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length;
            const wPct=Math.round(wd/w.topics.length*100);
            const qd=s.quizHistory[w.quizId];const isCur=w.wk===s.currentWeek;
            return(<div key={w.wk} style={{border:`1px solid ${isCur?"rgba(0,255,136,0.4)":wO?"var(--wh)":"var(--w5)"}`,borderRadius:8,marginBottom:6,background:isCur?"rgba(0,255,136,0.04)":"var(--bo)"}}>
              <div style={{padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}} onClick={()=>setExpWeek(wO?null:wKey)}>
                <div style={{width:30,height:30,borderRadius:6,background:`${ph.color}22`,border:`1px solid ${ph.color}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:ph.color,fontSize:10,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{w.wk}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",gap:6}}>
                    {isCur&&<span style={{fontSize:9,color:"#00ff88",background:"rgba(0,255,136,0.12)",padding:"1px 5px",borderRadius:4}}>● الحالي</span>}
                    {w.title}
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:1}}>
                    <span style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{wd}/{w.topics.length} topics</span>
                    {qd&&<span style={{color:"#10b981",fontSize:10}}>✓ Quiz {qd.score}%</span>}
                  </div>
                </div>
                <div style={{width:55}}><div className="bar"><div className="bar-fill" style={{width:`${wPct}%`,background:ph.color}}/></div></div>
                <span style={{color:"var(--t1)",fontSize:11,transform:wO?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
              </div>
              {wO&&(<div style={{padding:"0 12px 12px"}}>
                <div style={{display:"grid",gridTemplateColumns:g2,gap:10}}>
                    <div className="stg">
                    <div style={{color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:5}}>// missions (+5 XP)</div>
                    {w.missions.map((m,mi)=>{const mk=`m-${w.wk}-${mi}`;const dn=!!s.doneMissions?.[mk];return(<div key={mi} className="topic-row" onClick={()=>markMission(w.wk,mi)}>
                      <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"var(--bg4)",fontSize:9,fontWeight:900}}>✓</span>}</div>
                      <span style={{color:dn?"var(--t2)":"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{m}</span>
                    </div>);})}
                  </div>
                  <div className="stg">
                    <div style={{color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:5}}>// topics (+10 XP)</div>
                    {w.topics.map((t,ti)=>{const tk=`${w.wk}-${ti}`;const dn=!!s.doneTopics?.[tk];return(<div key={ti} className="topic-row" onClick={()=>markTopic(w.wk,ti)}>
                      <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"var(--bg4)",fontSize:9,fontWeight:900}}>✓</span>}</div>
                      <span style={{color:dn?"var(--t2)":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{t}</span>
                    </div>);})}
                  </div>
                </div>
                {QUIZZES[w.quizId]&&(<div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                  {!qd?<button className="btn btn-g" style={{fontSize:11,padding:"5px 12px"}} onClick={()=>startQuiz(w.quizId)}>📝 اختبار الأسبوع {w.quizId.replace("wk","")}</button>
                      :<span style={{color:"#10b981",fontSize:12,fontFamily:"'Cairo',sans-serif",padding:"5px 0"}}>✓ اجتزت الاختبار — {qd.score}%</span>}
                  {isCur&&qd&&<button className="btn btn-o" style={{fontSize:11,padding:"5px 12px"}} onClick={advWeek}>🚀 الأسبوع التالي</button>}
                </div>)}
                {ph.relatedTracks.filter(tid=>TRACKS[tid]).length>0&&(<div style={{marginTop:10,background:"var(--bo)",borderRadius:6,padding:8}}>
                  <div style={{color:"var(--t3)",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:6}}>// موارد مرتبطة</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {ph.relatedTracks.filter(tid=>TRACKS[tid]).map(tid=>(<button key={tid} onClick={()=>{setResTid(tid);setPage("resources");}}
                      style={{padding:"4px 10px",borderRadius:5,border:`1px solid ${TRACKS[tid].color}44`,background:`${TRACKS[tid].color}15`,color:TRACKS[tid].color,cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:11}}>
                      {TRACKS[tid].icon} {TRACKS[tid].name} →
                    </button>))}
                  </div>
                </div>)}
              </div>)}
            </div>);
          })}
        </div>)}
      </div>);
    })}
  </div>);

  // ─── MISSIONS ───
  const Missions=()=>{
    const wD=curWk;if(!wD)return null;
    const mD=wD.missions.filter((_,i)=>s.doneMissions?.[`m-${s.currentWeek}-${i}`]).length;
    const tD=wD.topics.filter((_,i)=>s.doneTopics?.[`${s.currentWeek}-${i}`]).length;
    const todayAr=getTodayDayAr();
    const dayPlan=DAY_PLAN(s.currentWeek);
    const todayPlan=dayPlan.find(d=>d.day===todayAr)||null;
    const isFriday=todayAr==="الجمعة";
    // ساعات الأسبوع
    const weekDates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toISOString().split("T")[0];});
    const weekHrs=weekDates.reduce((a,d)=>a+(s.studyLog?.[d]||0),0);
    const todayHrs=s.studyLog?.[today()]||0;
    const totalHrs=Object.values(s.studyLog||{}).reduce((a,h)=>a+h,0);
    // تقرير الأسبوع المحفوظ
    const savedReport=s.weeklyReports?.[`wk${s.currentWeek}`];
    // قائمة المراجعة SR
    const reviewWks=getReviewWeeks(s);
    const qd=s.quizHistory[wD.quizId];
    const phPct=Math.round((tD/wD.topics.length)*100);
    return(<div className="slide">
      {/* ─ رأس الصفحة ─ */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div>
          <h1 style={{color:"var(--t0)",fontSize:isMobile?18:21,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>🎯 خطة اليوم والأسبوع</h1>
          <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace"}}>الأسبوع {s.currentWeek} — {wD.title} — {findPhase(s.currentWeek).nameAr}</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 12px"}} onClick={doCheckIn}>🕌 حضور +15 XP</button>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 12px"}} onClick={saveWeekReport}>📋 حفظ التقرير</button>
        </div>
      </div>

      {/* ─ بطاقات الحالة ─ */}
      <div className="stg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:16}}>
        {[
          {label:"المهام",val:`${mD}/${wD.missions.length}`,color:"#00ff88",icon:"🎯"},
          {label:"المواضيع",val:`${tD}/${wD.topics.length}`,color:"#00d4ff",icon:"📚"},
          {label:"ساعات اليوم",val:`${todayHrs}h`,color:"#a78bfa",icon:"⏱️"},
          {label:"ساعات الأسبوع",val:`${weekHrs.toFixed(1)}h`,color:"#f97316",icon:"📅"},
          {label:"إجمالي الساعات",val:`${totalHrs.toFixed(0)}h`,color:"#fbbf24",icon:"⭐"},
          {label:"🔥 السلسلة",val:`${s.streak} يوم`,color:"#ef4444",icon:"🔥"},
        ].map((st,i)=>(<div key={i} className="stat-card hov-up scale-click" style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:16}}>{st.icon}</span>
            <span style={{color:st.color,fontSize:16,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
          </div>
          <div style={{color:"var(--t4)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:5}}>{st.label}</div>
        </div>))}
      </div>

      {/* ─ تسجيل ساعات الدراسة ─ */}
      <div style={{background:"linear-gradient(135deg,rgba(167,139,250,0.07),rgba(0,212,255,0.04))",border:"1px solid rgba(167,139,250,0.2)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#a78bfa",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>⏱️ سجّل ساعات دراستك اليوم</div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <input type="number" min="0.5" max="16" step="0.5" placeholder="مثال: 2.5" value={studyHoursInput} onChange={e=>setStudyHoursInput(e.target.value)}
            style={{width:120,flex:"0 0 auto"}} onKeyDown={e=>e.key==="Enter"&&logStudyHours(studyHoursInput)}/>
          <span style={{color:"var(--t1)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>ساعة</span>
          <button className="btn btn-g" style={{fontSize:12,padding:"8px 18px"}} onClick={()=>logStudyHours(studyHoursInput)}>+ تسجيل</button>
          {todayHrs>0&&<span style={{color:"#a78bfa",fontSize:12,fontFamily:"'Cairo',sans-serif",background:"rgba(167,139,250,0.1)",padding:"4px 10px",borderRadius:6}}>اليوم: {todayHrs}h ✓</span>}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
          {weekDates.slice(0,7).reverse().map((d,i)=>{const h=s.studyLog?.[d]||0;const label=["ج","خ","أ","ث","إ","أح","س"][6-i]||"";
            return(<div key={d} style={{textAlign:"center",flex:1,minWidth:32}}>
              <div style={{height:40,background:h>0?`rgba(167,139,250,${Math.min(0.8,h*0.15)})`:"var(--wm)",borderRadius:4,border:`1px solid ${h>0?"rgba(167,139,250,0.3)":"var(--wo)"}`,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:3}}>
                <span style={{color:h>0?"#a78bfa":"var(--t3)",fontSize:9,fontFamily:"'Fira Code',monospace"}}>{h>0?h:""}</span>
              </div>
              <div style={{color:"var(--t2)",fontSize:9,marginTop:2}}>{label}</div>
            </div>);
          })}
        </div>
      </div>

      {/* ─ خطة اليوم ─ */}
      {isFriday?(
        <div style={{background:"linear-gradient(135deg,rgba(250,204,21,0.08),rgba(52,211,153,0.04))",border:"1px solid rgba(250,204,21,0.25)",borderRadius:12,padding:16,marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:8}}>🕌</div>
          <div style={{color:"#fde047",fontSize:16,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>يوم الجمعة — يوم الراحة والعبادة</div>
          <div style={{color:"var(--t4)",fontSize:13,fontFamily:"'Cairo',sans-serif",lineHeight:1.8}}>
            ✦ قراءة سورة الكهف • ✦ صلاة الجمعة • ✦ الإكثار من الصلاة على النبي ﷺ<br/>
            لا دراسة تقنية اليوم — استرح وجدّد نشاطك للأسبوع القادم
          </div>
        </div>
      ):(
        <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.03))",border:"1px solid rgba(0,255,136,0.2)",borderRadius:12,padding:14,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:6}}>
            <div style={{color:"#00ff88",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>📅 خطة اليوم — {todayAr}</div>
            {todayPlan&&<span style={{background:"rgba(0,255,136,0.1)",color:"#00ff88",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>⏱ {todayPlan.hrs} ساعة مقترحة</span>}
          </div>
          {todayPlan?(
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {todayPlan.items.map((item,i)=>{
                const dn=item.type==="mission"?!!s.doneMissions?.[`m-${item.wk}-${item.idx}`]:!!s.doneTopics?.[`${item.wk}-${item.idx}`];
                return(<div key={i} className="topic-row" style={{background:dn?"rgba(0,255,136,0.04)":"rgba(255,255,255,0.02)",border:`1px solid ${dn?"rgba(0,255,136,0.2)":"var(--wo)"}`,borderRadius:8,padding:"10px 12px"}}
                  onClick={()=>item.type==="mission"?markMission(item.wk,item.idx):markTopic(item.wk,item.idx)}>
                  <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"var(--bg4)",fontSize:10,fontWeight:900}}>✓</span>}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <span style={{color:dn?"var(--t2)":"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{item.text}</span>
                  </div>
                  <span style={{fontSize:11,color:item.type==="mission"?"#00ff88":"#00d4ff",background:item.type==="mission"?"rgba(0,255,136,0.08)":"rgba(0,212,255,0.08)",padding:"2px 7px",borderRadius:4,flexShrink:0}}>{item.icon} +{item.xp}</span>
                </div>);
              })}
            </div>
          ):(
            <div style={{color:"var(--t3)",textAlign:"center",padding:"20px 0",fontFamily:"'Cairo',sans-serif"}}>لا توجد مهام مخطط لها اليوم</div>
          )}
        </div>
      )}

      {/* ─ جميع المهام والمواضيع الأسبوعية ─ */}
      <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:16}}>
        <div className="card" style={{padding:14}}>
          <div style={{color:"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🎯 مهام الأسبوع <span style={{color:"#00ff88",fontSize:10}}>+5 XP لكل</span></div>
          <div className="bar" style={{marginBottom:8}}><div className="bar-fill" style={{width:`${Math.round(mD/wD.missions.length*100)}%`,background:"linear-gradient(90deg,#00ff88,#10b981)"}}/></div>
          {wD.missions.map((m,i)=>{const dn=!!s.doneMissions?.[`m-${s.currentWeek}-${i}`];return(<div key={i} className="topic-row" onClick={()=>markMission(s.currentWeek,i)}>
            <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"var(--bg4)",fontSize:10,fontWeight:900}}>✓</span>}</div>
            <span style={{color:dn?"var(--t2)":"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none",flex:1}}>{m}</span>
          </div>);})}
        </div>
        <div className="card" style={{padding:14}}>
          <div style={{color:"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>📚 مواضيع الأسبوع <span style={{color:"#00d4ff",fontSize:10}}>+10 XP لكل</span></div>
          <div className="bar" style={{marginBottom:8}}><div className="bar-fill" style={{width:`${phPct}%`,background:"linear-gradient(90deg,#00d4ff,#3b82f6)"}}/></div>
          {wD.topics.map((t,i)=>{const dn=!!s.doneTopics?.[`${s.currentWeek}-${i}`];return(<div key={i} className="topic-row" onClick={()=>markTopic(s.currentWeek,i)}>
            <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"var(--bg4)",fontSize:10,fontWeight:900}}>✓</span>}</div>
            <span style={{color:dn?"var(--t2)":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none",flex:1}}>{t}</span>
          </div>);})}
          {QUIZZES[wD.quizId]&&(<div style={{marginTop:10,padding:10,background:qd?"rgba(16,185,129,0.06)":"rgba(0,212,255,0.05)",border:`1px solid ${qd?"rgba(16,185,129,0.3)":"rgba(0,212,255,0.2)"}`,borderRadius:8}}>
            {!qd?(<><div style={{color:"#00d4ff",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>📝 اختبار الأسبوع متاح!</div>
              <button className="btn btn-g" style={{fontSize:11,padding:"5px 12px",width:"100%"}} onClick={()=>startQuiz(wD.quizId)}>ابدأ الاختبار</button></>)
            :(<div style={{color:"#10b981",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>✓ اجتزت الاختبار — {qd.score}% | {qd.score>=80?"✅ ناجح":"📖 يمكن التحسين"}</div>)}
          </div>)}
        </div>
      </div>

      {/* ─ مراجعة Spaced Repetition ─ */}
      {reviewWks.length>0&&(<div style={{background:"rgba(251,191,36,0.05)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#fbbf24",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🔄 مراجعة مقترحة — Spaced Repetition</div>
        <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>هذه الأسابيع تحتاج مراجعة للترسيخ في الذاكرة طويلة الأمد</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {reviewWks.map(wk=>{const w=findWeek(wk);const ph=findPhase(wk);return w?(
            <div key={wk} style={{background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:8,padding:"8px 12px",cursor:"pointer"}} onClick={()=>{setExpPhase(ph.id);setExpWeek(`${ph.id}-${wk}`);setPage("program");}}>
              <div style={{color:"#fbbf24",fontSize:12,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>Week {wk}</div>
              <div style={{color:"var(--t4)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{w.title}</div>
            </div>
          ):null;})}
        </div>
      </div>)}

      {/* ─ التقرير الأسبوعي ─ */}
      {(weekReportOpen||savedReport)&&(<div style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.2)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{color:"#00ff88",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>📋 تقرير الأسبوع {s.currentWeek}</div>
          <button style={{background:"transparent",border:"none",color:"var(--t1)",cursor:"pointer",fontSize:16}} onClick={()=>setWeekReportOpen(false)}>×</button>
        </div>
        {(()=>{const r=savedReport||generateWeekReport();if(!r)return null;return(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
            {[
              {label:"المرحلة",val:r.phase,color:"#3b82f6",icon:"🏗️"},
              {label:"الموضوع",val:r.title,color:"var(--t0)",icon:"📖"},
              {label:"المهام",val:`${r.mDone}/${r.mTotal}`,color:"#00ff88",icon:"🎯"},
              {label:"المواضيع",val:`${r.tDone}/${r.tTotal}`,color:"#00d4ff",icon:"📚"},
              {label:"ساعات الدراسة",val:`${r.weekHrs}h`,color:"#a78bfa",icon:"⏱️"},
              {label:"نتيجة الاختبار",val:r.quizScore!==null?`${r.quizScore}%`:"لم يُجتز",color:r.quizScore>=80?"#10b981":"#f59e0b",icon:"📝"},
            ].map((st,i)=>(<div key={i} style={{background:"var(--bo)",borderRadius:8,padding:"10px",border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontSize:16,marginBottom:4}}>{st.icon}</div>
              <div style={{color:st.color,fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{st.val}</div>
              <div style={{color:"var(--t1)",fontSize:10,fontFamily:"'Cairo',sans-serif",marginTop:2}}>{st.label}</div>
            </div>))}
          </div>
        );})()}
      </div>)}

      {/* ─ زر التقدم للأسبوع التالي ─ */}
      {qd&&s.currentWeek<80&&(<div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.3)",borderRadius:12,padding:14,textAlign:"center"}}>
        <div style={{color:"var(--t0)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>✅ أكملت اختبار هذا الأسبوع — جاهز للتقدم!</div>
        <button className="btn btn-g" style={{fontSize:13,padding:"10px 28px"}} onClick={()=>{saveWeekReport();advWeek();}}>🚀 الأسبوع {s.currentWeek+1} ←</button>
      </div>)}
    </div>);};


  // ─── QUIZ ───
  const QuizPage=()=>{
    if(!quiz.active||!quiz.wkId)return(<div className="slide">
      <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>📝 الاختبارات الأسبوعية</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
        {Object.entries(QUIZZES).map(([id,q])=>{const dn=s.quizHistory[id];const wn=parseInt(id.replace("wk",""));const ph=findPhase(wn);return(<div key={id} className="card" style={{padding:14,cursor:"pointer"}} onClick={()=>startQuiz(id)}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:16}}>{ph?.icon||"📝"}</span>
            <div style={{flex:1}}>
              <div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{q.title}</div>
              <div style={{color:"var(--t2)",fontSize:10}}>Week {wn} — {q.qs.length} أسئلة</div>
            </div>
            {dn&&<span style={{color:"#10b981",fontSize:10,background:"rgba(16,185,129,0.12)",padding:"2px 7px",borderRadius:4}}>{dn.score}% ✓</span>}
          </div>
          <button style={{width:"100%",padding:"6px",borderRadius:6,border:`1px solid ${dn?"#10b981":"rgba(0,255,136,0.3)"}`,background:dn?"rgba(16,185,129,0.08)":"transparent",color:dn?"#10b981":"#00ff88",cursor:"pointer",fontFamily:"'Fira Code',monospace",fontSize:11}}>
            {dn?"🔄 إعادة الاختبار":"▶ ابدأ الاختبار"}
          </button>
        </div>);})}
      </div>
    </div>);
    const q=QUIZZES[quiz.wkId];
    return(<div className="slide">
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <button className="btn btn-o" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setQuiz({active:false,wkId:null,ans:{},submitted:false,score:0})}>← رجوع</button>
        <div><h1 style={{color:"var(--t0)",fontSize:18,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>{q.title}</h1><p style={{color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{q.qs.length} أسئلة</p></div>
      </div>
      {quiz.submitted?(<div>
        <div style={{background:quiz.score>=80?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${quiz.score>=80?"#10b981":"#ef4444"}`,borderRadius:12,padding:18,marginBottom:18,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:6}}>{quiz.score===100?"🏆":quiz.score>=80?"✅":"📖"}</div>
          <div style={{color:"var(--t0)",fontSize:26,fontWeight:900,fontFamily:"'Fira Code',monospace"}}>{quiz.score}%</div>
          <div style={{color:"var(--t4)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginTop:4}}>{quiz.score===100?"ممتاز — علامة كاملة!":quiz.score>=80?"جيد جداً — تجاوزت الحد!":"تحتاج مزيداً من الدراسة"}</div>
        </div>
        {q.qs.map((qst,i)=>{const ans=quiz.ans[i];const ok=ans===qst.a;return(<div key={i} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${ok?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`,borderRadius:8,padding:12,marginBottom:8}}>
          <div style={{color:"var(--t0)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>{ok?"✅":"❌"} {qst.q}</div>
          <div style={{color:ok?"#6ee7b7":"#f87171",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>إجابتك: {ans!==undefined?qst.os[ans]:"لم تجب"}</div>
          {!ok&&<div style={{color:"#6ee7b7",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>الصحيح: {qst.os[qst.a]}</div>}
          <div style={{color:"var(--t1)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{qst.exp}</div>
        </div>);})}
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-o" onClick={()=>setQuiz({active:true,wkId:quiz.wkId,ans:{},submitted:false,score:0})}>🔄 إعادة</button>
          <button className="btn btn-g" onClick={()=>setQuiz({active:false,wkId:null,ans:{},submitted:false,score:0})}>← الكل</button>
        </div>
      </div>):(<div>
        {q.qs.map((qst,i)=>(<div key={i} style={{background:"var(--bt)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:14,marginBottom:14}}>
          <div style={{color:"var(--t0)",fontSize:14,fontFamily:"'Cairo',sans-serif",marginBottom:10,fontWeight:600}}>{i+1}. {qst.q}</div>
          <div style={{display:"grid",gridTemplateColumns:g2,gap:8}}>
            {qst.os.map((opt,oi)=>(<button key={oi} className={`quiz-opt ${quiz.ans[i]===oi?"sel":""}`} onClick={()=>setQuiz(prev=>({...prev,ans:{...prev.ans,[i]:oi}}))}>
              {["A","B","C","D"][oi]}. {opt}
            </button>))}
          </div>
        </div>))}
        <button className="btn btn-g" onClick={submitQuiz} disabled={Object.keys(quiz.ans).length<q.qs.length} style={{opacity:Object.keys(quiz.ans).length<q.qs.length?0.5:1}}>
          📤 تسليم ({Object.keys(quiz.ans).length}/{q.qs.length})
        </button>
      </div>)}
    </div>);};

  // ─── ACHIEVEMENTS ───
  const Achievements=()=>{
    // تحقق من الشهادات المستحقة
    PHASES.forEach(ph=>{
      const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
      const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
      const quizzesDone=ph.weeks.every(w=>!QUIZZES[w.quizId]||s.quizHistory[w.quizId]);
      if(pd===pt&&quizzesDone&&!s.certificates?.includes(ph.id))earnCertificate(ph.id);
    });
    return(<div className="slide">
    <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🏅 الإنجازات والشهادات</h1>
    <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:16}}>{s.badges.length}/{BADGES.length} شارة · {s.certificates?.length||0}/5 شهادة</p>

    {/* ─ شهادات المراحل ─ */}
    <h2 style={{color:"var(--t0)",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🎓 شهادات إنهاء المراحل</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,marginBottom:20}}>
      {PHASES.map(ph=>{
        const earned=s.certificates?.includes(ph.id);
        const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
        const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
        const pct=pt>0?Math.round(pd/pt*100):0;
        return(<div key={ph.id} style={{background:earned?`linear-gradient(135deg,${ph.color}15,${ph.color}08)`:"var(--bt)",border:`2px solid ${earned?ph.color:"var(--wb)"}`,borderRadius:12,padding:14,position:"relative",overflow:"hidden",cursor:earned?"pointer":"default"}}
          onClick={()=>earned&&setCertModal(ph)}>
          {earned&&<div style={{position:"absolute",top:0,right:0,background:`linear-gradient(135deg,${ph.color},${ph.color}88)`,color:"var(--bg4)",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:"0 12px 0 8px"}}>✓ مكتسبة</div>}
          <div style={{fontSize:32,marginBottom:8,opacity:earned?1:0.3}}>{ph.icon}</div>
          <div style={{color:earned?ph.color:"var(--t1)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{ph.nameAr}</div>
          <div style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:8}}>{ph.monthLabel} · Wk {ph.startWeek}–{ph.endWeek}</div>
          <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{color:"var(--t2)",fontSize:10,fontFamily:"'Cairo',sans-serif"}}>{pd}/{pt} موضوع</span>
            <span style={{color:earned?ph.color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
          </div>
          {earned&&<div style={{color:"#fbbf24",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:6}}>🎓 انقر لعرض الشهادة</div>}
        </div>);
      })}
    </div>

    {/* ─ مستوى XP ─ */}
    <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.03))",border:"1px solid rgba(0,255,136,0.2)",borderRadius:12,padding:18,marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:44}}>{lv.icon}</div>
          <div style={{color:lv.color,fontSize:13,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{lv.ar}</div>
          <div style={{color:"var(--t1)",fontSize:11}}>{lv.en}</div>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>Level {lv.lv} → {nlv?.lv||"MAX"}</span>
            <span style={{color:lv.color,fontSize:12,fontFamily:"'Fira Code',monospace"}}>{s.xp} XP</span>
          </div>
          <div className="bar" style={{height:10}}><div className="bar-fill" style={{width:`${lvPct}%`,background:`linear-gradient(90deg,${lv.color},${lv.color}88)`}}/></div>
          <div style={{color:"var(--t2)",fontSize:11,marginTop:4,fontFamily:"'Cairo',sans-serif"}}>{nlv&&nlv.lv!==lv.lv?`${nlv.min-s.xp} XP للمستوى التالي: ${nlv.ar}`:"وصلت لأعلى مستوى 🏆"}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:7,marginTop:14}}>
        {LEVELS.map(l=>(<div key={l.lv} style={{padding:"7px",borderRadius:7,background:lv.lv>=l.lv?`${l.color}15`:"var(--bo)",border:`1px solid ${lv.lv>=l.lv?l.color+"44":"var(--w5)"}`,textAlign:"center"}}>
          <div style={{fontSize:18,opacity:lv.lv>=l.lv?1:0.25}}>{l.icon}</div>
          <div style={{color:lv.lv>=l.lv?l.color:"var(--t3)",fontSize:10,fontFamily:"'Cairo',sans-serif",marginTop:3}}>{l.ar}</div>
          <div style={{color:"var(--t3)",fontSize:9}}>{l.min} XP</div>
        </div>))}
      </div>
    </div>
    <h2 style={{color:"var(--t0)",fontSize:15,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🎖️ الشارات</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
      {BADGES.map(b=>{const earned=s.badges.includes(b.id);return(<div key={b.id} style={{background:earned?"rgba(0,255,136,0.05)":"var(--bo)",border:`1px solid ${earned?"rgba(0,255,136,0.3)":"var(--wo)"}`,borderRadius:10,padding:12,opacity:earned?1:0.5}}>
        <div style={{fontSize:28,marginBottom:5}}>{b.icon}</div>
        <div style={{color:earned?"var(--t0)":"var(--t1)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{b.ar}</div>
        <div style={{color:"var(--t1)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:2}}>{b.desc}</div>
        <div style={{color:earned?"#00ff88":"var(--t3)",fontSize:10,fontFamily:"'Fira Code',monospace",marginTop:5}}>{earned?"✓ مكتسبة":"+"+b.xp+" XP"}</div>
      </div>);})}
    </div>
  </div>);};

  // ─── RESOURCES ───
  const Resources=()=>(<div className="slide">
    <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>📚 مكتبة الموارد الشاملة</h1>
    <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:12}}>{allRes.length}+ مورد — روابط حقيقية ومتحقق منها من 16 تراك</p>
    <div className="res-filters" style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      <select value={resType} onChange={e=>setResType(e.target.value)} style={{flex:"1 1 120px",fontSize:12}}>
        <option value="all">📋 كل الأنواع</option>
        <option value="video">▶ Videos</option><option value="lab">⚗ Labs</option>
        <option value="article">📄 Articles</option><option value="writeup">✍ Writeups</option>
        <option value="book">📚 Books</option>
      </select>
      <select value={resLang} onChange={e=>setResLang(e.target.value)} style={{flex:"1 1 100px",fontSize:12}}>
        <option value="all">🌐 كل اللغات</option>
        <option value="ar">🇸🇦 عربي</option><option value="en">🌐 English</option>
      </select>
      <select value={resTid} onChange={e=>setResTid(e.target.value)} style={{flex:"1 1 140px",fontSize:12}}>
        <option value="all">🗺️ كل التراكات</option>
        {TRACK_ORDER.map(tid=><option key={tid} value={tid}>{TRACKS[tid].icon} {TRACKS[tid].name}</option>)}
      </select>
      <span style={{color:"var(--t2)",fontSize:12,fontFamily:"'Fira Code',monospace",display:"flex",alignItems:"center",gap:4}}>{filtRes.length} نتيجة</span>
      {resTid!=="all"&&<button className="btn btn-o" style={{fontSize:11,padding:"4px 10px"}} onClick={()=>setResTid("all")}>× إزالة الفلتر</button>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:14}}>
      {[{type:"video",label:"Videos",color:"#ef4444"},{type:"lab",label:"Labs",color:"#10b981"},{type:"article",label:"Articles",color:"#f97316"},{type:"writeup",label:"Writeups",color:"#ec4899"},{type:"book",label:"Books",color:"#eab308"}].map(st=>(<div key={st.type} style={{padding:"8px",borderRadius:8,background:`${st.color}12`,border:`1px solid ${st.color}25`,textAlign:"center",cursor:"pointer",transition:"all .2s"}} onClick={()=>setResType(resType===st.type?"all":st.type)}>
        <div style={{color:st.color,fontSize:15,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{allRes.filter(r=>r.type===st.type).length}</div>
        <div style={{color:"var(--t1)",fontSize:11}}>{st.label}</div>
      </div>))}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {filtRes.map((r,i)=>(<a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <div className="res-card">
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"var(--t0)",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{r.title}</div>
              <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
                {TRACKS[r.tid]&&<span style={{fontSize:11,color:TRACKS[r.tid].color,fontFamily:"'Fira Code',monospace"}}>{TRACKS[r.tid].icon} {TRACKS[r.tid].name}</span>}
                <span style={{color:"var(--t3)",fontSize:10}}>{r.ph}</span>
              </div>
            </div>
            <Tag type={r.type} lang={r.lang}/>
          </div>
        </div>
      </a>))}
    </div>
  </div>);

  // ─── TODO ───
  const Todo=()=>(<div className="slide">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div><h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>✅ قائمة المهام</h1><p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{doneTd}/{todos.length} مكتمل</p></div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {[{id:"all",label:"الكل"},{id:"pending",label:"متبقية"},{id:"done",label:"مكتملة"},{id:"high",label:"⚡ عاجل"}].map(f=>(<button key={f.id} onClick={()=>setTodoFilter(f.id)}
          style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${todoFilter===f.id?"#00ff88":"var(--wh)"}`,background:todoFilter===f.id?"rgba(0,255,136,0.1)":"transparent",color:todoFilter===f.id?"#00ff88":"var(--t4)",cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
          {f.label}
        </button>))}
      </div>
    </div>
    <div style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.15)",borderRadius:12,padding:12,marginBottom:14}}>
      <div style={{color:"var(--t1)",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:7}}>// إضافة مهمة جديدة</div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <input type="text" placeholder="وصف المهمة..." value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTodo()} style={{flex:"1 1 180px",minWidth:0,direction:"rtl"}}/>
        <select value={newPri} onChange={e=>setNewPri(e.target.value)} style={{width:105,fontSize:12}}>
          <option value="high">⚡ عاجل</option><option value="medium">📌 متوسط</option><option value="low">🟢 منخفض</option>
        </select>
        <select value={newTrack} onChange={e=>setNewTrack(e.target.value)} style={{width:130,fontSize:12}}>
          <option value="general">🌐 عام</option>
          {TRACK_ORDER.map(tid=><option key={tid} value={tid}>{TRACKS[tid].icon} {TRACKS[tid].name}</option>)}
        </select>
        <button className="btn btn-g" onClick={addTodo}>+ إضافة</button>
      </div>
    </div>
    {filtTd.length===0?(<div style={{textAlign:"center",padding:"40px 20px",color:"var(--t3)"}}><div style={{fontSize:36,marginBottom:8}}>✅</div><div style={{fontFamily:"'Cairo',sans-serif"}}>لا توجد مهام هنا</div></div>)
    :filtTd.map(t=>(<div key={t.id} className="todo-item" style={{opacity:t.done?0.6:1}}>
      <div style={{width:17,height:17,border:`2px solid ${t.done?"#00ff88":"rgba(0,255,136,0.4)"}`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,background:t.done?"#00ff88":"transparent"}} onClick={()=>togTodo(t.id)}>
        {t.done&&<span style={{color:"var(--bg4)",fontSize:9,fontWeight:900}}>✓</span>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:t.done?"var(--t2)":"var(--t0)",fontSize:13,fontFamily:"'Cairo',sans-serif",textDecoration:t.done?"line-through":"none",wordBreak:"break-word"}}>{t.text}</div>
        <div style={{display:"flex",gap:7,marginTop:3,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"var(--t1)",fontFamily:"'Fira Code',monospace"}}>{t.date}</span>
          {t.track!=="general"&&TRACKS[t.track]&&<span style={{fontSize:10,color:TRACKS[t.track].color}}>{TRACKS[t.track].icon} {TRACKS[t.track].name}</span>}
        </div>
      </div>
      <span style={{padding:"3px 9px",borderRadius:20,fontSize:10,fontFamily:"'Fira Code',monospace",background:PRI_BG[t.priority],color:PRI_COL[t.priority],border:`1px solid ${PRI_COL[t.priority]}40`,flexShrink:0}}>
        {t.priority==="high"?"⚡ عاجل":t.priority==="medium"?"📌 متوسط":"🟢 منخفض"}
      </span>
      <button onClick={()=>delTodo(t.id)} style={{background:"transparent",border:"none",color:"var(--t3)",cursor:"pointer",fontSize:15,padding:"0 3px",flexShrink:0}}>✕</button>
    </div>))}
    <div style={{marginTop:14,background:"var(--bt)",borderRadius:10,padding:12,border:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[{label:"إجمالي",val:todos.length,color:"var(--t4)"},{label:"مكتملة",val:doneTd,color:"#10b981"},{label:"متبقية",val:todos.filter(t=>!t.done).length,color:"#f59e0b"},{label:"عاجلة",val:todos.filter(t=>t.priority==="high"&&!t.done).length,color:"#ef4444"}].map((st,i)=>(<div key={i} style={{textAlign:"center",flex:1,minWidth:60}}>
          <div style={{color:st.color,fontSize:20,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</div>
          <div style={{color:"var(--t2)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{st.label}</div>
        </div>))}
      </div>
    </div>
  </div>);

  // ─── ROUTINE ───
  const Routine=()=>(<div className="slide">
    <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🕐 الروتين اليومي المتكامل</h1>
    <p style={{color:"var(--t1)",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>روتين يومي محكم يجمع بين الجانب الإسلامي والتعلم المنظم — مستوحى من هدي النبي ﷺ</p>
    <div style={{display:"grid",gridTemplateColumns:g2,gap:10,marginBottom:14}}>
      <div style={{background:"linear-gradient(135deg,rgba(250,204,21,0.08),rgba(52,211,153,0.04))",border:"1px solid rgba(250,204,21,0.2)",borderRadius:12,padding:12}}>
        <div style={{color:"#fde047",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:5}}>🕌 يوم الجمعة — مميزات خاصة</div>
        <div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>✦ قراءة سورة الكهف كاملة صباحاً<br/>✦ التبكير إلى صلاة الجمعة<br/>✦ الإكثار من الصلاة على النبي ﷺ<br/>✦ الدعاء في ساعة الإجابة (بعد العصر)<br/>✦ وقت مخفف للتعلم — يوم أسري</div>
      </div>
      <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.1),rgba(250,204,21,0.04))",border:"1px solid rgba(52,211,153,0.2)",borderRadius:12,padding:12}}>
        <div style={{color:"#34d399",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:5}}>🌙 رمضان المبارك</div>
        <div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>✦ السحور + التعلم قبل الفجر<br/>✦ النوم بعد الفجر → الاستيقاظ الضحى<br/>✦ تخفيف جلسات التعلم أثناء الصيام<br/>✦ الاستثمار في تلاوة القرآن وختمه<br/>✦ التراويح والقيام أولوية</div>
      </div>
    </div>
    <div style={{background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:10,padding:12,marginBottom:12}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:20}}>🌙</span>
        <div><div style={{color:"#34d399",fontSize:12,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>تذكير إسلامي</div>
          <div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>«إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ» — الإتقان في التعلم عبادة. ابدأ كل جلسة بالبسملة.</div>
        </div>
      </div>
    </div>
    <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
      {[{id:"all",label:"📋 الكل",c:"var(--t4)"},{id:"prayer",label:"🕌 الصلوات",c:"#fde047"},{id:"quran",label:"📖 القرآن",c:"#6ee7b7"},{id:"islamic",label:"📿 الأذكار",c:"#34d399"},{id:"study",label:"💻 التعلم",c:"#60a5fa"},{id:"health",label:"🏃 الصحة",c:"#4ade80"}].map(f=>(<button key={f.id} onClick={()=>setRoutineFilter(f.id)}
        style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${routineFilter===f.id?f.c:"var(--wb)"}`,background:routineFilter===f.id?`${f.c}18`:"transparent",color:routineFilter===f.id?f.c:"var(--t1)",cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
        {f.label}
      </button>))}
    </div>
    <div style={{position:"relative",paddingLeft:14}}>
      <div style={{position:"absolute",left:18,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#00ff8822,#00d4ff22)",borderRadius:1}}/>
      {ROUTINE.filter(r=>routineFilter==="all"||r.type===routineFilter).map((r,i)=>(<div key={i} className="routine-row" style={{paddingLeft:30,position:"relative"}}>
        <div style={{position:"absolute",left:8,top:12,width:18,height:18,borderRadius:"50%",background:R_COL[r.type]||"rgba(148,163,184,0.1)",border:`2px solid ${R_TXT[r.type]||"var(--t1)"}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,zIndex:1}}>{r.icon}</div>
        <div style={{flex:1,background:R_COL[r.type]||"rgba(0,0,0,0)",padding:"9px 12px",borderRadius:8,border:`1px solid ${R_TXT[r.type]||"var(--t1)"}20`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{color:"var(--t2)",fontSize:10,fontFamily:"'Fira Code',monospace",flexShrink:0}}>{r.time}</span>
            <span style={{color:R_TXT[r.type]||"var(--t4)",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{r.label}</span>
          </div>
          <div style={{color:"var(--t1)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{r.detail}</div>
        </div>
      </div>))}
    </div>
  </div>);

  // ─── STATS ───
  const Stats=()=>{
    const qAvg=Object.values(s.quizHistory).length>0?Math.round(Object.values(s.quizHistory).reduce((a,q)=>a+q.score,0)/Object.values(s.quizHistory).length):0;
    const totalHrs=Object.values(s.studyLog||{}).reduce((a,h)=>a+h,0);
    const avgDailyHrs=Object.keys(s.studyLog||{}).length>0?(totalHrs/Object.keys(s.studyLog).length).toFixed(1):0;
    // آخر 14 يوم من سجل الدراسة
    const last14=Array.from({length:14},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toISOString().split("T")[0];}).reverse();
    const maxHrs=Math.max(1,...last14.map(d=>s.studyLog?.[d]||0));
    const totalReports=Object.keys(s.weeklyReports||{}).length;
    const totalCerts=s.certificates?.length||0;
    return(<div className="slide">
      <h1 style={{color:"var(--t0)",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>📈 الإحصائيات التفصيلية</h1>
      <p style={{color:"var(--t1)",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:16}}>تحليل شامل لرحلتك التعليمية كمنحة</p>

      {/* ─ بطاقات رئيسية ─ */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:18}}>
        {[
          {label:"XP الكلي",val:s.xp,color:"#fbbf24",icon:"⭐"},
          {label:"المستوى",val:`${lv.icon} ${lv.ar}`,color:lv.color,icon:"🏆"},
          {label:"الأسبوع الحالي",val:`${s.currentWeek}/80`,color:"#00ff88",icon:"📅"},
          {label:"التقدم الكلي",val:`${donePct}%`,color:"#00d4ff",icon:"📊"},
          {label:"إجمالي ساعات الدراسة",val:`${totalHrs.toFixed(0)}h`,color:"#a78bfa",icon:"⏱️"},
          {label:"متوسط الدراسة اليومي",val:`${avgDailyHrs}h`,color:"#f97316",icon:"📅"},
          {label:"السلسلة الحالية",val:`${s.streak} يوم 🔥`,color:"#ef4444",icon:"🔥"},
          {label:"أطول سلسلة",val:`${s.bestStreak} يوم`,color:"#ef4444",icon:"👑"},
          {label:"الاختبارات المجتازة",val:Object.keys(s.quizHistory).length,color:"#60a5fa",icon:"📝"},
          {label:"متوسط الاختبارات",val:`${qAvg}%`,color:"#10b981",icon:"✅"},
          {label:"الشهادات المكتسبة",val:`${totalCerts}/5`,color:"#fbbf24",icon:"🎓"},
          {label:"التقارير الأسبوعية",val:totalReports,color:"#00ff88",icon:"📋"},
        ].map((st,i)=>(<div key={i} className="stat-card hov-up scale-click">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <span style={{fontSize:18}}>{st.icon}</span>
            <span style={{color:st.color,fontSize:16,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
          </div>
          <div style={{color:"var(--t0)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:5}}>{st.label}</div>
        </div>))}
      </div>

      {/* ─ رسم بياني لساعات الدراسة ─ */}
      <div style={{background:"rgba(167,139,250,0.05)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#a78bfa",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>⏱️ ساعات الدراسة — آخر 14 يوم</div>
        <div style={{display:"flex",gap:4,alignItems:"flex-end",height:70}}>
          {last14.map((d,i)=>{const h=s.studyLog?.[d]||0;const pct=maxHrs>0?h/maxHrs:0;const isToday=d===today();
            return(<div key={d} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:"100%",background:isToday?`rgba(0,255,136,${0.15+pct*0.7})`:`rgba(167,139,250,${0.1+pct*0.7})`,borderRadius:"3px 3px 0 0",height:`${Math.max(4,pct*60)}px`,border:`1px solid ${isToday?"rgba(0,255,136,0.4)":"rgba(167,139,250,0.3)"}`,transition:"height .3s"}}/>
              <div style={{color:"var(--t3)",fontSize:8,fontFamily:"'Fira Code',monospace"}}>{h>0?h:""}</div>
            </div>);
          })}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{color:"var(--t3)",fontSize:9,fontFamily:"'Fira Code',monospace"}}>{last14[0]?.slice(5)}</span>
          <span style={{color:"var(--t3)",fontSize:9,fontFamily:"'Fira Code',monospace"}}>اليوم ↑</span>
        </div>
      </div>

      {/* ─ تقدم المراحل + الاختبارات ─ */}
      <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:16}}>
        <div className="card" style={{padding:14}}>
          <div style={{color:"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📊 تقدم المراحل الخمس</div>
          {PHASES.map(ph=>{
            const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
            const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
            const pct=pt>0?Math.round(pd/pt*100):0;
            const cert=s.certificates?.includes(ph.id);
            return(<div key={ph.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{ph.icon} {ph.nameAr} {cert?"🎓":""}</span>
                <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
            </div>);
          })}
        </div>
        <div className="card" style={{padding:14}}>
          <div style={{color:"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📝 تاريخ الاختبارات</div>
          {Object.entries(s.quizHistory).length===0?(<div style={{color:"var(--t3)",fontFamily:"'Cairo',sans-serif",fontSize:12,textAlign:"center",padding:"20px 0"}}>لم تجتز أي اختبار بعد</div>)
          :Object.entries(s.quizHistory).map(([id,q])=>(<div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <span style={{color:"var(--t4)",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{QUIZZES[id]?.title||id}</span>
            <span style={{color:q.score>=80?"#10b981":"#f59e0b",fontSize:11,fontFamily:"'Fira Code',monospace",background:q.score>=80?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)",padding:"1px 6px",borderRadius:4}}>{q.score}%</span>
          </div>))}
        </div>
      </div>

      {/* ─ التقارير الأسبوعية المحفوظة ─ */}
      {Object.keys(s.weeklyReports||{}).length>0&&(<div style={{background:"rgba(0,255,136,0.03)",border:"1px solid rgba(0,255,136,0.12)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#00ff88",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📋 التقارير الأسبوعية المحفوظة</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {Object.entries(s.weeklyReports).map(([key,r])=>(
            <div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:"var(--bo)",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",flexWrap:"wrap",gap:6}}>
              <div><div style={{color:"var(--t0)",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{r.phase} — الأسبوع {r.wk}</div>
                <div style={{color:"var(--t1)",fontSize:10,fontFamily:"'Cairo',sans-serif"}}>{r.title} · {r.date}</div></div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <span style={{color:"#00ff88",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{r.mDone}/{r.mTotal} مهام</span>
                <span style={{color:"#00d4ff",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{r.tDone}/{r.tTotal} مواضيع</span>
                <span style={{color:"#a78bfa",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{r.weekHrs}h</span>
                {r.quizScore!==null&&<span style={{color:r.quizScore>=80?"#10b981":"#f59e0b",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{r.quizScore}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>)}

      {/* ─ تقدم التراكات الـ 16 ─ */}
      <div style={{background:"var(--bt)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:14}}>
        <div style={{color:"var(--t0)",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🗺️ تقدم التراكات الـ 16</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8}}>
          {TRACK_ORDER.map(tid=>{const t=TRACKS[tid];const pct=getTrkPct(tid);return(<div key={tid} style={{padding:"9px",background:"rgba(255,255,255,0.02)",borderRadius:8,border:`1px solid ${t.color}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontSize:14}}>{t.icon}</span>
              <span style={{color:t.color,fontSize:10,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
            </div>
            <div style={{color:"var(--t4)",fontSize:11,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{t.name}</div>
            <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:t.color}}/></div>
          </div>);})}
        </div>
      </div>
    </div>);};

  const BottomNav=()=>(
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item=>(
        <div key={item.id} className={`bnav-item ${page===item.id?"on":""}`} onClick={()=>setPage(item.id)}>
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );

  return(<div className="matrix-bg" data-theme={theme} style={{fontFamily:"'Fira Code',monospace",background:"var(--bg)",minHeight:"100vh",color:"var(--t0)"}}>
    <style>{FONTS+CSS}</style>
    {toast&&<div className="xp-toast">{toast}</div>}

    {/* ─── مودال الشهادة ─── */}
    {certModal&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setCertModal(null)}>
      <div style={{background:"linear-gradient(135deg,var(--bg3),var(--bg))",border:`2px solid ${certModal.color}`,borderRadius:20,padding:isMobile?"24px 20px":"40px",maxWidth:520,width:"100%",textAlign:"center",position:"relative",boxShadow:`0 0 60px ${certModal.color}33`}} onClick={e=>e.stopPropagation()}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${certModal.color},${certModal.color}88)`,borderRadius:"20px 20px 0 0"}}/>
        <div style={{fontSize:10,color:"var(--t1)",fontFamily:"'Fira Code',monospace",marginBottom:12,letterSpacing:3}}>CYBERPATH ACADEMY — CERTIFICATE OF COMPLETION</div>
        <div style={{fontSize:64,marginBottom:8}}>{certModal.icon}</div>
        <div style={{color:"var(--t0)",fontSize:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>{certModal.nameAr}</div>
        <div style={{color:certModal.color,fontSize:14,fontFamily:"'Fira Code',monospace",marginBottom:16}}>{certModal.nameEn}</div>
        <div style={{background:`${certModal.color}12`,border:`1px solid ${certModal.color}33`,borderRadius:10,padding:"12px 20px",marginBottom:16}}>
          <div style={{color:"var(--t4)",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.8}}>
            {certModal.desc}<br/>
            <span style={{color:"var(--t1)",fontSize:10}}>الأسابيع {certModal.startWeek}–{certModal.endWeek} · {certModal.monthLabel}</span>
          </div>
        </div>
        <div style={{color:"#fbbf24",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:20}}>🏆 +150 XP · تاريخ الإنجاز: {today()}</div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button className="btn btn-g" style={{fontSize:13,padding:"10px 28px"}} onClick={()=>setCertModal(null)}>✓ رائع!</button>
          <button className="btn btn-o" style={{fontSize:13,padding:"10px 20px"}} onClick={()=>{setPage("achievements");setCertModal(null);}}>🏅 الإنجازات</button>
        </div>
      </div>
    </div>)}

    <Sidebar/>
    <BottomNav/>
    <main style={{marginLeft:isMobile?0:SB,padding:isMobile?"16px 14px 90px":"26px 26px 40px",maxWidth:isMobile?"100%":1100,transition:"margin-left 0.3s ease"}}>
      {page==="dashboard"&&<Dashboard/>}
      {page==="program"&&<Program/>}
      {page==="missions"&&<Missions/>}
      {page==="quiz"&&<QuizPage/>}
      {page==="achievements"&&<Achievements/>}
      {page==="resources"&&<Resources/>}
      {page==="todo"&&<Todo/>}
      {page==="routine"&&<Routine/>}
      {page==="stats"&&<Stats/>}
    </main>
  </div>);
}
