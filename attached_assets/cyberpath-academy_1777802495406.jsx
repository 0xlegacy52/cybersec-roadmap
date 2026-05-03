import { useState, useEffect, useCallback } from "react";

// ──────────────────────────────────────────────
//  FONTS & CSS
// ──────────────────────────────────────────────
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
.btn-red{background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:8px 16px}
.card{background:rgba(0,255,136,.03);border:1px solid rgba(0,255,136,.1);border-radius:12px}
.card:hover{border-color:rgba(0,255,136,.25);background:rgba(0,255,136,.05);transition:all .2s}
.nav{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;cursor:pointer;color:#64748b;font-size:13px;border:1px solid transparent;transition:all .2s}
.nav:hover{background:rgba(0,255,136,.07);color:#00ff88}
.nav.on{background:rgba(0,255,136,.12);color:#00ff88;border-color:rgba(0,255,136,.25)}
.badge-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600}
.bar{height:6px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width .5s ease}
.topic-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:6px;cursor:pointer;transition:all .15s}
.topic-row:hover{background:rgba(255,255,255,.04)}
.chk{width:17px;height:17px;border:2px solid rgba(0,255,136,.4);border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s}
.chk.on{background:#00ff88;border-color:#00ff88}
.phase-hd{padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background .2s}
.phase-hd:hover{background:rgba(0,255,136,.04)}
.pulse{animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}
.slide{animation:slide .3s ease}
@keyframes slide{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.xp-toast{position:fixed;top:24px;right:24px;background:linear-gradient(135deg,#00ff88,#00d4ff);color:#040810;padding:10px 18px;border-radius:10px;font-weight:700;font-size:14px;z-index:9999;animation:toastIn .4s ease,toastOut .4s ease 2.2s forwards}
@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes toastOut{from{opacity:1}to{opacity:0}}
.quiz-opt{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:12px 16px;cursor:pointer;transition:all .2s;font-family:'Cairo',sans-serif;color:#cbd5e1;font-size:14px}
.quiz-opt:hover{border-color:rgba(0,212,255,.4);background:rgba(0,212,255,.07)}
.quiz-opt.correct{border-color:#10b981;background:rgba(16,185,129,.15);color:#6ee7b7}
.quiz-opt.wrong{border-color:#ef4444;background:rgba(239,68,68,.15);color:#fca5a5}
.quiz-opt.selected{border-color:#00d4ff;background:rgba(0,212,255,.1)}
.streak-fire{font-size:32px;animation:flame 1s ease infinite alternate}
@keyframes flame{from{transform:scale(1) rotate(-3deg)}to{transform:scale(1.1) rotate(3deg)}}
.matrix-bg{background-image:radial-gradient(circle at 15% 50%,rgba(0,255,136,.04) 0%,transparent 55%),radial-gradient(circle at 85% 20%,rgba(0,212,255,.03) 0%,transparent 55%)}
`;

// ──────────────────────────────────────────────
//  PROGRAM DATA — 24 MONTHS / 6 PHASES
// ──────────────────────────────────────────────
const PHASES = [
  {
    id:"p0", phase:0, icon:"🏗️", color:"#3b82f6", bg:"rgba(59,130,246,.13)",
    nameAr:"مرحلة الأساسيات", nameEn:"Foundation Phase",
    monthLabel:"الشهر 1–3", startWeek:1, endWeek:12, phaseXP:300,
    desc:"الشبكات + لينكس + البرمجة + أمن أساسي",
    weeks:[
      {wk:1,title:"OSI & TCP/IP Deep Dive",quizId:"wk4",
       missions:["اشاهد CCNA من IT DOSE على YouTube","ادرس الطبقات السبع لـ OSI مع أمثلة","جرب Wireshark وسجّل HTTPS Packet"],
       topics:["OSI Model (7 Layers)","TCP/IP Stack","DNS & DHCP","ARP & ICMP","Subnetting Basics"]},
      {wk:2,title:"Network Protocols",quizId:"wk4",
       missions:["ادرس HTTP/HTTPS بعمق (Methods & Headers)","جرب curl وNetcat على Terminal","حلل PCAP بـ Wireshark"],
       topics:["HTTP/HTTPS Deep Dive","FTP & SSH","Telnet & SMTP","Port Numbers Reference","TCP 3-Way Handshake"]},
      {wk:3,title:"Network Tools & Scanning",quizId:"wk4",
       missions:["تعلم Nmap الأوامر الأساسية","جرب netstat وss وip","اقرأ عن VPNs و Firewalls"],
       topics:["Nmap Basics (Host Discovery)","Netstat / SS Commands","Wireshark Filters","VPNs & Proxies","Firewall Concepts"]},
      {wk:4,title:"🧪 Network Lab Week",quizId:"wk4",
       missions:["افتح TryHackMe Pre-Security Path واكمل Network Room","حلل 3 ملفات PCAP مختلفة","اجتاز اختبار الأسبوع 4 ✅"],
       topics:["Practical Packet Analysis","TryHackMe Network Room","PCAP Challenge","WEEK 4 ASSESSMENT"]},
      {wk:5,title:"Linux Fundamentals",quizId:"wk8",
       missions:["تعلم 20 أمراً أساسياً (ls,cd,grep,awk,sed)","جرب OverTheWire Bandit Level 0→3","اقرأ عن File System Hierarchy"],
       topics:["Core Commands (20+)","File System Hierarchy","Permissions (chmod/chown)","Users & Groups","Package Management"]},
      {wk:6,title:"Linux Intermediate",quizId:"wk8",
       missions:["اكتب سكريبت Bash يؤتمت مهمة","جرب OverTheWire Bandit Level 4→10","تعلم SSH Key Authentication"],
       topics:["Bash Scripting","Cron Jobs & Scheduling","SSH Deep Dive","Process Management (ps/kill)","Networking Tools in Linux"]},
      {wk:7,title:"Linux Security",quizId:"wk8",
       missions:["تعلم UFW وiptables أساسيات","ادرس Log Files في /var/log","جرب TryHackMe: Linux PrivEsc Room"],
       topics:["Firewall (UFW/iptables)","Log Analysis (/var/log)","SUID/SGID Privilege Escalation","Linux Hardening","Sudo Misconfigurations"]},
      {wk:8,title:"🧪 Linux Lab Week",quizId:"wk8",
       missions:["أكمل OverTheWire Bandit Level 11→20","حل TryHackMe Linux Fundamentals","اجتاز اختبار الأسبوع 8 ✅"],
       topics:["Bandit Wargame (Level 11–20)","TryHackMe Linux Rooms","PrivEsc Practice","WEEK 8 ASSESSMENT"]},
      {wk:9,title:"Python for Security",quizId:"wk12",
       missions:["شاهد Elzero Python Course (أول 20 فيديو)","اكتب سكريبت يقرأ ويعالج ملفاً","جرب مكتبة Requests مع طلب HTTP"],
       topics:["Python Basics (Variables, Functions, OOP)","Requests Library","Socket Programming","File I/O","Exception Handling"]},
      {wk:10,title:"Python Scripting Tools",quizId:"wk12",
       missions:["اكتب Port Scanner بسيط بـ Python","تعلم Regular Expressions للـ Security","جرب JSON Parsing من API"],
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
    id:"p1", phase:1, icon:"🌐", color:"#10b981", bg:"rgba(16,185,129,.13)",
    nameAr:"مرحلة إتقان الويب", nameEn:"Web Mastery Phase",
    monthLabel:"الشهر 4–7", startWeek:13, endWeek:28, phaseXP:600,
    desc:"Web Pentesting + OWASP Top 10 + Bug Bounty Methodology",
    weeks:[
      {wk:13,title:"Web Fundamentals & HTTP",quizId:"wk16",
       missions:["ادرس HTTP Request/Response كل Header","إعداد Burp Suite + Proxy","اقرأ OWASP Top 10 Overview"],
       topics:["HTTP Methods & Status Codes","Request/Response Headers","Cookies & Sessions","Burp Suite Setup","Web App Architecture"]},
      {wk:14,title:"Burp Suite Mastery",quizId:"wk16",
       missions:["جرب Intruder وRepeater وDecoder","حل PortSwigger: Apprentice Level 1–3","اقرأ عن HTTPS وTLS"],
       topics:["Burp Proxy & Intercept","Burp Repeater","Burp Intruder","Decoder & Comparer","Active Scanning"]},
      {wk:15,title:"SQL Injection",quizId:"wk16",
       missions:["ادرس SQLi من PortSwigger Academy","حل 5 Labs SQLi (Error + Blind + UNION)","تعلم sqlmap أساسيات"],
       topics:["Error-Based SQLi","Blind SQLi","Time-Based SQLi","UNION-Based SQLi","sqlmap Tool"]},
      {wk:16,title:"🧪 XSS & CSRF Lab",quizId:"wk16",
       missions:["حل 5 Labs XSS على PortSwigger","ادرس CSRF وآليات الحماية","اجتاز اختبار الأسبوع 16 ✅"],
       topics:["Reflected XSS","Stored XSS","DOM XSS","CSRF Attacks","WEEK 16 ASSESSMENT"]},
      {wk:17,title:"IDOR & Broken Access Control",quizId:"wk20",
       missions:["ادرس IDOR من HowToHunt","حل PortSwigger: Access Control Labs","جرب Authentication Labs"],
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
       missions:["اختر برنامج Bug Bounty حقيقي","ابدأ Recon على هدف في Scope","اكتب أول Report (حتى لو Informational)"],
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
    id:"p2", phase:2, icon:"📱", color:"#f59e0b", bg:"rgba(245,158,11,.13)",
    nameAr:"مرحلة الموبايل والـ API", nameEn:"Mobile & API Phase",
    monthLabel:"الشهر 8–10", startWeek:29, endWeek:40, phaseXP:450,
    desc:"Android Pentesting + API Security + Mobile Bug Bounty",
    weeks:[
      {wk:29,title:"Android Architecture",quizId:"wk33",missions:["ادرس Android Components الأربعة","تعلم ADB 15 أمراً أساسياً","جرب apktool على APK تجريبي"],topics:["Android System Architecture","ADB Deep Dive","APK Structure (DEX/Manifest)","Components (Activity/Service/BroadcastReceiver/ContentProvider)","Intents & Intent Filters"]},
      {wk:30,title:"Static Analysis",quizId:"wk33",missions:["فك APK بـ JADX-GUI وحلل الكود","ابحث عن Hardcoded Secrets وAPI Keys","جرب MobSF Automated Analysis"],topics:["JADX-GUI Decompilation","Manifest Security Analysis","Hardcoded Secrets","Insecure Storage (SharedPrefs/SQLite)","MobSF Setup & Usage"]},
      {wk:31,title:"Dynamic Analysis & Frida",quizId:"wk33",missions:["اكتب Frida Script يـ Hook دالة","Bypass SSL Pinning بـ Objection","أعد ضبط Burp مع المحاكي"],topics:["Frida Basics & Scripts","SSL Pinning Bypass","Objection Framework","Burp Suite with Android Emulator","Runtime Traffic Analysis"]},
      {wk:32,title:"Mobile OWASP Top 10",quizId:"wk33",missions:["ادرس OWASP MASTG كاملاً","جرب DIVA Android App","اقرأ 3 Mobile Bug Reports من HackerOne"],topics:["OWASP Mobile Top 10","DIVA Android Challenges","InsecureBankv2","Mobile Report Writing","Mobile Bug Bounty Programs"]},
      {wk:33,title:"🧪 Mobile Lab Week",quizId:"wk33",missions:["حل InjuredAndroid 10 Flags","اكتب Frida Script يـ Bypass Root Detection","اجتاز اختبار الأسبوع 33 ✅"],topics:["InjuredAndroid CTF","Advanced Frida Scripts","Root Detection Bypass","WEEK 33 ASSESSMENT"]},
      {wk:34,title:"API Fundamentals",quizId:"wk36",missions:["ادرس REST API بعمق","تعلم Postman وInsomnia","جرب vAPI Lab Challenges"],topics:["REST Architecture","HTTP Methods (GET/POST/PUT/DELETE)","JWT & OAuth 2.0","Postman/Insomnia","API Documentation Reading"]},
      {wk:35,title:"OWASP API Security Top 10",quizId:"wk36",missions:["ادرس BOLA وBFLA","حل vAPI Challenges","جرب crAPI Lab"],topics:["API1: BOLA/BFLA","API2: Broken Authentication","API3: Mass Assignment","API4: Rate Limiting","GraphQL Security Issues"]},
      {wk:36,title:"🧪 API Lab Week",quizId:"wk36",missions:["أكمل crAPI كل Challenges","جرب DVGA GraphQL","اجتاز اختبار الأسبوع 36 ✅"],topics:["crAPI Full Challenge","Damn Vulnerable GraphQL (DVGA)","API Fuzzing with ffuf","WEEK 36 ASSESSMENT"]},
      {wk:37,title:"Advanced Mobile Topics",quizId:"wk40",missions:["ادرس Deeplink Hijacking","تعلم Intent Redirection","جرب Exported Components Abuse"],topics:["Deeplink Hijacking","Intent Redirection","Exported Components Abuse","WebView Security","Broadcast Receiver Vulnerabilities"]},
      {wk:38,title:"API Advanced Hunting",quizId:"wk40",missions:["ادرس API Key Leakage في Source Code","تعلم IDOR via API","جرب API Fuzzing بـ ffuf"],topics:["API Key Leakage (GitHub Dorks)","IDOR via API","Rate Limit Bypass","Auth Token Analysis","API Automation (Nuclei)"]},
      {wk:39,title:"Mobile + API Integration",quizId:"wk40",missions:["ابحث عن API Hidden في تطبيق Android","حلل كل Traffic بالكامل","اكتب Combined Report"],topics:["Mobile + API Combined Testing","MITM on Mobile App","API IDOR via Mobile","Combined Vulnerability Report"]},
      {wk:40,title:"🎓 Mobile & API Exam",quizId:"wk40",missions:["راجع Mobile + API Topics","اجتاز Mobile & API Final Exam","احصل على 📱 Mobile Expert Badge!"],topics:["Comprehensive Review","Mobile & API Final Exam","📱 Mobile Expert Badge","Certificate of Mobile Security"]},
    ]
  },
  {
    id:"p3", phase:3, icon:"🏰", color:"#ef4444", bg:"rgba(239,68,68,.13)",
    nameAr:"مرحلة البنية التحتية", nameEn:"Infrastructure Phase",
    monthLabel:"الشهر 11–15", startWeek:41, endWeek:60, phaseXP:700,
    desc:"Network Pentest + Active Directory + OSINT + Cloud + DFIR + Wireless",
    weeks:[
      {wk:41,title:"Network Scanning & Enum",quizId:"wk44",missions:["تعلم Nmap كامل (SYN/UDP/Scripts)","جرب Masscan","ادرس SMB Enumeration بـ enum4linux"],topics:["Nmap Full Options","Masscan","Service/OS Detection","SMB/NFS/SNMP Enumeration","NSE Scripts"]},
      {wk:42,title:"Network Exploitation",quizId:"wk44",missions:["تعلم Metasploit Framework كامل","جرب Responder للـ Poisoning","ادرس Pass-the-Hash"],topics:["Metasploit Framework","Responder LLMNR Poisoning","Pass-the-Hash","SMB Exploitation","Password Cracking (Hashcat)"]},
      {wk:43,title:"Post-Exploitation",quizId:"wk44",missions:["تعلم Pivoting بـ chisel","ادرس Linux PrivEsc (SUID/Cron/Sudo)","جرب Windows PrivEsc"],topics:["Pivoting & Tunneling","Linux Privilege Escalation","Windows Privilege Escalation","Persistence Methods","Covering Tracks (Logs)"]},
      {wk:44,title:"🧪 Network Lab Week",quizId:"wk44",missions:["حل VulnHub Machine من الصفر","جرب HackTheBox Starting Point","اجتاز اختبار الأسبوع 44 ✅"],topics:["VulnHub Full PWN","HackTheBox Starting Point","Full Pentest Report","WEEK 44 ASSESSMENT"]},
      {wk:45,title:"Active Directory Basics",quizId:"wk48",missions:["ادرس AD Architecture وKerberos","إعداد BloodHound + SharpHound","تعلم PowerView Basics"],topics:["AD Architecture & Components","Kerberos Protocol (TGT/TGS)","LDAP & LDAP Queries","BloodHound Setup & Usage","PowerView Enumeration"]},
      {wk:46,title:"AD Enumeration",quizId:"wk48",missions:["تعلم AD Enumeration الكاملة","جرب BloodHound Attack Paths","ادرس Group Policy وACLs"],topics:["BloodHound Attack Paths","User/Group Enumeration","Group Policy Analysis","Trust Relationships","ACL/ACE Abuse"]},
      {wk:47,title:"AD Attacks",quizId:"wk48",missions:["تعلم Kerberoasting عملياً","ادرس DCSync Attack","جرب Pass-the-Ticket"],topics:["Kerberoasting","AS-REP Roasting","Pass-the-Ticket","Golden/Silver Ticket","DCSync Attack"]},
      {wk:48,title:"🧪 Active Directory Lab",quizId:"wk48",missions:["جرب VulnAD Lab كامل","حل TryHackMe AD Rooms","اجتاز اختبار الأسبوع 48 ✅"],topics:["VulnAD Full Lab","TryHackMe AD Rooms","Lateral Movement","WEEK 48 ASSESSMENT"]},
      {wk:49,title:"OSINT & Recon",quizId:"wk52",missions:["تعلم OSINT Framework","جرب Sherlock وtheHarvester","ادرس GitHub Dorking للـ Secrets"],topics:["OSINT Framework","Sherlock & theHarvester","Google & GitHub Dorking","Shodan/Censys/Fofa","Certificate Transparency (crt.sh)"]},
      {wk:50,title:"Advanced Asset Discovery",quizId:"wk52",missions:["تعلم Amass وSubfinder","جرب TruffleHog وGitLeaks","ادرس SpiderFoot Automation"],topics:["Amass/Subfinder Advanced","TruffleHog Secret Scanning","GitLeaks Pre-commit","SpiderFoot Automation","OSINT Report Writing"]},
      {wk:51,title:"Cloud Security Basics",quizId:"wk52",missions:["ادرس AWS IAM وS3","جرب flaws.cloud Level 1→3","تعلم AWS CLI"],topics:["AWS Core Services (IAM/EC2/S3)","flaws.cloud Challenges","IAM Privilege Escalation Concepts","S3 Misconfiguration","AWS CLI Basics"]},
      {wk:52,title:"🧪 Cloud Lab Week",quizId:"wk52",missions:["جرب CloudGoat Scenario","تعلم Pacu Framework","اجتاز اختبار الأسبوع 52 ✅"],topics:["CloudGoat Scenarios","Pacu AWS Framework","flaws2.cloud Challenges","WEEK 52 ASSESSMENT"]},
      {wk:53,title:"DFIR Fundamentals",quizId:"wk56",missions:["تعلم Autopsy للـ Disk Forensics","ادرس Memory Forensics Basics","جرب CyberDefenders Blue Team Labs"],topics:["Autopsy Forensics Platform","Disk Imaging (dd/FTK Imager)","File Carving & Recovery","Browser Forensics","Windows Event Logs"]},
      {wk:54,title:"Memory & Network Forensics",quizId:"wk56",missions:["تعلم Volatility 3 Framework","ادرس PCAP Analysis","جرب Blue Team Labs Online"],topics:["Volatility 3 Framework","PCAP Deep Analysis","Windows Registry Forensics","Log Analysis with SIEM","Chain of Custody"]},
      {wk:55,title:"Incident Response",quizId:"wk56",missions:["ادرس MITRE ATT&CK Framework","تعلم Threat Hunting","جرب LetsDefend Platform"],topics:["MITRE ATT&CK Framework","Threat Hunting Methodology","YARA Rules Writing","Elastic/Splunk SIEM","Incident Response Lifecycle"]},
      {wk:56,title:"🧪 DFIR Lab Week",quizId:"wk56",missions:["حل CyberDefenders Challenge","جرب Velociraptor","اجتاز اختبار الأسبوع 56 ✅"],topics:["CyberDefenders Challenge","Velociraptor EDR","LetsDefend SOC Training","WEEK 56 ASSESSMENT"]},
      {wk:57,title:"Wireless Security",quizId:"wk60",missions:["تعلم Aircrack-ng Suite","ادرس WPA2 Handshake Capture","جرب TryHackMe WiFi Hacking 101"],topics:["Aircrack-ng Suite","WPA2 PMKID Attack","Evil Twin Attack","Deauth Attacks","Monitor Mode Setup"]},
      {wk:58,title:"Wireless Advanced",quizId:"wk60",missions:["تعلم Bettercap","جرب Wifite2","ادرس Bluetooth BLE Security"],topics:["Bettercap Framework","Wifite2 Automation","Bluetooth BLE Security","Kismet Wireless Recon","Wireless Pentest Report"]},
      {wk:59,title:"Infrastructure Integration",quizId:"wk60",missions:["ابنِ Attack Chain كاملة (Network→AD→Cloud)","راجع كل Infrastructure Topics","جرب HackTheBox Pro Lab Preview"],topics:["Full Attack Chain","Network → AD → Cloud Path","Combined Assessment","Pro Lab Preparation"]},
      {wk:60,title:"🎓 Infrastructure Exam",quizId:"wk60",missions:["راجع كل Topics","اجتاز Infrastructure Final Exam","احصل على 🏰 Infrastructure Pro Badge!"],topics:["Comprehensive Review","Infrastructure Final Exam","🏰 Infrastructure Pro Badge","Certificate of Infrastructure"]},
    ]
  },
  {
    id:"p4", phase:4, icon:"💎", color:"#8b5cf6", bg:"rgba(139,92,246,.13)",
    nameAr:"مرحلة الخبراء", nameEn:"Expert Phase",
    monthLabel:"الشهر 16–21", startWeek:61, endWeek:80, phaseXP:1000,
    desc:"Malware Analysis + Binary Exploitation + Web3 + Cryptography + CTF",
    weeks:[
      {wk:61,title:"Malware Static Analysis",quizId:"wk64",missions:["تعلم PE File Format وPEStudio","جرب FLOSS وstrings","ادرس Sandbox Analysis على ANY.RUN"],topics:["PE File Format","PEStudio Analysis","FLOSS / strings Tool","Detect-It-Easy (DIE)","ANY.RUN Interactive Sandbox"]},
      {wk:62,title:"Malware Dynamic Analysis",quizId:"wk64",missions:["تعلم x64dbg Basics","جرب Process Monitor وProcess Hacker","ادرس Registry وNetwork Indicators"],topics:["x64dbg Debugger","Process Monitor","Network IOCs with Wireshark","Registry Analysis","Behavior Analysis Report"]},
      {wk:63,title:"Reverse Engineering + Ghidra",quizId:"wk64",missions:["تعلم Ghidra الأساسي","ادرس Assembly في السياق","اكتب YARA Rule بسيطة"],topics:["Ghidra Setup & Navigation","Assembly Analysis","Packing/Obfuscation Detection","YARA Rule Writing","Malware Sample Analysis"]},
      {wk:64,title:"🧪 Malware Lab Week",quizId:"wk64",missions:["حلل عينة حقيقية من MalwareBazaar","اكتب تقرير تحليل احترافي","اجتاز اختبار الأسبوع 64 ✅"],topics:["Real Malware Analysis","Malware Report Writing","IOC Extraction","WEEK 64 ASSESSMENT"]},
      {wk:65,title:"Web3 & Solidity Basics",quizId:"wk68",missions:["تعلم Solidity من CryptoZombies","جرب Ethernaut Level 1–5","ادرس Reentrancy Attack"],topics:["Solidity Basics","EVM Architecture","Remix IDE","Reentrancy Attack","Ethernaut CTF (1–5)"]},
      {wk:66,title:"Smart Contract Auditing",quizId:"wk68",missions:["جرب Ethernaut Level 6–15","تعلم Slither Static Analyzer","ادرس Damn Vulnerable DeFi"],topics:["Flash Loan Attacks","Price Oracle Manipulation","Slither Static Analysis","Damn Vulnerable DeFi","Code4rena & Immunefi"]},
      {wk:67,title:"Cryptography Attacks",quizId:"wk68",missions:["جرب CryptoHack Introduction","ادرس RSA Attacks","تعلم Padding Oracle"],topics:["Symmetric/Asymmetric Crypto","RSA Common Modulus Attack","Padding Oracle Attack","Hash Length Extension","CryptoHack Challenges"]},
      {wk:68,title:"🧪 Web3 & Crypto Lab",quizId:"wk68",missions:["حل Cryptopals Set 1","جرب Damn Vulnerable DeFi","اجتاز اختبار الأسبوع 68 ✅"],topics:["Cryptopals Set 1","Damn Vulnerable DeFi","RsaCtfTool Usage","WEEK 68 ASSESSMENT"]},
      {wk:69,title:"Binary Exploitation Basics",quizId:"wk72",missions:["ابدأ pwn.college","تعلم Stack Buffer Overflow","جرب pwntools"],topics:["Stack Memory Layout","Buffer Overflow Classic","GDB & pwndbg","pwntools Framework","ret2win Challenge"]},
      {wk:70,title:"ROP & Advanced Pwn",quizId:"wk72",missions:["تعلم ret2libc Attack","ادرس ROP Chains","جرب ROPgadget"],topics:["ret2libc Attack","Return Oriented Programming","ROPgadget Tool","ASLR/PIE Bypass","Format String Vulnerabilities"]},
      {wk:71,title:"Heap Exploitation",quizId:"wk72",missions:["ادرس Heap Memory Layout","تعلم Use After Free","جرب Heap Challenges على pwn.college"],topics:["Heap Memory Layout","Use After Free (UAF)","Double Free Bug","Heap Overflow","tcache Poisoning"]},
      {wk:72,title:"🧪 Binary Lab Week",quizId:"wk72",missions:["حل 3 Pwn Challenges من PicoCTF","جرب pwn.college Module","اجتاز اختبار الأسبوع 72 ✅"],topics:["PicoCTF Pwn Challenges","pwn.college Progression","exploit.education VMs","WEEK 72 ASSESSMENT"]},
      {wk:73,title:"CTF Methodology",quizId:"wk76",missions:["تعلم CTF Strategy لكل Category","جرب PicoCTF Web + Crypto","ادرس CTF101"],topics:["CTF Types (Web/Pwn/Crypto/Forensics/RE)","CTF Toolset Setup","Web CTF Strategy","Forensics CTF Tools","CTF Time Management"]},
      {wk:74,title:"Live CTF Participation",quizId:"wk76",missions:["شارك في CTFtime Event حقيقي","حل 5 Challenges مختلفة","اكتب Writeup لأفضل حل"],topics:["CTFtime Event Participation","Multi-Category Challenges","Writeup Writing","Team Collaboration","CTF Community Building"]},
      {wk:75,title:"Expert Integration",quizId:"wk76",missions:["ابنِ Full Exploit Chain","راجع كل Expert Topics","جرب HackTheBox Pro Lab"],topics:["Full Exploit Chain","Combined Attack Techniques","Advanced CTF Techniques","Pro Lab Preview"]},
      {wk:76,title:"🎓 Expert Exam",quizId:"wk76",missions:["راجع كل Expert Topics","اجتاز Expert Final Exam","احصل على 💎 Elite Hacker Badge!"],topics:["Expert Comprehensive Review","Expert Final Exam","💎 Elite Hacker Badge","Certificate of Expert"]},
      {wk:77,title:"Red Team Operations",quizId:"wk80",missions:["ادرس Red Team Methodology","تعلم C2 Framework Concepts","ادرس EDR Evasion Basics"],topics:["Red Team Methodology","C2 Frameworks (Sliver/Havoc)","EDR Evasion Basics","OPSEC Principles","Red Team Report Writing"]},
      {wk:78,title:"Certifications Prep",quizId:"wk80",missions:["ابدأ تحضير OSCP أو eWPT","راجع Exam Objectives","جرب Practice Labs"],topics:["OSCP Preparation Path","eWPT/eWPTX","CEH Concepts","PNPT (TCM Security)","Certification Strategy"]},
      {wk:79,title:"Portfolio & Personal Brand",quizId:"wk80",missions:["أنشئ GitHub Security Portfolio","اكتب CVE أو Bug Report","ابنِ حضور على Twitter الأمني"],topics:["GitHub Security Portfolio","Security Blog Writing","CVE/Report Disclosure","LinkedIn Profile Optimization","Personal Branding"]},
      {wk:80,title:"🎓 Expert Final Exam",quizId:"wk80",missions:["اجتاز Expert Final Exam","احصل على Elite Certificate","احتفل — أنت الآن Expert! 🎉"],topics:["Final Comprehensive Exam","Elite Certificate Unlock","Career Path Review","🚀 Journey Complete"]},
    ]
  },
];

// ──────────────────────────────────────────────
//  LEVELS SYSTEM
// ──────────────────────────────────────────────
const LEVELS = [
  {lv:0,ar:"مبتدئ",en:"Initiate",min:0,max:499,color:"#64748b",icon:"🔰"},
  {lv:1,ar:"محلل مبتدئ",en:"Junior Analyst",min:500,max:1499,color:"#3b82f6",icon:"🔵"},
  {lv:2,ar:"ممارس أمني",en:"Security Practitioner",min:1500,max:3499,color:"#10b981",icon:"🟢"},
  {lv:3,ar:"مختبر اختراق",en:"Penetration Tester",min:3500,max:6999,color:"#f59e0b",icon:"🟡"},
  {lv:4,ar:"باحث متقدم",en:"Senior Researcher",min:7000,max:11999,color:"#f97316",icon:"🟠"},
  {lv:5,ar:"خبير أمني",en:"Expert Hacker",min:12000,max:19999,color:"#ef4444",icon:"🔴"},
  {lv:6,ar:"فريق أحمر نخبوي",en:"Elite Red Teamer",min:20000,max:Infinity,color:"#8b5cf6",icon:"🟣"},
];

const getLevel = (xp) => {
  for (let i=LEVELS.length-1;i>=0;i--) if(xp>=LEVELS[i].min) return LEVELS[i];
  return LEVELS[0];
};

// ──────────────────────────────────────────────
//  BADGES
// ──────────────────────────────────────────────
const BADGES = [
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

// ──────────────────────────────────────────────
//  QUIZ QUESTIONS (5 sets × 5 questions)
// ──────────────────────────────────────────────
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
    {q:"ما معنى SUID؟",os:["تشغيل بصلاحيات المالك","تشغيل بصلاحيات المجموعة","حذف تلقائي","تشفير الملف"],a:0,exp:"SUID = تشغيل الملف بصلاحيات المالك (مثل root) بغض النظر عن من يشغّله"},
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
    {q:"ما هو IDOR؟",os:["Insecure Direct Object Reference","Internal DNS Override","Identity Document Override","Input Data Object Redirect"],a:0,exp:"IDOR = وصول لموارد مستخدمين آخرين بتغيير الـ ID مباشرة بدون تحقق"},
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
  wk44:{title:"Network Pentest — الأسبوع 44",qs:[
    {q:"ما أمر Nmap لاكتشاف الأجهزة الحية؟",os:["nmap -sV","nmap -sn","nmap -A","nmap -O"],a:1,exp:"nmap -sn (Ping Scan) = يكتشف الأجهزة الحية بدون Port Scanning"},
    {q:"ما هو Responder؟",os:["أداة LLMNR/NBT-NS Poisoning","Antivirus Tool","VPN Client","Password Cracker"],a:0,exp:"Responder = يستغل LLMNR/NBT-NS للحصول على NTLM Hashes من الشبكة"},
    {q:"ما هو Pass-the-Hash؟",os:["تمرير NTLM Hash مباشرة للتوثيق بدون كلمة المرور","اختراق قاعدة بيانات Hashes","هجوم Rainbow Tables","Brute Force الـ Hash"],a:0,exp:"Pass-the-Hash = استخدام NTLM Hash مباشرة للتوثيق بدون كسره"},
    {q:"ما هو GTFOBins؟",os:["موقع Linux PrivEsc Binaries","أداة Network Scanning","مجموعة Exploits","Framework لـ Metasploit"],a:0,exp:"GTFOBins = قاعدة بيانات Linux Binaries يمكن استغلالها لرفع الصلاحيات"},
    {q:"أفضل Framework للـ Post-Exploitation؟",os:["Nmap","Wireshark","Metasploit","Shodan"],a:2,exp:"Metasploit = أشهر وأقوى Framework للـ Exploitation وPost-Exploitation"},
  ]},
  wk48:{title:"Active Directory — الأسبوع 48",qs:[
    {q:"ما هو Kerberoasting؟",os:["طلب Service Tickets وكسر كلمات مرور Service Accounts","هجوم على Kerberos Server مباشرة","ثغرة في LDAP","Attack على DNS"],a:0,exp:"Kerberoasting = طلب TGS لـ Service Accounts وكسر الـ Hash offline"},
    {q:"ما هو AS-REP Roasting؟",os:["مهاجمة حسابات بدون Pre-Authentication","هجوم Kerberos Server","DCSync هجوم","LDAP Injection"],a:0,exp:"AS-REP Roasting = مهاجمة حسابات AD التي لا تتطلب Pre-Authentication مُفعَّل"},
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
    {q:"الفرق بين Active وPassive Recon؟",os:["Passive = بلا تفاعل مع الهدف، Active = تفاعل مباشر","نفس الشيء","Active = أبطأ دائماً","Passive = أخطر دائماً"],a:0,exp:"Passive = OSINT بلا تفاعل | Active = تفاعل مباشر مع الهدف (أكثر خطورة)"},
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
    {q:"ما هو Flash Loan Attack؟",os:["اقتراض مبالغ ضخمة بدون ضمان وإعادتها في نفس Transaction","نوع خداع المستثمرين","هجوم على Ethereum Network","Bug في Solidity Compiler"],a:0,exp:"Flash Loan = اقتراض غير مضمون يجب السداد في نفس الـ Transaction، يُستغل لتلاعب الأسعار"},
    {q:"ما هو Symmetric Encryption؟",os:["مفتاح واحد للتشفير والفك (AES)","مفتاحان (RSA)","Hash Function","Digital Signature"],a:0,exp:"Symmetric = نفس المفتاح للتشفير وفك التشفير | مثال: AES-256"},
    {q:"أشهر هجوم على RSA بعدد صغير لـ e؟",os:["Wiener's Attack","SQL Injection","XSS Attack","Buffer Overflow"],a:0,exp:"Wiener's Attack = عندما يكون Private Exponent (d) صغيراً يمكن كسر RSA رياضياً"},
    {q:"ما هو Padding Oracle Attack؟",os:["استغلال رسائل خطأ الـ Padding لفك التشفير","هجوم على Hash","SQL في AES","XSS في JWT"],a:0,exp:"Padding Oracle = استغلال رسائل خطأ CBC Padding لفك تشفير البيانات بدون المفتاح"},
  ]},
  wk72:{title:"Binary Exploitation — الأسبوع 72",qs:[
    {q:"ما هو Stack Buffer Overflow؟",os:["كتابة بيانات تتجاوز حجم Buffer لتغيير Flow الـ Program","هجوم على Heap فقط","خطأ في Java","Memory Leak"],a:0,exp:"Stack BOF = كتابة بيانات أكثر من حجم Buffer يُمكّن تغيير Return Address"},
    {q:"ما هو ROP Chain؟",os:["تجميع Gadgets موجودة في Memory لتنفيذ كود بدون كتابة Shellcode","نوع SQL Injection","هجوم على Network","JavaScript Attack"],a:0,exp:"ROP = Return Oriented Programming، يستخدم Gadgets موجودة في الـ Binary لتجاوز NX"},
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
    {q:"ما هو الفرق بين Pentest وRed Team؟",os:["نفس الشيء","Pentest = نطاق محدد تقني، Red Team = سيناريو هجوم شامل يُحاكي APT","Red Team أسرع دائماً","Pentest يشمل Social Engineering دائماً"],a:1,exp:"Pentest = اختبار نطاق محدد | Red Team = سيناريو هجوم APT كامل متعدد الأوجه"},
    {q:"ما هو أهم مبدأ في OPSEC؟",os:["الهجوم السريع","إخفاء هويتك ومصدرك وأدواتك","الكشف عن كل شيء","استخدام أدوات معروفة فقط"],a:1,exp:"OPSEC = Operational Security، التأكد أن المدافعين لا يعلمون بوجودك"},
    {q:"ما هو Bug Bounty P1 Critical؟",os:["أدنى خطورة","RCE وSQL Injection بيانات حساسة ونقل Arbitrary Files","فقط XSS","CSRF فقط"],a:1,exp:"P1 = Remote Code Execution, SQLi بيانات المستخدمين, Authentication Bypass, Account Takeover"},
    {q:"ما أهم شيء في Pentest Report؟",os:["الأدوات المستخدمة","وصف الثغرة + خطواتها + التأثير + التوصية","عدد ساعات العمل","إثبات الـ Hacking Skills"],a:1,exp:"Report = وصف الثغرة + Proof of Concept + Impact + Recommendation بوضوح"},
    {q:"ما هو الـ Threat Model؟",os:["تحديد المهاجمين المحتملين وأصول النظام الحساسة وناقلات الهجوم","نوع برنامج","قاعدة بيانات Threats","نوع Firewall"],a:0,exp:"Threat Modeling = عملية تحديد منهجية للمخاطر والمهاجمين والأصول الحساسة وطرق الهجوم"},
  ]},
};

// ──────────────────────────────────────────────
//  DEFAULT STATE
// ──────────────────────────────────────────────
const D = {
  xp:0, currentWeek:1, streak:0, bestStreak:0,
  lastCheckIn:null, doneMissions:{}, doneTopics:{},
  donePhases:[], quizHistory:{}, badges:[],
  totalDone:0, perfectQuiz:0, islamicDays:0,
  notifications:[], startDate:new Date().toISOString().split("T")[0],
};

const today = () => new Date().toISOString().split("T")[0];

// ──────────────────────────────────────────────
//  UTILS
// ──────────────────────────────────────────────
const findWeek = (wk) => {
  for (const ph of PHASES) {
    const found = ph.weeks.find(w=>w.wk===wk);
    if (found) return { ...found, phase:ph };
  }
  return null;
};

const findPhase = (wk) => PHASES.find(p=>wk>=p.startWeek&&wk<=p.endWeek)||PHASES[0];

const xpForWeek = (wkData) => {
  if (!wkData) return 0;
  return wkData.topics.length * 10;
};

// ──────────────────────────────────────────────
//  MAIN COMPONENT
// ──────────────────────────────────────────────
export default function CyberPathAcademy() {
  const [s, setS] = useState(D);
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sideOpen, setSideOpen] = useState(true);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [quiz, setQuiz] = useState({ active:false, wkId:null, answers:{}, submitted:false, score:0 });

  // ── Load state
  useEffect(()=>{
    (async()=>{
      try {
        const r = await window.storage.get("cyberpath_v2");
        if (r?.value) setS({...D,...JSON.parse(r.value)});
      } catch(e){}
      setLoading(false);
    })();
  },[]);

  // ── Save state
  const save = useCallback(async(ns)=>{
    try { await window.storage.set("cyberpath_v2", JSON.stringify(ns)); } catch(e){}
  },[]);

  const update = useCallback((patch)=>{
    setS(prev=>{
      const ns = {...prev,...(typeof patch==="function"?patch(prev):patch)};
      save(ns);
      return ns;
    });
  },[save]);

  const showToast = (msg, duration=2500)=>{
    setToast(msg);
    setTimeout(()=>setToast(null), duration);
  };

  // ── Level
  const level = getLevel(s.xp);
  const nextLevel = LEVELS.find(l=>l.lv===level.lv+1)||level;
  const xpInLevel = s.xp - level.min;
  const xpNeeded = nextLevel.min - level.min;
  const levelPct = Math.min(100, Math.round(xpInLevel/xpNeeded*100));

  // ── Current phase/week
  const curPhase = findPhase(s.currentWeek);
  const curWeekData = findWeek(s.currentWeek);

  // ── Total progress
  const totalTopics = PHASES.reduce((acc,ph)=>acc+ph.weeks.reduce((a,w)=>a+w.topics.length,0),0);
  const donePct = totalTopics>0 ? Math.round(s.totalDone/totalTopics*100):0;

  // ── Check badges
  useEffect(()=>{
    const earned = [];
    BADGES.forEach(b=>{
      if (!s.badges.includes(b.id) && b.check(s)) {
        earned.push(b);
      }
    });
    if (earned.length>0) {
      const newBadges = [...s.badges, ...earned.map(b=>b.id)];
      const bonusXP = earned.reduce((a,b)=>a+b.xp,0);
      update(p=>({...p, badges:newBadges, xp:p.xp+bonusXP}));
      showToast(`🏅 ${earned.map(b=>b.ar).join(" + ")} +${bonusXP} XP`, 3500);
    }
  },[s.totalDone, s.bestStreak, s.donePhases, s.perfectQuiz, s.islamicDays]);

  // ── Check-in (streak)
  const doCheckIn = ()=>{
    const td = today();
    if (s.lastCheckIn === td) { showToast("✅ سجّلت حضورك اليوم بالفعل!"); return; }
    const yd = new Date(Date.now()-86400000).toISOString().split("T")[0];
    const isConsec = s.lastCheckIn === yd;
    const newStreak = isConsec ? s.streak+1 : 1;
    const best = Math.max(newStreak, s.bestStreak);
    const xpBonus = 5 + (newStreak%7===0?25:0) + (newStreak%30===0?75:0);
    update(p=>({...p, lastCheckIn:td, streak:newStreak, bestStreak:best, xp:p.xp+xpBonus}));
    showToast(`🔥 يوم ${newStreak}! +${xpBonus} XP`, 3000);
  };

  // ── Complete topic
  const doTopic = (phId, wkN, ti)=>{
    const key = `${phId}-${wkN}-${ti}`;
    if (s.doneTopics[key]) return;
    const xpGain = 10;
    const newDone = {...s.doneTopics, [key]:true};
    const total = s.totalDone+1;
    update(p=>({...p, doneTopics:newDone, xp:p.xp+xpGain, totalDone:total}));
    showToast(`+${xpGain} XP — موضوع مكتمل ✓`);
  };

  // ── Complete mission
  const doMission = (wkN, mi)=>{
    const key = `m-${wkN}-${mi}`;
    if (s.doneMissions[key]) return;
    const xpGain = 15;
    update(p=>({...p, doneMissions:{...p.doneMissions,[key]:true}, xp:p.xp+xpGain}));
    showToast(`+${xpGain} XP — مهمة أُنجزت ⚡`);
  };

  // ── Advance week
  const advanceWeek = ()=>{
    const next = s.currentWeek+1;
    const ph = findPhase(s.currentWeek);
    const endedPhase = s.currentWeek===ph.endWeek && !s.donePhases.includes(ph.id);
    const newPhases = endedPhase ? [...s.donePhases,ph.id] : s.donePhases;
    const bonus = endedPhase ? ph.phaseXP : 0;
    update(p=>({...p, currentWeek:next, donePhases:newPhases, xp:p.xp+bonus}));
    if (endedPhase) showToast(`🎉 أكملت ${ph.nameAr}! +${bonus} XP`, 4000);
    else showToast(`📅 تقدمت للأسبوع ${next}`);
  };

  // ── Islamic check-in
  const doIslamic = ()=>{
    const key = `isl-${today()}`;
    if (s.doneMissions[key]) { showToast("📿 سجّلت الروتين الإسلامي اليوم"); return; }
    update(p=>({...p, doneMissions:{...p.doneMissions,[key]:true}, islamicDays:p.islamicDays+1, xp:p.xp+10}));
    showToast("📿 بارك الله فيك! +10 XP");
  };

  // ── Quiz
  const startQuiz = (qId)=>{
    if (!QUIZZES[qId]) return;
    setQuiz({active:true, wkId:qId, answers:{}, submitted:false, score:0});
    setPage("quiz");
  };

  const submitQuiz = ()=>{
    const qd = QUIZZES[quiz.wkId];
    let correct=0;
    qd.qs.forEach((q,i)=>{ if(quiz.answers[i]===q.a) correct++; });
    const score = Math.round(correct/qd.qs.length*100);
    const xpGain = Math.round(score/100*50);
    const perfect = score===100;
    const alreadyDone = s.quizHistory[quiz.wkId];
    if (!alreadyDone) {
      update(p=>({...p, quizHistory:{...p.quizHistory,[quiz.wkId]:{score,date:today()}},
        xp:p.xp+xpGain, perfectQuiz:p.perfectQuiz+(perfect?1:0)}));
    }
    setQuiz(q=>({...q, submitted:true, score}));
    if (!alreadyDone) showToast(`${perfect?"🏆 100%!":"📝"} ${score}% +${xpGain} XP`, 3000);
  };

  const C = (n,cls="")=><span style={{color:n}}>{cls}</span>;

  // ──────────────────────────────────────────────
  //  SECTIONS
  // ──────────────────────────────────────────────

  const SideBar = ()=>(
    <div style={{width:sideOpen?250:64,minHeight:"100vh",background:"linear-gradient(180deg,#060c1a,#040810)",
      borderRight:"1px solid rgba(0,255,136,.1)",display:"flex",flexDirection:"column",padding:"18px 10px",gap:5,
      position:"fixed",top:0,left:0,zIndex:100,overflowY:"auto",overflowX:"hidden",transition:"width .3s"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,padding:"0 4px",cursor:"pointer"}}
        onClick={()=>setSideOpen(p=>!p)}>
        <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:16,color:"#040810",fontWeight:900}}>⚡</span>
        </div>
        {sideOpen&&<div>
          <div style={{color:"#00ff88",fontWeight:700,fontSize:13}} className="glow">CyberPath</div>
          <div style={{color:"#475569",fontSize:10}}>Academy — 0xlegacy</div>
        </div>}
      </div>

      {[{id:"dashboard",icon:"📊",label:"Dashboard"},
        {id:"program",icon:"🗓️",label:"البرنامج الكامل"},
        {id:"missions",icon:"⚔️",label:"Daily Missions"},
        {id:"quiz",icon:"📝",label:"الاختبارات"},
        {id:"achievements",icon:"🏆",label:"الإنجازات"},
        {id:"stats",icon:"📈",label:"الإحصائيات"},
      ].map(item=>(
        <div key={item.id} className={`nav ${page===item.id?"on":""}`}
          onClick={()=>setPage(item.id)} title={item.label}>
          <span style={{fontSize:15,flexShrink:0}}>{item.icon}</span>
          {sideOpen&&<span style={{fontFamily:"'Cairo',sans-serif",fontSize:13}}>{item.label}</span>}
        </div>
      ))}

      {sideOpen&&<>
        <div style={{height:1,background:"rgba(255,255,255,.06)",margin:"8px 0"}}/>
        <div style={{padding:"6px 10px"}}>
          <div style={{color:"#475569",fontSize:10,marginBottom:6,fontFamily:"'Fira Code',monospace"}}>CURRENT STATUS</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:18}}>{level.icon}</span>
            <div style={{flex:1}}>
              <div style={{color:level.color,fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{level.ar}</div>
              <div className="bar"><div className="bar-fill" style={{width:`${levelPct}%`,background:level.color}}/></div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <span style={{color:"#00ff88",fontSize:11}}>⚡ {s.xp} XP</span>
            <span style={{color:"#f59e0b",fontSize:11}}>🔥 {s.streak}</span>
            <span style={{color:"#64748b",fontSize:11}}>Wk {s.currentWeek}</span>
          </div>
        </div>
      </>}
    </div>
  );

  // ── DASHBOARD
  const Dashboard = ()=>(
    <div className="slide">
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,rgba(0,255,136,.07),rgba(0,212,255,.03))",
        border:"1px solid rgba(0,255,136,.15)",borderRadius:14,padding:"22px 26px",marginBottom:20}}>
        <div style={{color:"#475569",fontSize:11,marginBottom:3}}>// CyberPath Academy — مرحباً 0xlegacy</div>
        <h1 style={{color:"#e2e8f0",fontSize:24,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>
          {curPhase.icon} {curPhase.nameAr}
        </h1>
        <div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:16}}>
          الأسبوع {s.currentWeek} من 80 · {curPhase.monthLabel} · {curWeekData?.title||""}
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-g" style={{fontSize:13}} onClick={doCheckIn}>
            {s.lastCheckIn===today()?"✅ حضرت اليوم":"☀️ تسجيل حضور اليوم"}
          </button>
          <button className="btn btn-o" style={{fontSize:13}} onClick={()=>setPage("missions")}>⚔️ Missions اليوم</button>
          {curWeekData?.quizId && !s.quizHistory[curWeekData.quizId] &&
            <button className="btn btn-o" style={{fontSize:13,borderColor:"#f59e0b",color:"#f59e0b"}}
              onClick={()=>startQuiz(curWeekData.quizId)}>📝 اختبار الأسبوع</button>}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
        {[
          {label:"مستوى XP",val:`${s.xp} XP`,sub:level.ar,icon:level.icon,c:level.color},
          {label:"Streak اليومي",val:`${s.streak} يوم`,sub:`أفضل: ${s.bestStreak}`,icon:"🔥",c:"#f97316"},
          {label:"التقدم الكلي",val:`${donePct}%`,sub:`${s.totalDone}/${totalTopics} موضوع`,icon:"📊",c:"#00ff88"},
          {label:"الإنجازات",val:`${s.badges.length}`,sub:`من ${BADGES.length} Badge`,icon:"🏆",c:"#f59e0b"},
          {label:"اختبارات مجتازة",val:`${Object.keys(s.quizHistory).length}`,sub:"اختبار مكتمل",icon:"📝",c:"#8b5cf6"},
          {label:"الأسبوع الحالي",val:`${s.currentWeek}/80`,sub:curPhase.nameAr,icon:"📅",c:"#00d4ff"},
        ].map((st,i)=>(
          <div key={i} className="card" style={{padding:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <span style={{fontSize:20}}>{st.icon}</span>
              <span style={{color:st.c,fontSize:20,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{st.val}</span>
            </div>
            <div style={{color:"#e2e8f0",fontSize:12,fontFamily:"'Cairo',sans-serif",marginTop:8}}>{st.label}</div>
            <div style={{color:"#475569",fontSize:11,marginTop:2}}>{st.sub}</div>
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div style={{background:"rgba(0,0,0,.3)",border:`1px solid ${level.color}25`,borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:26}}>{level.icon}</span>
            <div>
              <div style={{color:level.color,fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{level.ar}</div>
              <div style={{color:"#64748b",fontSize:11}}>{level.en}</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Fira Code',monospace"}}>{s.xp}/{nextLevel.min} XP</div>
            <div style={{color:"#64748b",fontSize:11}}>التالي: {nextLevel.ar}</div>
          </div>
        </div>
        <div className="bar" style={{height:10}}>
          <div className="bar-fill" style={{width:`${levelPct}%`,background:`linear-gradient(90deg,${level.color},${nextLevel.color||level.color})`}}/>
        </div>
        <div style={{color:"#475569",fontSize:11,marginTop:6,textAlign:"center"}}>
          {nextLevel.min-s.xp} XP للمستوى التالي — {nextLevel.ar}
        </div>
      </div>

      {/* Phase Progress */}
      <div style={{marginBottom:20}}>
        <div style={{color:"#e2e8f0",fontSize:14,fontFamily:"'Cairo',sans-serif",marginBottom:12,fontWeight:700}}>
          📅 مسار البرنامج — 6 مراحل
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
          {PHASES.map(ph=>{
            const phTopics = ph.weeks.reduce((a,w)=>a+w.topics.length,0);
            const phDone = ph.weeks.reduce((acc,w)=>acc+w.topics.filter((_,ti)=>s.doneTopics[`${ph.id}-${w.wk}-${ti}`]).length,0);
            const pct = phTopics>0?Math.round(phDone/phTopics*100):0;
            const isActive = s.currentWeek>=ph.startWeek && s.currentWeek<=ph.endWeek;
            const isDone = s.donePhases.includes(ph.id);
            return (
              <div key={ph.id} style={{background:isActive?ph.bg:"rgba(255,255,255,.02)",
                border:`1px solid ${isActive?ph.color+"50":"rgba(255,255,255,.07)"}`,
                borderRadius:10,padding:14,cursor:"pointer",transition:"all .2s"}}
                onClick={()=>{setPage("program");setExpandedPhase(ph.id);}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{ph.icon}</span>
                    <div>
                      <div style={{color:isActive?ph.color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",fontWeight:700}}>{ph.nameAr}</div>
                      <div style={{color:"#475569",fontSize:10}}>{ph.monthLabel}</div>
                    </div>
                  </div>
                  <span style={{fontSize:13,background:isDone?"rgba(16,185,129,.2)":isActive?`${ph.color}25`:"rgba(255,255,255,.05)",
                    color:isDone?"#10b981":isActive?ph.color:"#475569",padding:"2px 8px",borderRadius:12,fontFamily:"'Fira Code',monospace"}}>
                    {isDone?"✓ مكتمل":isActive?"● جارٍ":pct>0?`${pct}%`:"🔒"}
                  </span>
                </div>
                <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:ph.color}}/></div>
                <div style={{color:"#64748b",fontSize:10,marginTop:4}}>{phDone}/{phTopics} موضوع · {ph.weeks.length} أسبوع</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Week Detail */}
      {curWeekData&&<div style={{background:"rgba(0,0,0,.25)",border:`1px solid ${curPhase.color}30`,borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{color:curPhase.color,fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:10}}>
          {curPhase.icon} الأسبوع {s.currentWeek} — {curWeekData.title}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <div style={{color:"#64748b",fontSize:10,marginBottom:6}}>⚔️ Missions</div>
            {curWeekData.missions.slice(0,2).map((m,i)=>{
              const dk = `m-${s.currentWeek}-${i}`;
              return(
                <div key={i} className="topic-row" onClick={()=>doMission(s.currentWeek,i)}>
                  <div className={`chk ${s.doneMissions[dk]?"on":""}`}>
                    {s.doneMissions[dk]&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}
                  </div>
                  <span style={{color:s.doneMissions[dk]?"#475569":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{m}</span>
                </div>
              );
            })}
          </div>
          <div>
            <div style={{color:"#64748b",fontSize:10,marginBottom:6}}>📚 Topics</div>
            {curWeekData.topics.slice(0,3).map((t,i)=>{
              const tk = `${curPhase.id}-${s.currentWeek}-${i}`;
              return(
                <div key={i} className="topic-row" onClick={()=>doTopic(curPhase.id,s.currentWeek,i)}>
                  <div className={`chk ${s.doneTopics[tk]?"on":""}`}>
                    {s.doneTopics[tk]&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}
                  </div>
                  <span style={{color:s.doneTopics[tk]?"#475569":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",textDecoration:s.doneTopics[tk]?"line-through":"none"}}>{t}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button className="btn btn-o" style={{fontSize:12}} onClick={()=>setPage("missions")}>كل المهام →</button>
          {s.currentWeek<80&&<button className="btn btn-o" style={{fontSize:12,borderColor:"#f59e0b",color:"#f59e0b"}} onClick={advanceWeek}>التالي: الأسبوع {s.currentWeek+1} →</button>}
        </div>
      </div>}

      {/* Islamic Daily */}
      <div style={{background:"linear-gradient(135deg,rgba(52,211,153,.07),rgba(250,204,21,.03))",
        border:"1px solid rgba(52,211,153,.2)",borderRadius:12,padding:16}}>
        <div style={{color:"#34d399",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>
          🌙 الروتين الإسلامي اليومي
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8,marginBottom:12}}>
          {["🕌 صلاة الفجر","📿 أذكار الصباح","📖 ورد القرآن","🕌 صلاة الضحى","🕌 صلاة الظهر","🕌 صلاة العصر","📿 أذكار المساء","🕌 صلاة المغرب","📖 قرآن مسائي","🕌 صلاة العشاء"].map((it,i)=>(
            <div key={i} style={{background:"rgba(52,211,153,.06)",borderRadius:6,padding:"5px 10px",
              color:"#6ee7b7",fontSize:11,fontFamily:"'Cairo',sans-serif",textAlign:"center"}}>{it}</div>
          ))}
        </div>
        <button className="btn btn-o" style={{fontSize:12,borderColor:"#34d399",color:"#34d399",width:"100%"}}
          onClick={doIslamic}>
          {s.doneMissions[`isl-${today()}`]?"✓ أكملت روتينك الإسلامي اليوم 🤲":"🤲 سجّل إتمام الروتين الإسلامي (+10 XP)"}
        </button>
        <div style={{color:"#475569",fontSize:10,marginTop:6,textAlign:"center"}}>«إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ»</div>
      </div>
    </div>
  );

  // ── PROGRAM (Timeline)
  const Program = ()=>(
    <div className="slide">
      <div style={{marginBottom:20}}>
        <h1 style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🗓️ البرنامج الكامل — 24 شهراً</h1>
        <p style={{color:"#64748b",fontSize:12}}>80 أسبوع · 6 مراحل · من الصفر للاحتراف</p>
      </div>
      {PHASES.map(ph=>{
        const isOpen = expandedPhase===ph.id;
        const isActive = s.currentWeek>=ph.startWeek && s.currentWeek<=ph.endWeek;
        const isDone = s.donePhases.includes(ph.id);
        const phTopics = ph.weeks.reduce((a,w)=>a+w.topics.length,0);
        const phDone = ph.weeks.reduce((acc,w)=>acc+w.topics.filter((_,ti)=>s.doneTopics[`${ph.id}-${w.wk}-${ti}`]).length,0);
        const pct = phTopics>0?Math.round(phDone/phTopics*100):0;
        return(
          <div key={ph.id} style={{border:`1px solid ${isActive?ph.color+"60":"rgba(255,255,255,.07)"}`,
            borderRadius:12,overflow:"hidden",marginBottom:12,background:isActive?ph.bg:"rgba(0,0,0,.2)"}}>
            <div className="phase-hd" onClick={()=>setExpandedPhase(isOpen?null:ph.id)}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:`${ph.color}20`,
                  border:`1px solid ${ph.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                  {ph.icon}
                </div>
                <div>
                  <div style={{color:isActive?ph.color:"#e2e8f0",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>{ph.nameAr}</div>
                  <div style={{color:"#64748b",fontSize:11}}>{ph.monthLabel} · {ph.weeks.length} أسبوع · {ph.weeks.reduce((a,w)=>a+w.topics.length,0)} موضوع</div>
                  <div className="bar" style={{width:120,marginTop:4}}>
                    <div className="bar-fill" style={{width:`${pct}%`,background:ph.color}}/>
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontFamily:"'Fira Code',monospace",
                  background:isDone?"rgba(16,185,129,.2)":isActive?`${ph.color}20`:"rgba(255,255,255,.05)",
                  color:isDone?"#10b981":isActive?ph.color:"#64748b"}}>
                  {isDone?"✓ مكتمل":isActive?`أسبوع ${s.currentWeek}`:pct>0?`${pct}%`:"لم يبدأ"}
                </span>
                <span style={{color:"#475569",fontSize:16,transform:isOpen?"rotate(180deg)":"",transition:"transform .2s"}}>▼</span>
              </div>
            </div>
            {isOpen&&<div style={{padding:"0 16px 16px"}}>
              {ph.desc&&<div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",padding:"10px 0 12px",borderBottom:"1px solid rgba(255,255,255,.05)",marginBottom:12}}>{ph.desc}</div>}
              {ph.weeks.map(wk=>{
                const isCurrentWk = wk.wk===s.currentWeek;
                const wkDone = wk.topics.filter((_,ti)=>s.doneTopics[`${ph.id}-${wk.wk}-${ti}`]).length;
                const hasQuiz = !!s.quizHistory[wk.quizId];
                return(
                  <div key={wk.wk} style={{border:`1px solid ${isCurrentWk?ph.color+"50":"rgba(255,255,255,.05)"}`,
                    borderRadius:8,marginBottom:8,overflow:"hidden",
                    background:isCurrentWk?`${ph.color}08`:"rgba(0,0,0,.15)"}}>
                    <div style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",
                      cursor:"pointer"}} onClick={()=>setExpandedPhase(isCurrentWk?null:`${ph.id}-${wk.wk}`)}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{color:isCurrentWk?ph.color:"#475569",fontSize:11,fontFamily:"'Fira Code',monospace",
                          width:50,flexShrink:0}}>Wk {wk.wk}</span>
                        <span style={{color:isCurrentWk?"#e2e8f0":"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif"}}>{wk.title}</span>
                        {isCurrentWk&&<span style={{background:`${ph.color}25`,color:ph.color,fontSize:10,padding:"2px 8px",borderRadius:10}} className="pulse">● الآن</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        {hasQuiz&&<span style={{color:"#10b981",fontSize:11}}>✓ {s.quizHistory[wk.quizId]?.score}%</span>}
                        <span style={{color:"#475569",fontSize:11}}>{wkDone}/{wk.topics.length}</span>
                      </div>
                    </div>
                    {(isCurrentWk||expandedPhase===`${ph.id}-${wk.wk}`)&&<div style={{padding:"0 14px 12px"}}>
                      <div style={{marginBottom:8}}>
                        <div style={{color:"#475569",fontSize:10,marginBottom:6}}>📚 المواضيع</div>
                        {wk.topics.map((t,ti)=>{
                          const tk=`${ph.id}-${wk.wk}-${ti}`;
                          return(
                            <div key={ti} className="topic-row" onClick={()=>doTopic(ph.id,wk.wk,ti)}>
                              <div className={`chk ${s.doneTopics[tk]?"on":""}`}>
                                {s.doneTopics[tk]&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}
                              </div>
                              <span style={{color:s.doneTopics[tk]?"#475569":"#cbd5e1",fontSize:12,fontFamily:"'Cairo',sans-serif",
                                textDecoration:s.doneTopics[tk]?"line-through":"none"}}>{t}</span>
                              {s.doneTopics[tk]&&<span style={{color:"#00ff88",fontSize:10,marginLeft:"auto"}}>+10 XP</span>}
                            </div>
                          );
                        })}
                      </div>
                      {wk.quizId&&<button className="btn btn-o" style={{fontSize:11,width:"100%",
                        borderColor:hasQuiz?"#10b981":"#f59e0b",color:hasQuiz?"#10b981":"#f59e0b"}}
                        onClick={()=>startQuiz(wk.quizId)}>
                        {hasQuiz?`✓ اختبار مكتمل (${s.quizHistory[wk.quizId]?.score}%)`:"📝 ابدأ الاختبار"}
                      </button>}
                    </div>}
                  </div>
                );
              })}
              {!isDone&&<button className="btn btn-o" style={{width:"100%",fontSize:13,marginTop:4}}
                onClick={()=>{ update({currentWeek:ph.startWeek}); showToast(`📅 انتقلت لبداية ${ph.nameAr}`); }}>
                انتقل لبداية هذه المرحلة →
              </button>}
            </div>}
          </div>
        );
      })}
    </div>
  );

  // ── MISSIONS
  const Missions = ()=>{
    const wkData = findWeek(s.currentWeek);
    const ph = findPhase(s.currentWeek);
    if (!wkData) return null;
    const allMDone = wkData.missions.every((_,i)=>s.doneMissions[`m-${s.currentWeek}-${i}`]);
    const allTDone = wkData.topics.every((_,ti)=>s.doneTopics[`${ph.id}-${s.currentWeek}-${ti}`]);
    return(
      <div className="slide">
        <div style={{marginBottom:20}}>
          <h1 style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>⚔️ Daily Missions</h1>
          <div style={{color:"#64748b",fontSize:12}}>الأسبوع {s.currentWeek} — {wkData.title}</div>
        </div>

        {/* Check-in Block */}
        <div style={{background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.2)",borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"#00ff88",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif"}}>🔥 Streak يومي</div>
              <div style={{color:"#64748b",fontSize:12}}>سجّل حضورك كل يوم للحفاظ على الـ Streak</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{color:"#f97316",fontSize:32,fontWeight:700}} className="streak-fire">{s.streak}</div>
              <div style={{color:"#64748b",fontSize:10}}>يوم</div>
            </div>
          </div>
          <button className="btn btn-g" style={{width:"100%",marginTop:12,fontSize:13}} onClick={doCheckIn}>
            {s.lastCheckIn===today()?"✅ حضرت اليوم — عدّ غداً!":"☀️ سجّل حضورك (+5 XP)"}
          </button>
        </div>

        {/* Missions */}
        <div style={{background:"rgba(0,0,0,.25)",border:`1px solid ${ph.color}25`,borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{color:ph.color,fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>
            {ph.icon} مهام الأسبوع {s.currentWeek}
            {allMDone&&<span style={{color:"#10b981",fontSize:11,marginRight:8}}>✓ كل المهام مكتملة!</span>}
          </div>
          {wkData.missions.map((m,i)=>{
            const dk=`m-${s.currentWeek}-${i}`;
            const done=!!s.doneMissions[dk];
            return(
              <div key={i} style={{background:done?"rgba(16,185,129,.08)":"rgba(255,255,255,.03)",
                border:`1px solid ${done?"rgba(16,185,129,.25)":"rgba(255,255,255,.07)"}`,
                borderRadius:8,padding:"12px 14px",marginBottom:8,cursor:done?"default":"pointer",
                display:"flex",alignItems:"center",gap:12,transition:"all .2s"}}
                onClick={()=>!done&&doMission(s.currentWeek,i)}>
                <div className={`chk ${done?"on":""}`} style={{width:22,height:22}}>
                  {done&&<span style={{color:"#040810",fontSize:11,fontWeight:900}}>✓</span>}
                </div>
                <span style={{color:done?"#475569":"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",
                  flex:1,textDecoration:done?"line-through":"none"}}>{m}</span>
                <span style={{color:done?"#10b981":"#00ff88",fontSize:11,flexShrink:0}}>
                  {done?"✓":"+15 XP"}
                </span>
              </div>
            );
          })}
          {!allMDone&&<button className="btn btn-g" style={{width:"100%",fontSize:13,marginTop:8}} onClick={()=>{
            wkData.missions.forEach((_,i)=>doMission(s.currentWeek,i));
          }}>⚡ إكمال كل المهام دفعة واحدة</button>}
        </div>

        {/* Topics */}
        <div style={{background:"rgba(0,0,0,.25)",border:`1px solid ${ph.color}25`,borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{color:ph.color,fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>
            📚 مواضيع الأسبوع
            {allTDone&&<span style={{color:"#10b981",fontSize:11,marginRight:8}}>✓ كل المواضيع!</span>}
          </div>
          {wkData.topics.map((t,ti)=>{
            const tk=`${ph.id}-${s.currentWeek}-${ti}`;
            const done=!!s.doneTopics[tk];
            return(
              <div key={ti} className="topic-row" style={{padding:"10px 12px",marginBottom:4,
                background:done?"rgba(0,255,136,.05)":"rgba(255,255,255,.02)",
                border:"1px solid",borderColor:done?"rgba(0,255,136,.2)":"rgba(255,255,255,.05)",borderRadius:8}}
                onClick={()=>doTopic(ph.id,s.currentWeek,ti)}>
                <div className={`chk ${done?"on":""}`}>
                  {done&&<span style={{color:"#040810",fontSize:9,fontWeight:900}}>✓</span>}
                </div>
                <span style={{color:done?"#475569":"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",
                  flex:1,textDecoration:done?"line-through":"none"}}>{t}</span>
                <span style={{color:done?"#10b981":"#64748b",fontSize:11}}>{done?"✓":"+10 XP"}</span>
              </div>
            );
          })}
        </div>

        {/* Islamic */}
        <div style={{background:"rgba(52,211,153,.06)",border:"1px solid rgba(52,211,153,.2)",borderRadius:12,padding:14}}>
          <div style={{color:"#34d399",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>🌙 الالتزام الإسلامي</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:10}}>
            {["فجر","أذكار الصباح","ورد القرآن","ضحى","ظهر","عصر","أذكار المساء","مغرب","عشاء","وتر"].map((s2,i)=>(
              <span key={i} style={{background:"rgba(52,211,153,.1)",color:"#6ee7b7",fontSize:11,
                padding:"3px 8px",borderRadius:8,fontFamily:"'Cairo',sans-serif"}}>{s2}</span>
            ))}
          </div>
          <button className="btn btn-o" style={{width:"100%",fontSize:12,borderColor:"#34d399",color:"#34d399"}}
            onClick={doIslamic}>
            {s.doneMissions[`isl-${today()}`]?"✓ أكملت الروتين — بارك الله فيك 🤲":"🤲 أكملت روتيني الإسلامي (+10 XP)"}
          </button>
          <div style={{color:"#475569",fontSize:10,marginTop:6,textAlign:"center"}}>
            إجمالي أيام الالتزام: {s.islamicDays} يوم
          </div>
        </div>

        {/* Advance */}
        {s.currentWeek<80&&(allMDone||allTDone)&&
          <button className="btn btn-g" style={{width:"100%",marginTop:16,fontSize:13}} onClick={advanceWeek}>
            ⏩ الانتقال للأسبوع {s.currentWeek+1}
          </button>}
      </div>
    );
  };

  // ── QUIZ
  const QuizPage = ()=>{
    if (!quiz.active || !quiz.wkId) {
      const availableQuizzes = Object.keys(QUIZZES).map(k=>({id:k,...QUIZZES[k]}));
      return(
        <div className="slide">
          <div style={{marginBottom:20}}>
            <h1 style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>📝 الاختبارات الأسبوعية</h1>
            <p style={{color:"#64748b",fontSize:12}}>اختبارات تقييمية بعد كل محطة رئيسية</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
            {availableQuizzes.map(qz=>{
              const done = !!s.quizHistory[qz.id];
              const score = s.quizHistory[qz.id]?.score;
              return(
                <div key={qz.id} className="card" style={{padding:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",fontWeight:700}}>{qz.title}</div>
                    <span style={{background:done?(score===100?"rgba(16,185,129,.2)":"rgba(59,130,246,.2)"):"rgba(245,158,11,.15)",
                      color:done?(score===100?"#10b981":"#60a5fa"):"#f59e0b",padding:"2px 8px",borderRadius:10,fontSize:11}}>
                      {done?`${score}%`:"جديد"}
                    </span>
                  </div>
                  <div style={{color:"#64748b",fontSize:11,marginBottom:12}}>{qz.qs.length} سؤال · 50 XP</div>
                  <button className="btn btn-o" style={{width:"100%",fontSize:12,
                    borderColor:done?"#10b981":"#f59e0b",color:done?"#10b981":"#f59e0b"}}
                    onClick={()=>startQuiz(qz.id)}>
                    {done?"إعادة الاختبار 🔄":"ابدأ الاختبار →"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const qd = QUIZZES[quiz.wkId];
    if (!qd) return null;

    if (quiz.submitted) {
      const correct = qd.qs.filter((q,i)=>quiz.answers[i]===q.a).length;
      const pct = Math.round(correct/qd.qs.length*100);
      return(
        <div className="slide" style={{maxWidth:680}}>
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{fontSize:56,marginBottom:12}}>{pct===100?"🏆":pct>=80?"🎓":pct>=60?"📝":"💪"}</div>
            <h2 style={{color:"#e2e8f0",fontSize:24,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>
              {pct===100?"ممتاز! 100%!":pct>=80?"أحسنت!":pct>=60?"جيد جداً":"استمر في التعلم!"}
            </h2>
            <div style={{color:"#00ff88",fontSize:32,fontWeight:700,fontFamily:"'Fira Code',monospace",margin:"8px 0"}}>{pct}%</div>
            <div style={{color:"#64748b",fontSize:14,fontFamily:"'Cairo',sans-serif",marginBottom:20}}>
              {correct} من {qd.qs.length} إجابات صحيحة
            </div>
          </div>
          {qd.qs.map((q,i)=>{
            const selected=quiz.answers[i];
            const correct2=q.a;
            const isRight=selected===correct2;
            return(
              <div key={i} style={{background:isRight?"rgba(16,185,129,.08)":"rgba(239,68,68,.08)",
                border:`1px solid ${isRight?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"}`,
                borderRadius:10,padding:14,marginBottom:10}}>
                <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>
                  {isRight?"✅":"❌"} {q.q}
                </div>
                <div style={{color:isRight?"#6ee7b7":"#fca5a5",fontSize:12,marginBottom:6}}>
                  إجابتك: {selected!==undefined?q.os[selected]:"لم تُجب"}
                  {!isRight&&<span style={{color:"#10b981",display:"block"}}>الصحيح: {q.os[correct2]}</span>}
                </div>
                <div style={{color:"#64748b",fontSize:11,fontFamily:"'Cairo',sans-serif",
                  background:"rgba(255,255,255,.04)",padding:"6px 10px",borderRadius:6}}>{q.exp}</div>
              </div>
            );
          })}
          <div style={{display:"flex",gap:10,marginTop:16}}>
            <button className="btn btn-g" style={{flex:1,fontSize:13}} onClick={()=>{setQuiz({active:false,wkId:null,answers:{},submitted:false,score:0});setPage("quiz");}}>العودة للاختبارات</button>
            <button className="btn btn-o" style={{flex:1,fontSize:13}} onClick={()=>setQuiz(q=>({...q,answers:{},submitted:false}))}>إعادة المحاولة</button>
          </div>
        </div>
      );
    }

    return(
      <div className="slide" style={{maxWidth:680}}>
        <div style={{marginBottom:20}}>
          <div style={{color:"#64748b",fontSize:11,marginBottom:4}}>// اختبار أسبوعي</div>
          <h1 style={{color:"#e2e8f0",fontSize:18,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>{qd.title}</h1>
          <div style={{color:"#64748b",fontSize:12}}>{Object.keys(quiz.answers).length} من {qd.qs.length} أجابة</div>
          <div className="bar" style={{marginTop:8,height:4}}>
            <div className="bar-fill" style={{width:`${Object.keys(quiz.answers).length/qd.qs.length*100}%`,background:"#00d4ff"}}/>
          </div>
        </div>
        {qd.qs.map((q,i)=>(
          <div key={i} style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:16,marginBottom:14}}>
            <div style={{color:"#e2e8f0",fontSize:14,fontFamily:"'Cairo',sans-serif",marginBottom:12,lineHeight:1.6}}>
              <span style={{color:"#00d4ff",marginLeft:8,fontSize:12}}>س{i+1}</span> {q.q}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {q.os.map((opt,oi)=>(
                <div key={oi} className={`quiz-opt ${quiz.answers[i]===oi?"selected":""}`}
                  onClick={()=>setQuiz(qz=>({...qz,answers:{...qz.answers,[i]:oi}}))}>
                  <span style={{color:"#00d4ff",marginLeft:8,fontSize:11}}>{String.fromCharCode(65+oi)}.</span> {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-g" style={{width:"100%",fontSize:14,marginTop:8}} onClick={submitQuiz}
          disabled={Object.keys(quiz.answers).length<qd.qs.length}>
          {Object.keys(quiz.answers).length<qd.qs.length?
            `أجب عن ${qd.qs.length-Object.keys(quiz.answers).length} أسئلة متبقية`:"✓ تسليم الاختبار"}
        </button>
      </div>
    );
  };

  // ── ACHIEVEMENTS
  const Achievements = ()=>(
    <div className="slide">
      <div style={{marginBottom:20}}>
        <h1 style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>🏆 الإنجازات والشارات</h1>
        <p style={{color:"#64748b",fontSize:12}}>{s.badges.length} من {BADGES.length} مكتسبة</p>
      </div>

      {/* Level Journey */}
      <div style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>⬆️ مسار المستويات</div>
        <div style={{display:"flex",gap:0,flexWrap:"wrap"}}>
          {LEVELS.map((lv,i)=>{
            const reached = s.xp>=lv.min;
            const isCur = getLevel(s.xp).lv===lv.lv;
            return(
              <div key={i} style={{flex:"1 1 100px",textAlign:"center",padding:"10px 6px",position:"relative"}}>
                {i<LEVELS.length-1&&<div style={{position:"absolute",top:"50%",right:0,width:"50%",height:2,
                  background:reached&&!isCur?"#00ff88":"rgba(255,255,255,.08)",transform:"translateY(-50%)"}}/>}
                <div style={{width:36,height:36,borderRadius:"50%",margin:"0 auto 6px",
                  background:reached?`${lv.color}30`:"rgba(255,255,255,.05)",
                  border:`2px solid ${reached?lv.color:"rgba(255,255,255,.1)"}`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
                  boxShadow:isCur?`0 0 12px ${lv.color}`:"none",position:"relative",zIndex:1}}>
                  {lv.icon}
                </div>
                <div style={{color:reached?lv.color:"#334155",fontSize:10,fontFamily:"'Cairo',sans-serif",lineHeight:1.3}}>{lv.ar}</div>
                <div style={{color:"#334155",fontSize:9}}>{lv.min} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
        {BADGES.map(b=>{
          const earned = s.badges.includes(b.id);
          return(
            <div key={b.id} style={{background:earned?"rgba(0,255,136,.06)":"rgba(0,0,0,.25)",
              border:`1px solid ${earned?"rgba(0,255,136,.3)":"rgba(255,255,255,.07)"}`,
              borderRadius:12,padding:16,transition:"all .2s",filter:earned?"none":"grayscale(.7)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:10,
                  background:earned?"rgba(0,255,136,.15)":"rgba(255,255,255,.05)",
                  border:`1px solid ${earned?"rgba(0,255,136,.3)":"rgba(255,255,255,.08)"}`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                  {b.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{color:earned?"#e2e8f0":"#475569",fontSize:13,fontFamily:"'Cairo',sans-serif",fontWeight:700}}>{b.ar}</div>
                  <div style={{color:"#475569",fontSize:11,marginBottom:4}}>{b.desc}</div>
                  <div style={{color:earned?"#00ff88":"#334155",fontSize:11}}>+{b.xp} XP</div>
                </div>
                <div style={{color:earned?"#10b981":"#334155",fontSize:20}}>
                  {earned?"✓":"🔒"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── STATS
  const Stats = ()=>{
    const wksDone = PHASES.reduce((acc,ph)=>acc+ph.weeks.filter(w=>w.topics.every((_,ti)=>s.doneTopics[`${ph.id}-${w.wk}-${ti}`])).length,0);
    const quizAvg = Object.values(s.quizHistory).length>0
      ? Math.round(Object.values(s.quizHistory).reduce((a,q)=>a+q.score,0)/Object.values(s.quizHistory).length)
      : 0;

    return(
      <div className="slide">
        <h1 style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:20}}>📈 إحصائيات مفصّلة</h1>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,marginBottom:20}}>
          {[
            {label:"إجمالي XP",val:s.xp,icon:"⚡",c:"#00ff88"},
            {label:"أفضل Streak",val:`${s.bestStreak} يوم`,icon:"🔥",c:"#f97316"},
            {label:"أسابيع مكتملة",val:wksDone,icon:"📅",c:"#3b82f6"},
            {label:"مواضيع مكتملة",val:s.totalDone,icon:"📚",c:"#10b981"},
            {label:"اختبارات مجتازة",val:Object.keys(s.quizHistory).length,icon:"📝",c:"#8b5cf6"},
            {label:"متوسط الاختبارات",val:`${quizAvg}%`,icon:"🎯",c:"#f59e0b"},
            {label:"أيام إسلامية",val:s.islamicDays,icon:"📿",c:"#34d399"},
            {label:"شارات مكتسبة",val:s.badges.length,icon:"🏆",c:"#f59e0b"},
          ].map((st,i)=>(
            <div key={i} className="card" style={{padding:16}}>
              <span style={{fontSize:22}}>{st.icon}</span>
              <div style={{color:st.c,fontSize:22,fontWeight:700,fontFamily:"'Fira Code',monospace",margin:"6px 0"}}>{st.val}</div>
              <div style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Phase breakdown */}
        <div style={{background:"rgba(0,0,0,.25)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>تقدّم المراحل</div>
          {PHASES.map(ph=>{
            const tot=ph.weeks.reduce((a,w)=>a+w.topics.length,0);
            const done=ph.weeks.reduce((acc,w)=>acc+w.topics.filter((_,ti)=>s.doneTopics[`${ph.id}-${w.wk}-${ti}`]).length,0);
            const pct=tot>0?Math.round(done/tot*100):0;
            return(
              <div key={ph.id} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{ph.icon} {ph.nameAr}</span>
                  <span style={{color:ph.color,fontSize:11,fontFamily:"'Fira Code',monospace"}}>{done}/{tot} ({pct}%)</span>
                </div>
                <div className="bar" style={{height:8}}>
                  <div className="bar-fill" style={{width:`${pct}%`,background:ph.color}}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiz History */}
        {Object.keys(s.quizHistory).length>0&&(
          <div style={{background:"rgba(0,0,0,.25)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,marginBottom:16}}>
            <div style={{color:"#e2e8f0",fontSize:13,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>تاريخ الاختبارات</div>
            {Object.entries(s.quizHistory).map(([id,r])=>(
              <div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{QUIZZES[id]?.title||id}</span>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{color:r.score===100?"#10b981":r.score>=80?"#f59e0b":"#94a3b8",
                    fontSize:13,fontFamily:"'Fira Code',monospace",fontWeight:700}}>{r.score}%</span>
                  <span style={{color:"#334155",fontSize:10}}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reset */}
        <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.2)",borderRadius:10,padding:14}}>
          <div style={{color:"#f87171",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:8}}>⚠️ منطقة الخطر — إعادة تعيين البرنامج</div>
          <button className="btn btn-red" style={{fontSize:12}} onClick={()=>{
            if(window.confirm("هل أنت متأكد؟ سيتم حذف كل تقدمك!")){
              update(D);
              showToast("🔄 تم إعادة التعيين");
            }
          }}>إعادة تعيين كامل النظام</button>
        </div>
      </div>
    );
  };

  // ──────────────────────────────────────────────
  //  RENDER
  // ──────────────────────────────────────────────
  if (loading) return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#04080f",color:"#00ff88",fontFamily:"'Fira Code',monospace",gap:12}}>
      <span className="pulse" style={{fontSize:24}}>⚡</span>
      <span>Loading CyberPath Academy...</span>
    </div>
  );

  const margin = sideOpen?250:64;

  return(
    <div className="matrix-bg" style={{minHeight:"100vh",background:"#04080f",color:"#e2e8f0"}}>
      <style>{FONTS+CSS}</style>
      <SideBar/>
      <main style={{marginLeft:margin,padding:"26px 28px 48px",maxWidth:1060,transition:"margin-left .3s"}}>
        {page==="dashboard"&&<Dashboard/>}
        {page==="program"&&<Program/>}
        {page==="missions"&&<Missions/>}
        {page==="quiz"&&<QuizPage/>}
        {page==="achievements"&&<Achievements/>}
        {page==="stats"&&<Stats/>}
      </main>
      {toast&&<div className="xp-toast">{toast}</div>}
    </div>
  );
}
