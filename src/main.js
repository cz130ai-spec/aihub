const icons = {
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/>',
  arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  edit: '<path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15v5Z"/><path d="M12 20h8"/>',
  align: '<path d="M4 6h16M4 10h16M4 14h10M4 18h10"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  quiz: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/><path d="m14 17 1.5 1.5L19 15"/>',
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M13 2v7h7M8 14h8M8 18h8"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  down: '<path d="m7 10 5 5 5-5"/>',
}
const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`

const tools = [
  { id: 'improve', title: 'Text verbessern', desc: 'Lokale Formatierungsvorschau statt KI-Überarbeitung.', icon: 'edit', color: 'lilac', tag: 'Schreiben', input: 'text', placeholder: 'Füge deinen Text ein …', button: 'Text verbessern' },
  { id: 'summarize', title: 'Zusammenfassen', desc: 'Einfache Vorschau aus den ersten Sätzen.', icon: 'align', color: 'blue', tag: 'Schreiben', input: 'text', placeholder: 'Füge einen längeren Text ein …', button: 'Zusammenfassung erstellen' },
  { id: 'translate', title: 'Übersetzen', desc: 'Übersetzung ist geplant, aber noch nicht aktiv.', icon: 'globe', color: 'mint', tag: 'Sprache', input: 'text', placeholder: 'Was möchtest du übersetzen?', button: 'Text übersetzen' },
  { id: 'email', title: 'E-Mail schreiben', desc: 'Lokaler Entwurf mit Betreff und Platzhaltern.', icon: 'mail', color: 'peach', tag: 'Schreiben', input: 'brief', placeholder: 'Worum geht es in deiner E-Mail?', button: 'E-Mail entwerfen' },
  { id: 'quiz', title: 'Quiz erstellen', desc: 'Allgemeine Lernfragen als Startpunkt.', icon: 'quiz', color: 'yellow', tag: 'Lernen', input: 'text', placeholder: 'Füge Lernnotizen oder ein Thema ein …', button: 'Quiz erstellen' },
  { id: 'files', title: 'Datei zusammenfassen', desc: 'Erstelle eine einfache lokale Vorschau aus TXT- und MD-Dateien.', icon: 'file', color: 'sky', tag: 'Dateien', input: 'file', placeholder: 'TXT- oder MD-Datei auswählen', button: 'Datei zusammenfassen' },
  { id: 'image', title: 'Bild zu Text', desc: 'Vorschau für Texterkennung aus Bildern – die Erkennung folgt später.', icon: 'image', color: 'rose', tag: 'Dateien', input: 'image', placeholder: 'Bild auswählen – OCR noch nicht aktiv', button: 'Text aus Bild lesen' },
  { id: 'resume', title: 'Lebenslauf-Helfer', desc: 'Ordne Erfahrungspunkte als lokalen Vorschlag.', icon: 'person', color: 'lilac', tag: 'Karriere', input: 'text', placeholder: 'Beschreibe deine Erfahrung oder Rolle …', button: 'Stichpunkte formulieren' },
]

const state = { route: location.hash.slice(1) || '/', query: '', activeFilter: 'Alle', selectedTool: null, mobileOpen: false }
const app = document.querySelector('#app')

function go(route) {
  state.route = route
  state.selectedTool = null
  state.mobileOpen = false
  location.hash = route
  render()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
window.addEventListener('hashchange', () => { state.route = location.hash.slice(1) || '/'; state.selectedTool = null; render() })

function header() {
  return `<header class="topbar"><a class="brand" href="#/" aria-label="AIHub Startseite"><span class="brand-mark">${icon('spark', 19)}</span><span>AI<span class="brand-light">Hub</span></span></a><nav class="desktop-nav" aria-label="Hauptnavigation"><a class="${state.route === '/' ? 'active' : ''}" href="#/">Startseite</a><a class="${state.route.startsWith('/tools') ? 'active' : ''}" href="#/tools">Tools</a><a class="${state.route === '/pricing' ? 'active' : ''}" href="#/pricing">Preise</a></nav><div class="nav-actions"><span class="local-pill"><span></span> Interaktive Vorschau</span><button class="avatar" aria-label="Profil">M</button><button class="menu-toggle" aria-label="Menü öffnen">${icon(state.mobileOpen ? 'close' : 'menu')}</button></div></header>${state.mobileOpen ? `<div class="mobile-menu"><a href="#/">Startseite</a><a href="#/tools">Tools entdecken</a><a href="#/pricing">Preise</a></div>` : ''}`
}

function card(tool) {
  return `<button class="tool-card" data-tool="${tool.id}"><span class="tool-icon ${tool.color}">${icon(tool.icon, 21)}</span><span class="tool-tag">${tool.tag}</span><strong>${tool.title}</strong><span class="tool-desc">${tool.desc}</span><span class="card-link">Öffnen ${icon('arrow', 15)}</span></button>`
}
function filteredTools() {
  return tools.filter(t => (state.activeFilter === 'Alle' || t.tag === state.activeFilter) && `${t.title} ${t.desc} ${t.tag}`.toLowerCase().includes(state.query.toLowerCase()))
}
function cardsSection({ heading = 'Finde dein Werkzeug', subtitle = 'Kleine Helfer für die Dinge, die du jeden Tag machst.', compact = false } = {}) {
  return `<section id="tools" class="tool-section ${compact ? 'compact' : ''}"><div class="section-heading"><div><div class="eyebrow">${icon('spark', 15)} DEINE TOOLBOX</div><h2>${heading}</h2><p>${subtitle}</p></div>${compact ? `<a class="text-link" href="#/tools">Alle Tools ansehen ${icon('arrow', 16)}</a>` : ''}</div><div class="search-row"><label class="searchbox">${icon('spark', 18)}<input id="search" value="${escapeHTML(state.query)}" placeholder="Wonach suchst du?" aria-label="Tools suchen"><kbd>⌘ K</kbd></label><div class="filters">${['Alle', 'Schreiben', 'Sprache', 'Lernen', 'Dateien', 'Karriere'].map(f => `<button class="filter ${state.activeFilter === f ? 'selected' : ''}" data-filter="${f}">${f}</button>`).join('')}</div></div><div class="tool-grid" id="tool-grid">${filteredTools().map(card).join('')}</div>${filteredTools().length === 0 ? '<p class="empty-state">Keine Tools gefunden. Versuche einen anderen Suchbegriff.</p>' : ''}</section>`
}
function landing() {
  return `<main><section class="hero"><div class="hero-copy"><div class="hero-label"><span class="hero-dot"></span> DEIN DIGITALER WERKZEUGKASTEN</div><h1>Weniger suchen.<br><span>Mehr schaffen.</span></h1><p>Praktische Helfer für Texte, Ideen und den Alltag. Entdecke die interaktive AIHub-Vorschau mit lokalen Vorlagen – transparent und ohne Anmeldung.</p><div class="hero-buttons"><a href="#/tools" class="button primary">Tools entdecken ${icon('arrow', 17)}</a><a href="#how-it-works" class="button quiet">So funktioniert’s ${icon('down', 16)}</a></div><div class="trust-note">${icon('check', 15)} Kostenlos ausprobieren <span>·</span> Keine Anmeldung nötig</div></div><div class="hero-visual" aria-label="Vorschau auf das AIHub Dashboard"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-spark">${icon('spark', 38)}</div><div class="float-card f1"><span class="mini-icon lilac">${icon('edit', 16)}</span><span><b>Text verbessern</b><small>Lokaler Demo-Vorschlag</small></span>${icon('arrow', 15)}</div><div class="float-card f2"><span class="mini-icon mint">${icon('globe', 16)}</span><span><b>Übersetzen</b><small>Als nächstes geplant</small></span>${icon('arrow', 15)}</div><div class="float-card f3"><span class="mini-icon peach">${icon('mail', 16)}</span><span><b>E-Mail entwerfen</b><small>Lokale Vorlage</small></span>${icon('arrow', 15)}</div><span class="visual-caption">Ein guter Anfang für alles, was du vorhast.</span></div></section><div class="ticker"><span>${icon('spark', 17)} Fürs Schreiben</span><i></i><span>${icon('quiz', 17)} Zum Lernen</span><i></i><span>${icon('file', 17)} Für deine Dateien</span><i></i><span>${icon('person', 17)} Für den nächsten Schritt</span></div>${cardsSection({ compact: true })}<section class="how-section" id="how-it-works"><div class="how-intro"><div class="eyebrow">KLEIN ANFANGEN</div><h2>Einfacher geht’s kaum.</h2><p>Dein nächster guter Entwurf ist nur drei Schritte entfernt.</p><a href="#/tools" class="text-link">Jetzt ausprobieren ${icon('arrow', 16)}</a></div><div class="steps"><article><span>01</span><h3>Tool auswählen</h3><p>Such dir aus, was gerade weiterhilft.</p></article><article><span>02</span><h3>Deine Idee teilen</h3><p>Gib einen Text, ein Thema oder eine Datei ein.</p></article><article><span>03</span><h3>Ergebnis mitnehmen</h3><p>Bearbeite deinen Entwurf und nutze ihn weiter.</p></article></div></section><section class="cta"><div><span class="eyebrow">JETZT LOSLEGEN</span><h2>Was möchtest du heute schaffen?</h2><p>Ein guter erster Entwurf wartet schon auf dich.</p></div><a href="#/tools" class="button primary">Werkzeuge ansehen ${icon('arrow', 17)}</a></section></main>`
}
function toolsPage() { return `<main class="inner-page"><div class="page-intro"><div class="eyebrow">ALLES AN EINEM ORT</div><h1>Deine Toolbox</h1><p>Wähle ein Werkzeug und mach den nächsten Schritt leichter.</p></div>${cardsSection({ heading: 'Alle Werkzeuge', subtitle: 'Finde genau das, was dir jetzt weiterhilft.' })}</main>` }
function pricingPage() {
  return `<main class="inner-page pricing-page"><div class="page-intro"><div class="eyebrow">KLAR UND EINFACH</div><h1>Ein guter Anfang. <span>Ein fairer Plan.</span></h1><p>Starte kostenlos und entdecke, was AIHub für dich tun kann.</p></div><div class="plans"><article class="plan"><div class="plan-heading"><span class="plan-icon">${icon('spark', 19)}</span><span>Free</span></div><p>Für deinen Alltag und erste Ideen.</p><div class="price">€0 <small>/ in der Demo</small></div><a class="button secondary full" href="#/tools">Demo ausprobieren ${icon('arrow', 16)}</a><div class="plan-list"><span>${icon('check', 16)} Alle 8 Werkzeuge ausprobieren</span><span>${icon('check', 16)} Lokale Demo-Funktionen</span><span>${icon('check', 16)} Keine Anmeldung nötig</span></div></article><article class="plan featured"><div class="popular">NOCH IN PLANUNG</div><div class="plan-heading"><span class="plan-icon pro">${icon('spark', 19)}</span><span>Plus <small class="soon">Nicht verfügbar</small></span></div><p>Ein möglicher Plan für echte KI-Funktionen.</p><div class="price">Preis folgt <small>/ vor einem echten Start</small></div><button class="button primary full" disabled>Noch nicht verfügbar ${icon('clock', 16)}</button><div class="plan-list"><span>${icon('check', 16)} Echte KI-Unterstützung geplant</span><span>${icon('check', 16)} Nutzungsumfang noch offen</span><span>${icon('check', 16)} Keine Buchung oder Zahlung</span></div></article></div><p class="pricing-note">AIHub befindet sich im Aufbau. Es gibt noch keine kostenpflichtigen Funktionen, Abos oder Zahlungen.</p></main>`
}
function escapeHTML(s = '') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
function toolView(t) {
  const extra = t.input === 'brief' ? `<div class="field-row"><label>Ton<select id="tone"><option>Freundlich und professionell</option><option>Locker und persönlich</option><option>Formell und sachlich</option></select></label><label>An wen?<input id="recipient" placeholder="z. B. an mein Team"></label></div>` : ''
  const field = t.input === 'file' ? `<label class="upload-zone" for="file-input">${icon('file', 27)}<strong>Datei hier ablegen oder auswählen</strong><span>TXT oder MD · maximal 10 MB · PDF folgt später</span><input id="file-input" type="file" accept=".txt,.md,text/plain,text/markdown"></label>` : t.input === 'image' ? `<label class="upload-zone" for="image-input">${icon('image', 27)}<strong>Bild hier ablegen oder auswählen</strong><span>JPG, PNG oder WebP · OCR noch nicht aktiv</span><input id="image-input" type="file" accept="image/*"></label>` : `<label class="field-label" for="tool-input">Dein Inhalt</label><textarea id="tool-input" rows="8" placeholder="${t.placeholder}"></textarea>`
  return `<main class="inner-page tool-page"><a href="#/tools" class="back-link">← Alle Werkzeuge</a><div class="tool-page-head"><span class="tool-icon ${t.color}">${icon(t.icon, 23)}</span><span><div class="eyebrow">${t.tag.toUpperCase()} · LOKALE DEMO</div><h1>${t.title}</h1><p>${t.desc}</p></span></div><div class="tool-workspace"><div class="workspace-form">${extra}${field}<div class="form-footer"><span class="char-count" id="char-count">0 Zeichen</span><button id="run-tool" class="button primary">${t.button} ${icon('spark', 16)}</button></div></div><div class="result-panel" id="result-panel"><div class="result-empty">${icon('spark', 24)}<strong>Dein Ergebnis erscheint hier</strong><p>Gib deinen Inhalt ein und starte das Werkzeug.</p></div></div></div><p class="demo-disclaimer">${icon('spark', 14)} Lokale Demo: Es wird keine externe KI aufgerufen. Manche Werkzeuge zeigen nur eine Vorlage oder einen noch nicht aktiven Integrationspunkt.</p></main>`
}
function footer() { return `<footer class="footer"><a class="brand" href="#/"><span class="brand-mark">${icon('spark', 17)}</span><span>AI<span class="brand-light">Hub</span></span></a><span>Weniger suchen. Mehr schaffen.</span><div><a href="#/tools">Tools</a><a href="#/pricing">Preise</a><a href="mailto:cz130.ai@gmail.com">Kontakt</a></div><small>© 2026 AIHub · Ein Projekt im Aufbau</small></footer>` }
function render() {
  const route = state.route
  const selected = route.startsWith('/tool/') ? tools.find(t => t.id === route.split('/')[2]) : null
  app.innerHTML = `${header()}${selected ? toolView(selected) : route === '/tools' ? toolsPage() : route === '/pricing' ? pricingPage() : landing()}${footer()}`
  bind()
}
function bind() {
  app.querySelector('.menu-toggle')?.addEventListener('click', () => { state.mobileOpen = !state.mobileOpen; render() })
  app.querySelectorAll('[data-tool]').forEach(el => el.addEventListener('click', () => go(`/tool/${el.dataset.tool}`)))
  app.querySelectorAll('[data-filter]').forEach(el => el.addEventListener('click', () => { state.activeFilter = el.dataset.filter; render() }))
  app.querySelector('#search')?.addEventListener('input', e => { state.query = e.target.value; const grid = app.querySelector('#tool-grid'); if (grid) { const matches = filteredTools(); grid.innerHTML = matches.map(card).join(''); app.querySelector('.empty-state')?.remove(); if (!matches.length) grid.insertAdjacentHTML('afterend', '<p class="empty-state">Keine Tools gefunden. Versuche einen anderen Suchbegriff.</p>'); } app.querySelectorAll('[data-tool]').forEach(el => el.addEventListener('click', () => go(`/tool/${el.dataset.tool}`))) })
  const input = app.querySelector('#tool-input'); const count = app.querySelector('#char-count')
  input?.addEventListener('input', () => { count.textContent = `${input.value.length} Zeichen` })
  app.querySelector('#run-tool')?.addEventListener('click', runTool)
  app.querySelectorAll('.upload-zone input').forEach(file => file.addEventListener('change', () => { const strong = file.closest('.upload-zone').querySelector('strong'); if (file.files[0]) strong.textContent = file.files[0].name }))
  document.onkeydown = shortcut
}
function shortcut(e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); go('/tools'); setTimeout(() => app.querySelector('#search')?.focus(), 20) } }

function mockResult(id, text, extra = {}) {
  const safe = escapeHTML(text.trim())
  if (id === 'improve') return `**Klarer formatiert**\n\n${safe.replace(/\s+/g, ' ').replace(/(^\w|[.!?]\s+\w)/g, s => s.toUpperCase())}\n\n<span class="result-note">Lokale Formatierungsvorschau: Sie ordnet Leerzeichen und Großschreibung, verändert aber nicht verlässlich Stil oder Bedeutung. Eine KI-Anbindung ist noch nicht eingerichtet.</span>`
  if (id === 'summarize' || id === 'files') { const sentence = text.match(/[^.!?]+[.!?]?/g) || [text]; return `**Kurz zusammengefasst**\n\n${escapeHTML(sentence.slice(0, Math.min(3, Math.max(1, Math.ceil(sentence.length / 4)))).join(' ').trim())}\n\n<span class="result-note">Lokale Demo: Hier wird der Textanfang verwendet. Für echte Zusammenfassungen ist später eine KI-API nötig.</span>` }
  if (id === 'translate') return `**Übersetzung · Demo**\n\n${safe}\n\n<span class="result-note">Die Übersetzung ist in dieser lokalen Demo nicht aktiv. Verbinde eine Übersetzungs-API, um Inhalte hier wirklich zu übersetzen.</span>`
  if (id === 'email') return `**Betreff:** ${escapeHTML(text.trim().split(/[.!?]/)[0].slice(0, 64) || 'Kurze Rückfrage')}\n\nHallo ${escapeHTML(extra.recipient || 'zusammen').replace(/^an /i, '')},\n\n${safe}\n\nVielen Dank und viele Grüße\n[Dein Name]\n\n<span class="result-note">Lokaler Entwurf mit Platzhaltern – prüfe und personalisiere die Nachricht vor dem Versenden.</span>`
  if (id === 'quiz') return `**Frage 1**\nWas ist die wichtigste Aussage aus deinen Notizen?\n\n**Frage 2**\nWelcher Begriff oder welches Konzept wird hier beschrieben?\n\n**Frage 3**\nWie würdest du das Thema in eigenen Worten erklären?\n\n<span class="result-note">Vorlage aus deiner Eingabe (${text.length} Zeichen). Für inhaltsspezifische Fragen bitte später eine KI-API verbinden.</span>`
  if (id === 'resume') return `**Formulierungsvorschlag**\n\n• ${safe.replace(/[.!?]+$/, '')}\n• Beitrag und Ergebnis dieser Erfahrung konkret benennen\n• Zahlen oder Beispiele ergänzen, sofern vorhanden\n\n<span class="result-note">Der erste Punkt übernimmt deinen Text. Ergänze konkrete Ergebnisse, bevor du ihn in den Lebenslauf übernimmst.</span>`
  return safe
}
async function runTool() {
  const t = tools.find(x => location.hash === `#/tool/${x.id}`); if (!t) return
  const output = app.querySelector('#result-panel'); const button = app.querySelector('#run-tool'); let source = app.querySelector('#tool-input')?.value || ''
  if (t.input === 'file') {
    const file = app.querySelector('#file-input').files[0]
    if (!file) return showError('Bitte wähle zuerst eine Datei aus.')
    if (file.size > 10 * 1024 * 1024) return showError('Die Datei ist größer als 10 MB.')
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) return showError('PDF-Textextraktion ist in dieser Demo noch nicht integriert. TXT- und MD-Dateien funktionieren lokal.')
    source = await file.text()
  } else if (t.input === 'image') {
    const file = app.querySelector('#image-input').files[0]
    if (!file) return showError('Bitte wähle zuerst ein Bild aus.')
    return showError('Texterkennung aus Bildern (OCR) ist in dieser Demo noch nicht integriert. Der lokale Tool-Flow ist als nächster API-Integrationspunkt vorbereitet.')
  }
  if (!source.trim()) return showError('Bitte gib zuerst einen Inhalt ein.')
  button.disabled = true; button.innerHTML = `${icon('clock', 16)} Wird vorbereitet …`
  await new Promise(resolve => setTimeout(resolve, 350))
  const result = mockResult(t.id, source, { recipient: app.querySelector('#recipient')?.value })
  output.innerHTML = `<div class="result-content"><div class="result-top"><span>${icon('spark', 16)} ERGEBNIS · DEMO</span><button id="copy-result" class="copy-button">Kopieren ${icon('edit', 14)}</button></div><div class="result-text">${result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div></div>`
  app.querySelector('#copy-result').addEventListener('click', async e => { await navigator.clipboard?.writeText(output.querySelector('.result-text').innerText); e.currentTarget.innerHTML = `${icon('check', 14)} Kopiert` })
  button.disabled = false; button.innerHTML = `${t.button} ${icon('spark', 16)}`
  function showError(message) { output.innerHTML = `<div class="result-error">${icon('clock', 18)} ${escapeHTML(message)}</div>` }
}

render()
