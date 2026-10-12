# Travel-Life — World Travel & Itinerary Platform

Travel-Life is a full-stack digital cartography and slow-travel planning engine featuring verified municipal field guides, day-by-day itinerary orchestration, and a private, secure Administrator Portal.

---

## Private Administrator Portal

The administrator portal (`Cartography Ops`) is protected by server-side authentication:
* **Single Authorized Admin**: Public registration is strictly disabled.
* **Server-side Security**: Passwords are hashed using salted `bcryptjs` (12 rounds).
* **Brute-Force & Rate-Limiting Protection**: Automatic account lockout after 5 consecutive failed attempts (15-minute cooldown).
* **Session Management**: Cryptographically signed JSON Web Tokens (JWT) with HTTP-only cookies and Bearer token fallback.
* **Multi-Device Compatibility**: Fully optimized for mobile phones (Android & iOS), tablets, and desktop browsers.

---

## Environment Variables (Vercel & Local)

To customize your administrator credentials securely without putting them in code:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `ADMIN_EMAIL` | The private email authorized to log in | `your-email@example.com` |
| `ADMIN_PASSWORD` | The private password for administrator login | `YourStrongSecretPassword!` |
| `JWT_SECRET` | Secret key used to sign JWT sessions (min 32 chars) | `your-strong-random-jwt-secret-key-32-chars` |

---

## Setting Up Environment Variables on Vercel (Step-by-Step for Android Phone)

1. Open your browser on your phone (Chrome, Samsung Internet, etc.) and go to **[vercel.com](https://vercel.com)**.
2. Sign in to your Vercel account.
3. Tap on your **Travel-Life** project from the dashboard.
4. Tap the **Settings** tab at the top.
5. In the left/side menu, tap **Environment Variables**.
6. Add the following variables:
   * **Key**: `ADMIN_EMAIL`  
     **Value**: `your-private-email@example.com` (your personal email address)  
     Tap **Save**.
   * **Key**: `ADMIN_PASSWORD`  
     **Value**: `YourPersonalPassword123!` (choose a strong password you will remember)  
     Tap **Save**.
   * **Key**: `JWT_SECRET`  
     **Value**: A random long string of 32+ characters  
     Tap **Save**.
7. Go to the **Deployments** tab, tap the three dots `...` on your latest deployment, and tap **Redeploy** so Vercel applies the new environment variables.

---

## Default Starter Credentials (In Development)

If you haven't set custom environment variables yet, the system boots with:
* **Email**: `dinujalakshan33@gmail.com`
* **Starter Password**: `TravelLife@Admin2025!`
