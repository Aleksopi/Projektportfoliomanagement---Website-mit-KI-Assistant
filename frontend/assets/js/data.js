/* ============================================================
   DATA · Single source of truth
   Pool: 73 strategische Projekte + 3 gesetzliche Pflichtprojekte
   = 76 Projekte gesamt.

   REGEL: pro Portfolio-Ausrichtung sind genau 13 Projekte aktiv
   (10 strategische + 3 gesetzliche). Die 3 gesetzlichen
   (P-G1, P-G2, P-G8) sind in jeder Ausrichtung automatisch aktiv.
   ============================================================ */

window.AREAS = [
  {id:'ki',name:'KI-Integration in Kernprodukte',short:'KI-Integration',color:'#9B8CFF',icon:'⌬',
   blurb:'Eigenständige Copiloten in allen Office-Line Produkten — rechtssicher und produktiv.'},
  {id:'pl',name:'Plattformstrategie & Ökosystem',short:'Plattform & Ökosystem',color:'#00C49A',icon:'◉',
   blurb:'Cross-Selling, Produkt-Integration und Multi-Marken-Ökosystem entlang Haufe·Lexware·Akademie.'},
  {id:'ak',name:'Digitale Weiterbildungsplattform',short:'Haufe Akademie',color:'#FF8A5C',icon:'△',
   blurb:'KI-Personalisierung, skalierbares Kursportfolio und B2B-Enterprise.'},
  {id:'ve',name:'Venture & New Business',short:'Ventures & NBO',color:'#4FB3FF',icon:'✦',
   blurb:'Strategisches Investmentportfolio plus Diversifikation durch Venture Studio.'}
];

window.RES = [
  {id:'IT',name:'IT & Engineering',fte:95},
  {id:'Produkt',name:'Produktmanagement',fte:22},
  {id:'Data',name:'Data Science & Analytics',fte:14},
  {id:'Akademie',name:'Haufe Akademie',fte:28},
  {id:'Ventures',name:'Ventures & Innovation',fte:11},
  {id:'Legal',name:'Legal & Compliance',fte:7},
  {id:'Marketing',name:'Marketing & Vertrieb',fte:19},
  {id:'UX',name:'UX & Design',fte:13}
];

window.GOALS=[
  {id:'ki-mz1',area:'ki',name:'Eigenständige Copiloten in allen Office-Line Produkten',type:'Mehrjahresziel',ags:[
    {id:'ki-j1',year:2026,name:'Erste produktive Copiloten veröffentlichen',kpis:['Mind. 3 Copiloten in Office-Line bis Jahresende','60% der Kernprozesse KI-unterstützt','Verfügbarkeit ≥ 99%','Pilotkundenbewertung ≥ 4/5'],ps:[
      {id:'P01',st:'aktiv',name:'Copilot-Engine Basisarchitektur',desc:'Aufbau der zentralen KI-Engine als Grundlage aller Copiloten im Konzern',budget:2800,res:'IT',dur:'26Q1-26Q3',deps:[],prio:'hoch'},
      {id:'P02',st:'aktiv',name:'Knowledge Graph Aufbau',desc:'Zentraler Wissensgraph für alle Fachinhalte als Copilot-Datenquelle',budget:2000,res:'IT, Content',dur:'26Q1-26Q4',deps:['P01'],prio:'hoch'},
      {id:'P03',st:'aktiv',name:'Copilot Lexware Office',desc:'KI-Assistent für Buchhaltung und Rechnungsstellung in Lexware Office',budget:1400,res:'IT, Produkt',dur:'26Q2-26Q4',deps:['P01','P02'],prio:'hoch'},
      {id:'P04',st:'aktiv',name:'Copilot Haufe Finance',desc:'KI-Assistent für Finanz- und Controlling-Prozesse',budget:1400,res:'IT, Produkt',dur:'26Q2-26Q4',deps:['P01','P02'],prio:'hoch'},
      {id:'P05',st:'backlog',name:'Copilot Haufe Personal',desc:'KI-Assistent für HR-Prozesse und Personalmanagement',budget:900,res:'IT, Produkt',dur:'26Q3-27Q1',deps:['P01','P02'],prio:'mittel'},
      {id:'P06',st:'backlog',name:'Copilot-Testing & QA Framework',desc:'Automatisiertes Testframework für alle Copilot-Ausgaben',budget:500,res:'IT',dur:'26Q1-26Q2',deps:[],prio:'hoch'},
      {id:'P07',st:'backlog',name:'Pilot-Kunden-Programm Copiloten',desc:'Strukturiertes Beta-Programm mit 50 Pilotkunden zur Validierung',budget:240,res:'Vertrieb, Produkt',dur:'26Q3-26Q4',deps:['P03'],prio:'mittel'}
    ]},
    {id:'ki-j2',year:2027,name:'Produktivitätssteigerung und volle Abdeckung',kpis:['100% der Office-Line mit Copilot','Bearbeitungszeit -20%','50% der Kunden nutzen KI','Manuelle Eingaben -30%'],ps:[
      {id:'P08',st:'backlog',name:'KI-Workflow-Automatisierung',desc:'Automatische Prozessvorschläge basierend auf Nutzerverhalten',budget:1200,res:'IT, Produkt',dur:'27Q1-27Q3',deps:['P03','P04'],prio:'hoch'},
      {id:'P09',st:'backlog',name:'Smart-Suggest Dateneingabe',desc:'Intelligente Autovervollständigung in allen Eingabefeldern',budget:560,res:'IT',dur:'27Q1-27Q2',deps:['P02'],prio:'hoch'},
      {id:'P10',st:'backlog',name:'Copilot-Nutzungsanalyse-Dashboard',desc:'Echtzeit-Dashboard für Adoptionsrate und Nutzungsintensität',budget:300,res:'IT, Data',dur:'26Q4-27Q1',deps:['P03','P04'],prio:'mittel'},
      {id:'P11',st:'backlog',name:'In-App Copilot Onboarding',desc:'Interaktives Tutorial und kontextsensitive Hilfe für alle Copiloten',budget:360,res:'UX, Produkt',dur:'27Q2-27Q3',deps:['P03'],prio:'mittel'},
      {id:'P56',st:'backlog',name:'Copilot Haufe Compliance',desc:'KI-Assistent für regulatorische Anforderungen ESG, LkSG, CSRD',budget:1400,res:'IT, Produkt',dur:'27Q1-27Q3',deps:['P01','P02'],prio:'hoch'},
      {id:'P57',st:'backlog',name:'Copilot-Performance-Optimierung',desc:'Latenz-Reduktion und Qualitätssteigerung aller Copiloten',budget:400,res:'IT',dur:'27Q2-27Q4',deps:['P03','P04','P05'],prio:'mittel'},
      {id:'P58',st:'backlog',name:'Copilot-Rollout Gesamtportfolio',desc:'Rollout auf alle verbleibenden Office-Line-Produkte, 100% Abdeckung',budget:1800,res:'IT, Produkt',dur:'27Q2-27Q4',deps:['P56'],prio:'hoch'}
    ]}
  ]},
  {id:'ki-mz2',area:'ki',name:'Rechtssicherheit des Copilot-Tax',type:'Mehrjahresziel',ags:[
    {id:'ki-j3',year:2026,name:'Compliance-Grundlagen und Transparenz',kpis:['KI-Compliance-Framework eingeführt','100% KI-Anwendungen mit Check','KI-Governance Rollen definiert'],ps:[
      {id:'P12',st:'aktiv',name:'KI-Compliance-Framework',desc:'Konzernweites KI-Compliance-Regelwerk mit Richtlinien und Governance',budget:700,res:'Legal, IT',dur:'26Q1-26Q2',deps:[],prio:'hoch'},
      {id:'P13',st:'backlog',name:'Datenschutz-Folgenabschätzung KI',desc:'DSGVO- und EU-AI-Act-konforme Folgenabschätzung aller produktiven KI-Anwendungen.',budget:360,res:'Legal',dur:'26Q1-26Q3',deps:[],prio:'hoch',reg:'DSGVO Art. 35 · EU AI Act Art. 27'},
      {id:'P14',st:'backlog',name:'KI-Governance-Board einrichten',desc:'Konzernweites KI-Governance-Board mit klaren Entscheidungskompetenzen',budget:160,res:'Legal, Management',dur:'26Q1-26Q1',deps:[],prio:'hoch'},
      {id:'P15',st:'backlog',name:'KI-Output-Labeling-System',desc:'Automatische Kennzeichnung aller KI-generierten Inhalte in allen Produkten',budget:440,res:'IT',dur:'26Q2-26Q3',deps:['P12'],prio:'hoch'},
      {id:'P16',st:'backlog',name:'Audit-Trail für KI-Entscheidungen',desc:'Lückenlose Protokollierung aller Copilot-Interaktionen für Compliance',budget:600,res:'IT, Data',dur:'26Q2-26Q4',deps:['P12','P15'],prio:'hoch'},
      {id:'P17',st:'backlog',name:'Model Registry und Versionierung',desc:'Zentrale Verwaltung aller KI-Modelle mit vollständiger Versionskontrolle',budget:500,res:'IT, Data',dur:'26Q1-26Q3',deps:[],prio:'mittel'}
    ]},
    {id:'ki-j4',year:2027,name:'Zertifizierung und Marktpositionierung',kpis:['DSGVO und EU-AI-Act-Konformität','Externes Gutachten Q2 2027','Fehlerquote < 0,5%'],ps:[
      {id:'P18',st:'backlog',name:'Externes Rechtsgutachten Copilot-Tax',desc:'Steuerfachkanzlei für Zertifizierung der rechtlichen Konformität beauftragen',budget:700,res:'Legal',dur:'26Q4-27Q2',deps:['P13'],prio:'hoch'},
      {id:'P19',st:'backlog',name:'EU-AI-Act Conformity Assessment',desc:'Pflichtbewertung aller KI-Systeme nach EU-AI-Act Art. 9 für High-Risk-AI.',budget:560,res:'Legal, IT',dur:'27Q1-27Q3',deps:['P12','P13'],prio:'hoch',reg:'EU AI Act Art. 9 (High-Risk)'},
      {id:'P20',st:'backlog',name:'Risk-Register KI-Produkte',desc:'Zentrales Risikoregister für alle KI-bezogenen Compliance-Risiken',budget:240,res:'Legal',dur:'27Q1-27Q2',deps:['P14'],prio:'mittel'},
      {id:'P59',st:'backlog',name:'Rechtssicherheits-Kampagne',desc:'Go-to-Market mit der Compliance-grade-AI-Positionierung für Kanzleikunden',budget:500,res:'Marketing',dur:'27Q3-27Q4',deps:['P18','P19'],prio:'hoch'},
      {id:'P60',st:'backlog',name:'Quality-Sampling-Prozess dauerhaft',desc:'Quartalsweise Fehlerquoten-Messung und Reporting für alle Copiloten',budget:200,res:'Data',dur:'27Q1-27Q4',deps:['P16'],prio:'mittel'}
    ]}
  ]},
  {id:'pl-mz1',area:'pl',name:'Steigerung der Cross-Selling-Rate im Haufe Ökosystem',type:'Mehrjahresziel',ags:[
    {id:'pl-j1',year:2026,name:'Cross-Selling-Rate von 8% auf 11%',kpis:['Rate auf 11%','100% Portale mit personalisierter Empfehlung'],ps:[
      {id:'P21',st:'aktiv',name:'Cross-Brand Recommendation Engine',desc:'ML-basierte Empfehlungsmaschine für markenübergreifende Produktvorschläge',budget:1400,res:'IT, Data, Produkt',dur:'26Q1-26Q3',deps:['P02'],prio:'hoch'},
      {id:'P22',st:'aktiv',name:'Unified Customer Data Platform',desc:'Konsolidierung aller Kundendaten aus Haufe, Lexware und Akademie',budget:2200,res:'IT, Data',dur:'26Q1-26Q4',deps:[],prio:'hoch'}
    ]},
    {id:'pl-j2',year:2027,name:'Cross-Selling auf 15% skalieren',kpis:['Rate ≥ 15%','Cross-Selling-Umsatz +40%'],ps:[
      {id:'P61',st:'backlog',name:'Predictive Upselling Engine',desc:'ML-Modell zur Identifikation von Kunden mit höchster Konversionschance',budget:700,res:'IT, Data',dur:'27Q1-27Q3',deps:['P21','P22'],prio:'hoch'},
      {id:'P62',st:'backlog',name:'Cross-Marken Loyalty-Programm',desc:'Einheitliches Treueprogramm über alle Haufe-Marken hinweg',budget:560,res:'Marketing, Produkt',dur:'27Q2-27Q4',deps:['P22'],prio:'mittel'}
    ]}
  ]},
  {id:'pl-mz2',area:'pl',name:'Haufe-Produkte stärker ineinander integrieren',type:'Mehrjahresziel',ags:[
    {id:'pl-j3',year:2026,name:'Technische Integration und SSO',kpis:['Multi-Marken-Kundenwert auf 6x','Churn < 5% p.a.'],ps:[
      {id:'P23',st:'aktiv',name:'Single Sign-On alle Haufe-Produkte',desc:'Einheitliches Login über alle Marken und Plattformen des Konzerns',budget:1400,res:'IT',dur:'26Q1-26Q3',deps:[],prio:'hoch'},
      {id:'P24',st:'backlog',name:'Unified Activity Feed',desc:'Markenübergreifender Aktivitätsstrom für alle Haufe-Produkte',budget:600,res:'IT, UX',dur:'26Q2-26Q4',deps:['P23'],prio:'mittel'},
      {id:'P25',st:'backlog',name:'Content-Integration-Hub Lexware',desc:'Haufe-Fachinhalte direkt in Lexware-Office-Arbeitsabläufe einbetten',budget:1100,res:'IT, Content, Produkt',dur:'26Q2-26Q4',deps:['P23'],prio:'hoch'}
    ]},
    {id:'pl-j4',year:2027,name:'Nahtlose Ökosystem-Experience',kpis:['Ökosystem voll produktiv','Journey über min. 2 Marken','Kundenwert 7x'],ps:[
      {id:'P63',st:'backlog',name:'Unified Haufe Dashboard',desc:'Zentrales Dashboard das alle Haufe-Produkte eines Kunden zusammenführt',budget:1400,res:'IT, UX, Produkt',dur:'27Q1-27Q3',deps:['P23','P24'],prio:'hoch'},
      {id:'P64',st:'backlog',name:'Cross-Product Smart Notifications',desc:'Intelligente produktübergreifende Benachrichtigungen',budget:400,res:'IT, UX',dur:'27Q2-27Q3',deps:['P24'],prio:'mittel'}
    ]}
  ]},
  {id:'pl-mz3',area:'pl',name:'Multi-Marken-Kunden-Rate steigern',type:'Mehrjahresziel',ags:[
    {id:'pl-j5',year:2026,name:'30% Lexware-Nutzer mit Haufe-Content',kpis:['30% Lexware-Nutzer aktivieren Haufe-Content-Integration'],ps:[
      {id:'P26',st:'backlog',name:'Onboarding-Funnel mit Empfehlung',desc:'Personalisierter Onboarding-Flow mit markenübergreifenden Empfehlungen',budget:440,res:'UX, Produkt, Marketing',dur:'26Q1-26Q3',deps:['P21'],prio:'hoch'},
      {id:'P27',st:'backlog',name:'Cross-Marken-Kampagnenplattform',desc:'Automatisierte Marketingkampagnen für Cross-Selling-Angebote',budget:560,res:'Marketing, IT',dur:'26Q2-26Q4',deps:['P22'],prio:'mittel'}
    ]}
  ]},
  {id:'pl-mz4',area:'pl',name:'Ventures in Haufe-Ökosystem einbinden',type:'Mehrjahresziel',ags:[
    {id:'pl-j6',year:2026,name:'30% Portfolio-Startups angebunden',kpis:['30% Startups angebunden','Ecosystem Fit Review eingeführt'],ps:[
      {id:'P28',st:'backlog',name:'Haufe-Ecosystem-API',desc:'Offene API-Schnittstelle für Integration von Portfolio-Startups',budget:1400,res:'IT',dur:'26Q1-26Q3',deps:['P23'],prio:'hoch'},
      {id:'P29',st:'backlog',name:'Ecosystem Fit Review Dashboard',desc:'Bewertungstool für die strategische Passung aller Portfolio-Startups',budget:360,res:'IT, Ventures',dur:'26Q2-26Q3',deps:[],prio:'mittel'},
      {id:'P30',st:'backlog',name:'Startup-Integrations-Sandbox',desc:'Testumgebung für schnelle technische Anbindung neuer Startup-Produkte',budget:400,res:'IT, Ventures',dur:'26Q3-26Q4',deps:['P28'],prio:'mittel'}
    ]},
    {id:'pl-j7',year:2027,name:'50% Startups integriert',kpis:['Min. 50% aller Startups in Produktkooperation'],ps:[
      {id:'P65',st:'backlog',name:'Ventures-Marketplace im Ökosystem',desc:'Interner Marktplatz für Startup-Lösungen im Haufe-Kundenerlebnis',budget:640,res:'IT, Ventures, Produkt',dur:'27Q1-27Q3',deps:['P28','P30'],prio:'hoch'}
    ]}
  ]},
  {id:'ak-mz1',area:'ak',name:'KI-gestützte Personalisierung der Lernpfade',type:'Mehrjahresziel',ags:[
    {id:'ak-j1',year:2026,name:'Pilot KI-Lernpfade starten',kpis:['200 Testnutzer im Pilot','Feedback ≥ 3,5/5','Abbruch < 40%'],ps:[
      {id:'P31',st:'aktiv',name:'KI-Lernpfad-Engine',desc:'Algorithmus für personalisierte, rollenbasierte Lernpfade auf Basis individueller Kompetenzen',budget:1200,res:'IT, Data, Akademie',dur:'26Q1-26Q3',deps:['P02'],prio:'hoch'},
      {id:'P32',st:'aktiv',name:'Skill-Assessment-Tool',desc:'Automatisierte Kompetenzanalyse als Grundlage für KI-Lernempfehlungen',budget:500,res:'IT, Akademie',dur:'26Q1-26Q2',deps:[],prio:'hoch'},
      {id:'P33',st:'backlog',name:'Lernpfad-Pilot 5 Rollenprofile',desc:'Beta-Test mit 5 Rollentypen und 200 Pilotnutzern zur Validierung',budget:300,res:'Akademie, UX',dur:'26Q3-26Q4',deps:['P31','P32'],prio:'hoch'}
    ]},
    {id:'ak-j2',year:2027,name:'KI-Lernpfade skalieren',kpis:['15+ Rollenprofile','60% auf rollenbasiertem Pfad','Weiterempfehlung ≥ 70%'],ps:[
      {id:'P34',st:'backlog',name:'Rollenprofil-Bibliothek',desc:'Datenbank mit Rollenprofilen, Kompetenzmatrizen und Entwicklungspfaden',budget:400,res:'Akademie, HR',dur:'27Q1-27Q2',deps:['P32'],prio:'mittel'},
      {id:'P35',st:'backlog',name:'Adaptive Learning Agent',desc:'KI-Agent der den Lernpfad basierend auf Fortschritt in Echtzeit anpasst',budget:1000,res:'IT, Data',dur:'27Q1-27Q3',deps:['P31'],prio:'hoch'},
      {id:'P66',st:'backlog',name:'KI-Lerncoach Chatbot',desc:'Conversational Agent der Lernende individuell begleitet und motiviert',budget:1000,res:'IT, Akademie',dur:'27Q2-27Q4',deps:['P35','P01'],prio:'hoch'}
    ]}
  ]},
  {id:'ak-mz2',area:'ak',name:'Hochwertiges digitales Kursportfolio',type:'Mehrjahresziel',ags:[
    {id:'ak-j3',year:2026,name:'Neue Fachbereiche und Lernformate',kpis:['3 neue Fachbereiche','80 neue Kurse','Abschlussrate ≥ 50%','2 neue Formate'],ps:[
      {id:'P36',st:'backlog',name:'KI-Grundlagenkurse Unternehmen',desc:'Kursserie mit KI-Basiswissen für alle Unternehmensrollen',budget:400,res:'Akademie, Content',dur:'26Q1-26Q3',deps:[],prio:'hoch'},
      {id:'P37',st:'backlog',name:'ESG-Compliance-Kursprogramm',desc:'Verpflichtende Weiterbildung zu ESG-Reporting CSRD, LkSG.',budget:360,res:'Akademie, Content',dur:'26Q1-26Q3',deps:[],prio:'hoch',reg:'CSRD · LkSG'},
      {id:'P38',st:'backlog',name:'Content-Produktionsplattform',desc:'Toolchain für schnellere Erstellung digitaler Lerninhalte',budget:600,res:'IT, Akademie',dur:'26Q1-26Q2',deps:[],prio:'mittel'},
      {id:'P39',st:'backlog',name:'Micro-Learning-Module',desc:'5-Minuten-Lerneinheiten für mobilen Konsum unterwegs',budget:440,res:'Akademie, UX',dur:'26Q2-26Q3',deps:['P38'],prio:'hoch'},
      {id:'P40',st:'backlog',name:'Live-Session-Plattform',desc:'Interaktive Live-Webinare mit Q&A und Breakout-Rooms',budget:560,res:'IT, Akademie',dur:'26Q1-26Q3',deps:[],prio:'mittel'},
      {id:'P41',st:'backlog',name:'KI-gestützter Kurs-Copilot',desc:'KI-Assistent der Lernende während des Kurses unterstützt',budget:600,res:'IT, Akademie',dur:'26Q3-27Q1',deps:['P01','P31'],prio:'mittel'}
    ]},
    {id:'ak-j4',year:2027,name:'Portfolio verdoppeln und internationalisieren',kpis:['200+ Kurse','Internationale Inhalte ≥ 20%','Abschlussrate ≥ 60%'],ps:[
      {id:'P67',st:'backlog',name:'Kurs-Lokalisierung Englisch',desc:'Top-100-Kurse ins Englische übersetzen für DACH-International',budget:500,res:'Akademie, Content',dur:'27Q1-27Q3',deps:['P38'],prio:'hoch'},
      {id:'P68',st:'backlog',name:'KI-Content-Generator',desc:'KI-gestützte automatisierte Erstellung von Kursmodulen aus Fachinhalten',budget:1400,res:'IT, Akademie, Data',dur:'27Q1-27Q4',deps:['P38','P02'],prio:'hoch'}
    ]}
  ]},
  {id:'ak-mz3',area:'ak',name:'Skalierbare digitale Lernplattform',type:'Mehrjahresziel',ags:[
    {id:'ak-j5',year:2026,name:'Mobile App und skalierbares MVP',kpis:['App iOS und Android','30% Sessions mobil','Store ≥ 4/5','Verfügbarkeit ≥ 99%'],ps:[
      {id:'P42',st:'aktiv',name:'Haufe Akademie Mobile App',desc:'Native iOS und Android App mit Offline-Lernfunktion',budget:1600,res:'IT, UX',dur:'26Q1-26Q3',deps:[],prio:'hoch'},
      {id:'P43',st:'backlog',name:'Push-Notification-System',desc:'Intelligente Lern-Erinnerungen und Motivations-Nudges',budget:240,res:'IT, UX',dur:'26Q3-26Q4',deps:['P42'],prio:'mittel'},
      {id:'P44',st:'aktiv',name:'Lernplattform-Backend v2',desc:'Skalierbare Cloud-Architektur für die digitale Lernplattform',budget:2000,res:'IT',dur:'26Q1-26Q3',deps:[],prio:'hoch'},
      {id:'P45',st:'backlog',name:'Gamification-Layer',desc:'Badges, Streaks und Leaderboards für höhere Nutzerbindung',budget:360,res:'UX, IT',dur:'26Q3-26Q4',deps:['P44'],prio:'niedrig'}
    ]},
    {id:'ak-j6',year:2027,name:'B2B-Skalierung und Enterprise',kpis:['5.000+ aktive Nutzer/Monat','B2B-Portal live','Enterprise-SSO'],ps:[
      {id:'P69',st:'backlog',name:'Enterprise B2B-Lernportal',desc:'Mandantenfähiges Portal für Unternehmenskunden mit eigenem Branding',budget:1600,res:'IT, Produkt, UX',dur:'27Q1-27Q3',deps:['P44'],prio:'hoch'},
      {id:'P70',st:'backlog',name:'Learning-Analytics-Dashboard',desc:'Lernverhalten-Auswertung und ROI-Berechnung für HR-Abteilungen',budget:500,res:'IT, Data',dur:'27Q2-27Q4',deps:['P69'],prio:'mittel'}
    ]}
  ]},
  {id:'ve-mz1',area:'ve',name:'Strategisches Start-up-Investmentportfolio aufbauen',type:'Mehrjahresziel',ags:[
    {id:'ve-j1',year:2026,name:'Investmentstrategie und erste Integrationen',kpis:['Strategie verabschiedet','2 Startups mit Produktintegration'],ps:[
      {id:'P46',st:'aktiv',name:'Investment-Thesis und Scoring-Modell',desc:'Strukturiertes Bewertungsmodell und Investmentthese für alle Startup-Investments',budget:200,res:'Ventures, Finance',dur:'26Q1-26Q2',deps:[],prio:'hoch'},
      {id:'P47',st:'backlog',name:'Deal-Pipeline-Aufbau',desc:'Netzwerk mit VCs, Accelerators und Startup-Hubs aufbauen',budget:300,res:'Ventures',dur:'26Q1-26Q4',deps:['P46'],prio:'hoch'},
      {id:'P48',st:'backlog',name:'Startup-Integration Nr. 1 HR-Tech',desc:'Produktintegration eines HR-Tech-Startups in die Haufe-Personal-Plattform',budget:1000,res:'Ventures, IT, Produkt',dur:'26Q2-26Q4',deps:['P28'],prio:'hoch'},
      {id:'P49',st:'backlog',name:'Startup-Integration Nr. 2 Finance-AI',desc:'Produktintegration eines Finance-AI-Startups in Lexware Office',budget:1000,res:'Ventures, IT, Produkt',dur:'26Q3-27Q1',deps:['P28'],prio:'hoch'}
    ]},
    {id:'ve-j2',year:2027,name:'Portfolio ausbauen und fortführen',kpis:['Portfolio 20+','1+ Startup fortgeführt','1+ weitere Integration'],ps:[
      {id:'P50',st:'backlog',name:'Portfolio-Performance-Review',desc:'Quartalsweise Erfolgsmessung aller Beteiligungen mit KPI-Tracking',budget:240,res:'Ventures, Finance',dur:'27Q1-27Q2',deps:['P29'],prio:'mittel'},
      {id:'P71',st:'backlog',name:'Startup-Integration Nr. 3 Legal-Tech',desc:'Integration eines Legal-Tech-Startups in Haufe Compliance',budget:600,res:'Ventures, IT',dur:'27Q2-27Q4',deps:['P28','P56'],prio:'hoch'},
      {id:'P72',st:'backlog',name:'Follow-on Investment Runde',desc:'Strategische Folgeinvestments in die Top-3 Performer des Portfolios',budget:1800,res:'Ventures, Finance',dur:'27Q2-27Q3',deps:['P50'],prio:'hoch'}
    ]}
  ]},
  {id:'ve-mz2',area:'ve',name:'Diversifikation des Produktportfolios durch Venture Studio',type:'Mehrjahresziel',ags:[
    {id:'ve-j3',year:2026,name:'Neue Märkte scouten und Investments initiieren',kpis:['10 Startups in neuen Märkten evaluiert'],ps:[
      {id:'P51',st:'backlog',name:'Market-Scouting Legal-Tech',desc:'Systematische Analyse des Legal-Tech-Marktes für Investmentchancen',budget:160,res:'Ventures',dur:'26Q1-26Q2',deps:[],prio:'mittel'},
      {id:'P52',st:'backlog',name:'Market-Scouting Sustainability-Tech',desc:'Analyse von ESG- und Nachhaltigkeits-Startups',budget:160,res:'Ventures',dur:'26Q2-26Q3',deps:[],prio:'mittel'},
      {id:'P53',st:'backlog',name:'Market-Scouting EdTech International',desc:'Internationale EdTech-Startups für Haufe Akademie evaluieren',budget:160,res:'Ventures, Akademie',dur:'26Q3-26Q4',deps:[],prio:'mittel'}
    ]},
    {id:'ve-j4',year:2027,name:'Studio-Produkte am Markt etablieren',kpis:['3+ Investments in neuen Feldern','2-3 Studio-Produkte','1+ mit 10k Kunden'],ps:[
      {id:'P54',st:'backlog',name:'Venture-Studio-Produkt Nr. 2',desc:'Eigenes Compliance-Management-Tool aus dem Studio',budget:1600,res:'Ventures, IT',dur:'26Q3-27Q2',deps:[],prio:'hoch'},
      {id:'P55',st:'backlog',name:'Venture-Studio-Produkt Nr. 3',desc:'KI-gestütztes Workforce-Planning Tool für den Mittelstand',budget:1400,res:'Ventures, IT',dur:'27Q1-27Q4',deps:[],prio:'mittel'},
      {id:'P73',st:'backlog',name:'Studio Go-to-Market Kampagne',desc:'Launch und Vermarktung der Studio-Produkte über die Haufe-Kundenbasis',budget:600,res:'Marketing, Ventures',dur:'27Q2-27Q4',deps:['P54'],prio:'hoch'}
    ]}
  ]}
];

/* ───────── 3 gesetzliche Pflichtprojekte — IMMER aktiv ───────── */
window.GESETZ_EXTRA = [
  {id:'P-G1',st:'gesetzlich',name:'AI Governance & Compliance Framework',
   desc:'Aufbau eines konzernweiten AI-Governance-Frameworks mit verbindlichen Kontrollen, Prozessen und Eskalationspfaden — verpflichtend nach EU AI Act.',
   budget:250,res:'Legal, Data, IT Security, Compliance',dur:'26Q3-27Q1',deps:['P12','P13'],prio:'hoch',
   areaId:'ki', regParagraph:'§ 1', reg:'EU AI Act Art. 6 ff. · DSGVO',
   value:'9/10', dauer:'9 Monate', ziel:'Q2 2027', overlap:['P12','P13','P15','P19']},
  {id:'P-G2',st:'gesetzlich',name:'Migration zu EU-Hosting / Sovereign Cloud',
   desc:'Vollständige Migration aller kundenrelevanten Daten in eine EU-souveräne Cloud-Architektur — Voraussetzung für rechtssichere KI- und SaaS-Angebote.',
   budget:500,res:'Cloud Engineering, Architektur, Legal',dur:'26Q4-27Q4',deps:[],prio:'hoch',
   areaId:'pl', regParagraph:'§ 2', reg:'DSGVO · Schrems II · DORA',
   value:'9/10', dauer:'12 Monate', ziel:'Q4 2027', overlap:['P22','P23']},
  {id:'P-G8',st:'gesetzlich',name:'Explainable AI (XAI) Implementierung',
   desc:'Erklärbarkeitsschicht für alle Hochrisiko-KI-Systeme — Pflicht für gerichtsfeste Begründbarkeit und EU-AI-Act-Konformität.',
   budget:220,res:'Data Science, Legal, Produkt',dur:'27Q1-27Q4',deps:['P12','P16'],prio:'hoch',
   areaId:'ki', regParagraph:'§ 8', reg:'EU AI Act Art. 13 (Transparency)',
   value:'8/10', dauer:'9 Monate', ziel:'Q4 2027', overlap:['P12','P15','P16','P19']}
];

/* ───────── Flatten all projects ───────── */
window.ALL_PROJECTS = (function(){
  var list=[];
  window.GOALS.forEach(function(g){
    var area=window.AREAS.find(function(a){return a.id===g.area;});
    g.ags.forEach(function(ag){
      ag.ps.forEach(function(p){
        list.push(Object.assign({},p,{
          areaId:g.area, areaName:area.name, areaColor:area.color, areaIcon:area.icon,
          goalId:g.id, goalName:g.name,
          agId:ag.id, agName:ag.name, year:ag.year
        }));
      });
    });
  });
  window.GESETZ_EXTRA.forEach(function(p){
    var area=window.AREAS.find(function(a){return a.id===p.areaId;});
    list.push(Object.assign({},p,{
      areaName:area.name, areaColor:'#FFB800', areaIcon:area.icon,
      goalId:'gesetz', goalName:'Gesetzliche Pflichten',
      agId:'gesetz', agName:'Regulatorische Compliance', year:2026
    }));
  });
  return list;
})();

/* Convenience alias used by portfolio-hero script */
window.ALL = window.ALL_PROJECTS;

/* ───────── Portfolio orientations ─────────
   Jede Ausrichtung hat genau 10 strategische Projekte aktiv.
   + 3 gesetzliche (P-G1, P-G2, P-G8) automatisch = 13 aktiv total. */
window.ORIENTATIONS = [
  {id:'balanced',name:'Ausgeglichen',icon:'◎',
   tag:'Balance über alle vier Kernthemen',
   desc:'Gleichmäßige Ressourcenverteilung. Risiko niedrig, Time-to-Impact mittel.',
   weights:{ki:25,pl:25,ak:25,ve:25},risk:'niedrig',ttImpact:'mittel',
   // 3 KI + 3 PL + 2 AK + 2 VE = 10
   active:['P01','P02','P03','P21','P22','P23','P31','P42','P46','P48'],
   priorityMZ:['ki-mz1','pl-mz1','ak-mz1','ve-mz1']
  },
  {id:'ki',name:'KI-Fokus',icon:'⌬',
   tag:'KI-Integration & Akademie-KI priorisiert',
   desc:'Plattform & Ventures rücken ins Backlog. Höchster strategischer Hebel, höheres regulatorisches Risiko.',
   weights:{ki:45,pl:20,ak:25,ve:10},risk:'mittel-hoch',ttImpact:'kurz',
   // 4 KI + 2 PL + 3 AK + 1 VE = 10
   active:['P01','P02','P03','P04','P21','P22','P31','P32','P41','P46'],
   priorityMZ:['ki-mz1','ki-mz2','ak-mz1']
  },
  {id:'venture',name:'Venture-Studios-Fokus',icon:'✦',
   tag:'Diversifikation und neue Märkte',
   desc:'Ventures + Plattform-Anbindung aktiv. Höchste Innovationsrate, höhere Unsicherheit.',
   weights:{ki:20,pl:30,ak:15,ve:35},risk:'hoch',ttImpact:'lang',
   // 2 KI + 3 PL + 2 AK + 3 VE = 10
   active:['P01','P03','P21','P22','P23','P31','P42','P46','P48','P54'],
   priorityMZ:['ve-mz1','ve-mz2','pl-mz4']
  }
];

/* ───────── Company facts ───────── */
window.COMPANY = {
  revenue: 562,           // Mio €
  staff: 2700,
  locations: 10,
  customers: 1,           // Mio
  founded: 1951,
  hq: 'Freiburg im Breisgau',
  legal: 'Haufe Group SE',
  ceo: 'Birte Hackenjos'
};

/* ───────── Helpers ───────── */
window.fmtBudget=function(b){var v=b/1000;return (Math.round(v*10)/10)+' Mio. €';};
window.fmtDur=function(d){return d.replace(/26/g,"'26").replace(/27/g,"'27");};
window.getProject=function(id){return window.ALL_PROJECTS.find(function(p){return p.id===id;});};
window.statusBadge=function(st){
  if(st==='aktiv') return '<span class="badge b-aktiv">● Aktiv</span>';
  if(st==='gesetzlich') return '<span class="badge b-gesetz">§ Gesetzlich</span>';
  return '<span class="badge b-backlog">Backlog</span>';
};
window.prioBadge=function(p){
  if(p==='hoch') return '<span class="badge b-high">↑ Hoch</span>';
  if(p==='mittel') return '<span class="badge b-mid">→ Mittel</span>';
  return '<span class="badge b-low">↓ Niedrig</span>';
};