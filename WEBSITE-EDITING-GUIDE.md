# How to Edit the Solar Gators Website

This guide walks you through changing [ufsolargators.org](https://ufsolargators.org) step by step. **No programming experience needed.** It's written for Windows.

> **You can't break the live website by following this guide.** Everything happens on your own computer until the very last step, when someone clicks **Merge** on GitHub. Even after that, any change can be undone.

**Contents**

1. [How it works in 30 seconds](#1-how-it-works-in-30-seconds)
2. [One-time setup](#2-one-time-setup)
3. [Making a change](#3-making-a-change)
4. [Common edits](#4-common-edits)
5. [Troubleshooting](#5-troubleshooting)
6. [Doing it by hand](#6-doing-it-by-hand) (if the helper files don't work)
7. [Glossary](#7-glossary)
8. [For developers](#8-for-developers)

---

## 1. How it works in 30 seconds

- The website's files are stored on GitHub, in [Solar-Gators/Advertisement-Website](https://github.com/Solar-Gators/Advertisement-Website).
- You download a copy to your computer, edit the files, and **preview** the site on your computer to check your edits.
- You **upload** your edits to GitHub as a **change**. GitHub turns it into a **pull request**: a page showing exactly what you changed, where GitHub also test-builds the site.
- When someone clicks **Merge** on the pull request, GitHub rebuilds ufsolargators.org by itself within about 5 minutes.

The `website-tools` folder has four helper files that do the technical parts for you. Double-click them:

| Helper | When to use it |
|---|---|
| **1 - First Time Setup** | Once per computer |
| **2 - Start New Change** | Every time, **before** you edit anything |
| **3 - Preview Website** | While you edit, to see the site on your computer |
| **4 - Upload My Changes** | When you're done editing |

---

## 2. One-time setup

This takes about 15 minutes, once.

### 2.1 Get a GitHub account with access

1. If you don't have one, create a free account at [github.com](https://github.com/signup).
2. Send your GitHub username to a senior member and ask them to give you access to the **Solar-Gators** organization's **Advertisement-Website** repository. Without this, uploading fails with "Permission denied".

### 2.2 Install three free programs

Install each one and accept the default options (keep clicking **Next**).

| Program | What it's for | Download |
|---|---|---|
| **Git** | Downloads and uploads the website's files | [git-scm.com/downloads/win](https://git-scm.com/downloads/win) |
| **Node.js** (choose the **LTS** version) | Runs the preview on your computer | [nodejs.org/en/download](https://nodejs.org/en/download) |
| **Visual Studio Code** | The program you edit files in | [code.visualstudio.com](https://code.visualstudio.com) |

### 2.3 Run the setup helper

1. Go to [the website's GitHub page](https://github.com/Solar-Gators/Advertisement-Website), click the green **Code** button, then **Download ZIP**.
2. Open your **Downloads** folder, right-click the ZIP, choose **Extract All...**, then **Extract**.
3. In the extracted folder, open **website-tools** and double-click **1 - First Time Setup**.
   - If Windows says **"Windows protected your PC"**, click **More info**, then **Run anyway**. If it asks **"Do you want to run this file?"**, click **Run**. Windows says this about every downloaded helper file.
4. If it asks, type your **GitHub username** and **email**, pressing **Enter** after each.
5. Wait 2–5 minutes. Lots of text scrolling past is normal.
6. When it says **Setup finished!**, it opens your website folder:
   `C:\Users\<your Windows name>\SolarGators\Advertisement-Website`

**That is your website folder from now on.** Use the helpers in *its* `website-tools` folder. You can delete the ZIP and the folder you extracted.

> **Tip:** Right-click that `website-tools` folder and choose **Pin to Quick access** so it's always in the left side of File Explorer.

### 2.4 Open the website in Visual Studio Code

1. Open **Visual Studio Code**.
2. Click **File → Open Folder...**, choose your website folder (`C:\Users\<your Windows name>\SolarGators\Advertisement-Website`), and click **Select Folder**.
3. If it asks **"Do you trust the authors of the files in this folder?"**, click **Yes**.

The list on the left is every file in the website. VS Code remembers this folder next time.

---

## 3. Making a change

Do these five steps every time you change something.

### Step 1 — Start a new change

Double-click **2 - Start New Change**.

It downloads the latest version of the website (so you don't undo someone else's work), then asks you to describe your change in a few words, for example `update officers`. Press **Enter**.

### Step 2 — Open the preview

Double-click **3 - Preview Website**.

After 30 seconds to 2 minutes, your browser opens **http://localhost:3000**. That's the website running on your computer, and only you can see it. **Leave the black window open** while you work.

### Step 3 — Make your edits

1. In VS Code, open the file you need (see [Common edits](#4-common-edits)).
2. Make your change.
3. **Save with Ctrl+S.** The preview in your browser updates by itself within a few seconds.
4. Check the page in your browser. Repeat until it looks right.

> **Tip: find where anything on the website lives.** In VS Code, press **Ctrl+Shift+F** and type a few words you can see on the website. It shows you the file and line they're in. Click the result to jump there.

If the browser shows a red **Failed to compile** screen, there's a small mistake in what you just typed. See [Troubleshooting](#5-troubleshooting). You can always press **Ctrl+Z** in VS Code to undo.

### Step 4 — Upload

When you're happy, close the preview window and double-click **4 - Upload My Changes**.

1. It lists the files you changed. Check that the list is what you expect, then type **Y** and press **Enter**.
2. Describe your change in one sentence, for example `Updated the 2026 officer list`, and press **Enter**.
3. **The first time only:** a GitHub sign-in window appears. Choose **Sign in with your browser** and log in.
4. When it says **Uploaded!**, your browser opens your pull request page.

### Step 5 — Publish

On the page that opened:

1. Click the green **Create pull request** button.
2. Wait 2–3 minutes. A yellow dot means GitHub is test-building your change. A **green ✓** means it passed. (A **red ✗** means it failed. Don't merge; see [Troubleshooting](#5-troubleshooting).)
3. Click **Merge pull request**, then **Confirm merge**.
4. After 3–5 minutes, open [ufsolargators.org](https://ufsolargators.org) and press **Ctrl+F5** to see your change.

If the club has someone review website changes, send them the pull request link instead of merging yourself.

> **Need to fix something after uploading?** Just edit again and run **4 - Upload My Changes** again. It updates the same pull request. Don't run **2 - Start New Change** until your pull request is merged.

---

## 4. Common edits

### Rules that apply to every edit

- **Copy the pattern that's already there.** Nearly every edit is "copy an existing line, paste it, change the words." Keep the punctuation exactly the same.
- **Text lives inside quotes:** `"like this"`. Keep the quotes and change the words between them.
- **Items in a list are separated by commas.** When you add an item, make sure there's a comma between it and its neighbors.
- **Image file names must match exactly, including capital letters.** If the file is `Photo.JPG`, write `Photo.JPG`, not `Photo.jpg`. A mismatch may look fine on your computer but **breaks on GitHub**. The easiest fix is to rename new photos to all lowercase (`photo.jpg`) before you use them.
- **Keep photos under about 2 MB.** Phone and camera photos are often 5–15 MB and slow the site down. To shrink one, open it in the Windows **Photos** app, click **...** → **Resize image**, and save a copy about 2000 pixels wide.
- **Don't edit files in the `build` or `node_modules` folders.** They're generated automatically, and your changes there are thrown away.

### Where things are

| To change... | Open this file |
|---|---|
| Officers (names, titles, headshots, LinkedIn) | `src/content/assets/images/officers/index.js` (headshots are in `officers/<year>/`) |
| Sponsor logos and patrons | `src/content/assets/images/sponsor_logos/index.js` |
| Awards on the home page | `src/content/assets/images/awards/AwardList.js` |
| Team Apps page | `src/content/TeamAppsList.js` |
| Home page (meeting times, interest form link, "Meet the Team" photos) | `src/pages/Home.js` |
| About page text and "Our Track Record" | `src/pages/About.js` |
| Car descriptions | `src/pages/Cars.js` (the car cards on the Home and About pages are in `src/components/CarsSection/CarsSection.js`) |
| Sponsorship page, sponsorship packet PDF, donation link | `src/pages/Donate.js` |
| Tabs at the top | `src/components/Navbar.js` |
| Social media links and email at the bottom | `src/components/Footer.js` |
| The big photo at the top of a page | `src/content/styles/<Page>.scss`, the line starting with `background:` |

> In VS Code, press **Ctrl+P** and type part of a file name (like `Home.js`) to open it quickly.

### Change text on a page

1. Press **Ctrl+Shift+F** in VS Code and search for a few words of the text.
2. Click the result, change the words, and save with **Ctrl+S**.

Text appears in one of two ways. Only change the words, never the symbols around them:

```js
blurb={"Our fourth generation solar car began development in..."}   // text in quotes
<p>We welcome gators of all majors, backgrounds, and experience levels.</p>   // text between tags
```

### Replace or add a photo

1. Copy the photo into the right folder under `src/content/assets/images/` (for example `car_pics/Flare/` or `officers/2026/`).
2. Find where the old photo's file name is written: press **Ctrl+Shift+F** and search for the old file name.
3. Change it to the new file name, **matching capital letters exactly**, and save.

For the big photo at the top of a page, open that page's file in `src/content/styles/` (for example `Team.scss`) and change the file name in the `url(...)` on the `background:` line.

### Change one officer's name, title, or LinkedIn

Open `src/content/assets/images/officers/index.js`, search for the person's name, and edit it. Each person looks like this:

```js
["Natalia Sampaio", "Vice President", vicepresident26, "https://www.linkedin.com/in/natalia-oliver-sampaio/"],
```

In order: **name**, **title**, **headshot**, **LinkedIn link**. The LinkedIn link is optional. Without it, the line is `["Name", "Title", headshot],`

### Add officers for a new school year

This is the biggest routine edit. The example below adds **2027–28**. Wherever it says `2027`/`27`, use your year, and wherever it says `2026`/`26`, use the previous year.

**A. Headshots**

1. Create the folder `src/content/assets/images/officers/2027/` and put the headshots in it. Name each file by role, for example `president.jpg`.
2. Copy `officers/2026/index.js` into the new `2027` folder. Change each line so the name on the left ends in `27` and the file name on the right matches your photo exactly:
   ```js
   export { default as president27 } from "./president.jpg";
   ```

**B. Names and titles**, in `src/content/assets/images/officers/index.js`:

1. At the top, copy the `// 2026-27` import block, paste it above it, and change it to `2027-28`, `./2027/index`, and the new `...27` names.
2. Copy the `//2026-27` block of officer lists (`executive_board26`, `ces26`, `pms26`, `electrical26`, `mech_aero26`), paste it above it, rename each list to `...27`, and type in the new people.
3. At the bottom, in **each** `get_...` function, add a line for the new year that returns the matching list, next to the 2026 line:
   ```js
   else if (year === "2027") { return executive_board27; }
   ```

**C. The Team page year menu**, in `src/pages/Team.js` (search for `2026` to find each spot):

1. Copy the `//2026-27 Officers` block of `let ... = get_...("2026")` lines and change it to `2027`/`27`.
2. In `AcademicYear`, add: `else if (eventkey === "202728") { year1 = 2027; year2 = 2028 }`
3. In `OfficerTeam`, copy the whole `if (eventkey === "202627") { ... }` block, paste it right after its closing `}`, change the pasted copy's `if` to `else if`, and change `202627` → `202728` and every `26` → `27` inside it.
4. In the `onSelect` part of the dropdown, copy an `if (eventKey === "202627") { ... }` block and change it to `"202728"` and `executive_board27`.
5. Add a menu item next to the others:
   ```js
   <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202728">2027 - 2028</Dropdown.Item>
   ```
6. Near the bottom, change `eventkey: "202627"` to `eventkey: "202728"`. This makes the new year show first.

**D. The home page "Meet The Team" photos**, in `src/pages/Home.js`:

1. Near the top, change the year in the `get_eboard("...")`, `get_pms("...")`, `get_mech("...")`, `get_elec("...")`, and `get_ces("...")` lines to `"2027"`.
2. The photo strip picks people by position. `electrical[2]` means "the 3rd person in the electrical list" (counting starts at 0). **If a list is now shorter than the strip expects, the home page goes blank.** Remove the `<Officer pic={...}/>` lines for positions that no longer exist.

> **Limit:** each group on the Team page shows at most **6 people**. A 7th is silently left out. Split the group, or ask a senior member for help.

### Add or change a sponsor

Open `src/content/assets/images/sponsor_logos/index.js`.

1. Put the logo in the `sponsor_logos` folder. A PNG with a transparent background looks best.
2. Near the top, under the right tier's comment (`//Gold`, `//Silver`...), add a line naming the logo. Use one word with no spaces for the name:
   ```js
   import AcmeCorp from './AcmeCorp.png'
   ```
3. Find the current car's list for that tier (for example `let gold4 = [...]`) and add the sponsor with its website:
   ```js
   let gold4 = [[Altair, "https://altair.com/"], [RoyalElements, "https://royal-elements.com/"], [AcmeCorp, "https://www.acme.com/"]];
   ```
4. **Patrons** (names only) go in the `patron4` list as `"Name"`. Solar cell patrons go in `solarpatron4` as `["Name"]`.

> **Platinum sponsors also appear on the home page.** If you change a platinum sponsor, also update `src/pages/Home.js` (search for `platinum4`).

The section headings (like "Thank you to our 2024-2025 Patrons") are in `src/pages/Sponsor.js`.

### Add an award to the home page slideshow

Open `src/content/assets/images/awards/AwardList.js`.

1. Put the photo in the `awards` folder.
2. At the top, add a line naming it: `import fsgp26 from "../awards/fsgp26.jpg"`
3. Copy one whole `{ ... },` block and paste it at the top of the list (the first one shows first). Change:
   - `id`: a number no other award uses
   - `award_image`: the name from step 2 (`fsgp26`)
   - `photo_credits` and `photo_credits_link`: leave both as `""` if there's no credit
   - `alt`: a short description of the photo
   - `description`: the text. To highlight words in orange, wrap them like this: `<span class='accent_word' id='orange_accent'>1st place</span>`. Use single quotes `'` inside the description, never double quotes `"`.

### Add an app to the Team Apps page

Open `src/content/TeamAppsList.js`, copy one `{ ... },` block, paste it at the end of the list, and fill in `name`, `description`, and `link`. A new card appears automatically.

### Meeting times and the interest form

In `src/pages/Home.js`:
- Meeting days and times: search for `MONDAY`.
- Interest form link: search for `Interest Form`. The link is the `href={"..."}` just above it.

### Sponsorship packet and donation link

In `src/pages/Donate.js`:
- **New sponsorship packet:** put the PDF in `src/content/assets/` and change the file name in the line that starts with `import sponsorshipPacket`.
- **Sponsorship tiers picture:** the line that starts with `import sponsorshipTiers`. The picture is in `src/content/assets/images/uncategorized/`.
- **Donation link:** the line that starts with `let donateLink`.

### Add a new tab (page)

The **Team Apps** page is a good example to copy.

1. Copy `src/pages/TeamApps.js` to a new file, for example `src/pages/Outreach.js`. Inside it, change `TeamApps` to `Outreach` in the `function` line, change the title, and replace the contents.
2. In `src/App.js`, add `import Outreach from './pages/Outreach'` next to the other `import` lines, and add `<Route exact path="/outreach" component={Outreach} />` next to the other `Route` lines. It must go **above** the line with `path="*"`.
3. In `src/components/Navbar.js`, add `<PageLink path="/outreach" tag="Outreach"/>` where you want the tab to appear.

### Quick typo fix without installing anything

For a tiny text fix, you can edit directly on GitHub. There's no preview, so only use this for typos.

1. On [the website's GitHub page](https://github.com/Solar-Gators/Advertisement-Website), click through the folders to the file and click the **pencil** icon.
2. Make the fix, then click **Commit changes...**.
3. Choose **Create a new branch for this commit and start a pull request**, then **Propose changes**.
4. Continue from [Step 5 — Publish](#step-5--publish).

---

## 5. Troubleshooting

| What you see | What to do |
|---|---|
| **"Windows protected your PC"** or **"Do you want to run this file?"** | Click **More info → Run anyway**, or **Run**. Windows shows this for every downloaded helper file. |
| A helper says **Git** or **Node.js** is not installed, but you installed it | Restart your computer, then try again. |
| A helper window closes instantly, or shows a red error you don't understand | Do that step by hand instead. See [Doing it by hand](#6-doing-it-by-hand). |
| The browser shows red **Failed to compile** | Read the message: it names the file and line number. It's usually a missing comma, quote `"`, or bracket `]` `}`. Compare your edit with the lines around it, or press **Ctrl+Z** in VS Code until it works again. |
| **Failed to compile** that mentions **"does not match the corresponding path on disk"** or **"Can't resolve"** | A file name is spelled differently from the actual file, often just capital letters (`.JPG` vs `.jpg`). Make them match exactly. |
| The preview page is completely **blank** | Often a list got shorter than something expects (see step D under [Add officers for a new school year](#add-officers-for-a-new-school-year)). Press **F12** in the browser, click **Console**, and read the red text, or undo your last edit. |
| **"Something is already running on port 3000"** | Another preview window is already open. Close it, or type **Y** to use a different port. |
| Lots of **yellow warnings** in the preview window | Normal. Ignore them. |
| **"LF will be replaced by CRLF"** | Normal. Ignore it. |
| **"You have edits that are not uploaded yet"** when starting a change | Upload them with **4 - Upload My Changes**, or throw them away (see [Throwing away edits](#throwing-away-edits)). |
| Upload says **"Permission denied"** or **403** | Your GitHub account doesn't have access yet. See [2.1](#21-get-a-github-account-with-access). Your edits are saved on your computer; run **4** again once you have access. |
| Upload says **"could not read Username"** or no sign-in window appears | Run the upload commands by hand in PowerShell (see [Doing it by hand](#6-doing-it-by-hand)). This triggers the sign-in window. After that, the helper works too. |
| The pull request shows a **red ✗** | Click **Details** next to it to see the error (usually a file name mismatch or a typo). Fix it on your computer, check the preview, and run **4 - Upload My Changes** again. It updates the same pull request. |
| You merged, but the website hasn't changed | Wait 5 minutes and press **Ctrl+F5**. Still nothing? Open the **Actions** tab on GitHub. A red ✗ there means the publish failed, so click it to see why. |

### Undoing a published change

On GitHub, open the merged pull request (**Pull requests** tab → **Closed**) and click **Revert**. That creates a new pull request that undoes it. Merge that one.

---

## 6. Doing it by hand

Use this if a helper file doesn't work. Open **PowerShell**: press the Windows key, type `PowerShell`, and press **Enter**. Type (or paste) each line below and press **Enter** after each one.

> If a command starting with `npm` says **"running scripts is disabled on this system"**, type `npm.cmd` instead of `npm`.

### First time setup

Use your own GitHub username and email in the first two lines:

```powershell
git config --global user.name "YourGitHubUsername"
git config --global user.email "you@ufl.edu"
cd ~
mkdir SolarGators
cd SolarGators
git clone https://github.com/Solar-Gators/Advertisement-Website.git
cd Advertisement-Website
npm ci
```

### Go to your website folder

Every time you open a new PowerShell window, start with:

```powershell
cd ~\SolarGators\Advertisement-Website
```

### Start a new change

Replace `short-name-for-your-change` with a few words joined by dashes, like `update-officers`:

```powershell
git checkout -- package-lock.json yarn.lock
git switch master
git pull
git switch -c short-name-for-your-change
```

### Preview

```powershell
npm start
```

To stop the preview, press **Ctrl+C** in that window.

### Upload

`git status` lists what you changed, so check it before continuing:

```powershell
git status
git add --all
git reset -- package-lock.json yarn.lock
git commit -m "Describe your change in one sentence"
git push -u origin short-name-for-your-change
```

Then open [the website's GitHub page](https://github.com/Solar-Gators/Advertisement-Website). A yellow bar says your change "had recent pushes". Click **Compare & pull request** and continue from [Step 5 — Publish](#step-5--publish).

### Throwing away edits

**This can't be undone.** To throw away your edits to one file:

```powershell
git restore src/pages/Home.js
```

To throw away **all** edits to existing files:

```powershell
git restore .
```

New files you added (like photos) aren't removed by this. Delete them in File Explorer.

---

## 7. Glossary

| Word | What it means |
|---|---|
| **Repository (repo)** | The folder of website files stored on GitHub. |
| **Branch / change** | Your own copy of the website where you make edits, separate from the live version. The helper names it for you, like `update-officers-0911`. |
| **master** | The main version of the website. Whatever is on `master` is what ufsolargators.org shows. |
| **Commit** | A saved snapshot of your edits, with a one-sentence description. |
| **Push / upload** | Sending your commits from your computer to GitHub. |
| **Pull request (PR)** | A page on GitHub that proposes adding your change to `master`. It shows exactly what changed and test-builds it. |
| **Merge** | Accepting a pull request. This is the moment your change goes live. |
| **localhost:3000** | The address of the preview running on your computer. Only you can see it. |
| **Node.js / npm** | The tools that build and preview the website. |
| **React** | The toolkit the website is built with. Its files end in `.js`. |

---

## 8. For developers

- **Stack:** React 17 (Create React App / `react-scripts` 5), React Router 5, React-Bootstrap, SCSS. Page components are in `src/pages`, and content data is in plain JS modules under `src/content`.
- **Deploy:** `.github/workflows/main.yml` builds every push to `master` and publishes `build/` to GitHub Pages (`peaceiris/actions-gh-pages`, CNAME `ufsolargators.org`). `regression.yml` test-builds every other branch. Both use `CI: false`, so lint warnings don't fail the build.
- **Install with `npm ci`.** `package-lock.json` is the source of truth and CI uses it. Current npm rewrites the stale `yarn.lock` even on `npm ci`, and `npm install` can rewrite both. The helpers never commit either lock file and reset them before starting a new change.
- CI runs Node 16. Local development also works on current Node (tested on Node 24).
- `public/404.html` is the GitHub Pages single-page-app redirect. Keep it.
- The contact form posts to `api.ufsolargators.org/api/contact`, which lives in a separate private repo. Ask a senior member for access.
- **Known quirks:** the Home "Meet The Team" strip indexes officer arrays by position; `OfficersRow` in `Team.js` renders at most 6 officers; platinum sponsors are duplicated in `Home.js`; `Team.js` has a duplicated `onSelect` branch for `202627` (harmless).
- The helper scripts are `website-tools/website-tools.ps1` (one function per helper). The `.bat` files just call it. Set `SG_WEBSITE_TEST=1` to stop them opening browser windows, and `SG_WEBSITE_FOLDER` to change where setup clones to.
