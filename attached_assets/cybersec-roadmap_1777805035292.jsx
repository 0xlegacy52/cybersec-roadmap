import { useState, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Cairo:wght@300;400;600;700;900&display=swap');`;

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a1628; }
  ::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 3px; }
  body { background: #05080f; }
  .glow { text-shadow: 0 0 20px #00ff88, 0 0 40px #00ff8855; }
  .card { background: rgba(0,255,136,0.03); border: 1px solid rgba(0,255,136,0.12); border-radius: 12px; }
  .card:hover { border-color: rgba(0,255,136,0.3); background: rgba(0,255,136,0.06); transition: all 0.2s; }
  .btn-primary { background: linear-gradient(135deg,#00ff88,#00d4ff); color: #050810; font-weight:700; padding:10px 20px; border-radius:8px; border:none; cursor:pointer; font-family:'Fira Code',monospace; transition:all 0.2s; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,255,136,0.4); }
  .btn-ghost { background: transparent; border: 1px solid rgba(0,255,136,0.3); color:#00ff88; padding:8px 16px; border-radius:8px; cursor:pointer; font-family:'Fira Code',monospace; transition:all 0.2s; }
  .btn-ghost:hover { background: rgba(0,255,136,0.1); }
  .nav-item { display:flex; align-items:center; gap:10px; padding:10px 16px; border-radius:8px; cursor:pointer; transition:all 0.2s; color:#94a3b8; font-size:14px; border:1px solid transparent; }
  .nav-item:hover { background:rgba(0,255,136,0.08); color:#00ff88; border-color:rgba(0,255,136,0.15); }
  .nav-item.active { background:rgba(0,255,136,0.12); color:#00ff88; border-color:rgba(0,255,136,0.3); }
  .track-item { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:6px; cursor:pointer; transition:all 0.2s; color:#94a3b8; font-size:13px; }
  .track-item:hover { background:rgba(255,255,255,0.05); color:#e2e8f0; }
  .track-item.active { background:rgba(0,255,136,0.1); color:#00ff88; }
  .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:20px; font-size:11px; font-weight:600; font-family:'Fira Code',monospace; }
  .progress-bar { height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden; }
  .progress-fill { height:100%; border-radius:3px; transition:width 0.5s ease; }
  .phase-card { border: 1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; margin-bottom:12px; }
  .phase-header { padding:14px 18px; cursor:pointer; display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); }
  .phase-header:hover { background:rgba(0,255,136,0.05); }
  .topic-item { display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:6px; cursor:pointer; transition:all 0.15s; }
  .topic-item:hover { background:rgba(255,255,255,0.04); }
  .resource-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; margin-bottom:8px; transition:all 0.2s; }
  .resource-card:hover { border-color:rgba(0,255,136,0.25); background:rgba(0,255,136,0.04); }
  .todo-item { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px 16px; margin-bottom:8px; display:flex; align-items:center; gap:12px; transition:all 0.2s; }
  .todo-item:hover { border-color:rgba(0,255,136,0.2); }
  .todo-item.done { opacity:0.45; }
  .routine-row { display:flex; gap:12px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start; }
  .tag-ar { background:rgba(0,212,255,0.15); color:#00d4ff; border:1px solid rgba(0,212,255,0.3); }
  .tag-en { background:rgba(139,92,246,0.15); color:#a78bfa; border:1px solid rgba(139,92,246,0.3); }
  .tag-video { background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.3); }
  .tag-lab { background:rgba(34,197,94,0.15); color:#4ade80; border:1px solid rgba(34,197,94,0.3); }
  .tag-article { background:rgba(249,115,22,0.15); color:#fb923c; border:1px solid rgba(249,115,22,0.3); }
  .tag-writeup { background:rgba(236,72,153,0.15); color:#f472b6; border:1px solid rgba(236,72,153,0.3); }
  .tag-book { background:rgba(234,179,8,0.15); color:#facc15; border:1px solid rgba(234,179,8,0.3); }
  .stat-card { background:linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.03)); border:1px solid rgba(0,255,136,0.15); border-radius:12px; padding:18px; }
  input[type="text"], select { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#e2e8f0; padding:10px 14px; border-radius:8px; outline:none; font-family:'Fira Code',monospace; font-size:14px; }
  input[type="text"]:focus, select:focus { border-color:rgba(0,255,136,0.4); box-shadow:0 0 0 2px rgba(0,255,136,0.1); }
  select option { background:#0f172a; }
  .check-box { width:18px; height:18px; border:2px solid rgba(0,255,136,0.4); border-radius:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.15s; flex-shrink:0; }
  .check-box.checked { background:#00ff88; border-color:#00ff88; }
  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
  .slide-in { animation: slideIn 0.3s ease; }
  @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .matrix-bg { background-image: radial-gradient(circle at 20% 50%, rgba(0,255,136,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,212,255,0.03) 0%, transparent 50%); }
  .hexagon { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
  .sidebar-glow { box-shadow: inset -1px 0 0 rgba(0,255,136,0.1); }
`;

// ========== TRACKS DATA — VERIFIED URLS ONLY ==========
const TRACKS = {
  foundations: {
    id: "foundations", name: "الأساسيات", nameEn: "Foundations", icon: "🏗️",
    color: "#3b82f6", colorBg: "rgba(59,130,246,0.15)", duration: "2–3 أشهر",
    desc: "الشبكات، لينكس، البرمجة — نقطة البداية لكل هاكر محترف",
    phases: [
      {
        id: "net", name: "Phase 1 — الشبكات", emoji: "🌐",
        topics: ["نموذج OSI والطبقات السبع","بروتوكولات TCP/IP","DNS وكيف يعمل","HTTP/HTTPS بعمق","Subnetting وعناوين IP","Firewalls وRouters","Wireshark — تحليل الحزم","VPN و Proxy والفرق بينهم","NAT وPort Forwarding","Network Protocols (FTP, SSH, SMB, RDP)"],
        resources: [
          { title:"CCNA بالعربي — Abeer Hosny (Information Technology)", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLLlr6jKKdyK3JYsGq_jEcNx-EHF4lqXHP" },
          { title:"CCNA بالعربي — Emad | IT DOSE", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PL8s4OGp0649_e_Wbz5MlBgW5rBW-9hD0c" },
          { title:"CCNA بالعربي — Mahara Tech (مجاني)", type:"video", lang:"ar", url:"https://maharatech.gov.eg/course/view.php?id=22" },
          { title:"TryHackMe — Pre-Security Path", type:"lab", lang:"en", url:"https://tryhackme.com/path/outline/presecurity" },
          { title:"Cisco NetAcad — Introduction to Networks (مجاني)", type:"lab", lang:"en", url:"https://www.netacad.com/courses/networking/ccna-introduction-networks" },
          { title:"Professor Messer — CompTIA Network+ (مجاني)", type:"video", lang:"en", url:"https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/" },
        ]
      },
      {
        id: "linux", name: "Phase 2 — لينكس", emoji: "🐧",
        topics: ["الأوامر الأساسية (ls, cd, cat, grep, awk, sed)","إدارة الملفات والمجلدات","الصلاحيات (chmod, chown, SUID)","Bash Scripting Basics","إدارة العمليات (ps, kill, top)","الشبكات في لينكس (netstat, ss, ip)","SSH والاتصال عن بُعد","Package Management (apt/pacman/yum)","Crontab والمهام المجدولة","Kali Linux / Parrot OS / Arch Linux"],
        resources: [
          { title:"Linux بالعربي — Information Technology (Playlist كامل)", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLLlr6jKKdyK1FBi3pLVAmilLvMwWHw-84" },
          { title:"OS بالعربي — Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLxIvc-MGOs6ib0oK1z9C46DeKd9rRcSMY" },
          { title:"OverTheWire: Bandit — أفضل تطبيق عملي (مجاني)", type:"lab", lang:"en", url:"https://overthewire.org/wargames/bandit/" },
          { title:"TryHackMe — Linux Fundamentals Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/module/linux-fundamentals" },
          { title:"Linux Journey — تعليم تفاعلي مجاني", type:"article", lang:"en", url:"https://linuxjourney.com/" },
          { title:"Bash Scripting Tutorial — shellscript.sh", type:"article", lang:"en", url:"https://www.shellscript.sh/" },
        ]
      },
      {
        id: "prog", name: "Phase 3 — البرمجة للأمن السيبراني", emoji: "🐍",
        topics: ["Python — الأساسيات والمفاهيم","Python للأمن السيبراني (سكريبتات، أدوات)","JavaScript أساسيات (مهم لـ XSS)","SQL أساسيات (مهم لـ SQLi)","Bash Scripting متقدم","كتابة أدوات بسيطة من الصفر","Regular Expressions","HTTP Requests بالكود (requests library)","Go Basics (للأدوات المتقدمة)"],
        resources: [
          { title:"Python بالعربي — Elzero Web School (Playlist كامل)", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs" },
          { title:"Automate the Boring Stuff with Python (كتاب مجاني)", type:"book", lang:"en", url:"https://automatetheboringstuff.com/" },
          { title:"Python for Everybody — freeCodeCamp", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=8DvywoWv6fI" },
          { title:"TCM Security — Python 101 للهاكرز (YouTube مجاني)", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=egg-GoT5iVk" },
        ]
      },
      {
        id: "security_basics", name: "Phase 4 — أساسيات الأمن", emoji: "🔐",
        topics: ["مفاهيم CIA Triad","Encryption (Symmetric / Asymmetric)","Hashing وأنواعه","PKI وشهادات SSL/TLS","Authentication vs Authorization","Vulnerabilities vs Exploits","CVE / CVSS Scoring","Threat Modeling","OWASP المفاهيم الأساسية","Security Headers"],
        resources: [
          { title:"CompTIA Security+ — Professor Messer (مجاني)", type:"video", lang:"en", url:"https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/" },
          { title:"TryHackMe — Pre-Security & SOC Level 1", type:"lab", lang:"en", url:"https://tryhackme.com/paths" },
          { title:"OWASP Top 10 — الدليل الرسمي", type:"article", lang:"en", url:"https://owasp.org/www-project-top-ten/" },
          { title:"Get BountyOrDie — Basics Resources", type:"article", lang:"ar", url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest" },
        ]
      }
    ]
  },
  web: {
    id: "web", name: "Web Pentesting", nameEn: "Web App Pentesting & Bug Bounty", icon: "🌐",
    color: "#10b981", colorBg: "rgba(16,185,129,0.15)", duration: "4–6 أشهر",
    desc: "اختبار اختراق تطبيقات الويب، Bug Bounty، OWASP Top 10",
    phases: [
      {
        id: "web1", name: "Phase 1 — أساسيات الويب", emoji: "🔌",
        topics: ["HTTP/HTTPS بعمق (Methods, Headers, Cookies, Status Codes)","كيف تعمل تطبيقات الويب (Front/Back/DB)","HTML/CSS/JavaScript أساسيات","Burp Suite إعداد واستخدام","Browser DevTools (Network Tab)","Authentication vs Authorization","Session Management & Cookies","APIs و REST و GraphQL","Same-Origin Policy وCORS","Encoding (URL, Base64, HTML)"],
        resources: [
          { title:"Web Pentest بالعربي — Ebrahem Hegazy (Zigoo0) Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLv7cogHXoVhXvHPzIl1dWtBiYUAL8baHj" },
          { title:"Web Pentest بالعربي — Flex Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3" },
          { title:"Web Pentest بالعربي — Khaled ibn Al-Walid Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLBbacta63jciTygwsow0qBxzqBS8WhEHB" },
          { title:"Web Pentest بالعربي — Cyber-Guy Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLDRMxi70CdSBHODkNy87kqqGUSnl0ASxg" },
          { title:"Web Pentest بالعربي — ARABSECLAB Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PLTSGZiCtCBfMMLkmaN7tGEhbc0QbOEtEA" },
          { title:"PortSwigger Web Security Academy (مجاني 100%)", type:"lab", lang:"en", url:"https://portswigger.net/web-security" },
          { title:"Web Pentest Full Course — TheCyberMentor (YouTube مجاني)", type:"video", lang:"en", url:"https://youtu.be/24fHLWXGS-M" },
          { title:"Web Pentest — HexDump (YouTube)", type:"video", lang:"en", url:"https://youtu.be/ik2p4Rz4QzM" },
          { title:"Web Pentest — freeCodeCamp (YouTube)", type:"video", lang:"en", url:"https://youtu.be/2_lswM1S264" },
          { title:"Sec-88 GitBook — Nour Sallam (مرجع عربي شامل)", type:"article", lang:"ar", url:"https://sallam.gitbook.io/sec-88/web-appsec" },
        ]
      },
      {
        id: "web2", name: "Phase 2 — الثغرات الأساسية (OWASP Top 10)", emoji: "⚡",
        topics: ["SQL Injection (Error-based, Blind, Time-based, UNION)","XSS (Reflected, Stored, DOM-based)","CSRF — Cross-Site Request Forgery","IDOR — Insecure Direct Object Reference","File Upload Vulnerabilities","Directory Traversal / Path Traversal","LFI / RFI (Local/Remote File Inclusion)","Command Injection / OS Command Injection","Broken Authentication & Session Management","Security Misconfiguration","Open Redirect","Clickjacking"],
        resources: [
          { title:"PortSwigger — SQL Injection Labs (مجاني)", type:"lab", lang:"en", url:"https://portswigger.net/web-security/sql-injection" },
          { title:"PortSwigger — XSS Labs (مجاني)", type:"lab", lang:"en", url:"https://portswigger.net/web-security/cross-site-scripting" },
          { title:"PortSwigger — CSRF Labs (مجاني)", type:"lab", lang:"en", url:"https://portswigger.net/web-security/csrf" },
          { title:"PortSwigger — Path Traversal Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/file-path-traversal" },
          { title:"PortSwigger — OS Command Injection Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/os-command-injection" },
          { title:"Hacker Resource Guide — SQLi, XSS, IDOR, SSRF, RCE", type:"article", lang:"en", url:"https://hacking-resources-guide-2025.vercel.app/" },
          { title:"Rana Khalil — Web Security Academy Video Series (YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/channel/UCKaK-XPQAbznwIISC46b1oA" },
          { title:"DVWA — Damn Vulnerable Web App (GitHub)", type:"lab", lang:"en", url:"https://github.com/digininja/DVWA" },
          { title:"TryHackMe — OWASP Top 10 Room", type:"lab", lang:"en", url:"https://tryhackme.com/room/owasptop10" },
          { title:"HowToHunt — Bug Bounty Checklist (GitHub)", type:"writeup", lang:"en", url:"https://github.com/KathanP19/HowToHunt" },
        ]
      },
      {
        id: "web3", name: "Phase 3 — الثغرات المتقدمة", emoji: "🚀",
        topics: ["SSRF — Server-Side Request Forgery","XXE — XML External Entity","SSTI — Server-Side Template Injection","Prototype Pollution","Deserialization Attacks","OAuth 2.0 Vulnerabilities","JWT Attacks (Algorithm Confusion, None Algorithm)","Race Conditions","HTTP Request Smuggling","Business Logic Vulnerabilities","GraphQL Security Issues","WebSockets Security","CORS Misconfigurations","Subdomain Takeover","Web Cache Poisoning"],
        resources: [
          { title:"PortSwigger — SSRF Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/ssrf" },
          { title:"PortSwigger — JWT Attacks Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/jwt" },
          { title:"PortSwigger — XXE Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/xxe" },
          { title:"PortSwigger — SSTI Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/server-side-template-injection" },
          { title:"PortSwigger — HTTP Request Smuggling Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/request-smuggling" },
          { title:"PortSwigger — Race Conditions Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/race-conditions" },
          { title:"PortSwigger — OAuth Vulnerabilities Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/oauth" },
          { title:"HackTricks — Web Pentesting Reference", type:"article", lang:"en", url:"https://book.hacktricks.xyz/pentesting-web" },
          { title:"AllThingsSSRF — Writeups & Resources (GitHub)", type:"writeup", lang:"en", url:"https://github.com/jdonsec/AllThingsSSRF" },
          { title:"Sec-88 — SSRF Notes بالعربي", type:"article", lang:"ar", url:"https://sallam.gitbook.io/sec-88/web-appsec/ssrf" },
        ]
      },
      {
        id: "web4", name: "Phase 4 — Bug Bounty Methodology", emoji: "💰",
        topics: ["Recon Strategy وبناء الـ Asset Map","Subdomain Enumeration (subfinder, amass, assetfinder)","Content Discovery (feroxbuster, gobuster, ffuf)","Google Dorks والـ OSINT","Shodan / Fofa / Censys","Nuclei Templates الجاهزة","اختيار البرامج (HackerOne, Bugcrowd, Intigriti)","كيف تكتب Report محترف","Triage وعملية الـ Triager","Burp Suite Extensions المهمة","Automation وبناء Pipeline خاص بك","Responsible Disclosure"],
        resources: [
          { title:"Recon بالعربي — Critical Glitch Playlist", type:"video", lang:"ar", url:"https://www.youtube.com/playlist?list=PL76MuQ6v56X8tNsbtB1OsSegz2jHHRRmG" },
          { title:"Recon بالعربي — Bugs AR (YouTube)", type:"video", lang:"ar", url:"https://www.youtube.com/watch?v=KFXDXk5Ng9c" },
          { title:"Get BountyOrDie — Recon & Web Resources (بالعربي)", type:"article", lang:"ar", url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest" },
          { title:"Sec-88 GitBook — Recon Notes بالعربي", type:"article", lang:"ar", url:"https://sallam.gitbook.io/sec-88/web-appsec/reconnaissance" },
          { title:"NahamSec — Recon Playlist (YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/playlist?list=PLKAaMVNxvLmAkqBkzFaOxqs3L66z2n8LA" },
          { title:"HackerOne — Disclosed Reports (Writeups حقيقية)", type:"writeup", lang:"en", url:"https://hackerone.com/hacktivity" },
          { title:"Pentester Land — Bug Bounty Writeups Compilation", type:"writeup", lang:"en", url:"https://pentester.land/writeups/" },
          { title:"InsiderPhD — Bug Bounty للمبتدئين (YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/c/InsiderPhD" },
          { title:"Web Pentesting Notes — Nour Sallam Notion", type:"article", lang:"ar", url:"https://dull-pink-4ba.notion.site/web-pentesting-Bug-hunting-nour-sallam-102df69f71c9808286fcd799291a390e" },
        ]
      }
    ]
  },
  mobile: {
    id: "mobile", name: "Mobile Security", nameEn: "Android Pentesting & Bug Bounty", icon: "📱",
    color: "#f59e0b", colorBg: "rgba(245,158,11,0.15)", duration: "3–5 أشهر",
    desc: "تحليل واختبار اختراق تطبيقات الأندرويد من الصفر",
    phases: [
      {
        id: "mob1", name: "Phase 1 — أساسيات الأندرويد", emoji: "🤖",
        topics: ["بنية نظام الأندرويد (ART/Dalvik/DEX)","مكونات التطبيق (Activity, Service, BroadcastReceiver, ContentProvider)","Android Manifest.xml — تحليل شامل","APK Structure (classes.dex, resources.arsc, lib)","ADB (Android Debug Bridge) — الأوامر الكاملة","بيئة العمل (Genymotion / AVD / جهاز حقيقي)","Root وفائدته في الاختبار","Frida مقدمة","Certificate Pinning مفهوم","Intents ومشاكل الأمان فيها"],
        resources: [
          { title:"Android Pentesting Roadmap — A0xTrojan Notion", type:"article", lang:"ar", url:"https://almond-fontina-ed4.notion.site/Road-map-Android-20190050c671803e8b13f608601c3bb3" },
          { title:"Android Pentesting Notes — A0xTrojan Notion", type:"article", lang:"ar", url:"https://almond-fontina-ed4.notion.site/Android-Pentesting-A0xTrojan-17b90050c67180d8a453fb4dfb6cfd2c" },
          { title:"Mobile Security Notes — 0x5atab Notion", type:"article", lang:"ar", url:"https://0x5atab.notion.site/MOBILE-SECURITY-17490ba198d280b497c5fb1d41387288" },
          { title:"OWASP MASTG — Mobile Application Security Testing Guide", type:"book", lang:"en", url:"https://mas.owasp.org/MASTG/" },
          { title:"OWASP MAS Checklist", type:"article", lang:"en", url:"https://mas.owasp.org/checklists/" },
          { title:"Android App Reverse Engineering 101 — maddiestone", type:"article", lang:"en", url:"https://www.ragingrock.com/AndroidAppRE/" },
        ]
      },
      {
        id: "mob2", name: "Phase 2 — Static Analysis", emoji: "🔍",
        topics: ["APK Decompilation بـ JADX-GUI","apktool — فك وإعادة التجميع","تحليل AndroidManifest.xml بالتفصيل","البحث عن Hardcoded Secrets & API Keys","Insecure Data Storage (SharedPreferences, SQLite, External Storage)","MobSF — Mobile Security Framework تحليل آلي","Reverse Engineering Java/Kotlin","الـ ProGuard/R8 وكيف يُضعف التحليل","Secret Patterns والـ Regex في الكود","Third-party Libraries Vulnerabilities"],
        resources: [
          { title:"JADX-GUI — GitHub (أداة مجانية)", type:"lab", lang:"en", url:"https://github.com/skylot/jadx" },
          { title:"APKTool — GitHub (أداة مجانية)", type:"lab", lang:"en", url:"https://github.com/iBotPeaches/Apktool" },
          { title:"MobSF — Mobile Security Framework (GitHub مجاني)", type:"lab", lang:"en", url:"https://github.com/MobSF/Mobile-Security-Framework-MobSF" },
          { title:"OWASP MASTG — Static Analysis Techniques", type:"article", lang:"en", url:"https://mas.owasp.org/MASTG/techniques/android/" },
          { title:"Android Bug Bounty Reports — B3nac (GitHub)", type:"writeup", lang:"en", url:"https://github.com/B3nac/Android-Reports-and-Resources" },
          { title:"Mobile Security Notes — 0x5atab Notion", type:"article", lang:"ar", url:"https://0x5atab.notion.site/MOBILE-SECURITY-17490ba198d280b497c5fb1d41387288" },
        ]
      },
      {
        id: "mob3", name: "Phase 3 — Dynamic Analysis & Frida", emoji: "⚡",
        topics: ["Frida — كتابة Scripts من الصفر","Hooking Functions بـ Frida","SSL Pinning Bypass (Frida + Objection)","Root Detection Bypass","Burp Suite مع المحاكي (Proxy + CA Certificate)","Traffic Interception وتحليله بـ Wireshark","Objection Framework","Runtime Manipulation","Memory Analysis","Intent Security Testing"],
        resources: [
          { title:"Frida — الموقع الرسمي والتوثيق", type:"article", lang:"en", url:"https://frida.re/docs/home/" },
          { title:"Objection Framework — GitHub (SSL Pinning Bypass)", type:"lab", lang:"en", url:"https://github.com/sensepost/objection" },
          { title:"OWASP MASTG — Dynamic Testing Techniques", type:"article", lang:"en", url:"https://mas.owasp.org/MASTG/techniques/android/" },
          { title:"Frida CodeShare — Scripts جاهزة", type:"article", lang:"en", url:"https://codeshare.frida.re/" },
          { title:"Android Reports & Resources — B3nac GitHub", type:"writeup", lang:"en", url:"https://github.com/B3nac/Android-Reports-and-Resources" },
        ]
      },
      {
        id: "mob4", name: "Phase 4 — OWASP Mobile Top 10 & Bug Bounty", emoji: "💰",
        topics: ["M1: Improper Platform Usage","M2: Insecure Data Storage","M3: Insecure Communication","M4: Insecure Authentication","M5: Insufficient Cryptography","M6: Insecure Authorization","M7: Client Code Quality","M8: Code Tampering","M9: Reverse Engineering","M10: Extraneous Functionality","كيف تكتب Bug Report للتطبيقات","البرامج التي تقبل Mobile Reports"],
        resources: [
          { title:"OWASP MASTG — دليل الاختبار الكامل (مجاني)", type:"lab", lang:"en", url:"https://mas.owasp.org/MASTG/" },
          { title:"DIVA Android — Damn Insecure Vulnerable App (GitHub)", type:"lab", lang:"en", url:"https://github.com/payatu/diva-android" },
          { title:"InsecureBankv2 — Practice Target App (GitHub)", type:"lab", lang:"en", url:"https://github.com/dineshshetty/Android-InsecureBankv2" },
          { title:"AndroGoat — OWASP Practice App (GitHub)", type:"lab", lang:"en", url:"https://github.com/satishpatnayak/AndroGoat" },
          { title:"InjuredAndroid — CTF-Style App (GitHub)", type:"lab", lang:"en", url:"https://github.com/B3nac/InjuredAndroid" },
          { title:"Android Reports & Resources — Writeups حقيقية", type:"writeup", lang:"en", url:"https://github.com/B3nac/Android-Reports-and-Resources" },
          { title:"Mobile Security Notes — 0x5atab", type:"article", lang:"ar", url:"https://0x5atab.notion.site/MOBILE-SECURITY-17490ba198d280b497c5fb1d41387288" },
        ]
      }
    ]
  },
  api: {
    id: "api", name: "API Security", nameEn: "API Hacking & Security", icon: "🔌",
    color: "#8b5cf6", colorBg: "rgba(139,92,246,0.15)", duration: "2–3 أشهر",
    desc: "اختبار أمان REST APIs وGraphQL وكشف ثغرات BOLA/IDOR",
    phases: [
      {
        id: "api1", name: "Phase 1 — API Fundamentals", emoji: "📡",
        topics: ["REST API Architecture","HTTP Methods (GET/POST/PUT/DELETE/PATCH)","JSON وXML","Authentication في APIs (API Keys, JWT, OAuth 2.0, Basic Auth)","Postman & Insomnia الاستخدام الكامل","قراءة API Documentation","GraphQL Basics","Swagger / OpenAPI Spec","API Versioning","Rate Limiting"],
        resources: [
          { title:"API Hacking RoadMap — Cyber Samurai Notion", type:"article", lang:"ar", url:"https://cyber-samurai.notion.site/API-Hacking-RoadMap-0817ef70509649dfaec2891ffba1f7db" },
          { title:"PortSwigger — GraphQL API Vulnerabilities Labs", type:"lab", lang:"en", url:"https://portswigger.net/web-security/graphql" },
          { title:"Postman — Learning Center (مجاني)", type:"article", lang:"en", url:"https://learning.postman.com/docs/getting-started/introduction/" },
          { title:"OWASP API Security Top 10 — الدليل الرسمي", type:"article", lang:"en", url:"https://owasp.org/www-project-api-security/" },
        ]
      },
      {
        id: "api2", name: "Phase 2 — OWASP API Security Top 10", emoji: "⚡",
        topics: ["API1: BOLA (Broken Object Level Authorization)","API2: Broken Authentication","API3: Broken Object Property Level Authorization","API4: Unrestricted Resource Consumption (Rate Limit)","API5: Broken Function Level Authorization","API6: Unrestricted Access to Sensitive Business Flows","API7: Server-Side Request Forgery","API8: Security Misconfiguration","API9: Improper Inventory Management","API10: Unsafe Consumption of APIs","Fuzzing API Endpoints","API Key & Token Leakage Hunting"],
        resources: [
          { title:"OWASP API Security Top 10 — 2023 Edition", type:"article", lang:"en", url:"https://owasp.org/www-project-api-security/" },
          { title:"vAPI — Vulnerable API Practice App (GitHub)", type:"lab", lang:"en", url:"https://github.com/roottusk/vapi" },
          { title:"crAPI — Completely Ridiculous API (OWASP GitHub)", type:"lab", lang:"en", url:"https://github.com/OWASP/crAPI" },
          { title:"Damn Vulnerable GraphQL — DVGA (GitHub)", type:"lab", lang:"en", url:"https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application" },
          { title:"HackTricks — API Pentesting Reference", type:"article", lang:"en", url:"https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql" },
          { title:"InsiderPhD — API Security Testing (YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/c/InsiderPhD" },
        ]
      }
    ]
  },
  network: {
    id: "network", name: "Network Pentest", nameEn: "Network Penetration Testing", icon: "🕸️",
    color: "#ef4444", colorBg: "rgba(239,68,68,0.15)", duration: "3–4 أشهر",
    desc: "اختبار اختراق الشبكات، Metasploit، Post-Exploitation",
    phases: [
      {
        id: "net1", name: "Phase 1 — Scanning & Enumeration", emoji: "🔭",
        topics: ["Nmap — كامل (Host Discovery, Port Scanning, NSE Scripts)","Service Version Detection","OS Fingerprinting","Masscan للسرعة العالية","Shodan للـ External Recon","Network Enumeration (SMB, NFS, SNMP, LDAP)","Vulnerability Scanning (OpenVAS, Nessus)","Wireshark تحليل متقدم","Enum4linux, smbclient","Responder LLMNR Poisoning"],
        resources: [
          { title:"Nmap — التوثيق الرسمي الكامل", type:"article", lang:"en", url:"https://nmap.org/book/man.html" },
          { title:"TryHackMe — Network Security Path", type:"lab", lang:"en", url:"https://tryhackme.com/paths" },
          { title:"HackTheBox Academy — Network Enumeration", type:"lab", lang:"en", url:"https://academy.hackthebox.com/path/preview/network-enumeration-with-nmap" },
          { title:"HackTricks — Network Services Pentesting", type:"article", lang:"en", url:"https://book.hacktricks.xyz/network-services-pentesting" },
          { title:"VulnHub — Practice Machines (مجاني)", type:"lab", lang:"en", url:"https://www.vulnhub.com/" },
        ]
      },
      {
        id: "net2", name: "Phase 2 — Exploitation & Post-Exploitation", emoji: "💥",
        topics: ["Metasploit Framework كامل (MSFConsole)","ARP Poisoning / MITM Attacks","Responder — LLMNR/NBT-NS/mDNS Poisoning","Password Cracking (Hashcat, John the Ripper)","Pass-the-Hash Attacks","Pivoting & Tunneling (chisel, socat, SSH tunneling)","Privilege Escalation Linux (SUID, Cron, sudo)","Privilege Escalation Windows (Token, Services, Registry)","Persistence Methods","Post-Exploitation Frameworks (Empire, Covenant)","Covering Tracks","Professional Report Writing"],
        resources: [
          { title:"TCM Security — Practical Ethical Hacking (Free on YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=fNzpcB7ODxQ" },
          { title:"HackTricks — Pentesting Methodology", type:"article", lang:"en", url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/pentesting-methodology" },
          { title:"GTFOBins — Linux Privilege Escalation", type:"article", lang:"en", url:"https://gtfobins.github.io/" },
          { title:"LOLBAS — Windows Living Off The Land", type:"article", lang:"en", url:"https://lolbas-project.github.io/" },
          { title:"TryHackMe — Offensive Pentesting Path", type:"lab", lang:"en", url:"https://tryhackme.com/path/outline/pentesting" },
          { title:"HackTheBox — Starting Point (مجاني)", type:"lab", lang:"en", url:"https://app.hackthebox.com/starting-point" },
          { title:"VulnHub — Machines للتدريب (مجاني)", type:"lab", lang:"en", url:"https://www.vulnhub.com/" },
        ]
      }
    ]
  },
  ad: {
    id: "ad", name: "Active Directory", nameEn: "Active Directory & Red Team", icon: "🏰",
    color: "#dc2626", colorBg: "rgba(220,38,38,0.15)", duration: "4–6 أشهر",
    desc: "اختراق بيئات Active Directory وعمليات Red Team",
    phases: [
      {
        id: "ad1", name: "Phase 1 — AD Fundamentals", emoji: "🏛️",
        topics: ["ما هو Active Directory وبنيته","Domain Controllers و Forest و Tree","Users, Groups, OUs, GPOs","Kerberos Authentication بعمق (TGT, TGS, AS-REQ)","LDAP وSAMAccountName","BloodHound & SharpHound الإعداد والاستخدام","PowerShell للـ AD Enumeration","LDAP Queries من الخارج","Delegation Types (Unconstrained, Constrained)","AD Trust Relationships"],
        resources: [
          { title:"TCM Security — Practical AD Pentesting (Free YouTube Preview)", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=pKtDptF5HA4" },
          { title:"BloodHound — GitHub الرسمي", type:"lab", lang:"en", url:"https://github.com/BloodHoundAD/BloodHound" },
          { title:"TryHackMe — Active Directory Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/room/winadbasics" },
          { title:"HackTricks — Active Directory Methodology", type:"article", lang:"en", url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology" },
          { title:"HackTheBox Academy — AD Enumeration & Attacks", type:"lab", lang:"en", url:"https://academy.hackthebox.com/path/preview/active-directory-enumeration-attacks" },
        ]
      },
      {
        id: "ad2", name: "Phase 2 — AD Attacks", emoji: "⚔️",
        topics: ["LLMNR/NBT-NS Poisoning (Responder)","Pass-the-Hash (PTH) بـ CrackMapExec","Pass-the-Ticket (PTT)","Kerberoasting — استخراج Service Tickets","AS-REP Roasting","DCSync Attack — استخراج كلمات المرور من DC","Golden Ticket Attack","Silver Ticket Attack","BloodHound Attack Path Analysis","Lateral Movement (PSExec, WinRM, SMBExec)","Domain Privilege Escalation","ACL / ACE Abuse"],
        resources: [
          { title:"HackTricks — Kerberoasting", type:"article", lang:"en", url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/kerberoast" },
          { title:"HackTricks — DCSync", type:"article", lang:"en", url:"https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/dcsync" },
          { title:"VulnAD — Vulnerable AD Lab (GitHub)", type:"lab", lang:"en", url:"https://github.com/WazeHell/vulnerable-AD" },
          { title:"Detection Lab — AD Testing Environment (GitHub)", type:"lab", lang:"en", url:"https://github.com/clong/DetectionLab" },
          { title:"HackTheBox — Pro Labs (RastaLabs, Offshore)", type:"lab", lang:"en", url:"https://www.hackthebox.com/hacker/pro-labs" },
          { title:"Impacket — Python AD Tools (GitHub)", type:"lab", lang:"en", url:"https://github.com/SecureAuthCorp/impacket" },
        ]
      }
    ]
  },
  malware: {
    id: "malware", name: "Malware Analysis", nameEn: "Malware Analysis & Reverse Engineering", icon: "🦠",
    color: "#06b6d4", colorBg: "rgba(6,182,212,0.15)", duration: "4–6 أشهر",
    desc: "تحليل البرمجيات الخبيثة والهندسة العكسية",
    phases: [
      {
        id: "mal1", name: "Phase 1 — Foundations", emoji: "🧱",
        topics: ["Assembly Language x86/x64 أساسيات","Windows Internals (Processes, Threads, Handles, Memory)","PE File Format (Headers, Sections, Import/Export Tables)","Static Analysis Tools (PEStudio, strings, FLOSS, Detect-It-Easy)","Dynamic Analysis (Process Monitor, Process Hacker, Wireshark)","Sandbox Analysis (ANY.RUN, Cuckoo, Hybrid Analysis)","Disassemblers (Ghidra, IDA Free, Binary Ninja Free)","Debuggers (x64dbg, OllyDbg)","Packing & Obfuscation Detection","YARA Rules كتابة واستخدام"],
        resources: [
          { title:"Practical Malware Analysis — كتاب Nostarch (المرجع الأساسي)", type:"book", lang:"en", url:"https://nostarch.com/malware" },
          { title:"Ghidra — NSA Free Disassembler (GitHub)", type:"lab", lang:"en", url:"https://github.com/NationalSecurityAgency/ghidra" },
          { title:"x64dbg — Open Source Debugger (GitHub)", type:"lab", lang:"en", url:"https://github.com/x64dbg/x64dbg" },
          { title:"ANY.RUN — Interactive Sandbox (مجاني)", type:"lab", lang:"en", url:"https://any.run/" },
          { title:"Hybrid Analysis — Free Sandbox", type:"lab", lang:"en", url:"https://www.hybrid-analysis.com/" },
          { title:"MalwareBazaar — عينات حقيقية للتحليل (مجاني)", type:"lab", lang:"en", url:"https://bazaar.abuse.ch/" },
          { title:"HackTricks — Malware Analysis", type:"article", lang:"en", url:"https://book.hacktricks.xyz/forensics/basic-forensic-methodology/malware-analysis" },
          { title:"OpenSecurityTraining2 — مجاني بالكامل", type:"video", lang:"en", url:"https://opensecuritytraining.info/" },
        ]
      }
    ]
  },
  ctf: {
    id: "ctf", name: "CTF & Wargames", nameEn: "CTF Competitions & Practice", icon: "🚩",
    color: "#f97316", colorBg: "rgba(249,115,22,0.15)", duration: "مستمر",
    desc: "تحديات CTF، تطبيق المهارات، المسابقات الأمنية",
    phases: [
      {
        id: "ctf1", name: "Phase 1 — CTF Basics & Wargames", emoji: "🎯",
        topics: ["أنواع تحديات CTF (Web, Crypto, Forensics, Pwn, RE, Misc)","Web CTF Challenges","Cryptography Basics (Caesar, Vigenere, RSA, Base64)","Forensics (Steganography, File Carving, Memory Forensics)","Binary Exploitation Basics (Buffer Overflow, ret2win)","OSINT Challenges","أدوات CTF الأساسية (CyberChef, Ghidra, pwntools, Wireshark)"],
        resources: [
          { title:"CTF101 — Getting Started Guide (مجاني)", type:"article", lang:"en", url:"https://ctf101.org/" },
          { title:"PicoCTF — للمبتدئين من Carnegie Mellon (مجاني)", type:"lab", lang:"en", url:"https://picoctf.org/" },
          { title:"OverTheWire — Wargames كاملة (Bandit, Natas, Leviathan)", type:"lab", lang:"en", url:"https://overthewire.org/wargames/" },
          { title:"TryHackMe — Complete Beginner Path", type:"lab", lang:"en", url:"https://tryhackme.com/path/outline/beginner" },
          { title:"HackTheBox Academy — Free Tier", type:"lab", lang:"en", url:"https://academy.hackthebox.com/" },
          { title:"CTFtime — مسابقات CTF الحية حول العالم", type:"lab", lang:"en", url:"https://ctftime.org/" },
          { title:"CyberChef — أداة تشفير وتحليل شاملة (مجاني)", type:"lab", lang:"en", url:"https://gchq.github.io/CyberChef/" },
          { title:"CTF Writeups — GitHub Collection", type:"writeup", lang:"en", url:"https://github.com/sajjadium/ctf-archives" },
        ]
      }
    ]
  }
};

const ROUTINE = [
  { time:"04:30", label:"الاستيقاظ + أذكار الاستيقاظ", type:"islamic", icon:"🌙", detail:"«الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور»" },
  { time:"04:45", label:"صلاة الفجر", type:"prayer", icon:"🕌", detail:"أداء الفريضة + سنة الفجر + أذكار ما بعد الصلاة" },
  { time:"05:05", label:"أذكار الصباح", type:"islamic", icon:"📿", detail:"أذكار الصباح الكاملة من صحيح السنة (15–20 دقيقة)" },
  { time:"05:25", label:"ورد القرآن الكريم", type:"quran", icon:"📖", detail:"تلاوة حزب/ربع/جزء حسب هدفك — مع التدبر والتأمل (30 دقيقة) | يوم الجمعة: قراءة سورة الكهف كاملة" },
  { time:"05:55", label:"مراجعة يوم أمس + Todo", type:"study", icon:"📋", detail:"مراجعة سريعة لما تعلمته أمس + تحديد هدف اليوم (10 دق)" },
  { time:"06:05", label:"🧠 جلسة تعلم رئيسية", type:"study", icon:"💻", detail:"دراسة Track الأساسي — فيديو + ملاحظات (90 دقيقة) — أقوى وقت ذهني" },
  { time:"07:35", label:"رياضة + تمارين", type:"health", icon:"🏃", detail:"مشي أو تمارين خفيفة (30 دقيقة) — لإعادة شحن الطاقة" },
  { time:"08:05", label:"وجبة الإفطار + استراحة", type:"break", icon:"🍳", detail:"وجبة مغذية + استرخاء حقيقي (25 دقيقة)" },
  { time:"08:30", label:"⚙️ تطبيق عملي — Labs", type:"study", icon:"🔧", detail:"حل Labs و Challenges (PortSwigger, TryHackMe, HackTheBox) — 90 دقيقة" },
  { time:"10:00", label:"استراحة ذكية", type:"break", icon:"☕", detail:"استراحة قهوة / قيلولة خفيفة (15 دقيقة)" },
  { time:"10:15", label:"📚 مقالات + Writeups", type:"study", icon:"✍️", detail:"قراءة Writeups وتقارير أمنية ومقالات تقنية (60 دقيقة)" },
  { time:"11:15", label:"صلاة الضحى", type:"prayer", icon:"🕌", detail:"2 إلى 8 ركعات (بركة ونشاط ليومك)" },
  { time:"11:30", label:"🚀 مشاريع شخصية", type:"project", icon:"⚙️", detail:"bbhunter / mbbhunter / open-source contributions (60 دقيقة)" },
  { time:"12:15", label:"🕌 صلاة الجمعة (يوم الجمعة فقط)", type:"prayer", icon:"🕌", detail:"يوم الجمعة: التبكير للمسجد + الإنصات للخطبة + الصلاة + الدعاء في ساعة الإجابة — أفضل يوم طلعت عليه الشمس" },
  { time:"12:30", label:"صلاة الظهر", type:"prayer", icon:"🕌", detail:"أداء الفريضة + ذكر الله بعدها | الجمعة: بعد صلاة الجمعة — اقرأ سورة الكهف إن لم تقرأها صباحاً" },
  { time:"12:50", label:"وجبة الغداء + قيلولة", type:"break", icon:"🍽️", detail:"وجبة الغداء ثم قيلولة (30–45 دقيقة) — السنة النبوية" },
  { time:"14:00", label:"🎯 CTF / HackTheBox", type:"study", icon:"🚩", detail:"تحديات CTF أو آلة HackTheBox أو TryHackMe (90 دقيقة)" },
  { time:"15:30", label:"صلاة العصر", type:"prayer", icon:"🕌", detail:"أداء الفريضة + أذكار ما بعد العصر — وقت مبارك — الجمعة: الإكثار من الصلاة على النبي ﷺ" },
  { time:"15:45", label:"نشاط خارجي", type:"health", icon:"🌿", detail:"مشي أو رياضة خارجية + تجديد الهواء (30 دقيقة)" },
  { time:"16:15", label:"📝 تدوين الملاحظات", type:"study", icon:"🗒️", detail:"Obsidian أو Notion — تلخيص كل ما تعلمته اليوم (45 دقيقة)" },
  { time:"17:00", label:"مراجعة وFlashcards", type:"study", icon:"🔄", detail:"Anki Flashcards أو مراجعة سريعة للملاحظات (30 دقيقة)" },
  { time:"17:30", label:"أذكار المساء", type:"islamic", icon:"📿", detail:"أذكار المساء الكاملة قبل الغروب (15–20 دقيقة) | الجمعة: الإكثار من الدعاء في ساعة الإجابة بعد العصر" },
  { time:"18:00", label:"صلاة المغرب", type:"prayer", icon:"🕌", detail:"أداء الفريضة + ذكر الله بعدها" },
  { time:"18:20", label:"ورد القرآن المسائي", type:"quran", icon:"📖", detail:"تلاوة مسائية هادئة (20 دقيقة)" },
  { time:"18:40", label:"وقت الأهل والعائلة", type:"personal", icon:"👨‍👩‍👧", detail:"أوقات الأهل حق واجب — الرحم والصلة | الجمعة: يوم أسري بامتياز" },
  { time:"19:30", label:"صلاة العشاء", type:"prayer", icon:"🕌", detail:"أداء الفريضة + الوتر + أذكار النوم" },
  { time:"19:50", label:"🌐 Community & GitHub", type:"community", icon:"🌐", detail:"Discord + Twitter/X + GitHub (30 دقيقة) — بناء الشبكة" },
  { time:"20:20", label:"📰 قراءة أخبار أمنية", type:"study", icon:"📰", detail:"Krebs on Security, The Hacker News, Twitter Security (20 دقيقة)" },
  { time:"20:40", label:"مراجعة Todo + تخطيط الغد", type:"study", icon:"✅", detail:"ما أُنجز + ما تأجل + تحديد أهداف الغد الثلاثة الرئيسية" },
  { time:"21:00", label:"🌙 النوم المبكر", type:"break", icon:"😴", detail:"أذكار النوم — الآية الكريمة والمعوذتين — نوم مبكر مبارك | رمضان: السحور قبل الفجر + تغيير كامل في الجدول" },
];

const INIT_TODOS = [
  { id:1, text:"إكمال OSI Model Lab على TryHackMe", track:"foundations", priority:"high", done:false, date:"اليوم" },
  { id:2, text:"حل 3 Labs SQL Injection على PortSwigger Academy", track:"web", priority:"high", done:false, date:"اليوم" },
  { id:3, text:"حل 3 Labs XSS على PortSwigger Academy", track:"web", priority:"high", done:false, date:"غداً" },
  { id:4, text:"إعداد بيئة Android (Genymotion + ADB + JADX)", track:"mobile", priority:"medium", done:false, date:"هذا الأسبوع" },
  { id:5, text:"قراءة OWASP Top 10 كاملاً وتدوين ملاحظات", track:"web", priority:"medium", done:false, date:"هذا الأسبوع" },
  { id:6, text:"كتابة ملاحظات اليوم في Obsidian", track:"general", priority:"high", done:false, date:"اليوم" },
  { id:7, text:"حل Bandit Level 0 إلى 10 على OverTheWire", track:"foundations", priority:"medium", done:false, date:"غداً" },
  { id:8, text:"قراءة Writeup Bug Bounty حقيقية من HackerOne", track:"web", priority:"low", done:false, date:"هذا الأسبوع" },
  { id:9, text:"تجربة flaws.cloud Level 1 و 2 (AWS Security)", track:"cloud", priority:"medium", done:false, date:"هذا الأسبوع" },
  { id:10, text:"حل Level 1 من Ethernaut (OpenZeppelin)", track:"web3", priority:"low", done:false, date:"الشهر القادم" },
  { id:11, text:"تثبيت Volatility 3 وتجربة Memory Forensics", track:"dfir", priority:"low", done:false, date:"الشهر القادم" },
  { id:12, text:"حل CryptoHack — Introduction Challenges", track:"crypto", priority:"medium", done:false, date:"هذا الأسبوع" },
];

// ===== NEW TRACKS (8 additional) =====
const NEW_TRACKS = {
  cloud: {
    id:"cloud", name:"Cloud Security", nameEn:"Cloud Security (AWS/Azure/GCP)", icon:"☁️",
    color:"#0ea5e9", colorBg:"rgba(14,165,233,0.15)", duration:"3–5 أشهر",
    desc:"اختبار اختراق بيئات AWS وAzure وGCP — المجال الأسرع نمواً",
    phases:[
      {
        id:"cloud1", name:"Phase 1 — Cloud Fundamentals", emoji:"🌩️",
        topics:["Cloud Computing Concepts (IaaS, PaaS, SaaS)","AWS Core Services (IAM, EC2, S3, Lambda, RDS)","Azure Core Services","GCP Core Services","Shared Responsibility Model","Cloud Networking (VPC, Security Groups, NACLs)","Identity & Access Management (IAM) بعمق","Cloud CLI Tools (AWS CLI, az, gcloud)","Regions, Availability Zones, Edge Locations","Infrastructure as Code (Terraform أساسيات)"],
        resources:[
          {title:"flaws.cloud — AWS Security CTF مجاني (Scott Piper)", type:"lab", lang:"en", url:"http://flaws.cloud/"},
          {title:"flaws2.cloud — AWS Security CTF مستوى متقدم", type:"lab", lang:"en", url:"http://flaws2.cloud/"},
          {title:"AWS Cloud Practitioner — فري كورس (freeCodeCamp)", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=NhDYbskXRgc"},
          {title:"TryHackMe — Cloud Security Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/hacktivities?tab=search&value=cloud"},
          {title:"HackTricks Cloud — مرجع شامل", type:"article", lang:"en", url:"https://cloud.hacktricks.xyz/"},
        ]
      },
      {
        id:"cloud2", name:"Phase 2 — AWS Pentesting", emoji:"🔓",
        topics:["AWS IAM Privilege Escalation Techniques","S3 Bucket Misconfigurations","EC2 Instance Metadata Service (IMDS) Attacks","Lambda Function Exploitation","Secrets Manager & SSM Parameter Store Exposure","CloudTrail Log Analysis","AWS IAM Enumeration (enumerate-iam)","Pacu — AWS Exploitation Framework","Lateral Movement in AWS","Container Security (ECS, EKS)"],
        resources:[
          {title:"CloudGoat — Vulnerable-by-Design AWS Lab (GitHub)", type:"lab", lang:"en", url:"https://github.com/RhinoSecurityLabs/cloudgoat"},
          {title:"Pacu — AWS Exploitation Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/RhinoSecurityLabs/pacu"},
          {title:"AWS IAM Privilege Escalation — Rhino Security Blog", type:"article", lang:"en", url:"https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/"},
          {title:"HackTricks Cloud — AWS Pentesting", type:"article", lang:"en", url:"https://cloud.hacktricks.xyz/pentesting-cloud/aws-security"},
          {title:"CloudFoxable — AWS Vulnerable Lab (GitHub)", type:"lab", lang:"en", url:"https://github.com/BishopFox/cloudFoxable"},
          {title:"enumerate-iam — AWS IAM Enumeration Tool (GitHub)", type:"lab", lang:"en", url:"https://github.com/andresriancho/enumerate-iam"},
        ]
      },
      {
        id:"cloud3", name:"Phase 3 — Azure & GCP Pentesting", emoji:"🔵",
        topics:["Azure AD / Entra ID Attacks","Azure RBAC Misconfigurations","Storage Account Exposure","Azure Function Apps","GCP IAM Privilege Escalation","GCP Bucket Misconfigurations","Cloud Container Attacks (Docker, Kubernetes)","Kubernetes Security (RBAC, Pod Escape)","Multi-Cloud Attack Paths","Cloud Security Tools (ScoutSuite, Prowler)"],
        resources:[
          {title:"ScoutSuite — Multi-Cloud Security Auditing (GitHub)", type:"lab", lang:"en", url:"https://github.com/nccgroup/ScoutSuite"},
          {title:"Prowler — AWS/Azure/GCP Security Tool (GitHub)", type:"lab", lang:"en", url:"https://github.com/prowler-cloud/prowler"},
          {title:"GCP IAM Privilege Escalation — Rhino Security (GitHub)", type:"article", lang:"en", url:"https://github.com/RhinoSecurityLabs/GCP-IAM-Privilege-Escalation"},
          {title:"HackTricks Cloud — Azure Pentesting", type:"article", lang:"en", url:"https://cloud.hacktricks.xyz/pentesting-cloud/azure-security"},
          {title:"TryHackMe — Kubernetes Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/hacktivities?tab=search&value=kubernetes"},
        ]
      }
    ]
  },
  osint: {
    id:"osint", name:"OSINT & Recon", nameEn:"OSINT & Advanced Reconnaissance", icon:"🔭",
    color:"#a855f7", colorBg:"rgba(168,85,247,0.15)", duration:"2–3 أشهر",
    desc:"جمع المعلومات، Footprinting، التحقيق المفتوح المصدر",
    phases:[
      {
        id:"osint1", name:"Phase 1 — OSINT Foundations", emoji:"🧭",
        topics:["ما هو OSINT وأهميته","Passive vs Active Reconnaissance","Google Dorks (Google Hacking)","Shodan وCensys وFofa","Email OSINT (Hunter.io, theHarvester)","Username OSINT (Sherlock, WhatsMyName)","Domain OSINT (WHOIS, DNS, Certificate Transparency)","IP OSINT (BGP Toolkit, ARIN, RIPE)","Social Media OSINT","Image OSINT (Reverse Image Search, ExifTool)"],
        resources:[
          {title:"OSINT Framework — الدليل الشامل المجاني", type:"article", lang:"en", url:"https://osintframework.com/"},
          {title:"OSINT Framework — GitHub", type:"article", lang:"en", url:"https://github.com/lockfale/OSINT-Framework"},
          {title:"TheHarvester — OSINT Tool (GitHub)", type:"lab", lang:"en", url:"https://github.com/laramies/theHarvester"},
          {title:"Sherlock — Username Search Across Networks (GitHub)", type:"lab", lang:"en", url:"https://github.com/sherlock-project/sherlock"},
          {title:"Recon-ng — Web Reconnaissance Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/lanmaster53/recon-ng"},
          {title:"IntelTechniques — Michael Bazzell OSINT Resources", type:"article", lang:"en", url:"https://inteltechniques.com/tools/"},
          {title:"Get BountyOrDie — Recon Resources بالعربي", type:"article", lang:"ar", url:"https://get-bountyordie.gitbook.io/get-bountyordie-docs/resources-for-security/web-app-pentest"},
        ]
      },
      {
        id:"osint2", name:"Phase 2 — Advanced OSINT & Tools", emoji:"🕵️",
        topics:["Maltego — رسم علاقات OSINT","SpiderFoot — Automated OSINT","Recon-ng Framework","OSINT في Bug Bounty (Asset Discovery)","Subdomain Enumeration (Amass, Subfinder, Assetfinder)","Certificate Transparency (crt.sh, censys)","GitHub Dorking — البحث عن Secrets","Paste Sites Monitoring","Dark Web OSINT أساسيات","كتابة OSINT Reports"],
        resources:[
          {title:"Amass — In-depth Attack Surface Mapping (GitHub)", type:"lab", lang:"en", url:"https://github.com/owasp-amass/amass"},
          {title:"SpiderFoot — Automated OSINT (GitHub)", type:"lab", lang:"en", url:"https://github.com/smicallef/spiderfoot"},
          {title:"crt.sh — Certificate Transparency Search", type:"lab", lang:"en", url:"https://crt.sh/"},
          {title:"Subfinder — Fast Subdomain Discovery (GitHub)", type:"lab", lang:"en", url:"https://github.com/projectdiscovery/subfinder"},
          {title:"TruffleHog — Find Leaked Secrets (GitHub)", type:"lab", lang:"en", url:"https://github.com/trufflesecurity/trufflehog"},
          {title:"GitLeaks — Detect Secrets in Git (GitHub)", type:"lab", lang:"en", url:"https://github.com/gitleaks/gitleaks"},
          {title:"NahamSec — Recon Methodology Playlist (YouTube)", type:"video", lang:"en", url:"https://www.youtube.com/playlist?list=PLKAaMVNxvLmAkqBkzFaOxqs3L66z2n8LA"},
        ]
      }
    ]
  },
  web3: {
    id:"web3", name:"Web3 Security", nameEn:"Smart Contract & Web3 Security", icon:"⛓️",
    color:"#f59e0b", colorBg:"rgba(245,158,11,0.15)", duration:"4–6 أشهر",
    desc:"أمان العقود الذكية، DeFi Hacking، Smart Contract Auditing",
    phases:[
      {
        id:"web31", name:"Phase 1 — Blockchain & Solidity Fundamentals", emoji:"🧱",
        topics:["كيف تعمل Blockchain","Ethereum وEVM أساسيات","Solidity Language — الأساسيات","Smart Contract Lifecycle (Deploy, Call, Destroy)","ABI وEthers.js وWeb3.js","Gas وOptimization","Remix IDE الاستخدام","Metamask إعداد وTestnet","ERC-20 وERC-721 Standards","Foundry / Hardhat Tools"],
        resources:[
          {title:"Solidity Docs — التوثيق الرسمي", type:"article", lang:"en", url:"https://docs.soliditylang.org/"},
          {title:"CryptoZombies — تعلم Solidity تفاعلياً (مجاني)", type:"lab", lang:"en", url:"https://cryptozombies.io/"},
          {title:"Remix IDE — بيئة تطوير Solidity مجانية", type:"lab", lang:"en", url:"https://remix.ethereum.org/"},
          {title:"Patrick Collins — Solidity Full Course (YouTube فري)", type:"video", lang:"en", url:"https://www.youtube.com/watch?v=gyMwXuJrbJQ"},
          {title:"Foundry Book — التوثيق الرسمي", type:"article", lang:"en", url:"https://book.getfoundry.sh/"},
        ]
      },
      {
        id:"web32", name:"Phase 2 — Smart Contract Vulnerabilities", emoji:"⚡",
        topics:["Reentrancy Attacks (أشهر ثغرة في DeFi)","Integer Overflow / Underflow","Access Control Misconfigurations","Unprotected SELFDESTRUCT","Tx.origin vs msg.sender","Randomness Manipulation (Block-based)","Flash Loan Attacks","Price Oracle Manipulation","Front-Running & MEV","Delegatecall Vulnerabilities","Signature Replay Attacks","TWAP Oracle Attacks"],
        resources:[
          {title:"Ethernaut — OpenZeppelin Web3 CTF (مجاني)", type:"lab", lang:"en", url:"https://ethernaut.openzeppelin.com/"},
          {title:"Ethernaut — GitHub الرسمي", type:"lab", lang:"en", url:"https://github.com/OpenZeppelin/ethernaut"},
          {title:"Damn Vulnerable DeFi — Advanced DeFi Challenges (GitHub)", type:"lab", lang:"en", url:"https://github.com/theredguild/damn-vulnerable-defi"},
          {title:"SWC Registry — Smart Contract Weakness Classification", type:"article", lang:"en", url:"https://swcregistry.io/"},
          {title:"DeFiHackLabs — Real DeFi Hacks POCs (GitHub)", type:"writeup", lang:"en", url:"https://github.com/SunWeb3Sec/DeFiHackLabs"},
          {title:"Consensys Smart Contract Best Practices", type:"article", lang:"en", url:"https://consensys.github.io/smart-contract-best-practices/"},
        ]
      },
      {
        id:"web33", name:"Phase 3 — Smart Contract Auditing", emoji:"🔍",
        topics:["Audit Methodology وخطوات المراجعة","Static Analysis Tools (Slither, Mythril)","Fuzzing Smart Contracts (Echidna)","Formal Verification أساسيات","كيف تكتب Audit Report","Code4rena وSherlock وImmune.fi","Bug Bounty في Web3","DeFi Protocol Architecture","Cross-Chain Bridge Security","NFT Marketplace Vulnerabilities"],
        resources:[
          {title:"Slither — Static Analyzer for Solidity (GitHub)", type:"lab", lang:"en", url:"https://github.com/crytic/slither"},
          {title:"Mythril — Smart Contract Security Analysis (GitHub)", type:"lab", lang:"en", url:"https://github.com/Consensys/mythril"},
          {title:"Echidna — Smart Contract Fuzzer (GitHub)", type:"lab", lang:"en", url:"https://github.com/crytic/echidna"},
          {title:"Code4rena — Smart Contract Audit Contests", type:"lab", lang:"en", url:"https://code4rena.com/"},
          {title:"Immunefi — Web3 Bug Bounty Platform", type:"lab", lang:"en", url:"https://immunefi.com/"},
          {title:"Cyfrin Updraft — Smart Contract Security Courses (Free)", type:"video", lang:"en", url:"https://updraft.cyfrin.io/"},
        ]
      }
    ]
  },
  dfir: {
    id:"dfir", name:"DFIR", nameEn:"Digital Forensics & Incident Response", icon:"🔬",
    color:"#22d3ee", colorBg:"rgba(34,211,238,0.15)", duration:"3–4 أشهر",
    desc:"التحقيق الجنائي الرقمي، الاستجابة للحوادث، تحليل الأدلة",
    phases:[
      {
        id:"dfir1", name:"Phase 1 — Digital Forensics Fundamentals", emoji:"🧪",
        topics:["Chain of Custody وأخلاقيات الجنائيات","File Systems (NTFS, FAT32, ext4)","Disk Imaging (dd, FTK Imager)","File Carving وRecovery","Windows Forensics (Registry, Event Logs, Prefetch)","Linux Forensics (Logs, /proc, bash_history)","Browser Forensics (History, Cookies, Cache)","Memory Forensics أساسيات","Timeline Analysis","Hash Verification (MD5, SHA-1, SHA-256)"],
        resources:[
          {title:"Autopsy — Digital Forensics Platform (مجاني)", type:"lab", lang:"en", url:"https://www.autopsy.com/"},
          {title:"FTK Imager — Disk Imaging Tool (مجاني)", type:"lab", lang:"en", url:"https://www.exterro.com/ftk-product-suite/ftk-imager"},
          {title:"TryHackMe — Digital Forensics Path", type:"lab", lang:"en", url:"https://tryhackme.com/path/outline/dfir"},
          {title:"SANS DFIR Resources (مجاني)", type:"article", lang:"en", url:"https://www.sans.org/digital-forensics/"},
          {title:"HackTricks — Forensics Methodology", type:"article", lang:"en", url:"https://book.hacktricks.xyz/forensics/basic-forensic-methodology"},
        ]
      },
      {
        id:"dfir2", name:"Phase 2 — Memory & Network Forensics", emoji:"🧠",
        topics:["Volatility 3 Framework الكامل","Memory Dump Analysis","Process Analysis في الذاكرة","Network Forensics (Wireshark, Zeek, Suricata)","PCAP Analysis بعمق","Log Analysis (Splunk, ELK, Graylog)","Malware في الذاكرة","Windows Event Logs Analysis","PowerShell Forensics","Steganography Detection"],
        resources:[
          {title:"Volatility 3 — Memory Forensics Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/volatilityfoundation/volatility3"},
          {title:"Wireshark — Network Analysis (مجاني)", type:"lab", lang:"en", url:"https://www.wireshark.org/"},
          {title:"CyberDefenders — Blue Team CTF (مجاني)", type:"lab", lang:"en", url:"https://cyberdefenders.org/"},
          {title:"Blue Team Labs Online (مجاني)", type:"lab", lang:"en", url:"https://blueteamlabs.online/"},
          {title:"Eric Zimmerman Tools — Windows Forensics (مجاني)", type:"lab", lang:"en", url:"https://ericzimmerman.github.io/"},
        ]
      },
      {
        id:"dfir3", name:"Phase 3 — Incident Response", emoji:"🚨",
        topics:["NIST Incident Response Framework","Incident Response Lifecycle","MITRE ATT&CK Framework","Threat Hunting Methodology","IOC Collection وAnalysis","YARA Rules للـ Detection","EDR Solutions (Velociraptor)","SIEM Usage (Splunk, ELK)","Ransomware Response","Forensic Report Writing"],
        resources:[
          {title:"MITRE ATT&CK Framework — Official", type:"article", lang:"en", url:"https://attack.mitre.org/"},
          {title:"Velociraptor — Endpoint Forensics (GitHub)", type:"lab", lang:"en", url:"https://github.com/Velocidex/velociraptor"},
          {title:"TheHive — Incident Response Platform (GitHub)", type:"lab", lang:"en", url:"https://github.com/TheHive-Project/TheHive"},
          {title:"Elastic SIEM — Free Tier", type:"lab", lang:"en", url:"https://www.elastic.co/security"},
          {title:"TryHackMe — SOC Level 1 Path", type:"lab", lang:"en", url:"https://tryhackme.com/path/outline/soclevel1"},
          {title:"LetsDefend — Blue Team Practice (مجاني)", type:"lab", lang:"en", url:"https://letsdefend.io/"},
        ]
      }
    ]
  },
  wireless: {
    id:"wireless", name:"Wireless Security", nameEn:"Wireless & WiFi Hacking", icon:"📡",
    color:"#84cc16", colorBg:"rgba(132,204,22,0.15)", duration:"2–3 أشهر",
    desc:"اختبار أمان الشبكات اللاسلكية WiFi وBluetooth",
    phases:[
      {
        id:"wl1", name:"Phase 1 — WiFi Security", emoji:"📶",
        topics:["IEEE 802.11 Standards (a/b/g/n/ac/ax)","WEP وأسباب ضعفه","WPA/WPA2-Personal — PMKID & Handshake Attacks","WPA2-Enterprise (RADIUS, PEAP)","WPA3 والتحسينات","Monitor Mode وPacket Injection","Aircrack-ng Suite كامل","Evil Twin Attacks","Deauthentication Attacks","Captive Portal Attacks","Wireless Reconnaissance"],
        resources:[
          {title:"Aircrack-ng Suite — Official Documentation", type:"article", lang:"en", url:"https://www.aircrack-ng.org/documentation.html"},
          {title:"Aircrack-ng — GitHub", type:"lab", lang:"en", url:"https://github.com/aircrack-ng/aircrack-ng"},
          {title:"HackTricks — Pentesting WiFi", type:"article", lang:"en", url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/pentesting-wifi"},
          {title:"TryHackMe — WiFi Hacking Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/room/wifihacking101"},
          {title:"Hcxtools — WPA PMKID Attack Tool (GitHub)", type:"lab", lang:"en", url:"https://github.com/ZerBea/hcxtools"},
          {title:"Wifite2 — Automated WiFi Auditor (GitHub)", type:"lab", lang:"en", url:"https://github.com/derv82/wifite2"},
        ]
      },
      {
        id:"wl2", name:"Phase 2 — Bluetooth & Advanced Wireless", emoji:"🔵",
        topics:["Bluetooth Security (BLE, Classic)","Bluetooth Attacks (MITM, Eavesdropping)","BLE GATT Exploits","Zigbee وZ-Wave Security","SDR (Software Defined Radio) أساسيات","RF Hacking مفاهيم","NFC Security وAttacks","RFID Cloning","Wireless Pentesting Report","Kismet للـ Wireless Discovery"],
        resources:[
          {title:"Kismet — Wireless Network Detector (GitHub)", type:"lab", lang:"en", url:"https://github.com/kismetwireless/kismet"},
          {title:"HackTricks — Pentesting Bluetooth", type:"article", lang:"en", url:"https://book.hacktricks.xyz/bluetooth/"},
          {title:"GNU Radio — SDR Framework (مجاني)", type:"lab", lang:"en", url:"https://www.gnuradio.org/"},
          {title:"Bettercap — Network Attack Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/bettercap/bettercap"},
        ]
      }
    ]
  },
  crypto: {
    id:"crypto", name:"Cryptography", nameEn:"Cryptography & Applied Crypto Attacks", icon:"🔐",
    color:"#e11d48", colorBg:"rgba(225,29,72,0.15)", duration:"2–3 أشهر",
    desc:"التشفير النظري والتطبيقي، كسر الخوارزميات، Crypto CTF",
    phases:[
      {
        id:"cry1", name:"Phase 1 — Cryptography Fundamentals", emoji:"🧮",
        topics:["Symmetric Encryption (AES, DES, 3DES)","Asymmetric Encryption (RSA, ECC)","Hashing (MD5, SHA family, bcrypt)","Digital Signatures","PKI وCertificates","Key Exchange (Diffie-Hellman)","Random Number Generators","Encoding vs Encryption vs Hashing","Base64, Hex, ASCII, Binary","Common Crypto Mistakes"],
        resources:[
          {title:"CryptoHack — Interactive Cryptography Challenges (مجاني)", type:"lab", lang:"en", url:"https://cryptohack.org/"},
          {title:"CyberChef — Crypto Analysis Tool (مجاني)", type:"lab", lang:"en", url:"https://gchq.github.io/CyberChef/"},
          {title:"Cryptopals Challenges — Classic Crypto Attacks (مجاني)", type:"lab", lang:"en", url:"https://cryptopals.com/"},
          {title:"Khan Academy — Cryptography Course (مجاني)", type:"video", lang:"en", url:"https://www.khanacademy.org/computing/computer-science/cryptography"},
          {title:"Applied Cryptography — Bruce Schneier (Reference Book)", type:"book", lang:"en", url:"https://www.schneier.com/books/applied-cryptography/"},
        ]
      },
      {
        id:"cry2", name:"Phase 2 — Crypto Attacks & CTF", emoji:"⚔️",
        topics:["RSA Attacks (Small e, Common Modulus, Wiener)","AES Attacks (ECB Mode, Padding Oracle, CBC Bit Flipping)","Hash Length Extension Attacks","ECDSA Nonce Reuse","Timing Attacks","JWT Algorithm Confusion (RS256→HS256)","Side-Channel Attacks مقدمة","Crypto CTF Strategy","SageMath للـ Crypto","Discrete Logarithm Problem"],
        resources:[
          {title:"CryptoHack — Advanced Challenges (مجاني)", type:"lab", lang:"en", url:"https://cryptohack.org/challenges/"},
          {title:"RsaCtfTool — RSA Attacks Tool (GitHub)", type:"lab", lang:"en", url:"https://github.com/RsaCtfTool/RsaCtfTool"},
          {title:"PyCryptodome — Python Crypto Library (GitHub)", type:"lab", lang:"en", url:"https://github.com/Legrandin/pycryptodome"},
          {title:"CTF Crypto Writeups — GitHub Collection", type:"writeup", lang:"en", url:"https://github.com/p4-team/ctf"},
          {title:"PortSwigger — Padding Oracle Attack Lab", type:"lab", lang:"en", url:"https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic"},
        ]
      }
    ]
  },
  pwn: {
    id:"pwn", name:"Binary Exploitation", nameEn:"Binary Exploitation & Reverse Engineering", icon:"💣",
    color:"#dc2626", colorBg:"rgba(220,38,38,0.12)", duration:"5–8 أشهر",
    desc:"استغلال الثنائيات، Buffer Overflow، ROP Chains، Kernel Exploitation",
    phases:[
      {
        id:"pwn1", name:"Phase 1 — Foundations", emoji:"🧱",
        topics:["Assembly x86/x64 بعمق","C Language للـ Security","Memory Layout (Stack, Heap, BSS, Text)","ELF Format وPE Format","GDB Debugging كامل","Pwndbg / Peda / GEF Plugins","System Calls وlibc","File Descriptors","Stack Memory بعمق","Calling Conventions"],
        resources:[
          {title:"pwn.college — Free Binary Exploitation (Arizona State Uni)", type:"lab", lang:"en", url:"https://pwn.college/"},
          {title:"GDB — GNU Debugger Docs", type:"article", lang:"en", url:"https://www.gnu.org/software/gdb/documentation/"},
          {title:"pwndbg — GDB Plugin (GitHub)", type:"lab", lang:"en", url:"https://github.com/pwndbg/pwndbg"},
          {title:"OpenSecurityTraining2 — Free RE Courses", type:"video", lang:"en", url:"https://opensecuritytraining.info/"},
          {title:"CS:APP — Bryant & O'Hallaron (Reference Book)", type:"book", lang:"en", url:"https://csapp.cs.cmu.edu/"},
        ]
      },
      {
        id:"pwn2", name:"Phase 2 — Exploitation Techniques", emoji:"💥",
        topics:["Stack Buffer Overflow — Classic","Return-to-libc (ret2libc)","ROP Chains (Return Oriented Programming)","Format String Vulnerabilities","Heap Exploitation (Use After Free, Double Free, Heap Overflow)","PIE وASLR Bypass","Stack Canary Bypass","GOT / PLT Overwrite","Shellcode Writing","One-gadget وROPgadget"],
        resources:[
          {title:"pwn.college — Full Exploitation Curriculum (مجاني)", type:"lab", lang:"en", url:"https://pwn.college/"},
          {title:"ROPgadget — ROP Gadgets Finder (GitHub)", type:"lab", lang:"en", url:"https://github.com/JonathanSalwan/ROPgadget"},
          {title:"pwntools — CTF Exploit Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/Gallopsled/pwntools"},
          {title:"LiveOverflow — Binary Exploitation YouTube (مجاني)", type:"video", lang:"en", url:"https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNfHkzyeN"},
          {title:"ir0nstone — Binary Exploitation Notes (مجاني)", type:"article", lang:"en", url:"https://ir0nstone.gitbook.io/notes/"},
          {title:"exploit.education — Vulnerable VMs (مجاني)", type:"lab", lang:"en", url:"https://exploit.education/"},
          {title:"PicoCTF — Binary Exploitation Challenges (مجاني)", type:"lab", lang:"en", url:"https://picoctf.org/"},
        ]
      }
    ]
  },
  social: {
    id:"social", name:"Social Engineering", nameEn:"Social Engineering & Phishing", icon:"🎭",
    color:"#f97316", colorBg:"rgba(249,115,22,0.15)", duration:"1–2 أشهر",
    desc:"هندسة اجتماعية، Phishing، Red Team Operations",
    phases:[
      {
        id:"soc1", name:"Phase 1 — Social Engineering Fundamentals", emoji:"🎯",
        topics:["Psychology of Social Engineering","Pretexting وبناء القصة","Phishing Email Crafting","Spear Phishing vs Whaling","Vishing (Voice Phishing)","Smishing (SMS Phishing)","Baiting وTailgating","OSINT for Target Profiling","GoPhish Framework","SE Toolkit (SET)"],
        resources:[
          {title:"SET — Social Engineering Toolkit (GitHub)", type:"lab", lang:"en", url:"https://github.com/trustedsec/social-engineer-toolkit"},
          {title:"GoPhish — Phishing Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/gophish/gophish"},
          {title:"TryHackMe — Phishing Rooms", type:"lab", lang:"en", url:"https://tryhackme.com/hacktivities?tab=search&value=phishing"},
          {title:"HackTricks — Phishing Methodology", type:"article", lang:"en", url:"https://book.hacktricks.xyz/generic-methodologies-and-resources/phishing-methodology"},
          {title:"Evilginx3 — Advanced Phishing Framework (GitHub)", type:"lab", lang:"en", url:"https://github.com/kgretzky/evilginx2"},
        ]
      }
    ]
  }
};

// Merge all tracks
Object.assign(TRACKS, NEW_TRACKS);

const TRACK_ORDER = ["foundations","web","mobile","api","network","ad","malware","ctf","cloud","osint","web3","dfir","wireless","crypto","pwn","social"];
const TRACK_COLORS = {
  foundations:"#3b82f6", web:"#10b981", mobile:"#f59e0b", api:"#8b5cf6",
  network:"#ef4444", ad:"#dc2626", malware:"#06b6d4", ctf:"#f97316",
  cloud:"#0ea5e9", osint:"#a855f7", web3:"#f59e0b", dfir:"#22d3ee",
  wireless:"#84cc16", crypto:"#e11d48", pwn:"#dc2626", social:"#f97316"
};
const ROUTINE_COLORS = {
  prayer:"rgba(250,204,21,0.15)", islamic:"rgba(52,211,153,0.15)", quran:"rgba(52,211,153,0.2)",
  study:"rgba(59,130,246,0.12)", health:"rgba(34,197,94,0.12)", break:"rgba(148,163,184,0.08)",
  project:"rgba(168,85,247,0.12)", community:"rgba(236,72,153,0.12)", personal:"rgba(249,115,22,0.1)"
};
const ROUTINE_TEXT = {
  prayer:"#fde047", islamic:"#34d399", quran:"#6ee7b7",
  study:"#60a5fa", health:"#4ade80", break:"#94a3b8",
  project:"#c084fc", community:"#f472b6", personal:"#fb923c"
};

const PRIORITY_COLORS = { high:"#ef4444", medium:"#f59e0b", low:"#10b981" };
const PRIORITY_BG = { high:"rgba(239,68,68,0.12)", medium:"rgba(245,158,11,0.12)", low:"rgba(16,185,129,0.12)" };

function CheckBox({ checked, onChange }) {
  return (
    <div className="check-box" style={checked ? {background:"#00ff88",borderColor:"#00ff88"} : {}} onClick={onChange}>
      {checked && <span style={{color:"#050810",fontSize:11,fontWeight:900}}>✓</span>}
    </div>
  );
}

function Badge({ type, lang }) {
  const typeClass = `tag-${type}`;
  const langClass = lang ? `tag-${lang}` : "";
  return (
    <span style={{display:"inline-flex",gap:4,alignItems:"center"}}>
      <span className={`badge ${typeClass}`}>
        {type==="video"?"▶ Video":type==="lab"?"⚗ Lab":type==="article"?"📄 Article":type==="writeup"?"✍ Writeup":type==="book"?"📚 Book":"🔗 Link"}
      </span>
      {lang && <span className={`badge ${langClass}`}>{lang==="ar"?"🇸🇦 AR":"🌐 EN"}</span>}
    </span>
  );
}

function ProgressRing({ pct, size=48, stroke=4, color="#00ff88" }) {
  const r = (size-stroke*2)/2;
  const circ = 2*Math.PI*r;
  const offset = circ - (pct/100)*circ;
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{transition:"stroke-dashoffset 0.5s ease"}}/>
    </svg>
  );
}

export default function CyberHub() {
  const [page, setPage] = useState("dashboard");
  const [trackId, setTrackId] = useState("web");
  const [checked, setChecked] = useState({});
  const [todos, setTodos] = useState(INIT_TODOS);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newTrack, setNewTrack] = useState("general");
  const [expandedPhases, setExpandedPhases] = useState({"web1":true});
  const [todoFilter, setTodoFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [resourceTab, setResourceTab] = useState("topics");
  const [routineFilter, setRoutineFilter] = useState("all");

  const toggleTopic = (k) => setChecked(p => ({...p,[k]:!p[k]}));
  const togglePhase = (id) => setExpandedPhases(p => ({...p,[id]:!p[id]}));

  const getProgress = (tid) => {
    const t = TRACKS[tid]; if(!t) return 0;
    let total=0,done=0;
    t.phases.forEach(ph => {
      ph.topics.forEach((_,i) => {
        total++;
        if(checked[`${tid}-${ph.id}-${i}`]) done++;
      });
    });
    return total ? Math.round((done/total)*100) : 0;
  };

  const overall = Math.round(TRACK_ORDER.reduce((s,id)=>s+getProgress(id),0)/TRACK_ORDER.length);
  const totalTopics = TRACK_ORDER.reduce((s,id)=>s+TRACKS[id].phases.reduce((ss,ph)=>ss+ph.topics.length,0),0);
  const doneTopics = TRACK_ORDER.reduce((s,id)=>s+TRACKS[id].phases.reduce((ss,ph)=>ss+ph.topics.filter((_,i)=>checked[`${id}-${ph.id}-${i}`]).length,0),0);

  const doneTodos = todos.filter(t=>t.done).length;

  const filteredTodos = todos.filter(t => {
    if(todoFilter==="done") return t.done;
    if(todoFilter==="pending") return !t.done;
    if(todoFilter==="high") return t.priority==="high" && !t.done;
    return true;
  });

  const addTodo = () => {
    if(!newTask.trim()) return;
    setTodos(p=>[...p,{id:Date.now(),text:newTask,track:newTrack,priority:newPriority,done:false,date:"اليوم"}]);
    setNewTask("");
  };
  const toggleTodo = (id) => setTodos(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t));
  const deleteTodo = (id) => setTodos(p=>p.filter(t=>t.id!==id));

  const currentTrack = TRACKS[trackId];

  // ============ SIDEBAR ============
  const Sidebar = () => (
    <div className="sidebar-glow" style={{
      width:sidebarOpen?260:72, minHeight:"100vh", background:"linear-gradient(180deg,#060c1a 0%,#040810 100%)",
      borderRight:"1px solid rgba(0,255,136,0.1)", display:"flex", flexDirection:"column",
      padding:"20px 12px", gap:6, transition:"width 0.3s ease", position:"fixed", top:0, left:0, zIndex:100, overflowY:"auto", overflowX:"hidden"
    }}>
      {/* Logo */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"0 4px"}}>
        <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>setSidebarOpen(p=>!p)}>
          <span style={{fontSize:16,color:"#050810",fontWeight:900}}>⚡</span>
        </div>
        {sidebarOpen && <div>
          <div style={{color:"#00ff88",fontWeight:700,fontSize:14,fontFamily:"'Fira Code',monospace"}} className="glow">CyberHub</div>
          <div style={{color:"#475569",fontSize:11}}>Security Roadmap</div>
        </div>}
      </div>

      {/* Main Nav */}
      <div style={{fontSize:10,color:"#334155",padding:"4px 8px",marginTop:4,fontFamily:"'Fira Code',monospace",display:sidebarOpen?"block":"none"}}>NAVIGATION</div>
      {[
        {id:"dashboard",icon:"📊",label:"Dashboard"},
        {id:"tracks",icon:"🗺️",label:"Roadmaps"},
        {id:"todo",icon:"✅",label:"Todo List"},
        {id:"routine",icon:"🕐",label:"الروتين اليومي"},
        {id:"resources",icon:"📚",label:"Resources Hub"},
      ].map(item=>(
        <div key={item.id} className={`nav-item ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)} title={item.label}>
          <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
          {sidebarOpen && <span style={{fontFamily:"'Cairo',sans-serif",fontSize:13}}>{item.label}</span>}
        </div>
      ))}

      {/* Tracks */}
      {sidebarOpen && <div style={{fontSize:10,color:"#334155",padding:"4px 8px",marginTop:8,fontFamily:"'Fira Code',monospace"}}>TRACKS</div>}
      {TRACK_ORDER.map(tid=>{
        const t=TRACKS[tid];
        const pct=getProgress(tid);
        return (
          <div key={tid} className={`track-item ${trackId===tid&&page==="tracks"?"active":""}`}
            onClick={()=>{setTrackId(tid);setPage("tracks")}} title={t.nameEn}>
            <span style={{fontSize:14,flexShrink:0}}>{t.icon}</span>
            {sidebarOpen && <>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontFamily:"'Fira Code',monospace",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.name}</div>
                <div className="progress-bar" style={{marginTop:2}}>
                  <div className="progress-fill" style={{width:`${pct}%`,background:t.color}}/>
                </div>
              </div>
              <span style={{fontSize:10,color:t.color,fontFamily:"'Fira Code',monospace",flexShrink:0}}>{pct}%</span>
            </>}
          </div>
        );
      })}

      {/* Progress summary at bottom */}
      {sidebarOpen && (
        <div style={{marginTop:"auto",padding:12,background:"rgba(0,255,136,0.05)",borderRadius:8,border:"1px solid rgba(0,255,136,0.1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <ProgressRing pct={overall} size={36} stroke={3}/>
            <div>
              <div style={{color:"#00ff88",fontSize:14,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{overall}%</div>
              <div style={{color:"#475569",fontSize:10}}>Overall</div>
            </div>
          </div>
          <div style={{color:"#64748b",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{doneTopics}/{totalTopics} topics</div>
        </div>
      )}
    </div>
  );

  // ============ DASHBOARD ============
  const Dashboard = () => (
    <div className="slide-in">
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.04))",border:"1px solid rgba(0,255,136,0.15)",borderRadius:16,padding:"28px 32px",marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:200,height:200,background:"radial-gradient(circle,rgba(0,255,136,0.08),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace",marginBottom:4}}>// welcome back, 0xlegacy</div>
        <h1 style={{color:"#e2e8f0",fontSize:28,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>
          طريقك للاحتراف في الأمن السيبراني 🛡️
        </h1>
        <p style={{color:"#94a3b8",fontSize:14,fontFamily:"'Cairo',sans-serif",maxWidth:500}}>
          خطة متكاملة من الصفر للاحتراف — 16 تراك، روتين يومي إسلامي، موارد عربية وإنجليزية
        </p>
        <div style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"}}>
          <button className="btn-primary" onClick={()=>setPage("tracks")}>🗺️ ابدأ التعلم</button>
          <button className="btn-ghost" onClick={()=>setPage("routine")}>📅 الروتين اليومي</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:24}}>
        {[
          {label:"التقدم الكلي",value:`${overall}%`,icon:"📊",color:"#00ff88",sub:`${doneTopics}/${totalTopics} موضوع`},
          {label:"Tracks متاحة",value:"16",icon:"🗺️",color:"#00d4ff",sub:"من Foundations لـ Web3 & Pwn"},
          {label:"المهام المكتملة",value:`${doneTodos}/${todos.length}`,icon:"✅",color:"#f59e0b",sub:`${todos.filter(t=>!t.done).length} متبقية`},
          {label:"الموارد",value:"150+",icon:"📚",color:"#8b5cf6",sub:"فيديو، مقال، Lab، Writeup"},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <span style={{fontSize:24}}>{s.icon}</span>
              <span style={{color:s.color,fontSize:22,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{s.value}</span>
            </div>
            <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif",marginTop:8}}>{s.label}</div>
            <div style={{color:"#475569",fontSize:11,marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tracks Grid */}
      <h2 style={{color:"#e2e8f0",fontSize:18,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:"#00ff88"}}>◈</span> التراكات المتاحة
      </h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginBottom:28}}>
        {TRACK_ORDER.map(tid=>{
          const t=TRACKS[tid];
          const pct=getProgress(tid);
          return (
            <div key={tid} className="card" style={{padding:18,cursor:"pointer"}} onClick={()=>{setTrackId(tid);setPage("tracks")}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:40,height:40,borderRadius:10,background:t.colorBg,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${t.color}30`,fontSize:20}}>
                  {t.icon}
                </div>
                <div>
                  <div style={{color:"#e2e8f0",fontSize:14,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{t.name}</div>
                  <div style={{color:"#475569",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{t.duration}</div>
                </div>
                <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <ProgressRing pct={pct} size={40} stroke={3} color={t.color}/>
                  <span style={{color:t.color,fontSize:10,fontFamily:"'Fira Code',monospace",marginTop:2}}>{pct}%</span>
                </div>
              </div>
              <p style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif",marginBottom:12}}>{t.desc}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${t.color},${t.color}88)`}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                <span style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{t.phases.length} phases</span>
                <span style={{color:"#475569",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{t.phases.reduce((s,p)=>s+p.topics.length,0)} topics</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Todo Preview */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div>
          <h2 style={{color:"#e2e8f0",fontSize:16,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#f59e0b"}}>◈</span> مهام اليوم
          </h2>
          {todos.filter(t=>t.date==="اليوم"&&!t.done).slice(0,4).map(t=>(
            <div key={t.id} className="todo-item" style={{cursor:"pointer"}} onClick={()=>toggleTodo(t.id)}>
              <CheckBox checked={t.done} onChange={()=>toggleTodo(t.id)}/>
              <span style={{color:"#cbd5e1",fontSize:13,fontFamily:"'Cairo',sans-serif",flex:1}}>{t.text}</span>
              <span style={{width:8,height:8,borderRadius:"50%",background:PRIORITY_COLORS[t.priority],flexShrink:0}}/>
            </div>
          ))}
          <button className="btn-ghost" style={{marginTop:8,width:"100%",fontSize:12}} onClick={()=>setPage("todo")}>
            عرض كل المهام →
          </button>
        </div>

        <div>
          <h2 style={{color:"#e2e8f0",fontSize:16,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#06b6d4"}}>◈</span> وقت الصلاة اليوم
          </h2>
          {ROUTINE.filter(r=>r.type==="prayer").map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:"rgba(250,204,21,0.06)",border:"1px solid rgba(250,204,21,0.1)",marginBottom:6}}>
              <span style={{fontSize:16}}>{r.icon}</span>
              <span style={{color:"#fde047",fontSize:13,fontFamily:"'Cairo',sans-serif",flex:1}}>{r.label}</span>
              <span style={{color:"#78716c",fontSize:12,fontFamily:"'Fira Code',monospace"}}>{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ TRACKS PAGE ============
  const TracksPage = () => (
    <div className="slide-in">
      {/* Track Selector */}
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {TRACK_ORDER.map(tid=>{
          const t=TRACKS[tid];
          return (
            <button key={tid} onClick={()=>{setTrackId(tid);setExpandedPhases({})}}
              style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${trackId===tid?t.color:"rgba(255,255,255,0.1)"}`,
                background:trackId===tid?t.colorBg:"transparent",color:trackId===tid?t.color:"#94a3b8",
                cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:13,transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}}>
              <span>{t.icon}</span>{t.name}
            </button>
          );
        })}
      </div>

      {/* Track Header */}
      <div style={{background:`linear-gradient(135deg,${currentTrack.colorBg},transparent)`,border:`1px solid ${currentTrack.color}25`,
        borderRadius:14,padding:"20px 24px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:4}}>// track</div>
            <h1 style={{color:"#e2e8f0",fontSize:24,fontWeight:900,fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",gap:10}}>
              {currentTrack.icon} {currentTrack.nameEn}
            </h1>
            <p style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",marginTop:4}}>{currentTrack.desc}</p>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              <span style={{color:currentTrack.color,fontSize:12,fontFamily:"'Fira Code',monospace"}}>⏱ {currentTrack.duration}</span>
              <span style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace"}}>📚 {currentTrack.phases.length} phases</span>
              <span style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace"}}>🎯 {currentTrack.phases.reduce((s,p)=>s+p.topics.length,0)} topics</span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <ProgressRing pct={getProgress(trackId)} size={70} stroke={5} color={currentTrack.color}/>
            <span style={{color:currentTrack.color,fontSize:18,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{getProgress(trackId)}%</span>
            <span style={{color:"#475569",fontSize:11}}>مكتمل</span>
          </div>
        </div>
        <div className="progress-bar" style={{height:8,marginTop:14}}>
          <div className="progress-fill" style={{width:`${getProgress(trackId)}%`,background:`linear-gradient(90deg,${currentTrack.color},${currentTrack.color}aa)`}}/>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[{id:"topics",label:"📋 المواضيع"},{id:"resources",label:"📚 الموارد"}].map(tab=>(
          <button key={tab.id} onClick={()=>setResourceTab(tab.id)}
            style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${resourceTab===tab.id?currentTrack.color:"rgba(255,255,255,0.1)"}`,
              background:resourceTab===tab.id?currentTrack.colorBg:"transparent",color:resourceTab===tab.id?currentTrack.color:"#94a3b8",
              cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:13}}>
            {tab.label}
          </button>
        ))}
        <button className="btn-ghost" style={{marginLeft:"auto",fontSize:12}}
          onClick={()=>{
            const keys={};
            currentTrack.phases.forEach(ph=>ph.topics.forEach((_,i)=>{keys[`${trackId}-${ph.id}-${i}`]=true;}));
            setChecked(p=>({...p,...keys}));
          }}>
          ✓ وضع علامة على الكل
        </button>
      </div>

      {resourceTab==="topics" ? (
        /* Phases & Topics */
        currentTrack.phases.map((ph,pi) => {
          const phDone = ph.topics.filter((_,i)=>checked[`${trackId}-${ph.id}-${i}`]).length;
          const phPct = Math.round((phDone/ph.topics.length)*100);
          const isOpen = expandedPhases[ph.id];
          return (
            <div key={ph.id} className="phase-card" style={{borderColor:isOpen?`${currentTrack.color}30`:"rgba(255,255,255,0.06)"}}>
              <div className="phase-header" onClick={()=>togglePhase(ph.id)}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>{ph.emoji}</span>
                  <div>
                    <div style={{color:"#e2e8f0",fontSize:14,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{ph.name}</div>
                    <div style={{color:"#475569",fontSize:11,fontFamily:"'Fira Code',monospace"}}>{phDone}/{ph.topics.length} topics • {phPct}%</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:80}}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width:`${phPct}%`,background:currentTrack.color}}/>
                    </div>
                  </div>
                  <span style={{color:"#64748b",fontSize:16,transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s"}}>▼</span>
                </div>
              </div>
              {isOpen && (
                <div style={{padding:"12px 18px"}}>
                  {ph.topics.map((topic,i)=>{
                    const k=`${trackId}-${ph.id}-${i}`;
                    return (
                      <div key={i} className="topic-item" onClick={()=>toggleTopic(k)}>
                        <CheckBox checked={!!checked[k]} onChange={()=>toggleTopic(k)}/>
                        <span style={{color:checked[k]?"#475569":"#cbd5e1",fontSize:13,fontFamily:"'Cairo',sans-serif",textDecoration:checked[k]?"line-through":"none"}}>
                          {topic}
                        </span>
                      </div>
                    );
                  })}
                  {/* Phase Resources Preview */}
                  <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <div style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:8}}>// resources for this phase</div>
                    {ph.resources.map((r,i)=>(
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                        <div className="resource-card">
                          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                            <div style={{flex:1,color:"#cbd5e1",fontSize:13,fontFamily:"'Cairo',sans-serif"}}>{r.title}</div>
                            <div style={{display:"flex",gap:6,flexShrink:0}}>
                              <Badge type={r.type} lang={r.lang}/>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        /* All Resources */
        <div>
          {currentTrack.phases.map((ph,pi)=>(
            <div key={pi} style={{marginBottom:20}}>
              <div style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                <span>{ph.emoji}</span> {ph.name}
              </div>
              {ph.resources.map((r,i)=>(
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="resource-card" style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                      <div style={{flex:1}}>
                        <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>{r.title}</div>
                        <div style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",wordBreak:"break-all"}}>{r.url}</div>
                      </div>
                      <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap"}}>
                        <Badge type={r.type} lang={r.lang}/>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ============ TODO ============
  const TodoPage = () => (
    <div className="slide-in">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{color:"#e2e8f0",fontSize:22,fontWeight:900,fontFamily:"'Cairo',sans-serif"}}>✅ قائمة المهام</h1>
          <p style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace"}}>{doneTodos}/{todos.length} مكتمل</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[{id:"all",label:"الكل"},{id:"pending",label:"متبقية"},{id:"done",label:"مكتملة"},{id:"high",label:"⚡ عاجل"}].map(f=>(
            <button key={f.id} onClick={()=>setTodoFilter(f.id)}
              style={{padding:"6px 14px",borderRadius:6,border:`1px solid ${todoFilter===f.id?"#00ff88":"rgba(255,255,255,0.1)"}`,
                background:todoFilter===f.id?"rgba(0,255,136,0.1)":"transparent",color:todoFilter===f.id?"#00ff88":"#94a3b8",
                cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Todo */}
      <div style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.15)",borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{color:"#64748b",fontSize:11,fontFamily:"'Fira Code',monospace",marginBottom:10}}>// إضافة مهمة جديدة</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <input type="text" placeholder="وصف المهمة..." value={newTask} onChange={e=>setNewTask(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addTodo()}
            style={{flex:"1 1 200px",minWidth:0,direction:"rtl"}}/>
          <select value={newPriority} onChange={e=>setNewPriority(e.target.value)} style={{width:110}}>
            <option value="high">⚡ عاجل</option>
            <option value="medium">📌 متوسط</option>
            <option value="low">🟢 منخفض</option>
          </select>
          <select value={newTrack} onChange={e=>setNewTrack(e.target.value)} style={{width:130}}>
            <option value="general">🌐 عام</option>
            {TRACK_ORDER.map(tid=><option key={tid} value={tid}>{TRACKS[tid].icon} {TRACKS[tid].name}</option>)}
          </select>
          <button className="btn-primary" onClick={addTodo}>+ إضافة</button>
        </div>
      </div>

      {/* Todo List */}
      {filteredTodos.length===0 ? (
        <div style={{textAlign:"center",padding:"40px 20px",color:"#334155"}}>
          <div style={{fontSize:40,marginBottom:10}}>✅</div>
          <div style={{fontFamily:"'Cairo',sans-serif"}}>لا توجد مهام هنا</div>
        </div>
      ) : filteredTodos.map(t=>(
        <div key={t.id} className={`todo-item ${t.done?"done":""}`}>
          <CheckBox checked={t.done} onChange={()=>toggleTodo(t.id)}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:t.done?"#475569":"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",
              textDecoration:t.done?"line-through":"none",wordBreak:"break-word"}}>{t.text}</div>
            <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:"#64748b",fontFamily:"'Fira Code',monospace"}}>{t.date}</span>
              {t.track!=="general" && TRACKS[t.track] && (
                <span style={{fontSize:11,color:TRACKS[t.track].color,fontFamily:"'Fira Code',monospace"}}>{TRACKS[t.track].icon} {TRACKS[t.track].name}</span>
              )}
            </div>
          </div>
          <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontFamily:"'Fira Code',monospace",
            background:PRIORITY_BG[t.priority],color:PRIORITY_COLORS[t.priority],border:`1px solid ${PRIORITY_COLORS[t.priority]}40`,flexShrink:0}}>
            {t.priority==="high"?"⚡ عاجل":t.priority==="medium"?"📌 متوسط":"🟢 منخفض"}
          </span>
          <button onClick={()=>deleteTodo(t.id)} style={{background:"transparent",border:"none",color:"#334155",cursor:"pointer",fontSize:16,padding:"0 4px",flexShrink:0}}
            title="حذف">✕</button>
        </div>
      ))}

      {/* Progress Summary */}
      <div style={{marginTop:20,background:"rgba(0,0,0,0.3)",borderRadius:12,padding:16,border:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {[
            {label:"إجمالي",val:todos.length,color:"#94a3b8"},
            {label:"مكتملة",val:doneTodos,color:"#10b981"},
            {label:"متبقية",val:todos.filter(t=>!t.done).length,color:"#f59e0b"},
            {label:"عاجلة",val:todos.filter(t=>t.priority==="high"&&!t.done).length,color:"#ef4444"},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:"center",flex:1,minWidth:60}}>
              <div style={{color:s.color,fontSize:22,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{s.val}</div>
              <div style={{color:"#475569",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ ROUTINE ============
  const RoutinePage = () => (
    <div className="slide-in">
      <div style={{marginBottom:20}}>
        <h1 style={{color:"#e2e8f0",fontSize:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",gap:8}}>
          🕐 الروتين اليومي المتكامل
        </h1>
        <p style={{color:"#64748b",fontSize:13,fontFamily:"'Cairo',sans-serif",marginTop:4}}>
          روتين يومي محكم يجمع بين الجانب الإسلامي والتعلم المنظم — مستوحى من هدي النبي ﷺ
        </p>
      </div>

      {/* Ramadan & Friday Special */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
        <div style={{background:"linear-gradient(135deg,rgba(250,204,21,0.08),rgba(52,211,153,0.04))",border:"1px solid rgba(250,204,21,0.2)",borderRadius:12,padding:14}}>
          <div style={{color:"#fde047",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>🕌 يوم الجمعة — مميزات خاصة</div>
          <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>
            ✦ قراءة سورة الكهف كاملة صباحاً<br/>
            ✦ التبكير إلى صلاة الجمعة<br/>
            ✦ الإكثار من الصلاة على النبي ﷺ<br/>
            ✦ الدعاء في ساعة الإجابة (بعد العصر)<br/>
            ✦ وقت مخفف للتعلم — يوم أسري
          </div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.1),rgba(250,204,21,0.04))",border:"1px solid rgba(52,211,153,0.2)",borderRadius:12,padding:14}}>
          <div style={{color:"#34d399",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:6}}>🌙 رمضان المبارك — تعديل الجدول</div>
          <div style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>
            ✦ السحور + التعلم قبل الفجر مباشرة<br/>
            ✦ النوم بعد الفجر → الاستيقاظ الضحى<br/>
            ✦ تخفيف جلسات التعلم أثناء الصيام<br/>
            ✦ الاستثمار في تلاوة القرآن وختمه<br/>
            ✦ التراويح + القيام من أهم الأولويات
          </div>
        </div>
      </div>

      {/* Islamic Reminder */}
      <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.08),rgba(250,204,21,0.04))",border:"1px solid rgba(52,211,153,0.2)",borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <span style={{fontSize:28}}>🌙</span>
          <div>
            <div style={{color:"#34d399",fontSize:14,fontWeight:700,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>تذكير إسلامي</div>
            <div style={{color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif",lineHeight:1.7}}>
              «إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ» — الإتقان في التعلم عبادة. ابدأ كل جلسة بالبسملة واجعل نيتك خالصة.
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {[
          {id:"all",label:"📋 الكل",color:"#94a3b8"},
          {id:"prayer",label:"🕌 الصلوات",color:"#fde047"},
          {id:"quran",label:"📖 القرآن",color:"#6ee7b7"},
          {id:"islamic",label:"📿 الأذكار",color:"#34d399"},
          {id:"study",label:"💻 التعلم",color:"#60a5fa"},
          {id:"health",label:"🏃 الصحة",color:"#4ade80"},
        ].map(f=>(
          <button key={f.id} onClick={()=>setRoutineFilter(f.id)}
            style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${routineFilter===f.id?f.color:"rgba(255,255,255,0.08)"}`,
              background:routineFilter===f.id?`${f.color}18`:"transparent",color:routineFilter===f.id?f.color:"#64748b",
              cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:12}}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{position:"relative",paddingLeft:16}}>
        <div style={{position:"absolute",left:20,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#00ff8822,#00d4ff22)",borderRadius:1}}/>
        {ROUTINE.filter(r=>routineFilter==="all"||r.type===routineFilter).map((r,i)=>(
          <div key={i} className="routine-row" style={{paddingLeft:32,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:14,width:20,height:20,borderRadius:"50%",
              background:ROUTINE_COLORS[r.type]||"rgba(148,163,184,0.1)",border:`2px solid ${ROUTINE_TEXT[r.type]||"#64748b"}44`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,zIndex:1}}>
              <span>{r.icon}</span>
            </div>
            <div style={{flex:1,background:ROUTINE_COLORS[r.type]||"rgba(0,0,0,0)",padding:"10px 14px",borderRadius:8,
              border:`1px solid ${ROUTINE_TEXT[r.type]||"#64748b"}20`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{color:"#475569",fontSize:11,fontFamily:"'Fira Code',monospace",flexShrink:0}}>{r.time}</span>
                <span style={{color:ROUTINE_TEXT[r.type]||"#94a3b8",fontSize:13,fontWeight:600,fontFamily:"'Cairo',sans-serif"}}>{r.label}</span>
              </div>
              <div style={{color:"#64748b",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{r.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Principles */}
      <div style={{marginTop:28,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:20}}>
        <h3 style={{color:"#e2e8f0",fontSize:16,fontFamily:"'Cairo',sans-serif",marginBottom:14}}>💡 مبادئ اليوم الناجح</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10}}>
          {[
            {icon:"🌙",text:"ابدأ يومك بذكر الله — البركة في الصباح"},
            {icon:"🎯",text:"حدد 3 أهداف رئيسية كل يوم فقط لا أكثر"},
            {icon:"⏱️",text:"تقنية Pomodoro (25 دقيقة تركيز + 5 راحة)"},
            {icon:"📝",text:"سجّل كل ما تتعلمه في Obsidian/Notion"},
            {icon:"🔄",text:"المراجعة المتباعدة (Spaced Repetition) تحفظ المعلومة"},
            {icon:"🤝",text:"شارك ما تتعلمه — التعليم أفضل طريق للحفظ"},
            {icon:"💻",text:"لا يوم بلا Lab واحد على الأقل — التطبيق العملي أساسي"},
            {icon:"📖",text:"اقرأ Writeup واحد يومياً — تعلم من تجارب الآخرين"},
            {icon:"🌐",text:"ابنِ حضورك على GitHub وTwitter الأمني"},
            {icon:"🤲",text:"ختم يومك بالشكر والاستغفار — بركة في الوقت"},
            {icon:"😴",text:"8 ساعات نوم — الدماغ يعالج المعلومات أثناء النوم"},
            {icon:"🚫",text:"لا للمقارنة بالآخرين — قارن نفسك بمن كنت أمس فقط"},
          ].map((p,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 12px",background:"rgba(255,255,255,0.02)",borderRadius:8}}>
              <span style={{fontSize:16,flexShrink:0}}>{p.icon}</span>
              <span style={{color:"#94a3b8",fontSize:12,fontFamily:"'Cairo',sans-serif"}}>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ RESOURCES HUB ============
  const ResourcesHub = () => {
    const [resFilter, setResFilter] = useState("all");
    const [resLang, setResLang] = useState("all");
    const [resTrack, setResTrack] = useState("all");
    const allRes = [];
    TRACK_ORDER.forEach(tid=>{
      TRACKS[tid].phases.forEach(ph=>{
        ph.resources.forEach(r=>allRes.push({...r,trackId:tid,phase:ph.name}));
      });
    });
    const filtered = allRes.filter(r=>{
      if(resFilter!=="all"&&r.type!==resFilter) return false;
      if(resLang!=="all"&&r.lang!==resLang) return false;
      if(resTrack!=="all"&&r.trackId!==resTrack) return false;
      return true;
    });
    return (
      <div className="slide-in">
        <h1 style={{color:"#e2e8f0",fontSize:22,fontWeight:900,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>
          📚 مكتبة الموارد الشاملة
        </h1>
        <p style={{color:"#64748b",fontSize:12,fontFamily:"'Fira Code',monospace",marginBottom:20}}>
          {allRes.length}+ مورد — فيديوهات، مقالات، Labs، Writeups
        </p>

        {/* Stats */}
        <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
          {[
            {type:"video",label:"Videos",color:"#ef4444"},
            {type:"lab",label:"Labs",color:"#10b981"},
            {type:"article",label:"Articles",color:"#f97316"},
            {type:"writeup",label:"Writeups",color:"#ec4899"},
            {type:"book",label:"Books",color:"#eab308"},
          ].map(s=>(
            <div key={s.type} style={{padding:"8px 16px",borderRadius:8,background:`${s.color}12`,border:`1px solid ${s.color}25`,textAlign:"center"}}>
              <div style={{color:s.color,fontSize:18,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{allRes.filter(r=>r.type===s.type).length}</div>
              <div style={{color:"#64748b",fontSize:11}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          <select value={resFilter} onChange={e=>setResFilter(e.target.value)} style={{width:130,fontSize:12}}>
            <option value="all">📋 كل الأنواع</option>
            <option value="video">▶ Videos</option>
            <option value="lab">⚗ Labs</option>
            <option value="article">📄 Articles</option>
            <option value="writeup">✍ Writeups</option>
            <option value="book">📚 Books</option>
          </select>
          <select value={resLang} onChange={e=>setResLang(e.target.value)} style={{width:120,fontSize:12}}>
            <option value="all">🌐 كل اللغات</option>
            <option value="ar">🇸🇦 عربي</option>
            <option value="en">🌐 English</option>
          </select>
          <select value={resTrack} onChange={e=>setResTrack(e.target.value)} style={{width:150,fontSize:12}}>
            <option value="all">🗺️ كل التراكات</option>
            {TRACK_ORDER.map(tid=><option key={tid} value={tid}>{TRACKS[tid].icon} {TRACKS[tid].name}</option>)}
          </select>
          <span style={{color:"#475569",fontSize:12,fontFamily:"'Fira Code',monospace",display:"flex",alignItems:"center",marginLeft:8}}>
            {filtered.length} نتيجة
          </span>
        </div>

        {/* Resources Grid */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map((r,i)=>(
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <div className="resource-card" style={{padding:"12px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:"#e2e8f0",fontSize:13,fontFamily:"'Cairo',sans-serif",marginBottom:4}}>{r.title}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      {r.trackId!=="general"&&TRACKS[r.trackId]&&(
                        <span style={{fontSize:11,color:TRACKS[r.trackId].color,fontFamily:"'Fira Code',monospace"}}>
                          {TRACKS[r.trackId].icon} {TRACKS[r.trackId].name}
                        </span>
                      )}
                      <span style={{color:"#334155",fontSize:10,fontFamily:"'Fira Code',monospace"}}>{r.phase}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    <Badge type={r.type} lang={r.lang}/>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const contentMargin = sidebarOpen ? 260 : 72;

  return (
    <div className="matrix-bg" style={{fontFamily:"'Fira Code',monospace",background:"#05080f",minHeight:"100vh",color:"#e2e8f0"}}>
      <style>{GFONTS + CSS}</style>
      <Sidebar/>
      <main style={{marginLeft:contentMargin,padding:"28px 28px 40px",maxWidth:1100,transition:"margin-left 0.3s ease"}}>
        {page==="dashboard" && <Dashboard/>}
        {page==="tracks" && <TracksPage/>}
        {page==="todo" && <TodoPage/>}
        {page==="routine" && <RoutinePage/>}
        {page==="resources" && <ResourcesHub/>}
      </main>
    </div>
  );
}
