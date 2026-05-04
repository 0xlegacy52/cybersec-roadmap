import { useState, useEffect, useCallback } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Cairo:wght@400;600;700;900&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#04080f;font-family:'Fira Code',monospace}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a1220}::-webkit-scrollbar-thumb{background:#00ff88;border-radius:3px}
.glow{text-shadow:0 0 18px #00ff88,0 0 36px #00ff8844}
.btn{border:none;cursor:pointer;border-radius:8px;font-family:'Fira Code',monospace;transition:all .2s}
.btn-g{background:linear-gradient(135deg,#00ff88,#00d4ff);color:#040810;font-weight:700;padding:10px 20px}
.btn-g:hover{transform:translateY(-1px);box-shadow:0 4px 20px #00ff8855}
.btn-o{background:transparent;border:1px solid rgba(0,255,136,.3);color:#00ff88;padding:8px 16px}
.btn-o:hover{background:rgba(0,255,136,.1)}
.card{background:rgba(0,255,136,.03);border:1px solid rgba(0,255,136,.1);border-radius:12px}
.card:hover{border-color:rgba(0,255,136,.22);background:rgba(0,255,136,.05);transition:all .2s}
.nav{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;cursor:pointer;color:#64748b;font-size:13px;border:1px solid transparent;transition:all .2s}
.nav:hover{background:rgba(0,255,136,.07);color:#00ff88}
.nav.on{background:rgba(0,255,136,.12);color:#00ff88;border-color:rgba(0,255,136,.25)}
.bar{height:6px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width .5s ease}
.topic-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:6px;cursor:pointer;transition:all .15s}
.topic-row:hover{background:rgba(255,255,255,.04)}
.chk{width:20px;height:20px;border:2px solid rgba(0,255,136,.4);border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s}
.chk.on{background:#00ff88;border-color:#00ff88}
.phase-hd{padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background .2s}
.phase-hd:hover{background:rgba(0,255,136,.04)}
.res-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 14px;margin-bottom:8px;transition:all .2s;text-decoration:none;display:block}
.res-card:hover{border-color:rgba(0,255,136,.25);background:rgba(0,255,136,.04)}
.todo-item{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;transition:all .2s}
.todo-item:hover{border-color:rgba(0,255,136,.2)}
.routine-row{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);align-items:flex-start}
.slide{animation:slideIn .3s ease}
@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.xp-toast{position:fixed;top:16px;right:16px;left:16px;background:linear-gradient(135deg,#00ff88,#00d4ff);color:#040810;padding:10px 18px;border-radius:10px;font-weight:700;font-size:14px;z-index:9999;text-align:center;animation:toastIn .4s ease,toastOut .4s ease 2.2s forwards}
@keyframes toastIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastOut{from{opacity:1}to{opacity:0}}
.quiz-opt{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:12px 16px;cursor:pointer;transition:all .2s;font-family:'Cairo',sans-serif;color:#cbd5e1;font-size:14px;text-align:right;width:100%}
.quiz-opt:hover{border-color:rgba(0,212,255,.4);background:rgba(0,212,255,.07)}
.quiz-opt.correct{border-color:#10b981;background:rgba(16,185,129,.15);color:#6ee7b7}
.quiz-opt.wrong{border-color:#ef4444;background:rgba(239,68,68,.15);color:#fca5a5}
.quiz-opt.sel{border-color:#00d4ff;background:rgba(0,212,255,.1)}
.matrix-bg{background-image:radial-gradient(circle at 15% 50%,rgba(0,255,136,.04) 0%,transparent 55%),radial-gradient(circle at 85% 20%,rgba(0,212,255,.03) 0%,transparent 55%)}
input[type="text"],select{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;padding:10px 14px;border-radius:8px;outline:none;font-family:'Fira Code',monospace;font-size:13px}
input[type="text"]:focus,select:focus{border-color:rgba(0,255,136,.4)}
select option{background:#0f172a}
.stat-card{background:linear-gradient(135deg,rgba(0,255,136,.06),rgba(0,212,255,.03));border:1px solid rgba(0,255,136,.15);border-radius:12px;padding:16px}
.pulse{animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.sidebar-glow{box-shadow:inset -1px 0 0 rgba(0,255,136,.1)}
.grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bottom-nav{display:none}
.sidebar-overlay{display:none}
@media(max-width:767px){
  .sidebar-desktop{display:none!important}
  .bottom-nav{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:200;background:linear-gradient(180deg,#060c1a,#040810);border-top:1px solid rgba(0,255,136,0.15);padding:6px 4px 10px;gap:2px;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .bottom-nav::-webkit-scrollbar{display:none}
  .bnav-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 10px;border-radius:8px;cursor:pointer;color:#64748b;flex-shrink:0;min-width:56px;border:1px solid transparent;transition:all .2s;-webkit-tap-highlight-color:transparent}
  .bnav-item.on{background:rgba(0,255,136,.12);color:#00ff88;border-color:rgba(0,255,136,.25)}
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
       missions:["اشاهد CCNA من IT DOSE على YouTube","ادرس الطبقات السبع لـ OSI مع أمثلة","جرب Wireshark وسجّل HTTPS Packet"],
       topics:["OSI Model (7 Layers)","TCP/IP Stack","DNS & DHCP","ARP & ICMP","Subnetting Basics"]},
      {wk:2,title:"Network Protocols",quizId:"wk4",
       missions:["ادرس HTTP/HTTPS بعمق (Methods & Headers)","جرب curl وNetcat على Terminal","حلل PCAP بـ Wireshark"],
       topics:["HTTP/HTTPS Deep Dive","FTP & SSH","Telnet & SMTP","Port Numbers Reference","TCP 3-Way Handshake"]},
      {wk:3,title:"Network Tools & Scanning",quizId:"wk4",
       missions:["تعلم Nmap الأوامر الأساسية","جرب netstat وss وip","اقرأ عن VPNs و Firewalls"],
       topics:["Nmap Basics","Netstat / SS Commands","Wireshark Filters","VPNs & Proxies","Firewall Concepts"]},
      {wk:4,title:"🧪 Network Lab Week",quizId:"wk4",
       missions:["افتح TryHackMe Pre-Security Path","حلل 3 ملفات PCAP مختلفة","اجتاز اختبار الأسبوع 4 ✅"],
       topics:["Practical Packet Analysis","TryHackMe Network Room","PCAP Challenge","WEEK 4 ASSESSMENT"]},
      {wk:5,title:"Linux Fundamentals",quizId:"wk8",
       missions:["تعلم 20 أمراً أساسياً","جرب OverTheWire Bandit Level 0→3","اقرأ عن File System Hierarchy"],
       topics:["Core Commands (20+)","File System Hierarchy","Permissions (chmod/chown)","Users & Groups","Package Management"]},
      {wk:6,title:"Linux Intermediate",quizId:"wk8",
       missions:["اكتب سكريبت Bash يؤتمت مهمة","جرب OverTheWire Bandit Level 4→10","تعلم SSH Key Authentication"],
       topics:["Bash Scripting","Cron Jobs & Scheduling","SSH Deep Dive","Process Management","Networking Tools in Linux"]},
      {wk:7,title:"Linux Security",quizId:"wk8",
       missions:["تعلم UFW وiptables أساسيات","ادرس Log Files في /var/log","جرب TryHackMe Linux PrivEsc Room"],
       topics:["Firewall (UFW/iptables)","Log Analysis (/var/log)","SUID/SGID Privilege Escalation","Linux Hardening","Sudo Misconfigurations"]},
      {wk:8,title:"🧪 Linux Lab Week",quizId:"wk8",
       missions:["أكمل OverTheWire Bandit Level 11→20","حل TryHackMe Linux Fundamentals","اجتاز اختبار الأسبوع 8 ✅"],
       topics:["Bandit Wargame (11–20)","TryHackMe Linux Rooms","PrivEsc Practice","WEEK 8 ASSESSMENT"]},
      {wk:9,title:"Python for Security",quizId:"wk12",
       missions:["شاهد Elzero Python Course (أول 20 فيديو)","اكتب سكريبت يقرأ ويعالج ملفاً","جرب مكتبة Requests مع طلب HTTP"],
       topics:["Python Basics (Variables, Functions, OOP)","Requests Library","Socket Programming","File I/O","Exception Handling"]},
      {wk:10,title:"Python Scripting Tools",quizId:"wk12",
       missions:["اكتب Port Scanner بسيط بـ Python","تعلم Regular Expressions","جرب JSON Parsing من API"],
       topics:["Port Scanner Script","Web Scraper (BeautifulSoup)","Regex for Security","JSON/XML Parsing","argparse CLI"]},
      {wk:11,title:"SQL & JS Basics",quizId:"wk12",
       missions:["ادرس SQL SELECT/INSERT/WHERE/JOIN","تعلم JavaScript Basics وDOM","جرب SQL Injection بسيطة على DVWA"],
       topics:["SQL Fundamentals","JavaScript Basics","DOM Manipulation","SQL Injection Concepts","Basic XSS Concepts"]},
      {wk:12,title:"🎓 Foundation Exam",quizId:"wk12",
       missions:["راجع كل مواضيع Week 1→11","اجتاز Foundation Final Exam","احصل على 🏗️ Foundation Master Badge!"],
       topics:["Comprehensive Review","Foundation Final Exam","🏗️ Foundation Master Badge","Certificate of Foundation"]},
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
       missions:["ادرس HTTP Request/Response كل Header","إعداد Burp Suite + Proxy","اقرأ OWASP Top 10 Overview"],
       topics:["HTTP Methods & Status Codes","Request/Response Headers","Cookies & Sessions","Burp Suite Setup","Web App Architecture"]},
      {wk:14,title:"Burp Suite Mastery",quizId:"wk16",
       missions:["جرب Intruder وRepeater وDecoder","حل PortSwigger Apprentice Level 1–3","اقرأ عن HTTPS وTLS"],
       topics:["Burp Proxy & Intercept","Burp Repeater","Burp Intruder","Decoder & Comparer","Active Scanning"]},
      {wk:15,title:"SQL Injection",quizId:"wk16",
       missions:["ادرس SQLi من PortSwigger Academy","حل 5 Labs SQLi (Error + Blind + UNION)","تعلم sqlmap أساسيات"],
       topics:["Error-Based SQLi","Blind SQLi","Time-Based SQLi","UNION-Based SQLi","sqlmap Tool"]},
      {wk:16,title:"🧪 XSS & CSRF Lab",quizId:"wk16",
       missions:["حل 5 Labs XSS على PortSwigger","ادرس CSRF وآليات الحماية","اجتاز اختبار الأسبوع 16 ✅"],
       topics:["Reflected XSS","Stored XSS","DOM XSS","CSRF Attacks","WEEK 16 ASSESSMENT"]},
      {wk:17,title:"IDOR & Broken Access Control",quizId:"wk20",
       missions:["ادرس IDOR من HowToHunt","حل PortSwigger Access Control Labs","جرب Authentication Labs"],
       topics:["IDOR/BOLA","Broken Authentication","JWT Basics","Session Fixation","Password Reset Flaws"]},
      {wk:18,title:"File Upload & Path Traversal",quizId:"wk20",
       missions:["حل PortSwigger File Upload Labs","ادرس Path Traversal Techniques","جرب DVWA File Upload Module"],
       topics:["File Upload Bypass","Path Traversal","LFI/RFI","Directory Traversal","Content-Type Bypass"]},
      {wk:19,title:"Command Injection & SSRF",quizId:"wk20",
       missions:["حل Command Injection Labs","ادرس SSRF من PortSwigger","تعلم XXE Attacks"],
       topics:["OS Command Injection","SSRF Attacks","XXE Injection","Open Redirect","SSTI Basics"]},
      {wk:20,title:"🧪 Web Core Lab Week",quizId:"wk20",
       missions:["حل 10 Labs Mixed على PortSwigger","جرب DVWA على Medium+High","اجتاز اختبار الأسبوع 20 ✅"],
       topics:["Mixed PortSwigger Labs","DVWA All Levels","OWASP Juice Shop","WEEK 20 ASSESSMENT"]},
      {wk:21,title:"Advanced Web Attacks",quizId:"wk28",
       missions:["ادرس JWT Algorithm Confusion","حل Race Conditions Labs","تعلم HTTP Request Smuggling"],
       topics:["JWT Algorithm Confusion","Race Conditions","HTTP Request Smuggling","OAuth 2.0 Vulnerabilities","Business Logic Flaws"]},
      {wk:22,title:"Recon & Asset Discovery",quizId:"wk28",
       missions:["تعلم subfinder وamass","جرب ffuf للـ Content Discovery","مارس Google Dorks 20 دورك"],
       topics:["Subfinder/Amass","ffuf/gobuster","Google Dorking","Shodan & Censys","Certificate Transparency (crt.sh)"]},
      {wk:23,title:"Bug Bounty Methodology",quizId:"wk28",
       missions:["اقرأ Jason Haddix Methodology v4","تصفح HackerOne Hacktivity","اقرأ 3 Writeups كاملة"],
       topics:["Bug Bounty Methodology","Target Selection","Scope Analysis","Report Writing","Triage Process"]},
      {wk:24,title:"First Live Bug Hunt 🎯",quizId:"wk28",
       missions:["اختر برنامج Bug Bounty حقيقي","ابدأ Recon على هدف في Scope","اكتب أول Report"],
       topics:["Live Target Recon","Vulnerability Discovery","Professional Report Writing","Responsible Disclosure","Platform Etiquette"]},
      {wk:25,title:"Nuclei & Automation",quizId:"wk28",
       missions:["تعلم Nuclei Templates","اكتب Custom Template بسيط","جرب dalfox للـ XSS Automation"],
       topics:["Nuclei Framework","Custom Templates","dalfox XSS Scanner","Automation Pipeline","Burp Extensions"]},
      {wk:26,title:"Web Hardening & WAF Bypass",quizId:"wk28",
       missions:["ادرس Security Headers (CSP, HSTS, X-Frame)","تعلم WAF Bypass Techniques","راجع OWASP Top 10 كاملاً"],
       topics:["Security Headers (CSP/HSTS)","WAF Bypass Techniques","CORS Misconfigurations","CSP Bypass","Web Cache Poisoning"]},
      {wk:27,title:"Expert PortSwigger Labs",quizId:"wk28",
       missions:["حل 5 Expert Labs على PortSwigger","شاهد Rana Khalil Videos","اقرأ PortSwigger Research Blog"],
       topics:["Expert SQLi Labs","Advanced XSS Scenarios","Complex Auth Bypass","Chained Vulnerabilities","BSCP Exam Prep"]},
      {wk:28,title:"🎓 Web Mastery Exam",quizId:"wk28",
       missions:["راجع كل Web Topics","اجتاز Web Mastery Final Exam","احصل على 🌐 Web Warrior Badge!"],
       topics:["Web Comprehensive Review","Web Mastery Final Exam","🌐 Web Warrior Badge","Certificate of Web Mastery"]},
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
       missions:["ادرس Android Components الأربعة","تعلم ADB 15 أمراً أساسياً","جرب apktool على APK تجريبي"],
       topics:["Android System Architecture","ADB Deep Dive","APK Structure","Android Components","Intents & Intent Filters"]},
      {wk:30,title:"Static Analysis",quizId:"wk33",
       missions:["فك APK بـ JADX-GUI وحلل الكود","ابحث عن Hardcoded Secrets وAPI Keys","جرب MobSF Automated Analysis"],
       topics:["JADX-GUI Decompilation","Manifest Security Analysis","Hardcoded Secrets","Insecure Storage","MobSF Setup & Usage"]},
      {wk:31,title:"Dynamic Analysis & Frida",quizId:"wk33",
       missions:["اكتب Frida Script يـ Hook دالة","Bypass SSL Pinning بـ Objection","أعد ضبط Burp مع المحاكي"],
       topics:["Frida Basics & Scripts","SSL Pinning Bypass","Objection Framework","Burp Suite with Android Emulator","Runtime Traffic Analysis"]},
      {wk:32,title:"Mobile OWASP Top 10",quizId:"wk33",
       missions:["ادرس OWASP MASTG كاملاً","جرب DIVA Android App","اقرأ 3 Mobile Bug Reports من HackerOne"],
       topics:["OWASP Mobile Top 10","DIVA Android Challenges","InsecureBankv2","Mobile Report Writing","Mobile Bug Bounty Programs"]},
      {wk:33,title:"🧪 Mobile Lab Week",quizId:"wk33",
       missions:["حل InjuredAndroid 10 Flags","اكتب Frida Script يـ Bypass Root Detection","اجتاز اختبار الأسبوع 33 ✅"],
       topics:["InjuredAndroid CTF","Advanced Frida Scripts","Root Detection Bypass","WEEK 33 ASSESSMENT"]},
      {wk:34,title:"API Fundamentals",quizId:"wk36",
       missions:["ادرس REST API بعمق","تعلم Postman وInsomnia","جرب vAPI Lab Challenges"],
       topics:["REST Architecture","HTTP Methods","JWT & OAuth 2.0","Postman/Insomnia","API Documentation Reading"]},
      {wk:35,title:"OWASP API Security Top 10",quizId:"wk36",
       missions:["ادرس BOLA وBFLA","حل vAPI Challenges","جرب crAPI Lab"],
       topics:["API1: BOLA/BFLA","API2: Broken Authentication","API3: Mass Assignment","API4: Rate Limiting","GraphQL Security Issues"]},
      {wk:36,title:"🧪 API Lab Week",quizId:"wk36",
       missions:["أكمل crAPI كل Challenges","جرب DVGA GraphQL","اجتاز اختبار الأسبوع 36 ✅"],
       topics:["crAPI Full Challenge","Damn Vulnerable GraphQL (DVGA)","API Fuzzing with ffuf","WEEK 36 ASSESSMENT"]},
      {wk:37,title:"Advanced Mobile Topics",quizId:"wk40",
       missions:["ادرس Deeplink Hijacking","تعلم Intent Redirection","جرب Exported Components Abuse"],
       topics:["Deeplink Hijacking","Intent Redirection","Exported Components Abuse","WebView Security","Broadcast Receiver Vulnerabilities"]},
      {wk:38,title:"API Advanced Hunting",quizId:"wk40",
       missions:["ادرس API Key Leakage في Source Code","تعلم IDOR via API","جرب API Fuzzing بـ ffuf"],
       topics:["API Key Leakage (GitHub Dorks)","IDOR via API","Rate Limit Bypass","Auth Token Analysis","API Automation (Nuclei)"]},
      {wk:39,title:"Mobile + API Integration",quizId:"wk40",
       missions:["ابحث عن API Hidden في تطبيق Android","حلل كل Traffic بالكامل","اكتب Combined Report"],
       topics:["Mobile + API Combined Testing","MITM on Mobile App","API IDOR via Mobile","Combined Vulnerability Report"]},
      {wk:40,title:"🎓 Mobile & API Exam",quizId:"wk40",
       missions:["راجع Mobile + API Topics","اجتاز Mobile & API Final Exam","احصل على 📱 Mobile Expert Badge!"],
       topics:["Comprehensive Review","Mobile & API Final Exam","📱 Mobile Expert Badge","Certificate of Mobile Security"]},
    ]
  },
  {
    id:"p3",phase:3,icon:"🏰",color:"#ef4444",bg:"rgba(239,68,68,.13)",
    nameAr:"مرحلة البنية التحتية",nameEn:"Infrastructure Phase",
    monthLabel:"الشهر 11–15",startWeek:41,endWeek:60,phaseXP:700,
    desc:"Network Pentest + Active Directory + OSINT + Cloud + DFIR + Wireless",
    relatedTracks:["network","ad","osint","cloud","dfir","wireless"],
    weeks:[
      {wk:41,title:"Network Scanning & Enum",quizId:"wk44",
       missions:["تعلم Nmap كامل (SYN/UDP/Scripts)","جرب Masscan","ادرس SMB Enumeration بـ enum4linux"],
       topics:["Nmap Full Options","Masscan","Service/OS Detection","SMB/NFS/SNMP Enumeration","NSE Scripts"]},
      {wk:42,title:"Network Exploitation",quizId:"wk44",
       missions:["تعلم Metasploit Framework كامل","جرب Responder للـ Poisoning","ادرس Pass-the-Hash"],
       topics:["Metasploit Framework","Responder LLMNR Poisoning","Pass-the-Hash","SMB Exploitation","Password Cracking (Hashcat)"]},
      {wk:43,title:"Post-Exploitation",quizId:"wk44",
       missions:["تعلم Pivoting بـ chisel","ادرس Linux PrivEsc (SUID/Cron/Sudo)","جرب Windows PrivEsc"],
       topics:["Pivoting & Tunneling","Linux Privilege Escalation","Windows Privilege Escalation","Persistence Methods","Covering Tracks"]},
      {wk:44,title:"🧪 Network Lab Week",quizId:"wk44",
       missions:["حل VulnHub Machine من الصفر","جرب HackTheBox Starting Point","اجتاز اختبار الأسبوع 44 ✅"],
       topics:["VulnHub Full PWN","HackTheBox Starting Point","Full Pentest Report","WEEK 44 ASSESSMENT"]},
      {wk:45,title:"Active Directory Basics",quizId:"wk48",
       missions:["ادرس AD Architecture وKerberos","إعداد BloodHound + SharpHound","تعلم PowerView Basics"],
       topics:["AD Architecture & Components","Kerberos Protocol (TGT/TGS)","LDAP & LDAP Queries","BloodHound Setup & Usage","PowerView Enumeration"]},
      {wk:46,title:"AD Enumeration",quizId:"wk48",
       missions:["تعلم AD Enumeration الكاملة","جرب BloodHound Attack Paths","ادرس Group Policy وACLs"],
       topics:["BloodHound Attack Paths","User/Group Enumeration","Group Policy Analysis","Trust Relationships","ACL/ACE Abuse"]},
      {wk:47,title:"AD Attacks",quizId:"wk48",
       missions:["تعلم Kerberoasting عملياً","ادرس DCSync Attack","جرب Pass-the-Ticket"],
       topics:["Kerberoasting","AS-REP Roasting","Pass-the-Ticket","Golden/Silver Ticket","DCSync Attack"]},
      {wk:48,title:"🧪 Active Directory Lab",quizId:"wk48",
       missions:["جرب VulnAD Lab كامل","حل TryHackMe AD Rooms","اجتاز اختبار الأسبوع 48 ✅"],
       topics:["VulnAD Full Lab","TryHackMe AD Rooms","Lateral Movement","WEEK 48 ASSESSMENT"]},
      {wk:49,title:"OSINT & Recon",quizId:"wk52",
       missions:["تعلم OSINT Framework","جرب Sherlock وtheHarvester","ادرس GitHub Dorking للـ Secrets"],
       topics:["OSINT Framework","Sherlock & theHarvester","Google & GitHub Dorking","Shodan/Censys/Fofa","Certificate Transparency (crt.sh)"]},
      {wk:50,title:"Advanced Asset Discovery",quizId:"wk52",
       missions:["تعلم Amass وSubfinder","جرب TruffleHog وGitLeaks","ادرس SpiderFoot Automation"],
       topics:["Amass/Subfinder Advanced","TruffleHog Secret Scanning","GitLeaks Pre-commit","SpiderFoot Automation","OSINT Report Writing"]},
      {wk:51,title:"Cloud Security Basics",quizId:"wk52",
       missions:["ادرس AWS IAM وS3","جرب flaws.cloud Level 1→3","تعلم AWS CLI"],
       topics:["AWS Core Services (IAM/EC2/S3)","flaws.cloud Challenges","IAM Privilege Escalation Concepts","S3 Misconfiguration","AWS CLI Basics"]},
      {wk:52,title:"🧪 Cloud Lab Week",quizId:"wk52",
       missions:["جرب CloudGoat Scenario","تعلم Pacu Framework","اجتاز اختبار الأسبوع 52 ✅"],
       topics:["CloudGoat Scenarios","Pacu AWS Framework","flaws2.cloud Challenges","WEEK 52 ASSESSMENT"]},
      {wk:53,title:"DFIR Fundamentals",quizId:"wk56",
       missions:["تعلم Autopsy للـ Disk Forensics","ادرس Memory Forensics Basics","جرب CyberDefenders Blue Team Labs"],
       topics:["Autopsy Forensics Platform","Disk Imaging (dd/FTK Imager)","File Carving & Recovery","Browser Forensics","Windows Event Logs"]},
      {wk:54,title:"Memory & Network Forensics",quizId:"wk56",
       missions:["تعلم Volatility 3 Framework","ادرس PCAP Analysis","جرب Blue Team Labs Online"],
       topics:["Volatility 3 Framework","PCAP Deep Analysis","Windows Registry Forensics","Log Analysis with SIEM","Chain of Custody"]},
      {wk:55,title:"Incident Response",quizId:"wk56",
       missions:["ادرس MITRE ATT&CK Framework","تعلم Threat Hunting","جرب LetsDefend Platform"],
       topics:["MITRE ATT&CK Framework","Threat Hunting Methodology","YARA Rules Writing","Elastic/Splunk SIEM","Incident Response Lifecycle"]},
      {wk:56,title:"🧪 DFIR Lab Week",quizId:"wk56",
       missions:["حل CyberDefenders Challenge","جرب Velociraptor","اجتاز اختبار الأسبوع 56 ✅"],
       topics:["CyberDefenders Challenge","Velociraptor EDR","LetsDefend SOC Training","WEEK 56 ASSESSMENT"]},
      {wk:57,title:"Wireless Security",quizId:"wk60",
       missions:["تعلم Aircrack-ng Suite","ادرس WPA2 Handshake Capture","جرب TryHackMe WiFi Hacking 101"],
       topics:["Aircrack-ng Suite","WPA2 PMKID Attack","Evil Twin Attack","Deauth Attacks","Monitor Mode Setup"]},
      {wk:58,title:"Wireless Advanced",quizId:"wk60",
       missions:["تعلم Bettercap","جرب Wifite2","ادرس Bluetooth BLE Security"],
       topics:["Bettercap Framework","Wifite2 Automation","Bluetooth BLE Security","Kismet Wireless Recon","Wireless Pentest Report"]},
      {wk:59,title:"Infrastructure Integration",quizId:"wk60",
       missions:["ابنِ Attack Chain كاملة (Network→AD→Cloud)","راجع كل Infrastructure Topics","جرب HackTheBox Pro Lab Preview"],
       topics:["Full Attack Chain","Network → AD → Cloud Path","Combined Assessment","Pro Lab Preparation"]},
      {wk:60,title:"🎓 Infrastructure Exam",quizId:"wk60",
       missions:["راجع كل Topics","اجتاز Infrastructure Final Exam","احصل على 🏰 Infrastructure Pro Badge!"],
       topics:["Comprehensive Review","Infrastructure Final Exam","🏰 Infrastructure Pro Badge","Certificate of Infrastructure"]},
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
       missions:["تعلم PE File Format وPEStudio","جرب FLOSS وstrings","ادرس Sandbox Analysis على ANY.RUN"],
       topics:["PE File Format","PEStudio Analysis","FLOSS / strings Tool","Detect-It-Easy (DIE)","ANY.RUN Interactive Sandbox"]},
      {wk:62,title:"Malware Dynamic Analysis",quizId:"wk64",
       missions:["تعلم x64dbg Basics","جرب Process Monitor وProcess Hacker","ادرس Registry وNetwork Indicators"],
       topics:["x64dbg Debugger","Process Monitor","Network IOCs with Wireshark","Registry Analysis","Behavior Analysis Report"]},
      {wk:63,title:"Reverse Engineering + Ghidra",quizId:"wk64",
       missions:["تعلم Ghidra الأساسي","ادرس Assembly في السياق","اكتب YARA Rule بسيطة"],
       topics:["Ghidra Setup & Navigation","Assembly Analysis","Packing/Obfuscation Detection","YARA Rule Writing","Malware Sample Analysis"]},
      {wk:64,title:"🧪 Malware Lab Week",quizId:"wk64",
       missions:["حلل عينة حقيقية من MalwareBazaar","اكتب تقرير تحليل احترافي","اجتاز اختبار الأسبوع 64 ✅"],
       topics:["Real Malware Analysis","Malware Report Writing","IOC Extraction","WEEK 64 ASSESSMENT"]},
      {wk:65,title:"Web3 & Solidity Basics",quizId:"wk68",
       missions:["تعلم Solidity من CryptoZombies","جرب Ethernaut Level 1–5","ادرس Reentrancy Attack"],
       topics:["Solidity Basics","EVM Architecture","Remix IDE","Reentrancy Attack","Ethernaut CTF (1–5)"]},
      {wk:66,title:"Smart Contract Auditing",quizId:"wk68",
       missions:["جرب Ethernaut Level 6–15","تعلم Slither Static Analyzer","ادرس Damn Vulnerable DeFi"],
       topics:["Flash Loan Attacks","Price Oracle Manipulation","Slither Static Analysis","Damn Vulnerable DeFi","Code4rena & Immunefi"]},
      {wk:67,title:"Cryptography Attacks",quizId:"wk68",
       missions:["جرب CryptoHack Introduction","ادرس RSA Attacks","تعلم Padding Oracle"],
       topics:["Symmetric/Asymmetric Crypto","RSA Common Modulus Attack","Padding Oracle Attack","Hash Length Extension","CryptoHack Challenges"]},
      {wk:68,title:"🧪 Web3 & Crypto Lab",quizId:"wk68",
       missions:["حل Cryptopals Set 1","جرب Damn Vulnerable DeFi","اجتاز اختبار الأسبوع 68 ✅"],
       topics:["Cryptopals Set 1","Damn Vulnerable DeFi","RsaCtfTool Usage","WEEK 68 ASSESSMENT"]},
      {wk:69,title:"Binary Exploitation Basics",quizId:"wk72",
       missions:["ابدأ pwn.college","تعلم Stack Buffer Overflow","جرب pwntools"],
       topics:["Stack Memory Layout","Buffer Overflow Classic","GDB & pwndbg","pwntools Framework","ret2win Challenge"]},
      {wk:70,title:"ROP & Advanced Pwn",quizId:"wk72",
       missions:["تعلم ret2libc Attack","ادرس ROP Chains","جرب ROPgadget"],
       topics:["ret2libc Attack","Return Oriented Programming","ROPgadget Tool","ASLR/PIE Bypass","Format String Vulnerabilities"]},
      {wk:71,title:"Heap Exploitation",quizId:"wk72",
       missions:["ادرس Heap Memory Layout","تعلم Use After Free","جرب Heap Challenges على pwn.college"],
       topics:["Heap Memory Layout","Use After Free (UAF)","Double Free Bug","Heap Overflow","tcache Poisoning"]},
      {wk:72,title:"🧪 Binary Lab Week",quizId:"wk72",
       missions:["حل 3 Pwn Challenges من PicoCTF","جرب pwn.college Module","اجتاز اختبار الأسبوع 72 ✅"],
       topics:["PicoCTF Pwn Challenges","pwn.college Progression","exploit.education VMs","WEEK 72 ASSESSMENT"]},
      {wk:73,title:"CTF Methodology",quizId:"wk76",
       missions:["تعلم CTF Strategy لكل Category","جرب PicoCTF Web + Crypto","ادرس CTF101"],
       topics:["CTF Types (Web/Pwn/Crypto/Forensics/RE)","CTF Toolset Setup","Web CTF Strategy","Forensics CTF Tools","CTF Time Management"]},
      {wk:74,title:"Live CTF Participation",quizId:"wk76",
       missions:["شارك في CTFtime Event حقيقي","حل 5 Challenges مختلفة","اكتب Writeup لأفضل حل"],
       topics:["CTFtime Event Participation","Multi-Category Challenges","Writeup Writing","Team Collaboration","CTF Community Building"]},
      {wk:75,title:"Expert Integration",quizId:"wk76",
       missions:["ابنِ Full Exploit Chain","راجع كل Expert Topics","جرب HackTheBox Pro Lab"],
       topics:["Full Exploit Chain","Combined Attack Techniques","Advanced CTF Techniques","Pro Lab Preview"]},
      {wk:76,title:"🎓 Expert Exam",quizId:"wk76",
       missions:["راجع كل Expert Topics","اجتاز Expert Final Exam","احصل على 💎 Elite Hacker Badge!"],
       topics:["Expert Comprehensive Review","Expert Final Exam","💎 Elite Hacker Badge","Certificate of Expert"]},
      {wk:77,title:"Red Team Operations",quizId:"wk80",
       missions:["ادرس Red Team Methodology","تعلم C2 Framework Concepts","ادرس EDR Evasion Basics"],
       topics:["Red Team Methodology","C2 Frameworks (Sliver/Havoc)","EDR Evasion Basics","OPSEC Principles","Red Team Report Writing"]},
      {wk:78,title:"Certifications Prep",quizId:"wk80",
       missions:["ابدأ تحضير OSCP أو eWPT","راجع Exam Objectives","جرب Practice Labs"],
       topics:["OSCP Preparation Path","eWPT/eWPTX","CEH Concepts","PNPT (TCM Security)","Certification Strategy"]},
      {wk:79,title:"Portfolio & Personal Brand",quizId:"wk80",
       missions:["أنشئ GitHub Security Portfolio","اكتب CVE أو Bug Report","ابنِ حضور على Twitter الأمني"],
       topics:["GitHub Security Portfolio","Security Blog Writing","CVE/Report Disclosure","LinkedIn Profile Optimization","Personal Branding"]},
      {wk:80,title:"🎓 Expert Final Exam",quizId:"wk80",
       missions:["اجتاز Expert Final Exam","احصل على Elite Certificate","احتفل — أنت الآن Expert! 🎉"],
       topics:["Final Comprehensive Exam","Elite Certificate Unlock","Career Path Review","🚀 Journey Complete"]},
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
  {lv:0,ar:"مبتدئ",en:"Initiate",min:0,color:"#64748b",icon:"🔰"},
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
      {id:"f1",name:"Phase 1 — الشبكات",emoji:"🌐",topics:["نموذج OSI والطبقات السبع","بروتوكولات TCP/IP","DNS وكيف يعمل","HTTP/HTTPS بعمق","Subnetting وعناوين IP","Wireshark — تحليل الحزم","VPN و Proxy","Network Protocols (FTP,SSH,SMB,RDP)"],
       resources:[
         {title:"مهارة تك — أساسيات شبكات الحاسبات (مجاني بالكامل)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=22"},
         {title:"مهارة تك — تطبيقات شبكات الحاسبات (مجاني بالكامل)",type:"lab",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1179"},
         {title:"CCNA بالعربي — Emad | IT DOSE",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL8s4OGp0649_e_Wbz5MlBgW5rBW-9hD0c"},
         {title:"TryHackMe — Pre-Security Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/presecurity"},
         {title:"Professor Messer — CompTIA Network+ (مجاني)",type:"video",lang:"en",url:"https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/"},
       ]},
      {id:"f2",name:"Phase 2 — لينكس",emoji:"🐧",topics:["الأوامر الأساسية (ls,cd,grep,awk,sed)","إدارة الملفات والمجلدات","الصلاحيات (chmod,chown,SUID)","Bash Scripting Basics","SSH والاتصال عن بُعد","Kali Linux / Parrot OS"],
       resources:[
         {title:"Linux بالعربي — Information Technology (Playlist كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLLlr6jKKdyK1FBi3pLVAmilLvMwWHw-84"},
         {title:"OverTheWire: Bandit — أفضل تطبيق عملي (مجاني)",type:"lab",lang:"en",url:"https://overthewire.org/wargames/bandit/"},
         {title:"TryHackMe — Linux Fundamentals Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/module/linux-fundamentals"},
         {title:"Linux Journey — تعليم تفاعلي مجاني",type:"article",lang:"en",url:"https://linuxjourney.com/"},
       ]},
      {id:"f3",name:"Phase 3 — البرمجة للأمن",emoji:"🐍",topics:["Python — الأساسيات والمفاهيم","Python للأمن السيبراني","JavaScript أساسيات (مهم لـ XSS)","SQL أساسيات (مهم لـ SQLi)","Bash Scripting متقدم","HTTP Requests بالكود (requests library)"],
       resources:[
         {title:"Python بالعربي — Elzero Web School (Playlist كامل)",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs"},
         {title:"Automate the Boring Stuff with Python (كتاب مجاني)",type:"book",lang:"en",url:"https://automatetheboringstuff.com/"},
         {title:"TCM Security — Python 101 للهاكرز (YouTube مجاني)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=egg-GoT5iVk"},
       ]},
      {id:"f4",name:"Phase 4 — أساسيات الأمن",emoji:"🔐",topics:["مفاهيم CIA Triad","Encryption (Symmetric / Asymmetric)","Hashing وأنواعه","Authentication vs Authorization","Vulnerabilities vs Exploits","CVE / CVSS Scoring","OWASP المفاهيم الأساسية"],
       resources:[
         {title:"مهارة تك — Cyber Security Engineer Job Profile 🏅 (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1004"},
         {title:"مهارة تك — مقدمة في الأمن السيبراني (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=148"},
         {title:"مهارة تك — Ethical Hacking (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=244"},
         {title:"مهارة تك — أمن الشبكات المتقدم (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=560"},
         {title:"CompTIA Security+ — Professor Messer (مجاني)",type:"video",lang:"en",url:"https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"},
         {title:"TryHackMe — Pre-Security & SOC Level 1",type:"lab",lang:"en",url:"https://tryhackme.com/paths"},
         {title:"OWASP Top 10 — الدليل الرسمي",type:"article",lang:"en",url:"https://owasp.org/www-project-top-ten/"},
         {title:"Get BountyOrDie — Basics Resources",type:"article",lang:"ar",url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest"},
       ]},
    ]},
  web:{id:"web",name:"Web Pentesting",nameEn:"Web App Pentesting & Bug Bounty",icon:"🌐",color:"#10b981",colorBg:"rgba(16,185,129,0.15)",duration:"4–6 أشهر",desc:"اختبار اختراق تطبيقات الويب، Bug Bounty، OWASP Top 10",
    phases:[
      {id:"w1",name:"Phase 1 — أساسيات الويب",emoji:"🔌",topics:["HTTP/HTTPS بعمق","كيف تعمل تطبيقات الويب","Burp Suite إعداد واستخدام","Authentication vs Authorization","Session Management & Cookies","APIs و REST و GraphQL","Same-Origin Policy وCORS"],
       resources:[
         {title:"Web Pentest بالعربي — Ebrahem Hegazy (Zigoo0) Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLv7cogHXoVhXvHPzIl1dWtBiYUAL8baHj"},
         {title:"Web Pentest بالعربي — Flex Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3"},
         {title:"PortSwigger Web Security Academy (مجاني 100%)",type:"lab",lang:"en",url:"https://portswigger.net/web-security"},
         {title:"Sec-88 GitBook — Nour Sallam (مرجع عربي شامل)",type:"article",lang:"ar",url:"https://sallam.gitbook.io/sec-88/web-appsec"},
       ]},
      {id:"w2",name:"Phase 2 — OWASP Top 10",emoji:"⚡",topics:["SQL Injection (Error-based, Blind, UNION)","XSS (Reflected, Stored, DOM-based)","CSRF","IDOR — Insecure Direct Object Reference","File Upload Vulnerabilities","Path Traversal / LFI / RFI","Command Injection","Broken Authentication","Open Redirect","Clickjacking"],
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
      {id:"w3",name:"Phase 3 — الثغرات المتقدمة",emoji:"🚀",topics:["SSRF — Server-Side Request Forgery","XXE — XML External Entity","SSTI — Server-Side Template Injection","Prototype Pollution","JWT Attacks (Algorithm Confusion, None Algorithm)","Race Conditions","HTTP Request Smuggling","GraphQL Security","Web Cache Poisoning","OAuth 2.0 Vulnerabilities"],
       resources:[
         {title:"PortSwigger — SSRF Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/ssrf"},
         {title:"PortSwigger — JWT Attacks Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/jwt"},
         {title:"PortSwigger — XXE Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/xxe"},
         {title:"PortSwigger — HTTP Request Smuggling Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/request-smuggling"},
         {title:"PortSwigger — Race Conditions Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/race-conditions"},
         {title:"HackTricks — Web Pentesting Reference",type:"article",lang:"en",url:"https://book.hacktricks.xyz/pentesting-web"},
       ]},
      {id:"w4",name:"Phase 4 — Bug Bounty Methodology",emoji:"💰",topics:["Recon Strategy وبناء الـ Asset Map","Subdomain Enumeration (subfinder,amass)","Content Discovery (ffuf,gobuster)","Google Dorks والـ OSINT","Nuclei Templates","اختيار البرامج (HackerOne, Bugcrowd, Intigriti)","كتابة Report محترف"],
       resources:[
         {title:"Recon بالعربي — Critical Glitch Playlist",type:"video",lang:"ar",url:"https://www.youtube.com/playlist?list=PL76MuQ6v56X8tNsbtB1OsSegz2jHHRRmG"},
         {title:"Get BountyOrDie — Recon & Web Resources (بالعربي)",type:"article",lang:"ar",url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest"},
         {title:"HackerOne — Disclosed Reports (Writeups حقيقية)",type:"writeup",lang:"en",url:"https://hackerone.com/hacktivity"},
         {title:"Pentester Land — Bug Bounty Writeups Compilation",type:"writeup",lang:"en",url:"https://pentester.land/writeups/"},
         {title:"NahamSec — Recon Playlist (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/playlist?list=PLKAaMVNxvLmAkqBkzFaOxqs3L66z2n8LA"},
         {title:"InsiderPhD — Bug Bounty للمبتدئين (YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/c/InsiderPhD"},
       ]},
    ]},
  mobile:{id:"mobile",name:"Mobile Security",nameEn:"Android Pentesting & Bug Bounty",icon:"📱",color:"#f59e0b",colorBg:"rgba(245,158,11,0.15)",duration:"3–5 أشهر",desc:"تحليل واختبار اختراق تطبيقات الأندرويد من الصفر",
    phases:[
      {id:"mob1",name:"Phase 1 — أساسيات الأندرويد",emoji:"🤖",topics:["بنية نظام الأندرويد","مكونات التطبيق (Activity,Service,BroadcastReceiver,ContentProvider)","Android Manifest.xml","APK Structure (classes.dex, resources.arsc)","ADB — الأوامر الكاملة","Root وفائدته في الاختبار"],
       resources:[
         {title:"Android Pentesting Roadmap — A0xTrojan Notion",type:"article",lang:"ar",url:"https://almond-fontina-ed4.notion.site/Road-map-Android-20190050c671803e8b13f608601c3bb3"},
         {title:"Mobile Security Notes — 0x5atab Notion",type:"article",lang:"ar",url:"https://0x5atab.notion.site/MOBILE-SECURITY-17490ba198d280b497c5fb1d41387288"},
         {title:"OWASP MASTG — Mobile Application Security Testing Guide",type:"book",lang:"en",url:"https://mas.owasp.org/MASTG/"},
       ]},
      {id:"mob2",name:"Phase 2 — Static & Dynamic Analysis",emoji:"🔍",topics:["APK Decompilation بـ JADX-GUI","تحليل AndroidManifest.xml","البحث عن Hardcoded Secrets & API Keys","MobSF — Mobile Security Framework","Frida Basics & Scripts","SSL Pinning Bypass","Objection Framework"],
       resources:[
         {title:"JADX-GUI — GitHub (أداة مجانية)",type:"lab",lang:"en",url:"https://github.com/skylot/jadx"},
         {title:"MobSF — Mobile Security Framework (GitHub مجاني)",type:"lab",lang:"en",url:"https://github.com/MobSF/Mobile-Security-Framework-MobSF"},
         {title:"Frida — الموقع الرسمي والتوثيق",type:"article",lang:"en",url:"https://frida.re/docs/home/"},
         {title:"Objection Framework — GitHub (SSL Pinning Bypass)",type:"lab",lang:"en",url:"https://github.com/sensepost/objection"},
         {title:"Android Reports & Resources — B3nac (GitHub)",type:"writeup",lang:"en",url:"https://github.com/B3nac/Android-Reports-and-Resources"},
       ]},
      {id:"mob3",name:"Phase 3 — OWASP Mobile Top 10 & Bug Bounty",emoji:"💰",topics:["M1-M10 OWASP Mobile Top 10","DIVA Android Challenges","InsecureBankv2","InjuredAndroid CTF","Mobile Report Writing"],
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
      {id:"api1",name:"Phase 1 — API Fundamentals",emoji:"📡",topics:["REST API Architecture","HTTP Methods (GET/POST/PUT/DELETE/PATCH)","JSON وXML","Authentication في APIs (API Keys,JWT,OAuth 2.0)","Postman & Insomnia","GraphQL Basics","Swagger / OpenAPI Spec","Rate Limiting"],
       resources:[
         {title:"API Hacking RoadMap — Cyber Samurai Notion",type:"article",lang:"ar",url:"https://cyber-samurai.notion.site/API-Hacking-RoadMap-0817ef70509649dfaec2891ffba1f7db"},
         {title:"PortSwigger — GraphQL API Vulnerabilities Labs",type:"lab",lang:"en",url:"https://portswigger.net/web-security/graphql"},
         {title:"Postman — Learning Center (مجاني)",type:"article",lang:"en",url:"https://learning.postman.com/docs/getting-started/introduction/"},
         {title:"OWASP API Security Top 10 — الدليل الرسمي",type:"article",lang:"en",url:"https://owasp.org/www-project-api-security/"},
       ]},
      {id:"api2",name:"Phase 2 — OWASP API Security Top 10",emoji:"⚡",topics:["API1: BOLA (Broken Object Level Authorization)","API2: Broken Authentication","API3: Mass Assignment","API4: Unrestricted Resource Consumption","API5-10: باقي القائمة","Fuzzing API Endpoints","API Key & Token Leakage Hunting"],
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
      {id:"net1",name:"Phase 1 — Scanning & Enumeration",emoji:"🔭",topics:["Nmap — كامل (Host Discovery, Port Scanning, NSE Scripts)","Masscan للسرعة العالية","Shodan للـ External Recon","Network Enumeration (SMB,NFS,SNMP,LDAP)","Vulnerability Scanning (OpenVAS)","Wireshark تحليل متقدم","Responder LLMNR Poisoning"],
       resources:[
         {title:"مهارة تك — مقدمة في أمن الشبكات (مجاني بالكامل) 🏅",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=560"},
         {title:"مهارة تك — Network Security Engineer Job Profile (مجاني)",type:"video",lang:"ar",url:"https://maharatech.gov.eg/course/view.php?id=1183"},
         {title:"Nmap — التوثيق الرسمي الكامل",type:"article",lang:"en",url:"https://nmap.org/book/man.html"},
         {title:"TryHackMe — Network Security Path",type:"lab",lang:"en",url:"https://tryhackme.com/paths"},
         {title:"HackTricks — Network Services Pentesting",type:"article",lang:"en",url:"https://book.hacktricks.xyz/network-services-pentesting"},
         {title:"VulnHub — Practice Machines (مجاني)",type:"lab",lang:"en",url:"https://www.vulnhub.com/"},
       ]},
      {id:"net2",name:"Phase 2 — Exploitation & Post-Exploitation",emoji:"💥",topics:["Metasploit Framework كامل (MSFConsole)","MITM Attacks","Password Cracking (Hashcat,John)","Pass-the-Hash Attacks","Pivoting & Tunneling (chisel,socat,SSH)","Privilege Escalation Linux/Windows","Persistence Methods","Covering Tracks"],
       resources:[
         {title:"TCM Security — Practical Ethical Hacking (Free on YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=fNzpcB7ODxQ"},
         {title:"GTFOBins — Linux Privilege Escalation",type:"article",lang:"en",url:"https://gtfobins.github.io/"},
         {title:"LOLBAS — Windows Living Off The Land",type:"article",lang:"en",url:"https://lolbas-project.github.io/"},
         {title:"TryHackMe — Offensive Pentesting Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/pentesting"},
         {title:"HackTheBox — Starting Point (مجاني)",type:"lab",lang:"en",url:"https://app.hackthebox.com/starting-point"},
       ]},
    ]},
  ad:{id:"ad",name:"Active Directory",nameEn:"Active Directory & Red Team",icon:"🏰",color:"#dc2626",colorBg:"rgba(220,38,38,0.15)",duration:"4–6 أشهر",desc:"اختراق بيئات Active Directory وعمليات Red Team",
    phases:[
      {id:"ad1",name:"Phase 1 — AD Fundamentals",emoji:"🏛️",topics:["ما هو Active Directory وبنيته","Domain Controllers وForest وTree","Kerberos Authentication بعمق (TGT,TGS)","LDAP وSAMAccountName","BloodHound & SharpHound","PowerShell للـ AD Enumeration","AD Trust Relationships"],
       resources:[
         {title:"TCM Security — Practical AD Pentesting (Free YouTube)",type:"video",lang:"en",url:"https://www.youtube.com/watch?v=pKtDptF5HA4"},
         {title:"BloodHound — GitHub الرسمي",type:"lab",lang:"en",url:"https://github.com/BloodHoundAD/BloodHound"},
         {title:"TryHackMe — Active Directory Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/room/winadbasics"},
         {title:"HackTricks — Active Directory Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology"},
       ]},
      {id:"ad2",name:"Phase 2 — AD Attacks",emoji:"⚔️",topics:["LLMNR/NBT-NS Poisoning (Responder)","Pass-the-Hash بـ CrackMapExec","Kerberoasting","AS-REP Roasting","DCSync Attack","Golden Ticket Attack","BloodHound Attack Path Analysis","Lateral Movement (PSExec,WinRM)","ACL / ACE Abuse"],
       resources:[
         {title:"HackTricks — Kerberoasting",type:"article",lang:"en",url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/kerberoast"},
         {title:"VulnAD — Vulnerable AD Lab (GitHub)",type:"lab",lang:"en",url:"https://github.com/WazeHell/vulnerable-AD"},
         {title:"Impacket — Python AD Tools (GitHub)",type:"lab",lang:"en",url:"https://github.com/SecureAuthCorp/impacket"},
         {title:"HackTheBox — Pro Labs (RastaLabs, Offshore)",type:"lab",lang:"en",url:"https://www.hackthebox.com/hacker/pro-labs"},
       ]},
    ]},
  malware:{id:"malware",name:"Malware Analysis",nameEn:"Malware Analysis & Reverse Engineering",icon:"🦠",color:"#06b6d4",colorBg:"rgba(6,182,212,0.15)",duration:"4–6 أشهر",desc:"تحليل البرمجيات الخبيثة والهندسة العكسية",
    phases:[
      {id:"mal1",name:"Phase 1 — Malware Analysis Foundations",emoji:"🧱",topics:["Assembly Language x86/x64 أساسيات","Windows Internals (Processes,Threads,Memory)","PE File Format","Static Analysis Tools (PEStudio,strings,FLOSS,DIE)","Dynamic Analysis (Process Monitor,Wireshark)","Sandbox Analysis (ANY.RUN,Cuckoo)","Ghidra وx64dbg","Packing & Obfuscation Detection","YARA Rules كتابة واستخدام"],
       resources:[
         {title:"Practical Malware Analysis — كتاب Nostarch (المرجع الأساسي)",type:"book",lang:"en",url:"https://nostarch.com/malware"},
         {title:"Ghidra — NSA Free Disassembler (GitHub)",type:"lab",lang:"en",url:"https://github.com/NationalSecurityAgency/ghidra"},
         {title:"x64dbg — Open Source Debugger (GitHub)",type:"lab",lang:"en",url:"https://github.com/x64dbg/x64dbg"},
         {title:"ANY.RUN — Interactive Sandbox (مجاني)",type:"lab",lang:"en",url:"https://any.run/"},
         {title:"MalwareBazaar — عينات حقيقية للتحليل (مجاني)",type:"lab",lang:"en",url:"https://bazaar.abuse.ch/"},
         {title:"OpenSecurityTraining2 — مجاني بالكامل",type:"video",lang:"en",url:"https://opensecuritytraining.info/"},
       ]},
    ]},
  ctf:{id:"ctf",name:"CTF & Wargames",nameEn:"CTF Competitions & Practice",icon:"🚩",color:"#f97316",colorBg:"rgba(249,115,22,0.15)",duration:"مستمر",desc:"تحديات CTF، تطبيق المهارات، المسابقات الأمنية",
    phases:[
      {id:"ctf1",name:"Phase 1 — CTF Basics & Wargames",emoji:"🎯",topics:["أنواع تحديات CTF (Web,Crypto,Forensics,Pwn,RE)","Cryptography Basics (Caesar,Vigenere,RSA,Base64)","Forensics (Steganography,File Carving)","Binary Exploitation Basics (Buffer Overflow)","أدوات CTF الأساسية (CyberChef,Ghidra,pwntools)"],
       resources:[
         {title:"CTF101 — Getting Started Guide (مجاني)",type:"article",lang:"en",url:"https://ctf101.org/"},
         {title:"PicoCTF — للمبتدئين من Carnegie Mellon (مجاني)",type:"lab",lang:"en",url:"https://picoctf.org/"},
         {title:"OverTheWire — Wargames كاملة (Bandit,Natas,Leviathan)",type:"lab",lang:"en",url:"https://overthewire.org/wargames/"},
         {title:"CTFtime — مسابقات CTF الحية حول العالم",type:"lab",lang:"en",url:"https://ctftime.org/"},
         {title:"CyberChef — أداة تشفير وتحليل شاملة (مجاني)",type:"lab",lang:"en",url:"https://gchq.github.io/CyberChef/"},
         {title:"CTF Writeups — GitHub Collection",type:"writeup",lang:"en",url:"https://github.com/sajjadium/ctf-archives"},
       ]},
    ]},
  cloud:{id:"cloud",name:"Cloud Security",nameEn:"Cloud Security (AWS/Azure/GCP)",icon:"☁️",color:"#0ea5e9",colorBg:"rgba(14,165,233,0.15)",duration:"3–5 أشهر",desc:"اختبار اختراق بيئات AWS وAzure وGCP — المجال الأسرع نمواً",
    phases:[
      {id:"cloud1",name:"Phase 1 — Cloud Fundamentals",emoji:"🌩️",topics:["Cloud Computing Concepts (IaaS,PaaS,SaaS)","AWS Core Services (IAM,EC2,S3,Lambda)","Azure Core Services","GCP Core Services","Shared Responsibility Model","IAM بعمق","Cloud CLI Tools (AWS CLI,az,gcloud)"],
       resources:[
         {title:"flaws.cloud — AWS Security CTF مجاني (Scott Piper)",type:"lab",lang:"en",url:"http://flaws.cloud/"},
         {title:"flaws2.cloud — AWS Security CTF مستوى متقدم",type:"lab",lang:"en",url:"http://flaws2.cloud/"},
         {title:"HackTricks Cloud — مرجع شامل",type:"article",lang:"en",url:"https://cloud.hacktricks.xyz/"},
       ]},
      {id:"cloud2",name:"Phase 2 — AWS & Multi-Cloud Pentesting",emoji:"🔓",topics:["AWS IAM Privilege Escalation","S3 Bucket Misconfigurations","EC2 Instance Metadata Service (IMDS) Attacks","Secrets Manager Exposure","Pacu — AWS Exploitation Framework","Azure AD / Entra ID Attacks","GCP IAM Privilege Escalation","Kubernetes Security (RBAC,Pod Escape)","ScoutSuite & Prowler"],
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
      {id:"osint1",name:"Phase 1 — OSINT Foundations",emoji:"🧭",topics:["OSINT Framework","Maltego — رسم العلاقات","theHarvester للـ Email وSubdomain","Shodan وCensys وFofa","Google Dorks 20+ دورك","Sherlock — Username OSINT","DNSDumpster وWhois","Wayback Machine (Archive.org)","Metadata Extraction (ExifTool)"],
       resources:[
         {title:"OSINT Framework — المرجع الشامل",type:"article",lang:"en",url:"https://osintframework.com/"},
         {title:"TryHackMe — Intro to OSINT",type:"lab",lang:"en",url:"https://tryhackme.com/room/ohsint"},
         {title:"Sherlock — Username OSINT Tool (GitHub)",type:"lab",lang:"en",url:"https://github.com/sherlock-project/sherlock"},
         {title:"theHarvester — Email & Subdomain OSINT (GitHub)",type:"lab",lang:"en",url:"https://github.com/laramies/theHarvester"},
         {title:"IntelTechniques — Michael Bazzell OSINT Resources",type:"article",lang:"en",url:"https://inteltechniques.com/tools/"},
       ]},
      {id:"osint2",name:"Phase 2 — Advanced OSINT & Tools",emoji:"🕵️",topics:["SpiderFoot — Automated OSINT","Recon-ng Framework","Subdomain Enumeration (Amass,Subfinder,Assetfinder)","Certificate Transparency (crt.sh,censys)","GitHub Dorking — البحث عن Secrets","Paste Sites Monitoring","كتابة OSINT Reports"],
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
      {id:"web31",name:"Phase 1 — Blockchain & Solidity Fundamentals",emoji:"🧱",topics:["كيف تعمل Blockchain","Ethereum وEVM أساسيات","Solidity Language — الأساسيات","Remix IDE الاستخدام","ERC-20 وERC-721 Standards","Foundry / Hardhat Tools"],
       resources:[
         {title:"Solidity Docs — التوثيق الرسمي",type:"article",lang:"en",url:"https://docs.soliditylang.org/"},
         {title:"CryptoZombies — تعلم Solidity تفاعلياً (مجاني)",type:"lab",lang:"en",url:"https://cryptozombies.io/"},
         {title:"Remix IDE — بيئة تطوير Solidity مجانية",type:"lab",lang:"en",url:"https://remix.ethereum.org/"},
         {title:"Cyfrin Updraft — Smart Contract Security Courses (Free)",type:"video",lang:"en",url:"https://updraft.cyfrin.io/"},
       ]},
      {id:"web32",name:"Phase 2 — Smart Contract Vulnerabilities & Auditing",emoji:"⚡",topics:["Reentrancy Attacks","Integer Overflow / Underflow","Flash Loan Attacks","Price Oracle Manipulation","Slither Static Analyzer","Damn Vulnerable DeFi","Code4rena وSherlock وImmune.fi","كتابة Audit Report"],
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
      {id:"dfir1",name:"Phase 1 — Digital Forensics",emoji:"🧪",topics:["Chain of Custody وأخلاقيات الجنائيات","File Systems (NTFS,FAT32,ext4)","Disk Imaging (dd,FTK Imager)","File Carving وRecovery","Windows Forensics (Registry,Event Logs)","Browser Forensics","Memory Forensics أساسيات"],
       resources:[
         {title:"Autopsy — Digital Forensics Platform (مجاني)",type:"lab",lang:"en",url:"https://www.autopsy.com/"},
         {title:"TryHackMe — Digital Forensics Path",type:"lab",lang:"en",url:"https://tryhackme.com/path/outline/dfir"},
         {title:"HackTricks — Forensics Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/forensics/basic-forensic-methodology"},
       ]},
      {id:"dfir2",name:"Phase 2 — Memory & Incident Response",emoji:"🚨",topics:["Volatility 3 Framework الكامل","Memory Dump Analysis","PCAP Analysis بعمق","MITRE ATT&CK Framework","Threat Hunting Methodology","YARA Rules للـ Detection","Elastic/Splunk SIEM","Incident Response Lifecycle"],
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
      {id:"wl1",name:"Phase 1 — WiFi Security",emoji:"📶",topics:["IEEE 802.11 Standards","WPA/WPA2-Personal — PMKID & Handshake Attacks","Monitor Mode وPacket Injection","Aircrack-ng Suite كامل","Evil Twin Attacks","Deauthentication Attacks","Wireless Reconnaissance"],
       resources:[
         {title:"Aircrack-ng Suite — Official Documentation",type:"article",lang:"en",url:"https://www.aircrack-ng.org/documentation.html"},
         {title:"HackTricks — Pentesting WiFi",type:"article",lang:"en",url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/pentesting-wifi"},
         {title:"TryHackMe — WiFi Hacking Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/room/wifihacking101"},
         {title:"Wifite2 — Automated WiFi Auditor (GitHub)",type:"lab",lang:"en",url:"https://github.com/derv82/wifite2"},
         {title:"Bettercap — Network Attack Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/bettercap/bettercap"},
       ]},
      {id:"wl2",name:"Phase 2 — Bluetooth & Advanced Wireless",emoji:"🔵",topics:["Bluetooth Security (BLE,Classic)","BLE GATT Exploits","SDR (Software Defined Radio) أساسيات","NFC Security وAttacks","RFID Cloning","Kismet للـ Wireless Discovery"],
       resources:[
         {title:"Kismet — Wireless Network Detector (GitHub)",type:"lab",lang:"en",url:"https://github.com/kismetwireless/kismet"},
         {title:"HackTricks — Pentesting Bluetooth",type:"article",lang:"en",url:"https://book.hacktricks.xyz/bluetooth/"},
         {title:"GNU Radio — SDR Framework (مجاني)",type:"lab",lang:"en",url:"https://www.gnuradio.org/"},
       ]},
    ]},
  crypto:{id:"crypto",name:"Cryptography",nameEn:"Cryptography & Applied Crypto Attacks",icon:"🔐",color:"#e11d48",colorBg:"rgba(225,29,72,0.15)",duration:"2–3 أشهر",desc:"التشفير النظري والتطبيقي، كسر الخوارزميات، Crypto CTF",
    phases:[
      {id:"cry1",name:"Phase 1 — Cryptography Fundamentals",emoji:"🧮",topics:["Symmetric Encryption (AES,DES,3DES)","Asymmetric Encryption (RSA,ECC)","Hashing (MD5,SHA family,bcrypt)","Digital Signatures","Key Exchange (Diffie-Hellman)","Encoding vs Encryption vs Hashing","Base64,Hex,ASCII,Binary"],
       resources:[
         {title:"CryptoHack — Interactive Cryptography Challenges (مجاني)",type:"lab",lang:"en",url:"https://cryptohack.org/"},
         {title:"CyberChef — Crypto Analysis Tool (مجاني)",type:"lab",lang:"en",url:"https://gchq.github.io/CyberChef/"},
         {title:"Cryptopals Challenges — Classic Crypto Attacks (مجاني)",type:"lab",lang:"en",url:"https://cryptopals.com/"},
         {title:"Khan Academy — Cryptography Course (مجاني)",type:"video",lang:"en",url:"https://www.khanacademy.org/computing/computer-science/cryptography"},
       ]},
      {id:"cry2",name:"Phase 2 — Crypto Attacks & CTF",emoji:"⚔️",topics:["RSA Attacks (Small e,Common Modulus,Wiener)","AES Attacks (ECB Mode,Padding Oracle,CBC Bit Flipping)","Hash Length Extension Attacks","JWT Algorithm Confusion (RS256→HS256)","Timing Attacks","SageMath للـ Crypto"],
       resources:[
         {title:"CryptoHack — Advanced Challenges (مجاني)",type:"lab",lang:"en",url:"https://cryptohack.org/challenges/"},
         {title:"RsaCtfTool — RSA Attacks Tool (GitHub)",type:"lab",lang:"en",url:"https://github.com/RsaCtfTool/RsaCtfTool"},
         {title:"PyCryptodome — Python Crypto Library (GitHub)",type:"lab",lang:"en",url:"https://github.com/Legrandin/pycryptodome"},
         {title:"CTF Crypto Writeups — GitHub Collection",type:"writeup",lang:"en",url:"https://github.com/p4-team/ctf"},
       ]},
    ]},
  pwn:{id:"pwn",name:"Binary Exploitation",nameEn:"Binary Exploitation & Reverse Engineering",icon:"💣",color:"#dc2626",colorBg:"rgba(220,38,38,0.12)",duration:"5–8 أشهر",desc:"استغلال الثنائيات، Buffer Overflow، ROP Chains، Kernel Exploitation",
    phases:[
      {id:"pwn1",name:"Phase 1 — Foundations",emoji:"🧱",topics:["Assembly x86/x64 بعمق","C Language للـ Security","Memory Layout (Stack,Heap,BSS,Text)","GDB Debugging كامل","Pwndbg/Peda/GEF Plugins","System Calls وlibc","Calling Conventions"],
       resources:[
         {title:"pwn.college — Free Binary Exploitation (Arizona State Uni)",type:"lab",lang:"en",url:"https://pwn.college/"},
         {title:"pwndbg — GDB Plugin (GitHub)",type:"lab",lang:"en",url:"https://github.com/pwndbg/pwndbg"},
         {title:"OpenSecurityTraining2 — Free RE Courses",type:"video",lang:"en",url:"https://opensecuritytraining.info/"},
       ]},
      {id:"pwn2",name:"Phase 2 — Exploitation Techniques",emoji:"💥",topics:["Stack Buffer Overflow — Classic","Return-to-libc (ret2libc)","ROP Chains (Return Oriented Programming)","Format String Vulnerabilities","Heap Exploitation (Use After Free,Double Free)","PIE وASLR Bypass","Stack Canary Bypass","Shellcode Writing"],
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
      {id:"soc1",name:"Phase 1 — Social Engineering Fundamentals",emoji:"🎯",topics:["Psychology of Social Engineering","Pretexting وبناء القصة","Phishing Email Crafting","Spear Phishing vs Whaling","Vishing (Voice Phishing)","Smishing (SMS Phishing)","GoPhish Framework","SE Toolkit (SET)"],
       resources:[
         {title:"SET — Social Engineering Toolkit (GitHub)",type:"lab",lang:"en",url:"https://github.com/trustedsec/social-engineer-toolkit"},
         {title:"GoPhish — Phishing Framework (GitHub)",type:"lab",lang:"en",url:"https://github.com/gophish/gophish"},
         {title:"TryHackMe — Phishing Rooms",type:"lab",lang:"en",url:"https://tryhackme.com/hacktivities?tab=search&value=phishing"},
         {title:"HackTricks — Phishing Methodology",type:"article",lang:"en",url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/phishing-methodology"},
       ]},
    ]},
};

const TRACK_ORDER=["foundations","web","mobile","api","network","ad","malware","ctf","cloud","osint","web3track","dfir","wireless","crypto","pwn","social"];
const PRI_COL={high:"#ef4444",medium:"#f59e0b",low:"#10b981"};
const PRI_BG={high:"rgba(239,68,68,0.12)",medium:"rgba(245,158,11,0.12)",low:"rgba(16,185,129,0.12)"};
const R_COL={prayer:"rgba(250,204,21,0.15)",islamic:"rgba(52,211,153,0.15)",quran:"rgba(52,211,153,0.2)",study:"rgba(59,130,246,0.12)",health:"rgba(34,197,94,0.12)",break:"rgba(148,163,184,0.08)",project:"rgba(168,85,247,0.12)",community:"rgba(236,72,153,0.12)",personal:"rgba(249,115,22,0.1)"};
const R_TXT={prayer:"#fde047",islamic:"#34d399",quran:"#6ee7b7",study:"#60a5fa",health:"#4ade80",break:"#94a3b8",project:"#c084fc",community:"#f472b6",personal:"#fb923c"};

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
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
      strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.5s ease"}}/>
  </svg>);
}
function Tag({type,lang}){return(<span style={{display:"inline-flex",gap:4,alignItems:"center"}}>
  <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,fontFamily:"'Fira Code',monospace",background:type==="video"?"rgba(239,68,68,0.15)":type==="lab"?"rgba(34,197,94,0.15)":type==="article"?"rgba(249,115,22,0.15)":type==="writeup"?"rgba(236,72,153,0.15)":type==="book"?"rgba(234,179,8,0.15)":"rgba(100,116,139,0.15)",color:type==="video"?"#f87171":type==="lab"?"#4ade80":type==="article"?"#fb923c":type==="writeup"?"#f472b6":type==="book"?"#facc15":"#94a3b8",border:`1px solid ${type==="video"?"rgba(239,68,68,0.3)":type==="lab"?"rgba(34,197,94,0.3)":type==="article"?"rgba(249,115,22,0.3)":type==="writeup"?"rgba(236,72,153,0.3)":type==="book"?"rgba(234,179,8,0.3)":"rgba(100,116,139,0.3)"}`}}>
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

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("cyberpath_v3");if(r?.value){const p=JSON.parse(r.value);setS({...D0,...p});if(p.todos)setTodos(p.todos);}}catch(e){}setLoading(false);})();},[]);
  useEffect(()=>{const fn=()=>setIsMobile(window.innerWidth<768);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);

  const save=useCallback(async(ns,td)=>{try{await window.storage.set("cyberpath_v3",JSON.stringify({...ns,todos:td||todos}));}catch(e){};},[todos]);
  const upd=useCallback((patch)=>{setS(prev=>{const ns={...prev,...(typeof patch==="function"?patch(prev):patch)};save(ns);return ns;});},[save]);
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),2800);};

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

  if(loading)return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#04080f",flexDirection:"column",gap:16}}>
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
  const Sidebar=()=>(<div className="sidebar-glow sidebar-desktop" style={{width:sideOpen?260:72,minHeight:"100vh",background:"linear-gradient(180deg,#060c1a 0%,#040810 100%)",borderRight:"1px solid rgba(0,255,136,0.1)",display:"flex",flexDirection:"column",padding:"20px 10px",gap:3,transition:"width 0.3s ease",position:"fixed",top:0,left:0,zIndex:100,overflowY:"auto",overflowX:"hidden"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,padding:"0 4px"}}>
      <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>setSideOpen(p=>!p)}>
        <span style={{fontSize:16,color:"#050810",fontWeight:900}}>⚡</span>
      </div>
      {sideOpen&&<div><div style={{color:"#00ff88",fontWeight:700,fontSize:13,fontFamily:"'Fira Code',monospace"}} className="glow">CyberPath Academy</div><div style={{color:"#475569",fontSize:10}}>24M | 80W | 5 Phases</div></div>}
    </div>
    {sideOpen&&<div style={{fontSize:10,color:"#334155",padding:"4px 6px",fontFamily:"'Fira Code',monospace"}}>NAVIGATION</div>}
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
        <div><div style={{color:lv.color,fontSize:12,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{lv.ar}</div><div style={{color:"#475569",fontSize:10}}>{s.xp} XP</div></div>
      </div>
      <div className="bar"><div className="bar-fill" style={{width:`${lvPct}%`,background:`linear-gradient(90deg,${lv.color},${lv.color}88)`}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
        <span style={{color:"#334155",fontSize:10}}>Wk {s.currentWeek}/80</span>
        <span style={{color:"#334155",fontSize:10}}>🔥{s.streak}</span>
      </div>
    </div>)}
  </div>);

  // ─── DASHBOARD ───
  const Dashboard=()=>(<div className="slide">
    <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.15)",borderRadius:16,padding:isMobile?"16px":"24px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-20,right:-20,width:200,height:200,background:"radial-gradient(circle,rgba(0,255,136,0.08),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:4}}>// مرحباً في CyberPath Academy</div>
      <h1 style={{color:"#e2e8f0",fontSize:isMobile?18:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>طريقك للاحتراف في الأمن السيبراني 🛡️</h1>
      <p style={{color:"#94a3b8",fontSize:isMobile?12:13,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>برنامج 24 شهراً | 80 أسبوع | 5 مراحل | 16 Track + موارد حقيقية ومتحقق منها</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button className="btn btn-g" onClick={()=>setPage("program")}>🗺️ البرنامج الكامل</button>
        <button className="btn btn-o" onClick={()=>setPage("missions")}>🎯 مهام اليوم</button>
        <button className="btn btn-o" onClick={doCheckIn}>🕌 تسجيل الحضور</button>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:20}}>
      {[
        {label:"تقدم البرنامج",val:`${donePct}%`,icon:"📊",color:"#00ff88",sub:`${s.totalDone}/${totalT} موضوع`},
        {label:"المستوى",val:lv.icon,icon:"🏆",color:lv.color,sub:lv.ar},
        {label:"🔥 السلسلة",val:`${s.streak} يوم`,icon:"🔥",color:"#f97316",sub:`الأفضل: ${s.bestStreak}`},
        {label:"XP الكلي",val:s.xp,icon:"⭐",color:"#fbbf24",sub:`${nlv.lv>lv.lv?nlv.min-s.xp:0} XP للتالي`},
        {label:"الإنجازات",val:`${s.badges.length}/${BADGES.length}`,icon:"🏅",color:"#a78bfa",sub:"شارة"},
        {label:"الاختبارات",val:Object.keys(s.quizHistory).length,icon:"📝",color:"#00d4ff",sub:`من ${Object.keys(QUIZZES).length}`},
      ].map((st,i)=>(<div key={i} className="stat-card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <span style={{fontSize:18}}>{st.icon}</span>
          <span style={{color:st.color,fontSize:18,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
        </div>
        <div style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif",marginTop:6}}>{st.label}</div>
        <div style={{color:"#475569",fontSize:11,marginTop:2,fontFamily:"'Cairo',sans-serif"}}>{st.sub}</div>
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
            <div style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace"}}>الأسبوع {s.currentWeek} · {curWk?.title}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {todayPlan&&<span style={{background:"rgba(0,255,136,0.1)",color:"#00ff88",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>⏱ {todayPlan.hrs}h مقترحة</span>}
            <span style={{background:todayHrs>0?"rgba(167,139,250,0.15)":"rgba(0,0,0,0.3)",color:todayHrs>0?"#a78bfa":"#334155",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>✓ {todayHrs}h مسجلة</span>
            <span style={{background:"rgba(249,115,22,0.1)",color:"#f97316",fontSize:11,padding:"3px 10px",borderRadius:6,fontFamily:"'Fira Code',monospace"}}>📅 {weekHrs.toFixed(1)}h أسبوعياً</span>
          </div>
        </div>
        {isFriday?(
          <div style={{textAlign:"center",padding:"12px 0",color:"#fde047",fontSize:13,fontFamily:"'Cairo',sans-serif"}}>🕌 يوم الجمعة — يوم الراحة والعبادة · سورة الكهف · صلاة الجمعة</div>
        ):todayPlan?(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {todayPlan.items.slice(0,4).map((item,i)=>{
              const dn=item.type==="mission"?!!s.doneMissions?.[`m-${item.wk}-${item.idx}`]:!!s.doneTopics?.[`${item.wk}-${item.idx}`];
              return(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:dn?"rgba(0,255,136,0.04)":"rgba(0,0,0,0.2)",borderRadius:8,border:`1px solid ${dn?"rgba(0,255,136,0.2)":"rgba(255,255,255,0.05)"}`,cursor:"pointer"}}
                onClick={()=>{setPage("missions");}}>
                <div style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${dn?"#00ff88":"rgba(0,255,136,0.3)"}`,background:dn?"#00ff88":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {dn&&<span style={{color:"#040810",fontSize:8,fontWeight:900}}>✓</span>}
                </div>
                <span style={{color:dn?"#475569":"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif",flex:1,textDecoration:dn?"line-through":"none"}}>{item.icon} {item.text}</span>
                <span style={{color:item.type==="mission"?"#00ff88":"#00d4ff",fontSize:10,flexShrink:0}}>+{item.xp} XP</span>
              </div>);
            })}
            {todayPlan.items.length>4&&(<div style={{color:"#475569",fontSize:11,textAlign:"center",fontFamily:"'Cairo',sans-serif",cursor:"pointer",padding:"5px"}} onClick={()=>setPage("missions")}>+ {todayPlan.items.length-4} مهام أخرى ← اعرض الكل</div>)}
          </div>
        ):(
          <div style={{color:"#334155",textAlign:"center",padding:"12px 0",fontFamily:"'Cairo',sans-serif",fontSize:12}}>لا توجد مهام مخطط لهذا اليوم</div>
        )}
        <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
          <button className="btn btn-g" style={{fontSize:11,padding:"6px 14px",flex:1}} onClick={()=>setPage("missions")}>🎯 خطة الأسبوع الكاملة</button>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 14px"}} onClick={doCheckIn}>🕌 تسجيل الحضور</button>
        </div>
      </div>);
    })()}

    <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:20}}>
      <div className="card" style={{padding:14}}>
        <div style={{color:"#e2e8f0",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>📍 الأسبوع الحالي — Week {s.currentWeek}</div>
        {curWk&&(<>
          <div style={{color:curPh.color,fontSize:12,fontFamily:"'Fira Code',monospace",marginBottom:6}}>{curPh.icon} {curPh.nameAr}</div>
          <div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>{curWk.title}</div>
          <div className="bar"><div className="bar-fill" style={{width:`${donePct}%`,background:"linear-gradient(90deg,#00ff88,#00d4ff)"}}/></div>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <button className="btn btn-o" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setPage("missions")}>🎯 المهام</button>
            {QUIZZES[curWk.quizId]&&!s.quizHistory[curWk.quizId]&&(<button className="btn btn-g" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>startQuiz(curWk.quizId)}>📝 اختبار</button>)}
            {s.quizHistory[curWk.quizId]&&(<button className="btn btn-g" style={{fontSize:11,padding:"5px 10px"}} onClick={advWeek}>🚀 الأسبوع التالي</button>)}
          </div>
        </>)}
      </div>
      <div className="card" style={{padding:14}}>
        <div style={{color:"#e2e8f0",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🕌 أوقات الصلاة</div>
        {ROUTINE.filter(r=>r.type==="prayer").slice(0,5).map((r,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:7,background:"rgba(250,204,21,0.06)",border:"1px solid rgba(250,204,21,0.1)",marginBottom:5}}>
          <span style={{fontSize:13}}>{r.icon}</span>
          <span style={{color:"#fde047",fontSize:12,fontFamily:"'Cairo',sans-serif",flex:1}}>{r.label}</span>
          <span style={{color:"#78716c",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{r.time}</span>
        </div>))}
      </div>
    </div>
    <h2 style={{color:"#e2e8f0",fontSize:15,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🚀 المراحل الخمس</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
      {PHASES.map(ph=>{
        const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
        const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
        const pct=pt>0?Math.round(pd/pt*100):0;
        return(<div key={ph.id} className="card" style={{padding:14,cursor:"pointer",borderColor:ph.id===curPh.id?"rgba(0,255,136,0.4)":""}} onClick={()=>{setPage("program");setExpPhase(ph.id);}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:22}}>{ph.icon}</span>
            <div>
              <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{ph.nameAr}</div>
              <div style={{color:"#475569",fontSize:10}}>{ph.monthLabel}</div>
            </div>
            {ph.id===curPh.id&&<span style={{marginLeft:"auto",fontSize:10,color:"#00ff88",background:"rgba(0,255,136,0.12)",padding:"2px 7px",borderRadius:4}}>● نشط</span>}
          </div>
          <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{color:"#64748b",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{ph.desc.substring(0,35)}…</span>
            <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
          </div>
        </div>);
      })}
    </div>
  </div>);

  // ─── PROGRAM ───
  const Program=()=>(<div className="slide">
    <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🗺️ البرنامج الكامل</h1>
    <p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:14}}>24 شهراً | 80 أسبوع | 5 مراحل</p>
    {PHASES.map(ph=>{
      const isO=expPhase===ph.id;
      const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
      const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
      const pct=pt>0?Math.round(pd/pt*100):0;
      return(<div key={ph.id} style={{border:`1px solid ${isO?ph.color+"44":"rgba(255,255,255,0.08)"}`,borderRadius:12,marginBottom:10,overflow:"hidden",background:isO?ph.bg:"rgba(0,0,0,0.2)"}}>
        <div className="phase-hd" onClick={()=>setExpPhase(isO?null:ph.id)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>{ph.icon}</span>
            <div>
              <div style={{color:"#e2e8f0",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{ph.nameAr} — {ph.nameEn}</div>
              <div style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{ph.monthLabel} | Weeks {ph.startWeek}–{ph.endWeek} | +{ph.phaseXP} XP</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:90}}>
              <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:ph.color}}/></div>
              <div style={{color:ph.color,fontSize:10,marginTop:2,fontFamily:"'Fira Code',monospace",textAlign:"right"}}>{pct}%</div>
            </div>
            <span style={{color:"#64748b",fontSize:14,transform:isO?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
          </div>
        </div>
        {isO&&(<div style={{padding:"0 16px 16px"}}>
          <p style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:12,paddingTop:8}}>{ph.desc}</p>
          {ph.weeks.map(w=>{
            const wKey=`${ph.id}-${w.wk}`;const wO=expWeek===wKey;
            const wd=w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length;
            const wPct=Math.round(wd/w.topics.length*100);
            const qd=s.quizHistory[w.quizId];const isCur=w.wk===s.currentWeek;
            return(<div key={w.wk} style={{border:`1px solid ${isCur?"rgba(0,255,136,0.4)":wO?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.05)"}`,borderRadius:8,marginBottom:6,background:isCur?"rgba(0,255,136,0.04)":"rgba(0,0,0,0.2)"}}>
              <div style={{padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}} onClick={()=>setExpWeek(wO?null:wKey)}>
                <div style={{width:30,height:30,borderRadius:6,background:`${ph.color}22`,border:`1px solid ${ph.color}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:ph.color,fontSize:10,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{w.wk}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",gap:6}}>
                    {isCur&&<span style={{fontSize:9,color:"#00ff88",background:"rgba(0,255,136,0.12)",padding:"1px 5px",borderRadius:4}}>● الحالي</span>}
                    {w.title}
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:1}}>
                    <span style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{wd}/{w.topics.length} topics</span>
                    {qd&&<span style={{color:"#10b981",fontSize:10}}>✓ Quiz {qd.score}%</span>}
                  </div>
                </div>
                <div style={{width:55}}><div className="bar"><div className="bar-fill" style={{width:`${wPct}%`,background:ph.color}}/></div></div>
                <span style={{color:"#64748b",fontSize:11,transform:wO?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
              </div>
              {wO&&(<div style={{padding:"0 12px 12px"}}>
                <div style={{display:"grid",gridTemplateColumns:g2,gap:10}}>
                  <div>
                    <div style={{color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:5}}>// missions (+5 XP)</div>
                    {w.missions.map((m,mi)=>{const mk=`m-${w.wk}-${mi}`;const dn=!!s.doneMissions?.[mk];return(<div key={mi} className="topic-row" onClick={()=>markMission(w.wk,mi)}>
                      <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}</div>
                      <span style={{color:dn?"#475569":"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{m}</span>
                    </div>);})}
                  </div>
                  <div>
                    <div style={{color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:5}}>// topics (+10 XP)</div>
                    {w.topics.map((t,ti)=>{const tk=`${w.wk}-${ti}`;const dn=!!s.doneTopics?.[tk];return(<div key={ti} className="topic-row" onClick={()=>markTopic(w.wk,ti)}>
                      <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}</div>
                      <span style={{color:dn?"#475569":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{t}</span>
                    </div>);})}
                  </div>
                </div>
                {QUIZZES[w.quizId]&&(<div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                  {!qd?<button className="btn btn-g" style={{fontSize:11,padding:"5px 12px"}} onClick={()=>startQuiz(w.quizId)}>📝 اختبار الأسبوع {w.quizId.replace("wk","")}</button>
                      :<span style={{color:"#10b981",fontSize:12,fontFamily:"'Cairo',sans-serif",padding:"5px 0"}}>✓ اجتزت الاختبار — {qd.score}%</span>}
                  {isCur&&qd&&<button className="btn btn-o" style={{fontSize:11,padding:"5px 12px"}} onClick={advWeek}>🚀 الأسبوع التالي</button>}
                </div>)}
                {ph.relatedTracks.filter(tid=>TRACKS[tid]).length>0&&(<div style={{marginTop:10,background:"rgba(0,0,0,0.2)",borderRadius:6,padding:8}}>
                  <div style={{color:"#334155",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:6}}>// موارد مرتبطة</div>
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
          <h1 style={{color:"#e2e8f0",fontSize:isMobile?18:21,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>🎯 خطة اليوم والأسبوع</h1>
          <p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace"}}>الأسبوع {s.currentWeek} — {wD.title} — {findPhase(s.currentWeek).nameAr}</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 12px"}} onClick={doCheckIn}>🕌 حضور +15 XP</button>
          <button className="btn btn-o" style={{fontSize:11,padding:"6px 12px"}} onClick={saveWeekReport}>📋 حفظ التقرير</button>
        </div>
      </div>

      {/* ─ بطاقات الحالة ─ */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:16}}>
        {[
          {label:"المهام",val:`${mD}/${wD.missions.length}`,color:"#00ff88",icon:"🎯"},
          {label:"المواضيع",val:`${tD}/${wD.topics.length}`,color:"#00d4ff",icon:"📚"},
          {label:"ساعات اليوم",val:`${todayHrs}h`,color:"#a78bfa",icon:"⏱️"},
          {label:"ساعات الأسبوع",val:`${weekHrs.toFixed(1)}h`,color:"#f97316",icon:"📅"},
          {label:"إجمالي الساعات",val:`${totalHrs.toFixed(0)}h`,color:"#fbbf24",icon:"⭐"},
          {label:"🔥 السلسلة",val:`${s.streak} يوم`,color:"#ef4444",icon:"🔥"},
        ].map((st,i)=>(<div key={i} className="stat-card" style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:16}}>{st.icon}</span>
            <span style={{color:st.color,fontSize:16,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
          </div>
          <div style={{color:"#94a3b8",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:5}}>{st.label}</div>
        </div>))}
      </div>

      {/* ─ تسجيل ساعات الدراسة ─ */}
      <div style={{background:"linear-gradient(135deg,rgba(167,139,250,0.07),rgba(0,212,255,0.04))",border:"1px solid rgba(167,139,250,0.2)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#a78bfa",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>⏱️ سجّل ساعات دراستك اليوم</div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <input type="number" min="0.5" max="16" step="0.5" placeholder="مثال: 2.5" value={studyHoursInput} onChange={e=>setStudyHoursInput(e.target.value)}
            style={{width:120,flex:"0 0 auto"}} onKeyDown={e=>e.key==="Enter"&&logStudyHours(studyHoursInput)}/>
          <span style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>ساعة</span>
          <button className="btn btn-g" style={{fontSize:12,padding:"8px 18px"}} onClick={()=>logStudyHours(studyHoursInput)}>+ تسجيل</button>
          {todayHrs>0&&<span style={{color:"#a78bfa",fontSize:12,fontFamily:"'Cairo',sans-serif",background:"rgba(167,139,250,0.1)",padding:"4px 10px",borderRadius:6}}>اليوم: {todayHrs}h ✓</span>}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
          {weekDates.slice(0,7).reverse().map((d,i)=>{const h=s.studyLog?.[d]||0;const label=["ج","خ","أ","ث","إ","أح","س"][6-i]||"";
            return(<div key={d} style={{textAlign:"center",flex:1,minWidth:32}}>
              <div style={{height:40,background:h>0?`rgba(167,139,250,${Math.min(0.8,h*0.15)})`:"rgba(255,255,255,0.04)",borderRadius:4,border:`1px solid ${h>0?"rgba(167,139,250,0.3)":"rgba(255,255,255,0.06)"}`,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:3}}>
                <span style={{color:h>0?"#a78bfa":"#334155",fontSize:9,fontFamily:"'Fira Code',monospace"}}>{h>0?h:""}</span>
              </div>
              <div style={{color:"#475569",fontSize:9,marginTop:2}}>{label}</div>
            </div>);
          })}
        </div>
      </div>

      {/* ─ خطة اليوم ─ */}
      {isFriday?(
        <div style={{background:"linear-gradient(135deg,rgba(250,204,21,0.08),rgba(52,211,153,0.04))",border:"1px solid rgba(250,204,21,0.25)",borderRadius:12,padding:16,marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:8}}>🕌</div>
          <div style={{color:"#fde047",fontSize:16,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>يوم الجمعة — يوم الراحة والعبادة</div>
          <div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",lineHeight:1.8}}>
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
                return(<div key={i} className="topic-row" style={{background:dn?"rgba(0,255,136,0.04)":"rgba(255,255,255,0.02)",border:`1px solid ${dn?"rgba(0,255,136,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:8,padding:"10px 12px"}}
                  onClick={()=>item.type==="mission"?markMission(item.wk,item.idx):markTopic(item.wk,item.idx)}>
                  <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"#040810",fontSize:10,fontWeight:900}}>✓</span>}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <span style={{color:dn?"#475569":"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none"}}>{item.text}</span>
                  </div>
                  <span style={{fontSize:11,color:item.type==="mission"?"#00ff88":"#00d4ff",background:item.type==="mission"?"rgba(0,255,136,0.08)":"rgba(0,212,255,0.08)",padding:"2px 7px",borderRadius:4,flexShrink:0}}>{item.icon} +{item.xp}</span>
                </div>);
              })}
            </div>
          ):(
            <div style={{color:"#334155",textAlign:"center",padding:"20px 0",fontFamily:"'Cairo',sans-serif"}}>لا توجد مهام مخطط لها اليوم</div>
          )}
        </div>
      )}

      {/* ─ جميع المهام والمواضيع الأسبوعية ─ */}
      <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:16}}>
        <div className="card" style={{padding:14}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🎯 مهام الأسبوع <span style={{color:"#00ff88",fontSize:10}}>+5 XP لكل</span></div>
          <div className="bar" style={{marginBottom:8}}><div className="bar-fill" style={{width:`${Math.round(mD/wD.missions.length*100)}%`,background:"linear-gradient(90deg,#00ff88,#10b981)"}}/></div>
          {wD.missions.map((m,i)=>{const dn=!!s.doneMissions?.[`m-${s.currentWeek}-${i}`];return(<div key={i} className="topic-row" onClick={()=>markMission(s.currentWeek,i)}>
            <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"#040810",fontSize:10,fontWeight:900}}>✓</span>}</div>
            <span style={{color:dn?"#475569":"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none",flex:1}}>{m}</span>
          </div>);})}
        </div>
        <div className="card" style={{padding:14}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>📚 مواضيع الأسبوع <span style={{color:"#00d4ff",fontSize:10}}>+10 XP لكل</span></div>
          <div className="bar" style={{marginBottom:8}}><div className="bar-fill" style={{width:`${phPct}%`,background:"linear-gradient(90deg,#00d4ff,#3b82f6)"}}/></div>
          {wD.topics.map((t,i)=>{const dn=!!s.doneTopics?.[`${s.currentWeek}-${i}`];return(<div key={i} className="topic-row" onClick={()=>markTopic(s.currentWeek,i)}>
            <div className={`chk ${dn?"on":""}`}>{dn&&<span style={{color:"#040810",fontSize:10,fontWeight:900}}>✓</span>}</div>
            <span style={{color:dn?"#475569":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:dn?"line-through":"none",flex:1}}>{t}</span>
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
        <p style={{color:"#64748b",fontSize:11,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>هذه الأسابيع تحتاج مراجعة للترسيخ في الذاكرة طويلة الأمد</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {reviewWks.map(wk=>{const w=findWeek(wk);const ph=findPhase(wk);return w?(
            <div key={wk} style={{background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:8,padding:"8px 12px",cursor:"pointer"}} onClick={()=>{setExpPhase(ph.id);setExpWeek(`${ph.id}-${wk}`);setPage("program");}}>
              <div style={{color:"#fbbf24",fontSize:12,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>Week {wk}</div>
              <div style={{color:"#94a3b8",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{w.title}</div>
            </div>
          ):null;})}
        </div>
      </div>)}

      {/* ─ التقرير الأسبوعي ─ */}
      {(weekReportOpen||savedReport)&&(<div style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.2)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{color:"#00ff88",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>📋 تقرير الأسبوع {s.currentWeek}</div>
          <button style={{background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:16}} onClick={()=>setWeekReportOpen(false)}>×</button>
        </div>
        {(()=>{const r=savedReport||generateWeekReport();if(!r)return null;return(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
            {[
              {label:"المرحلة",val:r.phase,color:"#3b82f6",icon:"🏗️"},
              {label:"الموضوع",val:r.title,color:"#e2e8f0",icon:"📖"},
              {label:"المهام",val:`${r.mDone}/${r.mTotal}`,color:"#00ff88",icon:"🎯"},
              {label:"المواضيع",val:`${r.tDone}/${r.tTotal}`,color:"#00d4ff",icon:"📚"},
              {label:"ساعات الدراسة",val:`${r.weekHrs}h`,color:"#a78bfa",icon:"⏱️"},
              {label:"نتيجة الاختبار",val:r.quizScore!==null?`${r.quizScore}%`:"لم يُجتز",color:r.quizScore>=80?"#10b981":"#f59e0b",icon:"📝"},
            ].map((st,i)=>(<div key={i} style={{background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"10px",border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontSize:16,marginBottom:4}}>{st.icon}</div>
              <div style={{color:st.color,fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{st.val}</div>
              <div style={{color:"#64748b",fontSize:10,fontFamily:"'Cairo',sans-serif",marginTop:2}}>{st.label}</div>
            </div>))}
          </div>
        );})()}
      </div>)}

      {/* ─ زر التقدم للأسبوع التالي ─ */}
      {qd&&s.currentWeek<80&&(<div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.3)",borderRadius:12,padding:14,textAlign:"center"}}>
        <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>✅ أكملت اختبار هذا الأسبوع — جاهز للتقدم!</div>
        <button className="btn btn-g" style={{fontSize:13,padding:"10px 28px"}} onClick={()=>{saveWeekReport();advWeek();}}>🚀 الأسبوع {s.currentWeek+1} ←</button>
      </div>)}
    </div>);};


  // ─── QUIZ ───
  const QuizPage=()=>{
    if(!quiz.active||!quiz.wkId)return(<div className="slide">
      <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>📝 الاختبارات الأسبوعية</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
        {Object.entries(QUIZZES).map(([id,q])=>{const dn=s.quizHistory[id];const wn=parseInt(id.replace("wk",""));const ph=findPhase(wn);return(<div key={id} className="card" style={{padding:14,cursor:"pointer"}} onClick={()=>startQuiz(id)}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:16}}>{ph?.icon||"📝"}</span>
            <div style={{flex:1}}>
              <div style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{q.title}</div>
              <div style={{color:"#475569",fontSize:10}}>Week {wn} — {q.qs.length} أسئلة</div>
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
        <div><h1 style={{color:"#e2e8f0",fontSize:18,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>{q.title}</h1><p style={{color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{q.qs.length} أسئلة</p></div>
      </div>
      {quiz.submitted?(<div>
        <div style={{background:quiz.score>=80?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${quiz.score>=80?"#10b981":"#ef4444"}`,borderRadius:12,padding:18,marginBottom:18,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:6}}>{quiz.score===100?"🏆":quiz.score>=80?"✅":"📖"}</div>
          <div style={{color:"#e2e8f0",fontSize:26,fontWeight:900,fontFamily:"'Fira Code',monospace"}}>{quiz.score}%</div>
          <div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",marginTop:4}}>{quiz.score===100?"ممتاز — علامة كاملة!":quiz.score>=80?"جيد جداً — تجاوزت الحد!":"تحتاج مزيداً من الدراسة"}</div>
        </div>
        {q.qs.map((qst,i)=>{const ans=quiz.ans[i];const ok=ans===qst.a;return(<div key={i} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${ok?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`,borderRadius:8,padding:12,marginBottom:8}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>{ok?"✅":"❌"} {qst.q}</div>
          <div style={{color:ok?"#6ee7b7":"#f87171",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>إجابتك: {ans!==undefined?qst.os[ans]:"لم تجب"}</div>
          {!ok&&<div style={{color:"#6ee7b7",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>الصحيح: {qst.os[qst.a]}</div>}
          <div style={{color:"#64748b",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{qst.exp}</div>
        </div>);})}
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-o" onClick={()=>setQuiz({active:true,wkId:quiz.wkId,ans:{},submitted:false,score:0})}>🔄 إعادة</button>
          <button className="btn btn-g" onClick={()=>setQuiz({active:false,wkId:null,ans:{},submitted:false,score:0})}>← الكل</button>
        </div>
      </div>):(<div>
        {q.qs.map((qst,i)=>(<div key={i} style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:14,marginBottom:14}}>
          <div style={{color:"#e2e8f0",fontSize:14,fontFamily:"'Cairo',sans-serif",marginBottom:10,fontWeight:600}}>{i+1}. {qst.q}</div>
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
    <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🏅 الإنجازات والشهادات</h1>
    <p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:16}}>{s.badges.length}/{BADGES.length} شارة · {s.certificates?.length||0}/5 شهادة</p>

    {/* ─ شهادات المراحل ─ */}
    <h2 style={{color:"#e2e8f0",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🎓 شهادات إنهاء المراحل</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,marginBottom:20}}>
      {PHASES.map(ph=>{
        const earned=s.certificates?.includes(ph.id);
        const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
        const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
        const pct=pt>0?Math.round(pd/pt*100):0;
        return(<div key={ph.id} style={{background:earned?`linear-gradient(135deg,${ph.color}15,${ph.color}08)`:"rgba(0,0,0,0.3)",border:`2px solid ${earned?ph.color:"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:14,position:"relative",overflow:"hidden",cursor:earned?"pointer":"default"}}
          onClick={()=>earned&&setCertModal(ph)}>
          {earned&&<div style={{position:"absolute",top:0,right:0,background:`linear-gradient(135deg,${ph.color},${ph.color}88)`,color:"#040810",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:"0 12px 0 8px"}}>✓ مكتسبة</div>}
          <div style={{fontSize:32,marginBottom:8,opacity:earned?1:0.3}}>{ph.icon}</div>
          <div style={{color:earned?ph.color:"#64748b",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{ph.nameAr}</div>
          <div style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:8}}>{ph.monthLabel} · Wk {ph.startWeek}–{ph.endWeek}</div>
          <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{color:"#475569",fontSize:10,fontFamily:"'Cairo',sans-serif"}}>{pd}/{pt} موضوع</span>
            <span style={{color:earned?ph.color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
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
          <div style={{color:"#64748b",fontSize:11}}>{lv.en}</div>
        </div>
        <div style={{flex:1,minWidth:180}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>Level {lv.lv} → {nlv?.lv||"MAX"}</span>
            <span style={{color:lv.color,fontSize:12,fontFamily:"'Fira Code',monospace"}}>{s.xp} XP</span>
          </div>
          <div className="bar" style={{height:10}}><div className="bar-fill" style={{width:`${lvPct}%`,background:`linear-gradient(90deg,${lv.color},${lv.color}88)`}}/></div>
          <div style={{color:"#475569",fontSize:11,marginTop:4,fontFamily:"'Cairo',sans-serif"}}>{nlv&&nlv.lv!==lv.lv?`${nlv.min-s.xp} XP للمستوى التالي: ${nlv.ar}`:"وصلت لأعلى مستوى 🏆"}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:7,marginTop:14}}>
        {LEVELS.map(l=>(<div key={l.lv} style={{padding:"7px",borderRadius:7,background:lv.lv>=l.lv?`${l.color}15`:"rgba(0,0,0,0.2)",border:`1px solid ${lv.lv>=l.lv?l.color+"44":"rgba(255,255,255,0.05)"}`,textAlign:"center"}}>
          <div style={{fontSize:18,opacity:lv.lv>=l.lv?1:0.25}}>{l.icon}</div>
          <div style={{color:lv.lv>=l.lv?l.color:"#334155",fontSize:10,fontFamily:"'Cairo',sans-serif",marginTop:3}}>{l.ar}</div>
          <div style={{color:"#334155",fontSize:9}}>{l.min} XP</div>
        </div>))}
      </div>
    </div>
    <h2 style={{color:"#e2e8f0",fontSize:15,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🎖️ الشارات</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
      {BADGES.map(b=>{const earned=s.badges.includes(b.id);return(<div key={b.id} style={{background:earned?"rgba(0,255,136,0.05)":"rgba(0,0,0,0.2)",border:`1px solid ${earned?"rgba(0,255,136,0.3)":"rgba(255,255,255,0.06)"}`,borderRadius:10,padding:12,opacity:earned?1:0.5}}>
        <div style={{fontSize:28,marginBottom:5}}>{b.icon}</div>
        <div style={{color:earned?"#e2e8f0":"#64748b",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{b.ar}</div>
        <div style={{color:"#64748b",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:2}}>{b.desc}</div>
        <div style={{color:earned?"#00ff88":"#334155",fontSize:10,fontFamily:"'Fira Code',monospace",marginTop:5}}>{earned?"✓ مكتسبة":"+"+b.xp+" XP"}</div>
      </div>);})}
    </div>
  </div>);};

  // ─── RESOURCES ───
  const Resources=()=>(<div className="slide">
    <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>📚 مكتبة الموارد الشاملة</h1>
    <p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:12}}>{allRes.length}+ مورد — روابط حقيقية ومتحقق منها من 16 تراك</p>
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
      <span style={{color:"#475569",fontSize:12,fontFamily:"'Fira Code',monospace",display:"flex",alignItems:"center",gap:4}}>{filtRes.length} نتيجة</span>
      {resTid!=="all"&&<button className="btn btn-o" style={{fontSize:11,padding:"4px 10px"}} onClick={()=>setResTid("all")}>× إزالة الفلتر</button>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:14}}>
      {[{type:"video",label:"Videos",color:"#ef4444"},{type:"lab",label:"Labs",color:"#10b981"},{type:"article",label:"Articles",color:"#f97316"},{type:"writeup",label:"Writeups",color:"#ec4899"},{type:"book",label:"Books",color:"#eab308"}].map(st=>(<div key={st.type} style={{padding:"8px",borderRadius:8,background:`${st.color}12`,border:`1px solid ${st.color}25`,textAlign:"center",cursor:"pointer",transition:"all .2s"}} onClick={()=>setResType(resType===st.type?"all":st.type)}>
        <div style={{color:st.color,fontSize:15,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{allRes.filter(r=>r.type===st.type).length}</div>
        <div style={{color:"#64748b",fontSize:11}}>{st.label}</div>
      </div>))}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {filtRes.map((r,i)=>(<a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <div className="res-card">
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{r.title}</div>
              <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
                {TRACKS[r.tid]&&<span style={{fontSize:11,color:TRACKS[r.tid].color,fontFamily:"'Fira Code',monospace"}}>{TRACKS[r.tid].icon} {TRACKS[r.tid].name}</span>}
                <span style={{color:"#334155",fontSize:10}}>{r.ph}</span>
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
      <div><h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>✅ قائمة المهام</h1><p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{doneTd}/{todos.length} مكتمل</p></div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {[{id:"all",label:"الكل"},{id:"pending",label:"متبقية"},{id:"done",label:"مكتملة"},{id:"high",label:"⚡ عاجل"}].map(f=>(<button key={f.id} onClick={()=>setTodoFilter(f.id)}
          style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${todoFilter===f.id?"#00ff88":"rgba(255,255,255,0.1)"}`,background:todoFilter===f.id?"rgba(0,255,136,0.1)":"transparent",color:todoFilter===f.id?"#00ff88":"#94a3b8",cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
          {f.label}
        </button>))}
      </div>
    </div>
    <div style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.15)",borderRadius:12,padding:12,marginBottom:14}}>
      <div style={{color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace",marginBottom:7}}>// إضافة مهمة جديدة</div>
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
    {filtTd.length===0?(<div style={{textAlign:"center",padding:"40px 20px",color:"#334155"}}><div style={{fontSize:36,marginBottom:8}}>✅</div><div style={{fontFamily:"'Cairo',sans-serif"}}>لا توجد مهام هنا</div></div>)
    :filtTd.map(t=>(<div key={t.id} className="todo-item" style={{opacity:t.done?0.6:1}}>
      <div style={{width:17,height:17,border:`2px solid ${t.done?"#00ff88":"rgba(0,255,136,0.4)"}`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,background:t.done?"#00ff88":"transparent"}} onClick={()=>togTodo(t.id)}>
        {t.done&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:t.done?"#475569":"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",textDecoration:t.done?"line-through":"none",wordBreak:"break-word"}}>{t.text}</div>
        <div style={{display:"flex",gap:7,marginTop:3,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"#64748b",fontFamily:"'Fira Code',monospace"}}>{t.date}</span>
          {t.track!=="general"&&TRACKS[t.track]&&<span style={{fontSize:10,color:TRACKS[t.track].color}}>{TRACKS[t.track].icon} {TRACKS[t.track].name}</span>}
        </div>
      </div>
      <span style={{padding:"3px 9px",borderRadius:20,fontSize:10,fontFamily:"'Fira Code',monospace",background:PRI_BG[t.priority],color:PRI_COL[t.priority],border:`1px solid ${PRI_COL[t.priority]}40`,flexShrink:0}}>
        {t.priority==="high"?"⚡ عاجل":t.priority==="medium"?"📌 متوسط":"🟢 منخفض"}
      </span>
      <button onClick={()=>delTodo(t.id)} style={{background:"transparent",border:"none",color:"#334155",cursor:"pointer",fontSize:15,padding:"0 3px",flexShrink:0}}>✕</button>
    </div>))}
    <div style={{marginTop:14,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:12,border:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[{label:"إجمالي",val:todos.length,color:"#94a3b8"},{label:"مكتملة",val:doneTd,color:"#10b981"},{label:"متبقية",val:todos.filter(t=>!t.done).length,color:"#f59e0b"},{label:"عاجلة",val:todos.filter(t=>t.priority==="high"&&!t.done).length,color:"#ef4444"}].map((st,i)=>(<div key={i} style={{textAlign:"center",flex:1,minWidth:60}}>
          <div style={{color:st.color,fontSize:20,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</div>
          <div style={{color:"#475569",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{st.label}</div>
        </div>))}
      </div>
    </div>
  </div>);

  // ─── ROUTINE ───
  const Routine=()=>(<div className="slide">
    <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🕐 الروتين اليومي المتكامل</h1>
    <p style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>روتين يومي محكم يجمع بين الجانب الإسلامي والتعلم المنظم — مستوحى من هدي النبي ﷺ</p>
    <div style={{display:"grid",gridTemplateColumns:g2,gap:10,marginBottom:14}}>
      <div style={{background:"linear-gradient(135deg,rgba(250,204,21,0.08),rgba(52,211,153,0.04))",border:"1px solid rgba(250,204,21,0.2)",borderRadius:12,padding:12}}>
        <div style={{color:"#fde047",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:5}}>🕌 يوم الجمعة — مميزات خاصة</div>
        <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>✦ قراءة سورة الكهف كاملة صباحاً<br/>✦ التبكير إلى صلاة الجمعة<br/>✦ الإكثار من الصلاة على النبي ﷺ<br/>✦ الدعاء في ساعة الإجابة (بعد العصر)<br/>✦ وقت مخفف للتعلم — يوم أسري</div>
      </div>
      <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.1),rgba(250,204,21,0.04))",border:"1px solid rgba(52,211,153,0.2)",borderRadius:12,padding:12}}>
        <div style={{color:"#34d399",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:5}}>🌙 رمضان المبارك</div>
        <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>✦ السحور + التعلم قبل الفجر<br/>✦ النوم بعد الفجر → الاستيقاظ الضحى<br/>✦ تخفيف جلسات التعلم أثناء الصيام<br/>✦ الاستثمار في تلاوة القرآن وختمه<br/>✦ التراويح والقيام أولوية</div>
      </div>
    </div>
    <div style={{background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:10,padding:12,marginBottom:12}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:20}}>🌙</span>
        <div><div style={{color:"#34d399",fontSize:12,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>تذكير إسلامي</div>
          <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>«إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ» — الإتقان في التعلم عبادة. ابدأ كل جلسة بالبسملة.</div>
        </div>
      </div>
    </div>
    <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
      {[{id:"all",label:"📋 الكل",c:"#94a3b8"},{id:"prayer",label:"🕌 الصلوات",c:"#fde047"},{id:"quran",label:"📖 القرآن",c:"#6ee7b7"},{id:"islamic",label:"📿 الأذكار",c:"#34d399"},{id:"study",label:"💻 التعلم",c:"#60a5fa"},{id:"health",label:"🏃 الصحة",c:"#4ade80"}].map(f=>(<button key={f.id} onClick={()=>setRoutineFilter(f.id)}
        style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${routineFilter===f.id?f.c:"rgba(255,255,255,0.08)"}`,background:routineFilter===f.id?`${f.c}18`:"transparent",color:routineFilter===f.id?f.c:"#64748b",cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
        {f.label}
      </button>))}
    </div>
    <div style={{position:"relative",paddingLeft:14}}>
      <div style={{position:"absolute",left:18,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#00ff8822,#00d4ff22)",borderRadius:1}}/>
      {ROUTINE.filter(r=>routineFilter==="all"||r.type===routineFilter).map((r,i)=>(<div key={i} className="routine-row" style={{paddingLeft:30,position:"relative"}}>
        <div style={{position:"absolute",left:8,top:12,width:18,height:18,borderRadius:"50%",background:R_COL[r.type]||"rgba(148,163,184,0.1)",border:`2px solid ${R_TXT[r.type]||"#64748b"}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,zIndex:1}}>{r.icon}</div>
        <div style={{flex:1,background:R_COL[r.type]||"rgba(0,0,0,0)",padding:"9px 12px",borderRadius:8,border:`1px solid ${R_TXT[r.type]||"#64748b"}20`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace",flexShrink:0}}>{r.time}</span>
            <span style={{color:R_TXT[r.type]||"#94a3b8",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{r.label}</span>
          </div>
          <div style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{r.detail}</div>
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
      <h1 style={{color:"#e2e8f0",fontSize:21,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>📈 الإحصائيات التفصيلية</h1>
      <p style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:16}}>تحليل شامل لرحلتك التعليمية كمنحة</p>

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
        ].map((st,i)=>(<div key={i} className="stat-card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <span style={{fontSize:18}}>{st.icon}</span>
            <span style={{color:st.color,fontSize:16,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
          </div>
          <div style={{color:"#e2e8f0",fontSize:11,fontFamily:"'Cairo',sans-serif",marginTop:5}}>{st.label}</div>
        </div>))}
      </div>

      {/* ─ رسم بياني لساعات الدراسة ─ */}
      <div style={{background:"rgba(167,139,250,0.05)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#a78bfa",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>⏱️ ساعات الدراسة — آخر 14 يوم</div>
        <div style={{display:"flex",gap:4,alignItems:"flex-end",height:70}}>
          {last14.map((d,i)=>{const h=s.studyLog?.[d]||0;const pct=maxHrs>0?h/maxHrs:0;const isToday=d===today();
            return(<div key={d} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:"100%",background:isToday?`rgba(0,255,136,${0.15+pct*0.7})`:`rgba(167,139,250,${0.1+pct*0.7})`,borderRadius:"3px 3px 0 0",height:`${Math.max(4,pct*60)}px`,border:`1px solid ${isToday?"rgba(0,255,136,0.4)":"rgba(167,139,250,0.3)"}`,transition:"height .3s"}}/>
              <div style={{color:"#334155",fontSize:8,fontFamily:"'Fira Code',monospace"}}>{h>0?h:""}</div>
            </div>);
          })}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{color:"#334155",fontSize:9,fontFamily:"'Fira Code',monospace"}}>{last14[0]?.slice(5)}</span>
          <span style={{color:"#334155",fontSize:9,fontFamily:"'Fira Code',monospace"}}>اليوم ↑</span>
        </div>
      </div>

      {/* ─ تقدم المراحل + الاختبارات ─ */}
      <div style={{display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:16}}>
        <div className="card" style={{padding:14}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📊 تقدم المراحل الخمس</div>
          {PHASES.map(ph=>{
            const pt=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
            const pd=ph.weeks.reduce((a,w)=>a+w.topics.filter((_,i)=>s.doneTopics?.[`${w.wk}-${i}`]).length,0);
            const pct=pt>0?Math.round(pd/pt*100):0;
            const cert=s.certificates?.includes(ph.id);
            return(<div key={ph.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{ph.icon} {ph.nameAr} {cert?"🎓":""}</span>
                <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${ph.color},${ph.color}88)`}}/></div>
            </div>);
          })}
        </div>
        <div className="card" style={{padding:14}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📝 تاريخ الاختبارات</div>
          {Object.entries(s.quizHistory).length===0?(<div style={{color:"#334155",fontFamily:"'Cairo',sans-serif",fontSize:12,textAlign:"center",padding:"20px 0"}}>لم تجتز أي اختبار بعد</div>)
          :Object.entries(s.quizHistory).map(([id,q])=>(<div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <span style={{color:"#94a3b8",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{QUIZZES[id]?.title||id}</span>
            <span style={{color:q.score>=80?"#10b981":"#f59e0b",fontSize:11,fontFamily:"'Fira Code',monospace",background:q.score>=80?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)",padding:"1px 6px",borderRadius:4}}>{q.score}%</span>
          </div>))}
        </div>
      </div>

      {/* ─ التقارير الأسبوعية المحفوظة ─ */}
      {Object.keys(s.weeklyReports||{}).length>0&&(<div style={{background:"rgba(0,255,136,0.03)",border:"1px solid rgba(0,255,136,0.12)",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{color:"#00ff88",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>📋 التقارير الأسبوعية المحفوظة</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {Object.entries(s.weeklyReports).map(([key,r])=>(
            <div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:"rgba(0,0,0,0.2)",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",flexWrap:"wrap",gap:6}}>
              <div><div style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{r.phase} — الأسبوع {r.wk}</div>
                <div style={{color:"#64748b",fontSize:10,fontFamily:"'Cairo',sans-serif"}}>{r.title} · {r.date}</div></div>
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
      <div style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:14}}>
        <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>🗺️ تقدم التراكات الـ 16</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8}}>
          {TRACK_ORDER.map(tid=>{const t=TRACKS[tid];const pct=getTrkPct(tid);return(<div key={tid} style={{padding:"9px",background:"rgba(255,255,255,0.02)",borderRadius:8,border:`1px solid ${t.color}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontSize:14}}>{t.icon}</span>
              <span style={{color:t.color,fontSize:10,fontFamily:"'Fira Code',monospace"}}>{pct}%</span>
            </div>
            <div style={{color:"#94a3b8",fontSize:11,fontFamily:"'Cairo',sans-serif",marginBottom:3}}>{t.name}</div>
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

  return(<div className="matrix-bg" style={{fontFamily:"'Fira Code',monospace",background:"#05080f",minHeight:"100vh",color:"#e2e8f0"}}>
    <style>{FONTS+CSS}</style>
    {toast&&<div className="xp-toast">{toast}</div>}

    {/* ─── مودال الشهادة ─── */}
    {certModal&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setCertModal(null)}>
      <div style={{background:"linear-gradient(135deg,#060c1a,#04080f)",border:`2px solid ${certModal.color}`,borderRadius:20,padding:isMobile?"24px 20px":"40px",maxWidth:520,width:"100%",textAlign:"center",position:"relative",boxShadow:`0 0 60px ${certModal.color}33`}} onClick={e=>e.stopPropagation()}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${certModal.color},${certModal.color}88)`,borderRadius:"20px 20px 0 0"}}/>
        <div style={{fontSize:10,color:"#64748b",fontFamily:"'Fira Code',monospace",marginBottom:12,letterSpacing:3}}>CYBERPATH ACADEMY — CERTIFICATE OF COMPLETION</div>
        <div style={{fontSize:64,marginBottom:8}}>{certModal.icon}</div>
        <div style={{color:"#e2e8f0",fontSize:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>{certModal.nameAr}</div>
        <div style={{color:certModal.color,fontSize:14,fontFamily:"'Fira Code',monospace",marginBottom:16}}>{certModal.nameEn}</div>
        <div style={{background:`${certModal.color}12`,border:`1px solid ${certModal.color}33`,borderRadius:10,padding:"12px 20px",marginBottom:16}}>
          <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.8}}>
            {certModal.desc}<br/>
            <span style={{color:"#64748b",fontSize:10}}>الأسابيع {certModal.startWeek}–{certModal.endWeek} · {certModal.monthLabel}</span>
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
