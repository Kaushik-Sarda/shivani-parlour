# Shivani Herbal Beauty Parlour — Website Guide

Static website (no database, no build step). Three files + assets:

| File | What it is |
|---|---|
| `index.html` | All page content (text, services, reviews, contact) |
| `styles.css` | All design (colours, fonts, layout, animations) |
| `script.js` | Menu, scroll animations, video auto-detect |
| `assets/` | Logo, artwork, and the testimonial video |

Open `index.html` in any browser to preview. To publish, upload the whole
`Shivani` folder to any hosting (Netlify, Vercel, Hostinger, GoDaddy…).

---

## 🎬 Video Testimonial — Setup Guide

> ✅ **Already installed:** the first customer video is live at
> `assets/testimonial.mp4` (portrait, 19s). The steps below are for
> replacing it in future.

The Reviews section has a built-in video player that switches on
**automatically** when a video file exists. No coding needed. Portrait
(phone) and landscape videos are both handled automatically.

### Step 1 — Prepare the video
- Format must be **MP4** (the standard phone/WhatsApp format).
- Keep it under **~25 MB** so the page loads fast. If the file is bigger,
  compress it once with the free **HandBrake** app (preset: *Fast 1080p30*)
  or any "compress video online" tool.
- Portrait or landscape both work; landscape (16:9) looks best.

### Step 2 — Name it exactly
Rename the file to exactly:

```
testimonial.mp4
```

(all lowercase, no spaces)

### Step 3 — Place it in the assets folder
Copy it into:

```
Shivani/assets/testimonial.mp4
```

### Step 4 — Refresh the site
Open/refresh the website. The "coming soon" card disappears and the video
player appears in its place, with play controls. That's it.

### Replacing or removing the video later
- **Replace:** overwrite `assets/testimonial.mp4` with the new file (same name).
- **Remove:** delete the file — the "coming soon" card returns automatically.

### After the site is live (for whoever maintains it)
Same steps, but done on the hosting service:
1. Log in to the hosting dashboard (Netlify / cPanel / etc.).
2. Open the file manager (or re-upload via drag-and-drop on Netlify).
3. Upload `testimonial.mp4` into the `assets` folder.
4. Hard-refresh the site (Ctrl+Shift+R) to see it.

> Tip: if a second video is ever wanted, ask your web person to duplicate the
> video block in `index.html` — the current setup is intentionally one video.

---

## ✅ LIVE at https://shivaniherbal.com

- Custom domain: **shivaniherbal.com** (bought on GoDaddy, renews yearly —
  keep the GoDaddy login safe and the renewal reminder on the salon's email)
- DNS at GoDaddy: 4 A records (@ → 185.199.108/109/110/111.153) and
  CNAME www → kaushik-sarda.github.io. Don't delete these.
- Repository: https://github.com/Kaushik-Sarda/shivani-parlour (the `CNAME`
  file in the repo holds the domain — don't delete that file either)
- Hosting: GitHub Pages (free, HTTPS enforced), serves the `main` branch.
- The old kaushik-sarda.github.io/shivani-parlour link auto-redirects here.

**Updating the live site:** edit files in this folder, then run:
```
git add -A
git commit -m "describe the change"
git push
```
The live site refreshes automatically in about a minute.

**Handing over the website:** GitHub repo → Settings → scroll to
"Danger Zone" → **Transfer ownership** → enter the new maintainer's
GitHub username. The site, files, and history move to their account
(the live URL then changes to their username — update shared links).

**Custom domain (optional):** buy a domain (see below), then in the repo:
Settings → Pages → Custom domain → enter it, and at the registrar create
a CNAME record pointing `www` to `kaushik-sarda.github.io`.

---

## 🚀 Alternative: Going Live via Netlify (not currently used)

1. Go to **https://app.netlify.com/signup** and sign up (use the salon's
   Google account/email so the login can be handed over later).
2. After logging in, open **https://app.netlify.com/drop**.
3. Drag the entire **`Shivani` folder** from the computer onto the
   page. Wait ~1 minute — the site is now live on a temporary address like
   `random-name-12345.netlify.app`.
4. Click **Site configuration → Change site name** and set something readable,
   e.g. `shivani-herbal-beauty` → the site becomes
   `shivani-herbal-beauty.netlify.app`. This link already works and can be
   shared on WhatsApp/Instagram immediately.
5. **Updating the site later:** open the site in Netlify → **Deploys** tab →
   drag the updated folder onto the page. The new version replaces the old
   one at the same address. (This is the whole "deployment process".)

## 🌐 Buying a Domain (e.g. shivaniparlour.in)

1. Pick a registrar — **Hostinger.in**, **GoDaddy.com**, or **Namecheap.com**
   all work. (.in domains cost roughly ₹500–900/year; .com ₹900–1,400/year.)
2. Search for the name you want, e.g. `shivaniparlour.in`,
   `shivanibeauty.in`, or `shivanibeautyexperience.in` (matches Instagram).
3. Buy **only the domain** — skip all add-ons (hosting, email, website
   builder, SSL offers). Netlify hosts the site and provides free SSL.
4. **Important:** register it with the salon's own email address, and keep
   the registrar login safe — the domain is the business's property.

## 🔗 Connecting the Domain to the Site

1. In Netlify: **Domain management → Add a domain** → type the purchased
   domain → **Verify**.
2. Netlify shows two **nameservers** (like `dns1.p03.nsone.net`).
3. In the registrar's dashboard: find **Nameservers → Change nameservers →
   Custom**, paste both, save. (Takes 10 minutes to a few hours to activate.)
4. Back in Netlify, wait until the domain shows a green check, then under
   **HTTPS** click **Provision certificate** (usually automatic). The site is
   now live at `https://yourdomain.in` with the padlock.
5. Test on a phone: open the domain, tap a WhatsApp button, play the video.

## 🤝 Handover checklist
- [ ] Netlify login (email + password)
- [ ] Domain registrar login
- [ ] This folder (the website files) — keep a copy in Google Drive
- [ ] This README

---

## ✏️ Common edits (for the future maintainer)

All in `index.html` — search for the text you want to change:

- **Phone / WhatsApp number:** search `919948926111` (WhatsApp links) and
  the display numbers `+91 99489 26111` / `+91 99489 25111`. Replace all
  occurrences.
- **Timings:** search `10:30 AM`.
- **Address:** search `Ashoka Scintilla`.
- **Services:** each category is an `<article class="svc">` block — add or
  remove `<li>` items inside it.
- **Written reviews:** each is a `<figure class="review-card">` block.
- **Colours:** top of `styles.css` under `:root` (each colour is named).

## ✅ Facts already wired in
- WhatsApp booking number: **+91 99489 26111** (confirmed — WhatsApp & calls)
- Second number: +91 99489 25111 (calls only, no WhatsApp)
- Landline removed from the site at owner's request
- Instagram: **@shivanibeautyexperience** (nav icon, Instagram band, footer)
- Address: 1st Floor, Ashoka Scintilla, Opp. New Malabar Jewellers,
  Himayathnagar, Hyderabad
- Timings: 10:30 AM – 6:00 PM, Sunday closed
- Ratings shown: Google 4.2★ · Justdial 4.0★ (204 ratings)
- Customer video testimonial: installed (`assets/testimonial.mp4`)
