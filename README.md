This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

ok this is the project structure that i have made this is only a model and structure that i have made with my knowledge, someone was given me a project to make that is this
Your Task  
Build CRM module 

Step 1: Sales Admin

* Books Wedding
* Sets Status: “Booked”
* System sends booking to Production

Step 2: Production Admin

* Views all booked weddings
* Assigns a Manager to the wedding

Step 3: Manager – Team Creation

* Creates a team
* Adds members (Photographer, Cinematographer, Drone Operator, etc.)

Step 4: Manager – Assignment

* Assigns each member to:

  * Function (Haldi / Mehndi / Wedding / Reception)
  * Date
  * Time
  * Venue

Step 5: System Notification

* After assignment, system sends message:
  “You are booked for this event”
and i was planing to make a fully working Saas and this is my thinking to make there was 2 buttons on landing page 1 is registration and other one is login -
* when someone go to registertion it sholud let them create a new organisation for event management system than it will redirect the organization maker to SalesAdmin.js dashboard than Sales Admin will create or add new members to his organisation that will be Production admin and manager than manager create or add team member or crew for managing the event this is my approch for team making system and than
for event management
sales admin dashboard will add events and manage them (setting there status like booked, waiting or etc) than a toster and booked event apper on productionadmin dashborad that- tostor like- new event was added, than this production admin can add and manage managers and assign a events to them than managers can create teams and assign tasks to them 
so my total approch is like this
sales admin -> make and manage events -> msg and booked events show on production admin -> than production admin assign it to a manager -> than manager assign tasks to team.
and for making of roganaigation
registration -> make an organization with slaes admin cred -> sales admin make production admin -> production admin make manager -> manager make team -> all can login with login button on landing page after getting created 
use next-auth for authorisation , use google provider and email password provider, use useSesion for sassion control , see and make changes in models if needed , make all required changes