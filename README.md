# Group holiday location briefing

A simple summer-coloured HTML briefing for a 20–30 person UK group trip.

It compares the Loveholidays all-inclusive options already shortlisted, against health and safety, transport, beach, shops, hospital access for UK/EU travellers, food, and **late April / early May weather** (planned dates: 30 April–3 May 2027). Places are grouped by coast so the organising committee can drop weak fits before a larger poll.

This is a decision aid, not a booking tool and not live hotel prices.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Print the page if you want a paper copy for the committee.

Shared +/− votes on the live site need the Vercel Redis store connected to the project. Local `npm run dev` shows the cards but cannot share votes unless you use `vercel dev`.

## What the committee is asked to do

1. Decide whether weather or a short flight / easy hospital is the tie-break.
2. Poll five grouped choices: Fuengirola, Costa Brava town cluster, East Mallorca, Side or Alanya, and Crete.
3. Re-check [FCDO travel advice](https://www.gov.uk/foreign-travel-advice) before anyone pays a deposit.
