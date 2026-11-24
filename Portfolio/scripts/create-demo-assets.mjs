// Original, editable concept screens. No client assets or real product data.
import { mkdirSync, writeFileSync } from 'node:fs'
mkdirSync('public/images', { recursive: true })
const text = (x, y, value, size = 16, fill = '#27302a', weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${value}</text>`
const rect = (x, y, w, h, fill, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}"/>`
const save = (name, body, bg = '#f7f8f5') => writeFileSync(`public/images/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="${bg}"/><g font-family="Arial,Helvetica,sans-serif">${body}</g></svg>`)
let booking = rect(0, 0, 230, 760, '#213c3d') + text(28, 58, 'Vehicle Booking', 22, '#f0f7f5', 600) + text(29, 83, 'SYSTEM / CONCEPT', 11, '#a9c9c6')
;['Overview', 'Vehicles', 'My bookings', 'Profile'].forEach((label, i) => {
  if (i === 1) booking += rect(18, 207, 194, 44, '#385859', 5)
  booking += text(36, 174 + i * 60, label, 15, i === 1 ? '#fff' : '#bdd3d0')
})
booking += text(28, 710, 'ILLUSTRATIVE DEMO', 11, '#a9c9c6') + text(275, 58, 'Find your next drive.', 30, '#243f40', 600) + text(275, 89, 'Vehicle booking interface · placeholder content', 14, '#728783') + text(1090, 60, 'GK', 14, '#385859')
booking += rect(275, 123, 880, 88, '#fff', 5)
;[['Pick-up location', 'Choose a location', 297], ['Pick-up date', 'Select date', 566], ['Return date', 'Select date', 795]].forEach(([label, value, x]) => {
  booking += text(x, 151, label, 12, '#728783') + text(x, 182, value, 16, '#385859')
})
booking += text(275, 259, 'Explore vehicles', 20, '#243f40') + text(1010, 257, 'All categories', 13, '#728783')
const car = (x, y, fill) => `<g transform="translate(${x} ${y})"><ellipse cx="120" cy="92" rx="110" ry="10" fill="#213c3d" opacity=".08"/><path d="M15 55L45 45L67 15Q72 9 84 9H153Q165 9 173 20L195 44L221 53Q230 56 230 65V78H10V65Q10 58 15 55Z" fill="${fill}"/><path d="M74 18H112V43H55ZM122 18H153Q158 18 163 24L181 43H122Z" fill="#e9f4f3"/><path d="M13 65H36M207 64H228" stroke="#e9f4f3" stroke-width="6"/><circle cx="58" cy="79" r="19" fill="#253d3e"/><circle cx="58" cy="79" r="9" fill="#b4c7c4"/><circle cx="185" cy="79" r="19" fill="#253d3e"/><circle cx="185" cy="79" r="9" fill="#b4c7c4"/></g>`
;[['Sample sedan', 'Sedan', '#6e9190'], ['Sample SUV', 'SUV', '#8c9c92'], ['Sample hatchback', 'Hatchback', '#7f94a4']].forEach(([name, category, colour], i) => {
  const x = 275 + i * 299
  booking += rect(x, 287, 281, 294, '#fff', 5) + rect(x + 12, 299, 257, 145, '#e7efec', 3) + car(x + 20, 322, colour)
  booking += text(x + 20, 475, name, 17, '#243f40', 600) + text(x + 20, 501, `${category} · Demo vehicle`, 12, '#728783')
  booking += rect(x + 20, 526, 241, 36, '#385859', 4) + text(x + 89, 550, 'View vehicle', 13, '#fff')
})
booking += rect(275, 610, 880, 56, '#e7efec', 4) + text(297, 644, 'Your booking journey starts here. Replace this concept with your own screenshot.', 14, '#536f6c')
booking += text(275, 716, 'CONCEPT PREVIEW / NO REAL BOOKINGS OR AVAILABILITY', 11, '#728783')
save('vehicle-booking-preview', booking, '#f3f6f3')
let stock = rect(0, 0, 215, 760, '#171f36') + text(30, 63, 'g-stock', 30, '#fff', 600) + text(30, 88, 'Everything in its place.', 12, '#a6b1ca')
;['Dashboard', 'Inventory', 'Orders', 'Suppliers', 'Settings'].forEach((label, i) => { if (i === 1) stock += rect(18, 192, 179, 45, '#344375', 5); stock += text(35, 166 + i * 55, label, 15, '#dce3f7') })
stock += text(30, 710, 'DEMO WORKSPACE', 11, '#a6b1ca') + text(258, 58, 'Inventory', 28, '#242f4d', 600) + text(258, 87, 'An organised space for every item.', 14, '#788098') + rect(1005, 38, 150, 42, '#485fc5', 5) + text(1027, 64, '+ Add product', 15, '#fff')
;['All products', 'Stock status', 'Categories'].forEach((label, i) => { const x = 258 + i * 303; stock += rect(x, 123, 285, 110, '#fff', 5) + text(x + 21, 153, label, 14, '#788098') + text(x + 21, 205, '—', 36, '#273757') })
stock += rect(258, 265, 893, 46, '#fff', 4) + text(280, 294, 'Search your inventory…', 14, '#8790a2') + text(1005, 294, 'All categories', 14, '#515d79') + rect(258, 340, 893, 50, '#e9edf5', 3)
;[['Product', 280], ['Category', 655], ['Stock', 860], ['Status', 1000]].forEach(([label, x]) => { stock += text(x, 372, label, 13, '#65708b') })
;[['Sample item A', 'Equipment', 'In stock'], ['Sample item B', 'Tools', 'In stock'], ['Sample item C', 'Supplies', 'Low stock'], ['Sample item D', 'Equipment', 'In stock']].forEach(([name, category, status], i) => { const y = 410 + i * 65; stock += rect(258, y - 18, 893, 64, '#fff') + rect(278, y - 5, 38, 38, ['#cfd6ed', '#e3d9cb', '#d3dfd8', '#dad5e5'][i], 4) + text(332, y + 20, name, 15, '#28334d') + text(655, y + 20, category, 14, '#737e95') + text(860, y + 20, '—', 15) + rect(994, y, 115, 28, status === 'Low stock' ? '#f3ead3' : '#e5efea', 14) + text(1011, y + 19, status, 12, '#45664f') })
stock += text(258, 720, 'CONCEPT PREVIEW / SAMPLE ITEMS ONLY', 11, '#788098')
save('g-stock-preview', stock, '#f2f4f8')
let build = text(54, 65, 'build &amp; hire', 28, '#252d29', 600) + text(664, 61, 'Explore', 14) + text(775, 61, 'How it works', 14) + text(925, 61, 'About', 14) + rect(1020, 32, 130, 45, '#2e4036', 3) + text(1041, 61, 'Get started', 14, '#fff') + rect(50, 104, 1100, 1, '#dcded5')
build += text(55, 177, 'A WEB APPLICATION CONCEPT', 12, '#677566') + text(50, 267, 'Good projects.', 67, '#273b2f') + text(50, 339, 'Great people.', 67, '#273b2f') + text(55, 391, 'A place for your next idea to take shape.', 19, '#727b70') + text(55, 422, 'Placeholder copy for an editable project preview.', 15, '#727b70') + rect(55, 463, 182, 52, '#2e4036', 3) + text(79, 496, 'Explore the concept', 15, '#fff')
build += rect(657, 154, 490, 410, '#d7d2c2', 3) + rect(687, 184, 430, 350, '#e9e4d4')
build += '<path d="M687 465L873 332L1117 420V534H687Z" fill="#c1baa5"/><path d="M755 319L920 226L1064 310L900 405Z" fill="#8e9e8c"/><path d="M755 319L900 405V501L755 415Z" fill="#e5e6d7"/><path d="M900 405L1064 310V408L900 501Z" fill="#b0b8a4"/><path d="M794 370L836 396V451L794 427Z" fill="#465b4d"/><path d="M929 407L973 382V433L929 458Z" fill="#536957"/><path d="M996 368L1033 348V399L996 421Z" fill="#536957"/>'
build += text(682, 546, 'ORIGINAL CONCEPT ILLUSTRATION', 10, '#62725d') + rect(55, 615, 1090, 1, '#dcded5')
;['Find your direction', 'Make a connection', 'Build something useful'].forEach((label, i) => { build += text(55 + i * 375, 669, label, 18, '#3b4a3b') + text(55 + i * 375, 700, 'Demo content · details to be added', 12, '#7e8579') })
save('build-hire-preview', build, '#f3f1e8')
save('project-fallback', rect(45, 45, 1110, 670, '#e3e6df') + text(95, 365, 'Project screenshot', 60) + text(100, 425, 'Placeholder · Add your project imagery here', 24, '#747c6f'))
writeFileSync('public/images/portrait-fallback.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200"><circle cx="400" cy="250" r="145" fill="#747b72"/><path d="M65 1200V750Q65 460 400 460Q735 460 735 750V1200Z" fill="#333b33"/></svg>')
writeFileSync('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1B151F"/><text x="8" y="43" font-family="Arial,sans-serif" font-size="35" font-weight="600" letter-spacing="-4" fill="#EEDAE6">gk.</text></svg>')
console.log('Created original demo screens, fallbacks and favicon.')
